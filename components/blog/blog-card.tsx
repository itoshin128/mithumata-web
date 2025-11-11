"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, User, ArrowRight } from "lucide-react"

interface BlogCardProps {
  title: string
  excerpt: string
  category: string
  categoryColor: string
  date: string
  author: string
  imageUrl: string
  href: string
}

export function BlogCard({ title, excerpt, category, categoryColor, date, author, imageUrl, href }: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
    >
      {/* サムネイル */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* コンテンツ */}
      <div className="p-6">
        {/* カテゴリ */}
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
          style={{
            backgroundColor: `${categoryColor}20`,
            color: categoryColor,
          }}
        >
          {category}
        </span>

        {/* タイトル */}
        <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
          {title}
        </h3>

        {/* 抜粋 */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{excerpt}</p>

        {/* メタ情報 */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <time>{date}</time>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{author}</span>
          </div>
        </div>

        {/* 続きを読むリンク */}
        <a
          href={href}
          className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all"
          style={{ color: categoryColor }}
        >
          続きを読む
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </motion.article>
  )
}
