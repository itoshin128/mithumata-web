import { FadeInSection } from "@/components/animations/fade-in-section"
import { MapPin, Clock, Mountain, AlertTriangle, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function TakahashiRouteGuidePage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 max-w-7xl py-20">
        {/* パンくずリスト */}
        <FadeInSection>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Link href="/ito-shindo" className="hover:text-mitsumata transition-colors">
              伊藤新道
            </Link>
            <span>/</span>
            <span className="text-gray-900">高橋庄太郎のルートガイド</span>
          </div>
        </FadeInSection>

        {/* ヘッダー */}
        <FadeInSection>
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-stone-900">
              高橋庄太郎の伊藤新道ルートガイド
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              山岳ライター・高橋庄太郎による、伊藤新道の詳細なルートガイド。<br />
              実際の踏破経験に基づいた、実践的な情報をお届けします。
            </p>
          </div>
        </FadeInSection>

        {/* 基本情報カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <FadeInSection delay={0.1}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-mitsumata flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">ルート</h3>
                    <p className="text-gray-700 text-sm">湯俣山荘 → 三俣山荘</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-mitsumata flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">所要時間</h3>
                    <p className="text-gray-700 text-sm">約6〜8時間</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Mountain className="w-6 h-6 text-mitsumata flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">難易度</h3>
                    <p className="text-gray-700 text-sm">上級者向け</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>

        {/* 執筆者プロフィール */}
        <FadeInSection delay={0.4}>
          <Card className="mb-12">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-mitsumata/20 to-mitsumata/10 flex items-center justify-center flex-shrink-0">
                  <Mountain className="w-12 h-12 text-mitsumata" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">高橋庄太郎</h2>
                  <p className="text-gray-700 leading-relaxed">
                    山岳ライター、アウトドアライター。登山専門誌やアウトドア雑誌で活躍。
                    全国の山を歩き、装備のテストや山行レポートを数多く執筆。
                    実践的な情報と豊富な経験に基づく執筆に定評がある。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInSection>

        {/* ルート詳細 */}
        <FadeInSection delay={0.5}>
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-mitsumata flex items-center gap-3">
              <Info className="w-8 h-8" />
              ルート詳細
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">コース概要</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  伊藤新道は、湯俣山荘から三俣山荘へと至る登山道です。
                  北アルプス黒部源流域の核心部を通る、野性味あふれるルートとして知られています。
                </p>
                <p className="text-gray-700 leading-relaxed">
                  詳細なルート情報、地図、写真、アドバイスなどは準備中です。
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">見どころ</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-mitsumata mt-2 flex-shrink-0" />
                    <span className="text-gray-700">黒部源流の原生的な自然</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-mitsumata mt-2 flex-shrink-0" />
                    <span className="text-gray-700">変化に富んだ地形</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-mitsumata mt-2 flex-shrink-0" />
                    <span className="text-gray-700">周辺の名峰の展望</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">装備と準備</h3>
                <p className="text-gray-700 leading-relaxed">
                  詳細な装備リストと準備のアドバイスは準備中です。
                  一般的な登山装備に加え、悪路に対応できる装備が必要です。
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* 注意事項 */}
        <FadeInSection delay={0.6}>
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-4 text-amber-800">重要な注意事項</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="font-bold flex-shrink-0">•</span>
                      <span>上級者向けのルートです。十分な登山経験が必要です。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold flex-shrink-0">•</span>
                      <span>天候により危険度が大きく変わります。無理な行程は避けてください。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold flex-shrink-0">•</span>
                      <span>携帯電話は通じない区間があります。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold flex-shrink-0">•</span>
                      <span>最新の道路情報・登山道情報を必ずご確認ください。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold flex-shrink-0">•</span>
                      <span>登山計画書の提出を忘れずに。</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInSection>

        {/* お問い合わせ */}
        <FadeInSection delay={0.7}>
          <div className="bg-stone-50 rounded-lg p-8 mt-12 text-center">
            <h3 className="text-xl font-bold mb-4">詳細なルート情報について</h3>
            <p className="text-gray-700 mb-6">
              より詳しい情報やご質問は、湯俣山荘または三俣山荘までお問い合わせください。
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-mitsumata text-white rounded-lg font-semibold hover:bg-mitsumata/90 transition-colors"
            >
              お問い合わせ
            </Link>
          </div>
        </FadeInSection>
      </div>
    </main>
  )
}
