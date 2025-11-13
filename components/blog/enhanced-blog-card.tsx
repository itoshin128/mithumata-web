"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, User, ArrowRight, Tag, Eye } from "lucide-react"
import { useState } from "react"

interface EnhancedBlogCardProps {
  title: string
  excerpt: string
  category: string
  categoryColor: string
  date: string
  author: string
  imageUrl: string
  href: string
  featured?: boolean
  compact?: boolean
  className?: string
}

export function EnhancedBlogCard({
  title,
  excerpt,
  category,
  categoryColor,
  date,
  author,
  imageUrl,
  href,
  featured = false,
  compact = false,
  className = "",
}: EnhancedBlogCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  // モバイル用コンパクトカード
  if (compact) {
    return (
      <a href={href} className={`block ${className}`}>
        <motion.article
          whileTap={{ scale: 0.98 }}
          className="relative bg-white rounded-2xl overflow-hidden shadow-lg active:shadow-xl transition-shadow duration-300 h-[340px] flex flex-col"
        >
          {/* 画像セクション */}
          <div className="relative h-[180px] overflow-hidden flex-shrink-0">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover"
            />
            {/* グラデーションオーバーレイ */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
            />
            {/* カテゴリバッジ */}
            <div className="absolute top-3 left-3">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md"
                style={{
                  backgroundColor: `${categoryColor}ee`,
                  color: "white",
                }}
              >
                {category}
              </span>
            </div>
          </div>

          {/* コンテンツセクション */}
          <div className="flex-1 p-4 flex flex-col">
            {/* タイトル */}
            <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-2 leading-snug">
              {title}
            </h3>

            {/* 抜粋 */}
            <p className="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed flex-1">
              {excerpt}
            </p>

            {/* メタ情報 */}
            <div className="flex items-center gap-3 text-xs text-gray-500 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <time>{date}</time>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span className="truncate">{author}</span>
              </div>
            </div>
          </div>

          {/* 読むインジケーター */}
          <div className="absolute bottom-4 right-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
              style={{ backgroundColor: categoryColor }}
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </motion.article>
      </a>
    )
  }

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`relative bg-white rounded-2xl overflow-hidden shadow-2xl group ${className}`}
      >
        {/* Featured Background with Parallax */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              style={{
                background: `linear-gradient(to top, ${categoryColor}dd, ${categoryColor}88 30%, transparent 70%)`,
              }}
            />
          </motion.div>

          {/* Featured Badge */}
          <div className="absolute top-6 left-6 z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
            >
              <span className="text-xs font-bold tracking-wider" style={{ color: categoryColor }}>
                ✨ FEATURED
              </span>
            </motion.div>
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-white z-10">
            {/* Category */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 bg-white/20 backdrop-blur-md"
            >
              {category}
            </motion.span>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
            >
              {title}
            </motion.h3>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg mb-6 leading-relaxed text-white/90 line-clamp-2"
            >
              {excerpt}
            </motion.p>

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-6 text-sm text-white/80 mb-6"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time>{date}</time>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{author}</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              href={href}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:gap-4 hover:shadow-xl transition-all duration-300 group/btn"
            >
              続きを読む
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.article
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div className="backface-hidden" style={{ backfaceVisibility: "hidden" }}>
          {/* Thumbnail */}
          <div className="relative h-56 overflow-hidden">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-500"
            />
            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(to bottom, transparent 50%, ${categoryColor}33)`,
              }}
            />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Category */}
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
              style={{
                backgroundColor: `${categoryColor}20`,
                color: categoryColor,
              }}
            >
              {category}
            </span>

            {/* Title */}
            <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{excerpt}</p>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <time>{date}</time>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side (Visible on Hover) */}
        <div
          className="absolute inset-0 backface-hidden p-6 flex flex-col justify-center items-center text-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: categoryColor,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isFlipped ? 1 : 0, scale: isFlipped ? 1 : 0.8 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-white"
          >
            <Eye className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h4 className="text-2xl font-bold mb-3">{title}</h4>
            <p className="text-sm mb-6 leading-relaxed opacity-90">{excerpt}</p>
            <a
              href={href}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:shadow-xl transition-all duration-300 group/link"
            >
              記事を読む
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </motion.article>
    </motion.div>
  )
}
