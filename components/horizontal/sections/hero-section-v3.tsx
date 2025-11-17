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

  // ホタルのようなパーティクル（軽量化: 30 → 12個）
  const [fireflies] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 2, // 2-4px（サイズ縮小）
      pulseDuration: Math.random() * 3 + 4, // 4-7秒（周期を延長）
      moveDuration: Math.random() * 30 + 40, // 40-70秒（ゆっくり）
      delay: Math.random() * 10,
      opacity: Math.random() * 0.25 + 0.15, // 0.15-0.4（透明度を下げる）
      // ベジェ曲線のような動きのための中間点
      midX: Math.random() * 100,
      midY: Math.random() * 100,
    }))
  )

  // マウス位置の実際の座標（repel効果用）
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // 星座形成の状態
  const [constellations, setConstellations] = useState<number[][]>([])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)

    // 実際のピクセル座標を保存（repel効果用）
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // 星座形成ロジック（軽量化: 5%の確率で2秒間ランダムなホタル同士を繋ぐ）
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.05) {
        // 5%の確率（10% → 5%に削減）
        const count = Math.floor(Math.random() * 2) + 2 // 2-3個のホタルを繋ぐ
        const indices = Array.from({ length: count }, () =>
          Math.floor(Math.random() * fireflies.length)
        )
        setConstellations((prev) => [...prev, indices])

        // 2秒後に消去
        setTimeout(() => {
          setConstellations((prev) => prev.filter((c) => c !== indices))
        }, 2000)
      }
    }, 5000) // 5秒ごとにチェック（3秒 → 5秒に延長）

    return () => clearInterval(interval)
  }, [fireflies.length])

  // ホタルの位置計算（repel効果とベジェ曲線移動）
  const getFireflyPosition = (firefly: typeof fireflies[0], time: number) => {
    const container = containerRef.current
    if (!container) return { x: firefly.x, y: firefly.y }

    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight

    // ベジェ曲線移動（時間に応じて0-1の範囲で移動）
    const progress = (time % firefly.moveDuration) / firefly.moveDuration
    const t = progress

    // 3点ベジェ曲線: P(t) = (1-t)²P0 + 2(1-t)tP1 + t²P2
    let x =
      (1 - t) * (1 - t) * firefly.x +
      2 * (1 - t) * t * firefly.midX +
      t * t * firefly.x // 元の位置に戻る

    let y =
      (1 - t) * (1 - t) * firefly.y +
      2 * (1 - t) * t * firefly.midY +
      t * t * firefly.y

    // マウスrepel効果（軽量化: 100px半径、0.2強度）
    const fireflyPixelX = (x / 100) * containerWidth
    const fireflyPixelY = (y / 100) * containerHeight
    const dx = fireflyPixelX - mousePosition.x
    const dy = fireflyPixelY - mousePosition.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const repelRadius = 100 // 150 → 100pxに縮小

    if (distance < repelRadius && distance > 0) {
      const repelStrength = 0.2 // 0.3 → 0.2に削減
      const force = ((repelRadius - distance) / repelRadius) * repelStrength
      x += (dx / distance) * force * 8 // 10 → 8に削減
      y += (dy / distance) * force * 8
    }

    // 画面端でのソフトバウンド（5%マージン）
    x = Math.max(5, Math.min(95, x))
    y = Math.max(5, Math.min(95, y))

    return { x, y }
  }

  // アニメーション時間の追跡（軽量化: フレームレート制限 60fps → 30fps）
  const [time, setTime] = useState(0)

  useEffect(() => {
    let animationId: number
    const startTime = Date.now()
    let lastTime = 0
    const fps = 30 // 30fpsに制限（60fps → 30fps）
    const frameDelay = 1000 / fps

    const animate = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - lastTime

      if (elapsed > frameDelay) {
        setTime((currentTime - startTime) / 1000)
        lastTime = currentTime - (elapsed % frameDelay)
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

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

      {/* ホタルレイヤー */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 星座の線 */}
        <svg className="absolute inset-0 w-full h-full">
          {constellations.map((constellation, idx) => {
            const lines = []
            for (let i = 0; i < constellation.length - 1; i++) {
              const firefly1 = fireflies[constellation[i]]
              const firefly2 = fireflies[constellation[i + 1]]
              const pos1 = getFireflyPosition(firefly1, time)
              const pos2 = getFireflyPosition(firefly2, time)

              lines.push(
                <motion.line
                  key={`${idx}-${i}`}
                  x1={`${pos1.x}%`}
                  y1={`${pos1.y}%`}
                  x2={`${pos2.x}%`}
                  y2={`${pos2.y}%`}
                  stroke="rgba(255, 255, 150, 0.3)"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.6, 0] }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
              )
            }
            return lines
          })}
        </svg>

        {/* ホタル */}
        {fireflies.map((firefly) => {
          const position = getFireflyPosition(firefly, time)
          const pulseProgress = (time % firefly.pulseDuration) / firefly.pulseDuration
          const pulseOpacity =
            firefly.opacity * (0.5 + 0.5 * Math.sin(pulseProgress * Math.PI * 2))
          const pulseScale = 1 + 0.3 * Math.sin(pulseProgress * Math.PI * 2) // 0.5 → 0.3に削減

          return (
            <motion.div
              key={firefly.id}
              className="absolute rounded-full"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                width: firefly.size,
                height: firefly.size,
                backgroundColor: 'rgba(255, 255, 150, 0.8)', // 0.9 → 0.8
                boxShadow: `0 0 ${12 * pulseScale}px rgba(255, 255, 100, ${pulseOpacity * 0.4})`, // グロー軽量化
                opacity: pulseOpacity,
                transform: `scale(${pulseScale})`,
                filter: 'blur(0.5px)',
                willChange: 'transform, opacity', // GPU加速
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: pulseOpacity }}
              transition={{
                delay: firefly.delay,
                duration: 0.5,
              }}
            />
          )
        })}
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
