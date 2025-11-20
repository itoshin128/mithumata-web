import { FadeInSection } from "@/components/animations/fade-in-section"
import { Leaf, Fish, Compass, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function YumataNatureFieldPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 max-w-7xl py-20">
        <FadeInSection>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-stone-900">
            湯俣川ネイチャーフィールド
          </h1>
          <p className="text-lg text-gray-700 mb-12 leading-relaxed">
            湯俣川流域は、手つかずの自然が残る特別なエリアです。<br />
            渓流釣り、沢登り、自然観察など、様々な楽しみ方ができる山のフィールドをご紹介します。
          </p>
        </FadeInSection>

        {/* 特徴カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FadeInSection delay={0.1}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-yumata/10 mx-auto mb-4 flex items-center justify-center">
                  <Fish className="w-8 h-8 text-yumata" />
                </div>
                <h3 className="text-xl font-bold mb-2">渓流釣り</h3>
                <p className="text-gray-600">イワナが生息する清流での釣りを楽しめます</p>
              </CardContent>
            </Card>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-yumata/10 mx-auto mb-4 flex items-center justify-center">
                  <Compass className="w-8 h-8 text-yumata" />
                </div>
                <h3 className="text-xl font-bold mb-2">沢登り</h3>
                <p className="text-gray-600">美しい渓谷を遡る冒険的な体験</p>
              </CardContent>
            </Card>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-yumata/10 mx-auto mb-4 flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-yumata" />
                </div>
                <h3 className="text-xl font-bold mb-2">自然観察</h3>
                <p className="text-gray-600">豊かな植生と野生動物との出会い</p>
              </CardContent>
            </Card>
          </FadeInSection>

          <FadeInSection delay={0.4}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-yumata/10 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-yumata" />
                </div>
                <h3 className="text-xl font-bold mb-2">ガイドツアー</h3>
                <p className="text-gray-600">地元ガイドによる安全なツアー</p>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>

        {/* エリア紹介 */}
        <FadeInSection delay={0.5}>
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-yumata">フィールドについて</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                湯俣川は、北アルプスの山々から流れ出る清流で、原生的な自然環境が色濃く残る特別なエリアです。
                湯俣山荘を拠点に、様々なアクティビティを楽しむことができます。
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                渓流釣りでは、透き通った水の中を泳ぐイワナを狙うことができ、
                沢登りでは滝や淵を越えながら源流を目指す冒険的な体験が待っています。
              </p>
              <p className="text-gray-700 leading-relaxed">
                また、豊かな植生や野生動物との出会いも魅力のひとつ。
                四季折々の表情を見せる湯俣川流域で、山の自然を存分にお楽しみください。
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* アクセス情報 */}
        <FadeInSection delay={0.6}>
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-yumata">アクセス</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yumata mt-2 flex-shrink-0" />
                <p className="text-gray-700">拠点：湯俣山荘</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yumata mt-2 flex-shrink-0" />
                <p className="text-gray-700">高瀬ダムから徒歩約4時間</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yumata mt-2 flex-shrink-0" />
                <p className="text-gray-700">詳しいルート情報は湯俣山荘までお問い合わせください</p>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* 注意事項 */}
        <FadeInSection delay={0.7}>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-12">
            <h3 className="font-bold text-lg mb-3">ご利用にあたって</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• 沢登りや渓流釣りは経験者向けのアクティビティです。</li>
              <li>• 初めての方はガイドツアーのご利用をお勧めします。</li>
              <li>• 入漁券が必要な場合がありますので、事前にご確認ください。</li>
              <li>• 自然保護のため、ゴミは必ず持ち帰りましょう。</li>
            </ul>
          </div>
        </FadeInSection>
      </div>
    </main>
  )
}
