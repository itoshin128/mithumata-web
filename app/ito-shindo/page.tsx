import { FadeInSection } from "@/components/animations/fade-in-section"
import { Mountain, MapPin, Calendar, BookOpen, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function ItoShindoPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 max-w-7xl py-20">
        <FadeInSection>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-stone-900">伊藤新道</h1>
          <p className="text-lg text-gray-700 mb-12">
            北アルプス黒部源流域への新しい登山道、伊藤新道の情報をご紹介します。
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <FadeInSection delay={0.1}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <Mountain className="w-12 h-12 text-mitsumata mb-4" />
              <h3 className="text-xl font-bold mb-2">ルート情報</h3>
              <p className="text-gray-600">湯俣温泉から三俣山荘へ続く登山道</p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <MapPin className="w-12 h-12 text-mitsumata mb-4" />
              <h3 className="text-xl font-bold mb-2">所要時間</h3>
              <p className="text-gray-600">湯俣山荘から三俣山荘まで約6-8時間</p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <Calendar className="w-12 h-12 text-mitsumata mb-4" />
              <h3 className="text-xl font-bold mb-2">営業期間</h3>
              <p className="text-gray-600">7月上旬〜11月上旬</p>
            </div>
          </FadeInSection>
        </div>

        {/* ルートガイドへのリンク */}
        <FadeInSection delay={0.4}>
          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-0">
              <Link
                href="/ito-shindo/takahashi-route-guide"
                className="block p-8 group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-lg bg-mitsumata/10 flex items-center justify-center flex-shrink-0 group-hover:bg-mitsumata/20 transition-colors">
                    <BookOpen className="w-8 h-8 text-mitsumata" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-stone-900 group-hover:text-mitsumata transition-colors">
                      高橋庄太郎の伊藤新道ルートガイド
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      山岳ライター・高橋庄太郎による詳細なルートガイド。
                      実際の踏破経験に基づいた、実践的な情報をお届けします。
                    </p>
                    <div className="flex items-center gap-2 text-mitsumata font-semibold group-hover:gap-3 transition-all">
                      <span>ルートガイドを見る</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </FadeInSection>

        <FadeInSection delay={0.5}>
          <div className="bg-white rounded-lg shadow-md p-8 mt-12">
            <p className="text-gray-600">その他の詳細な情報は準備中です。</p>
          </div>
        </FadeInSection>
      </div>
    </main>
  )
}
