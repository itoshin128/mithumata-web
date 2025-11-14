"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mountain, Users } from "lucide-react"
import { FadeInSection } from "@/components/animations/fade-in-section"
import { WashiBackground } from "@/components/effects/washi-background"
import TreeShadowBackground from "@/components/effects/tree-shadow-background"

const lodgesData = [
  {
    lodge: "mitsumata" as const,
    name: "三俣山荘",
    elevation: "標高2,677m",
    capacity: "収容250名",
    tagline: "北アルプスの中心に位置する山荘",
    description: "槍ヶ岳を望む展望食堂が自慢。ジビエシチューが名物で、黒部源流の豊かな自然に囲まれています。",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_DSF5531-ZVbiagk7TP0V075eSDyIBMaQCSBBOv.jpg",
    color: "mitsumata",
  },
  {
    lodge: "suisho" as const,
    name: "水晶小屋",
    elevation: "標高2,986m",
    capacity: "収容80名",
    tagline: "透明感あふれる、高山の静寂",
    description: "水晶岳の直下に位置し、高山植物の宝庫。夏には色とりどりの花々が咲き誇ります。",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSCF0059%5B1-gSvV4yL5bzqtNGfvrjuYxsqTaoY479.jpg",
    color: "suisho",
  },
  {
    lodge: "yumata" as const,
    name: "湯俣山荘",
    elevation: "標高1,583m",
    capacity: "収容50名",
    tagline: "温泉と自然に抱かれる山荘",
    description:
      "湯俣温泉に隣接し、温泉と自然を楽しめます。伊藤新道の起点として、湯俣川ネイチャーフィールドの拠点となります。",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSCF8531-doIOp0UOehyQhkkKOpfhohyUNxmgs3.jpg",
    color: "yumata",
  },
]

export function LodgesSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 -z-10">
        <TreeShadowBackground intensity="medium" enableParallax={true} />
        <WashiBackground intensity="strong" animated={false} />
      </div>

      <div className="container mx-auto px-6 max-w-7xl">
        {/* セクションヘッダー */}
        <FadeInSection className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-gray-900 tracking-wider">三つの山荘</h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-serif font-light">
            それぞれに異なる魅力を持つ、黒部源流の拠点
          </p>
        </FadeInSection>

        {/* 山荘グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lodgesData.map((lodge, index) => (
            <FadeInSection key={lodge.lodge} delay={index * 0.2}>
              <Link href={lodge.lodge === 'mitsumata' ? '/mitsumata' : `/lodges/${lodge.lodge}`}>
                <motion.article
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  className="
                    group relative
                    bg-white
                    overflow-hidden
                    shadow-lg hover:shadow-2xl
                    transition-all duration-500
                    h-full
                  "
                >
                  {/* 画像 */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={lodge.imageUrl || "/placeholder.svg"}
                      alt={lodge.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* グラデーションオーバーレイ */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* 画像上のテキスト */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl md:text-3xl font-serif font-light mb-2 tracking-wide">{lodge.name}</h3>
                      <p className="text-sm opacity-90 font-light">{lodge.tagline}</p>
                    </div>
                  </div>

                  {/* コンテンツ */}
                  <div className="p-6">
                    {/* メタ情報 */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 font-serif">
                      <div className="flex items-center gap-1.5">
                        <Mountain className="w-4 h-4" />
                        <span>{lodge.elevation}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>{lodge.capacity}</span>
                      </div>
                    </div>

                    {/* 説明 */}
                    <p className="text-gray-700 leading-relaxed mb-6 font-serif font-light">{lodge.description}</p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-gray-900 font-serif font-light tracking-wide group-hover:gap-3 transition-all">
                      <span className="text-sm">詳しく見る</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              </Link>
            </FadeInSection>
          ))}
        </div>

        {/* 補足テキスト */}
        <FadeInSection delay={0.6} className="text-center mt-20">
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto font-serif font-light text-base md:text-lg">
            三俣山荘グループは、北アルプス最奥の黒部源流域に位置する3つの山荘を運営しています。
            <br className="hidden md:block" />
            それぞれの山荘が、山の広さと深さへの入口となります。
          </p>
        </FadeInSection>
      </div>
    </section>
  )
}
