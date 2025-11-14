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

  // 季節の装飾要素SVG
  const SeasonalDecoration = () => {
    if (isInfo) {
      // 葉と花弁のモチーフ（緑系）
      return (
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 葉のパターン */}
          <defs>
            <pattern id="leaf-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path
                d="M20,60 Q30,45 40,60 Q30,75 20,60"
                fill="currentColor"
                className="text-mitsumata"
                opacity="0.3"
              />
              <path
                d="M80,30 Q90,15 100,30 Q90,45 80,30"
                fill="currentColor"
                className="text-mitsumata"
                opacity="0.2"
              />
              <circle cx="60" cy="90" r="3" fill="currentColor" className="text-mitsumata" opacity="0.25" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
        </svg>
      )
    } else {
      // 紅葉と雪の結晶モチーフ（琥珀系）
      return (
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 紅葉のパターン */}
          <defs>
            <pattern id="autumn-pattern" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
              <path
                d="M30,70 L35,60 L40,70 L35,80 Z"
                fill="currentColor"
                className="text-amber-700"
                opacity="0.3"
              />
              <path
                d="M90,35 L94,28 L98,35 L94,42 Z"
                fill="currentColor"
                className="text-amber-600"
                opacity="0.25"
              />
              <circle cx="70" cy="100" r="2.5" fill="currentColor" className="text-amber-700" opacity="0.2" />
              <circle cx="110" cy="60" r="2" fill="currentColor" className="text-amber-600" opacity="0.25" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#autumn-pattern)" />
        </svg>
      )
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0, scale: 0.95 }}
        animate={{ height: "auto", opacity: 1, scale: 1 }}
        exit={{ height: 0, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative"
        role="region"
        aria-live="polite"
        aria-label="季節のお知らせ"
      >
        {/* カード型コンテナ */}
        <div
          className="relative mx-auto rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500"
          style={{
            maxWidth: "min(900px, calc(100% - 2rem))",
            background: isInfo
              ? "linear-gradient(135deg, rgba(240, 245, 237, 0.97) 0%, rgba(250, 252, 248, 0.95) 50%, rgba(245, 250, 242, 0.97) 100%)"
              : "linear-gradient(135deg, rgba(255, 251, 240, 0.97) 0%, rgba(254, 248, 235, 0.95) 50%, rgba(255, 250, 238, 0.97) 100%)",
            border: isInfo ? "1px solid rgba(45, 80, 22, 0.12)" : "1px solid rgba(217, 119, 6, 0.12)",
          }}
        >
          {/* 和紙の繊維感 - レイヤー1: 粗いテクスチャ */}
          <div
            className="absolute inset-0 opacity-[0.15] mix-blend-multiply"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' seed='1' /%3E%3CfeColorMatrix type='saturate' values='0' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise1)' /%3E%3C/svg%3E\")",
              backgroundSize: "200px 200px",
            }}
          />

          {/* 和紙の繊維感 - レイヤー2: 細かいテクスチャ */}
          <div
            className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' seed='5' /%3E%3CfeColorMatrix type='saturate' values='0' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise2)' /%3E%3C/svg%3E\")",
              backgroundSize: "100px 100px",
            }}
          />

          {/* 季節の装飾パターン */}
          <SeasonalDecoration />

          {/* グラデーションオーバーレイ（深み） */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              background: isInfo
                ? "radial-gradient(circle at 30% 40%, rgba(45, 80, 22, 0.15) 0%, transparent 60%)"
                : "radial-gradient(circle at 30% 40%, rgba(217, 119, 6, 0.15) 0%, transparent 60%)",
            }}
          />

          {/* メインコンテンツ */}
          <div className="relative px-6 py-5 md:px-8 md:py-6 lg:px-10 lg:py-7 flex items-center gap-4 md:gap-6">
            {/* 左側の装飾 */}
            <div className="hidden sm:flex flex-col items-center gap-2 opacity-40">
              <span
                className={`text-lg md:text-xl ${isInfo ? "text-mitsumata" : "text-amber-700"}`}
                aria-hidden="true"
              >
                ◆
              </span>
              <div
                className={`w-px h-8 ${isInfo ? "bg-mitsumata/30" : "bg-amber-700/30"}`}
                aria-hidden="true"
              />
            </div>

            {/* テキストコンテンツ */}
            <div className="flex-1 text-center sm:text-left">
              <p
                className={`text-base md:text-lg lg:text-xl font-light leading-relaxed ${
                  isInfo ? "text-mitsumata-dark" : "text-amber-900"
                }`}
                style={{
                  fontFamily: "var(--font-serif)",
                  letterSpacing: "0.08em",
                  textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)",
                }}
              >
                {text}
              </p>
            </div>

            {/* 右側の装飾 */}
            <div className="hidden sm:flex flex-col items-center gap-2 opacity-40">
              <div
                className={`w-px h-8 ${isInfo ? "bg-mitsumata/30" : "bg-amber-700/30"}`}
                aria-hidden="true"
              />
              <span
                className={`text-lg md:text-xl ${isInfo ? "text-mitsumata" : "text-amber-700"}`}
                aria-hidden="true"
              >
                ◆
              </span>
            </div>

            {/* 閉じるボタン */}
            <button
              onClick={() => setIsVisible(false)}
              className={`
                flex-shrink-0 p-2.5 md:p-3 rounded-xl
                transition-all duration-300 ease-out
                ${
                  isInfo
                    ? "bg-mitsumata/5 hover:bg-mitsumata/15 text-mitsumata/70 hover:text-mitsumata"
                    : "bg-amber-700/5 hover:bg-amber-700/15 text-amber-700/70 hover:text-amber-700"
                }
                hover:scale-110 active:scale-95
                focus:outline-none focus:ring-2 focus:ring-offset-2
                ${isInfo ? "focus:ring-mitsumata/40" : "focus:ring-amber-700/40"}
                shadow-sm hover:shadow-md
              `}
              aria-label="バナーを閉じる"
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
            </button>
          </div>

          {/* 下部のアクセント線 */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px opacity-20"
            style={{
              background: isInfo
                ? "linear-gradient(90deg, transparent 0%, rgba(45, 80, 22, 0.5) 50%, transparent 100%)"
                : "linear-gradient(90deg, transparent 0%, rgba(217, 119, 6, 0.5) 50%, transparent 100%)",
            }}
            aria-hidden="true"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
