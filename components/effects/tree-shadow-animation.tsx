"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

// 木漏れ日のパーティクルの型定義
interface LightParticle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
}

export function TreeShadowAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [particles, setParticles] = useState<LightParticle[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // スクロールに応じて影の位置と透明度を変化（各レイヤーで異なる速度）
  const shadowY1 = useTransform(scrollYProgress, [0, 0.5, 1], [0, -80, -160])
  const shadowY2 = useTransform(scrollYProgress, [0, 0.5, 1], [0, -120, -240])
  const shadowY3 = useTransform(scrollYProgress, [0, 0.5, 1], [0, -100, -200])

  const shadowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.9, 0.7, 0.5])

  // モバイル判定とパーティクル生成を最適化
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      return mobile
    }

    const mobile = checkMobile()
    const particleCount = mobile ? 5 : 10 // モバイルは5個、デスクトップは10個（元は30個）
    const generatedParticles: LightParticle[] = []

    for (let i = 0; i < particleCount; i++) {
      generatedParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 15 + 20,
        delay: Math.random() * 10,
      })
    }
    setParticles(generatedParticles)

    const handleResize = () => {
      checkMobile()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    // モバイルではアニメーションを軽量化
    if (isMobile) return

    // 風の揺れをシミュレーション - より自然で複雑な動き
    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.0005 // よりゆっくりとした動き

      if (containerRef.current) {
        const layers = containerRef.current.querySelectorAll("[data-shadow-layer]")

        layers.forEach((layer, index) => {
          const element = layer as HTMLElement

          // 各レイヤーで異なるパラメータ
          const baseSpeed = 0.25 + index * 0.12
          const amplitude = 0.6 + index * 0.25

          // 複数の波を組み合わせて自然な揺れを表現
          const wave1 = Math.sin(time * baseSpeed) * amplitude
          const wave2 = Math.cos(time * baseSpeed * 0.7) * amplitude * 0.6
          const wave3 = Math.sin(time * baseSpeed * 1.3) * amplitude * 0.4

          // 風で揺れる動きを3D変換で表現（より微妙に）
          const rotateX = (wave1 + wave3) * 0.5
          const rotateZ = (wave2 + wave1) * 0.3
          const translateX = Math.sin(time * baseSpeed * 1.1) * (amplitude * 6) + wave2 * 3
          const translateY = Math.cos(time * baseSpeed * 0.9) * (amplitude * 3) + wave3 * 2

          // スケールも微妙に変化させる（呼吸するような効果）
          const scale = 1 + Math.sin(time * baseSpeed * 0.5) * 0.015

          element.style.transform = `
            translate(${translateX}px, ${translateY}px)
            rotateX(${rotateX}deg)
            rotateZ(${rotateZ}deg)
            scale(${scale})
          `
        })
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isMobile])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 15000 }}>
      {/* 木漏れ日の光レイヤー - 最も明るい部分 */}
      <motion.div
        data-shadow-layer="0"
        className="absolute inset-0"
        style={{
          y: shadowY1,
          opacity: shadowOpacity,
          willChange: "transform, opacity",
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={isMobile ? "/images/treeshadow_mobile.png" : "/images/tree-shadow.jpg"}
            alt=""
            fill
            className="object-cover"
            style={{
              mixBlendMode: "overlay",
              filter: isMobile
                ? "brightness(1.7) contrast(1.3) blur(8px)"
                : "brightness(2.1) contrast(1.3) blur(10px) saturate(1.2)",
              opacity: isMobile ? 0.75 : 0.7,
            }}
            quality={isMobile ? 60 : 75}
            priority
          />
        </div>
      </motion.div>

      {/* 木の影レイヤー1 - メインの影（最も鮮明） */}
      <motion.div
        data-shadow-layer="1"
        className="absolute inset-0"
        style={{
          y: shadowY2,
          opacity: shadowOpacity,
          willChange: "transform, opacity",
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={isMobile ? "/images/treeshadow_mobile.png" : "/images/tree-shadow.jpg"}
            alt=""
            fill
            className="object-cover"
            style={{
              mixBlendMode: "multiply",
              filter: isMobile
                ? "brightness(0.2) contrast(1.8) blur(0.5px)"
                : "brightness(0.2) contrast(1.8) blur(1px) saturate(0.8)",
              opacity: isMobile ? 0.85 : 0.85,
              transform: "scale(1.03)",
            }}
            quality={isMobile ? 60 : 75}
          />
        </div>
      </motion.div>

      {/* 木の影レイヤー2 - 遠い影（柔らかく立体感） */}
      <motion.div
        data-shadow-layer="2"
        className="absolute inset-0"
        style={{
          y: shadowY3,
          opacity: shadowOpacity,
          willChange: "transform, opacity",
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={isMobile ? "/images/treeshadow_mobile.png" : "/images/tree-shadow.jpg"}
            alt=""
            fill
            className="object-cover"
            style={{
              mixBlendMode: "multiply",
              filter: isMobile
                ? "brightness(0.3) contrast(1.6) blur(6px)"
                : "brightness(0.35) contrast(1.5) blur(10px) saturate(0.75)",
              opacity: isMobile ? 0.75 : 0.7,
              transform: "scale(1.1) rotate(-1.5deg)",
            }}
            quality={isMobile ? 60 : 75}
          />
        </div>
      </motion.div>

      {/* 木漏れ日の光のパーティクル（最適化済み） */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: shadowOpacity,
          willChange: "opacity",
        }}
      >
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: "radial-gradient(circle, rgba(255, 251, 245, 0.9) 0%, rgba(253, 249, 243, 0.6) 40%, transparent 70%)",
              boxShadow: isMobile
                ? "0 0 8px rgba(250, 246, 240, 0.6)"
                : "0 0 15px rgba(250, 246, 240, 0.8), 0 0 30px rgba(254, 250, 244, 0.4)",
              mixBlendMode: "screen",
              filter: "blur(2px)",
              willChange: "transform, opacity",
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [particle.opacity * 0.6, particle.opacity, particle.opacity * 0.6],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* 追加の光のグラデーション効果（デスクトップのみ） */}
      {!isMobile && (
        <motion.div
          data-shadow-layer="3"
          className="absolute inset-0"
          style={{
            y: shadowY3,
            opacity: shadowOpacity,
            willChange: "transform, opacity",
          }}
        >
          <div
            className="relative w-full h-full"
            style={{
              background: `
                radial-gradient(ellipse 900px 700px at 25% 20%, rgba(255, 251, 245, 0.08) 0%, transparent 55%),
                radial-gradient(ellipse 700px 1000px at 75% 55%, rgba(253, 249, 243, 0.06) 0%, transparent 50%)
              `,
              mixBlendMode: "screen",
              filter: "blur(25px)",
              opacity: 0.5,
            }}
          />
        </motion.div>
      )}
    </div>
  )
}
