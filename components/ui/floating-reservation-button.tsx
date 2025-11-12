"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Sparkles } from "lucide-react"

export function FloatingReservationButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // モバイル判定
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleScroll = () => {
      // ヒーローセクションを過ぎたら表示
      setIsVisible(window.scrollY > window.innerHeight * 0.8)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const handleClick = () => {
    if (isMobile) {
      // モバイルでは一度タップで展開、もう一度タップで遷移
      if (!isExpanded) {
        setIsExpanded(true)
        setTimeout(() => setIsExpanded(false), 3000) // 3秒後に自動で閉じる
        return
      }
    }
    window.location.href = "/reservations"
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* デスクトップ版 - 洗練されたグラスモーフィズムデザイン */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.8 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
              }}
              className="fixed bottom-8 right-8 z-40"
            >
              {/* グロー効果のベース */}
              <div className="absolute inset-0 bg-gradient-to-br from-mitsumata-light/30 to-mitsumata-primary/30 blur-2xl rounded-[2rem] scale-110" />

              {/* メインボタン */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="
                  relative group
                  backdrop-blur-xl
                  bg-gradient-to-br from-mitsumata-light/95 to-mitsumata-primary/95
                  hover:from-mitsumata-primary hover:to-mitsumata-dark
                  text-white
                  px-10 py-5
                  rounded-2xl
                  shadow-[0_8px_32px_rgba(45,80,22,0.4)]
                  hover:shadow-[0_12px_48px_rgba(45,80,22,0.6)]
                  flex flex-col items-start gap-1
                  font-bold
                  transition-all duration-500
                  border border-white/20
                  overflow-hidden
                  min-w-[240px]
                "
                onClick={handleClick}
              >
                {/* 背景アニメーション */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "linear",
                  }}
                />

                {/* コンテンツ */}
                <div className="relative z-10 flex items-center gap-3 w-full">
                  <motion.div
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    <Calendar className="w-6 h-6" />
                  </motion.div>
                  <div className="flex-1 text-left">
                    <div className="text-lg font-bold tracking-wide">宿泊予約</div>
                    <div className="text-xs font-normal opacity-90 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>2025年シーズン受付中</span>
                    </div>
                  </div>
                  <motion.span
                    className="text-2xl"
                    animate={{ x: [0, 6, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </div>

                {/* パーティクル効果 */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/60 rounded-full"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${30 + i * 20}%`,
                    }}
                    animate={{
                      y: [-20, 20],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2 + i * 0.5,
                      delay: i * 0.3,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.button>

              {/* ツールチップ（デスクトップ） */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="
                  absolute -top-14 left-1/2 -translate-x-1/2
                  bg-gray-900/95 backdrop-blur-md text-white text-sm
                  px-4 py-2 rounded-xl
                  whitespace-nowrap
                  opacity-0 group-hover:opacity-100
                  transition-all duration-300
                  pointer-events-none
                  border border-white/10
                  shadow-xl
                "
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>空室状況を確認</span>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-gray-900 border-r border-b border-white/10" />
              </motion.div>
            </motion.div>
          )}

          {/* モバイル版 - コンパクトFABデザイン（右下配置） */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 100 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 400,
              }}
              className="fixed bottom-6 right-6 z-40"
            >
              {/* グロー効果 */}
              <div className="absolute inset-0 bg-mitsumata-primary/40 blur-xl rounded-full scale-110" />

              {/* メインFABボタン */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                animate={
                  isExpanded
                    ? { width: "auto", borderRadius: "1.5rem" }
                    : { width: "64px", borderRadius: "9999px" }
                }
                transition={{ duration: 0.3 }}
                className="
                  relative
                  backdrop-blur-xl
                  bg-gradient-to-br from-mitsumata-light/95 to-mitsumata-primary/95
                  text-white
                  h-16
                  shadow-[0_8px_32px_rgba(45,80,22,0.5)]
                  flex items-center justify-center
                  overflow-hidden
                  border-2 border-white/30
                "
                onClick={handleClick}
              >
                {/* 背景パルス */}
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                />

                {/* コンテンツ */}
                <motion.div
                  className="relative z-10 flex items-center gap-3 px-5"
                  initial={false}
                >
                  {/* アイコン */}
                  <motion.div
                    animate={
                      isExpanded
                        ? { rotate: 360, scale: 1 }
                        : { rotate: 0, scale: 1.1 }
                    }
                    transition={{ duration: 0.5 }}
                  >
                    <Calendar className="w-7 h-7" strokeWidth={2.5} />
                  </motion.div>

                  {/* 展開時のテキスト */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-2 whitespace-nowrap"
                      >
                        <span className="font-bold text-base">宿泊予約</span>
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 1,
                            ease: "easeInOut",
                          }}
                        >
                          →
                        </motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* リップル効果（タップ時） */}
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-full"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={
                    isExpanded
                      ? { scale: [0, 2], opacity: [0.6, 0] }
                      : { scale: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.6 }}
                />
              </motion.button>

              {/* バッジ（新着情報など） */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="
                  absolute -top-1 -right-1
                  bg-gradient-to-br from-red-500 to-red-600
                  text-white text-[10px] font-bold
                  w-6 h-6 rounded-full
                  flex items-center justify-center
                  shadow-lg
                  border-2 border-white
                "
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  ●
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  )
}
