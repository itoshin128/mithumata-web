"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FadeInSection } from "@/components/animations/fade-in-section"
import { EnhancedBlogCard } from "@/components/blog/enhanced-blog-card"
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

// セクション区切り装飾
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

export function InformationHub() {
  return (
    <section className="relative py-20 md:py-32 lg:py-40">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-5xl">
        {/* セクション見出し */}
        <FadeInSection delay={0.1}>
          <div className="text-center mb-16 md:mb-20 lg:mb-24 max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-light mb-6 md:mb-8 tracking-[0.08em] leading-[1.6] text-balance">
              インフォメーション
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-[1.9] tracking-[0.04em] font-serif font-light text-pretty">
              山小屋の最新情報とよくあるご質問をご覧いただけます
            </p>
          </div>
        </FadeInSection>

        {/* お知らせセクション */}
        <FadeInSection delay={0.2}>
          <div className="mb-20 md:mb-28 lg:mb-32">
            {/* お知らせ見出し */}
            <div className="flex items-center gap-4 mb-10 md:mb-12">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#2d5016]/10 to-[#5ba4cf]/10 flex items-center justify-center">
                <Newspaper className="w-5 h-5 md:w-6 md:h-6 text-[#2d5016]" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-serif font-light tracking-[0.06em] leading-[1.6] text-gray-900">
                  お知らせ
                </h3>
                <p className="text-xs md:text-sm text-gray-600 tracking-wide">Latest Updates</p>
              </div>
            </div>

            {/* 注目記事 */}
            <div className="mb-8">
              <EnhancedBlogCard {...latestPosts[0]} featured />
            </div>

            {/* 通常記事グリッド */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-8">
              {latestPosts.slice(1).map((post, index) => (
                <EnhancedBlogCard key={index} {...post} />
              ))}
            </div>

            {/* すべての記事を見るボタン */}
            <FadeInSection delay={0.4}>
              <div className="text-center">
                <Link href="/blog">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "rgb(17, 24, 39)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group inline-flex items-center gap-3 px-10 py-5 border border-gray-900 rounded-full text-gray-900 font-light tracking-[0.2em] transition-all duration-500 hover:text-white hover:shadow-xl"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm">すべての記事を見る</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                  </motion.button>
                </Link>
              </div>
            </FadeInSection>
          </div>
        </FadeInSection>

        <SectionDivider />

        {/* FAQセクション */}
        <FadeInSection delay={0.3}>
          <div>
            {/* FAQ見出し */}
            <div className="flex items-center gap-4 mb-12 md:mb-16">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#b8604a]/10 to-[#f9a825]/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-[#b8604a]" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-serif font-light tracking-[0.06em] leading-[1.6] text-gray-900">
                  よくあるご質問
                </h3>
                <p className="text-xs md:text-sm text-gray-600 tracking-wide">FAQ</p>
              </div>
            </div>

            {/* FAQカテゴリー */}
            <div className="space-y-8 md:space-y-10 lg:space-y-12 mb-12 md:mb-16">
              {faqData.map((category, categoryIndex) => {
                const Icon = category.icon
                return (
                  <motion.div
                    key={categoryIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 }}
                    className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    {/* カテゴリーヘッダー */}
                    <div className="flex items-center gap-4 mb-6 md:mb-8">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md"
                        style={{
                          backgroundColor: `${category.color}15`,
                          borderColor: category.color,
                          borderWidth: "2px",
                        }}
                      >
                        <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: category.color }} />
                      </motion.div>
                      <h4
                        className="text-base md:text-lg lg:text-xl font-serif font-light tracking-[0.06em] leading-[1.6]"
                        style={{ color: category.color }}
                      >
                        {category.category}
                      </h4>
                    </div>

                    {/* 質問アコーディオン */}
                    <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
                      {category.questions.map((item, questionIndex) => (
                        <AccordionItem
                          key={questionIndex}
                          value={`${categoryIndex}-${questionIndex}`}
                          className="border-none"
                        >
                          <AccordionTrigger className="text-left font-serif font-light text-sm md:text-base lg:text-lg tracking-[0.04em] leading-[1.6] text-gray-900 hover:no-underline py-4 md:py-5 border-b border-gray-200 hover:border-gray-400 transition-all duration-300">
                            <span className="pr-4">{item.q}</span>
                          </AccordionTrigger>
                          <AccordionContent className="text-sm md:text-base text-gray-700 leading-[1.9] tracking-[0.04em] font-serif font-light pt-4 md:pt-5 pb-2 text-pretty">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </motion.div>
                )
              })}
            </div>

            {/* お問い合わせCTA */}
            <FadeInSection delay={0.5}>
              <div className="text-center">
                <p className="text-sm md:text-base text-gray-700 mb-8 md:mb-10 font-serif font-light tracking-[0.04em] leading-[1.9]">
                  その他のご質問がございましたら、お気軽にお問い合わせください。
                </p>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "rgb(17, 24, 39)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group inline-flex items-center gap-3 px-10 py-5 border border-gray-900 rounded-full text-gray-900 font-light tracking-[0.2em] transition-all duration-500 hover:text-white hover:shadow-xl"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">お問い合わせ</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                  </motion.button>
                </Link>
              </div>
            </FadeInSection>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
