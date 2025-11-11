import { getSeasonalTheme } from "@/lib/seasonal-theme"
import { HeroParallaxSection } from "@/components/hero/hero-parallax-section"
import { LodgeStorySection } from "@/components/lodges/lodge-story-section"
import { LatestPostsSection } from "@/components/blog/latest-posts-section"
import { FAQSection } from "@/components/faq/faq-section"
import { SeasonalBanner } from "@/components/ui/seasonal-banner"
import { WashiBackground } from "@/components/effects/washi-background"
import TreeShadowBackground from "@/components/effects/tree-shadow-background"

export default function HomePage() {
  const seasonalTheme = getSeasonalTheme()

  return (
    <main className="min-h-screen">
      <HeroParallaxSection />

      <div className="post-parallax-content relative">
        {/* post-parallax-content全体に和紙背景と木の影を適用 */}
        <div className="absolute inset-0 z-0">
          <WashiBackground intensity="strong" animated={false} />
          <TreeShadowBackground intensity="subtle" enableParallax={true} />
        </div>

        {seasonalTheme.banner?.show && (
          <div className="relative z-10">
            <div className="container mx-auto px-4 max-w-7xl py-8">
              <SeasonalBanner text={seasonalTheme.banner.text} type={seasonalTheme.banner.type} />
            </div>
          </div>
        )}

        <div id="lodges-section" className="relative z-10">
          <LodgeStorySection />
        </div>

        {/* 最新情報セクション */}
        <div className="relative z-10">
          <LatestPostsSection />
        </div>

        {/* FAQセクション */}
        <div className="relative z-10">
          <FAQSection />
        </div>
      </div>
    </main>
  )
}
