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
      offset += 0.08
      if (canvasRef.current) {
        canvasRef.current.style.backgroundPosition = `
          ${offset}px ${offset * 0.5}px,
          ${15 + offset * 0.3}px ${20 + offset * 0.4}px,
          ${offset * 0.6}px ${offset * 0.3}px,
          ${30 + offset * 0.2}px ${40 + offset * 0.25}px,
          ${8 + offset * 0.5}px ${12 + offset * 0.7}px,
          ${50 + offset * 0.15}px ${60 + offset * 0.2}px,
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
    subtle: "opacity-80",
    medium: "opacity-95",
    strong: "opacity-100",
  }

  return (
    <div
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${intensityStyles[intensity]} ${className}`}
      style={{
        zIndex: 2,
        mixBlendMode: "multiply",
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='grain1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='1'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0.05 0.1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23grain1)' fill='%23000'/%3E%3C/svg%3E"),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='grain2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='5' seed='5'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.08 0.15'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23grain2)' fill='%23000'/%3E%3C/svg%3E"),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cfilter id='fiber'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05 1.2' numOctaves='6' seed='10'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0 0.06 0.12'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='600' height='600' filter='url(%23fiber)' fill='%23000'/%3E%3C/svg%3E"),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='grain3'%3E%3CfeTurbulence type='turbulence' baseFrequency='2.2' numOctaves='3' seed='15'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.1 0.18'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23grain3)' fill='%23000'/%3E%3C/svg%3E"),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='grain4'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' seed='20'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0.07 0.14'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23grain4)' fill='%23000'/%3E%3C/svg%3E"),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Cfilter id='fiber2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.08 0.8' numOctaves='5' seed='25'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0 0.05 0.1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='500' height='500' filter='url(%23fiber2)' fill='%23000'/%3E%3C/svg%3E")
        `,
        backgroundSize: `
          120px 120px,
          90px 90px,
          400px 400px,
          70px 70px,
          100px 100px,
          350px 350px
        `,
        backgroundPosition: `
          0 0,
          15px 20px,
          0 0,
          30px 40px,
          8px 12px,
          50px 60px
        `,
        backgroundRepeat: "repeat",
      }}
    />
  )
}
