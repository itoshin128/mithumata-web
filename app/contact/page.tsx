import { FadeInSection } from "@/components/animations/fade-in-section"
import { Mail, Phone, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 max-w-7xl py-20">
        <FadeInSection>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-stone-900">お問い合わせ</h1>
          <p className="text-lg text-gray-700 mb-12">
            三俣山荘グループへのお問い合わせは、以下の連絡先までお願いいたします。
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <FadeInSection delay={0.1}>
            <Card className="h-full">
              <CardContent className="p-8">
                <Phone className="w-12 h-12 text-mitsumata mb-4" />
                <h3 className="text-xl font-bold mb-4">電話</h3>
                <p className="text-gray-700">0263-XX-XXXX</p>
                <p className="text-sm text-gray-500 mt-2">受付時間: 9:00〜17:00</p>
              </CardContent>
            </Card>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <Card className="h-full">
              <CardContent className="p-8">
                <Mail className="w-12 h-12 text-mitsumata mb-4" />
                <h3 className="text-xl font-bold mb-4">メール</h3>
                <p className="text-gray-700 break-all">info@mitsumatasanso.com</p>
                <p className="text-sm text-gray-500 mt-2">24時間受付</p>
              </CardContent>
            </Card>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <Card className="h-full">
              <CardContent className="p-8">
                <MapPin className="w-12 h-12 text-mitsumata mb-4" />
                <h3 className="text-xl font-bold mb-4">所在地</h3>
                <p className="text-gray-700">長野県 北アルプス</p>
                <p className="text-sm text-gray-500 mt-2">黒部源流域</p>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>

        <FadeInSection delay={0.4}>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">各山荘へのお問い合わせ</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">三俣山荘</h3>
                <p className="text-gray-600">電話: 0263-XX-XXXX</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">水晶小屋</h3>
                <p className="text-gray-600">電話: 0263-XX-XXXX</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">湯俣山荘</h3>
                <p className="text-gray-600">電話: 0263-XX-XXXX</p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </main>
  )
}
