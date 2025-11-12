"use client"

import { useEffect, useRef } from "react"

interface WashiBackgroundProps {
  className?: string
  intensity?: "subtle" | "medium" | "strong"
  animated?: boolean
}

export function WashiBackground({ className = "", intensity = "medium", animated = false }: WashiBackgroundProps) {
  const grainLayerRef = useRef<HTMLDivElement>(null)
  const lightLayerRef = useRef<HTMLDivElement>(null)
  const overlayLayerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animated) return
    if (!grainLayerRef.current || !lightLayerRef.current || !overlayLayerRef.current) return

    let animationFrameId: number
    let time = 0

    const animate = () => {
      time += 0.005 // より繊細なアニメーション速度

      // 呼吸するような不透明度の変化
      const breathingOpacity = 1 + Math.sin(time * 0.8) * 0.03
      const breathingScale = 1 + Math.sin(time * 0.6) * 0.008

      // グレインレイヤー - ゆっくりと動く
      if (grainLayerRef.current) {
        const offset = time * 15
        grainLayerRef.current.style.backgroundPosition = `
          ${offset}px ${offset * 0.4}px,
          ${10 + offset * 0.6}px ${15 + offset * 0.5}px,
          ${offset * 0.3}px ${offset * 0.25}px,
          ${20 + offset * 0.45}px ${25 + offset * 0.35}px,
          ${5 + offset * 0.55}px ${8 + offset * 0.5}px,
          ${30 + offset * 0.25}px ${35 + offset * 0.3}px,
          ${offset * 0.2}px ${offset * 0.15}px,
          ${12 + offset * 0.4}px ${18 + offset * 0.45}px
        `
        grainLayerRef.current.style.opacity = String(breathingOpacity)
      }

      // 光の透過レイヤー - 波打つような動き
      if (lightLayerRef.current) {
        const lightOffset = time * 8
        const lightPulse = 1 + Math.sin(time * 1.2) * 0.15
        lightLayerRef.current.style.backgroundPosition = `
          ${lightOffset * 0.5}px ${lightOffset * 0.3}px,
          ${40 + lightOffset * 0.4}px ${50 + lightOffset * 0.35}px,
          ${lightOffset * 0.25}px ${lightOffset * 0.4}px
        `
        lightLayerRef.current.style.opacity = String(lightPulse * 0.3)
      }

      // オーバーレイレイヤー - 最もゆっくり
      if (overlayLayerRef.current) {
        const overlayOffset = time * 5
        overlayLayerRef.current.style.backgroundPosition = `
          ${overlayOffset * 0.3}px ${overlayOffset * 0.2}px,
          ${60 + overlayOffset * 0.25}px ${70 + overlayOffset * 0.2}px
        `
        overlayLayerRef.current.style.transform = `scale(${breathingScale})`
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
    subtle: { grain: 0.7, light: 0.6, overlay: 0.5 },
    medium: { grain: 0.85, light: 0.75, overlay: 0.7 },
    strong: { grain: 1.0, light: 0.9, overlay: 0.85 },
  }

  const config = intensityConfig[intensity]

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ zIndex: 2 }}>
      {/* グレインレイヤー - 暗い粒子と繊維 */}
      <div
        ref={grainLayerRef}
        className="absolute inset-0"
        style={{
          opacity: config.grain,
          mixBlendMode: "multiply",
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='ultrafine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='6' seed='1'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0 0.04 0.08'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23ultrafine)' fill='%23000'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='fine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='5' seed='7'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.06 0.12'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23fine)' fill='%23000'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='medium'%3E%3CfeTurbulence type='turbulence' baseFrequency='2.5' numOctaves='4' seed='13'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0.09 0.16'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23medium)' fill='%23000'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Cfilter id='vfiber'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04 1.8' numOctaves='7' seed='19'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0 0.05 0.09'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='500' height='500' filter='url(%23vfiber)' fill='%23000'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Cfilter id='hfiber'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8 0.04' numOctaves='7' seed='23'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0 0.05 0.09'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='500' height='500' filter='url(%23hfiber)' fill='%23000'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='coarse'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='29'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0.07 0.13'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23coarse)' fill='%23000'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='organic'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6 1.4' numOctaves='6' seed='31'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0 0.06 0.11'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23organic)' fill='%23000'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='detail'%3E%3CfeTurbulence type='turbulence' baseFrequency='2.8' numOctaves='5' seed='37'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0.08 0.14'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23detail)' fill='%23000'/%3E%3C/svg%3E")
          `,
          backgroundSize: `
            60px 60px,
            110px 110px,
            75px 75px,
            380px 380px,
            380px 380px,
            140px 140px,
            280px 280px,
            95px 95px
          `,
          backgroundPosition: `
            0 0,
            10px 15px,
            0 0,
            20px 25px,
            5px 8px,
            30px 35px,
            0 0,
            12px 18px
          `,
          backgroundRepeat: "repeat",
          transition: "opacity 0.3s ease-out",
        }}
      />

      {/* 光の透過レイヤー - 和紙を通る柔らかい光 */}
      <div
        ref={lightLayerRef}
        className="absolute inset-0"
        style={{
          opacity: config.light * 0.3,
          mixBlendMode: "screen",
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Cfilter id='glow1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='4' seed='41'/%3E%3CfeGaussianBlur stdDeviation='8'/%3E%3CfeColorMatrix values='1 0 0 0 0.99, 0 1 0 0 0.98, 0 0 1 0 0.95, 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='800' height='800' filter='url(%23glow1)' fill='%23fffef8'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cfilter id='glow2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.025' numOctaves='5' seed='43'/%3E%3CfeGaussianBlur stdDeviation='12'/%3E%3CfeColorMatrix values='1 0 0 0 0.98, 0 1 0 0 0.97, 0 0 1 0 0.94, 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='600' height='600' filter='url(%23glow2)' fill='%23fdfcf6'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='900'%3E%3Cfilter id='glow3'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='3' seed='47'/%3E%3CfeGaussianBlur stdDeviation='15'/%3E%3CfeColorMatrix values='1 0 0 0 1, 0 1 0 0 0.99, 0 0 1 0 0.96, 0 0 0 0.45 0'/%3E%3C/filter%3E%3Crect width='900' height='900' filter='url(%23glow3)' fill='%23fffef9'/%3E%3C/svg%3E")
          `,
          backgroundSize: `
            700px 700px,
            550px 550px,
            850px 850px
          `,
          backgroundPosition: `
            0 0,
            40px 50px,
            0 0
          `,
          backgroundRepeat: "repeat",
          transition: "opacity 0.4s ease-out",
        }}
      />

      {/* オーバーレイレイヤー - 厚みの変化と温かみの色調 */}
      <div
        ref={overlayLayerRef}
        className="absolute inset-0"
        style={{
          opacity: config.overlay,
          mixBlendMode: "overlay",
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='1000'%3E%3Cfilter id='thickness'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.008' numOctaves='5' seed='53'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='0 0 0 0 0.4, 0 0 0 0 0.35, 0 0 0 0 0.3, 0 0 0 0.35 0'/%3E%3C/filter%3E%3Crect width='1000' height='1000' filter='url(%23thickness)' fill='%23d4a373'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='1200'%3E%3Cfilter id='warmth'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.006' numOctaves='4' seed='59'/%3E%3CfeGaussianBlur stdDeviation='25'/%3E%3CfeColorMatrix values='0 0 0 0 0.98, 0 0 0 0 0.9, 0 0 0 0 0.7, 0 0 0 0.25 0'/%3E%3C/filter%3E%3Crect width='1200' height='1200' filter='url(%23warmth)' fill='%23f5e6d3'/%3E%3C/svg%3E")
          `,
          backgroundSize: `
            900px 900px,
            1100px 1100px
          `,
          backgroundPosition: `
            0 0,
            60px 70px
          `,
          backgroundRepeat: "repeat",
          transition: "opacity 0.35s ease-out, transform 0.5s ease-out",
          transformOrigin: "center center",
        }}
      />
    </div>
  )
}
