"use client"

import { useState, memo, useCallback } from "react"
import type React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FadeInSection } from "@/components/animations/fade-in-section"
import { ANIMATION } from "@/lib/animation-constants"
import { COLORS } from "@/lib/color-constants"

interface LodgeStory {
  id: string
  name: string
  title: string
  description: string
  photos: {
    portrait1: string
    landscape: string
    portrait2?: string
    landscape2?: string
    landscape3?: string
  }
  link: string
}

const lodgeStories: LodgeStory[] = [
  {
    id: "yumata",
    name: "湯俣山荘",
    title: "湯俣山荘",
    description:
      "ここにリード文が入ります。ここにリード文が入ります。ここにリード文が入ります。ここにリード文が入ります。ここにリード文が入ります。ここにリード文が入ります。",
    photos: {
      portrait1: "/images/lodges/yumata-1.jpg",
      landscape: "/images/lodges/yumata-2.jpg",
      portrait2: "/images/lodges/yumata-3.jpg",
    },
    link: "/lodges/yumata",
  },
  {
    id: "suisho",
    name: "水晶小屋",
    title: "水晶小屋",
    description:
      "ここにリード文が入ります。ここにリード文が入ります。ここにリード文が入ります。ここにリード文が入ります。ここにリード文が入ります。ここにリード文が入ります。",
    photos: {
      portrait1: "/images/lodges/suisho-1.jpg",
      landscape: "/images/lodges/suisho-2.jpg",
      landscape2: "/images/lodges/suisho-3.jpg",
    },
    link: "/lodges/suisho",
  },
  {
    id: "mitsumata",
    name: "三俣山荘",
    title: "三俣山荘",
    description:
      "ここにリード文が入ります。ここにリード文が入ります。ここにリード文が入ります。ここにリード文が入ります。ここにリード文が入ります。ここにリード文が入ります。",
    photos: {
      portrait1: "/images/lodges/mitsumata-1.jpg",
      landscape: "/images/lodges/mitsumata-2.jpg",
      portrait2: "/images/lodges/mitsumata-3.jpg",
    },
    link: "/lodges/mitsumata",
  },
]

// 視差効果付き写真コンポーネント
const ParallaxPhoto = memo(function ParallaxPhoto({
  src,
  alt,
  aspectRatio,
  sizes,
  delay = 0,
  parallaxOffset = 50,
}: {
  src: string
  alt: string
  aspectRatio: string
  sizes: string
  delay?: number
  parallaxOffset?: number
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [parallaxOffset, -parallaxOffset])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x, y })
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => setIsHovering(false), [])

  return (
    <FadeInSection delay={delay}>
      <motion.div
        ref={ref}
        style={{ y }}
        whileHover={{ scale: ANIMATION.scale.hoverSubtle }}
        transition={ANIMATION.transition.hover}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="relative cursor-pointer group"
      >
        <motion.div
          style={{
            rotateY: isHovering ? mousePosition.x * 5 : 0,
            rotateX: isHovering ? -mousePosition.y * 5 : 0,
          }}
          transition={ANIMATION.transition.hover}
        >
          <div
            className={`relative ${aspectRatio} overflow-hidden shadow-lg hover:shadow-2xl transition-shadow ${ANIMATION.duration.slow}ms`}
          >
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              sizes={sizes}
            />
            {/* ホバー時のオーバーレイ */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
          </div>
        </motion.div>
      </motion.div>
    </FadeInSection>
  )
})

// 湯俣山荘: マガジンスタイルレイアウト（2カラムグリッド）
function YumataLayout({ lodge }: { lodge: LodgeStory }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 mb-20 md:mb-24">
      {/* 左側: 縦長写真 */}
      <div className="md:col-span-5">
        <ParallaxPhoto
          src={lodge.photos.portrait1}
          alt={`${lodge.name} 風景1`}
          aspectRatio="aspect-[3/4]"
          sizes="(max-width: 768px) 100vw, 42vw"
          delay={0.2}
          parallaxOffset={30}
        />
      </div>

      {/* 右側: 横長写真と縦長写真のスタック */}
      <div className="md:col-span-7 space-y-6 md:space-y-8 lg:space-y-12">
        {/* 横長写真 */}
        <ParallaxPhoto
          src={lodge.photos.landscape}
          alt={`${lodge.name} 風景2`}
          aspectRatio="aspect-[16/9]"
          sizes="(max-width: 768px) 100vw, 58vw"
          delay={0.3}
          parallaxOffset={40}
        />

        {/* 縦長写真（小さめ） */}
        {lodge.photos.portrait2 && (
          <div className="max-w-md ml-auto">
            <ParallaxPhoto
              src={lodge.photos.portrait2}
              alt={`${lodge.name} 風景3`}
              aspectRatio="aspect-[4/5]"
              sizes="(max-width: 768px) 100vw, 35vw"
              delay={0.4}
              parallaxOffset={20}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// 水晶小屋: マソンリースタイル（オーバーラップとアシンメトリー）
function SuishoLayout({ lodge }: { lodge: LodgeStory }) {
  return (
    <div className="relative mb-20 md:mb-24">
      {/* 背景: 大きな横長写真 */}
      <div className="mb-[-120px] md:mb-[-180px] relative z-10">
        <ParallaxPhoto
          src={lodge.photos.landscape}
          alt={`${lodge.name} 風景1`}
          aspectRatio="aspect-[21/9]"
          sizes="100vw"
          delay={0.2}
          parallaxOffset={60}
        />
      </div>

      {/* 前景: オーバーラップする2枚の写真 */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* 左: 縦長写真 */}
          <div className="md:pt-20 lg:pt-32">
            <ParallaxPhoto
              src={lodge.photos.portrait1}
              alt={`${lodge.name} 風景2`}
              aspectRatio="aspect-[3/4]"
              sizes="(max-width: 768px) 90vw, 45vw"
              delay={0.3}
              parallaxOffset={25}
            />
          </div>

          {/* 右: もう一枚の横長写真 */}
          {lodge.photos.landscape2 && (
            <div className="md:pt-40 lg:pt-52">
              <ParallaxPhoto
                src={lodge.photos.landscape2}
                alt={`${lodge.name} 風景3`}
                aspectRatio="aspect-[4/3]"
                sizes="(max-width: 768px) 90vw, 45vw"
                delay={0.4}
                parallaxOffset={35}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// 三俣山荘: シネマティックスタイル（大胆なコントラスト）
function MitsumataLayout({ lodge }: { lodge: LodgeStory }) {
  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-24 mb-20 md:mb-24">
      {/* 1. 全幅の横長写真（インパクト） */}
      <ParallaxPhoto
        src={lodge.photos.landscape}
        alt={`${lodge.name} 風景1`}
        aspectRatio="aspect-[21/9]"
        sizes="100vw"
        delay={0.2}
        parallaxOffset={70}
      />

      {/* 2. 2カラム: 左に縦長、右に余白とテキスト（将来的に）*/}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          {/* 左: 縦長写真 */}
          <div className="max-w-md mx-auto md:mx-0">
            <ParallaxPhoto
              src={lodge.photos.portrait1}
              alt={`${lodge.name} 風景2`}
              aspectRatio="aspect-[3/4]"
              sizes="(max-width: 768px) 80vw, 40vw"
              delay={0.3}
              parallaxOffset={40}
            />
          </div>

          {/* 右: 小さめの横長写真（オフセット配置） */}
          {lodge.photos.portrait2 && (
            <div className="md:pt-16 lg:pt-24">
              <ParallaxPhoto
                src={lodge.photos.portrait2}
                alt={`${lodge.name} 風景3`}
                aspectRatio="aspect-[5/4]"
                sizes="(max-width: 768px) 80vw, 40vw"
                delay={0.4}
                parallaxOffset={30}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// セクション区切り
function SectionDivider() {
  return (
    <FadeInSection>
      <div className="flex items-center justify-center my-28 md:my-36 lg:my-48">
        <div className="flex items-center gap-6">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            transition={{ ...ANIMATION.transition.slideIn }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent to-gray-300 md:w-20"
          />
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 rotate-45 bg-gray-400 opacity-50"></div>
            <div className="w-1.5 h-1.5 rotate-45 bg-gray-400 opacity-70"></div>
            <div className="w-1.5 h-1.5 rotate-45 bg-gray-400 opacity-50"></div>
          </div>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            transition={{ ...ANIMATION.transition.slideIn }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-l from-transparent to-gray-300 md:w-20"
          />
        </div>
      </div>
    </FadeInSection>
  )
}

export function LodgeStorySection() {
  return (
    <section className="relative py-16 md:py-32 lg:py-40">
      {lodgeStories.map((lodge, storyIndex) => {
        return (
          <div key={lodge.id} className="relative z-10">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
              {/* タイトルと説明 */}
              <FadeInSection delay={0.1}>
                <div className="flex justify-center mb-16 md:mb-20 lg:mb-24">
                  <div className="max-w-2xl text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light mb-8 md:mb-10 tracking-wide leading-[1.4] text-balance">
                      {lodge.title}
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed font-serif font-light text-pretty">
                      {lodge.description}
                    </p>
                  </div>
                </div>
              </FadeInSection>

              {/* 山荘別のダイナミックレイアウト */}
              {lodge.id === "yumata" && <YumataLayout lodge={lodge} />}
              {lodge.id === "suisho" && <SuishoLayout lodge={lodge} />}
              {lodge.id === "mitsumata" && <MitsumataLayout lodge={lodge} />}

              {/* 詳細ボタン */}
              <FadeInSection delay={0.5}>
                <div className="flex justify-center mt-16 md:mt-20 lg:mt-24 mb-8 md:mb-12">
                  <Link href={lodge.link}>
                    <motion.button
                      whileHover={{
                        scale: ANIMATION.scale.hoverSubtle,
                        backgroundColor: COLORS.text.primary,
                      }}
                      whileTap={{ scale: ANIMATION.scale.tapDown }}
                      transition={ANIMATION.transition.hover}
                      className="
                        group
                        inline-flex items-center gap-3
                        px-10 py-4 md:px-9 md:py-4
                        border border-gray-800
                        rounded-full
                        text-gray-900
                        font-serif font-light
                        tracking-wider
                        transition-colors duration-500
                        hover:text-white
                        hover:shadow-lg
                        min-w-[220px] md:min-w-0
                      "
                    >
                      <span className="text-sm">{lodge.name}の詳細</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.button>
                  </Link>
                </div>
              </FadeInSection>
            </div>

            {storyIndex < lodgeStories.length - 1 && <SectionDivider />}
          </div>
        )
      })}
    </section>
  )
}
