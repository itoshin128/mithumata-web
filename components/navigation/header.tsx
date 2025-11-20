"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, Calendar, ArrowRight, ChevronDown } from "lucide-react"

// 型定義
type MenuItem = {
  label: string
  href: string
  color?: string
}

type MenuCategory = {
  type: "category"
  label: string
  href?: string
  expandable?: boolean
  children?: MenuItem[]
}

type MenuCTA = {
  type: "cta"
  label: string
  href: string
}

type MenuStructure = (MenuCategory | MenuCTA)[]

// メニュー構造の定義
const menuStructure: MenuStructure = [
  {
    type: "cta",
    label: "予約する",
    href: "/reservations",
  },
  {
    type: "category",
    label: "山荘について",
    href: "/lodges",
    expandable: true,
    children: [
      { label: "三俣山荘", href: "/lodges/mitsumata", color: "mitsumata" },
      { label: "水晶小屋", href: "/lodges/suisho", color: "suisho" },
      { label: "湯俣山荘", href: "/lodges/yumata", color: "yumata" },
    ],
  },
  {
    type: "category",
    label: "山域を楽しむ",
    children: [
      { label: "伊藤新道", href: "/ito-shindo" },
      { label: "湯俣川ネイチャーフィールド", href: "/yumata-nature-field" },
    ],
  },
  {
    type: "category",
    label: "ご利用案内",
    children: [
      { label: "交通・アクセス", href: "/access" },
      { label: "よくある質問", href: "/faq" },
    ],
  },
  {
    type: "category",
    label: "最新情報",
    children: [
      { label: "お知らせ", href: "/news" },
      { label: "ブログ", href: "/blog" },
    ],
  },
  {
    type: "category",
    label: "その他",
    children: [
      { label: "スタッフ募集", href: "/recruit" },
      { label: "お問い合わせ", href: "/contact" },
    ],
  },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["山荘について"])
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const toggleCategory = (label: string) => {
    setExpandedCategories((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    )
  }

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

            {/* メニューパネル */}
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
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[460px] md:backdrop-blur-2xl z-[70] overflow-hidden"
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
                <div className="flex items-center justify-between px-8 sm:px-10 py-7 border-b border-gray-300/30">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 160, damping: 18 }}
                  >
                    <Link
                      href="/"
                      onClick={() => setIsMenuOpen(false)}
                      className="block group transition-opacity hover:opacity-80"
                    >
                      <span className="block font-serif font-bold text-xl text-gray-900 tracking-tight">
                        三俣山荘グループ
                      </span>
                      <span className="block text-[10px] text-gray-500 mt-1 tracking-[0.15em] uppercase">
                        Kita Alps
                      </span>
                    </Link>
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

                {/* ナビゲーション */}
                <nav className="flex-1 overflow-y-auto px-8 sm:px-10 py-8" aria-label="メインナビゲーション">
                  <ul className="space-y-1">
                    {menuStructure.map((item, index) => {
                      if (item.type === "cta") {
                        // 予約CTAボタン
                        return (
                          <motion.li
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.05, type: "spring", stiffness: 200, damping: 20 }}
                            className="mb-6"
                          >
                            <Link
                              href={item.href!}
                              onClick={() => setIsMenuOpen(false)}
                              className="group block relative overflow-hidden rounded-xl bg-gradient-to-br from-mitsumata to-mitsumata/90 p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
                            >
                              <div className="relative z-10 flex items-center justify-between">
                                <div>
                                  <span className="block text-white/90 text-[10px] font-semibold tracking-wider uppercase mb-1.5">
                                    Reservation
                                  </span>
                                  <span className="block text-white text-2xl font-bold font-serif">予約する</span>
                                </div>
                                <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                              </div>
                              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          </motion.li>
                        )
                      }

                      if (item.type === "category") {
                        const isExpanded = expandedCategories.includes(item.label)
                        const hasChildren = item.children && item.children.length > 0

                        return (
                          <motion.li
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.05, type: "spring", stiffness: 200, damping: 20 }}
                            className="border-b border-gray-200/40 last:border-0"
                          >
                            {/* カテゴリヘッダー */}
                            <div className="py-4">
                              {item.expandable && hasChildren ? (
                                <button
                                  onClick={() => toggleCategory(item.label)}
                                  className="group w-full flex items-center justify-between text-left transition-colors duration-200"
                                >
                                  <span className="text-base font-serif font-semibold text-gray-900 group-hover:text-mitsumata transition-colors">
                                    {item.label}
                                  </span>
                                  <motion.div
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                  >
                                    <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-mitsumata transition-colors" />
                                  </motion.div>
                                </button>
                              ) : item.href ? (
                                <Link
                                  href={item.href}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="group flex items-center justify-between"
                                >
                                  <span className="text-base font-serif font-semibold text-gray-900 group-hover:text-mitsumata transition-colors">
                                    {item.label}
                                  </span>
                                  <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </Link>
                              ) : (
                                <span className="text-base font-serif font-semibold text-gray-900">{item.label}</span>
                              )}

                              {/* 子要素 */}
                              {hasChildren && (
                                <AnimatePresence initial={false}>
                                  {(!item.expandable || isExpanded) && (
                                    <motion.ul
                                      initial={item.expandable ? { height: 0, opacity: 0 } : false}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                      className="mt-3 space-y-1 overflow-hidden"
                                    >
                                      {item.children!.map((child, childIndex) => (
                                        <motion.li
                                          key={child.href}
                                          initial={item.expandable ? { opacity: 0, x: -10 } : false}
                                          animate={{ opacity: 1, x: 0 }}
                                          exit={{ opacity: 0, x: -10 }}
                                          transition={{
                                            delay: item.expandable ? childIndex * 0.05 : 0,
                                            duration: 0.2,
                                          }}
                                          className="relative pl-4"
                                        >
                                          {/* 階層を示す縦線 */}
                                          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gray-300 via-gray-200 to-transparent" />

                                          <Link
                                            href={child.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="group flex items-center gap-2.5 py-2.5 transition-all duration-200"
                                          >
                                            {/* 階層を示す横線とドット */}
                                            <div className="flex items-center gap-2">
                                              <div className="w-3 h-px bg-gray-300" />
                                              <div
                                                className="w-1.5 h-1.5 rounded-full transition-all duration-200 group-hover:scale-150"
                                                style={{
                                                  backgroundColor: child.color
                                                    ? `var(--${child.color}-primary)`
                                                    : "#9ca3af",
                                                }}
                                              />
                                            </div>
                                            <span className="text-sm font-serif text-gray-700 group-hover:text-gray-900 group-hover:translate-x-1 transition-all duration-200">
                                              {child.label}
                                            </span>
                                          </Link>
                                        </motion.li>
                                      ))}
                                    </motion.ul>
                                  )}
                                </AnimatePresence>
                              )}
                            </div>
                          </motion.li>
                        )
                      }

                      return null
                    })}
                  </ul>
                </nav>

                {/* フッター */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 180, damping: 20 }}
                  className="px-8 sm:px-10 py-6 border-t border-gray-300/30 bg-stone-50/50"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-600 font-serif leading-relaxed">
                        北アルプス最奥、黒部源流の三つの山荘
                      </p>
                      <p className="text-[10px] text-gray-500 tracking-wider mt-1">営業期間: 7月〜11月</p>
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
