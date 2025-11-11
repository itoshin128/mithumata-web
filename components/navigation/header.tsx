"use client"

import { useState, useEffect } from "react"
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
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // ヒーローセクション内ではヘッダーを表示
      if (currentScrollY < 100) {
        setIsVisible(true)
      } else {
        setIsVisible(currentScrollY < lastScrollY)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* ヘッダー: ロゴとハンバーガーメニューのみ */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -100,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="container mx-auto px-8 py-8 max-w-7xl">
          <div className="flex items-center justify-end">
            {/* ハンバーガーメニューボタン - よりクリエイティブなデザイン */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group pointer-events-auto relative"
              aria-label="メニューを開く"
            >
              {/* 背景円 */}
              <div className="w-16 h-16 rounded-full bg-white/95 backdrop-blur-md shadow-2xl group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                {/* ハンバーガーアイコン（3本線） */}
                <div className="flex flex-col gap-1.5">
                  <motion.span
                    className="w-6 h-0.5 bg-gray-900 rounded-full"
                    whileHover={{ width: 28 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="w-6 h-0.5 bg-gray-900 rounded-full"
                    whileHover={{ width: 20 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                  />
                  <motion.span
                    className="w-6 h-0.5 bg-gray-900 rounded-full"
                    whileHover={{ width: 24 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  />
                </div>
              </div>

              {/* ホバー時のMENUテキスト */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-white drop-shadow-lg tracking-widest"
              >
                MENU
              </motion.span>
            </button>
          </div>
        </div>
      </motion.header>

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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* メニューパネル */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white z-[70] shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* メニューヘッダー */}
                <div className="flex items-center justify-between p-8 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-mitsumata to-mitsumata-dark flex items-center justify-center shadow-lg">
                      <Mountain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="block font-serif font-bold text-xl text-gray-900">三俣山荘グループ</span>
                      <span className="block text-xs text-gray-500 mt-0.5">北アルプス黒部源流</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-12 h-12 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all duration-200 hover:rotate-90"
                    aria-label="メニューを閉じる"
                  >
                    <X className="w-6 h-6 text-gray-900" />
                  </button>
                </div>

                {/* ナビゲーション */}
                <nav className="flex-1 overflow-y-auto p-6">
                  <ul className="space-y-2">
                    {navigationItems.map((item, index) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`
                            block py-4 px-6 text-lg font-medium rounded-lg transition-colors
                            ${
                              item.highlight
                                ? "bg-mitsumata text-white hover:bg-mitsumata-dark"
                                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            }
                          `}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>

                  {/* 山荘リンク */}
                  <div className="mt-12 pt-8 border-t">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 px-6">山荘</h3>
                    <ul className="space-y-2">
                      {[
                        { name: "三俣山荘", href: "/lodges/mitsumata", color: "mitsumata" },
                        { name: "水晶小屋", href: "/lodges/suisho", color: "suisho" },
                        { name: "湯俣山荘", href: "/lodges/yumata", color: "yumata" },
                      ].map((lodge, index) => (
                        <motion.li
                          key={lodge.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (navigationItems.length + index) * 0.1 }}
                        >
                          <Link
                            href={lodge.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-3 px-6 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            {lodge.name}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </nav>

                {/* フッター情報 */}
                <div className="p-6 border-t bg-gray-50">
                  <p className="text-sm text-gray-600 leading-relaxed">北アルプス最奥、黒部源流の三つの山荘</p>
                  <p className="text-xs text-gray-500 mt-2">営業期間: 7月〜11月</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
