'use client'

import { motion, MotionValue, useTransform } from 'framer-motion'

interface ScrollIndicatorProps {
  totalSections: number
  currentSection: number
  scrollProgress: MotionValue<number>
}

export function ScrollIndicator({ totalSections, currentSection, scrollProgress }: ScrollIndicatorProps) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {Array.from({ length: totalSections }).map((_, index) => {
        const isActive = currentSection === index
        return (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                isActive
                  ? 'border-gray-900 bg-gray-900 scale-125'
                  : 'border-gray-400 bg-transparent hover:border-gray-700'
              }`}
              whileHover={{ scale: 1.5 }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
