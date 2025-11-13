"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect, useCallback } from "react"
import { FadeInSection } from "@/components/animations/fade-in-section"
import { EnhancedBlogCard } from "@/components/blog/enhanced-blog-card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Utensils,
  Home,
  MapPin,
  Mail,
  Newspaper,
  HelpCircle,
  Sparkles,
} from "lucide-react"

const latestPosts = [
  {
    title: "ダミーテキストダミーテキスト",
    excerpt: "ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト。",
    category: "カテゴリー",
    categoryColor: "#2d5016",
    date: "2024.11.01",
    author: "著者名",
    imageUrl: "/placeholder.svg?height=300&width=400",
    href: "/blog/dummy-1",
  },
  {
    title: "ダミーテキストダミーテキスト",
    excerpt: "ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト。",
    category: "カテゴリー",
    categoryColor: "#5ba4cf",
    date: "2024.08.15",
    author: "著者名",
    imageUrl: "/placeholder.svg?height=300&width=400",
    href: "/blog/dummy-2",
  },
  {
    title: "ダミーテキストダミーテキスト",
    excerpt: "ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト。",
    category: "カテゴリー",
    categoryColor: "#b8604a",
    date: "2024.07.20",
    author: "著者名",
    imageUrl: "/placeholder.svg?height=300&width=400",
    href: "/blog/dummy-3",
  },
]

const faqData = [
  {
    category: "予約・キャンセル",
    icon: Calendar,
    color: "#2d5016",
    questions: [
      {
        q: "予約はいつから可能ですか?",
        a: "一般予約は3月1日から開始します。団体予約(10名以上)は1月から受付を開始しています。",
      },
      {
        q: "キャンセル料はかかりますか?",
        a: "前日キャンセルは50%、当日キャンセルは100%のキャンセル料が発生します。天候不良による中止の場合はキャンセル料はかかりません。",
      },
    ],
  },
  {
    category: "食事・喫茶",
    icon: Utensils,
    color: "#b8604a",
    questions: [
      {
        q: "ジビエシチューは予約が必要ですか?",
        a: "三俣山荘のジビエシチューは予約不要です。営業時間内であればいつでもお召し上がりいただけます。",
      },
      {
        q: "テント泊でも食事は利用できますか?",
        a: "はい、テント泊の方も食堂をご利用いただけます。夕食・朝食ともに事前予約をおすすめします。",
      },
    ],
  },
  {
    category: "設備・トイレ",
    icon: Home,
    color: "#5ba4cf",
    questions: [
      {
        q: "水は購入できますか?",
        a: "はい、各山荘で飲料水を販売しています。また、水場も利用可能です(無料)。",
      },
      {
        q: "トイレは水洗ですか?",
        a: "環境に配慮したバイオトイレを導入しています。清潔で快適にご利用いただけます。",
      },
    ],
  },
  {
    category: "アクセス・装備",
    icon: MapPin,
    color: "#f9a825",
    questions: [
      {
        q: "初心者でも行けますか?",
        a: "三俣山荘へは裏銀座縦走路を通るため、中級者以上の体力と経験が必要です。湯俣山荘は比較的アクセスしやすい立地です。",
      },
      {
        q: "必要な装備を教えてください",
        a: "登山靴、雨具、防寒着、ヘッドランプ、地図・コンパスは必須です。詳しくは装備リストをご確認ください。",
      },
    ],
  },
]

type TabType = "notices" | "faq"

export function InformationHub() {
  const [activeTab, setActiveTab] = useState<TabType>("notices")
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

  // タブ切り替えのキーボード対応
  const handleTabKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      setActiveTab(activeTab === "notices" ? "faq" : "notices")
    }
  }

  return (
    <section className="relative z-20 py-20 lg:py-32" aria-labelledby="info-hub-heading">
      <div className="container mx-auto px-4 max-w-[1600px]">
        {/* Mobile Tab Interface */}
        <div className="lg:hidden mb-12">
          <FadeInSection className="text-center mb-8">
            <h2 id="info-hub-heading" className="font-serif text-3xl font-bold mb-4 text-gray-900">インフォメーション</h2>
            <p className="text-base text-gray-700 leading-relaxed">山小屋の最新情報とよくあるご質問</p>
          </FadeInSection>

          {/* Tab Switcher */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            className="flex gap-3 p-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg mb-8 max-w-md mx-auto"
            role="tablist"
            aria-label="インフォメーションタブ"
            onKeyDown={handleTabKeyDown}
          >
            <button
              onClick={() => setActiveTab("notices")}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2d5016]/30 focus-visible:ring-offset-2 ${
                activeTab === "notices"
                  ? "bg-gradient-to-br from-[#2d5016] to-[#5ba4cf] text-white shadow-lg scale-105"
                  : "bg-transparent text-gray-600 hover:bg-gray-100"
              }`}
              role="tab"
              aria-selected={activeTab === "notices"}
              aria-controls="notices-panel"
              id="notices-tab"
              tabIndex={activeTab === "notices" ? 0 : -1}
            >
              <Newspaper className="w-5 h-5" aria-hidden="true" />
              <span className="text-sm">お知らせ</span>
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b8604a]/30 focus-visible:ring-offset-2 ${
                activeTab === "faq"
                  ? "bg-gradient-to-br from-[#b8604a] to-[#f9a825] text-white shadow-lg scale-105"
                  : "bg-transparent text-gray-600 hover:bg-gray-100"
              }`}
              role="tab"
              aria-selected={activeTab === "faq"}
              aria-controls="faq-panel"
              id="faq-tab"
              tabIndex={activeTab === "faq" ? 0 : -1}
            >
              <HelpCircle className="w-5 h-5" aria-hidden="true" />
              <span className="text-sm">FAQ</span>
            </button>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "notices" ? (
              <motion.div
                key="notices"
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                transition={prefersReducedMotion ? {} : { duration: 0.3 }}
                role="tabpanel"
                id="notices-panel"
                aria-labelledby="notices-tab"
              >
                <NoticesContent prefersReducedMotion={prefersReducedMotion} />
              </motion.div>
            ) : (
              <motion.div
                key="faq"
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                transition={prefersReducedMotion ? {} : { duration: 0.3 }}
                role="tabpanel"
                id="faq-panel"
                aria-labelledby="faq-tab"
              >
                <FAQContent />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Split Screen Layout */}
        <div className="hidden lg:block">
          {/* Section Header */}
          <FadeInSection className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#2d5016]/10 via-[#5ba4cf]/10 to-[#b8604a]/10 rounded-full mb-6"
            >
              <Sparkles className="w-5 h-5 text-[#2d5016]" />
              <span className="font-bold text-gray-900 tracking-wider">INFORMATION HUB</span>
              <Sparkles className="w-5 h-5 text-[#b8604a]" />
            </motion.div>
            <h2 className="font-serif text-4xl xl:text-5xl font-bold mb-6 text-gray-900 tracking-wide">
              インフォメーション
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              山小屋の最新情報とよくあるご質問を一つの場所でご覧いただけます
            </p>
          </FadeInSection>

          {/* Split Screen Container */}
          <div className="grid lg:grid-cols-[45%_55%] xl:grid-cols-[40%_60%] gap-8 xl:gap-12">
            {/* Left Panel - FAQ with Glass Morphism */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-8 lg:self-start"
            >
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 xl:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#b8604a] to-[#f9a825] flex items-center justify-center shadow-lg">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl xl:text-3xl font-bold text-gray-900">よくあるご質問</h3>
                    <p className="text-sm text-gray-600">FAQ</p>
                  </div>
                </div>

                <FAQContent />
              </div>
            </motion.div>

            {/* Right Panel - Notices with Masonry Layout */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2d5016] to-[#5ba4cf] flex items-center justify-center shadow-lg">
                  <Newspaper className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl xl:text-3xl font-bold text-gray-900">お知らせ</h3>
                  <p className="text-sm text-gray-600">Latest Updates</p>
                </div>
              </div>

              <NoticesContent />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function NoticesContent({ prefersReducedMotion = false }: { prefersReducedMotion?: boolean }) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

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
    <>
      {/* モバイル: 横スクロールカルーセル */}
      <div className="lg:hidden">
        <div className="relative -mx-4 px-4">
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
                animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                transition={prefersReducedMotion ? {} : { delay: index * 0.1 }}
                className="flex-none w-[85vw] sm:w-[75vw] snap-start"
              >
                <EnhancedBlogCard {...post} compact />
              </motion.div>
            ))}
          </div>

          {/* スクロールヒント（初回のみ表示・モーション配慮） */}
          {!prefersReducedMotion && (
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 0, x: 10 }}
              transition={{ delay: 2, duration: 1 }}
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
        <nav aria-label="カルーセルページネーション" className="flex justify-center gap-2 mt-6">
          {latestPosts.map((post, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className="h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcf6e3]"
              style={{
                backgroundColor: index === currentIndex ? post.categoryColor : '#d1d5db',
                width: index === currentIndex ? "24px" : "8px",
              }}
              aria-label={`${index + 1}件目の記事へ移動`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </nav>
      </div>

      {/* デスクトップ: 従来のレイアウト */}
      <div className="hidden lg:block">
        {/* Featured Post */}
        <div className="mb-8 lg:mb-12">
          <EnhancedBlogCard {...latestPosts[0]} featured />
        </div>

        {/* Masonry Grid for Regular Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {latestPosts.slice(1).map((post, index) => (
            <EnhancedBlogCard key={index} {...post} />
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <FadeInSection delay={0.4} className="text-center mt-8">
        <Button
          size="lg"
          variant="outline"
          className="px-12 py-6 md:px-8 md:py-6 text-base font-semibold bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 border-2 border-gray-300 hover:border-[#2d5016] shadow-lg hover:shadow-xl active:scale-[0.98] group min-h-[44px] min-w-[240px] md:min-w-0"
        >
          <span className="flex items-center gap-3 justify-center">
            <BookOpen className="w-5 h-5" />
            すべての記事を見る
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>
      </FadeInSection>
    </>
  )
}

function FAQContent() {
  return (
    <>
      <div className="space-y-6 mb-8">
        {faqData.map((category, categoryIndex) => {
          const Icon = category.icon
          return (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: category.color }} />
                </div>
                <h4 className="text-lg font-bold text-gray-900">{category.category}</h4>
              </div>

              {/* Questions */}
              <Accordion type="single" collapsible className="space-y-3">
                {category.questions.map((item, questionIndex) => (
                  <AccordionItem
                    key={questionIndex}
                    value={`${categoryIndex}-${questionIndex}`}
                    className="bg-white/60 backdrop-blur-sm rounded-xl px-5 border-none shadow-sm hover:shadow-md transition-all"
                  >
                    <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline py-4 text-sm">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 leading-relaxed pb-4 text-sm">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          )
        })}
      </div>

      {/* Contact CTA */}
      <FadeInSection delay={0.4} className="text-center">
        <p className="text-sm text-gray-600 mb-4">その他のご質問がございましたら、お気軽にお問い合わせください。</p>
        <Button
          size="lg"
          variant="outline"
          className="px-8 py-6 text-base font-semibold bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 border-2 border-gray-300 hover:border-[#b8604a] shadow-lg hover:shadow-xl active:scale-[0.98] group min-h-[44px] w-full sm:w-auto"
        >
          <span className="flex items-center gap-3 justify-center">
            <Mail className="w-5 h-5" />
            お問い合わせ
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>
      </FadeInSection>
    </>
  )
}
