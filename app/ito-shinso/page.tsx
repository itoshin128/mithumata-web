import { FadeInSection } from "@/components/animations/fade-in-section"
import { Mountain, MapPin, Calendar } from "lucide-react"

export default function ItoShinsoPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 max-w-7xl py-20">
        <FadeInSection>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-stone-900">伊藤新荘</h1>
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

        <FadeInSection delay={0.4}>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-600">詳細な情報は準備中です。</p>
          </div>
        </FadeInSection>
      </div>
    </main>
  )
}
