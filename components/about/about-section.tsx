"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export function AboutSection() {
  const scrollToNextSection = () => {
    const element = document.getElementById("lodges-section")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSCF0059%5B1-gSvV4yL5bzqtNGfvrjuYxsqTaoY479.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-white space-y-4">
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold border-b-2 border-white/80 pb-4 mb-4">
                山との深い
                <br className="md:hidden" />
                かかわり
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold border-b-2 border-white/80 pb-4 mb-4">
                自然を守り
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl font-bold border-b-2 border-white/80 pb-4">
                次世代へつなぐ
              </span>
            </h2>
            <p className="text-white/90 text-base md:text-lg leading-relaxed">癒す - 働く - 遊ぶ - 感じる</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 text-white"
          >
            <p className="text-base md:text-lg leading-relaxed">
              北アルプスの最奥、標高2,500m以上の黒部源流域に位置する三俣山荘グループ。
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              1945年、先代・伊藤正一が初めて足を踏み入れたこの地で、私たちは山小屋を営みながら、登山道の整備「道直し」活動を通じて山岳保全に取り組んでいます。
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              「山の広さと深さへの入口」として、訪れる人々が新たな山の楽しみ方を発見し、自然と向き合い、自分自身を見つめる場所でありたい。それが私たちの願いです。
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToNextSection}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-dashed border-white/60 hover:border-white/90 flex flex-col items-center justify-center gap-2 text-white transition-all duration-300 backdrop-blur-sm bg-white/5 hover:bg-white/10"
            aria-label="山荘について"
          >
            <span className="text-sm md:text-base font-medium">山荘について</span>
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6 animate-bounce" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
