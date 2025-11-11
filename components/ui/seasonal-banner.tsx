"use client"

import { X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface SeasonalBannerProps {
  text: string
  type: "info" | "warning"
}

export function SeasonalBanner({ text, type }: SeasonalBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const isInfo = type === "info"

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative overflow-hidden border-y border-mitsumata/10"
        style={{
          background: isInfo
            ? "linear-gradient(135deg, rgba(45, 80, 22, 0.03) 0%, rgba(45, 80, 22, 0.06) 100%)"
            : "linear-gradient(135deg, rgba(217, 119, 6, 0.03) 0%, rgba(217, 119, 6, 0.06) 100%)",
        }}
      >
        {/* 和紙風のテクスチャオーバーレイ */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.15' /%3E%3C/svg%3E\")",
          }}
        />

        <div className="container mx-auto px-6 py-4 md:py-5 flex items-center justify-between max-w-7xl relative">
          <div className="flex-1 flex items-center justify-center gap-3">
            {/* 装飾的なアイコン */}
            <span className={`text-xs md:text-sm ${isInfo ? "text-mitsumata" : "text-amber-700"} opacity-60`}>◆</span>

            <p
              className={`text-sm md:text-base font-light tracking-wider ${isInfo ? "text-mitsumata" : "text-amber-800"} text-center`}
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.08em" }}
            >
              {text}
            </p>

            <span className={`text-xs md:text-sm ${isInfo ? "text-mitsumata" : "text-amber-700"} opacity-60`}>◆</span>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className={`ml-4 p-2 rounded-full transition-all duration-300 ${
              isInfo
                ? "hover:bg-mitsumata/10 text-mitsumata/60 hover:text-mitsumata"
                : "hover:bg-amber-700/10 text-amber-700/60 hover:text-amber-700"
            }`}
            aria-label="バナーを閉じる"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
