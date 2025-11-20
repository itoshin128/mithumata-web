"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, Calendar, ArrowRight } from "lucide-react"

// カテゴリ別にメニューを整理
const menuCategories = {
  lodges: [
    { name: "三俣山荘", href: "/lodges/mitsumata", color: "mitsumata" },
    { name: "水晶小屋", href: "/lodges/suisho", color: "suisho" },
    { name: "湯俣山荘", href: "/lodges/yumata", color: "yumata" },
  ],
  usage: [
    { label: "交通・アクセス", href: "/access" },
    { label: "よくある質問", href: "/faq" },
    { label: "山荘について", href: "/lodges" },
  ],
  information: [
    { label: "お知らせ", href: "/news" },
    { label: "ブログ", href: "/blog" },
  ],
  experience: [
    { label: "伊藤新道", href: "/ito-shindo" },
    { label: "湯俣川ネイチャーフィールド", href: "/yumata-nature-field" },
  ],
  other: [
    { label: "スタッフ募集", href: "/recruit" },
    { label: "お問い合わせ", href: "/contact" },
  ],
}

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
      {/* ハンバーガーボタン */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 150, damping: 20 }}
        className="fixed z-50 pointer-events-none"
        style={{
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
            <motion.div
              className="absolute -inset-[2px] rounded-full pointer-events-none"
              animate={{ opacity: isHovered ? 0.4 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ border: "1px solid rgba(255, 255, 255, 0.3)" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-white/15 via-white/5 to-transparent pointer-events-none"
              animate={{ opacity: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative w-full h-full flex items-center justify-center">
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
                    style={{ boxShadow: "0 0.5px 1.5px rgba(0, 0, 0, 0.25)" }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

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
            {/* オーバーレイ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-0 md:backdrop-blur-lg z-[60]"
              style={{ background: "rgba(0, 0, 0, 0.5)" }}
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            {/* メニューパネル - レスポンシブ幅 */}
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
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[500px] md:w-[600px] lg:w-[700px] md:backdrop-blur-2xl z-[70] overflow-hidden"
              style={{
                backgroundColor: "rgba(255, 254, 248, 0.98)",
                boxShadow: "-16px 0 48px rgba(0, 0, 0, 0.12)",
              }}
            >
              {/* 背景テクスチャ */}
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
                {/* ヘッダー */}
                <div className="flex items-center justify-between px-8 md:px-10 lg:px-12 py-8 border-b border-gray-300/30">
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

                {/* ナビゲーション - スクロール可能 */}
                <nav className="flex-1 overflow-y-auto px-8 md:px-10 lg:px-12 py-8" aria-label="メインナビゲーション">
                  {/* 予約ボタン - 最上部に配置 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                    className="mb-8"
                  >
                    <Link
                      href="/reservations"
                      onClick={() => setIsMenuOpen(false)}
                      className="group block relative overflow-hidden rounded-xl bg-gradient-to-br from-mitsumata to-mitsumata/90 p-6 md:p-7 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="relative z-10">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="block text-white/90 text-xs font-semibold tracking-wider uppercase mb-2">
                              Reservation
                            </span>
                            <span className="block text-white text-2xl md:text-3xl font-bold font-serif">
                              予約する
                            </span>
                          </div>
                          <ArrowRight className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>

                  {/* 山荘セクション - 最優先 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, type: "spring", stiffness: 200, damping: 20 }}
                    className="mb-8"
                  >
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.25em] mb-4">
                      山荘
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {menuCategories.lodges.map((lodge, index) => (
                        <motion.div
                          key={lodge.href}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                        >
                          <Link
                            href={lodge.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="group block p-4 rounded-lg bg-white/60 hover:bg-white border border-gray-200/50 hover:border-gray-300 transition-all duration-300 hover:shadow-md"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div
                                className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
                                style={{ backgroundColor: `var(--${lodge.color}-primary)` }}
                              />
                              <span className="text-sm font-serif font-semibold text-gray-900">
                                {lodge.name}
                              </span>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* 2カラムグリッド - デスクトップ最適化 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    {/* ご利用案内 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.25em] mb-4 pb-2 border-b border-gray-200">
                        ご利用案内
                      </h3>
                      <ul className="space-y-2">
                        {menuCategories.usage.map((item, index) => (
                          <motion.li
                            key={item.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.05 }}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="group flex items-center gap-2 py-2 text-gray-700 hover:text-mitsumata transition-colors"
                            >
                              <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-mitsumata group-hover:scale-150 transition-all" />
                              <span className="text-sm font-serif font-medium">{item.label}</span>
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* 情報・コンテンツ */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.25em] mb-4 pb-2 border-b border-gray-200">
                        情報
                      </h3>
                      <ul className="space-y-2">
                        {menuCategories.information.map((item, index) => (
                          <motion.li
                            key={item.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.45 + index * 0.05 }}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="group flex items-center gap-2 py-2 text-gray-700 hover:text-mitsumata transition-colors"
                            >
                              <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-mitsumata group-hover:scale-150 transition-all" />
                              <span className="text-sm font-serif font-medium">{item.label}</span>
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* 山域を楽しむ */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                    >
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.25em] mb-4 pb-2 border-b border-gray-200">
                        山域を楽しむ
                      </h3>
                      <ul className="space-y-2">
                        {menuCategories.experience.map((item, index) => (
                          <motion.li
                            key={item.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.05 }}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="group flex items-center gap-2 py-2 text-gray-700 hover:text-mitsumata transition-colors"
                            >
                              <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-mitsumata group-hover:scale-150 transition-all" />
                              <span className="text-sm font-serif font-medium">{item.label}</span>
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* その他 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.25em] mb-4 pb-2 border-b border-gray-200">
                        その他
                      </h3>
                      <ul className="space-y-2">
                        {menuCategories.other.map((item, index) => (
                          <motion.li
                            key={item.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.55 + index * 0.05 }}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="group flex items-center gap-2 py-2 text-gray-700 hover:text-mitsumata transition-colors"
                            >
                              <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-mitsumata group-hover:scale-150 transition-all" />
                              <span className="text-sm font-serif font-medium">{item.label}</span>
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </nav>

                {/* フッター */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 180, damping: 20 }}
                  className="px-8 md:px-10 lg:px-12 py-6 border-t border-gray-300/30 bg-stone-50/50"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-600 font-serif">
                        北アルプス最奥、黒部源流の三つの山荘
                      </p>
                      <p className="text-[10px] text-gray-500 tracking-wider mt-1">
                        営業期間: 7月〜11月
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
