'use client'

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Mountain } from 'lucide-react'
import { useRef, useState } from 'react'
import { WashiBackground } from '@/components/effects/washi-background'

interface LodgeSectionV2Props {
  lodge: 'mitsumata' | 'suisho' | 'yumata'
  name: string
  description: string
  image: string
  elevation: string
  features: string[]
  theme: {
    name: string
    primary: string
    light: string
    dark: string
    bg: string
    description: string
  }
}

export function LodgeSectionV2({
  lodge,
  name,
  description,
  image,
  elevation,
  features,
  theme,
}: LodgeSectionV2Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  // スムーズなマウス追従
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5])

  // 番号の表示
  const number = lodge === 'mitsumata' ? '01' : lodge === 'suisho' ? '02' : '03'

  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: theme.bg }}
    >
      {/* 和紙背景 */}
      <WashiBackground intensity="subtle" animated={false} />

      {/* 背景装飾 - グラデーション */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-full h-full opacity-10"
          style={{
            background: `radial-gradient(ellipse at 30% 50%, ${theme.light} 0%, transparent 60%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.1 : 0 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      {/* コンテンツコンテナ */}
      <div className="relative z-10 h-full flex items-center px-12 lg:px-20">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* 左側：写真 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* 大きな番号（背景） */}
            <motion.div
              className="absolute -top-8 -left-8 text-[12rem] font-serif font-light opacity-5 select-none pointer-events-none"
              style={{ color: theme.primary }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isInView ? 0.05 : 0, scale: isInView ? 1 : 0.8 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {number}
            </motion.div>

            {/* 写真コンテナ */}
            <div
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                mouseX.set(0)
                mouseY.set(0)
              }}
              className="relative"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-2xl"
                style={{
                  rotateX,
                  rotateY,
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />

                {/* 画像オーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* 標高表示 */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-md shadow-lg border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <Mountain className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-serif tracking-wider text-gray-700">
                    {elevation}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* 右側：テキスト */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* タイトル */}
            <div>
              <motion.div
                className="flex items-center gap-4 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="w-12 h-px bg-gray-300" />
                <span
                  className="text-xs tracking-[0.3em] font-light"
                  style={{ color: theme.primary }}
                >
                  {theme.description}
                </span>
              </motion.div>

              <motion.h2
                className="text-5xl lg:text-6xl font-serif font-light tracking-wider leading-tight"
                style={{ color: theme.dark }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {name}
              </motion.h2>
            </div>

            {/* 説明 */}
            <motion.p
              className="text-lg font-serif font-light leading-relaxed text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {description}
            </motion.p>

            {/* 特徴リスト */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span className="text-sm font-serif font-light text-gray-600">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* ボタン */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Link href={`/lodges/${lodge}`}>
                <motion.button
                  className="group inline-flex items-center gap-3 px-8 py-4 border rounded-full transition-all duration-300"
                  style={{ borderColor: theme.primary, color: theme.dark }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: theme.primary,
                    color: '#ffffff',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm tracking-wider font-light">詳しく見る</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
