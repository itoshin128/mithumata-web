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
    subtle: { grain: 0.10, color: 0.12, glow: 0.35, diffusion: 0.25, iridescence: 0.18, warmth: 0.20 },
    medium: { grain: 0.12, color: 0.15, glow: 0.42, diffusion: 0.30, iridescence: 0.22, warmth: 0.25 },
    strong: { grain: 0.15, color: 0.18, glow: 0.50, diffusion: 0.35, iridescence: 0.25, warmth: 0.30 },
  }

  const config = intensityConfig[intensity]

  // モバイルパフォーマンス最適化: モバイルでは簡素化されたパターン（極限まで軽量化）
  const mobileBackgroundImage = `
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='fine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.0' numOctaves='4' seed='1'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.01 0.03'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23fine)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='medium'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' seed='7'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.02 0.04'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23medium)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='coarse'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' seed='13'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.02 0.04'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23coarse)' fill='%23000'/%3E%3C/svg%3E")
  `

  // デスクトップ: 極限まで軽量化し透明感を追求（alpha値を1/3に削減）
  const desktopBackgroundImage = `
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='ultrafine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.8' numOctaves='5' seed='1'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.01 0.02 0.03'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23ultrafine)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='superfine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.8' numOctaves='4' seed='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.01 0.02 0.04'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23superfine)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='fine'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='3' seed='7'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.01 0.02 0.04'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23fine)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='450' height='450'%3E%3Cfilter id='vfiber'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03 2.0' numOctaves='6' seed='13'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0.01 0.02 0.03'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='450' height='450' filter='url(%23vfiber)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='450' height='450'%3E%3Cfilter id='hfiber'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.0 0.03' numOctaves='6' seed='17'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0.01 0.02 0.03'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='450' height='450' filter='url(%23hfiber)' fill='%23000'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cfilter id='medium'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' seed='19'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0.01 0.03 0.04'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='320' height='320' filter='url(%23medium)' fill='%23000'/%3E%3C/svg%3E")
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
            : `50px 50px, 80px 80px, 110px 110px, 380px 380px, 380px 380px, 140px 140px`,
          backgroundPosition: isMobile
            ? `0 0, 10px 15px, 0 0`
            : `0 0, 8px 12px, 0 0, 0 0, 20px 25px, 0 0`,
          backgroundRepeat: "repeat",
          transition: "opacity 0.3s ease-out",
        }}
      />

      {/* 色調レイヤー - 明るく暖かな色調（クリーム色強化） */}
      <div
        ref={colorLayerRef}
        className="absolute inset-0 washi-color-layer"
        style={{
          opacity: config.color,
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='1200'%3E%3Cfilter id='warmth1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.006' numOctaves='4' seed='37'/%3E%3CfeGaussianBlur stdDeviation='35'/%3E%3CfeColorMatrix values='0 0 0 0 0.98, 0 0 0 0 0.94, 0 0 0 0 0.86, 0 0 0 0.32 0'/%3E%3C/filter%3E%3Crect width='1200' height='1200' filter='url(%23warmth1)' fill='%23faecd0'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1400' height='1400'%3E%3Cfilter id='warmth2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.004' numOctaves='3' seed='41'/%3E%3CfeGaussianBlur stdDeviation='40'/%3E%3CfeColorMatrix values='0 0 0 0 0.99, 0 0 0 0 0.97, 0 0 0 0 0.93, 0 0 0 0.24 0'/%3E%3C/filter%3E%3Crect width='1400' height='1400' filter='url(%23warmth2)' fill='%23fff8ec'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='1000'%3E%3Cfilter id='warmth3'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.008' numOctaves='4' seed='47'/%3E%3CfeGaussianBlur stdDeviation='30'/%3E%3CfeColorMatrix values='0 0 0 0 0.96, 0 0 0 0 0.92, 0 0 0 0 0.84, 0 0 0 0.20 0'/%3E%3C/filter%3E%3Crect width='1000' height='1000' filter='url(%23warmth3)' fill='%23f5e8d0'/%3E%3C/svg%3E")
          `,
          backgroundSize: `
            1000px 1000px,
            1200px 1200px,
            800px 800px
          `,
          backgroundPosition: `
            0 0,
            40px 50px,
            80px 100px
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

      {/* 光の拡散レイヤー - 柔らかく広がる光の表現 */}
      <div
        className="absolute inset-0 washi-diffusion-layer"
        style={{
          opacity: config.diffusion,
          backgroundImage: `
            radial-gradient(ellipse 2000px 1500px at 20% 30%, rgba(255, 255, 255, 0.8) 0%, transparent 60%),
            radial-gradient(ellipse 1800px 1800px at 80% 70%, rgba(255, 254, 250, 0.7) 0%, transparent 65%),
            radial-gradient(ellipse 1500px 1000px at 50% 50%, rgba(255, 253, 245, 0.6) 0%, transparent 70%),
            radial-gradient(circle 2500px at 60% 40%, rgba(255, 252, 242, 0.5) 0%, transparent 75%)
          `,
          filter: "blur(80px)",
          transition: "opacity 0.5s ease-out",
        }}
      />

      {/* 虹彩レイヤー - ゴールデンアワーの暖かい光の反射 */}
      <div
        className="absolute inset-0 washi-iridescence-layer"
        style={{
          opacity: config.iridescence,
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='1600'%3E%3Cfilter id='iridescent1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.002' numOctaves='5' seed='201'/%3E%3CfeGaussianBlur stdDeviation='60'/%3E%3CfeColorMatrix values='0 0 0 0 0.98, 0 0 0 0 0.93, 0 0 0 0 0.80, 0 0 0 0.12 0'/%3E%3C/filter%3E%3Crect width='1600' height='1600' filter='url(%23iridescent1)' fill='%23fae8c0'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1800' height='1800'%3E%3Cfilter id='iridescent2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.0015' numOctaves='4' seed='207'/%3E%3CfeGaussianBlur stdDeviation='70'/%3E%3CfeColorMatrix values='0 0 0 0 0.97, 0 0 0 0 0.90, 0 0 0 0 0.78, 0 0 0 0.10 0'/%3E%3C/filter%3E%3Crect width='1800' height='1800' filter='url(%23iridescent2)' fill='%23f7e5c8'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1400' height='1400'%3E%3Cfilter id='iridescent3'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.0025' numOctaves='5' seed='211'/%3E%3CfeGaussianBlur stdDeviation='50'/%3E%3CfeColorMatrix values='0 0 0 0 0.99, 0 0 0 0 0.95, 0 0 0 0 0.85, 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='1400' height='1400' filter='url(%23iridescent3)' fill='%23fff0d8'/%3E%3C/svg%3E"),
            radial-gradient(ellipse 3000px 2000px at 40% 60%, rgba(250, 235, 200, 0.20) 0%, transparent 80%)
          `,
          backgroundSize: `
            1400px 1400px,
            1600px 1600px,
            1200px 1200px,
            100% 100%
          `,
          backgroundPosition: `
            0 0,
            300px 200px,
            150px 100px,
            0 0
          `,
          backgroundRepeat: "repeat, repeat, repeat, no-repeat",
          filter: "blur(100px)",
          transition: "opacity 0.5s ease-out",
        }}
      />

      {/* 暖色拡散レイヤー - 和紙特有の柔らかなクリーム色の光 */}
      <div
        className="absolute inset-0 washi-warmth-layer"
        style={{
          opacity: config.warmth,
          backgroundImage: `
            radial-gradient(ellipse 2200px 1600px at 25% 35%, rgba(255, 240, 200, 0.85) 0%, transparent 65%),
            radial-gradient(ellipse 1900px 1900px at 75% 65%, rgba(252, 235, 190, 0.80) 0%, transparent 70%),
            radial-gradient(ellipse 2500px 1800px at 50% 50%, rgba(255, 245, 210, 0.75) 0%, transparent 75%),
            radial-gradient(circle 2000px at 60% 40%, rgba(250, 230, 180, 0.70) 0%, transparent 70%),
            radial-gradient(ellipse 1600px 1200px at 30% 70%, rgba(255, 238, 195, 0.65) 0%, transparent 65%)
          `,
          filter: "blur(120px)",
          mixBlendMode: "overlay",
          transition: "opacity 0.5s ease-out",
        }}
      />
    </div>
  )
})
