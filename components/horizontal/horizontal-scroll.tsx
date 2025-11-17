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

  // 地形メタファー: 標高に応じたスクロール速度
  const terrainSpeed = {
    0: 1.0,   // ヒーロー: 平地
    1: 0.8,   // トランジション: 登り始め
    2: 0.7,   // 三俣: 急登（標高2,550m）
    3: 0.6,   // 水晶: 最高地点（標高2,986m）
    4: 0.9,   // 湯俣: 下り（標高1,580m）
    5: 1.1,   // 体験: 平地
    6: 1.0,   // 情報: 平地
    7: 1.2,   // お問い合わせ: ゴール
  }

  // マグネティックスナップの設定
  const magneticSnapConfig = {
    threshold: 0.3,        // セクション境界の30%以内で発動
    strengthDefault: 0.4,  // デフォルトの引力
    strengthMountains: 0.6, // 山荘セクションは強めに（2,3,4）
    duration: 300,
  }

  // 慣性スクロール → 横スクロール変換（極限の洗練版）
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let velocity = 0
    let animationId: number | null = null
    let lastScrollTime = Date.now()

    const friction = 0.92        // 減速率
    const minVelocity = 0.02     // 最小速度閾値

    const getCurrentSection = () => {
      const scrollLeft = container.scrollLeft
      const maxScroll = container.scrollWidth - container.clientWidth
      const sectionWidth = container.clientWidth
      // 逆方向カウント
      return Math.floor((maxScroll - scrollLeft) / sectionWidth)
    }

    const getDistanceToNearestBoundary = () => {
      const scrollLeft = container.scrollLeft
      const maxScroll = container.scrollWidth - container.clientWidth
      const sectionWidth = container.clientWidth
      const currentScrollInSection = (maxScroll - scrollLeft) % sectionWidth
      const distanceToPrev = currentScrollInSection
      const distanceToNext = sectionWidth - currentScrollInSection
      return Math.min(distanceToPrev, distanceToNext)
    }

    const getMagneticStrength = (section: number) => {
      // 山荘セクション（2,3,4）は強めのマグネット
      if (section >= 2 && section <= 4) {
        return magneticSnapConfig.strengthMountains
      }
      return magneticSnapConfig.strengthDefault
    }

    const applyMagneticSnap = () => {
      const sectionWidth = container.clientWidth
      const distanceToBoundary = getDistanceToNearestBoundary()
      const threshold = sectionWidth * magneticSnapConfig.threshold

      if (distanceToBoundary < threshold && Math.abs(velocity) < 2) {
        const currentSection = getCurrentSection()
        const strength = getMagneticStrength(currentSection)

        // 境界に向かって引力を適用
        const scrollLeft = container.scrollLeft
        const maxScroll = container.scrollWidth - container.clientWidth
        const currentScrollInSection = (maxScroll - scrollLeft) % sectionWidth

        if (currentScrollInSection < sectionWidth / 2) {
          // 前のセクション境界に引き寄せ
          velocity += strength
        } else {
          // 次のセクション境界に引き寄せ
          velocity -= strength
        }
      }
    }

    const animate = () => {
      if (Math.abs(velocity) > minVelocity) {
        // 慣性を適用
        velocity *= friction

        // マグネティックスナップを適用
        applyMagneticSnap()

        // スクロール位置を更新
        container.scrollLeft -= velocity

        animationId = requestAnimationFrame(animate)
      } else {
        velocity = 0
        animationId = null
      }
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const currentTime = Date.now()
      const deltaTime = currentTime - lastScrollTime
      lastScrollTime = currentTime

      // 現在のセクションを取得
      const currentSection = getCurrentSection()
      const speedMultiplier = terrainSpeed[currentSection as keyof typeof terrainSpeed] || 1.0

      // 地形に応じた速度調整を適用
      const delta = (e.deltaY || e.deltaX) * speedMultiplier

      // 速度に加算（慣性を蓄積）
      velocity += delta * 0.05

      // 速度上限を設定（暴走防止）
      const maxVelocity = 50
      velocity = Math.max(-maxVelocity, Math.min(maxVelocity, velocity))

      // アニメーションが実行中でなければ開始
      if (animationId === null) {
        animationId = requestAnimationFrame(animate)
      }
    }

    // passive: false で preventDefault を有効化
    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      if (animationId !== null) {
        cancelAnimationFrame(animationId)
      }
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
