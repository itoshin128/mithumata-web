'use client'

import { useState, useEffect } from 'react'

export interface SectionConfig {
  id: string
  label: string
}

/**
 * 現在表示されているセクションを検出するhook
 * ビューポート上部に最も近いセクションをアクティブとして判定
 */
export function useActiveSection(sections: SectionConfig[]) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '')

  useEffect(() => {
    const handleScroll = () => {
      // ビューポートの上部から少し下の位置（ヘッダーを考慮）
      const scrollPosition = window.scrollY + 100

      // 現在のスクロール位置を過ぎたセクションのうち、最後のものを取得
      let newActiveSection = sections[0]?.id || ''

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section.id)

        if (!element) continue

        const rect = element.getBoundingClientRect()
        const elementTop = rect.top + window.scrollY

        // セクションの開始位置がスクロール位置を過ぎていたら、そのセクションをアクティブに
        if (elementTop <= scrollPosition) {
          newActiveSection = section.id
          break
        }
      }

      setActiveSection(newActiveSection)
    }

    // 初期実行
    handleScroll()

    // スクロールイベントリスナー（デバウンス付き）
    let timeoutId: NodeJS.Timeout
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 50)
    }

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true })

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', debouncedHandleScroll)
    }
  }, [sections])

  return activeSection
}
