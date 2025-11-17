'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useScroll } from 'framer-motion'
import { HeroSectionV3 } from './sections/hero-section-v3'
import { TransitionSection } from './sections/transition-section'
import { LodgeSectionV3 } from './sections/lodge-section-v3'
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

  const totalSections = 8

  // セクション名
  const sectionNames = [
    'ホーム',
    '物語の始まり',
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

  // マウスホイール → 横スクロール変換（改善版）
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      // デフォルトの縦スクロールを防止
      e.preventDefault()

      // 縦スクロール量を横スクロールに変換（逆方向）
      // deltaY が正（下スクロール）→ 左へスクロール（scrollLeft を減らす）
      // スクロール速度を1.2倍にして快適に
      const delta = (e.deltaY || e.deltaX) * 1.2
      container.scrollLeft -= delta
    }

    // passive: false で preventDefault を有効化
    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [])

  // スクロール位置に応じて現在のセクションを更新（スナップなし）
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

      {/* 横スクロールコンテナ - スナップなし */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-x-auto overflow-y-hidden"
        style={{
          scrollBehavior: 'auto', // 常にautoで即座に反応
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch', // iOS対応
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* セクションコンテナ（順序を逆に、スナップ削除） */}
        <div className="flex h-full" style={{ width: `${totalSections * 100}vw` }}>
          {/* コンタクトセクション */}
          <section className="flex-shrink-0 w-screen h-full">
            <ContactSection />
          </section>

          {/* 最新情報セクション */}
          <section className="flex-shrink-0 w-screen h-full">
            <InfoSection />
          </section>

          {/* 体験セクション */}
          <section className="flex-shrink-0 w-screen h-full">
            <ExperienceSection />
          </section>

          {/* 湯俣山荘セクション */}
          <section className="flex-shrink-0 w-screen h-full">
            <LodgeSectionV3
              lodge="yumata"
              name="湯俣山荘"
              subtitle="Yumata Sanso"
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
          <section className="flex-shrink-0 w-screen h-full">
            <LodgeSectionV3
              lodge="suisho"
              name="水晶小屋"
              subtitle="Suisho Goya"
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
          <section className="flex-shrink-0 w-screen h-full">
            <LodgeSectionV3
              lodge="mitsumata"
              name="三俣山荘"
              subtitle="Mitsumata Sanso"
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

          {/* トランジションセクション - ヒーローと山荘の橋渡し */}
          <section className="flex-shrink-0 w-screen h-full">
            <TransitionSection />
          </section>

          {/* ヒーローセクション */}
          <section className="flex-shrink-0 w-screen h-full">
            <HeroSectionV3 />
          </section>
        </div>
      </div>
    </div>
  )
}
