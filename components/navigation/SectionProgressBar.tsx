'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Calendar } from 'lucide-react'
import type { SectionConfig } from '@/hooks/useActiveSection'

interface SectionProgressBarProps {
  sections: SectionConfig[]
  activeSection: string
  scrollProgress: number
}

/**
 * デスクトップ用の右端プログレスバー付きナビゲーション
 * 和紙テクスチャと墨色グラデーションを使用した和の美学
 */
export function SectionProgressBar({
  sections,
  activeSection,
  scrollProgress,
}: SectionProgressBarProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.aside
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <div className="relative">
        {/* 和紙調の背景 - ホバー時に展開 */}
        <motion.div
          className="absolute right-0 top-0 h-full bg-gradient-to-l from-stone-100/95 via-stone-50/90 to-transparent backdrop-blur-sm rounded-l-lg"
          initial={{ width: '3rem' }}
          animate={{ width: isHovered ? '14rem' : '3rem' }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{
            boxShadow: isHovered
              ? '-4px 0 24px rgba(0, 0, 0, 0.08)'
              : '-2px 0 8px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* 和紙テクスチャオーバーレイ */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none rounded-l-lg"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
          />
        </motion.div>

        {/* プログレスバーと墨色の縦線 */}
        <div className="relative flex flex-col items-end gap-6 py-6 px-4 pr-6">
          {/* 縦線とプログレスバー */}
          <div className="relative h-80">
            {/* 背景の縦線（薄い墨色） */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-stone-300/40 via-stone-400/60 to-stone-300/40 rounded-full" />

            {/* プログレスバー（濃い墨色） */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-stone-600 via-stone-700 to-stone-600 rounded-full origin-top"
              style={{ height: `${scrollProgress}%` }}
              transition={{ duration: 0.15 }}
            />

            {/* セクションドット */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full flex flex-col justify-between">
              {sections.map((section, index) => {
                const isActive = activeSection === section.id
                const dotPosition = (index / (sections.length - 1)) * 100

                return (
                  <button
                    key={section.id}
                    onClick={() => handleNavigate(section.id)}
                    className="group relative -translate-x-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2 rounded-full"
                    style={{
                      position: 'absolute',
                      top: `${dotPosition}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    aria-label={`${section.label}セクションへ移動`}
                  >
                    {/* ドットの外側のリング（アクティブ時） */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 -m-1"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                        >
                          <div className="w-5 h-5 rounded-full border-2 border-stone-600/40" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* メインドット */}
                    <motion.div
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-stone-800 shadow-lg shadow-stone-800/40'
                          : 'bg-stone-400 group-hover:bg-stone-600 group-hover:scale-125'
                      }`}
                      animate={{
                        scale: isActive ? 1.15 : 1,
                      }}
                    />

                    {/* ホバー時のテキストラベル */}
                    {isHovered && (
                      <motion.div
                        className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <span
                          className={`text-sm font-serif tracking-[0.08em] transition-all duration-300 ${
                            isActive
                              ? 'text-stone-800 font-medium text-base'
                              : 'text-stone-600 group-hover:text-stone-800'
                          }`}
                        >
                          {section.label}
                        </span>
                      </motion.div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 予約CTAボタン */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.button
              onClick={() => {
                // 予約セクションまたは外部リンクにナビゲート
                window.location.href = '#reservation'
              }}
              className="group relative flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-stone-700 to-stone-800 text-white rounded-l-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2"
              whileHover={{ x: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="予約・お問い合わせ"
            >
              {/* 背景アニメーション */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-stone-600 to-stone-700 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ zIndex: -1 }}
              />

              {/* アイコン（常に表示） */}
              <motion.div
                animate={{
                  rotate: isHovered ? 0 : [0, -10, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: isHovered ? 0 : Infinity,
                  repeatDelay: 3,
                }}
              >
                <Calendar className="w-5 h-5 flex-shrink-0" />
              </motion.div>

              {/* テキスト（ホバー時に展開） */}
              <motion.div
                className="overflow-hidden"
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: isHovered ? 'auto' : 0,
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <span className="font-serif text-sm tracking-[0.12em] whitespace-nowrap">
                  予約・問合せ
                </span>
              </motion.div>

              {/* 縦書き風アクセント（非ホバー時） */}
              {!isHovered && (
                <motion.div
                  className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/30 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  )
}
