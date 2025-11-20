import { FadeInSection } from "@/components/animations/fade-in-section"

export default function NewsPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 max-w-7xl py-20">
        <FadeInSection>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-stone-900">お知らせ</h1>
          <p className="text-lg text-gray-700 mb-12">
            三俣山荘グループからの最新情報やお知らせをお届けします。
          </p>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-600">準備中です。</p>
          </div>
        </FadeInSection>
      </div>
    </main>
  )
}
