'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface TreeShadowBackgroundProps {
  intensity?: 'subtle' | 'medium' | 'strong'
  enableParallax?: boolean
  className?: string
}

interface LightParticle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  intensity: number
}

export default function TreeShadowBackground({
  intensity = 'medium',
  enableParallax = true,
  className = '',
}: TreeShadowBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [lightParticles, setLightParticles] = useState<LightParticle[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const animationFrameRef = useRef<number | undefined>(undefined)

  // Intensity settings - より控えめで上品な透明度に調整
  const opacityLevels = {
    subtle: { deep: 0.11, mid: 0.08, light: 0.06, sunlight: 0.18 },
    medium: { deep: 0.22, mid: 0.16, light: 0.12, sunlight: 0.35 },
    strong: { deep: 0.3, mid: 0.22, light: 0.16, sunlight: 0.45 },
  }

  const opacity = opacityLevels[intensity]

  // モバイル判定
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // 初期チェック
    checkMobile()

    // リサイズ時にチェック
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 木漏れ日のパーティクルを生成
  useEffect(() => {
    const particleCount = intensity === 'subtle' ? 8 : intensity === 'medium' ? 12 : 18
    const particles: LightParticle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 20, // 20-60px
        duration: Math.random() * 8 + 12, // 12-20秒
        delay: Math.random() * 10,
        intensity: Math.random() * 0.4 + 0.3, // 0.3-0.7
      })
    }

    setLightParticles(particles)
  }, [intensity])

  // Mouse parallax effect
  useEffect(() => {
    if (!enableParallax) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2 // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2 // -1 to 1
      setMousePosition({ x, y })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [enableParallax])

  // 風による揺れのアニメーション
  useEffect(() => {
    let time = 0
    const layers = containerRef.current?.querySelectorAll('.tree-shadow-layer')
    if (!layers) return

    const animate = () => {
      time += 0.008 // アニメーション速度

      layers.forEach((layer, index) => {
        const element = layer as HTMLElement

        // 各レイヤーで異なる揺れのパラメータ
        const baseSpeed = 0.3 + index * 0.15
        const amplitude = 2.5 + index * 1.2

        // 複数の波を組み合わせた自然な揺れ
        const wave1 = Math.sin(time * baseSpeed) * amplitude
        const wave2 = Math.cos(time * baseSpeed * 0.7) * amplitude * 0.7
        const wave3 = Math.sin(time * baseSpeed * 1.4) * amplitude * 0.5

        // 風で揺れる動き - より大きな動きに
        const rotateZ = (wave1 + wave2) * 0.4
        const translateX = (Math.sin(time * baseSpeed * 1.2) * amplitude * 2) + wave2 * 1.5
        const translateY = (Math.cos(time * baseSpeed * 0.8) * amplitude * 1.5) + wave3 * 1.2

        // 微妙なスケール変化で呼吸するような効果
        const scale = 1 + Math.sin(time * baseSpeed * 0.4) * 0.03

        // 不透明度も微妙に変化させて雲の流れを表現
        const opacityFluctuation = 1 + Math.sin(time * baseSpeed * 0.25) * 0.15

        element.style.transform = `
          translate(${translateX}px, ${translateY}px)
          rotate(${rotateZ}deg)
          scale(${scale})
        `
        element.style.opacity = String(opacityFluctuation)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Calculate parallax transforms
  const getParallaxStyle = (depth: number) => {
    if (!enableParallax) return {}

    const mouseX = mousePosition.x * depth * 20
    const mouseY = mousePosition.y * depth * 20
    const scrollOffset = scrollY * depth * 0.2

    return {
      transform: `translate3d(${mouseX}px, ${mouseY + scrollOffset}px, 0)`,
    }
  }

  // 使用する画像パス
  const treeShadowImage = isMobile ? '/images/treeshadow_mobile.png' : '/images/tree-shadow.jpg'

  return (
    <div
      ref={containerRef}
      className={`tree-shadow-background ${className}`}
      aria-hidden="true"
    >
      {/* Deep shadow layer - 最も濃い影 */}
      <div
        className="tree-shadow-layer tree-shadow-deep"
        style={{
          ...getParallaxStyle(0.3),
        }}
      >
        <Image
          src={treeShadowImage}
          alt=""
          fill
          className="tree-shadow-image"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>

      {/* Mid shadow layer - 中間の影 */}
      <div
        className="tree-shadow-layer tree-shadow-mid"
        style={{
          ...getParallaxStyle(0.5),
        }}
      >
        <Image
          src={treeShadowImage}
          alt=""
          fill
          className="tree-shadow-image"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>

      {/* Light dappled layer - 薄い影 */}
      <div
        className="tree-shadow-layer tree-shadow-light"
        style={{
          ...getParallaxStyle(0.7),
        }}
      >
        <Image
          src={treeShadowImage}
          alt=""
          fill
          className="tree-shadow-image"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>

      {/* 木漏れ日の光のパーティクル */}
      <div className="sunlight-particles">
        {lightParticles.map((particle) => (
          <div
            key={particle.id}
            className="sunlight-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.intensity * opacity.sunlight,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* 木漏れ日のグラデーション効果 */}
      <div className="sunlight-gradient" style={{ opacity: opacity.sunlight }}>
        <div className="sunlight-spot sunlight-spot-1" />
        <div className="sunlight-spot sunlight-spot-2" />
        <div className="sunlight-spot sunlight-spot-3" />
      </div>

      <style jsx>{`
        .tree-shadow-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
          background-color: var(--washi-bg-color);
        }

        .tree-shadow-layer {
          position: absolute;
          inset: -10%;
          width: 120%;
          height: 120%;
          will-change: transform, opacity;
          transition: none;
        }

        :global(.tree-shadow-image) {
          object-fit: cover;
          object-position: center;
        }

        /* Deep shadow layer - 少し濃くして存在感を強化 */
        .tree-shadow-deep :global(.tree-shadow-image) {
          mix-blend-mode: overlay;
          filter: blur(3px) contrast(1.15) brightness(0.94);
          opacity: ${opacity.deep};
        }

        /* Mid layer - soft-lightで柔らかく、少し濃く */
        .tree-shadow-mid :global(.tree-shadow-image) {
          mix-blend-mode: soft-light;
          filter: blur(5px) contrast(1.08) brightness(0.95);
          opacity: ${opacity.mid};
        }

        /* Light layer - 微妙に濃く */
        .tree-shadow-light :global(.tree-shadow-image) {
          mix-blend-mode: soft-light;
          filter: blur(8px) brightness(0.97) saturate(0.95);
          opacity: ${opacity.light};
        }

        /* 木漏れ日のパーティクル */
        .sunlight-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .sunlight-particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(
            circle at center,
            rgba(253, 249, 243, 0.85) 0%,
            rgba(250, 246, 240, 0.55) 30%,
            rgba(247, 243, 237, 0.28) 60%,
            transparent 100%
          );
          filter: blur(8px);
          mix-blend-mode: screen;
          animation: sunlightFloat 12s ease-in-out infinite;
          will-change: transform, opacity;
        }

        @keyframes sunlightFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(15px, -20px) scale(1.1);
            opacity: 0.7;
          }
          50% {
            transform: translate(-10px, -35px) scale(0.95);
            opacity: 1;
          }
          75% {
            transform: translate(20px, -15px) scale(1.05);
            opacity: 0.6;
          }
        }

        /* 木漏れ日のグラデーション効果 */
        .sunlight-gradient {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .sunlight-spot {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          mix-blend-mode: screen;
          animation: sunlightPulse 18s ease-in-out infinite;
        }

        .sunlight-spot-1 {
          top: 10%;
          left: 20%;
          width: 400px;
          height: 400px;
          background: radial-gradient(
            circle at center,
            rgba(253, 249, 243, 0.38) 0%,
            transparent 70%
          );
          animation-delay: 0s;
        }

        .sunlight-spot-2 {
          top: 40%;
          right: 15%;
          width: 350px;
          height: 350px;
          background: radial-gradient(
            circle at center,
            rgba(250, 246, 240, 0.32) 0%,
            transparent 70%
          );
          animation-delay: -6s;
        }

        .sunlight-spot-3 {
          bottom: 20%;
          left: 40%;
          width: 450px;
          height: 450px;
          background: radial-gradient(
            circle at center,
            rgba(254, 250, 244, 0.28) 0%,
            transparent 70%
          );
          animation-delay: -12s;
        }

        @keyframes sunlightPulse {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
          }
          33% {
            transform: translate(30px, -40px) scale(1.15);
            opacity: 0.8;
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
            opacity: 0.6;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .tree-shadow-layer {
            inset: -5%;
            width: 110%;
            height: 110%;
          }

          .sunlight-spot {
            filter: blur(40px);
          }

          .sunlight-spot-1,
          .sunlight-spot-2,
          .sunlight-spot-3 {
            width: 250px;
            height: 250px;
          }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .tree-shadow-layer {
            transition: none;
          }

          .sunlight-particle,
          .sunlight-spot {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
