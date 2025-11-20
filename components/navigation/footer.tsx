import Link from "next/link"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"

const footerLinks = {
  山荘情報: [
    { label: "三俣山荘", href: "/lodges/mitsumata" },
    { label: "水晶小屋", href: "/lodges/suisho" },
    { label: "湯俣山荘", href: "/lodges/yumata" },
  ],
  情報: [
    { label: "お知らせ", href: "/news" },
    { label: "ブログ", href: "/blog" },
    { label: "交通・アクセス", href: "/access" },
    { label: "よくあるご質問", href: "/faq" },
  ],
  山域を楽しむ: [
    { label: "伊藤新道", href: "/ito-shindo" },
    { label: "湯俣川ネイチャーフィールド", href: "/yumata-nature-field" },
  ],
  その他: [
    { label: "スタッフ募集", href: "/recruit" },
    { label: "お問い合わせ", href: "/contact" },
    { label: "プライバシーポリシー", href: "/privacy" },
    { label: "サイトマップ", href: "/sitemap" },
  ],
}

export function Footer() {
  return (
    <footer className="relative z-30 bg-gradient-to-b from-[#FFFCF0] to-[#FFF5E5] text-stone-700 border-t border-stone-200/50">
      {/* 繊細な装飾的な区切り線 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-300/40 to-transparent" />

      {/* メインフッター */}
      <div className="relative">
        <div className="container mx-auto px-6 md:px-8 lg:px-16 max-w-[1400px] py-20 md:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            {/* ブランド情報と連絡先 */}
            <div className="lg:col-span-5 space-y-12 md:space-y-14">
              {/* ブランド名 */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-stone-900 leading-tight tracking-wide mb-3">
                    三俣山荘グループ
                  </h2>
                  <p className="text-xs text-stone-500 tracking-[0.25em] font-sans uppercase opacity-80">
                    Mitsumata Sanso Group
                  </p>
                </div>
                <div className="h-px w-16 bg-gradient-to-r from-stone-400 to-transparent opacity-60" />
                <p className="text-sm md:text-base leading-loose text-stone-600 font-serif max-w-md">
                  北アルプス最奥、黒部源流に位置する三つの山荘。
                  <br />
                  標高2,500m以上、原始と変わらぬ生態系が息づく場所。
                  <br />
                  山の広さと深さへの、入口となる場所。
                </p>
              </div>

              {/* 連絡先 */}
              <div className="space-y-5">
                <h3 className="text-xs uppercase tracking-[0.25em] text-stone-500 font-sans font-medium">
                  Contact
                </h3>
                <div className="space-y-5">
                  <a
                    href="tel:0263-XX-XXXX"
                    className="group flex items-center gap-4 hover:translate-x-1 transition-transform duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-stone-100/80 group-hover:bg-stone-200 flex items-center justify-center transition-all duration-300 border border-stone-200/40 group-hover:border-stone-300/60">
                      <Phone className="w-4 h-4 text-stone-600 group-hover:text-stone-800" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 mb-1 font-sans">電話</p>
                      <p className="text-sm text-stone-800 group-hover:text-stone-900 transition-colors font-serif">
                        0263-XX-XXXX
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@mitsumatasanso.com"
                    className="group flex items-center gap-4 hover:translate-x-1 transition-transform duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-stone-100/80 group-hover:bg-stone-200 flex items-center justify-center transition-all duration-300 border border-stone-200/40 group-hover:border-stone-300/60">
                      <Mail className="w-4 h-4 text-stone-600 group-hover:text-stone-800" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 mb-1 font-sans">メール</p>
                      <p className="text-sm text-stone-800 group-hover:text-stone-900 transition-colors font-serif break-all">
                        info@mitsumatasanso.com
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-stone-100/80 flex items-center justify-center border border-stone-200/40">
                      <MapPin className="w-4 h-4 text-stone-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500 mb-1 font-sans">所在地</p>
                      <p className="text-sm text-stone-800 font-serif">長野県 北アルプス</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* リンクセクション */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 lg:gap-10">
                {Object.entries(footerLinks).map(([category, links]) => (
                  <div key={category} className="space-y-6">
                    <h3 className="font-serif font-medium text-stone-900 text-base md:text-lg tracking-wide relative pb-3">
                      {category}
                      <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-stone-700 via-stone-500 to-transparent opacity-60" />
                    </h3>
                    <ul className="space-y-4">
                      {links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-sm text-stone-600 hover:text-stone-900 transition-all duration-300 inline-flex items-start gap-2.5 font-serif group leading-relaxed"
                          >
                            <span className="relative">
                              {link.label}
                              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-stone-900 transition-all duration-300 group-hover:w-full" />
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-70 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0 mt-0.5" />
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
      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-300/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-400/20 to-transparent translate-y-px" />
      </div>

      {/* コピーライト */}
      <div className="relative bg-[#FFF9EE]/80">
        <div className="container mx-auto px-6 md:px-8 lg:px-16 max-w-[1400px] py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6">
            <p className="text-xs text-stone-500 font-sans tracking-wide order-2 md:order-1">
              &copy; 2025 三俣山荘グループ. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-xs order-1 md:order-2">
              <Link
                href="/privacy"
                className="text-stone-500 hover:text-stone-900 transition-colors font-sans tracking-wide relative group"
              >
                プライバシーポリシー
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-900 transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/sitemap"
                className="text-stone-500 hover:text-stone-900 transition-colors font-sans tracking-wide relative group"
              >
                サイトマップ
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-900 transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
