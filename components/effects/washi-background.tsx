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
          ${offset * 0.5}px ${offset * 0.4}px,
          ${15 + offset * 0.45}px ${18 + offset * 0.5}px,
          ${offset * 0.3}px ${offset * 0.25}px,
          ${20 + offset * 0.35}px ${25 + offset * 0.3}px,
          ${offset * 0.4}px ${offset * 0.35}px,
          ${10 + offset * 0.5}px ${14 + offset * 0.45}px,
          ${offset * 0.25}px ${offset * 0.3}px,
          ${5 + offset * 0.55}px ${7 + offset * 0.6}px
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
  }, [animated])

  const intensityConfig = {
    subtle: { grain: 0.35, color: 0.14, glow: 0.10 },
    medium: { grain: 0.40, color: 0.17, glow: 0.13 },
    strong: { grain: 0.45, color: 0.20, glow: 0.16 },
  }

  const config = intensityConfig[intensity]

  // モバイルパフォーマンス最適化: モバイルでは簡素化されたパターン
  const mobileBackgroundImage = `
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='fine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.0' numOctaves='4' seed='1'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.08 0.15'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23fine)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='medium'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' seed='7'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.10 0.18'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23medium)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='coarse'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' seed='13'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.12 0.20'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23coarse)' fill='%23000'/%3E%3C/svg%3E")
  `

  const desktopBackgroundImage = `
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='ultrafine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.8' numOctaves='7' seed='1'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.04 0.09 0.15'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23ultrafine)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='superfine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.8' numOctaves='6' seed='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.06 0.12 0.20'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23superfine)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='fine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='5' seed='7'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.08 0.14 0.22'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23fine)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='mfine'%3E%3CfeTurbulence type='turbulence' baseFrequency='2.2' numOctaves='4' seed='11'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.09 0.16 0.25'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23mfine)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='550' height='550'%3E%3Cfilter id='vfiber'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03 2.0' numOctaves='8' seed='13'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0.06 0.12 0.20'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='550' height='550' filter='url(%23vfiber)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='550' height='550'%3E%3Cfilter id='hfiber'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.0 0.03' numOctaves='8' seed='17'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0.06 0.12 0.20'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='550' height='550' filter='url(%23hfiber)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cfilter id='medium'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' seed='19'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.08 0.15 0.24'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='320' height='320' filter='url(%23medium)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='380' height='380'%3E%3Cfilter id='coarse'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' seed='23'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.07 0.13 0.21'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='380' height='380' filter='url(%23coarse)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='450' height='450'%3E%3Cfilter id='organic'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5 1.5' numOctaves='6' seed='29'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0.06 0.11 0.18'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='450' height='450' filter='url(%23organic)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='texture'%3E%3CfeTurbulence type='turbulence' baseFrequency='2.5' numOctaves='5' seed='31'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.08 0.14 0.22'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23texture)' fill='%23000'/%3E%3C/svg%3E")
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
            ? `80px 80px, 120px 120px, 200px 200px`
            : `50px 50px, 80px 80px, 110px 110px, 95px 95px, 420px 420px, 420px 420px, 140px 140px, 180px 180px, 320px 320px, 70px 70px`,
          backgroundPosition: isMobile
            ? `0 0, 10px 15px, 0 0`
            : `0 0, 8px 12px, 0 0, 15px 18px, 0 0, 20px 25px, 0 0, 10px 14px, 0 0, 5px 7px`,
          backgroundRepeat: "repeat",
          transition: "opacity 0.3s ease-out",
        }}
      />

      {/* 色調レイヤー - 明るく暖かな色調 */}
      <div
        ref={colorLayerRef}
        className="absolute inset-0 washi-color-layer"
        style={{
          opacity: config.color,
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='1200'%3E%3Cfilter id='warmth1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.006' numOctaves='4' seed='37'/%3E%3CfeGaussianBlur stdDeviation='35'/%3E%3CfeColorMatrix values='0 0 0 0 0.97, 0 0 0 0 0.94, 0 0 0 0 0.91, 0 0 0 0.25 0'/%3E%3C/filter%3E%3Crect width='1200' height='1200' filter='url(%23warmth1)' fill='%23f5ecdf'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1400' height='1400'%3E%3Cfilter id='warmth2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.004' numOctaves='3' seed='41'/%3E%3CfeGaussianBlur stdDeviation='40'/%3E%3CfeColorMatrix values='0 0 0 0 0.99, 0 0 0 0 0.98, 0 0 0 0 0.97, 0 0 0 0.18 0'/%3E%3C/filter%3E%3Crect width='1400' height='1400' filter='url(%23warmth2)' fill='%23fcfaf7'/%3E%3C/svg%3E")
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

      {/* 光の透過感レイヤー - 和紙特有の柔らかな光沢 */}
      <div
        className="absolute inset-0 washi-glow-layer"
        style={{
          opacity: config.glow,
          backgroundImage: `
            radial-gradient(ellipse 1200px 900px at 30% 20%, rgba(255, 250, 240, 0.6) 0%, transparent 50%),
            radial-gradient(ellipse 1000px 1200px at 75% 60%, rgba(255, 248, 235, 0.5) 0%, transparent 50%),
            radial-gradient(ellipse 800px 600px at 50% 50%, rgba(254, 252, 245, 0.4) 0%, transparent 60%)
          `,
          mixBlendMode: "screen",
          filter: "blur(50px)",
          transition: "opacity 0.4s ease-out",
        }}
      />

      {/* 繊細な輝きレイヤー - 上品な光の粒子 */}
      <div
        className="absolute inset-0 washi-shimmer-layer"
        style={{
          opacity: config.glow * 0.6,
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Cfilter id='shimmer1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='3' seed='101'/%3E%3CfeColorMatrix values='0 0 0 0 1, 0 0 0 0 0.98, 0 0 0 0 0.94, 0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='800' height='800' filter='url(%23shimmer1)' fill='%23fffcf5'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Cfilter id='shimmer2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.020' numOctaves='2' seed='103'/%3E%3CfeColorMatrix values='0 0 0 0 1, 0 0 0 0 0.99, 0 0 0 0 0.96, 0 0 0 0.12 0'/%3E%3C/filter%3E%3Crect width='600' height='600' filter='url(%23shimmer2)' fill='%23fffef9'/%3E%3C/svg%3E")
          `,
          backgroundSize: `
            800px 800px,
            600px 600px
          `,
          backgroundPosition: `
            0 0,
            200px 150px
          `,
          backgroundRepeat: "repeat",
          mixBlendMode: "soft-light",
          filter: "blur(25px)",
          transition: "opacity 0.4s ease-out",
        }}
      />
    </div>
  )
})
