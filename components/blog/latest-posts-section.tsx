"use client"

import { motion } from "framer-motion"
import { FadeInSection } from "@/components/animations/fade-in-section"
import { BlogCard } from "./blog-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"

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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
}

export function LatestPostsSection() {
  return (
    <section className="relative z-20 py-20 lg:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* セクションヘッダー */}
        <FadeInSection className="text-center mb-16">
          <h2 className="font-serif text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-6 text-gray-900 text-balance tracking-wider">
            お知らせ
          </h2>
          <p className="font-serif text-sm md:text-base lg:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed tracking-wide">
            山小屋の今を伝える、コラムとお知らせ。
            <br className="hidden md:block" />
            道直し活動、高山植物、山の楽しみ方など、様々な情報を発信しています。
          </p>
        </FadeInSection>

        {/* ブログカードグリッド */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {latestPosts.map((post, index) => (
            <motion.div key={index} variants={itemVariants}>
              <BlogCard {...post} />
            </motion.div>
          ))}
        </motion.div>

        {/* もっと見るボタン */}
        <FadeInSection delay={0.4} className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="px-6 py-3 sm:px-8 sm:py-6 text-base font-semibold bg-white hover:bg-gray-50 transition-all duration-300 border-2 border-gray-300 hover:border-gray-500 shadow-sm hover:shadow-lg active:scale-[0.98] group min-h-[44px]"
          >
            <span className="flex items-center gap-3 justify-center">
              <BookOpen className="w-5 h-5" />
              すべての記事を見る
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </FadeInSection>
      </div>
    </section>
  )
}
