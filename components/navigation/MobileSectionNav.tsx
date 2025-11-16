'use client'

import { motion } from 'framer-motion'
import { ChevronUp, Calendar } from 'lucide-react'
import { useState } from 'react'
import type { SectionConfig } from '@/hooks/useActiveSection'

interface MobileSectionNavProps {
  sections: SectionConfig[]
  activeSection: string
  scrollProgress: number
}

/**
 * モバイル用の下部固定ナビゲーション
 * 親指操作圏内に配置され、展開/折りたたみ可能
 */
export function MobileSectionNav({
  sections,
  activeSection,
  scrollProgress,
}: MobileSectionNavProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsExpanded(false) // ナビゲート後は折りたたむ
    }
  }

  const activeIndex = sections.findIndex((s) => s.id === activeSection)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* 展開時の目次メニュー */}
      <motion.div
        className="bg-gradient-to-t from-stone-100/98 via-stone-50/95 to-stone-50/90 backdrop-blur-md border-t border-stone-200/50 shadow-2xl"
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {isExpanded && (
          <div className="p-4 pb-3 max-h-[50vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {sections.map((section) => {
                const isActive = activeSection === section.id

                return (
                  <motion.button
                    key={section.id}
                    onClick={() => handleNavigate(section.id)}
                    className={`relative px-4 py-3 rounded-lg text-sm font-serif tracking-[0.08em] transition-all duration-200 ${
                      isActive
                        ? 'bg-stone-800 text-white shadow-lg'
                        : 'bg-white text-stone-700 hover:bg-stone-100 shadow-sm'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section.label}
                  </motion.button>
                )
              })}
            </div>

            {/* 予約CTAボタン（モバイル展開時） */}
            <motion.button
              onClick={() => {
                window.location.href = '#reservation'
                setIsExpanded(false)
              }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-stone-700 to-stone-800 text-white rounded-lg shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="ご予約"
            >
              <Calendar className="w-5 h-5" />
              <span className="font-serif text-sm tracking-[0.12em]">
                ご予約
              </span>
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* 常時表示のナビバー */}
      <div className="bg-gradient-to-t from-stone-100/98 via-stone-50/95 to-transparent backdrop-blur-md border-t border-stone-200/50 shadow-lg">
        {/* 和紙テクスチャオーバーレイ */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        <div className="relative px-4 py-3">
          {/* プログレスバー */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-stone-200/50">
            <motion.div
              className="h-full bg-gradient-to-r from-stone-600 via-stone-700 to-stone-600"
              style={{ width: `${scrollProgress}%` }}
              transition={{ duration: 0.15 }}
            />
          </div>

          {/* ナビゲーションコントロール */}
          <div className="flex items-center gap-2">
            {/* 現在のセクション表示 + 展開ボタン */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex-1 flex items-center justify-between gap-2 px-3 py-2 bg-white/80 hover:bg-white rounded-lg shadow-sm transition-all duration-200 group min-w-0"
            >
              <div className="text-left min-w-0 flex-1">
                <div className="text-[9px] text-stone-500 tracking-[0.2em] uppercase font-sans mb-0.5">
                  {activeIndex + 1} / {sections.length}
                </div>
                <div className="text-xs font-serif text-stone-800 tracking-[0.08em] truncate">
                  {sections[activeIndex]?.label || '三俣山荘'}
                </div>
              </div>

              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0"
              >
                <ChevronUp className="w-4 h-4 text-stone-600 group-hover:text-stone-800" />
              </motion.div>
            </button>

            {/* 予約CTAボタン - 常時表示 */}
            <motion.button
              onClick={() => {
                window.location.href = '#reservation'
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-stone-700 to-stone-800 text-white rounded-lg shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              aria-label="ご予約"
            >
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="font-serif text-xs tracking-[0.12em] whitespace-nowrap">
                ご予約
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
