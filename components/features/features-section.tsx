"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Leaf, Mountain, Compass } from "lucide-react"
import { FadeInSection } from "@/components/animations/fade-in-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const featuresData = [
  {
    id: "culture",
    label: "文化",
    icon: Leaf,
    title: "道直しと山岳保全",
    description:
      "1945年から続く、登山道の維持管理活動。伊藤新道の開拓と保全を通じて、次世代へ山を繋ぐ使命を果たしています。",
    content: ["年間100日以上の道直し作業", "伊藤新道の維持管理", "登山者の安全確保", "山岳環境の保全活動"],
    imageUrl: "/placeholder.svg?height=600&width=800",
    color: "#2d5016",
  },
  {
    id: "nature",
    label: "自然",
    icon: Mountain,
    title: "原始の生態系",
    description:
      "標高2,500m以上の高山帯に広がる、原始と変わらぬ生態系。高山植物、ライチョウ、イワナなど、豊かな生命が息づいています。",
    content: ["200種以上の高山植物", "ライチョウの生息地", "清流に棲むイワナ", "手つかずの原生林"],
    imageUrl: "/placeholder.svg?height=600&width=800",
    color: "#5ba4cf",
  },
  {
    id: "adventure",
    label: "挑戦",
    icon: Compass,
    title: "湯俣川ネイチャーフィールド",
    description:
      "登山道という「線」ではなく、フィールド全体の「面」として山を楽しむ。釣り、藪漕ぎ、沢登り、新しい山の楽しみ方を提案します。",
    content: ["イワナ釣りの聖地", "藪漕ぎルートの開拓", "沢登りの楽園", "自由な山の楽しみ方"],
    imageUrl: "/placeholder.svg?height=600&width=800",
    color: "#b8604a",
  },
]

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState("culture")

  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* セクションヘッダー */}
        <FadeInSection className="text-center mb-16">
          <h2 className="text-5xl md:text-4xl sm:text-3xl font-bold mb-6 text-gray-900 text-balance">黒部源流の魅力</h2>
          <p className="text-xl md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            北アルプス最奥地に広がる、原始と変わらぬ世界。
            <br className="hidden md:block" />
            山の広さと深さを、3つの視点から体験できます。
          </p>
        </FadeInSection>

        {/* タブUI */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* タブリスト */}
          <TabsList className="grid w-full grid-cols-3 mb-12 h-auto p-2 bg-gray-100 rounded-xl">
            {featuresData.map((feature) => {
              const Icon = feature.icon
              return (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="flex flex-col items-center gap-2 py-4 px-6 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all duration-300"
                >
                  <Icon
                    className="w-6 h-6 transition-colors"
                    style={{
                      color: activeTab === feature.id ? feature.color : "#6b7280",
                    }}
                  />
                  <span className="text-sm md:text-base font-medium">{feature.label}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {/* タブコンテンツ */}
          <AnimatePresence mode="wait">
            {featuresData.map((feature) => (
              <TabsContent key={feature.id} value={feature.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  {/* 画像 */}
                  <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
                    <Image
                      src={feature.imageUrl || "/placeholder.svg"}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* テキストコンテンツ */}
                  <div className="order-1 lg:order-2">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <h3 className="text-4xl md:text-3xl font-bold mb-6 text-balance" style={{ color: feature.color }}>
                        {feature.title}
                      </h3>
                      <p className="text-lg text-gray-700 leading-relaxed mb-8">{feature.description}</p>

                      {/* 特徴リスト */}
                      <ul className="space-y-4 mb-8">
                        {feature.content.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: feature.color }}
                            />
                            <span className="text-gray-800">{item}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* CTAボタン */}
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="px-8 py-4 rounded-lg text-white font-medium hover:opacity-90 transition-opacity shadow-lg"
                        style={{ backgroundColor: feature.color }}
                      >
                        詳しく見る
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  )
}
