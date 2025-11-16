'use client'

import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface SectionAnchorLinksProps {
  previousSection?: {
    id: string
    label: string
  }
  nextSection?: {
    id: string
    label: string
  }
  showDivider?: boolean
}

/**
 * セクション間のアンカーリンク
 * 既存のSectionDividerデザインを拡張し、前後のセクションへのナビゲーションを追加
 */
export function SectionAnchorLinks({
  previousSection,
  nextSection,
  showDivider = true,
}: SectionAnchorLinksProps) {
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="flex items-center justify-center my-16 md:my-20 lg:my-24">
      <div className="flex items-center gap-6 md:gap-8">
        {/* 前のセクションへ */}
        {previousSection && (
          <motion.button
            onClick={() => handleNavigate(previousSection.id)}
            className="group flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-4 rounded-lg px-3 py-2"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`${previousSection.label}へ戻る`}
          >
            <ChevronUp className="w-4 h-4 md:w-5 md:h-5 rotate-180" />
            <span className="hidden md:inline text-xs md:text-sm font-serif tracking-[0.08em]">
              {previousSection.label}
            </span>
          </motion.button>
        )}

        {/* 装飾線（既存デザインを継承） */}
        {showDivider && (
          <div className="flex items-center gap-4">
            <div className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-gray-300"></div>
            <div className="flex gap-2">
              <motion.div
                className="w-2 h-2 rotate-45 bg-gray-400 opacity-40"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="w-2 h-2 rotate-45 bg-gray-400 opacity-60"
                animate={{
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
              <motion.div
                className="w-2 h-2 rotate-45 bg-gray-400 opacity-80"
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
            </div>
            <div className="w-12 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-gray-300"></div>
          </div>
        )}

        {/* 次のセクションへ */}
        {nextSection && (
          <motion.button
            onClick={() => handleNavigate(nextSection.id)}
            className="group flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-4 rounded-lg px-3 py-2"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`${nextSection.label}へ進む`}
          >
            <span className="hidden md:inline text-xs md:text-sm font-serif tracking-[0.08em]">
              {nextSection.label}
            </span>
            <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
          </motion.button>
        )}
      </div>
    </div>
  )
}
