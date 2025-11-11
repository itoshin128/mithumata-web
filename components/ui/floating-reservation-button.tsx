"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar } from "lucide-react"

export function FloatingReservationButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // ヒーローセクションを過ぎたら表示
      setIsVisible(window.scrollY > window.innerHeight * 0.8)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
          }}
          className="fixed bottom-8 right-8 z-40"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              group
              bg-mitsumata hover:bg-mitsumata-dark
              text-white
              px-8 py-4
              rounded-full
              shadow-2xl hover:shadow-3xl
              flex items-center gap-3
              font-bold text-lg
              transition-all duration-300
            "
            onClick={() => {
              // 予約ページへ遷移
              window.location.href = "/reservations"
            }}
          >
            <Calendar className="w-5 h-5" />
            <span>宿泊予約する</span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              →
            </motion.span>
          </motion.button>

          {/* ツールチップ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="
              absolute -top-12 left-1/2 -translate-x-1/2
              bg-gray-900 text-white text-xs
              px-3 py-1.5 rounded-lg
              whitespace-nowrap
              opacity-0 group-hover:opacity-100
              transition-opacity
              pointer-events-none
            "
          >
            2025年シーズン予約受付中
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
