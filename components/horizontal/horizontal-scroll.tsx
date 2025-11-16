'use client'

import { useEffect, useRef, useState } from 'react'
import { useScroll } from 'framer-motion'
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

  const totalSections = 6

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
          {/* ヒーローセクション */}
          <section
            className="flex-shrink-0 w-screen h-screen"
            style={{ scrollSnapAlign: 'start' }}
          >
            <HeroSection />
          </section>

          {/* 三俣山荘セクション */}
          <section
            className="flex-shrink-0 w-screen h-screen"
            style={{ scrollSnapAlign: 'start' }}
          >
            <LodgeSection
              lodge="mitsumata"
              name="三俣山荘"
              description="北アルプス最奥、黒部源流の山小屋。&#10;鷲羽岳、水晶岳、三俣蓮華岳への登山基地として多くの登山者に愛されています。"
              image="/images/lodges/mitsumata-1.jpg"
              theme={getLodgeTheme('mitsumata')}
            />
          </section>

          {/* 水晶小屋セクション */}
          <section
            className="flex-shrink-0 w-screen h-screen"
            style={{ scrollSnapAlign: 'start' }}
          >
            <LodgeSection
              lodge="suisho"
              name="水晶小屋"
              description="標高2,986m、水晶岳直下に建つ山小屋。&#10;360度の大パノラマと満天の星空が広がる天空の宿。"
              image="/images/lodges/suisho-1.jpg"
              theme={getLodgeTheme('suisho')}
            />
          </section>

          {/* 湯俣山荘セクション */}
          <section
            className="flex-shrink-0 w-screen h-screen"
            style={{ scrollSnapAlign: 'start' }}
          >
            <LodgeSection
              lodge="yumata"
              name="湯俣山荘"
              description="秘湯・湯俣温泉の畔に佇む山小屋。&#10;北アルプスの大自然と温泉の癒しを同時に楽しめる特別な場所。"
              image="/images/lodges/yumata-1.jpg"
              theme={getLodgeTheme('yumata')}
            />
          </section>

          {/* 最新情報セクション */}
          <section
            className="flex-shrink-0 w-screen h-screen"
            style={{ scrollSnapAlign: 'start' }}
          >
            <InfoSection />
          </section>

          {/* コンタクトセクション */}
          <section
            className="flex-shrink-0 w-screen h-screen"
            style={{ scrollSnapAlign: 'start' }}
          >
            <ContactSection />
          </section>
        </div>
      </div>

      {/* スクロールインジケーター */}
      <ScrollIndicator
        totalSections={totalSections}
        currentSection={currentSection}
        scrollProgress={scrollXProgress}
      />
    </>
  )
}
