"use client"
import { useRef, useEffect } from "react"

const SIZE = 75 // square size
const GLOW_RADIUS = 75 // how far glow spreads

export default function BackgroundSquares() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glowRef = useRef<number[][]>([])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const rows = Math.ceil(height / SIZE) + 1
    const cols = Math.ceil(width / SIZE) + 1
    glowRef.current = Array.from({ length: rows }, () =>
      Array(cols).fill(0)
    )

    function draw() {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "#090909"
      ctx.fillRect(0, 0, width, height)

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * SIZE
          const y = row * SIZE
          const glow = glowRef.current[row][col]

          ctx.beginPath()
          ctx.rect(x, y, SIZE, SIZE)
          if (glow > 0.01) {
            ctx.shadowColor = "rgba(0,255,255,0.8)"
            ctx.shadowBlur = 10 * glow
            ctx.strokeStyle = `rgba(0,255,255,${0.05 + glow * 0.5})`
            ctx.lineWidth = 1 + glow * 1.5
          } else {
            ctx.shadowBlur = 0
            ctx.strokeStyle = "rgba(180,190,200,0.05)"
            ctx.lineWidth = 1
          }
          ctx.stroke()
          ctx.shadowBlur = 0
        }
      }
      requestAnimationFrame(draw)
    }
    draw()

    function onMove(e: MouseEvent) {
      const mx = e.clientX
      const my = e.clientY
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cx = col * SIZE + SIZE / 2
          const cy = row * SIZE + SIZE / 2
          const dist = Math.hypot(mx - cx, my - cy)
          const targetGlow = dist < GLOW_RADIUS ? 1 - dist / GLOW_RADIUS : 0
          glowRef.current[row][col] +=
            (targetGlow - glowRef.current[row][col]) * 0.10
        }
      }
    }
    window.addEventListener("mousemove", onMove)

    function onResize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  )
}
