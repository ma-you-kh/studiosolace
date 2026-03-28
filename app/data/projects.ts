// app/data/projects.ts
export interface Project {
  id: number;
  slug: string;
  title: string;
  description?: string;
  location?: string;
  client?: string;
  year?: string;
  category?: string;
  gallery: string[]; // first image is used for card
  image?: string; // optional legacy field
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "tostem-experience-centre",
    title: "Tostem Experience Centre",
    description:
      "The TOSTEM Experience Centre in Ludhiana is designed as an immersive space where visitors can explore the elegance and innovation of Japanese-engineered windows and doors. Created to reflect TOSTEM’s commitment to quality and modern living, the centre allows customers to see, touch, and experience a wide range of products in real-life settings. With thoughtfully curated displays, refined interiors, and a seamless blend of functionality and aesthetics, the experience centre serves as both a showroom and an inspiration hub—helping clients envision how TOSTEM solutions can transform their spaces.",
    location: "Ludhiana, India",
    client: "Private Client",
    category: "Commercial",
    // year: "2022",
    gallery: [
      "/projects/tostem-experience-centre/1.jpg",
      "/projects/tostem-experience-centre/2.jpg",
      "/projects/tostem-experience-centre/3.jpg",
      "/projects/tostem-experience-centre/4.jpg",
      "/projects/tostem-experience-centre/5.jpg",
      "/projects/tostem-experience-centre/6.jpg",
      "/projects/tostem-experience-centre/7.jpg",
      "/projects/tostem-experience-centre/8.jpg",
    ],
  },
  {
    id: 2,
    slug: "aaron-villa-park",
    title: "Aaron Villa Park",
    description:
      "The kids’ park is a vibrant and welcoming space designed to bring joy, activity, and imagination to children of all ages. Thoughtfully planned with safe play equipment such as swings, slides, and climbing frames, it encourages kids to be active while exploring their creativity. Surrounded by greenery and open pathways, the park provides a refreshing escape from the city’s bustle, making it a perfect spot for outdoor play. Comfortable seating areas allow parents to relax while keeping a close eye on their children, turning the park into a family-friendly destination where fun, safety, and togetherness come naturally.",
    location: "Sector 48, Gurugram, Haryana",
    client: "Aaron Villa RWA",
    // year: "2023",
    category: "Landscape",
    gallery: [
      "/projects/aaron-villa-park/1.jpg",
      "/projects/aaron-villa-park/2.jpg",
      "/projects/aaron-villa-park/3.jpg",
      "/projects/aaron-villa-park/4.jpg",
      "/projects/aaron-villa-park/5.jpg",
      "/projects/aaron-villa-park/6.jpg",
    ],
  },
  {
    id: 3,
    slug: "modern-edge-house",
    title: "Modern Edge House",
    description:
      "The Modern Edge House in Gurugram redefines luxury living with its contemporary design and refined interiors. This independent residence features a well-planned basement that includes a private office, an elegant bar, and a fully equipped gym, blending productivity with leisure. The ground floor opens into a grand dining area, an elegant drawing room, and a cozy guest bedroom designed for comfort and warmth. The upper floors accommodate a spacious 4 BHK layout, crafted with modern finishes, clean lines, and ample natural light. ",
    location: "Gurugram, Haryana",
    client: "Private Client",
    category: "Residential",
    // year: "2023",
    gallery: [
      "/projects/modern-edge-house/1.jpg",
      "/projects/modern-edge-house/2.jpg",
      "/projects/modern-edge-house/3.jpg",
      "/projects/modern-edge-house/4.jpg",
      "/projects/modern-edge-house/5.jpg",
      "/projects/modern-edge-house/6.jpg",
      "/projects/modern-edge-house/7.jpg",
      "/projects/modern-edge-house/8.jpg",
      "/projects/modern-edge-house/9.jpg",
      "/projects/modern-edge-house/10.jpg",
      "/projects/modern-edge-house/11.jpg",
      // "/projects/modern-edge-house/12.jpg",
    ],
  },
  // The "More Projects" card (always included as last card)
  {
    id: 99,
    slug: "more-projects",
    title: "More Projects →",
    description: "Explore our full range of design projects.",
    gallery: [
      "/projects/more-projects.jpg",
    ],
  },
];
