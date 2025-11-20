import { FadeInSection } from "@/components/animations/fade-in-section"
import { MapPin, Train, Car, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AccessPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 max-w-7xl py-20">
        <FadeInSection>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-stone-900">交通・アクセス</h1>
          <p className="text-lg text-gray-700 mb-12">
            北アルプス黒部源流域にある三俣山荘グループへのアクセス方法をご紹介します。
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* 三俣山荘 */}
          <FadeInSection delay={0.1}>
            <Card className="h-full">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-mitsumata">三俣山荘</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-mitsumata flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">新穂高温泉から</p>
                      <p className="text-gray-600">約8時間（わさび平経由）</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-mitsumata flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">高瀬ダムから</p>
                      <p className="text-gray-600">約7時間（湯俣温泉経由）</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-mitsumata flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">折立から</p>
                      <p className="text-gray-600">約6時間（双六小屋経由）</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>

          {/* 水晶小屋 */}
          <FadeInSection delay={0.2}>
            <Card className="h-full">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-suisho">水晶小屋</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-suisho flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">三俣山荘から</p>
                      <p className="text-gray-600">約3時間</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-suisho flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">新穂高温泉から</p>
                      <p className="text-gray-600">約11時間（三俣山荘経由）</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>

          {/* 湯俣山荘 */}
          <FadeInSection delay={0.3}>
            <Card className="h-full">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-yumata">湯俣山荘</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-yumata flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">高瀬ダムから</p>
                      <p className="text-gray-600">約4時間</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-yumata flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">七倉山荘から</p>
                      <p className="text-gray-600">約5時間</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>

          {/* 公共交通機関 */}
          <FadeInSection delay={0.4}>
            <Card className="h-full">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">公共交通機関</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Train className="w-5 h-5 text-mitsumata flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">電車</p>
                      <p className="text-gray-600">JR松本駅から路線バスで約2時間</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Car className="w-5 h-5 text-mitsumata flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">車</p>
                      <p className="text-gray-600">
                        松本ICから約1時間30分<br />
                        各登山口に駐車場あり
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>

        <FadeInSection delay={0.5}>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">ご注意</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• 登山道は天候により通行止めになることがあります。</li>
                  <li>• 営業期間は7月上旬〜11月上旬です。</li>
                  <li>• 詳細なルート情報は各山荘にお問い合わせください。</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </main>
  )
}
