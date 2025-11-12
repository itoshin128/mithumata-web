"use client"

import { useEffect, useRef } from "react"

interface WashiBackgroundProps {
  className?: string
  intensity?: "subtle" | "medium" | "strong"
  animated?: boolean
}

export function WashiBackground({ className = "", intensity = "medium", animated = false }: WashiBackgroundProps) {
  const grainLayerRef = useRef<HTMLDivElement>(null)
  const colorLayerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animated) return
    if (!grainLayerRef.current || !colorLayerRef.current) return

    let animationFrameId: number
    let time = 0

    const animate = () => {
      time += 0.004 // より繊細なアニメーション

      // 呼吸するような微妙な不透明度の変化
      const breathingOpacity = 1 + Math.sin(time * 0.7) * 0.02

      // グレインレイヤー
      if (grainLayerRef.current) {
        const offset = time * 12
        grainLayerRef.current.style.backgroundPosition = `
          ${offset * 0.8}px ${offset * 0.5}px,
          ${8 + offset * 0.6}px ${12 + offset * 0.55}px,
          ${offset * 0.5}px ${offset * 0.4}px,
          ${15 + offset * 0.45}px ${18 + offset * 0.5}px,
          ${offset * 0.3}px ${offset * 0.25}px,
          ${20 + offset * 0.35}px ${25 + offset * 0.3}px,
          ${offset * 0.4}px ${offset * 0.35}px,
          ${10 + offset * 0.5}px ${14 + offset * 0.45}px,
          ${offset * 0.25}px ${offset * 0.3}px,
          ${5 + offset * 0.55}px ${7 + offset * 0.6}px
        `
        grainLayerRef.current.style.opacity = String(breathingOpacity)
      }

      // 色調レイヤー - 非常にゆっくり
      if (colorLayerRef.current) {
        const colorOffset = time * 4
        const colorPulse = 1 + Math.sin(time * 0.5) * 0.08
        colorLayerRef.current.style.backgroundPosition = `
          ${colorOffset * 0.2}px ${colorOffset * 0.15}px,
          ${40 + colorOffset * 0.15}px ${50 + colorOffset * 0.18}px
        `
        colorLayerRef.current.style.opacity = String(colorPulse)
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

  const intensityConfig = {
    subtle: { grain: 0.65, color: 0.15 },
    medium: { grain: 0.75, color: 0.20 },
    strong: { grain: 0.85, color: 0.25 },
  }

  const config = intensityConfig[intensity]

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ zIndex: 2 }}>
      {/* グレインレイヤー - より多様で繊細な粒子 */}
      <div
        ref={grainLayerRef}
        className="absolute inset-0"
        style={{
          opacity: config.grain,
          mixBlendMode: "multiply",
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='ultrafine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.8' numOctaves='7' seed='1'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0 0 0.03 0.06'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23ultrafine)' fill='%23000'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='superfine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.8' numOctaves='6' seed='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0.04 0.08'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23superfine)' fill='%23000'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='fine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='5' seed='7'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.05 0.10'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23fine)' fill='%23000'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='mfine'%3E%3CfeTurbulence type='turbulence' baseFrequency='2.2' numOctaves='4' seed='11'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0.07 0.12'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23mfine)' fill='%23000'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='550' height='550'%3E%3Cfilter id='vfiber'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03 2.0' numOctaves='8' seed='13'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0 0.04 0.08'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='550' height='550' filter='url(%23vfiber)' fill='%23000'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='550' height='550'%3E%3Cfilter id='hfiber'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.0 0.03' numOctaves='8' seed='17'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0 0.04 0.08'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='550' height='550' filter='url(%23hfiber)' fill='%23000'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cfilter id='medium'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' seed='19'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0.06 0.11'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='320' height='320' filter='url(%23medium)' fill='%23000'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='380' height='380'%3E%3Cfilter id='coarse'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' seed='23'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0.05 0.09'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='380' height='380' filter='url(%23coarse)' fill='%23000'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='450' height='450'%3E%3Cfilter id='organic'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5 1.5' numOctaves='6' seed='29'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0 0.05 0.09'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='450' height='450' filter='url(%23organic)' fill='%23000'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='texture'%3E%3CfeTurbulence type='turbulence' baseFrequency='2.5' numOctaves='5' seed='31'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0.06 0.11'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23texture)' fill='%23000'/%3E%3C/svg%3E")
          `,
          backgroundSize: `
            50px 50px,
            80px 80px,
            110px 110px,
            95px 95px,
            420px 420px,
            420px 420px,
            140px 140px,
            180px 180px,
            320px 320px,
            70px 70px
          `,
          backgroundPosition: `
            0 0,
            8px 12px,
            0 0,
            15px 18px,
            0 0,
            20px 25px,
            0 0,
            10px 14px,
            0 0,
            5px 7px
          `,
          backgroundRepeat: "repeat",
          transition: "opacity 0.3s ease-out",
        }}
      />

      {/* 色調レイヤー - 非常に薄い温かみ */}
      <div
        ref={colorLayerRef}
        className="absolute inset-0"
        style={{
          opacity: config.color,
          mixBlendMode: "overlay",
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='1200'%3E%3Cfilter id='warmth1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.006' numOctaves='4' seed='37'/%3E%3CfeGaussianBlur stdDeviation='30'/%3E%3CfeColorMatrix values='0 0 0 0 0.45, 0 0 0 0 0.38, 0 0 0 0 0.28, 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='1200' height='1200' filter='url(%23warmth1)' fill='%23e8d4b8'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1400' height='1400'%3E%3Cfilter id='warmth2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.004' numOctaves='3' seed='41'/%3E%3CfeGaussianBlur stdDeviation='35'/%3E%3CfeColorMatrix values='0 0 0 0 0.98, 0 0 0 0 0.92, 0 0 0 0 0.78, 0 0 0 0.35 0'/%3E%3C/filter%3E%3Crect width='1400' height='1400' filter='url(%23warmth2)' fill='%23f5e8d5'/%3E%3C/svg%3E")
          `,
          backgroundSize: `
            1000px 1000px,
            1200px 1200px
          `,
          backgroundPosition: `
            0 0,
            40px 50px
          `,
          backgroundRepeat: "repeat",
          transition: "opacity 0.35s ease-out",
        }}
      />
    </div>
  )
}
