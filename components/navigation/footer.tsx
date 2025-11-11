import Link from "next/link"
import { Mountain, Mail, Phone, MapPin } from "lucide-react"

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
    <footer className="relative z-30 bg-gradient-to-b from-stone-50 to-stone-100 text-stone-700 border-t border-stone-200">
      {/* 装飾的な区切り線 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />

      {/* メインフッター */}
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl py-20 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-16">
          {/* ブランド情報 */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-stone-600 to-stone-800 rounded-md flex items-center justify-center shadow-sm">
                  <Mountain className="w-5 h-5 text-stone-50" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="font-serif font-medium text-lg text-stone-900 block leading-tight tracking-wide">
                    三俣山荘グループ
                  </span>
                  <span className="text-xs text-stone-500 tracking-wider font-sans">MITSUMATA SANSO GROUP</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-stone-600 font-serif">
                北アルプス最奥、黒部源流に位置する三つの山荘。
                <br />
                山の広さと深さへの入口となる場所。
              </p>
            </div>

            {/* 連絡先 */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 group">
                <Phone
                  className="w-4 h-4 text-stone-500 mt-0.5 group-hover:text-stone-700 transition-colors"
                  strokeWidth={1.5}
                />
                <span className="text-stone-600 group-hover:text-stone-900 transition-colors">0263-XX-XXXX</span>
              </div>
              <div className="flex items-start gap-3 group">
                <Mail
                  className="w-4 h-4 text-stone-500 mt-0.5 group-hover:text-stone-700 transition-colors"
                  strokeWidth={1.5}
                />
                <span className="text-stone-600 group-hover:text-stone-900 transition-colors">
                  info@mitsumatasanso.com
                </span>
              </div>
              <div className="flex items-start gap-3 group">
                <MapPin
                  className="w-4 h-4 text-stone-500 mt-0.5 group-hover:text-stone-700 transition-colors"
                  strokeWidth={1.5}
                />
                <span className="text-stone-600 group-hover:text-stone-900 transition-colors">長野県 北アルプス</span>
              </div>
            </div>
          </div>

          {/* リンクセクション */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-serif font-medium text-stone-900 mb-5 text-sm tracking-wide">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-600 hover:text-stone-900 transition-colors inline-block font-serif relative group"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-stone-900 transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 装飾的な区切り線 */}
      <div className="h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />

      {/* コピーライト */}
      <div className="bg-stone-50">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-sans">
            <p className="tracking-wide">&copy; 2025 三俣山荘グループ. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span>Design & Development by</span>
              <span className="text-stone-700 font-medium">Shinya</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
