import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { FloatingReservationButton } from "@/components/ui/floating-reservation-button"
import "./globals.css"

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
})

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-noto-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "三俣山荘グループ | 北アルプス最奥、黒部源流の三つの山荘",
  description:
    "三俣山荘・水晶小屋・湯俣山荘。北アルプスの最奥地、標高2,500m以上に位置する山小屋グループ。山の広さと深さへの入口となる場所。",
  keywords: ["三俣山荘", "水晶小屋", "湯俣山荘", "北アルプス", "黒部源流", "山小屋", "登山", "裏銀座"],
  authors: [{ name: "三俣山荘グループ" }],
  openGraph: {
    title: "三俣山荘グループ | 北アルプス最奥、黒部源流の三つの山荘",
    description: "三俣山荘・水晶小屋・湯俣山荘。北アルプスの最奥地、標高2,500m以上に位置する山小屋グループ。",
    type: "website",
    locale: "ja_JP",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${notoSerifJP.variable} ${notoSansJP.variable}`}>
      <body className="font-serif antialiased">
        {/* アクセシビリティ: スキップリンク */}
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
        <Analytics />
      </body>
    </html>
  )
}
