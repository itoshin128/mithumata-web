'use client'

import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useRef } from 'react'

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <div
      ref={ref}
      className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-900 via-gray-900 to-stone-900"
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(255 255 255 / 0.15) 1px, transparent 0)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 w-full max-w-4xl px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
        >
          {/* タイトル */}
          <div className="mb-20">
            <p className="text-sm tracking-widest text-gray-400 mb-6">CONTACT</p>
            <h2 className="text-6xl font-serif font-light tracking-wider text-white mb-8">
              お問い合わせ
            </h2>
            <p className="text-lg font-serif font-light text-gray-300 leading-relaxed max-w-2xl mx-auto">
              ご予約・ご質問など、お気軽にお問い合わせください
            </p>
          </div>

          {/* コンタクト情報 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm tracking-wider text-gray-400 mb-2">電話</p>
              <p className="text-lg font-light text-white">0263-00-0000</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm tracking-wider text-gray-400 mb-2">メール</p>
              <p className="text-lg font-light text-white">info@mitsumata.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm tracking-wider text-gray-400 mb-2">住所</p>
              <p className="text-lg font-light text-white">長野県大町市</p>
            </motion.div>
          </div>

          {/* フッター */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-12 border-t border-gray-700"
          >
            <p className="text-sm text-gray-500 font-light tracking-wider">
              © 2024 MITSUMATA MOUNTAIN GROUP. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
