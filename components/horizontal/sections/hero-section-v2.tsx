'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { WashiBackground } from '@/components/effects/washi-background'

export function HeroSectionV2() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // パーティクルのための状態
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }))
  )

  // マウス追従効果
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x, y })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50/20 to-stone-50"
    >
      {/* 和紙背景 */}
      <WashiBackground intensity="subtle" animated={false} />

      {/* パーティクル効果 */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gray-400/40"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
        {/* サブタイトル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-sm md:text-base tracking-[0.3em] text-gray-500 font-serif font-light">
            KITAALPS KUROBE GENRYU
          </p>
        </motion.div>

        {/* メインタイトル - 大胆で繊細 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            transform: `rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
            transition: 'transform 0.3s ease-out',
          }}
          className="mb-6"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light tracking-wider text-gray-900 text-center leading-tight">
            三俣山荘<br />
            <span className="text-5xl md:text-7xl lg:text-8xl">グループ</span>
          </h1>
        </motion.div>

        {/* 説明文 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-2xl text-center mb-12"
        >
          <p className="text-base md:text-lg font-serif font-light text-gray-600 leading-relaxed">
            北アルプス最奥、黒部源流に佇む三つの山荘
            <br className="hidden md:block" />
            山の広さと深さへの入口となる場所
          </p>
        </motion.div>

        {/* スクロールヒント */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8"
        >
          <motion.div
            className="flex items-center gap-3 text-sm text-gray-500 font-light tracking-wider"
            animate={{ x: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>SCROLL TO EXPLORE</span>
            <div className="w-16 h-px bg-gray-300" />
          </motion.div>
        </motion.div>

        {/* 装飾ライン - 上下 */}
        <motion.div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-transparent via-gray-300 to-transparent"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>

      {/* 微細なグラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-stone-100/30 pointer-events-none" />
    </div>
  )
}
