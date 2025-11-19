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
          {/* エレガント サークル ボタン（モバイルパフォーマンス最適化：backdrop-blur削除） */}
          <motion.div
            className="relative overflow-hidden rounded-full md:backdrop-blur-md"
            animate={{
              width: isHovered ? 64 : 60,
              height: isHovered ? 64 : 60,
              backgroundColor: isHovered ? "rgba(255, 254, 248, 0.95)" : "rgba(255, 254, 248, 0.92)",
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
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full mr-3.5 px-3 py-1.5 rounded-full bg-white/95 md:backdrop-blur-md text-gray-900 text-[9px] font-semibold tracking-[0.15em] whitespace-nowrap"
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
            {/* オーバーレイ - シンプルで洗練 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-0 md:backdrop-blur-lg z-[60]"
              style={{
                background: "rgba(0, 0, 0, 0.5)",
              }}
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            {/* メニューパネル - ミニマルエレガンス */}
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
                damping: 28,
                stiffness: 220,
                opacity: { duration: 0.25 },
              }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] md:backdrop-blur-2xl z-[70] overflow-hidden"
              style={{
                backgroundColor: "rgba(255, 254, 248, 0.98)",
                boxShadow: "-16px 0 48px rgba(0, 0, 0, 0.12)",
              }}
            >
              {/* 繊細なテクスチャ */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 50%),
                    radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)
                  `,
                }}
              />

              <div className="relative flex flex-col h-full">
                {/* ヘッダー - ミニマル */}
                <div className="flex items-center justify-between px-10 sm:px-12 py-8 border-b border-gray-300/30">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 160, damping: 18 }}
                  >
                    <span className="block font-serif font-bold text-xl text-gray-900 tracking-tight">
                      三俣山荘グループ
                    </span>
                    <span className="block text-[10px] text-gray-500 mt-1 tracking-[0.15em] uppercase">
                      Kita Alps
                    </span>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 160, damping: 18 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="w-10 h-10 rounded-full hover:bg-gray-200/60 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-mitsumata/20"
                    aria-label="メニューを閉じる"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </motion.button>
                </div>

                {/* ナビゲーション - ミニマルエレガンス */}
                <nav className="flex-1 overflow-y-auto px-10 sm:px-12 py-12" aria-label="メインナビゲーション">
                  <ul className="space-y-2" role="list">
                    {navigationItems.map((item, index) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.2 + index * 0.06,
                          type: "spring",
                          stiffness: 220,
                          damping: 22,
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`
                            group block relative py-6 px-0 transition-all duration-300
                            focus:outline-none focus:ring-0
                            ${item.highlight ? "" : "border-b border-gray-200/40"}
                          `}
                        >
                          <div className="relative">
                            <span
                              className={`
                                block font-serif text-2xl tracking-tight leading-none transition-all duration-300
                                ${
                                  item.highlight
                                    ? "text-mitsumata font-bold group-hover:tracking-wide"
                                    : "text-gray-800 font-medium group-hover:text-mitsumata group-hover:translate-x-2"
                                }
                              `}
                            >
                              {item.label}
                            </span>

                            {/* 下線アニメーション */}
                            {!item.highlight && (
                              <motion.div
                                className="absolute -bottom-[1px] left-0 h-[2px] bg-mitsumata"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                              />
                            )}

                            {/* ハイライト項目の装飾 */}
                            {item.highlight && (
                              <motion.div
                                className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-mitsumata opacity-0 group-hover:opacity-100"
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}
                          </div>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>

                  {/* 山荘リンク - ミニマル */}
                  <div className="mt-16 pt-12 border-t border-gray-300/30">
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-xs font-bold text-gray-500 uppercase tracking-[0.25em] mb-8"
                    >
                      山荘
                    </motion.h3>
                    <ul className="space-y-4" role="list">
                      {[
                        { name: "三俣山荘", href: "/mitsumata", color: "mitsumata" },
                        { name: "水晶小屋", href: "/lodges/suisho", color: "suisho" },
                        { name: "湯俣山荘", href: "/lodges/yumata", color: "yumata" },
                      ].map((lodge, index) => (
                        <motion.li
                          key={lodge.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.55 + index * 0.08,
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                          }}
                        >
                          <Link
                            href={lodge.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="group block relative py-3 transition-all duration-300 focus:outline-none"
                          >
                            <div className="flex items-center gap-3">
                              <motion.div
                                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                                style={{
                                  backgroundColor: `var(--${lodge.color}-primary)`,
                                }}
                                whileHover={{ scale: 1.5 }}
                              />
                              <span className="text-base font-serif font-medium text-gray-700 group-hover:text-gray-900 transition-all duration-300 group-hover:translate-x-1">
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
                  transition={{ delay: 0.75, type: "spring", stiffness: 180, damping: 20 }}
                  className="px-10 sm:px-12 py-10 border-t border-gray-300/30"
                >
                  <div className="space-y-3">
                    <p className="text-xs text-gray-600 leading-relaxed font-serif tracking-wide">
                      北アルプス最奥、黒部源流の三つの山荘
                    </p>
                    <p className="text-[10px] text-gray-500 tracking-wider">
                      営業期間: 7月〜11月
                    </p>
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
