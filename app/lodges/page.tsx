import { FadeInSection } from "@/components/animations/fade-in-section"
import { LodgesSection } from "@/components/lodges/lodges-section"

export default function LodgesIndexPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* ヘッダーセクション */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <FadeInSection className="text-center">
            <h1 className="text-6xl md:text-5xl sm:text-4xl font-bold mb-6 text-gray-900 text-balance">三つの山荘</h1>
            <p className="text-xl md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              北アルプス最奥、黒部源流域に位置する三つの山荘。
              <br className="hidden md:block" />
              それぞれに異なる魅力を持つ、山の広さと深さへの入口。
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* 山荘カードセクション */}
      <LodgesSection />
    </main>
  )
}
