"use client"

import { useState } from "react"
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
      <article className="group h-full flex flex-col">
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
              >
                {post.category}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 flex flex-col space-y-3 md:space-y-4">
          {/* Title */}
          <h3 className="text-base md:text-lg lg:text-xl font-serif font-light tracking-[0.04em] leading-[1.6] text-gray-900 text-balance">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="flex-1 text-sm md:text-base text-gray-700 leading-[1.9] tracking-[0.04em] font-serif font-light text-pretty line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs md:text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 md:w-4 md:h-4" />
              <time className="font-serif font-light tracking-wider">{post.date}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3 h-3 md:w-4 md:h-4" />
              <span className="font-serif font-light tracking-wider">{post.author}</span>
            </div>
          </div>

          {/* Read More Link */}
          <div className="pt-2">
            <Link href={post.href}>
              <motion.span
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-2 text-sm md:text-base font-serif font-light tracking-[0.1em] transition-colors duration-300"
                style={{ color: post.categoryColor }}
              >
                続きを読む
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </div>
        </div>
      </article>
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
  return (
    <section className="relative py-20 md:py-32 lg:py-40">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        {/* Section Header - Centered */}
        <FadeInSection delay={0.1}>
          <div className="text-center mb-16 md:mb-20 lg:mb-24 max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif font-light mb-6 md:mb-8 tracking-[0.08em] leading-[1.6] text-balance">
              お知らせ
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-[1.9] tracking-[0.04em] font-serif font-light text-pretty">
              山小屋の今を伝える、コラムとお知らせ。
              <br className="hidden md:block" />
              道直し活動、高山植物、山の楽しみ方など、様々な情報を発信しています。
            </p>
          </div>
        </FadeInSection>

        {/* Blog Grid - Simple 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-12 md:mb-16">
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
                  px-10 py-5
                  border border-gray-900
                  rounded-full
                  text-gray-900
                  font-light
                  tracking-[0.2em]
                  transition-all duration-500
                  hover:text-white
                  hover:shadow-xl
                "
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">すべての記事を見る</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
              </motion.button>
            </Link>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
