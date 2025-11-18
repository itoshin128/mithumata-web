"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"
import { useEffect, useRef, useState, memo, useCallback } from "react"

// 予約ボタンコンポーネント
const ReservationButton = memo(() => {
  const handleClick = useCallback(() => {
    window.location.href = "/reservations"
  }, [])

  return (
    <>
      {/* デスクトップ版 - 右側中央のシンプル縦書きボタン */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:block fixed right-0 top-1/2 -translate-y-1/2 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.05, x: -4 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3 }}
          onClick={handleClick}
          className="
            relative group
            bg-white hover:bg-white/98
            text-black
            px-6 py-16
            backdrop-blur-sm
            shadow-[0_4px_24px_rgba(0,0,0,0.1)]
            hover:shadow-[0_8px_40px_rgba(0,0,0,0.15)]
            border-l-4 border-l-mitsumata-primary
            transition-all duration-300
          "
        >
          {/* 縦書きテキスト */}
          <span className="flex flex-col items-center gap-2 [writing-mode:vertical-rl]">
            <span className="text-base font-serif font-medium tracking-[0.2em] text-black">
              予約する
            </span>
            <span className="text-sm opacity-50 group-hover:opacity-100 transition-opacity rotate-90">
              →
            </span>
          </span>

          {/* ホバー時の背景 */}
          <div className="absolute inset-0 bg-mitsumata-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </motion.div>

      {/* モバイル版 - 右下の固定ボタン（パフォーマンス最適化：backdrop-blur削除） */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.2 }}
          onClick={handleClick}
          className="
            text-black
            px-6 py-4
            rounded-full
            transition-all duration-300
            flex items-center justify-center
          "
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "1.5px solid rgba(255, 255, 255, 0.3)",
            boxShadow: `
              0 4px 16px rgba(0, 0, 0, 0.08),
              0 1px 3px rgba(0, 0, 0, 0.12),
              inset 0 1px 2px rgba(255, 255, 255, 0.4)
            `,
          }}
        >
          <span className="text-base font-serif font-medium tracking-wider">
            予約
          </span>
        </motion.button>
      </motion.div>
    </>
  )
})

ReservationButton.displayName = 'ReservationButton'

// Ken Burns効果のアニメーションパターン
type AnimationPattern = {
  scale: [number, number]
  x: [string, string]
  y: [string, string]
}

// タブレット + MacBook用：縦長4:5画像
const heroImagesMacBook = [
  {
    id: 1,
    url: "/images/hero/main001.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 2,
    url: "/images/hero/main002.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 3,
    url: "/images/hero/main003.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 4,
    url: "/images/hero/main004.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 5,
    url: "/images/hero/main005.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 6,
    url: "/images/hero/main006.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 7,
    url: "/images/hero/main007.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 8,
    url: "/images/hero/main008.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
]

const heroImagesDesktopWide = [
  {
    id: 1,
    url: "/images/hero/hero01.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 2,
    url: "/images/hero/hero02.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 3,
    url: "/images/hero/hero03.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 4,
    url: "/images/hero/hero04.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 5,
    url: "/images/hero/hero05.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 6,
    url: "/images/hero/hero06.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 7,
    url: "/images/hero/hero07.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 8,
    url: "/images/hero/hero08.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
]

// モバイルパフォーマンス最適化: 画像を4枚に削減
const heroImagesMobile = [
  {
    id: 1,
    url: "/images/hero/main01_mobile.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 2,
    url: "/images/hero/main03_mobile.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 3,
    url: "/images/hero/main05_mobile.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 4,
    url: "/images/hero/main07_mobile.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.0, 1.0], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
]

export function HeroParallaxSection() {
  const [showFixedBg, setShowFixedBg] = useState(true)
  const [bgOpacity, setBgOpacity] = useState(1)
  const [activeSlideDesktop, setActiveSlideDesktop] = useState(0)
  const [activeSliderMobile, setActiveSliderMobile] = useState(0)
  const [dynamicHeight, setDynamicHeight] = useState("200vh")
  const [isDesktop, setIsDesktop] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [imageSetType, setImageSetType] = useState<'macbook' | 'wide'>('macbook')
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // モバイルパフォーマンス最適化: モバイルではパララックス無効化
  const y = useTransform(scrollY, (value) => {
    if (isMobile) return 0
    return (value / 2000) * 400
  })

  useEffect(() => {
    const updateHeightBasedOnAspectRatio = () => {
      const isDesktopSize = window.innerWidth >= 768
      setIsDesktop(isDesktopSize)
      setIsMobile(!isDesktopSize)

      // モバイル（768px未満）では固定
      if (!isDesktopSize) {
        return
      }

      // Windowsの検出 (navigator.platformまたはuserAgentで判定)
      const isWindows = /Win/i.test(navigator.platform) || /Windows/i.test(navigator.userAgent)

      // Windowsは280vh、その他のデバイスは200vh
      const height = isWindows ? "280vh" : "200vh"

      setImageSetType('macbook')
      setDynamicHeight(height)
    }

    updateHeightBasedOnAspectRatio()
    window.addEventListener("resize", updateHeightBasedOnAspectRatio)

    return () => {
      window.removeEventListener("resize", updateHeightBasedOnAspectRatio)
    }
  }, [])

  // モバイルパフォーマンス最適化: スクロールリスナーをモバイルのみに制限、スロットル強化
  useEffect(() => {
    // デスクトップではスクロールリスナー不要
    if (window.innerWidth >= 768) return

    let rafId: number | null = null
    let lastUpdate = 0
    const throttleInterval = 100 // パフォーマンス向上のため100msに緩和

    const handleScroll = () => {
      const now = Date.now()
      if (now - lastUpdate < throttleInterval) return
      lastUpdate = now

      if (rafId !== null) return

      rafId = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY
        const viewportHeight = window.innerHeight

        const fadeStartPoint = viewportHeight * 1.5
        const fadeEndPoint = viewportHeight * 1.8

        if (scrollPosition < fadeStartPoint) {
          setBgOpacity(1)
          setShowFixedBg(true)
        } else if (scrollPosition < fadeEndPoint) {
          const fadeProgress = (scrollPosition - fadeStartPoint) / (fadeEndPoint - fadeStartPoint)
          setBgOpacity(1 - fadeProgress)
          setShowFixedBg(true)
        } else {
          setBgOpacity(0)
          setShowFixedBg(false)
        }
        rafId = null
      })
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full">
      {showFixedBg && (
        <div
          className="md:hidden absolute top-0 left-0 w-full h-screen z-10 pointer-events-none transition-opacity duration-300"
          style={{ opacity: bgOpacity }}
        >
          <div className="h-full w-full overflow-hidden">
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              autoplay={{
                delay: 7000,
                disableOnInteraction: false,
              }}
              loop={true}
              speed={2500}
              className="h-full w-full"
              onSlideChange={(swiper) => setActiveSliderMobile(swiper.realIndex)}
            >
              {heroImagesMobile.map((image, index) => (
                <SwiperSlide key={image.id}>
                  <div className="relative h-full w-full overflow-hidden">
                    {/* モバイルパフォーマンス最適化: Ken Burnsアニメーション無効化 */}
                    <div className="relative h-full w-full">
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-cover object-center"
                        priority={image.id === 1}
                        quality={75}
                        sizes="100vw"
                        loading={image.id === 1 ? "eager" : "lazy"}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 pointer-events-none" />
        </div>
      )}

      {/* デスクトップ用パララックス背景 - すべてのデバイスで4:5縦長画像 */}
      <div
        className="hidden md:block absolute top-0 left-0 w-full z-10 overflow-hidden bg-black"
        style={{ height: dynamicHeight }}
      >
        <motion.div style={{ y }} className="relative w-full h-full">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={2500}
            className="h-full w-full"
            onSlideChange={(swiper) => setActiveSlideDesktop(swiper.realIndex)}
            key={imageSetType}
          >
            {heroImagesMacBook.map((image, index) => (
              <SwiperSlide key={image.id}>
                <div className="relative h-full w-full overflow-hidden bg-black flex items-center justify-center">
                  <motion.div
                    className="relative w-full h-full"
                    initial={{
                      scale: image.animation.scale[0],
                      x: image.animation.x[0],
                      y: image.animation.y[0],
                    }}
                    animate={
                      activeSlideDesktop === index
                        ? {
                            scale: image.animation.scale[1],
                            x: image.animation.x[1],
                            y: image.animation.y[1],
                          }
                        : undefined
                    }
                    transition={{
                      duration: 4,
                      delay: activeSlideDesktop === index ? 2.5 : 0,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover object-top"
                      priority={image.id === 1 || image.id === 2}
                      quality={85}
                      sizes="100vw"
                    />
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </motion.div>
      </div>

      {/* スクロールするコンテンツレイヤー */}
      <div
        className="relative z-30"
        style={{ minHeight: isDesktop ? dynamicHeight : "180vh" }}
      >
        <div className="h-screen flex items-end px-4 sm:px-6 md:px-12 lg:px-20 pb-12 sm:pb-14 md:pb-16 lg:pb-20">
          <div className="w-full max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5 sm:space-y-6 md:space-y-7 max-w-2xl"
            >
              <div className="space-y-3 sm:space-y-3 md:space-y-4">
                {/* モバイル最適化: text-3xl（30px）に拡大、テキストシャドウ強化 */}
                <h1
                  className="text-white text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-light leading-[1.6] tracking-[0.08em]"
                  style={{ textShadow: "0 4px 20px rgba(0,0,0,0.85), 0 2px 8px rgba(0,0,0,1)" }}
                >
                  北アルプス黒部源流
                </h1>

                {/* モバイル最適化: text-xs（12px）に拡大、テキストシャドウ強化 */}
                <p
                  className="text-white/95 text-xs sm:text-[10px] md:text-xs lg:text-sm tracking-[0.2em] sm:tracking-[0.25em] font-light font-sans uppercase"
                  style={{ textShadow: "0 2px 14px rgba(0,0,0,0.75), 0 1px 4px rgba(0,0,0,1)" }}
                >
                  Northern Alps Kurobe Genryu
                </p>
              </div>

              <div className="space-y-3 sm:space-y-3 md:space-y-4 pt-3 sm:pt-3 md:pt-4">
                {/* モバイル最適化: text-base（16px）に拡大、テキストシャドウ強化 */}
                <p
                  className="text-white text-base sm:text-sm md:text-base lg:text-lg leading-[1.8] sm:leading-[1.8] font-serif font-light tracking-[0.04em] sm:tracking-[0.05em]"
                  style={{ textShadow: "0 3px 16px rgba(0,0,0,0.75), 0 2px 6px rgba(0,0,0,1)" }}
                >
                  北アルプス最奥、黒部源流の三つの山荘
                </p>
                {/* モバイル最適化: text-sm（14px）に拡大、テキストシャドウ強化 */}
                <p
                  className="text-white/95 text-sm sm:text-xs md:text-sm lg:text-base leading-[1.8] sm:leading-[1.8] font-serif font-light tracking-[0.04em] sm:tracking-[0.05em]"
                  style={{ textShadow: "0 3px 16px rgba(0,0,0,0.75), 0 2px 6px rgba(0,0,0,1)" }}
                >
                  原始と変わらぬ生態系が息づく場所。
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* わたしたちについてセクション */}
        <div className="min-h-screen flex items-center px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24">
          <div className="w-full max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-start">
              {/* 左側 - 大きなキャッチコピー */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-5 sm:space-y-6"
              >
                <h2
                  className="text-white text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-serif font-light leading-[1.6] tracking-[0.06em] sm:tracking-[0.08em]"
                  style={{ textShadow: "0 3px 16px rgba(0,0,0,0.7), 0 2px 6px rgba(0,0,0,0.95)" }}
                >
                  山の広さと深さへの、入口
                </h2>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "2.5rem" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="h-[1px] bg-gradient-to-r from-white/60 to-white/10"
                />
              </motion.div>

              {/* 右側 - 説明文 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-4 sm:space-y-5"
              >
                <p
                  className="text-white/95 text-sm sm:text-sm md:text-base lg:text-lg leading-[1.8] font-serif font-light tracking-[0.03em] sm:tracking-[0.04em]"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.9)" }}
                >
                  三俣山荘グループは、北アルプス最奥の黒部源流域に位置する三つの山荘、三俣山荘・水晶小屋・湯俣山荘を運営しています。
                </p>
                <p
                  className="text-white/95 text-sm sm:text-sm md:text-base lg:text-lg leading-[1.8] font-serif font-light tracking-[0.03em] sm:tracking-[0.04em]"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.9)" }}
                >
                  私たちが目指すのは、単なる宿泊施設ではありません。訪れる人々が「山の広さと深さ」と出会い、新たな山の楽しみ方を発見する入口となる場所です。
                </p>
                <p
                  className="text-white/95 text-sm sm:text-sm md:text-base lg:text-lg leading-[1.8] font-serif font-light tracking-[0.03em] sm:tracking-[0.04em]"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.9)" }}
                >
                  道直し活動を通じた登山道の保全、湯俣川ネイチャーフィールドでの「面」としての山の楽しみ方の提案。山小屋の公共的役割を果たしながら、山との深いかかわりを大切にしています。
                </p>
              </motion.div>
            </div>

            {/* CTAボタン */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="flex justify-center mt-12 sm:mt-16 md:mt-20"
            >
              <button className="group relative">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 xl:w-56 xl:h-56 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/8 transition-colors duration-700 ease-out" />

                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white text-xs sm:text-sm md:text-base font-serif font-light tracking-[0.1em] sm:tracking-[0.12em] text-center px-5 sm:px-6 relative z-10"
                  >
                    三俣山荘
                    <br />
                    グループについて
                  </motion.span>
                </motion.div>

                <motion.div
                  className="absolute inset-0 rounded-full border border-white/20"
                  initial={{ scale: 1, opacity: 0 }}
                  whileHover={{ scale: 1.12, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 予約ボタン - 固定表示 */}
      <ReservationButton />

      {/* スクロールインジケーター - モバイルパフォーマンス最適化：アニメーション削除 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="hidden md:block fixed bottom-6 sm:bottom-8 md:bottom-10 right-6 sm:right-8 md:right-16 lg:right-20 z-40"
      >
        <div
          className="flex flex-col items-center gap-2 sm:gap-2.5 cursor-pointer group opacity-50 hover:opacity-100 transition-opacity duration-500"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            })
          }}
        >
          <div className="w-6 h-10 sm:w-6 sm:h-10 border-2 border-white/50 group-hover:border-white rounded-full flex items-start justify-center p-1.5 transition-colors duration-300">
            <div className="w-1.5 h-1.5 bg-white/70 group-hover:bg-white rounded-full transition-colors duration-300" />
          </div>
          <span className="text-white/70 group-hover:text-white text-[8px] sm:text-[8px] font-serif font-light tracking-[0.2em] sm:tracking-[0.25em] uppercase transition-colors duration-300">
            Scroll
          </span>
        </div>
      </motion.div>
    </section>
  )
}
