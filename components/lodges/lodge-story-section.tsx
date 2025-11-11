"use client"

import { useState } from "react"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FadeInSection } from "@/components/animations/fade-in-section"
import { WashiBackground } from "@/components/effects/washi-background"
import TreeShadowBackground from "@/components/effects/tree-shadow-background"

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
      landscape3: "/images/lodges/suisho-4.jpg",
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

function InteractivePhoto({
  src,
  alt,
  aspectRatio,
  sizes,
  delay = 0,
}: {
  src: string
  alt: string
  aspectRatio: string
  sizes: string
  delay?: number
}) {
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
      >
        <div className={`relative ${aspectRatio} overflow-hidden shadow-2xl`}>
          <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" sizes={sizes} />
        </div>
      </motion.div>
    </FadeInSection>
  )
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center my-32 lg:my-48">
      <div className="flex items-center gap-4">
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gray-300"></div>
        <div className="flex gap-2">
          <div className="w-2 h-2 rotate-45 bg-gray-400 opacity-40"></div>
          <div className="w-2 h-2 rotate-45 bg-gray-400 opacity-60"></div>
          <div className="w-2 h-2 rotate-45 bg-gray-400 opacity-80"></div>
        </div>
        <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-gray-300"></div>
      </div>
    </div>
  )
}

export function LodgeStorySection() {
  return (
    <section className="relative py-32 lg:py-40">
      <div className="absolute inset-0 z-0">
        <WashiBackground intensity="strong" animated={false} />
        <TreeShadowBackground intensity="subtle" enableParallax={true} />
      </div>

      {lodgeStories.map((lodge, storyIndex) => {
        return (
          <div key={lodge.id} className="relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
              <FadeInSection delay={0.1}>
                <div className={`flex ${lodge.id === "suisho" ? "justify-start" : "justify-end"} mb-16 lg:mb-24`}>
                  <div className={`max-w-xl ${lodge.id === "suisho" ? "text-left" : "text-right"}`}>
                    <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-serif font-light mb-6 tracking-[0.08em] leading-[1.6] text-balance">
                      {lodge.title}
                    </h2>
                    <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-[1.9] tracking-[0.04em] font-serif font-light text-pretty">
                      {lodge.description}
                    </p>
                  </div>
                </div>
              </FadeInSection>

              {/* 写真1: 縦構図 */}
              <div className={`mb-16 lg:mb-24 max-w-2xl ${lodge.id === "suisho" ? "ml-auto" : ""}`}>
                <InteractivePhoto
                  src={lodge.photos.portrait1}
                  alt={`${lodge.name} 風景1`}
                  aspectRatio="aspect-[3/4]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  delay={0.2}
                />
              </div>

              {/* 写真2: 横構図 */}
              <div className={`mb-16 lg:mb-24 max-w-3xl ${lodge.id === "suisho" ? "" : "ml-auto"}`}>
                <InteractivePhoto
                  src={lodge.photos.landscape}
                  alt={`${lodge.name} 風景2`}
                  aspectRatio="aspect-[3/2]"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  delay={0.3}
                />
              </div>

              {/* 水晶小屋の追加写真 */}
              {lodge.id === "suisho" && lodge.photos.landscape2 && lodge.photos.landscape3 ? (
                <>
                  <div className="mb-16 lg:mb-24 max-w-4xl mx-auto">
                    <InteractivePhoto
                      src={lodge.photos.landscape2}
                      alt={`${lodge.name} 風景3`}
                      aspectRatio="aspect-[4/3]"
                      sizes="(max-width: 768px) 100vw, 80vw"
                      delay={0.4}
                    />
                  </div>

                  <div className="mb-12 max-w-4xl mx-auto">
                    <InteractivePhoto
                      src={lodge.photos.landscape3}
                      alt={`${lodge.name} 風景4`}
                      aspectRatio="aspect-[4/3]"
                      sizes="(max-width: 768px) 100vw, 80vw"
                      delay={0.5}
                    />
                  </div>
                </>
              ) : (
                lodge.photos.portrait2 && (
                  <div className="mb-12">
                    <InteractivePhoto
                      src={lodge.photos.portrait2}
                      alt={`${lodge.name} 風景3`}
                      aspectRatio="aspect-[3/4]"
                      sizes="100vw"
                      delay={0.4}
                    />
                  </div>
                )
              )}

              <FadeInSection delay={0.5}>
                <div className="flex justify-center mt-16">
                  <Link href={lodge.link}>
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
                      <span className="text-sm">{lodge.name}の詳細</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
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
