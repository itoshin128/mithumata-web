"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"
import { useEffect, useRef, useState } from "react"

// 山の稜線SVGパス
const MountainRidgePath = () => (
  <svg
    className="absolute -top-6 left-0 w-full h-8 opacity-0 group-hover:opacity-60 transition-all duration-700"
    viewBox="0 0 100 20"
    preserveAspectRatio="none"
  >
    <motion.path
      d="M0,15 L15,10 L25,5 L35,8 L50,3 L65,7 L80,5 L90,8 L100,12 L100,20 L0,20 Z"
      fill="currentColor"
      className="text-mitsumata-primary/20"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
  </svg>
)

// 予約ボタンコンポーネント
const ReservationButton = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { scrollY } = useScroll()

  // デスクトップ版: スクロールに連動した微妙な浮遊感
  const floatY = useTransform(scrollY, [0, 1000], [0, -10])

  const handleClick = () => {
    if (window.innerWidth < 768) {
      // モバイル: 1回目のタップで展開、2回目で遷移
      if (!isExpanded) {
        setIsExpanded(true)
        setTimeout(() => setIsExpanded(false), 3000)
        return
      }
    }
    window.location.href = "/reservations"
  }

  return (
    <>
      {/* デスクトップ版 - 右側中央の和紙風縦書きボタン */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ y: floatY }}
        transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:block fixed right-0 top-1/2 -translate-y-1/2 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.03, x: -3 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleClick}
          className="
            relative group
            bg-white/96 hover:bg-white/99
            text-black
            px-5 py-14
            backdrop-blur-sm
            shadow-[0_2px_16px_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.04)]
            hover:shadow-[0_4px_24px_rgba(0,0,0,0.08),0_12px_48px_rgba(0,0,0,0.06)]
            border-l-[3px] border-l-transparent
            hover:border-l-mitsumata-primary
            overflow-hidden
            transition-all duration-500
          "
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 4px),
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 4px)
            `,
          }}
        >
          {/* 和紙風テクスチャ背景 */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* 山の稜線（ホバー時に出現） */}
          <MountainRidgePath />

          {/* 縦書きテキスト */}
          <span className="relative z-10 flex flex-col items-center gap-3 [writing-mode:vertical-rl]">
            <motion.span
              whileHover={{ letterSpacing: "0.28em" }}
              transition={{ duration: 0.4 }}
              className="text-sm font-serif font-light tracking-[0.22em] text-black/90"
            >
              予約する
            </motion.span>

            {/* 装飾的な点 */}
            <motion.span
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="text-[6px] text-mitsumata-primary"
            >
              ●
            </motion.span>

            {/* アニメーション矢印 */}
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="text-[11px] opacity-30 group-hover:opacity-60 transition-opacity rotate-90"
            >
              →
            </motion.span>
          </span>

          {/* ホバー時の光の流れ */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-mitsumata-primary/5 to-transparent opacity-0 group-hover:opacity-100"
            animate={{
              y: ["-100%", "200%"],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
              ease: "linear",
            }}
          />
        </motion.button>
      </motion.div>

      {/* モバイル版 - 右下の展開式ボタン */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileTap={{ scale: 0.92 }}
          animate={
            isExpanded
              ? {
                  width: "auto",
                  borderRadius: "28px",
                }
              : {
                  width: "56px",
                  borderRadius: "28px",
                }
          }
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleClick}
          className="
            relative
            h-14
            bg-white/96
            text-black
            backdrop-blur-sm
            shadow-[0_4px_20px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)]
            active:shadow-[0_2px_12px_rgba(0,0,0,0.16)]
            border-2 border-black/5
            overflow-hidden
            flex items-center justify-center
            transition-shadow duration-300
          "
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 4px),
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 4px)
            `,
          }}
        >
          {/* 和紙風テクスチャ */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* パルスアニメーション */}
          <motion.div
            className="absolute inset-0 bg-mitsumata-primary/5 rounded-[28px]"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2.5,
              ease: "easeInOut",
            }}
          />

          {/* コンテンツ */}
          <div className="relative z-10 flex items-center gap-2 px-5">
            {!isExpanded ? (
              // 縮小状態: 「予」の一文字
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-base font-serif font-medium tracking-wider"
              >
                予
              </motion.span>
            ) : (
              // 展開状態: 全文
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <span className="text-sm font-serif font-light tracking-[0.15em]">
                  予約する
                </span>
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="text-xs opacity-50"
                >
                  →
                </motion.span>
              </motion.div>
            )}
          </div>

          {/* 左端のアクセントライン */}
          <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-transparent via-mitsumata-primary/40 to-transparent" />
        </motion.button>
      </motion.div>
    </>
  )
}

// Ken Burns効果のアニメーションパターン
type AnimationPattern = {
  scale: [number, number]
  x: [string, string]
  y: [string, string]
}

const heroImagesDesktop = [
  {
    id: 1,
    url: "/images/hero/main01.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.1, 1.15], x: ["-1%", "1%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 2,
    url: "/images/hero/main02.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.15, 1.1], x: ["1%", "-1%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 3,
    url: "/images/hero/main03.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.1, 1.15], x: ["0%", "0%"], y: ["-1%", "1%"] } as AnimationPattern,
  },
  {
    id: 4,
    url: "/images/hero/main04.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.15, 1.1], x: ["0%", "0%"], y: ["1%", "-1%"] } as AnimationPattern,
  },
  {
    id: 5,
    url: "/images/hero/main05.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.1, 1.15], x: ["1%", "-1%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 6,
    url: "/images/hero/main06.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.15, 1.1], x: ["-1%", "1%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 7,
    url: "/images/hero/main07.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.1, 1.15], x: ["0%", "0%"], y: ["1%", "-1%"] } as AnimationPattern,
  },
  {
    id: 8,
    url: "/images/hero/main08.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.15, 1.1], x: ["1%", "-1%"], y: ["0%", "0%"] } as AnimationPattern,
  },
]

const heroImagesMobile = [
  {
    id: 1,
    url: "/images/hero/main01_mobile.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.1, 1.15], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 2,
    url: "/images/hero/main02_mobile.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.15, 1.1], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 3,
    url: "/images/hero/main03_mobile.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.1, 1.15], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 4,
    url: "/images/hero/main04_mobile.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.15, 1.1], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 5,
    url: "/images/hero/main05_mobile.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.1, 1.15], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 6,
    url: "/images/hero/main06_mobile.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.15, 1.1], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 7,
    url: "/images/hero/main07_mobile.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.1, 1.15], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
  {
    id: 8,
    url: "/images/hero/main08_mobile.jpg",
    alt: "北アルプス黒部源流の雄大な景色",
    animation: { scale: [1.15, 1.1], x: ["0%", "0%"], y: ["0%", "0%"] } as AnimationPattern,
  },
]

export function HeroParallaxSection() {
  const [showFixedBg, setShowFixedBg] = useState(true)
  const [bgOpacity, setBgOpacity] = useState(1)
  const [activeSlideDesktop, setActiveSlideDesktop] = useState(0)
  const [activeSliderMobile, setActiveSliderMobile] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, 2000], [0, 400])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight

      // モバイルでは、ヒーローセクションの終わりに向けて固定背景をフェードアウト
      if (window.innerWidth < 768) {
        const fadeStartPoint = viewportHeight * 1.5 // 150vhから透明度変化開始
        const fadeEndPoint = viewportHeight * 1.8 // 180vhで完全に消える

        if (scrollPosition < fadeStartPoint) {
          // 150vhまでは完全に不透明
          setBgOpacity(1)
          setShowFixedBg(true)
        } else if (scrollPosition < fadeEndPoint) {
          // 150vh～180vhの間で透明度を1→0に変化
          const fadeProgress = (scrollPosition - fadeStartPoint) / (fadeEndPoint - fadeStartPoint)
          setBgOpacity(1 - fadeProgress)
          setShowFixedBg(true)
        } else {
          // 180vh以降は完全に非表示
          setBgOpacity(0)
          setShowFixedBg(false)
        }
      }
    }

    // 初回実行
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full">
      {showFixedBg && (
        <div
          className="md:hidden fixed top-0 left-0 w-full h-screen z-10 pointer-events-none transition-opacity duration-300"
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
                    <motion.div
                      className="relative h-full w-full"
                      initial={{
                        scale: image.animation.scale[0],
                        x: image.animation.x[0],
                        y: image.animation.y[0],
                      }}
                      animate={
                        activeSliderMobile === index
                          ? {
                              scale: image.animation.scale[1],
                              x: image.animation.x[1],
                              y: image.animation.y[1],
                            }
                          : undefined
                      }
                      transition={{
                        duration: 4,
                        delay: activeSliderMobile === index ? 2.5 : 0,
                        ease: "easeInOut",
                      }}
                    >
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-cover object-center"
                        priority={image.id === 1}
                        quality={100}
                        sizes="100vw"
                      />
                    </motion.div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 pointer-events-none" />
        </div>
      )}

      {/* デスクトップ用パララックス背景 */}
      <div className="hidden md:block absolute top-0 left-0 w-full h-[200vh] z-10 overflow-hidden">
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
          >
            {heroImagesDesktop.map((image, index) => (
              <SwiperSlide key={image.id}>
                <div className="relative h-full w-full overflow-hidden">
                  <motion.div
                    className="relative h-full w-full"
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
                      className="object-cover object-center"
                      priority={image.id === 1}
                      quality={100}
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
      <div className="relative z-30 min-h-[180vh] md:min-h-[200vh]">
        <div className="h-screen flex items-end px-4 sm:px-6 md:px-12 lg:px-20 pb-12 sm:pb-14 md:pb-16 lg:pb-20">
          <div className="w-full max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5 sm:space-y-6 md:space-y-7 max-w-2xl"
            >
              <div className="space-y-3 sm:space-y-3 md:space-y-4">
                <h1
                  className="text-white text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-light leading-[1.6] tracking-[0.08em]"
                  style={{ textShadow: "0 3px 16px rgba(0,0,0,0.7), 0 2px 6px rgba(0,0,0,0.95)" }}
                >
                  北アルプス黒部源流
                </h1>

                <p
                  className="text-white/90 text-[10px] sm:text-[10px] md:text-xs lg:text-sm tracking-[0.2em] sm:tracking-[0.25em] font-light font-sans uppercase"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.9)" }}
                >
                  Northern Alps Kurobe Genryu
                </p>
              </div>

              <div className="space-y-3 sm:space-y-3 md:space-y-4 pt-3 sm:pt-3 md:pt-4">
                <p
                  className="text-white/95 text-sm sm:text-sm md:text-base lg:text-lg leading-[1.8] sm:leading-[1.8] font-serif font-light tracking-[0.04em] sm:tracking-[0.05em]"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.9)" }}
                >
                  北アルプス最奥、黒部源流の三つの山荘
                </p>
                <p
                  className="text-white/90 text-xs sm:text-xs md:text-sm lg:text-base leading-[1.8] sm:leading-[1.8] font-serif font-light tracking-[0.04em] sm:tracking-[0.05em]"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.9)" }}
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
                  whileHover={{ scale: 1.05, rotate: 360 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />

                  <motion.span
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                    className="text-white text-xs sm:text-xs md:text-sm font-serif font-light tracking-[0.1em] sm:tracking-[0.12em] text-center px-4 sm:px-5 relative z-10"
                  >
                    三俣山荘
                    <br />
                    グループについて
                  </motion.span>
                </motion.div>

                <motion.div
                  className="absolute inset-0 rounded-full border border-white/15"
                  initial={{ scale: 1, opacity: 0 }}
                  whileHover={{ scale: 1.15, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 予約ボタン - 固定表示 */}
      <ReservationButton />

      {/* スクロールインジケーター */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="fixed bottom-6 sm:bottom-8 md:bottom-10 right-6 sm:right-8 md:right-16 lg:right-20 z-40"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2 sm:gap-2.5 cursor-pointer group opacity-40 hover:opacity-100 transition-opacity duration-500"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            })
          }}
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/40 group-hover:border-white rounded-full flex items-start justify-center p-1.5 transition-colors duration-300">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="w-1 h-1 bg-white/60 group-hover:bg-white rounded-full transition-colors duration-300"
            />
          </div>
          <span className="text-white/60 group-hover:text-white text-[7px] sm:text-[8px] font-serif font-light tracking-[0.2em] sm:tracking-[0.25em] uppercase transition-colors duration-300">
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
