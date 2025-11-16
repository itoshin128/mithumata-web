'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingReservationButton } from "@/components/ui/floating-reservation-button"

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHorizontalPage = pathname === '/horizontal'

  // 横スクロールページの場合、bodyのoverflowを制御
  useEffect(() => {
    if (isHorizontalPage) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isHorizontalPage])

  if (isHorizontalPage) {
    // 横スクロールページの場合、Header/Footerなしで全画面表示
    return <>{children}</>
  }

  // 通常ページの場合、Header/Footerを表示
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-8 focus:py-4 focus:bg-white focus:shadow-2xl focus:border-2 focus:border-[var(--mitsumata-primary)] focus:rounded-xl font-serif tracking-[0.2em] text-sm focus:text-gray-900 transition-all"
      >
        本文へスキップ
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <FloatingReservationButton />
    </>
  )
}
