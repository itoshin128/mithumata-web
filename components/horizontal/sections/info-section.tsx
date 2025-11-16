'use client'

import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { useRef } from 'react'

// ダミーデータ
const newsItems = [
  {
    id: 1,
    date: '2024.11.15',
    category: 'お知らせ',
    title: '2025年シーズンの営業予定について',
  },
  {
    id: 2,
    date: '2024.11.10',
    category: '登山情報',
    title: '晩秋の登山における注意事項',
  },
  {
    id: 3,
    date: '2024.11.05',
    category: 'お知らせ',
    title: '今シーズンの営業終了日のご案内',
  },
]

export function InfoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <div
      ref={ref}
      className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-stone-50 to-gray-50"
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(0 0 0 / 0.15) 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 w-full max-w-3xl px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
        >
          {/* セクションタイトル */}
          <div className="mb-16">
            <p className="text-sm tracking-widest text-gray-500 mb-4">LATEST NEWS</p>
            <h2 className="text-5xl font-serif font-light tracking-wider text-gray-900">
              最新情報
            </h2>
          </div>

          {/* ニュースリスト */}
          <div className="space-y-8">
            {newsItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Link href={`/news/${item.id}`}>
                  <motion.div
                    className="group border-b border-gray-200 pb-6 cursor-pointer"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 pt-1">
                        <Calendar className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-baseline gap-4 mb-2">
                          <time className="text-sm text-gray-500 font-light">{item.date}</time>
                          <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-serif font-light text-gray-900 group-hover:text-gray-600 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* すべて見るボタン */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/news">
              <motion.button
                className="inline-flex items-center gap-3 px-8 py-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm tracking-wider font-light">すべて見る</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
