'use client'

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Mountain, MapPin } from 'lucide-react'
import { useRef, useState } from 'react'
import { WashiBackground } from '@/components/effects/washi-background'

interface LodgeSectionV3Props {
  lodge: 'mitsumata' | 'suisho' | 'yumata'
  name: string
  subtitle?: string
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

export function LodgeSectionV3({
  lodge,
  name,
  subtitle,
  description,
  image,
  elevation,
  features,
  theme,
}: LodgeSectionV3Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1, margin: "0px 100px 0px 0px" })
  const imageRef = useRef<HTMLDivElement>(null)

  // スムーズなマウス追従
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 25 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [2, -2])
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-2, 2])
  const imageScale = useTransform(smoothMouseX, [-0.5, 0.5], [1, 1.02])

  // 番号の表示
  const number = lodge === 'mitsumata' ? '01' : lodge === 'suisho' ? '02' : '03'

  // 標高による視覚的エフェクト設定
  const elevationEffects = {
    suisho: {
      // 水晶小屋（2,986m - 最高地点）
      filter: 'brightness(1.08) contrast(1.05)',
      cloudLayer: true,
      description: '天空の稜線、空気の薄さを感じる',
    },
    mitsumata: {
      // 三俣山荘（2,550m）
      filter: 'brightness(1.0) contrast(1.0)',
      cloudLayer: false,
      description: '黒部源流、森林限界の境界',
    },
    yumata: {
      // 湯俣山荘（1,580m - 最低地点）
      filter: 'saturate(1.08) sepia(0.03)',
      mistEffect: true,
      description: '秘湯の湯けむり、豊かな植生',
    },
  }

  const currentEffect = elevationEffects[lodge]

  // 浮遊パーティクル（各山荘のテーマカラーで・軽量化）
  const [particles] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 25 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.15 + 0.05,
    }))
  )

  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: theme.bg }}
    >
      {/* 和紙背景 */}
      <WashiBackground intensity="subtle" animated={false} />

      {/* セクション間の稜線越え演出 - 右端 */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none z-30"
        style={{
          background: `linear-gradient(to left, ${theme.bg} 0%, transparent 100%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.6 : 0 }}
        transition={{ duration: 1 }}
      />

      {/* セクション間の稜線越え演出 - 左端 */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none z-30"
        style={{
          background: `linear-gradient(to right, ${theme.bg} 0%, transparent 100%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.6 : 0 }}
        transition={{ duration: 1 }}
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
              backgroundColor: theme.primary,
              filter: 'blur(1px)',
            }}
            initial={{ opacity: 0 }}
            animate={{
              y: isInView ? [-5, -15, -5] : 0,
              opacity: isInView ? [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.5] : 0,
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

      {/* 背景装飾 - グラデーション */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 35% 50%, ${theme.light} 0%, transparent 65%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.15 : 0 }}
          transition={{ duration: 1.5 }}
        />
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: `radial-gradient(ellipse 50% 70% at 70% 50%, ${theme.primary} 0%, transparent 60%)`,
          }}
          animate={{
            opacity: isInView ? [0.04, 0.06, 0.04] : 0,
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* コンテンツコンテナ */}
      <div className="relative z-10 h-full flex items-center px-8 lg:px-20">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* 左側：写真 */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -60 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* 大きな番号（背景） */}
            <motion.div
              className="absolute -top-12 -left-12 text-[14rem] font-serif font-light select-none pointer-events-none z-0"
              style={{ color: theme.primary }}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{
                opacity: isInView ? 0.06 : 0,
                scale: isInView ? 1 : 0.8,
                rotate: isInView ? 0 : -5
              }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
              className="relative z-10"
              style={{ perspective: '1200px' }}
            >
              <motion.div
                className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-2xl"
                style={{
                  rotateX,
                  rotateY,
                  scale: imageScale,
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
                  transition: { duration: 0.4 },
                }}
              >
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                  priority
                  style={{ filter: currentEffect.filter }}
                />

                {/* 画像オーバーレイ - グラデーション */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${theme.dark}20 0%, transparent 50%)`,
                  }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />

                {/* ホバー時の光の筋 */}
                <motion.div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, transparent 40%, ${theme.light}40 50%, transparent 60%)`,
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* 標高エフェクトレイヤー */}
                {currentEffect.cloudLayer && (
                  // 水晶小屋 - 雲海エフェクト（天空の稜線）
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, transparent 30%)',
                    }}
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}

                {currentEffect.mistEffect && (
                  // 湯俣山荘 - 湯けむりエフェクト（秘湯の霧）
                  <>
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to top, rgba(255, 250, 240, 0.2) 0%, transparent 100%)',
                      }}
                      animate={{
                        opacity: [0.4, 0.6, 0.4],
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1/4 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to top, rgba(220, 210, 200, 0.15) 0%, transparent 100%)',
                        filter: 'blur(8px)',
                      }}
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                        y: [0, -15, 0],
                      }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                      }}
                    />
                  </>
                )}
              </motion.div>

              {/* 標高表示 - 環境情報追加 */}
              <motion.div
                className="absolute -bottom-5 -right-5 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-md shadow-xl border z-20"
                style={{ borderColor: theme.light }}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30, scale: isInView ? 1 : 0.9 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Mountain className="w-5 h-5" style={{ color: theme.primary }} />
                    <span className="text-base font-serif tracking-wider font-medium text-gray-800">
                      {elevation}
                    </span>
                  </div>
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    whileHover={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-xs font-serif text-gray-600 leading-relaxed max-w-[200px]">
                      {currentEffect.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* 位置情報バッジ（追加） */}
            <motion.div
              className="absolute -top-5 -right-5 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200 z-20"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.8, type: 'spring' }}
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-600" />
                <span className="text-xs font-serif tracking-wide text-gray-700">
                  {theme.description}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* 右側：テキスト */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 60 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* タイトル */}
            <div>
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.div
                  className="h-px bg-gradient-to-r from-gray-300 to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: isInView ? 48 : 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  style={{ backgroundColor: theme.primary }}
                />
                <span
                  className="text-xs tracking-[0.35em] font-light uppercase"
                  style={{ color: theme.primary }}
                >
                  {theme.description}
                </span>
              </motion.div>

              <motion.h2
                className="text-5xl lg:text-7xl font-serif font-light tracking-wider leading-tight mb-3"
                style={{ color: theme.dark }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {name}
              </motion.h2>

              {subtitle && (
                <motion.p
                  className="text-2xl lg:text-3xl font-serif font-light tracking-wide"
                  style={{ color: theme.primary }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  {subtitle}
                </motion.p>
              )}
            </div>

            {/* 説明 */}
            <motion.p
              className="text-lg lg:text-xl font-serif font-light leading-relaxed text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {description}
            </motion.p>

            {/* 特徴リスト */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 group"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  <motion.div
                    className="mt-2 rounded-full"
                    style={{
                      width: 6,
                      height: 6,
                      backgroundColor: theme.primary,
                    }}
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  />
                  <span className="text-base font-serif font-light text-gray-600 group-hover:text-gray-900 transition-colors">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* ボタン */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <Link href={`/lodges/${lodge}`}>
                <motion.button
                  className="group inline-flex items-center gap-3 px-10 py-5 border-2 rounded-full transition-all duration-300 overflow-hidden relative"
                  style={{ borderColor: theme.primary, color: theme.dark }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* ホバー時の背景 */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: theme.primary }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <span className="relative z-10 text-sm tracking-wider font-light group-hover:text-white transition-colors">
                    詳しく見る
                  </span>
                  <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 group-hover:text-white transition-all" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 微細なビネット効果 */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/5 pointer-events-none" />
    </div>
  )
}
