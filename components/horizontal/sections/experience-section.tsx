'use client'

import { motion, useInView } from 'framer-motion'
import { Sunrise, Mountain, Droplets, Star } from 'lucide-react'
import { useRef } from 'react'
import { WashiBackground } from '@/components/effects/washi-background'

const experiences = [
  {
    icon: Sunrise,
    title: '朝焼けの絶景',
    description: '北アルプスの稜線を染める朝日',
  },
  {
    icon: Mountain,
    title: '360度のパノラマ',
    description: '3,000m級の峰々を一望',
  },
  {
    icon: Droplets,
    title: '秘湯の温泉',
    description: '源流の湯に癒される',
  },
  {
    icon: Star,
    title: '満天の星空',
    description: '光害のない夜空の輝き',
  },
]

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden bg-gradient-to-br from-slate-50 via-stone-50 to-slate-50">
      {/* 和紙背景 */}
      <WashiBackground intensity="subtle" animated={false} />

      {/* コンテンツ */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 lg:px-16">
        {/* セクションタイトル */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm tracking-[0.3em] text-gray-500 font-light mb-4">
            MOUNTAIN EXPERIENCE
          </p>
          <h2 className="text-5xl md:text-6xl font-serif font-light tracking-wider text-gray-900">
            山での体験
          </h2>
        </motion.div>

        {/* 体験カードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
          {experiences.map((exp, index) => {
            const Icon = exp.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="relative p-8 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200/50 shadow-sm hover:shadow-xl transition-all duration-300">
                  {/* アイコン */}
                  <motion.div
                    className="w-16 h-16 mb-6 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 group-hover:border-gray-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
                  </motion.div>

                  {/* タイトル */}
                  <h3 className="text-lg font-serif font-medium text-gray-900 mb-3 text-center">
                    {exp.title}
                  </h3>

                  {/* 説明 */}
                  <p className="text-sm font-serif font-light text-gray-600 text-center leading-relaxed">
                    {exp.description}
                  </p>

                  {/* ホバー時の装飾 */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-gray-100/0 to-gray-200/0 group-hover:from-gray-100/30 group-hover:to-gray-200/20 transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* 装飾ライン */}
        <motion.div
          className="mt-16 flex items-center gap-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: isInView ? 1 : 0, scaleX: isInView ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-gray-300" />
          <div className="w-2 h-2 rounded-full bg-gray-400 rotate-45" />
          <div className="w-24 h-px bg-gradient-to-l from-transparent to-gray-300" />
        </motion.div>
      </div>
    </div>
  )
}
