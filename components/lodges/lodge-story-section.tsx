"use client"

import { useState } from "react"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FadeInSection } from "@/components/animations/fade-in-section"

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
    <div className="flex items-center justify-center my-24 md:my-32 lg:my-48">
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

export function LodgeStorySection() {
  return (
    <section className="relative py-16 md:py-32 lg:py-40">
      {lodgeStories.map((lodge, storyIndex) => {
        return (
          <div key={lodge.id} className="relative z-10">
            <div className="container mx-auto px-0 md:px-6 max-w-7xl">
              <FadeInSection delay={0.1}>
                <div className={`flex ${lodge.id === "suisho" ? "justify-start" : "justify-end"} mb-20 md:mb-24 lg:mb-32`}>
                  <div className={`max-w-xl ${lodge.id === "suisho" ? "text-left ml-6 md:ml-12 lg:ml-20 mr-auto" : "text-right mr-6 md:mr-12 lg:mr-20 ml-auto"}`}>
                    <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-serif font-light mb-8 md:mb-10 tracking-[0.08em] leading-[1.6] text-balance">
                      {lodge.title}
                    </h2>
                    <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-[1.9] tracking-[0.04em] font-serif font-light text-pretty">
                      {lodge.description}
                    </p>
                  </div>
                </div>
              </FadeInSection>

              {/* 写真1: 縦構図 - 水晶小屋は右寄せ、他は左寄せ */}
              <div className={`mb-24 md:mb-28 lg:mb-32 max-w-[260px] md:max-w-sm lg:max-w-xl ${
                lodge.id === "suisho"
                  ? "mr-6 md:mr-12 lg:mr-20 ml-auto"
                  : "ml-6 md:ml-12 lg:ml-20 mr-auto"
              }`}>
                <InteractivePhoto
                  src={lodge.photos.portrait1}
                  alt={`${lodge.name} 風景1`}
                  aspectRatio="aspect-[3/4]"
                  sizes="(max-width: 640px) 45vw, (max-width: 768px) 50vw, 40vw"
                  delay={0.2}
                />
              </div>

              {/* 写真2: 横構図 - 水晶小屋は左寄せ、他は右寄せ */}
              <div className={`mb-28 md:mb-32 lg:mb-36 max-w-[300px] md:max-w-md lg:max-w-2xl ${
                lodge.id === "suisho"
                  ? "ml-6 md:ml-12 lg:ml-20 mr-auto"
                  : "mr-6 md:mr-12 lg:mr-20 ml-auto"
              }`}>
                <InteractivePhoto
                  src={lodge.photos.landscape}
                  alt={`${lodge.name} 風景2`}
                  aspectRatio="aspect-[3/2]"
                  sizes="(max-width: 640px) 55vw, (max-width: 768px) 60vw, 50vw"
                  delay={0.3}
                />
              </div>

              {/* 水晶小屋の追加写真 */}
              {lodge.id === "suisho" && lodge.photos.landscape2 && lodge.photos.landscape3 ? (
                <>
                  {/* 水晶小屋3枚目 - 左寄せ */}
                  <div className="mb-24 md:mb-28 lg:mb-32 max-w-[340px] md:max-w-lg lg:max-w-3xl ml-8 md:ml-16 lg:ml-24 mr-auto">
                    <InteractivePhoto
                      src={lodge.photos.landscape2}
                      alt={`${lodge.name} 風景3`}
                      aspectRatio="aspect-[4/3]"
                      sizes="(max-width: 640px) 60vw, (max-width: 768px) 65vw, 60vw"
                      delay={0.4}
                    />
                  </div>

                  {/* 水晶小屋4枚目 - 全幅 */}
                  <div className="mb-20 md:mb-24 w-full px-0">
                    <InteractivePhoto
                      src={lodge.photos.landscape3}
                      alt={`${lodge.name} 風景4`}
                      aspectRatio="aspect-[4/3]"
                      sizes="100vw"
                      delay={0.5}
                    />
                  </div>
                </>
              ) : (
                lodge.photos.portrait2 && (
                  /* 3枚目の縦写真 - 全幅 */
                  <div className="mb-20 md:mb-24 w-full px-0">
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
                <div className="flex justify-center mt-24 md:mt-28 lg:mt-32 mb-8 md:mb-12">
                  <Link href={lodge.link}>
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "rgb(17, 24, 39)" }}
                      whileTap={{ scale: 0.95 }}
                      className="
                        group
                        inline-flex items-center gap-3
                        px-12 py-6 md:px-10 md:py-5
                        border-2 md:border border-gray-900
                        rounded-full
                        text-gray-900
                        font-light
                        tracking-[0.2em]
                        transition-all duration-500
                        hover:text-white
                        hover:shadow-xl
                        min-w-[240px] md:min-w-0
                        justify-center
                      "
                    >
                      <span className="text-base md:text-sm">{lodge.name}の詳細</span>
                      <ArrowRight className="w-5 h-5 md:w-4 md:h-4 group-hover:translate-x-2 transition-transform duration-500" />
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
