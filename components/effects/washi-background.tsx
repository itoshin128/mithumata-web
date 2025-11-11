"use client"

import { useEffect, useRef } from "react"

interface WashiBackgroundProps {
  className?: string
  intensity?: "subtle" | "medium" | "strong"
  animated?: boolean
}

export function WashiBackground({ className = "", intensity = "medium", animated = false }: WashiBackgroundProps) {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animated || !canvasRef.current) return

    let animationFrameId: number
    let offset = 0

    const animate = () => {
      offset += 0.15
      if (canvasRef.current) {
        canvasRef.current.style.backgroundPosition = `
          ${offset}px ${offset}px, 
          ${25 + offset * 0.4}px ${25 + offset * 0.4}px, 
          0 0, 
          ${50 + offset * 0.25}px ${50 + offset * 0.25}px, 
          ${12 + offset * 0.7}px ${12 + offset * 0.7}px,
          ${75 + offset * 0.2}px ${75 + offset * 0.2}px,
          center, center, center, center, center
        `
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [animated])

  const intensityStyles = {
    subtle: "opacity-75",
    medium: "opacity-90",
    strong: "opacity-100",
  }

  return (
    <div
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${intensityStyles[intensity]} ${className}`}
      style={{
        zIndex: 0,
        backgroundColor: "#fffef9",
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='grain1b'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='12' seed='11'/%3E%3CfeColorMatrix values='0 0 0 0 0.35, 0 0 0 0 0.33, 0 0 0 0 0.29, 0 0 0 0.28 0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23grain1b)' opacity='0.25'/%3E%3C/svg%3E"),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='grain2b'%3E%3CfeTurbulence type='turbulence' baseFrequency='1.8' numOctaves='10' seed='27'/%3E%3CfeColorMatrix values='0 0 0 0 0.32, 0 0 0 0 0.30, 0 0 0 0 0.26, 0 0 0 0.24 0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23grain2b)' opacity='0.22'/%3E%3C/svg%3E"),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Cfilter id='fiberb'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03 2.1' numOctaves='8' seed='43'/%3E%3CfeColorMatrix values='0 0 0 0 0.34, 0 0 0 0 0.32, 0 0 0 0 0.28, 0 0 0 0.22 0'/%3E%3C/filter%3E%3Crect width='500' height='500' filter='url(%23fiberb)' opacity='0.20'/%3E%3C/svg%3E"),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='mediumb'%3E%3CfeTurbulence type='turbulence' baseFrequency='1.3' numOctaves='9' seed='61'/%3E%3CfeColorMatrix values='0 0 0 0 0.37, 0 0 0 0 0.35, 0 0 0 0 0.31, 0 0 0 0.26 0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23mediumb)' opacity='0.23'/%3E%3C/svg%3E"),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='ultrab'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.2' numOctaves='14' seed='81'/%3E%3CfeColorMatrix values='0 0 0 0 0.39, 0 0 0 0 0.37, 0 0 0 0 0.33, 0 0 0 0.3 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23ultrab)' opacity='0.28'/%3E%3C/svg%3E"),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cfilter id='depthb'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.025' numOctaves='6' seed='99'/%3E%3CfeGaussianBlur stdDeviation='3'/%3E%3CfeColorMatrix values='0 0 0 0 0.98, 0 0 0 0 0.97, 0 0 0 0 0.95, 0 0 0 0.32 0'/%3E%3C/filter%3E%3Crect width='600' height='600' filter='url(%23depthb)' opacity='0.22'/%3E%3C/svg%3E"),
          radial-gradient(ellipse 1400px 1200px at 15% 10%, rgba(255, 254, 251, 0.45) 0%, transparent 45%),
          radial-gradient(ellipse 1200px 1400px at 85% 45%, rgba(255, 253, 249, 0.38) 0%, transparent 50%),
          radial-gradient(ellipse 1500px 1000px at 50% 85%, rgba(255, 254, 250, 0.42) 0%, transparent 45%),
          radial-gradient(ellipse 800px 900px at 25% 60%, rgba(255, 254, 251, 0.32) 0%, transparent 55%),
          linear-gradient(
            135deg,
            #fffefa 0%,
            #fffef9 10%,
            #fffdf8 20%,
            #fffdf7 30%,
            #fffcf6 40%,
            #fffcf5 50%,
            #fffdf8 60%,
            #fffef9 70%,
            #fffefa 80%,
            #fffdf7 90%,
            #fffcf6 100%
          )
        `,
        backgroundSize: `
          100px 100px,
          150px 150px,
          280px 280px,
          120px 120px,
          80px 80px,
          400px 400px,
          100% 100%,
          100% 100%,
          100% 100%,
          100% 100%,
          100% 100%
        `,
        backgroundPosition: `
          0 0,
          25px 25px,
          0 0,
          50px 50px,
          12px 12px,
          75px 75px,
          center,
          center,
          center,
          center,
          center
        `,
        backgroundBlendMode: `
          multiply,
          overlay,
          soft-light,
          multiply,
          overlay,
          soft-light,
          normal,
          normal,
          normal,
          normal,
          normal
        `,
      }}
    />
  )
}
