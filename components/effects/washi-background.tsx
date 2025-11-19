"use client"

import { useEffect, useRef, memo } from "react"

interface WashiBackgroundProps {
  className?: string
  intensity?: "subtle" | "medium" | "strong"
  animated?: boolean
}

export const WashiBackground = memo(function WashiBackground({ className = "", intensity = "medium", animated = false }: WashiBackgroundProps) {
  const grainLayerRef = useRef<HTMLDivElement>(null)
  const colorLayerRef = useRef<HTMLDivElement>(null)

  // モバイル検出を早期に実行
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    if (!animated) return
    const grainLayer = grainLayerRef.current
    const colorLayer = colorLayerRef.current
    if (!grainLayer || !colorLayer) return

    // パフォーマンス最適化: モバイルデバイスではアニメーションを軽減
    const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isMobile || reducedMotion) {
      // モバイルやprefers-reduced-motionではアニメーションを無効化
      return
    }

    let animationFrameId: number | undefined
    let time = 0
    let isActive = true

    const animate = () => {
      if (!isActive) return

      time += 0.004

      const breathingOpacity = 1 + Math.sin(time * 0.7) * 0.02

      if (grainLayer) {
        const offset = time * 12
        grainLayer.style.backgroundPosition = `
          ${offset * 0.8}px ${offset * 0.5}px,
          ${8 + offset * 0.6}px ${12 + offset * 0.55}px,
          ${offset * 0.5}px ${offset * 0.4}px
        `
        grainLayer.style.opacity = String(breathingOpacity)
      }

      if (colorLayer) {
        const colorOffset = time * 4
        const colorPulse = 1 + Math.sin(time * 0.5) * 0.08
        colorLayer.style.backgroundPosition = `
          ${colorOffset * 0.2}px ${colorOffset * 0.15}px,
          ${40 + colorOffset * 0.15}px ${50 + colorOffset * 0.18}px
        `
        colorLayer.style.opacity = String(colorPulse)
      }

      if (isActive) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      isActive = false
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = undefined
      }
    }
  }, [animated, isMobile])

  const intensityConfig = {
    subtle: { grain: 0.10, color: 0.12, glow: 0.32 },
    medium: { grain: 0.12, color: 0.15, glow: 0.38 },
    strong: { grain: 0.15, color: 0.18, glow: 0.45 },
  }

  const config = intensityConfig[intensity]

  // モバイルパフォーマンス最適化: モバイルでは簡素化されたパターン（2個のみ）
  const mobileBackgroundImage = `
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='fine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.0' numOctaves='2' seed='1'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.01 0.02'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23fine)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='medium'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' seed='7'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.01 0.02'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23medium)' fill='%23000'/%3E%3C/svg%3E")
  `

  // デスクトップ: パフォーマンス最適化（3個のパターンのみ、numOctaves削減）
  const desktopBackgroundImage = `
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='ultrafine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.8' numOctaves='3' seed='1'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.01 0.02'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23ultrafine)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='superfine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.8' numOctaves='2' seed='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.01 0.02'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23superfine)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='fine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='2' seed='7'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.01 0.02'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23fine)' fill='%23000'/%3E%3C/svg%3E")
  `

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ zIndex: 2 }}>
      {/* グレインレイヤー - 繊細で上品な質感 */}
      <div
        ref={grainLayerRef}
        className="absolute inset-0 washi-grain-layer"
        style={{
          opacity: config.grain,
          backgroundImage: isMobile ? mobileBackgroundImage : desktopBackgroundImage,
          backgroundSize: isMobile
            ? `80px 80px, 120px 120px`
            : `50px 50px, 80px 80px, 110px 110px`,
          backgroundPosition: isMobile
            ? `0 0, 10px 15px`
            : `0 0, 8px 12px, 0 0`,
          backgroundRepeat: "repeat",
          transition: "opacity 0.3s ease-out",
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
      />

      {/* 色調レイヤー - 明るく暖かな色調（暖色統合版） */}
      <div
        ref={colorLayerRef}
        className="absolute inset-0 washi-color-layer"
        style={{
          opacity: config.color,
          backgroundImage: isMobile
            ? `
              radial-gradient(ellipse 1200px 900px at 30% 40%, rgba(255, 245, 215, 0.35) 0%, transparent 65%),
              radial-gradient(ellipse 1000px 1000px at 70% 60%, rgba(250, 240, 210, 0.30) 0%, transparent 70%)
            `
            : `
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='1000'%3E%3Cfilter id='warmth1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.006' numOctaves='2' seed='37'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='0 0 0 0 0.98, 0 0 0 0 0.94, 0 0 0 0 0.86, 0 0 0 0.28 0'/%3E%3C/filter%3E%3Crect width='1000' height='1000' filter='url(%23warmth1)' fill='%23faecd0'/%3E%3C/svg%3E"),
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='1200'%3E%3Cfilter id='warmth2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.004' numOctaves='2' seed='41'/%3E%3CfeGaussianBlur stdDeviation='25'/%3E%3CfeColorMatrix values='0 0 0 0 0.99, 0 0 0 0 0.97, 0 0 0 0 0.93, 0 0 0 0.22 0'/%3E%3C/filter%3E%3Crect width='1200' height='1200' filter='url(%23warmth2)' fill='%23fff8ec'/%3E%3C/svg%3E")
            `,
          backgroundSize: isMobile
            ? `100% 100%, 100% 100%`
            : `800px 800px, 1000px 1000px`,
          backgroundPosition: isMobile
            ? `0 0, 0 0`
            : `0 0, 40px 50px`,
          backgroundRepeat: isMobile ? "no-repeat" : "repeat",
          transition: "opacity 0.35s ease-out",
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
      />

      {/* 光の統合レイヤー - 和紙特有の柔らかな光沢（glow + shimmer + diffusion統合） */}
      {!isMobile && (
        <div
          className="absolute inset-0 washi-glow-layer"
          style={{
            opacity: config.glow,
            backgroundImage: `
              radial-gradient(ellipse 1400px 1000px at 30% 25%, rgba(255, 250, 240, 0.55) 0%, transparent 55%),
              radial-gradient(ellipse 1200px 1400px at 75% 65%, rgba(255, 248, 235, 0.45) 0%, transparent 60%),
              radial-gradient(ellipse 1000px 800px at 50% 50%, rgba(254, 252, 245, 0.40) 0%, transparent 65%)
            `,
            mixBlendMode: "screen",
            filter: "blur(40px)",
            transition: "opacity 0.4s ease-out",
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        />
      )}
    </div>
  )
})
