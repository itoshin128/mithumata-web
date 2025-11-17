'use client'

import { motion, useSpring, useTransform, MotionValue } from 'framer-motion'
import { useEffect } from 'react'

interface ProgressBarProps {
  scrollProgress: MotionValue<number>
}

export function ProgressBar({ scrollProgress }: ProgressBarProps) {
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* 背景バー */}
      <div className="h-0.5 bg-gray-200/50 backdrop-blur-sm">
        {/* プログレスバー */}
        <motion.div
          className="h-full bg-gradient-to-r from-gray-400 via-gray-600 to-gray-900"
          style={{
            width: progressWidth,
            transformOrigin: 'left'
          }}
        />
      </div>

      {/* 上部の微かな光 */}
      <motion.div
        className="absolute top-0 left-0 h-1 blur-sm bg-gradient-to-r from-transparent via-gray-300/50 to-transparent"
        style={{
          width: progressWidth,
        }}
      />
    </div>
  )
}
