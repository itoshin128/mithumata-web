import { FadeInSection } from "@/components/animations/fade-in-section"
import { Users, Mountain, Heart } from "lucide-react"

export default function RecruitPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 max-w-7xl py-20">
        <FadeInSection>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-stone-900">スタッフ募集</h1>
          <p className="text-lg text-gray-700 mb-12">
            北アルプスの山荘で働きませんか？私たちと一緒に、登山者の安全で快適な山行をサポートしましょう。
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <FadeInSection delay={0.1}>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Mountain className="w-12 h-12 text-mitsumata mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">山での仕事</h3>
              <p className="text-gray-600">標高2,500m以上の自然の中で働く</p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Users className="w-12 h-12 text-mitsumata mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">仲間との出会い</h3>
              <p className="text-gray-600">全国から集まるスタッフと共に</p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Heart className="w-12 h-12 text-mitsumata mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">やりがい</h3>
              <p className="text-gray-600">登山者の笑顔が見られる仕事</p>
            </div>
          </FadeInSection>
        </div>

        <FadeInSection delay={0.4}>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">募集要項</h2>
            <p className="text-gray-600 mb-4">詳細な募集要項は準備中です。</p>
            <p className="text-gray-600">
              お問い合わせは、各山荘までご連絡ください。
            </p>
          </div>
        </FadeInSection>
      </div>
    </main>
  )
}
