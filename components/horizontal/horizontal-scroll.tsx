'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useScroll } from 'framer-motion'
import { HeroSectionV2 } from './sections/hero-section-v2'
import { LodgeSectionV2 } from './sections/lodge-section-v2'
import { ExperienceSection } from './sections/experience-section'
import { InfoSection } from './sections/info-section'
import { ContactSection } from './sections/contact-section'
import { Navigation } from './navigation'
import { ProgressBar } from './progress-bar'
import { getLodgeTheme } from '@/lib/seasonal-theme'

export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const { scrollXProgress } = useScroll({ container: containerRef })

  const totalSections = 7

  // セクション名
  const sectionNames = [
    'ホーム',
    '三俣山荘',
    '水晶小屋',
    '湯俣山荘',
    '体験',
    '最新情報',
    'お問い合わせ',
  ]

  // 最初に右端にスクロール（左スクロールを開始位置にする）
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 右端にスクロール
    container.scrollLeft = container.scrollWidth - container.clientWidth
  }, [])

  // スクロール位置に応じて現在のセクションを更新（逆順）
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const maxScroll = container.scrollWidth - container.clientWidth
      const sectionWidth = container.clientWidth
      // 逆方向にカウント
      const section = Math.round((maxScroll - scrollLeft) / sectionWidth)
      setCurrentSection(section)
    }

    container.addEventListener('scroll', handleScroll)
    handleScroll() // 初期値を設定
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // ナビゲーションハンドラー
  const handleNavigate = useCallback((index: number) => {
    const container = containerRef.current
    if (!container) return

    const sectionWidth = container.clientWidth
    const maxScroll = container.scrollWidth - container.clientWidth
    // 逆順なので maxScroll から引く
    const targetScroll = maxScroll - index * sectionWidth

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    })
  }, [])

  return (
    <div className="w-screen h-screen overflow-hidden">
      {/* プログレスバー */}
      <ProgressBar scrollProgress={scrollXProgress} />

      {/* ナビゲーション */}
      <Navigation
        totalSections={totalSections}
        currentSection={currentSection}
        onNavigate={handleNavigate}
        sectionNames={sectionNames}
      />

      {/* 横スクロールコンテナ */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-x-auto overflow-y-hidden"
        style={{
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* セクションコンテナ（順序を逆に） */}
        <div className="flex h-full" style={{ width: `${totalSections * 100}vw` }}>
          {/* コンタクトセクション */}
          <section
            className="flex-shrink-0 w-screen h-full"
            style={{ scrollSnapAlign: 'start' }}
          >
            <ContactSection />
          </section>

          {/* 最新情報セクション */}
          <section
            className="flex-shrink-0 w-screen h-full"
            style={{ scrollSnapAlign: 'start' }}
          >
            <InfoSection />
          </section>

          {/* 体験セクション */}
          <section
            className="flex-shrink-0 w-screen h-full"
            style={{ scrollSnapAlign: 'start' }}
          >
            <ExperienceSection />
          </section>

          {/* 湯俣山荘セクション */}
          <section
            className="flex-shrink-0 w-screen h-full"
            style={{ scrollSnapAlign: 'start' }}
          >
            <LodgeSectionV2
              lodge="yumata"
              name="湯俣山荘"
              description="秘湯・湯俣温泉の畔に佇む山小屋。北アルプスの大自然と温泉の癒しを同時に楽しめる特別な場所。"
              image="/images/lodges/yumata-1.jpg"
              elevation="標高 1,580m"
              features={[
                '天然温泉完備',
                '湯俣川沿いの静寂',
                '登山基地として最適',
              ]}
              theme={getLodgeTheme('yumata')}
            />
          </section>

          {/* 水晶小屋セクション */}
          <section
            className="flex-shrink-0 w-screen h-full"
            style={{ scrollSnapAlign: 'start' }}
          >
            <LodgeSectionV2
              lodge="suisho"
              name="水晶小屋"
              description="標高2,986m、水晶岳直下に建つ山小屋。360度の大パノラマと満天の星空が広がる天空の宿。"
              image="/images/lodges/suisho-1.jpg"
              elevation="標高 2,986m"
              features={[
                '360度の大パノラマ',
                '満天の星空',
                '水晶岳まで徒歩1時間',
              ]}
              theme={getLodgeTheme('suisho')}
            />
          </section>

          {/* 三俣山荘セクション */}
          <section
            className="flex-shrink-0 w-screen h-full"
            style={{ scrollSnapAlign: 'start' }}
          >
            <LodgeSectionV2
              lodge="mitsumata"
              name="三俣山荘"
              description="北アルプス最奥、黒部源流の山小屋。鷲羽岳、水晶岳、三俣蓮華岳への登山基地として多くの登山者に愛されています。"
              image="/images/lodges/mitsumata-1.jpg"
              elevation="標高 2,550m"
              features={[
                '黒部源流の絶景',
                '三俣蓮華岳への玄関口',
                '充実の山小屋設備',
              ]}
              theme={getLodgeTheme('mitsumata')}
            />
          </section>

          {/* ヒーローセクション */}
          <section
            className="flex-shrink-0 w-screen h-full"
            style={{ scrollSnapAlign: 'start' }}
          >
            <HeroSectionV2 />
          </section>
        </div>
      </div>
    </div>
  )
}
