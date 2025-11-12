"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, Mountain } from "lucide-react"

const navigationItems = [
  { label: "山荘紹介", href: "/lodges" },
  { label: "コラム", href: "/blog" },
  { label: "アクセス", href: "/access" },
  { label: "FAQ", href: "/faq" },
  { label: "予約する", href: "/reservations", highlight: true },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // キーボードナビゲーション
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMenuOpen])

  // メニューが開いているときはbodyのスクロールを無効化
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <>
      {/* モダンミニマリスト ハンバーガーボタン */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 200 }}
        className="fixed z-50 pointer-events-none"
        style={{
          // デスクトップ: 右下
          // モバイル: 右下（セーフエリア考慮）
          right: "clamp(20px, 4vw, 40px)",
          bottom: "clamp(20px, 4vw, 40px)",
        }}
      >
        <motion.button
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group pointer-events-auto relative"
          aria-label="メニューを開く"
          aria-expanded={isMenuOpen}
          aria-controls="main-menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* ニューモーフィズム + グラスモーフィズム ボタン */}
          <motion.div
            className="relative overflow-hidden rounded-full bg-white/90 backdrop-blur-xl"
            animate={{
              width: isHovered ? 80 : 64,
              height: isHovered ? 80 : 64,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              boxShadow: `
                8px 8px 20px rgba(0, 0, 0, 0.12),
                -8px -8px 20px rgba(255, 255, 255, 0.95),
                inset 0 0 0 1px rgba(255, 255, 255, 0.6),
                inset 4px 4px 8px rgba(255, 255, 255, 0.5),
                inset -4px -4px 8px rgba(0, 0, 0, 0.05)
              `,
            }}
          >
            {/* グラデーション オーバーレイ */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-gray-100/20"
              animate={{ opacity: isHovered ? 1 : 0.6 }}
              transition={{ duration: 0.3 }}
            />

            {/* アイコン コンテナ */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* ミニマリスト ハンバーガーアイコン */}
              <motion.div
                className="flex flex-col"
                animate={{ gap: isHovered ? "8px" : "6px" }}
                transition={{ duration: 0.2 }}
              >
                {[0, 1, 2].map((index) => (
                  <motion.span
                    key={index}
                    className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-full"
                    animate={{
                      width: isHovered ? [22, 26, 22][index] : 20,
                      height: isHovered ? 3 : 2.5,
                      opacity: isHovered ? 1 : 0.85,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* リップル エフェクト（クリック時） */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gray-300/40"
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* ホバー時のラベル */}
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: -14, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-gray-900/95 backdrop-blur-sm text-white text-[10px] font-semibold tracking-[0.15em] whitespace-nowrap shadow-lg"
                style={{
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                }}
              >
                MENU
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* フルスクリーンメニュー */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* オーバーレイ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gradient-to-br from-black/50 via-black/60 to-black/50 backdrop-blur-md z-[60]"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            {/* メニューパネル - モダンミニマリスト */}
            <motion.div
              id="main-menu"
              role="dialog"
              aria-modal="true"
              aria-label="メインメニュー"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{
                type: "spring",
                damping: 35,
                stiffness: 300,
                opacity: { duration: 0.2 },
              }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-white/95 backdrop-blur-2xl z-[70] overflow-hidden"
              style={{
                boxShadow: `
                  -12px 0 48px rgba(0, 0, 0, 0.12),
                  inset 1px 0 0 rgba(255, 255, 255, 0.6)
                `,
              }}
            >
              {/* グラデーション バックグラウンド */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-gray-50/20 to-white/40 pointer-events-none" />

              <div className="relative flex flex-col h-full">
                {/* ヘッダー - ミニマル */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200/60">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-mitsumata to-mitsumata-dark flex items-center justify-center shadow-lg">
                      <Mountain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="block font-serif font-bold text-lg text-gray-900 tracking-tight">
                        三俣山荘グループ
                      </span>
                      <span className="block text-[10px] text-gray-500 mt-0.5 tracking-[0.1em] uppercase font-medium">
                        Kita Alps
                      </span>
                    </div>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="w-11 h-11 rounded-2xl hover:bg-gray-100/80 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:ring-offset-2"
                    aria-label="メニューを閉じる"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5 text-gray-900" />
                  </motion.button>
                </div>

                {/* ナビゲーション - ミニマリストスタイル */}
                <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="メインナビゲーション">
                  <ul className="space-y-2.5" role="list">
                    {navigationItems.map((item, index) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.15 + index * 0.08,
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`
                            group block relative py-4 px-6 text-base font-medium rounded-2xl transition-all duration-300
                            focus:outline-none focus:ring-2 focus:ring-offset-2
                            ${
                              item.highlight
                                ? "bg-gradient-to-r from-mitsumata to-mitsumata-dark text-white hover:shadow-lg hover:shadow-mitsumata/30 hover:scale-[1.02] focus:ring-mitsumata"
                                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/70 focus:ring-gray-900/20"
                            }
                          `}
                        >
                          <span className="relative z-10">{item.label}</span>
                          {!item.highlight && (
                            <motion.div
                              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              initial={false}
                            />
                          )}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>

                  {/* 山荘リンク - カード形式 */}
                  <div className="mt-10 pt-8 border-t border-gray-200/60">
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-4 px-2"
                    >
                      山荘
                    </motion.h3>
                    <ul className="space-y-3" role="list">
                      {[
                        { name: "三俣山荘", href: "/lodges/mitsumata", color: "mitsumata" },
                        { name: "水晶小屋", href: "/lodges/suisho", color: "suisho" },
                        { name: "湯俣山荘", href: "/lodges/yumata", color: "yumata" },
                      ].map((lodge, index) => (
                        <motion.li
                          key={lodge.href}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.5 + index * 0.08,
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          }}
                        >
                          <Link
                            href={lodge.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="group block relative p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200/60 hover:border-gray-300/80 hover:shadow-md hover:scale-[1.01] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:ring-offset-2"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-2.5 h-2.5 rounded-full shadow-sm`}
                                style={{
                                  backgroundColor: `var(--${lodge.color}-primary)`,
                                }}
                              />
                              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                                {lodge.name}
                              </span>
                            </div>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </nav>

                {/* フッター - ミニマル */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="px-8 py-6 border-t border-gray-200/60 bg-gradient-to-b from-transparent to-gray-50/40"
                >
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    北アルプス最奥、黒部源流の三つの山荘
                  </p>
                  <p className="text-[10px] text-gray-500 mt-2 tracking-wide">
                    営業期間: 7月〜11月
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
