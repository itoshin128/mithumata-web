'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { WashiBackground } from '@/components/effects/washi-background'

export function TransitionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-50">
      {/* 和紙背景 */}
      <WashiBackground intensity="subtle" animated={false} />

      {/* 流れる光のライン */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-gray-400/40 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              width: '200%',
              left: '-100%',
            }}
            animate={{
              x: ['0%', '50%'],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* 中央のグラデーション円 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(245, 240, 230, 0.5) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* メインコンテンツ */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
        {/* 上部装飾ライン */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: isInView ? 1 : 0, scaleX: isInView ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-gray-300"
              animate={{ scaleX: [1, 1.3, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-gray-400"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="w-24 h-px bg-gradient-to-l from-transparent via-gray-400 to-gray-300"
              animate={{ scaleX: [1, 1.3, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* サブタイトル */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-xs md:text-sm tracking-[0.4em] text-gray-500 font-serif font-light">
            THREE MOUNTAIN LODGES
          </p>
        </motion.div>

        {/* メインテキスト */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.95 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-wider text-gray-900 leading-tight">
            源流を守る
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl text-gray-700">
              三つの山荘
            </span>
          </h2>
        </motion.div>

        {/* 説明文 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-2xl text-center"
        >
          <p className="text-base md:text-lg font-serif font-light text-gray-600 leading-relaxed tracking-wide">
            それぞれが異なる個性を持ちながら
            <br className="hidden md:block" />
            共に源流の自然を守り続ける
          </p>
        </motion.div>

        {/* 下部装飾ライン */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: isInView ? 1 : 0, scaleX: isInView ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-16 h-px bg-gradient-to-r from-gray-300 to-transparent"
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 rotate-45" />
            <motion.div
              className="w-16 h-px bg-gradient-to-l from-gray-300 to-transparent"
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            />
          </div>
        </motion.div>

        {/* 縦のフローライン */}
        <motion.div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: isInView ? 1 : 0, opacity: isInView ? 0.2 : 0 }}
          transition={{ duration: 2, delay: 0.3 }}
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(156, 163, 175, 0.3) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* 微細なビネット効果 */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-stone-100/30 pointer-events-none" />
    </div>
  )
}
