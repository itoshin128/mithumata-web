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

interface InteractiveBlogCardProps {
  post: typeof latestPosts[0]
  aspectRatio: string
  sizes: string
  delay?: number
  align?: "left" | "right" | "center"
}

function InteractiveBlogCard({ post, aspectRatio, sizes, delay = 0, align = "left" }: InteractiveBlogCardProps) {
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
      <article className="group">
        {/* Image with 3D Effect */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
          style={{
            rotateY: isHovering ? mousePosition.x * 5 : 0,
            rotateX: isHovering ? -mousePosition.y * 5 : 0,
          }}
          className="mb-6 md:mb-8"
        >
          <div className={`relative ${aspectRatio} overflow-hidden shadow-2xl`}>
            <Image
              src={post.imageUrl || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              sizes={sizes}
            />
            {/* Category Badge Overlay */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6">
              <span
                className="inline-block px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-serif tracking-wider bg-white/95 backdrop-blur-sm shadow-lg"
                style={{ color: post.categoryColor }}
              >
                {post.category}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className={`space-y-3 md:space-y-4 ${
          align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left"
        }`}>
          {/* Title */}
          <h3 className="text-base md:text-lg lg:text-xl font-serif font-light tracking-[0.04em] leading-[1.6] text-gray-900 text-balance">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm md:text-base text-gray-700 leading-[1.9] tracking-[0.04em] font-serif font-light text-pretty line-clamp-2">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className={`flex items-center gap-4 text-xs md:text-sm text-gray-500 ${
            align === "right" ? "justify-end" : align === "center" ? "justify-center" : "justify-start"
          }`}>
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
          <div className={`pt-2 ${
            align === "right" ? "flex justify-end" : align === "center" ? "flex justify-center" : ""
          }`}>
            <Link href={post.href}>
              <motion.span
                whileHover={{ x: align === "right" ? -4 : 4 }}
                className="inline-flex items-center gap-2 text-sm md:text-base font-serif font-light tracking-[0.1em] transition-colors duration-300"
                style={{ color: post.categoryColor }}
              >
                {align === "right" && <ArrowRight className="w-4 h-4 rotate-180" />}
                続きを読む
                {align !== "right" && <ArrowRight className="w-4 h-4" />}
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
    <div className="flex items-center justify-center my-20 md:my-24 lg:my-32">
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
      <div className="container mx-auto px-0 md:px-6 max-w-7xl">
        {/* Section Header */}
        <FadeInSection delay={0.1}>
          <div className="flex justify-start mb-20 md:mb-24 lg:mb-32">
            <div className="max-w-xl text-left ml-6 md:ml-12 lg:ml-20 mr-auto">
              <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-serif font-light mb-8 md:mb-10 tracking-[0.08em] leading-[1.6] text-balance">
                お知らせ
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-[1.9] tracking-[0.04em] font-serif font-light text-pretty">
                山小屋の今を伝える、コラムとお知らせ。
                <br className="hidden md:block" />
                道直し活動、高山植物、山の楽しみ方など、様々な情報を発信しています。
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Post 1 - Large, Right Aligned */}
        <div className="mb-28 md:mb-32 lg:mb-40 max-w-[340px] md:max-w-lg lg:max-w-3xl mr-6 md:mr-12 lg:mr-20 ml-auto">
          <InteractiveBlogCard
            post={latestPosts[0]}
            aspectRatio="aspect-[4/3]"
            sizes="(max-width: 640px) 80vw, (max-width: 768px) 70vw, 60vw"
            delay={0.2}
            align="right"
          />
        </div>

        {/* Post 2 - Medium, Left Aligned */}
        <div className="mb-24 md:mb-28 lg:mb-32 max-w-[300px] md:max-w-md lg:max-w-2xl ml-6 md:ml-12 lg:ml-20 mr-auto">
          <InteractiveBlogCard
            post={latestPosts[1]}
            aspectRatio="aspect-[3/2]"
            sizes="(max-width: 640px) 75vw, (max-width: 768px) 65vw, 50vw"
            delay={0.3}
            align="left"
          />
        </div>

        {/* Post 3 - Small, Center Aligned */}
        <div className="mb-20 md:mb-24 max-w-[280px] md:max-w-sm lg:max-w-xl mx-auto">
          <InteractiveBlogCard
            post={latestPosts[2]}
            aspectRatio="aspect-[3/4]"
            sizes="(max-width: 640px) 70vw, (max-width: 768px) 55vw, 40vw"
            delay={0.4}
            align="center"
          />
        </div>

        <SectionDivider />

        {/* View All Button */}
        <FadeInSection delay={0.5}>
          <div className="flex justify-center mt-24 md:mt-28 lg:mt-32">
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
