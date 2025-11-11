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

  // スクロールに応じて影の位置と透明度を変化（各レイヤーで異なる速度）
  const shadowY1 = useTransform(scrollYProgress, [0, 0.5, 1], [0, -80, -160])
  const shadowY2 = useTransform(scrollYProgress, [0, 0.5, 1], [0, -120, -240])
  const shadowY3 = useTransform(scrollYProgress, [0, 0.5, 1], [0, -100, -200])
  const shadowY4 = useTransform(scrollYProgress, [0, 0.5, 1], [0, -140, -280])
  const shadowY5 = useTransform(scrollYProgress, [0, 0.5, 1], [0, -90, -180])

  const shadowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 0.5, 0.35, 0.2])

  // 木漏れ日のパーティクルを生成
  useEffect(() => {
    const generatedParticles: LightParticle[] = []
    for (let i = 0; i < 30; i++) {
      generatedParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        opacity: Math.random() * 0.6 + 0.3,
        duration: Math.random() * 15 + 20,
        delay: Math.random() * 10,
      })
    }
    setParticles(generatedParticles)
  }, [])

  useEffect(() => {
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
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* 木漏れ日の光レイヤー1 - 最も明るい部分 */}
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
            src="/images/tree-shadow.jpg"
            alt=""
            fill
            className="object-cover"
            style={{
              mixBlendMode: "overlay",
              filter: "brightness(1.9) contrast(1.15) blur(10px) saturate(1.1)",
              opacity: 0.4,
            }}
            quality={90}
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
            src="/images/tree-shadow.jpg"
            alt=""
            fill
            className="object-cover"
            style={{
              mixBlendMode: "multiply",
              filter: "brightness(0.35) contrast(1.6) blur(1.5px) saturate(0.9)",
              opacity: 0.35,
              transform: "scale(1.03)",
            }}
            quality={90}
          />
        </div>
      </motion.div>

      {/* 木の影レイヤー2 - 中間の影 */}
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
            src="/images/tree-shadow.jpg"
            alt=""
            fill
            className="object-cover"
            style={{
              mixBlendMode: "multiply",
              filter: "brightness(0.48) contrast(1.35) blur(5px) saturate(0.85)",
              opacity: 0.25,
              transform: "scale(1.08) rotate(1.5deg)",
            }}
            quality={90}
          />
        </div>
      </motion.div>

      {/* 木漏れ日レイヤー2 - 光のディテール */}
      <motion.div
        data-shadow-layer="3"
        className="absolute inset-0"
        style={{
          y: shadowY4,
          opacity: shadowOpacity,
          willChange: "transform, opacity",
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/tree-shadow.jpg"
            alt=""
            fill
            className="object-cover"
            style={{
              mixBlendMode: "screen",
              filter: "brightness(2.3) contrast(0.85) blur(15px) saturate(1.2)",
              opacity: 0.18,
              transform: "scale(1.12) rotate(-1.2deg)",
            }}
            quality={90}
          />
        </div>
      </motion.div>

      {/* 木の影レイヤー3 - 最も遠い影（柔らかく立体感） */}
      <motion.div
        data-shadow-layer="4"
        className="absolute inset-0"
        style={{
          y: shadowY5,
          opacity: shadowOpacity,
          willChange: "transform, opacity",
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/images/tree-shadow.jpg"
            alt=""
            fill
            className="object-cover"
            style={{
              mixBlendMode: "darken",
              filter: "brightness(0.55) contrast(1.25) blur(12px) saturate(0.8)",
              opacity: 0.2,
              transform: "scale(1.18) rotate(-2.5deg)",
            }}
            quality={90}
          />
        </div>
      </motion.div>

      {/* 木漏れ日の光のパーティクル（動的に生成） */}
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
              background: "radial-gradient(circle, rgba(255, 250, 235, 0.9) 0%, rgba(255, 248, 220, 0.6) 40%, transparent 70%)",
              boxShadow: "0 0 15px rgba(255, 248, 200, 0.8), 0 0 30px rgba(255, 250, 220, 0.4)",
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

      {/* 追加の光のグラデーション効果 */}
      <motion.div
        data-shadow-layer="5"
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
              radial-gradient(ellipse 900px 700px at 25% 20%, rgba(255, 255, 235, 0.08) 0%, transparent 55%),
              radial-gradient(ellipse 700px 1000px at 75% 55%, rgba(250, 248, 225, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse 800px 600px at 50% 85%, rgba(255, 253, 240, 0.05) 0%, transparent 60%),
              radial-gradient(ellipse 600px 800px at 15% 70%, rgba(255, 250, 230, 0.04) 0%, transparent 55%)
            `,
            mixBlendMode: "screen",
            filter: "blur(25px)",
            opacity: 0.5,
          }}
        />
      </motion.div>
    </div>
  )
}
