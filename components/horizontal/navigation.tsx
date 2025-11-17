'use client'

import { motion } from 'framer-motion'

interface NavigationProps {
  totalSections: number
  currentSection: number
  onNavigate: (index: number) => void
  sectionNames: string[]
}

export function Navigation({ totalSections, currentSection, onNavigate, sectionNames }: NavigationProps) {
  return (
    <>
      {/* デスクトップ版 - 右側のドットナビゲーション */}
      <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-4">
        {Array.from({ length: totalSections }).map((_, index) => {
          const isActive = currentSection === index
          return (
            <motion.button
              key={index}
              onClick={() => onNavigate(index)}
              className="group relative flex items-center"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* ドット */}
              <motion.div
                className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'border-gray-900 bg-gray-900 scale-125'
                    : 'border-gray-400 bg-transparent'
                }`}
                animate={{
                  scale: isActive ? 1.25 : 1,
                }}
              />

              {/* ホバー時のラベル */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: -10 }}
                className="absolute right-6 whitespace-nowrap pointer-events-none"
              >
                <div className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-md shadow-lg border border-gray-200">
                  <span className="text-xs font-serif tracking-wider text-gray-700">
                    {sectionNames[index]}
                  </span>
                </div>
              </motion.div>
            </motion.button>
          )
        })}
      </div>

      {/* モバイル版 - 下部のドットナビゲーション */}
      <div className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-3 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200">
        {Array.from({ length: totalSections }).map((_, index) => {
          const isActive = currentSection === index
          return (
            <motion.button
              key={index}
              onClick={() => onNavigate(index)}
              className="relative"
              whileTap={{ scale: 0.8 }}
            >
              <motion.div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-gray-900' : 'bg-gray-300'
                }`}
                animate={{
                  scale: isActive ? 1.3 : 1,
                }}
              />
            </motion.button>
          )
        })}
      </div>
    </>
  )
}
