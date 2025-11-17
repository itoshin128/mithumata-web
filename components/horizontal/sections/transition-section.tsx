'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { WashiBackground } from '@/components/effects/washi-background'

export function TransitionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  // 水滴パーティクル（源流の水）
  const [waterParticles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 4,
      opacity: Math.random() * 0.4 + 0.2,
      size: Math.random() * 3 + 1,
      stream: Math.floor(Math.random() * 3), // どの水系に属するか
    }))
  )

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-50">
      {/* 和紙背景 */}
      <WashiBackground intensity="subtle" animated={false} />

      {/* 黒部源流の水系図 - SVG */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            {/* グラデーション定義 */}
            <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(100, 120, 140, 0)" />
              <stop offset="20%" stopColor="rgba(100, 120, 140, 0.3)" />
              <stop offset="80%" stopColor="rgba(100, 120, 140, 0.6)" />
              <stop offset="100%" stopColor="rgba(100, 120, 140, 0)" />
            </linearGradient>
          </defs>

          {/* メインストリーム（黒部川源流） */}
          <motion.path
            d="M 100,400 Q 300,380 500,400 T 900,420 L 1100,430"
            stroke="url(#streamGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
            transition={{ duration: 3, delay: 0.5, ease: 'easeInOut' }}
          />

          {/* 支流1: 岩苔小谷 */}
          <motion.path
            d="M 350,300 Q 370,330 400,360 L 430,390"
            stroke="url(#streamGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? 0.7 : 0 }}
            transition={{ duration: 2, delay: 1.2, ease: 'easeInOut' }}
          />

          {/* 支流2: 真砂沢 */}
          <motion.path
            d="M 500,250 Q 510,300 520,350 L 530,390"
            stroke="url(#streamGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? 0.7 : 0 }}
            transition={{ duration: 2, delay: 1.5, ease: 'easeInOut' }}
          />

          {/* 支流3: 薬師沢 */}
          <motion.path
            d="M 700,280 Q 710,320 720,360 L 750,400"
            stroke="url(#streamGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? 0.7 : 0 }}
            transition={{ duration: 2, delay: 1.8, ease: 'easeInOut' }}
          />

          {/* 水滴パーティクル */}
          {waterParticles.map((particle) => {
            // どの水系に属するかで位置を決定
            const streamPaths = [
              'M 100,400 Q 300,380 500,400 T 900,420 L 1100,430', // メイン
              'M 350,300 Q 370,330 400,360 L 430,390', // 支流1
              'M 500,250 Q 510,300 520,350 L 530,390', // 支流2
            ]
            const stream = particle.stream

            return (
              <motion.circle
                key={particle.id}
                r={particle.size}
                fill="rgba(120, 150, 180, 0.5)"
                filter="blur(1px)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isInView ? [0, particle.opacity, 0] : 0,
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <animateMotion
                  dur={`${particle.duration}s`}
                  repeatCount="indefinite"
                  begin={`${particle.delay}s`}
                  path={streamPaths[stream]}
                />
              </motion.circle>
            )
          })}
        </svg>
      </div>

      {/* 中央のグラデーション円（軽量化） */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(245, 240, 230, 0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
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

        {/* メインテキスト - 文字ごとのアニメーション */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-wider text-gray-900 leading-tight">
            {'源流を守る'.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  y: isInView ? 0 : 20,
                  filter: isInView ? 'blur(0px)' : 'blur(4px)',
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl text-gray-700">
              {'三つの山荘'.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                  animate={{
                    opacity: isInView ? 1 : 0,
                    y: isInView ? 0 : 20,
                    filter: isInView ? 'blur(0px)' : 'blur(4px)',
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 1.0 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h2>
        </div>

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
