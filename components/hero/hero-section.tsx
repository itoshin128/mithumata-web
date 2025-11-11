"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"

const heroImages = [
  {
    id: 1,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/01-hk5x19gmdW0yvBZe81xz1TaeSQK5kX.jpg",
    alt: "緑豊かな稜線に佇む三俣山荘の全景",
  },
  {
    id: 2,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/03-G411ifnlCY2fjUREKRp4xAeGWrye4b.jpg",
    alt: "エメラルドグリーンの渓流と岩壁、湯俣の渓谷",
  },
  {
    id: 3,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/02-dlYQ1f2XRbVib1K2EWMcvHjJPD5YAc.jpg",
    alt: "雲海の上、山荘の屋根で作業をするスタッフ",
  },
  {
    id: 4,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/05-M1Ruk2J1jC4Pc2ZxCGXLuR4FhxvRuJ.jpg",
    alt: "高山植物 - オレンジのユリと青い花、黄色い花",
  },
  {
    id: 5,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/04-PHwg8PgQYBcd5pN4dEHR7ltpyUVhVC.jpg",
    alt: "ライチョウが山の稜線に立つ姿",
  },
  {
    id: 6,
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/06-DTKla1bHWfmg7F899gDlimPgdApTxb.jpg",
    alt: "夕焼けに染まる山々の稜線",
  },
]

export function HeroSection() {
  return (
    <section className="relative w-full aspect-[5/4] overflow-hidden">
      {/* 背景画像スライドショー */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={2000}
          className="h-full w-full"
        >
          {heroImages.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="relative h-full w-full">
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover object-center"
                  priority={image.id === 1}
                  quality={95}
                  sizes="100vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/30 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex items-end px-6 md:px-12 lg:px-16 pb-20 md:pb-28">
        <div className="w-full max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-6 max-w-2xl"
          >
            <p className="text-white/90 text-sm md:text-base tracking-[0.3em] font-light uppercase">
              Mitsumata Sanso Group
            </p>
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-tight">
              北アルプス最奥、
              <br />
              黒部源流の
              <br />
              三つの山荘
            </h1>
            <p className="font-serif text-white/95 text-base md:text-lg leading-relaxed">
              標高2,500m以上、原始と変わらぬ生態系が息づく場所。
              <br />
              山の広さと深さへの、入口となる三つの山荘。
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:block"
      >
        <button className="bg-white/95 hover:bg-white text-black px-5 py-12 backdrop-blur-md transition-all duration-300 hover:px-6 group shadow-2xl border-l-2 border-black/10">
          <span
            className="flex flex-col items-center gap-3 text-sm font-medium tracking-[0.2em]"
            style={{ writingMode: "vertical-rl" }}
          >
            <span className="group-hover:tracking-[0.3em] transition-all">予約する</span>
            <span
              className="text-xs opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ writingMode: "horizontal-tb" }}
            >
              →
            </span>
          </span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-20 md:bottom-28 right-24 md:right-32 lg:right-40 z-10"
      >
        <button className="group relative">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-2 border-dashed border-white/60 flex items-center justify-center transition-all duration-500 hover:border-white hover:scale-105 hover:rotate-[360deg]">
            <span className="text-white text-sm md:text-base font-light tracking-wide group-hover:scale-110 transition-transform duration-300">
              山荘について
            </span>
          </div>
          <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 right-8 md:right-12 lg:right-16 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2 cursor-pointer group opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            })
          }}
        >
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-1.5 group-hover:border-white transition-colors">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 bg-white/80 rounded-full group-hover:bg-white"
            />
          </div>
          <span className="text-white/80 text-[10px] font-light tracking-[0.2em] uppercase group-hover:text-white transition-colors">
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
