import { FadeInSection } from "@/components/animations/fade-in-section"
import { Phone, Mail, Calendar, Users, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ReservationsPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 max-w-7xl py-20">
        <FadeInSection>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-stone-900">ご予約</h1>
          <p className="text-lg text-gray-700 mb-12">
            三俣山荘グループの宿泊予約はお電話またはメールにて承っております。
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <FadeInSection delay={0.1}>
            <Card className="h-full">
              <CardContent className="p-8">
                <Phone className="w-12 h-12 text-mitsumata mb-4" />
                <h2 className="text-2xl font-bold mb-4">電話予約</h2>
                <p className="text-gray-700 mb-4">
                  お電話にて直接ご予約を承っております。
                </p>
                <div className="space-y-2">
                  <p className="font-semibold">電話番号: 0263-XX-XXXX</p>
                  <p className="text-sm text-gray-600">受付時間: 9:00〜17:00</p>
                </div>
                <Button className="mt-6 w-full">電話をかける</Button>
              </CardContent>
            </Card>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <Card className="h-full">
              <CardContent className="p-8">
                <Mail className="w-12 h-12 text-mitsumata mb-4" />
                <h2 className="text-2xl font-bold mb-4">メール予約</h2>
                <p className="text-gray-700 mb-4">
                  メールフォームからご予約いただけます。
                </p>
                <div className="space-y-2">
                  <p className="font-semibold">メールアドレス:</p>
                  <p className="text-sm text-gray-600 break-all">info@mitsumatasanso.com</p>
                </div>
                <Button className="mt-6 w-full" variant="outline">メールで予約</Button>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>

        <FadeInSection delay={0.3}>
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Info className="w-6 h-6 text-mitsumata" />
                予約時の注意事項
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-mitsumata" />
                    営業期間
                  </h3>
                  <p className="text-gray-700 ml-7">7月上旬〜11月上旬（山荘により異なります）</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5 text-mitsumata" />
                    予約について
                  </h3>
                  <ul className="text-gray-700 space-y-2 ml-7">
                    <li>• 週末・祝日は混雑が予想されますので、お早めのご予約をお勧めします。</li>
                    <li>• キャンセルの場合は、必ず事前にご連絡ください。</li>
                    <li>• 天候により登山計画が変更になる場合がございます。</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">各山荘の連絡先</h3>
                  <div className="space-y-3 ml-7">
                    <div>
                      <p className="font-semibold text-mitsumata">三俣山荘</p>
                      <p className="text-gray-600 text-sm">電話: 0263-XX-XXXX</p>
                    </div>
                    <div>
                      <p className="font-semibold text-suisho">水晶小屋</p>
                      <p className="text-gray-600 text-sm">電話: 0263-XX-XXXX</p>
                    </div>
                    <div>
                      <p className="font-semibold text-yumata">湯俣山荘</p>
                      <p className="text-gray-600 text-sm">電話: 0263-XX-XXXX</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInSection>

        <FadeInSection delay={0.4}>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
            <h3 className="font-bold text-lg mb-3">キャンセルポリシー</h3>
            <p className="text-gray-700">
              天候不良等やむを得ない事情によるキャンセルを除き、キャンセル料が発生する場合がございます。<br />
              詳しくは各山荘までお問い合わせください。
            </p>
          </div>
        </FadeInSection>
      </div>
    </main>
  )
}
