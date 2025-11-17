'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'

interface LodgeSectionProps {
  lodge: 'mitsumata' | 'suisho' | 'yumata'
  name: string
  description: string
  image: string
  theme: {
    name: string
    primary: string
    light: string
    dark: string
    bg: string
    description: string
  }
}

export function LodgeSection({ lodge, name, description, image, theme }: LodgeSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <div
      ref={ref}
      className="relative w-full h-full flex items-center justify-center transition-colors duration-1000"
      style={{ backgroundColor: theme.bg }}
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-1/3 h-full opacity-5"
          style={{ backgroundColor: theme.primary }}
          initial={{ x: '100%' }}
          animate={{ x: isInView ? '0%' : '100%' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-16 lg:px-24">
        <div className="grid grid-cols-2 gap-12 lg:gap-20 max-w-6xl w-full">
          {/* 左側：写真 */}
          <motion.div
            className="flex items-center justify-end"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-sm overflow-hidden shadow-2xl">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                sizes="40vw"
                priority
              />
            </div>
          </motion.div>

          {/* 右側：テキスト */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* 番号 */}
            <motion.div
              className="text-8xl font-serif font-light mb-6 opacity-20"
              style={{ color: theme.primary }}
            >
              0{lodge === 'mitsumata' ? '1' : lodge === 'suisho' ? '2' : '3'}
            </motion.div>

            {/* タイトル */}
            <h2
              className="text-5xl lg:text-6xl font-serif font-light tracking-wider mb-6 leading-tight"
              style={{ color: theme.dark }}
            >
              {name}
            </h2>

            {/* サブタイトル */}
            <p className="text-sm tracking-widest mb-8 opacity-60" style={{ color: theme.primary }}>
              {theme.description}
            </p>

            {/* 説明 */}
            <p className="text-lg font-serif font-light leading-relaxed mb-12 text-gray-700 whitespace-pre-line">
              {description}
            </p>

            {/* ボタン */}
            <Link href={`/lodges/${lodge}`}>
              <motion.button
                className="inline-flex items-center gap-3 px-8 py-4 border rounded-full transition-all duration-300 group"
                style={{ borderColor: theme.primary, color: theme.dark }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm tracking-wider font-light">詳しく見る</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
