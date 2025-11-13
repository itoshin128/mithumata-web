"use client"

import Link from "next/link"
import { Mountain, Mail, Phone, MapPin, ArrowRight, Send } from "lucide-react"

const footerLinks = {
  山荘情報: [
    { label: "三俣山荘", href: "/lodges/mitsumata" },
    { label: "水晶小屋", href: "/lodges/suisho" },
    { label: "湯俣山荘", href: "/lodges/yumata" },
  ],
  情報: [
    { label: "コラム・お知らせ", href: "/blog" },
    { label: "アクセス", href: "/access" },
    { label: "よくあるご質問", href: "/faq" },
  ],
  活動: [
    { label: "道直し活動", href: "/trail-maintenance" },
    { label: "伊藤新道", href: "/itoshindo" },
    { label: "湯俣川ネイチャーフィールド", href: "/yumata-field" },
  ],
  その他: [
    { label: "お問い合わせ", href: "/contact" },
    { label: "プライバシーポリシー", href: "/privacy" },
    { label: "サイトマップ", href: "/sitemap" },
  ],
}

export function Footer() {
  return (
    <footer className="relative z-30 overflow-hidden bg-gradient-to-b from-stone-50 via-stone-50 to-stone-100 text-stone-700">
      {/* 山のシルエット装飾 - 背景 */}
      <div className="absolute inset-x-0 top-0 h-32 md:h-40 opacity-[0.03] pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 L150,20 L300,45 L450,10 L600,35 L750,15 L900,40 L1050,25 L1200,50 L1200,120 L0,120 Z"
            fill="currentColor"
            className="text-stone-900"
          />
          <path
            d="M0,80 L200,50 L400,70 L600,45 L800,65 L1000,55 L1200,75 L1200,120 L0,120 Z"
            fill="currentColor"
            className="text-stone-800 opacity-60"
          />
        </svg>
      </div>

      {/* 繊細な装飾的な区切り線 */}
      <div className="absolute top-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
        <div className="h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent mt-px" />
      </div>

      {/* CTAセクション - 予約とお問い合わせ */}
      <div className="relative border-b border-stone-200/50">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* 予約CTA */}
            <Link
              href="/lodges"
              className="group relative overflow-hidden bg-gradient-to-br from-stone-800 to-stone-900 hover:from-stone-900 hover:to-black text-stone-50 rounded-lg transition-all duration-500 shadow-lg hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="relative px-8 py-10 md:py-12 flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-sans">Reservation</p>
                  <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-wide">宿泊予約</h3>
                  <p className="text-sm text-stone-300 font-serif mt-3">山荘でのひとときをご予約ください</p>
                </div>
                <ArrowRight className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0 transform group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </Link>

            {/* お問い合わせCTA */}
            <Link
              href="/contact"
              className="group relative overflow-hidden bg-white hover:bg-stone-50 border-2 border-stone-200 hover:border-stone-300 text-stone-900 rounded-lg transition-all duration-500 shadow-sm hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-100/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <div className="relative px-8 py-10 md:py-12 flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-sans">Contact</p>
                  <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-wide">お問い合わせ</h3>
                  <p className="text-sm text-stone-600 font-serif mt-3">ご質問・ご相談はこちらから</p>
                </div>
                <Send className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* メインフッター */}
      <div className="relative">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* ブランド情報 */}
            <div className="lg:col-span-5 space-y-8 md:space-y-10">
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 md:w-14 md:h-14">
                    <div className="absolute inset-0 bg-gradient-to-br from-stone-600 to-stone-800 rounded-xl rotate-3 opacity-20" />
                    <div className="relative w-full h-full bg-gradient-to-br from-stone-600 via-stone-700 to-stone-900 rounded-xl flex items-center justify-center shadow-lg">
                      <Mountain className="w-6 h-6 md:w-7 md:h-7 text-stone-50" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-serif font-medium text-xl md:text-2xl text-stone-900 block leading-tight tracking-wide">
                      三俣山荘グループ
                    </h2>
                    <p className="text-xs text-stone-500 tracking-[0.2em] font-sans mt-1 uppercase">
                      Mitsumata Sanso Group
                    </p>
                  </div>
                </div>
                <div className="pl-1">
                  <p className="text-sm md:text-base leading-relaxed text-stone-600 font-serif">
                    北アルプス最奥、黒部源流に位置する三つの山荘。
                    <br />
                    標高2,500m以上、原始と変わらぬ生態系が息づく場所。
                    <br />
                    山の広さと深さへの、入口となる場所。
                  </p>
                </div>
              </div>

              {/* 連絡先 */}
              <div className="space-y-4 pl-1">
                <h3 className="text-xs uppercase tracking-[0.2em] text-stone-500 font-sans mb-5">Contact Information</h3>
                <div className="space-y-4">
                  <a
                    href="tel:0263-XX-XXXX"
                    className="flex items-start gap-4 group cursor-pointer hover:translate-x-1 transition-transform duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg bg-stone-100 group-hover:bg-stone-800 flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                      <Phone className="w-4 h-4 text-stone-600 group-hover:text-stone-50 transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 mb-0.5 font-sans">電話</p>
                      <p className="text-sm text-stone-700 group-hover:text-stone-900 transition-colors font-serif">
                        0263-XX-XXXX
                      </p>
                    </div>
                  </a>
                  <a
                    href="mailto:info@mitsumatasanso.com"
                    className="flex items-start gap-4 group cursor-pointer hover:translate-x-1 transition-transform duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg bg-stone-100 group-hover:bg-stone-800 flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                      <Mail className="w-4 h-4 text-stone-600 group-hover:text-stone-50 transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 mb-0.5 font-sans">メール</p>
                      <p className="text-sm text-stone-700 group-hover:text-stone-900 transition-colors font-serif">
                        info@mitsumatasanso.com
                      </p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4 group">
                    <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-stone-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 mb-0.5 font-sans">所在地</p>
                      <p className="text-sm text-stone-700 font-serif">長野県 北アルプス</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* リンクセクション */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
                {Object.entries(footerLinks).map(([category, links]) => (
                  <div key={category}>
                    <h3 className="font-serif font-medium text-stone-900 mb-6 text-sm md:text-base tracking-wide relative inline-block">
                      {category}
                      <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-stone-800 to-transparent" />
                    </h3>
                    <ul className="space-y-3.5">
                      {links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-sm text-stone-600 hover:text-stone-900 transition-all duration-300 inline-flex items-center gap-2 font-serif group"
                          >
                            <span className="relative">
                              {link.label}
                              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-stone-900 transition-all duration-300 group-hover:w-full" />
                            </span>
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 装飾的な区切り線 */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-300/50 to-transparent h-px" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-400/30 to-transparent h-px translate-y-px" />
      </div>

      {/* コピーライト */}
      <div className="relative bg-gradient-to-b from-stone-50 to-stone-100">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <p className="text-xs text-stone-500 font-sans tracking-wide order-2 md:order-1">
              &copy; 2025 三俣山荘グループ. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs order-1 md:order-2">
              <Link
                href="/privacy"
                className="text-stone-500 hover:text-stone-900 transition-colors font-sans tracking-wide"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/sitemap"
                className="text-stone-500 hover:text-stone-900 transition-colors font-sans tracking-wide"
              >
                サイトマップ
              </Link>
              <p className="flex items-center gap-2 text-stone-500 font-sans">
                <span>Design by</span>
                <span className="text-stone-700 font-medium">Shinya</span>
              </p>
            </div>
          </div>
        </div>

        {/* 最下部の微細な装飾 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200 opacity-50" />
      </div>
    </footer>
  )
}
