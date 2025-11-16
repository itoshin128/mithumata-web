'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HeroSection } from './sections/hero-section'
import { LodgeSection } from './sections/lodge-section'
import { InfoSection } from './sections/info-section'
import { ContactSection } from './sections/contact-section'
import { ScrollIndicator } from './scroll-indicator'
import { getLodgeTheme } from '@/lib/seasonal-theme'

export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const { scrollXProgress } = useScroll({ container: containerRef })

  // セクション定義
  const sections = [
    { id: 'hero', component: HeroSection },
    {
      id: 'mitsumata',
      component: LodgeSection,
      props: {
        lodge: 'mitsumata' as const,
        name: '三俣山荘',
        description: '北アルプス最奥、黒部源流の山小屋。\n鷲羽岳、水晶岳、三俣蓮華岳への登山基地として多くの登山者に愛されています。',
        image: '/images/lodges/mitsumata-1.jpg',
        theme: getLodgeTheme('mitsumata'),
      }
    },
    {
      id: 'suisho',
      component: LodgeSection,
      props: {
        lodge: 'suisho' as const,
        name: '水晶小屋',
        description: '標高2,986m、水晶岳直下に建つ山小屋。\n360度の大パノラマと満天の星空が広がる天空の宿。',
        image: '/images/lodges/suisho-1.jpg',
        theme: getLodgeTheme('suisho'),
      }
    },
    {
      id: 'yumata',
      component: LodgeSection,
      props: {
        lodge: 'yumata' as const,
        name: '湯俣山荘',
        description: '秘湯・湯俣温泉の畔に佇む山小屋。\n北アルプスの大自然と温泉の癒しを同時に楽しめる特別な場所。',
        image: '/images/lodges/yumata-1.jpg',
        theme: getLodgeTheme('yumata'),
      }
    },
    { id: 'info', component: InfoSection },
    { id: 'contact', component: ContactSection },
  ]

  // スクロール位置に応じて現在のセクションを更新
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const sectionWidth = container.clientWidth
      const section = Math.round(scrollLeft / sectionWidth)
      setCurrentSection(section)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* 横スクロールコンテナ */}
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-x-auto overflow-y-hidden scroll-smooth"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* セクションコンテナ */}
        <div className="flex h-screen">
          {sections.map((section, index) => {
            const Component = section.component
            return (
              <section
                key={section.id}
                className="flex-shrink-0 w-screen h-screen"
                style={{ scrollSnapAlign: 'start' }}
              >
                <Component {...(section.props || {})} />
              </section>
            )
          })}
        </div>
      </div>

      {/* スクロールインジケーター */}
      <ScrollIndicator
        totalSections={sections.length}
        currentSection={currentSection}
        scrollProgress={scrollXProgress}
      />
    </>
  )
}
