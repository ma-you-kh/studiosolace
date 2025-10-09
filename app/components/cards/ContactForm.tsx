"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({ number: "", email: "" });
  const [touched, setTouched] = useState({
    name: false,
    number: false,
    email: false,
    message: false,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // ✨ GSAP Form Reveal
  useEffect(() => {
  if (!formRef.current) return;

  const fields = formRef.current.querySelectorAll(".field");

  gsap.fromTo(
    fields,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
    }
  );
}, []);


  const validateNumber = (number: string) => /^\d{10}$/.test(number);
  const validateEmail = (email: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (name === "number") {
      setErrors((prev) => ({
        ...prev,
        number: validateNumber(value)
          ? ""
          : "Hmm... that number doesn’t look complete 📱",
      }));
    }

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value)
          ? ""
          : "Email must follow the pattern yourname@example.com ✉️",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (errors.email || errors.number) {
      alert("Please fix the highlighted fields before sending.");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({ name: "", number: "", email: "", message: "" });
      setErrors({ number: "", email: "" });
      setTouched({ name: false, number: false, email: false, message: false });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const getBorderColor = (field: keyof typeof formData) => {
    if (field === "email" && touched.email && errors.email) return "border-red-500";
    if (field === "number" && touched.number && errors.number) return "border-red-500";
    if (touched[field] && formData[field].trim() !== "") return "border-green-500";
    return "border-gray-600";
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.number &&
    formData.message &&
    !errors.email &&
    !errors.number;

  return (
    <div className="reveal bg-white/5 rounded-2xl p-8 md:p-10 space-y-8 backdrop-blur-sm border border-white/10">
      <h2 className="text-3xl font-light mb-10">Send us a message!</h2>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 text-gray-200">
        {/* Fields */}
        {["name", "number", "email", "message"].map((field) => (
          <div key={field} className="field">
            <label className="block text-sm uppercase tracking-wide mb-2">
              {field === "number"
                ? "Phone Number"
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>

            {field === "message" ? (
              <textarea
                name={field}
                rows={4}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-transparent border-b ${getBorderColor(
                  field as keyof typeof formData
                )} focus:border-white outline-none py-2 resize-none`}
                placeholder={
                  field === "message" ? "Your message goes here..." : "Type here"
                }
                required
              ></textarea>
            ) : (
              <input
                type={field === "email" ? "email" : field === "number" ? "tel" : "text"}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-transparent border-b ${getBorderColor(
                  field as keyof typeof formData
                )} focus:border-white outline-none py-2`}
                placeholder={
                  field === "number"
                    ? "10-digit mobile number"
                    : field === "email"
                    ? "you@example.com"
                    : "Your name"
                }
                required
              />
            )}

            {/* Animated Error Message */}
            <AnimatePresence>
              {touched[field as keyof typeof formData] &&
                errors[field as keyof typeof errors] && (
                  <motion.p
                    className="text-sm text-red-400 mt-1 italic"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    {errors[field as keyof typeof errors]}
                  </motion.p>
                )}
            </AnimatePresence>
          </div>
        ))}

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid || status === "sending"}
          className={`mt-6 px-8 py-3 rounded-full transition-all duration-300 ${
            status === "success"
              ? "bg-green-500 text-white"
              : status === "error"
              ? "bg-red-500 text-white"
              : !isFormValid
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-200"
          }`}
        >
          {status === "sending"
            ? "Sending..."
            : status === "success"
            ? "Sent!"
            : status === "error"
            ? "Try Again"
            : "Send Message"}
        </button>
      </form>
    </div>
  );
}
