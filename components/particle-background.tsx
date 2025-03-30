"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

type Particle = {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const mouseX = useRef(0)
  const mouseY = useRef(0)

  // Set up canvas and particles ONCE
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles ONCE
    const colors = ["#6366f1", "#8b5cf6", "#d946ef", "#ec4899"]
    particlesRef.current = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    // Track mouse movement (NO re-renders)
    const updateMouse = (e: MouseEvent) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
    }
    window.addEventListener("mousemove", updateMouse)

    // Animation loop (NEVER updates React state)
    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Apply mouse influence
        const dx = mouseX.current - p.x
        const dy = mouseY.current - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 200 && distance > 0) {
          const force = (200 - distance) / 200
          p.speedX += (dx / distance) * force * 0.02
          p.speedY += (dy / distance) * force * 0.02
        }

        // Speed limits
        p.speedX = Math.max(-1, Math.min(1, p.speedX))
        p.speedY = Math.max(-1, Math.min(1, p.speedY))

        // Update position
        p.x += p.speedX
        p.y += p.speedY

        // Wrap around screen
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(99,102,241,${((100 - dist) / 100) * 0.2})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", updateMouse)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, []) // Empty dependency array - run once on mount

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}

