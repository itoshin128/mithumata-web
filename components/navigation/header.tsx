"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, Mountain, Home, BookOpen, MapPin, HelpCircle, Calendar } from "lucide-react"

const navigationItems = [
  { label: "山荘紹介", href: "/lodges", icon: Home },
  { label: "コラム", href: "/blog", icon: BookOpen },
  { label: "アクセス", href: "/access", icon: MapPin },
  { label: "FAQ", href: "/faq", icon: HelpCircle },
  { label: "予約する", href: "/reservations", icon: Calendar, highlight: true },
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
            {/* オーバーレイ - 洗練された背景 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-0 backdrop-blur-xl z-[60]"
              style={{
                background: `
                  linear-gradient(135deg,
                    rgba(45, 80, 22, 0.15) 0%,
                    rgba(0, 0, 0, 0.65) 50%,
                    rgba(45, 80, 22, 0.15) 100%)
                `,
              }}
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            {/* メニューパネル - 和のエレガンス */}
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
                damping: 30,
                stiffness: 250,
                opacity: { duration: 0.25 },
              }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] backdrop-blur-3xl z-[70] overflow-hidden"
              style={{
                backgroundColor: "rgba(252, 246, 227, 0.97)",
                boxShadow: `
                  -20px 0 60px rgba(0, 0, 0, 0.15),
                  -8px 0 24px rgba(0, 0, 0, 0.08),
                  inset 1px 0 0 rgba(255, 255, 255, 0.8)
                `,
              }}
            >
              {/* 和紙テクスチャ オーバーレイ */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.5) 0%, transparent 40%),
                    radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.3) 0%, transparent 40%),
                    radial-gradient(circle at 50% 50%, rgba(45, 80, 22, 0.02) 0%, transparent 50%)
                  `,
                }}
              />

              {/* 繊細なグラデーション */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/20 pointer-events-none" />

              <div className="relative flex flex-col h-full">
                {/* ヘッダー - 洗練されたデザイン */}
                <div className="flex items-center justify-between px-8 sm:px-10 py-7 border-b border-gray-300/40 backdrop-blur-sm">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 180, damping: 20 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-mitsumata via-mitsumata to-mitsumata-dark flex items-center justify-center shadow-xl shadow-mitsumata/20">
                      <Mountain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="block font-serif font-bold text-xl text-gray-900 tracking-tight leading-none">
                        三俣山荘グループ
                      </span>
                      <span className="block text-[11px] text-gray-500 mt-1.5 tracking-[0.12em] uppercase font-semibold">
                        Kita Alps
                      </span>
                    </div>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 180, damping: 20 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="w-12 h-12 rounded-2xl bg-white/60 hover:bg-white/90 border border-gray-200/60 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-mitsumata/30 focus:ring-offset-2 shadow-sm hover:shadow-md"
                    aria-label="メニューを閉じる"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </motion.button>
                </div>

                {/* ナビゲーション - 和のエレガンス */}
                <nav className="flex-1 overflow-y-auto px-6 sm:px-8 py-10" aria-label="メインナビゲーション">
                  <ul className="space-y-3" role="list">
                    {navigationItems.map((item, index) => {
                      const IconComponent = item.icon
                      return (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.2 + index * 0.07,
                            type: "spring",
                            stiffness: 260,
                            damping: 24,
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`
                              group block relative py-5 px-6 rounded-3xl transition-all duration-400
                              focus:outline-none focus:ring-2 focus:ring-offset-2
                              ${
                                item.highlight
                                  ? "bg-gradient-to-br from-mitsumata via-mitsumata to-mitsumata-dark text-white hover:shadow-2xl hover:shadow-mitsumata/40 hover:scale-[1.03] focus:ring-mitsumata/50 shadow-lg shadow-mitsumata/20"
                                  : "text-gray-700 hover:text-gray-900 bg-white/50 hover:bg-white/90 focus:ring-mitsumata/20 border border-gray-200/60 hover:border-gray-300/80 shadow-sm hover:shadow-md"
                              }
                            `}
                          >
                            <div className="relative z-10 flex items-center gap-4">
                              <div
                                className={`
                                  w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300
                                  ${
                                    item.highlight
                                      ? "bg-white/20 group-hover:bg-white/30"
                                      : "bg-gray-100/80 group-hover:bg-mitsumata/10"
                                  }
                                `}
                              >
                                <IconComponent
                                  className={`w-5 h-5 transition-colors duration-300 ${
                                    item.highlight ? "text-white" : "text-gray-600 group-hover:text-mitsumata"
                                  }`}
                                />
                              </div>
                              <div className="flex-1">
                                <span
                                  className={`block text-lg font-bold tracking-tight leading-none ${
                                    item.highlight ? "text-white" : "text-gray-800 group-hover:text-gray-900"
                                  }`}
                                >
                                  {item.label}
                                </span>
                              </div>
                            </div>
                            {!item.highlight && (
                              <motion.div
                                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-mitsumata/5 to-mitsumata/0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                                initial={false}
                              />
                            )}
                          </Link>
                        </motion.li>
                      )
                    })}
                  </ul>

                  {/* 山荘リンク - エレガントカード */}
                  <div className="mt-12 pt-10 border-t border-gray-300/40">
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                      className="text-xs font-bold text-gray-600 uppercase tracking-[0.2em] mb-5 px-3"
                    >
                      山荘
                    </motion.h3>
                    <ul className="space-y-3.5" role="list">
                      {[
                        { name: "三俣山荘", href: "/lodges/mitsumata", color: "mitsumata", desc: "三俣蓮華岳の稜線" },
                        { name: "水晶小屋", href: "/lodges/suisho", color: "suisho", desc: "水晶岳の絶景" },
                        { name: "湯俣山荘", href: "/lodges/yumata", color: "yumata", desc: "秘湯と自然" },
                      ].map((lodge, index) => (
                        <motion.li
                          key={lodge.href}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.6 + index * 0.1,
                            type: "spring",
                            stiffness: 240,
                            damping: 22,
                          }}
                        >
                          <Link
                            href={lodge.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="group block relative p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200/70 hover:border-gray-300/90 hover:bg-white/90 hover:shadow-xl hover:shadow-gray-200/50 hover:scale-[1.02] transition-all duration-400 focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden"
                            style={{
                              "--lodge-color": `var(--${lodge.color}-primary)`,
                            } as React.CSSProperties}
                          >
                            {/* 背景グラデーション効果 */}
                            <motion.div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                              style={{
                                background: `linear-gradient(135deg, var(--${lodge.color}-primary, #2d5016)08 0%, var(--${lodge.color}-primary, #2d5016)03 100%)`,
                              }}
                            />

                            <div className="relative z-10 flex items-center gap-4">
                              <div
                                className="w-3 h-3 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300"
                                style={{
                                  backgroundColor: `var(--${lodge.color}-primary)`,
                                  boxShadow: `0 0 12px var(--${lodge.color}-primary)40`,
                                }}
                              />
                              <div className="flex-1">
                                <span className="block text-base font-bold text-gray-800 group-hover:text-gray-900 transition-colors leading-none mb-1">
                                  {lodge.name}
                                </span>
                                <span className="block text-xs text-gray-500 group-hover:text-gray-600 transition-colors font-medium">
                                  {lodge.desc}
                                </span>
                              </div>
                              <motion.div
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={false}
                              >
                                <svg
                                  className="w-5 h-5 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </motion.div>
                            </div>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </nav>

                {/* フッター - 和のエレガンス */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 25 }}
                  className="px-8 sm:px-10 py-8 border-t border-gray-300/40 bg-gradient-to-b from-transparent via-white/20 to-white/40 backdrop-blur-sm"
                >
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700 leading-relaxed font-serif font-medium tracking-wide">
                      北アルプス最奥、黒部源流の三つの山荘
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-mitsumata" />
                        <span className="font-semibold tracking-wider">営業期間</span>
                      </div>
                      <span className="text-gray-500">7月〜11月</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200/50">
                      <p className="text-[10px] text-gray-500 tracking-[0.15em] uppercase font-semibold">
                        Mitsumata Mountain Lodge Group
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
