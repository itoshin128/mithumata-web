'use client'

import { useState, useEffect } from 'react'

/**
 * ページ全体のスクロール進捗を計算するhook
 * @returns 0-100の範囲でスクロール進捗を返す
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      const totalScrollableHeight = documentHeight - windowHeight
      const currentProgress = (scrollTop / totalScrollableHeight) * 100

      setProgress(Math.min(100, Math.max(0, currentProgress)))
    }

    // 初期計算
    calculateProgress()

    // スクロールイベントをリッスン（パフォーマンスのためにthrottle）
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateProgress()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', calculateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', calculateProgress)
    }
  }, [])

  return progress
}
