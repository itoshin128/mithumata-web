"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"
import { useEffect, useRef, useState } from "react"

const heroImagesDesktop = [
  {
    id: 1,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSF5531-LD5GBso6bYuvyo2mDIbuITjyApbf17.jpg",
    alt: "三俣山荘と美しい山の稜線を見下ろす景色",
  },
  {
    id: 2,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/03-ios2ydXxcILEL77CGlzP33hmaez9VU.jpg",
    alt: "湯俣渓谷のエメラルドグリーンの川と迫力ある岩壁",
  },
  {
    id: 3,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/04-7cjaiJbx2OsZCai4LOxN2OLGs9AJdY.jpg",
    alt: "ライチョウのポートレート、青い空と高山植物を背景に",
  },
  {
    id: 4,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/02-3LtX1kcTrDwDsbx48VNw5cSoGzjBQ9.jpg",
    alt: "三俣山荘の屋根の上で作業するスタッフ、雲海と山々が背景",
  },
  {
    id: 5,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/06-YNif9GSi0Jgf1vtvrTIUUPHWRCORiC.jpg",
    alt: "夕暮れ時の山岳風景、柔らかな光が差し込む稜線",
  },
  {
    id: 6,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/05-hYTftimz2QldYwKF4oDaqRdqKHPpU5.jpg",
    alt: "高山植物の接写、オレンジ色の百合のような花と蝶々",
  },
]

const heroImagesMobile = [
  {
    id: 1,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/03-d7leNOLU5Vm5OlhTFXAnZiblOwQsp2.jpg",
    alt: "湯俣渓谷のエメラルドグリーンの川と岩壁",
  },
  {
    id: 2,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSF5531-0gVEfEJXNGpn4vRLTbqT0ZHd1gcfi9.jpg",
    alt: "三俣山荘と山の稜線を見下ろす景色",
  },
  {
    id: 3,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSF3852%20%281%29-NwvlmQJNtAK54ffMzi7J8Ui8iyb1Lb.jpg",
    alt: "ライチョウのポートレート、青い空と高山植物",
  },
]

export function HeroParallaxSection() {
  const [showFixedBg, setShowFixedBg] = useState(true)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, 2000], [0, 400])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight

      // モバイルでは、1.5画面分スクロールしたら固定背景を非表示
      if (window.innerWidth < 768) {
        const shouldShow = scrollPosition < viewportHeight * 1.5
        setShowFixedBg(shouldShow)
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
    <section ref={sectionRef} className="relative w-full isolate" style={{ zIndex: 100 }}>
      {showFixedBg && (
        <div className="md:hidden fixed top-0 left-0 w-full h-screen z-10">
          <div className="h-full w-full">
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
            >
              {heroImagesMobile.map((image) => (
                <SwiperSlide key={image.id}>
                  <div className="relative h-full w-full">
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover object-center"
                      priority={image.id === 1}
                      quality={100}
                      sizes="100vw"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
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
          >
            {heroImagesDesktop.map((image) => (
              <SwiperSlide key={image.id}>
                <div className="relative h-full w-full">
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover object-center"
                    priority={image.id === 1}
                    quality={100}
                    sizes="100vw"
                  />
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-white/95 hover:bg-white text-black px-8 py-3 md:px-5 md:py-12 backdrop-blur-md group shadow-2xl border border-black/5 md:border-l md:border-t-0 md:border-b-0 md:border-r-0 rounded-full md:rounded-none"
        >
          <span className="flex items-center gap-2 md:flex-col md:items-center md:gap-3 text-xs font-serif font-light tracking-[0.15em] md:tracking-[0.2em] md:[writing-mode:vertical-rl]">
            <motion.span
              whileHover={{ letterSpacing: "0.25em" }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              予約する
            </motion.span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="text-[10px] opacity-40 group-hover:opacity-100 transition-opacity md:rotate-90"
            >
              →
            </motion.span>
          </span>
        </motion.button>
      </motion.div>

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
