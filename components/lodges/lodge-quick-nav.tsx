"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Mountain, Waves, Flame } from "lucide-react"
import { FadeInSection } from "@/components/animations/fade-in-section"

const lodges = [
  {
    id: "mitsumata",
    name: "三俣山荘",
    subtitle: "Mitsumata Sanso",
    description: "黒部源流の中心地",
    color: "#2d5016",
    bgColor: "#f0f5ed",
    icon: Mountain,
    link: "/lodges/mitsumata",
  },
  {
    id: "suisho",
    name: "水晶小屋",
    subtitle: "Suisho Goya",
    description: "雲ノ平への玄関口",
    color: "#5ba4cf",
    bgColor: "#edf6fb",
    icon: Waves,
    link: "/lodges/suisho",
  },
  {
    id: "yumata",
    name: "湯俣山荘",
    subtitle: "Yumata Sanso",
    description: "秘湯と原生林の山荘",
    color: "#b8604a",
    bgColor: "#faf4f1",
    icon: Flame,
    link: "/lodges/yumata",
  },
]

export function LodgeQuickNav() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl">
        {/* Section Header */}
        <FadeInSection delay={0.1}>
          <div className="text-center mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-light mb-4 sm:mb-5 md:mb-6 tracking-[0.08em] leading-[1.6] text-balance">
              三つの山荘
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-[1.9] tracking-[0.04em] font-serif font-light text-pretty">
              それぞれの山荘が、異なる魅力と体験を提供します
            </p>
          </div>
        </FadeInSection>

        {/* Lodge Cards - モバイルファースト、大きなタップエリア */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-5 lg:gap-6">
          {lodges.map((lodge, index) => {
            const Icon = lodge.icon

            return (
              <FadeInSection key={lodge.id} delay={0.2 + index * 0.1}>
                <Link href={lodge.link}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="
                      group relative overflow-hidden
                      bg-white/60 backdrop-blur-sm
                      rounded-2xl sm:rounded-3xl
                      shadow-md hover:shadow-2xl
                      transition-all duration-500
                      cursor-pointer
                      min-h-[280px] sm:min-h-[300px] md:min-h-[320px]
                      flex flex-col
                      border border-gray-200/50
                    "
                    style={{
                      backgroundColor: `${lodge.bgColor}cc`,
                    }}
                  >
                    {/* 背景グラデーション */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${lodge.color}08 0%, ${lodge.color}15 100%)`,
                      }}
                    />

                    {/* コンテンツ */}
                    <div className="relative z-10 p-6 sm:p-7 md:p-8 flex flex-col h-full">
                      {/* アイコン */}
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="
                          w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20
                          rounded-full
                          flex items-center justify-center
                          mb-6 sm:mb-7
                          shadow-lg
                          border-2
                        "
                        style={{
                          backgroundColor: `${lodge.color}15`,
                          borderColor: `${lodge.color}40`,
                        }}
                      >
                        <Icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" style={{ color: lodge.color }} />
                      </motion.div>

                      {/* テキスト */}
                      <div className="flex-1 flex flex-col">
                        <h3
                          className="text-2xl sm:text-2xl md:text-3xl font-serif font-light mb-2 sm:mb-3 tracking-[0.08em] leading-[1.5]"
                          style={{ color: lodge.color }}
                        >
                          {lodge.name}
                        </h3>

                        <p
                          className="text-xs sm:text-sm font-sans font-light uppercase tracking-[0.2em] mb-4 sm:mb-5 opacity-70"
                          style={{ color: lodge.color }}
                        >
                          {lodge.subtitle}
                        </p>

                        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-[1.8] tracking-[0.04em] font-serif font-light mb-6">
                          {lodge.description}
                        </p>

                        {/* 矢印アイコン */}
                        <div className="mt-auto flex items-center gap-2 text-sm font-serif font-light tracking-[0.15em]" style={{ color: lodge.color }}>
                          <span>詳しく見る</span>
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          >
                            →
                          </motion.span>
                        </div>
                      </div>
                    </div>

                    {/* ホバー時のボーダーエフェクト */}
                    <div
                      className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ borderColor: `${lodge.color}30` }}
                    />
                  </motion.div>
                </Link>
              </FadeInSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
