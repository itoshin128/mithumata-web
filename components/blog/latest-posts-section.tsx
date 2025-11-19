"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import type React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FadeInSection } from "@/components/animations/fade-in-section"
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react"

const latestPosts = [
  {
    title: "ダミーテキストダミーテキスト",
    excerpt: "ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト。",
    category: "カテゴリー",
    categoryColor: "#2d5016",
    date: "2024.11.01",
    author: "著者名",
    imageUrl: "/placeholder.svg?height=600&width=800",
    href: "/blog/dummy-1",
  },
  {
    title: "ダミーテキストダミーテキスト",
    excerpt: "ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト。",
    category: "カテゴリー",
    categoryColor: "#5ba4cf",
    date: "2024.08.15",
    author: "著者名",
    imageUrl: "/placeholder.svg?height=600&width=800",
    href: "/blog/dummy-2",
  },
  {
    title: "ダミーテキストダミーテキスト",
    excerpt: "ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト。",
    category: "カテゴリー",
    categoryColor: "#b8604a",
    date: "2024.07.20",
    author: "著者名",
    imageUrl: "/placeholder.svg?height=600&width=800",
    href: "/blog/dummy-3",
  },
]

interface BlogCardProps {
  post: typeof latestPosts[0]
  delay?: number
  compact?: boolean
}

function CompactBlogCard({ post, index, total }: { post: typeof latestPosts[0]; index: number; total: number }) {
  return (
    <Link
      href={post.href}
      className="block h-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcf6e3] rounded-2xl transition-all"
      style={{
        // @ts-ignore
        '--focus-color': post.categoryColor,
      } as React.CSSProperties}
      aria-label={`${post.title} - ${post.category} - ${post.date}`}
    >
      <motion.article
        whileTap={{ scale: 0.98 }}
        className="relative bg-white rounded-2xl overflow-hidden shadow-lg active:shadow-xl transition-shadow duration-300 h-[360px] flex flex-col focus-ring-wafuu"
        role="article"
        aria-posinset={index + 1}
        aria-setsize={total}
      >
        {/* 画像セクション */}
        <div className="relative h-[200px] overflow-hidden flex-shrink-0">
          <Image
            src={post.imageUrl || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
          />
          {/* グラデーションオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {/* カテゴリバッジ */}
          <div className="absolute top-4 left-4">
            <span
              className="inline-block px-3 py-1.5 text-xs font-serif tracking-wider backdrop-blur-md"
              style={{
                backgroundColor: `${post.categoryColor}ee`,
                color: "white",
              }}
              role="text"
              aria-label={`カテゴリ: ${post.category}`}
            >
              {post.category}
            </span>
          </div>
        </div>

        {/* コンテンツセクション */}
        <div className="flex-1 p-5 flex flex-col">
          {/* タイトル */}
          <h3 className="text-lg md:text-xl font-serif font-light text-gray-900 line-clamp-2 mb-3 leading-snug tracking-[0.04em]">
            {post.title}
          </h3>

          {/* 抜粋 */}
          <p className="text-sm text-gray-700 font-serif font-light line-clamp-2 mb-3 leading-relaxed flex-1 tracking-[0.04em]">
            {post.excerpt}
          </p>

          {/* メタ情報 */}
          <div className="flex items-center gap-3 text-xs text-gray-500 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" aria-hidden="true" />
              <time className="font-serif font-light tracking-wider" dateTime={post.date}>{post.date}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3 h-3" aria-hidden="true" />
              <span className="font-serif font-light tracking-wider">{post.author}</span>
            </div>
          </div>
        </div>

        {/* 読むインジケーター */}
        <div className="absolute bottom-5 right-5" aria-hidden="true">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
            style={{ backgroundColor: post.categoryColor }}
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </motion.div>
        </div>
      </motion.article>
    </Link>
  )
}

function BlogCard({ post, delay = 0 }: BlogCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x, y })
  }

  return (
    <FadeInSection delay={delay}>
      <Link
        href={post.href}
        className="block h-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcf6e3] rounded-lg transition-all"
        style={{
          // @ts-ignore
          '--focus-color': post.categoryColor,
        } as React.CSSProperties}
        aria-label={`${post.title} - ${post.category} - ${post.date}`}
      >
        <article className="group h-full flex flex-col" role="article">
          {/* Image with 3D Effect */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            style={{
              rotateY: isHovering ? mousePosition.x * 3 : 0,
              rotateX: isHovering ? -mousePosition.y * 3 : 0,
            }}
            className="mb-6 md:mb-8"
          >
            <div className="relative aspect-[4/3] overflow-hidden shadow-lg">
              <Image
                src={post.imageUrl || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Category Badge */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6">
                <span
                  className="inline-block px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-serif tracking-wider bg-white/95 backdrop-blur-sm shadow-md"
                  style={{ color: post.categoryColor }}
                  role="text"
                  aria-label={`カテゴリ: ${post.category}`}
                >
                  {post.category}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 flex flex-col space-y-3 md:space-y-4">
            {/* Title */}
            <h3 className="text-xl md:text-2xl font-serif font-light tracking-[0.04em] leading-[1.6] text-gray-900 text-balance">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="flex-1 text-sm md:text-base lg:text-lg text-gray-700 leading-[1.8] tracking-[0.04em] font-serif font-light text-pretty line-clamp-3">
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-xs md:text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" />
                <time className="font-serif font-light tracking-wider" dateTime={post.date}>{post.date}</time>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" />
                <span className="font-serif font-light tracking-wider">{post.author}</span>
              </div>
            </div>

            {/* Read More Link */}
            <div className="pt-2">
              <motion.span
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-2 text-sm md:text-base font-serif font-light tracking-[0.1em] text-gray-900 transition-colors duration-300"
                aria-hidden="true"
              >
                続きを読む
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </div>
          </div>
        </article>
      </Link>
    </FadeInSection>
  )
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center my-16 md:my-20 lg:my-24">
      <div className="flex items-center gap-4">
        <div className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-gray-300"></div>
        <div className="flex gap-2">
          <div className="w-2 h-2 rotate-45 bg-gray-400 opacity-40"></div>
          <div className="w-2 h-2 rotate-45 bg-gray-400 opacity-60"></div>
          <div className="w-2 h-2 rotate-45 bg-gray-400 opacity-80"></div>
        </div>
        <div className="w-12 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-gray-300"></div>
      </div>
    </div>
  )
}

export function LatestPostsSection() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // モーション設定の検知
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // スクロール位置の監視
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft
      const cardWidth = carousel.scrollWidth / latestPosts.length
      const newIndex = Math.round(scrollLeft / cardWidth)
      setCurrentIndex(newIndex)
    }

    carousel.addEventListener('scroll', handleScroll)
    return () => carousel.removeEventListener('scroll', handleScroll)
  }, [])

  // キーボードナビゲーション
  const scrollToIndex = useCallback((index: number) => {
    const carousel = carouselRef.current
    if (!carousel) return

    const cardWidth = carousel.scrollWidth / latestPosts.length
    carousel.scrollTo({
      left: cardWidth * index,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }, [prefersReducedMotion])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      const newIndex = Math.max(0, currentIndex - 1)
      scrollToIndex(newIndex)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      const newIndex = Math.min(latestPosts.length - 1, currentIndex + 1)
      scrollToIndex(newIndex)
    } else if (e.key === 'Home') {
      e.preventDefault()
      scrollToIndex(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      scrollToIndex(latestPosts.length - 1)
    }
  }, [currentIndex, scrollToIndex])

  return (
    <section
      className="relative py-16 md:py-32 lg:py-40"
      aria-labelledby="news-section-heading"
      id="news-section"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        {/* Section Header - Centered */}
        <FadeInSection delay={0.1}>
          <div className="text-center mb-16 md:mb-20 lg:mb-24 max-w-3xl mx-auto">
            <h2
              id="news-section-heading"
              className="text-2xl md:text-3xl lg:text-4xl font-serif font-light mb-6 md:mb-8 tracking-[0.08em] leading-[1.6] text-balance"
            >
              お知らせ
            </h2>
            <p className="text-base md:text-lg text-gray-700 leading-[1.8] tracking-[0.04em] font-serif font-light text-pretty">
              山小屋の今を伝える、コラムとお知らせ。
              <br className="hidden md:block" />
              道直し活動、高山植物、山の楽しみ方など、様々な情報を発信しています。
            </p>
          </div>
        </FadeInSection>

        {/* モバイル: 横スクロールカルーセル */}
        <div className="lg:hidden mb-12">
          <div className="relative -mx-6 px-6">
            {/* スクリーンリーダー用の説明 */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              お知らせ一覧。現在 {currentIndex + 1} / {latestPosts.length} 件目を表示中。矢印キーで前後に移動できます。
            </div>

            {/* カルーセルコンテナ */}
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mitsumata/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcf6e3] rounded-2xl"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
              role="region"
              aria-label="お知らせ記事カルーセル"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              {latestPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={prefersReducedMotion ? {} : { delay: index * 0.1 }}
                  className="flex-none w-[85vw] sm:w-[70vw] snap-start"
                >
                  <CompactBlogCard post={post} index={index} total={latestPosts.length} />
                </motion.div>
              ))}
            </div>

            {/* スクロールヒント（初回のみ表示・モーション配慮） */}
            {!prefersReducedMotion && (
              <motion.div
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 0, x: 10 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-l from-white/90 to-transparent flex items-center justify-end pr-2">
                  <ArrowRight className="w-5 h-5 text-gray-400 animate-pulse" />
                </div>
              </motion.div>
            )}
          </div>

          {/* ページインジケーター */}
          <nav aria-label="カルーセルページネーション" className="flex justify-center gap-2 mt-8">
            {latestPosts.map((post, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className="h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcf6e3]"
                style={{
                  backgroundColor: index === currentIndex ? post.categoryColor : '#d1d5db',
                  width: index === currentIndex ? "28px" : "8px",
                  // @ts-ignore
                  '--focus-color': post.categoryColor,
                } as React.CSSProperties}
                aria-label={`${index + 1}件目の記事へ移動`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </nav>
        </div>

        {/* デスクトップ: 従来の3カラムグリッド */}
        <div className="hidden lg:grid grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-12 md:mb-16">
          {latestPosts.map((post, index) => (
            <BlogCard key={index} post={post} delay={0.2 + index * 0.1} />
          ))}
        </div>

        <SectionDivider />

        {/* View All Button */}
        <FadeInSection delay={0.5}>
          <div className="flex justify-center mt-12 md:mt-16">
            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgb(17, 24, 39)" }}
                whileTap={{ scale: 0.95 }}
                className="
                  group
                  inline-flex items-center gap-3
                  px-12 py-6 md:px-10 md:py-5
                  border-2 md:border border-gray-900
                  rounded-full
                  text-gray-900
                  font-light
                  tracking-[0.2em]
                  transition-all duration-500
                  hover:text-white
                  hover:shadow-xl
                  min-w-[240px] md:min-w-0
                  justify-center
                "
              >
                <BookOpen className="w-5 h-5 md:w-4 md:h-4" />
                <span className="text-sm md:text-base">すべての記事を見る</span>
                <ArrowRight className="w-5 h-5 md:w-4 md:h-4 group-hover:translate-x-2 transition-transform duration-500" />
              </motion.button>
            </Link>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
