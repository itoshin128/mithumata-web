'use client'

import { useState, useEffect } from 'react'

export interface SectionConfig {
  id: string
  label: string
}

/**
 * 現在表示されているセクションを検出するhook
 * Intersection Observer APIを使用してビューポート内のセクションを監視
 */
export function useActiveSection(sections: SectionConfig[]) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '')

  useEffect(() => {
    // 各セクションの可視状態を追跡
    const visibleSections = new Map<string, number>()

    const observers: IntersectionObserver[] = []

    // 各セクションを監視
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // セクションが表示されている場合、その可視率を記録
              visibleSections.set(section.id, entry.intersectionRatio)
            } else {
              // セクションが非表示の場合、削除
              visibleSections.delete(section.id)
            }

            // 最も可視率が高いセクションをアクティブに設定
            let maxRatio = 0
            let maxSection = sections[0]?.id || ''

            visibleSections.forEach((ratio, sectionId) => {
              if (ratio > maxRatio) {
                maxRatio = ratio
                maxSection = sectionId
              }
            })

            setActiveSection(maxSection)
          })
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
          rootMargin: '-10% 0px -40% 0px', // 上部10%、下部40%をマージン
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sections])

  return activeSection
}
