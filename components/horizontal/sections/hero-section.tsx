'use client'

import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'

export function HeroSection() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-50">
      {/* 背景パターン */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 text-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif font-light tracking-wider mb-8 text-gray-900">
            三俣山荘
          </h1>
          <p className="text-xl md:text-2xl font-serif font-light tracking-widest text-gray-700 mb-4">
            MITSUMATA MOUNTAIN GROUP
          </p>
          <p className="text-base md:text-lg font-serif font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
            北アルプス最奥、黒部源流の山小屋
          </p>
        </motion.div>

        {/* スクロールヒント - 左向き */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            className="flex items-center gap-2 text-sm text-gray-500 font-light tracking-wider"
            animate={{ x: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>SCROLL</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
