"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Mountain, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLodgeTheme } from "@/lib/seasonal-theme"

interface LodgeCardProps {
  lodge: "mitsumata" | "suisho" | "yumata"
  elevation: string
  capacity: string
  location: string
  description: string
  features: string[]
  imageUrl: string
}

export function LodgeCard({ lodge, elevation, capacity, location, description, features, imageUrl }: LodgeCardProps) {
  const theme = getLodgeTheme(lodge)

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* 画像 */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={theme.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* カテゴリバッジ */}
        <div className="absolute top-4 left-4">
          <span
            className="px-4 py-2 rounded-full text-sm font-medium text-white shadow-lg backdrop-blur-sm"
            style={{ backgroundColor: theme.primary }}
          >
            {theme.name}
          </span>
        </div>

        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* コンテンツ */}
      <div className="p-8">
        {/* タイトル */}
        <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-gray-700 transition-colors">
          {theme.name}
        </h3>

        {/* 説明 */}
        <p className="text-gray-700 leading-relaxed mb-6 line-clamp-3">{description}</p>

        {/* メタ情報 */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Mountain className="w-4 h-4" style={{ color: theme.primary }} />
            <span>{elevation}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" style={{ color: theme.primary }} />
            <span>{capacity}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" style={{ color: theme.primary }} />
            <span>{location}</span>
          </div>
        </div>

        {/* 特徴タグ */}
        <div className="flex flex-wrap gap-2 mb-6">
          {features.map((feature, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: theme.bg,
                color: theme.primary,
              }}
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTAボタン */}
        <div className="flex gap-3">
          <Button
            className="flex-1 text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: theme.primary }}
          >
            詳細を見る
          </Button>
          <Button variant="outline" className="flex-1 hover:bg-gray-50 bg-transparent">
            予約する
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
