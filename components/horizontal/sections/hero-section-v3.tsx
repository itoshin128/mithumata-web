'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { WashiBackground } from '@/components/effects/washi-background'

export function HeroSectionV3() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // マウス位置のトラッキング
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // スムーズなスプリングアニメーション
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // パララックス効果（軽量化）
  const parallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10])
  const parallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-10, 10])

  // 微細な浮遊パーティクル（軽量化）
  const [particles] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 30 + 20,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.2 + 0.05,
    }))
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50/10 to-stone-50"
    >
      {/* 和紙背景 */}
      <div className="absolute inset-0">
        <WashiBackground intensity="subtle" animated={false} />
      </div>

      {/* 大きな円形グラデーション背景（軽量化） */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245, 240, 230, 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.03, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* パーティクルレイヤー */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: 'rgba(140, 130, 120, 0.4)',
              filter: 'blur(1px)',
            }}
            animate={{
              y: [-10, -25, -10],
              opacity: [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.5],
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
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 md:px-16">
        {/* 装飾的な上部ライン */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-16 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 rotate-45" />
            <motion.div
              className="w-16 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* サブタイトル */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <p className="text-xs md:text-sm tracking-[0.4em] text-gray-500 font-serif font-light">
            NORTHERN ALPS KUROBE GENRYU
          </p>
        </motion.div>

        {/* メインタイトル - パララックス */}
        <motion.div
          className="mb-10"
          style={{ x: parallaxX, y: parallaxY }}
        >
          <motion.h1
            className="text-7xl md:text-9xl lg:text-[12rem] font-serif font-light tracking-wider text-gray-900 text-center leading-[0.95]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.05, color: '#6b7280' }}
              transition={{ duration: 0.3 }}
            >
              三俣山荘
            </motion.span>
          </motion.h1>

          <motion.div
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className="text-3xl md:text-5xl lg:text-6xl font-serif font-light tracking-wider text-gray-800">
              グループ
            </p>
          </motion.div>
        </motion.div>

        {/* 説明文 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-center mb-16"
        >
          <p className="text-base md:text-xl font-serif font-light text-gray-600 leading-relaxed tracking-wide">
            北アルプス最奥、標高2,500m以上に位置する三つの山荘
            <br className="hidden md:block" />
            山の広さと深さへの入口となる場所
          </p>
        </motion.div>

        {/* スクロールヒント - より洗練 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.6 }}
          className="relative"
        >
          <motion.div
            className="flex items-center gap-4 px-6 py-3 rounded-full backdrop-blur-sm bg-white/30 border border-gray-200/50"
            animate={{
              x: [-5, -15, -5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
            <span className="text-sm font-serif font-light tracking-[0.2em] text-gray-700">
              SCROLL TO EXPLORE
            </span>
            <motion.div
              className="w-20 h-px bg-gradient-to-r from-gray-400 to-transparent"
              animate={{
                scaleX: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </motion.div>

        {/* 装飾的な下部ライン */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="w-px h-20 bg-gradient-to-b from-gray-300 via-gray-400 to-transparent"
            animate={{
              scaleY: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>

      {/* 微細なビネット効果 */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-stone-100/20 pointer-events-none" />
    </div>
  )
}
