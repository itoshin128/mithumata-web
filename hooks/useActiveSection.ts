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
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    // 各セクションを監視
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // セクションが50%以上表示されたらアクティブに
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              setActiveSection(section.id)
            }
          })
        },
        {
          threshold: [0, 0.3, 0.5, 0.7, 1.0],
          rootMargin: '-20% 0px -50% 0px', // 上部20%、下部50%をマージン
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
