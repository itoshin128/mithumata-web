'use client'

import { useState, useEffect } from 'react'

export interface SectionConfig {
  id: string
  label: string
}

/**
 * 現在表示されているセクションを検出するhook
 * スクロール位置に基づいて最も近いセクションを判定
 */
export function useActiveSection(sections: SectionConfig[]) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '')

  useEffect(() => {
    const handleScroll = () => {
      // 現在のスクロール位置（ビューポートの中央）
      const scrollPosition = window.scrollY + window.innerHeight / 2

      // 各セクションの位置を取得し、最も近いものを見つける
      let closestSection = sections[0]?.id || ''
      let closestDistance = Infinity

      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (!element) return

        const rect = element.getBoundingClientRect()
        const elementTop = rect.top + window.scrollY
        const elementCenter = elementTop + rect.height / 2

        // スクロール位置とセクション中央の距離
        const distance = Math.abs(scrollPosition - elementCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestSection = section.id
        }
      })

      setActiveSection(closestSection)
    }

    // 初期実行
    handleScroll()

    // スクロールイベントリスナー
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sections])

  return activeSection
}
