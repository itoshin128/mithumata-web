"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export function TreeShadowAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // スクロールに応じて影の位置と透明度を変化
  const shadowY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -100, -200])
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.15, 0.12, 0.08, 0.05])

  useEffect(() => {
    // 風の揺れをシミュレーション
    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.0008 // ゆっくりとした動き

      if (containerRef.current) {
        const layers = containerRef.current.querySelectorAll("[data-shadow-layer]")

        layers.forEach((layer, index) => {
          const element = layer as HTMLElement
          const speed = 0.3 + index * 0.15 // 各レイヤーで異なる速度
          const amplitude = 0.8 + index * 0.3 // 揺れの大きさ

          // 風で揺れる動きを3D変換で表現
          const rotateX = Math.sin(time * speed) * amplitude
          const rotateZ = Math.cos(time * speed * 0.7) * amplitude * 0.5
          const translateX = Math.sin(time * speed * 1.2) * (amplitude * 8)
          const translateY = Math.cos(time * speed * 0.8) * (amplitude * 4)

          element.style.transform = `
            translate(${translateX}px, ${translateY}px) 
            rotateX(${rotateX}deg) 
            rotateZ(${rotateZ}deg)
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
      {/* 木漏れ日の光レイヤー - 最も明るい部分 */}
      <motion.div
        data-shadow-layer="light-1"
        className="absolute inset-0"
        style={{
          y: shadowY,
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
              filter: "brightness(1.8) contrast(1.1) blur(8px)",
              opacity: 0.25,
            }}
            quality={90}
            priority
          />
        </div>
      </motion.div>

      {/* 木の影レイヤー1 - メインの影 */}
      <motion.div
        data-shadow-layer="shadow-1"
        className="absolute inset-0"
        style={{
          y: shadowY,
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
              filter: "brightness(0.4) contrast(1.5) blur(2px)",
              opacity: 0.18,
              transform: "scale(1.05)",
            }}
            quality={90}
          />
        </div>
      </motion.div>

      {/* 木の影レイヤー2 - より柔らかい影 */}
      <motion.div
        data-shadow-layer="shadow-2"
        className="absolute inset-0"
        style={{
          y: shadowY,
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
              filter: "brightness(0.5) contrast(1.3) blur(6px)",
              opacity: 0.12,
              transform: "scale(1.1) rotate(2deg)",
            }}
            quality={90}
          />
        </div>
      </motion.div>

      {/* 木漏れ日レイヤー2 - 光のディテール */}
      <motion.div
        data-shadow-layer="light-2"
        className="absolute inset-0"
        style={{
          y: shadowY,
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
              filter: "brightness(2.2) contrast(0.9) blur(12px)",
              opacity: 0.08,
              transform: "scale(1.08) rotate(-1deg)",
            }}
            quality={90}
          />
        </div>
      </motion.div>

      {/* 木の影レイヤー3 - 最も遠い影（立体感） */}
      <motion.div
        data-shadow-layer="shadow-3"
        className="absolute inset-0"
        style={{
          y: shadowY,
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
              filter: "brightness(0.6) contrast(1.2) blur(10px)",
              opacity: 0.1,
              transform: "scale(1.15) rotate(-3deg)",
            }}
            quality={90}
          />
        </div>
      </motion.div>

      {/* 微細な光のパーティクル効果 */}
      <motion.div
        data-shadow-layer="particles"
        className="absolute inset-0"
        style={{
          y: shadowY,
          opacity: shadowOpacity,
          willChange: "transform, opacity",
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            background: `
              radial-gradient(ellipse 800px 600px at 30% 25%, rgba(255, 255, 230, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse 600px 900px at 70% 60%, rgba(250, 248, 220, 0.05) 0%, transparent 45%),
              radial-gradient(ellipse 700px 500px at 50% 80%, rgba(255, 253, 235, 0.04) 0%, transparent 55%)
            `,
            mixBlendMode: "screen",
            filter: "blur(20px)",
            opacity: 0.4,
          }}
        />
      </motion.div>
    </div>
  )
}
