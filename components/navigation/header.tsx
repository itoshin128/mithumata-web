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
      {/* トランスペアレント エレガンス ハンバーガーボタン */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 150, damping: 20 }}
        className="fixed z-50 pointer-events-none"
        style={{
          // デスクトップ・モバイル共通: 右上
          top: "clamp(20px, 4vh, 32px)",
          right: "clamp(20px, 4vw, 32px)",
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
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* エレガント サークル ボタン */}
          <motion.div
            className="relative overflow-hidden rounded-full backdrop-blur-md"
            animate={{
              width: isHovered ? 64 : 60,
              height: isHovered ? 64 : 60,
              backgroundColor: isHovered ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.10)",
            }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{
              border: "1.5px solid rgba(255, 255, 255, 0.25)",
              boxShadow: `
                0 4px 16px rgba(0, 0, 0, 0.08),
                0 1px 3px rgba(0, 0, 0, 0.12),
                0 0 0 1px rgba(0, 0, 0, 0.03),
                inset 0 1px 2px rgba(255, 255, 255, 0.4),
                inset 0 -1px 1px rgba(0, 0, 0, 0.02)
              `,
            }}
          >
            {/* 外側の装飾リング */}
            <motion.div
              className="absolute -inset-[2px] rounded-full pointer-events-none"
              animate={{
                opacity: isHovered ? 0.4 : 0,
              }}
              transition={{ duration: 0.3 }}
              style={{
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            />

            {/* グラデーション オーバーレイ */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-white/15 via-white/5 to-transparent pointer-events-none"
              animate={{ opacity: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            />

            {/* アイコン コンテナ */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* リファインド ハンバーガーアイコン */}
              <motion.div
                className="flex flex-col"
                animate={{ gap: isHovered ? "7px" : "6.5px" }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                {[0, 1, 2].map((index) => (
                  <motion.span
                    key={index}
                    className="rounded-full"
                    animate={{
                      width: isHovered ? [24, 20, 24][index] : [22, 18, 22][index],
                      height: isHovered ? 2 : 1.75,
                      opacity: isHovered ? 0.95 : 0.88,
                      backgroundColor: isHovered ? "rgba(30, 30, 30, 0.95)" : "rgba(30, 30, 30, 0.88)",
                    }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.035,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    style={{
                      boxShadow: "0 0.5px 1.5px rgba(0, 0, 0, 0.25)",
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* ホバー時の洗練されたラベル */}
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full mr-3.5 px-3 py-1.5 rounded-full bg-white/92 backdrop-blur-md text-gray-900 text-[9px] font-semibold tracking-[0.15em] whitespace-nowrap"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)",
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

            {/* メニューパネル - シンプル & エレガント */}
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
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] md:w-[520px] bg-[#fcf6e3]/98 backdrop-blur-2xl z-[70] overflow-hidden"
              style={{
                boxShadow: `
                  -12px 0 48px rgba(0, 0, 0, 0.12),
                  inset 1px 0 0 rgba(255, 255, 255, 0.6)
                `,
              }}
            >
              {/* 和紙テクスチャ背景 */}
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                }}
              />

              <div className="relative flex flex-col h-full">
                {/* ヘッダー */}
                <div className="flex items-center justify-between px-6 md:px-8 py-6 border-b border-gray-900/10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#2d5016]/10 to-[#5ba4cf]/10 flex items-center justify-center">
                      <Mountain className="w-5 h-5 md:w-6 md:h-6 text-[#2d5016]" />
                    </div>
                    <div>
                      <span className="block font-serif font-light text-lg md:text-xl text-gray-900 tracking-[0.06em] leading-[1.6]">
                        三俣山荘グループ
                      </span>
                      <span className="block text-[10px] md:text-xs text-gray-600 mt-0.5 tracking-wide uppercase font-medium">
                        Kita Alps
                      </span>
                    </div>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full hover:bg-gray-900/5 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:ring-offset-2"
                    aria-label="メニューを閉じる"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
                  </motion.button>
                </div>

                {/* ナビゲーション */}
                <nav className="flex-1 overflow-y-auto px-6 md:px-8 py-10 md:py-12" aria-label="メインナビゲーション">
                  <ul className="space-y-3 md:space-y-4" role="list">
                    {navigationItems.map((item, index) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.2 + index * 0.1,
                          type: "spring",
                          stiffness: 200,
                          damping: 25,
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`
                            group block relative py-5 md:py-6 px-6 md:px-8 text-lg md:text-xl font-serif font-light rounded-2xl transition-all duration-500
                            tracking-[0.04em] leading-[1.6]
                            focus:outline-none focus:ring-2 focus:ring-offset-2
                            ${
                              item.highlight
                                ? "bg-gradient-to-r from-mitsumata via-mitsumata-light to-mitsumata-dark text-white hover:shadow-xl hover:scale-[1.02] focus:ring-mitsumata"
                                : "text-gray-800 hover:text-gray-900 hover:bg-white/60 focus:ring-gray-900/20"
                            }
                          `}
                        >
                          <span className="relative z-10 block">{item.label}</span>
                          {!item.highlight && (
                            <motion.div
                              className="absolute inset-0 rounded-2xl bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-sm"
                              initial={false}
                            />
                          )}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>

                  {/* 山荘リンク */}
                  <div className="mt-12 pt-10 border-t border-gray-900/10">
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="text-xs font-bold text-gray-600 uppercase tracking-[0.2em] mb-6 px-2"
                    >
                      山荘
                    </motion.h3>
                    <ul className="space-y-4" role="list">
                      {[
                        { name: "三俣山荘", href: "/lodges/mitsumata", color: "#2d5016" },
                        { name: "水晶小屋", href: "/lodges/suisho", color: "#5ba4cf" },
                        { name: "湯俣山荘", href: "/lodges/yumata", color: "#b8604a" },
                      ].map((lodge, index) => (
                        <motion.li
                          key={lodge.href}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.8 + index * 0.1,
                            type: "spring",
                            stiffness: 200,
                            damping: 25,
                          }}
                        >
                          <Link
                            href={lodge.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="group block relative p-5 md:p-6 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:ring-offset-2"
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md"
                                style={{
                                  backgroundColor: `${lodge.color}15`,
                                  borderColor: lodge.color,
                                  borderWidth: "2px",
                                }}
                              >
                                <Mountain className="w-5 h-5 md:w-6 md:h-6" style={{ color: lodge.color }} />
                              </div>
                              <span className="text-base md:text-lg font-serif font-light text-gray-800 group-hover:text-gray-900 transition-colors tracking-[0.04em] leading-[1.6]">
                                {lodge.name}
                              </span>
                            </div>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </nav>

                {/* フッター */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="px-6 md:px-8 py-6 md:py-8 border-t border-gray-900/10 bg-gradient-to-b from-transparent to-white/30"
                >
                  <p className="text-xs md:text-sm text-gray-700 leading-[1.9] font-serif font-light tracking-[0.04em]">
                    北アルプス最奥、黒部源流の三つの山荘
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-500 mt-2 tracking-wider">
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
