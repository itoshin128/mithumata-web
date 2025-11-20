import { FadeInSection } from "@/components/animations/fade-in-section"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, Tag } from "lucide-react"

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 max-w-7xl py-20">
        <FadeInSection>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-stone-900">ブログ</h1>
          <p className="text-lg text-gray-700 mb-12">
            三俣山荘グループからの最新情報、山の様子、登山レポートなどをお届けします。
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* サンプル記事カード */}
          {[1, 2, 3].map((index) => (
            <FadeInSection key={index} delay={index * 0.1}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-stone-200 to-stone-300 rounded-lg mb-4" />
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>2025.01.15</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      <span>登山情報</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">記事準備中</h3>
                  <p className="text-gray-600">
                    ブログ記事は現在準備中です。近日公開予定となっております。
                  </p>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.5}>
          <div className="bg-white rounded-lg shadow-md p-8 mt-12 text-center">
            <p className="text-gray-600">
              コンテンツは準備中です。最新の山の情報や登山レポートを順次公開してまいります。
            </p>
          </div>
        </FadeInSection>
      </div>
    </main>
  )
}
