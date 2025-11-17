'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { FadeInSection } from "@/components/animations/fade-in-section"
import { WashiBackground } from "@/components/effects/washi-background"
import TreeShadowBackground from "@/components/effects/tree-shadow-background"
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import { Calendar, Flower2, Train, Bus, Car, Footprints, Clock, MapPin, Plus, Minus } from 'lucide-react'
import * as Accordion from '@radix-ui/react-accordion'
import { SectionProgressBar } from '@/components/navigation/SectionProgressBar'
import { MobileSectionNav } from '@/components/navigation/MobileSectionNav'
import { SectionAnchorLinks } from '@/components/navigation/SectionAnchorLinks'
import { useActiveSection, type SectionConfig } from '@/hooks/useActiveSection'
import { useScrollProgress } from '@/hooks/useScrollProgress'

// デザインシステム - トップページ準拠の統一ルール
const STYLES = {
  // セクションタイトルの階層（トップページと完全統一）
  title: {
    hero: "text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-light leading-[1.6] tracking-[0.08em]",
    section: "text-xl md:text-2xl lg:text-3xl font-serif font-light tracking-[0.08em] leading-[1.6]",
    subsection: "text-lg md:text-xl font-serif font-light tracking-[0.04em] leading-[1.6]",
    card: "text-base md:text-lg lg:text-xl font-serif font-light tracking-[0.06em] leading-[1.6]",
    label: "text-xs sm:text-[10px] md:text-xs lg:text-sm tracking-[0.2em] sm:tracking-[0.25em] font-light font-sans uppercase",
  },
  // セクション余白（トップページと統一）
  spacing: {
    section: "py-16 md:py-32 lg:py-40",
    container: "px-6 md:px-12 lg:px-20",
    mb: {
      header: "mb-16 md:mb-20 lg:mb-24",
      content: "mb-24 md:mb-28 lg:mb-32",
    }
  },
  // テキストスタイル（トップページと統一）
  text: {
    hero: "text-base sm:text-sm md:text-base lg:text-lg leading-[1.8] sm:leading-[1.8] font-serif font-light tracking-[0.04em] sm:tracking-[0.05em]",
    body: "text-sm md:text-base text-gray-700 leading-[1.8] tracking-[0.04em] font-serif font-light",
    caption: "text-xs md:text-sm text-gray-500 font-serif font-light tracking-wider",
  }
} as const

// 装飾線コンポーネント（トップページと統一）
function SectionDivider() {
  return (
    <div className="flex items-center justify-center my-16 md:my-20 lg:my-24">
      <div className="flex items-center gap-4">
        <div className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-gray-300"></div>
        <div className="flex gap-2">
          <div className="w-2 h-2 rotate-45 bg-gray-400 opacity-40"></div>
          <div className="w-2 h-2 rotate-45 bg-gray-400 opacity-60"></div>
          <div className="w-2 h-2 rotate-45 bg-gray-400 opacity-80"></div>
        </div>
        <div className="w-12 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-gray-300"></div>
      </div>
    </div>
  )
}

// セクション定義
const SECTIONS: SectionConfig[] = [
  { id: 'hero', label: '三俣山荘' },
  { id: 'about', label: '山荘について' },
  { id: 'accommodation', label: '宿泊料金' },
  { id: 'dining', label: 'お食事' },
  { id: 'kurobe', label: '黒部源流' },
  { id: 'ito-shindo', label: '稜線ルート' },
  { id: 'access', label: 'アクセス' },
  { id: 'faq', label: 'FAQ' },
]

export default function MitsumataPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const kurobeRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const { scrollYProgress: kurobeScrollProgress } = useScroll({
    target: kurobeRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 400])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const kurobeOpacity = useTransform(kurobeScrollProgress, [0, 0.3], [1, 0])

  // ナビゲーション用のhooks
  const activeSection = useActiveSection(SECTIONS)
  const scrollProgress = useScrollProgress()

  return (
    <main className="min-h-screen bg-stone-50">
      {/* ナビゲーション */}
      <SectionProgressBar
        sections={SECTIONS}
        activeSection={activeSection}
        scrollProgress={scrollProgress}
      />
      <MobileSectionNav
        sections={SECTIONS}
        activeSection={activeSection}
        scrollProgress={scrollProgress}
      />
      {/* ヒーローセクション - 100vh フルスクリーン */}
      <section id="hero" ref={heroRef} className="relative h-screen overflow-hidden">
        {/* パラレックス背景画像 */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 w-full h-[120vh]"
        >
          <Image
            src="/images/lodges/DSCF1815.jpg"
            alt="三俣山荘"
            fill
            className="object-cover object-top"
            priority
            quality={90}
          />
          {/* グラデーションオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </motion.div>

        {/* ヒーローコンテンツ */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 h-full flex items-center justify-center"
        >
          <div className="text-center px-4 space-y-8">
            {/* メインタイトル - 縦書き風の大きな明朝体 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <h1
                className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-light text-white tracking-[0.08em]"
                style={{
                  textShadow: "0 4px 20px rgba(0,0,0,0.85), 0 2px 8px rgba(0,0,0,1)"
                }}
              >
                三俣山荘
              </h1>

              {/* サブタイトル */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex items-center justify-center gap-4"
              >
                <div className="h-[1px] w-16 bg-white/60" />
                <p
                  className="text-xl md:text-2xl font-serif font-light text-white/95 tracking-[0.2em]"
                  style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
                >
                  キャッチコピー
                </p>
                <div className="h-[1px] w-16 bg-white/60" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* スクロールインジケーター */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex flex-col items-center gap-2 cursor-pointer group opacity-70 hover:opacity-100 transition-opacity"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
              }
            }}
            role="button"
            aria-label="ラベルテキスト"
            tabIndex={0}
          >
            <div className="w-6 h-10 border-2 border-white/60 group-hover:border-white rounded-full flex items-start justify-center p-1.5 transition-colors">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-1.5 h-1.5 bg-white/80 rounded-full"
              />
            </div>
            <span className="text-white/70 text-xs font-serif tracking-[0.25em] uppercase">
              Scroll
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* 全コンテンツセクションを包む統一背景レイヤー */}
      <div className="post-hero-content relative">
        {/* 統一背景エフェクト */}
        <div className="absolute inset-0 z-0">
          <WashiBackground intensity="strong" animated={false} />
          {/* 木の影アニメーションを一時的に無効化 */}
          {/* <TreeShadowBackground intensity="subtle" enableParallax={true} /> */}
        </div>

        {/* イントロダクションセクション - 詩的なテキスト、大きな余白 */}
        <section id="about" className="relative py-20 md:py-32 lg:py-40">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl relative z-10">

          {/* センター配置のリード文 */}
          <FadeInSection>
            <div className="space-y-8 text-stone-700 text-center max-w-4xl mx-auto mb-24 md:mb-32 lg:mb-40">
              <p className="text-lg md:text-xl leading-[2.2] font-serif font-light tracking-[0.05em]">
                北アルプスの最奥部、黒部源流域に佇む山小屋。
                <br />
                槍ヶ岳、穂高連峰、そして立山を結ぶ稜線の要所として、
                <br />
                多くの登山者の憩いの場となってきました。
              </p>

              <p className="text-base md:text-lg leading-[2.2] font-serif font-light tracking-[0.05em] text-stone-600">
                昭和○年の開業以来、変わらぬ山の温もりと、
                <br />
                心を込めたおもてなしを大切にしています。
                <br />
                標高○○○○メートル、澄んだ空気と満天の星空が迎えてくれます。
              </p>

              <p className="text-base md:text-lg leading-[2.2] font-serif font-light tracking-[0.05em] text-stone-600">
                ここは、自然と人が出会う場所。
                <br />
                登山の疲れを癒し、明日への力を蓄える。
                <br />
                そんな特別な時間をお過ごしいただけます。
              </p>
            </div>
          </FadeInSection>

          {/* イラストエリア - 三俣山荘周辺の表現 */}
          <FadeInSection>
            <div>
              {/* 装飾的な上部ライン */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="flex items-center justify-center mb-12 md:mb-16"
              >
                <div className="h-[1px] w-24 md:w-32 bg-gradient-to-r from-transparent to-stone-300" />
                <div className="flex gap-2 mx-4">
                  <div className="w-1.5 h-1.5 rotate-45 bg-stone-400 opacity-40" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-stone-400 opacity-60" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-stone-400 opacity-80" />
                </div>
                <div className="h-[1px] w-24 md:w-32 bg-gradient-to-l from-transparent to-stone-300" />
              </motion.div>

              {/* イラスト配置エリア */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative max-w-5xl mx-auto"
              >
                {/* 装飾的な角のドット */}
                <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-stone-300 opacity-40" />
                <div className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-t-2 border-stone-300 opacity-40" />
                <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-b-2 border-stone-300 opacity-40" />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-stone-300 opacity-40" />

                {/* イラスト本体 */}
                <div className="relative aspect-[16/9] md:aspect-[21/9] bg-gradient-to-b from-stone-50 to-stone-100 overflow-hidden shadow-xl">
                  {/* イラストプレースホルダー - 三俣山荘の周辺イラストを配置 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4 p-8">
                      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 relative">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 border-2 border-stone-300 border-dashed rounded-full opacity-30"
                        />
                        <div className="absolute inset-4 bg-stone-200 rounded-full" />
                      </div>
                      <p className="text-sm md:text-base text-stone-500 font-serif tracking-[0.15em]">
                        三俣山荘周辺を表現したイラスト
                      </p>
                      <p className="text-xs text-stone-400 font-sans tracking-[0.2em] uppercase">
                        Illustration Area
                      </p>
                    </div>
                  </div>

                  {/* 和紙のテクスチャオーバーレイ */}
                  <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-multiply">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="washi-texture" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                          <circle cx="10" cy="10" r="1.5" fill="#8B7355" opacity="0.1"/>
                          <circle cx="50" cy="30" r="1" fill="#8B7355" opacity="0.08"/>
                          <circle cx="80" cy="60" r="1.2" fill="#8B7355" opacity="0.09"/>
                          <circle cx="30" cy="80" r="0.8" fill="#8B7355" opacity="0.07"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#washi-texture)"/>
                    </svg>
                  </div>
                </div>

                {/* キャプション */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mt-6 md:mt-8 text-xs md:text-sm text-stone-500 font-serif tracking-[0.2em]"
                >
                  北アルプスの懐に佇む山小屋
                </motion.p>
              </motion.div>

              {/* 装飾的な下部ライン */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="flex items-center justify-center mt-12 md:mt-16"
              >
                <div className="h-[1px] w-24 md:w-32 bg-gradient-to-r from-transparent to-stone-300" />
                <div className="flex gap-2 mx-4">
                  <div className="w-1.5 h-1.5 rotate-45 bg-stone-400 opacity-80" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-stone-400 opacity-60" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-stone-400 opacity-40" />
                </div>
                <div className="h-[1px] w-24 md:w-32 bg-gradient-to-l from-transparent to-stone-300" />
              </motion.div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Section Divider - Transition to visual content */}
      <div className="relative z-10">
        <SectionDivider />
      </div>

      {/* 写真セクション1 - 左寄せ大判写真 + 右側テキスト */}
      <section className="relative py-12 md:py-20 lg:py-28">{/* Photo section spacing */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* 写真 - 70% */}
            <div className="lg:col-span-7">
              <FadeInSection>
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative aspect-[4/5] overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* 展望食堂からの景色 */}
                  <Image
                    src="/images/lodges/DSCF4060.jpg"
                    alt="展望食堂からの景色"
                    fill
                    className="object-cover"
                    quality={90}
                    loading="lazy"
                  />
                </motion.div>
              </FadeInSection>
            </div>

            {/* テキスト - 30% */}
            <div className="lg:col-span-5">
              <FadeInSection delay={0.3}>
                <div className="space-y-6 max-w-prose">
                  <h3 className={`${STYLES.title.section} text-stone-800`}>
                    展望食堂からの景色
                  </h3>
                  <p className="text-base md:text-lg leading-[2] font-serif font-light text-stone-600 tracking-[0.04em]">
                    ここに説明文が入ります。ダミーテキストです。
                    サンプルテキストがここに表示されます。
                    ここに説明文が入ります。
                    ダミーテキストです。
                    サンプルテキストがここに表示されます。
                    ダミーテキストです。
                  </p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 写真セクション2 - 右寄せ大判写真 + 左側テキスト */}
      <section className="relative py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* テキスト - 30% (モバイルでは写真の下) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <FadeInSection delay={0.3}>
                <div className="space-y-6 max-w-prose">
                  <h3 className={`${STYLES.title.section} text-stone-800`}>
                    豊かな植生
                  </h3>
                  <p className="text-base md:text-lg leading-[2] font-serif font-light text-stone-600 tracking-[0.04em]">
                    ここに説明文が入ります。ダミーテキストです。
                    サンプルテキストがここに表示されます。
                    ここに説明文が入ります。
                    ダミーテキストです。
                    サンプルテキストがここに表示されます。
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 写真 - 70% */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <FadeInSection>
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative aspect-[4/5] overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* 豊かな植生 */}
                  <Image
                    src="/images/lodges/_DSF6384.jpg"
                    alt="豊かな植生"
                    fill
                    className="object-cover"
                    quality={90}
                    loading="lazy"
                  />
                </motion.div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 写真セクション3 - 左寄せ大判写真 + 右側テキスト */}
      <section className="relative py-12 md:py-20 lg:py-28">{/* Photo section spacing */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* 写真 - 70% */}
            <div className="lg:col-span-7">
              <FadeInSection>
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative aspect-[4/5] overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* スタッフの明るさ */}
                  <Image
                    src="/images/lodges/_DSF5434.jpg"
                    alt="スタッフの明るさ"
                    fill
                    className="object-cover"
                    quality={90}
                    loading="lazy"
                  />
                </motion.div>
              </FadeInSection>
            </div>

            {/* テキスト - 30% */}
            <div className="lg:col-span-5">
              <FadeInSection delay={0.3}>
                <div className="space-y-6 max-w-prose">
                  <h3 className={`${STYLES.title.section} text-stone-800`}>
                    スタッフの明るさ
                  </h3>
                  <p className="text-base md:text-lg leading-[2] font-serif font-light text-stone-600 tracking-[0.04em]">
                    ここに説明文が入ります。ダミーテキストです。
                    サンプルテキストがここに表示されます。
                    ここに説明文が入ります。
                    ダミーテキストです。
                    サンプルテキストがここに表示されます。
                    ダミーテキストです。
                  </p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider - Transition to pricing */}
      <div className="relative z-10">
        <SectionAnchorLinks
          previousSection={{ id: 'about', label: '山荘について' }}
          nextSection={{ id: 'accommodation', label: '宿泊料金' }}
        />
      </div>

      {/* 宿泊料金セクション */}
      <section id="accommodation" className="relative py-16 md:py-24 lg:py-32">{/* Major section spacing */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          {/* セクションタイトル */}
          <FadeInSection>
            <div className="text-center mb-20 md:mb-24 space-y-6">
              <h2 className={`${STYLES.title.section} text-stone-800`}>
                宿泊料金
              </h2>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "4rem" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-[1px] bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto"
              />

              <p className="text-base md:text-lg font-serif font-light text-stone-600 tracking-[0.04em] leading-[2]">
                料金プラン
              </p>
            </div>
          </FadeInSection>

          {/* 料金カード */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
            {/* 一泊二食付きカード */}
            <FadeInSection delay={0.1}>
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white rounded-sm shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] transition-all duration-400 overflow-hidden group cursor-pointer"
                tabIndex={0}
                role="article"
                aria-label="ラベルテキスト"
              >
                {/* アクセント線 */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-mitsumata-primary/80 via-mitsumata-primary to-mitsumata-primary/80"
                  whileHover={{ height: '2px' }}
                  transition={{ duration: 0.3 }}
                />

                <div className="p-8 md:p-10 space-y-8">
                  {/* カードタイトル */}
                  <div className="space-y-4">
                    <h3 className={`${STYLES.title.card} text-stone-800 text-center font-medium`}>
                      一泊二食付き
                    </h3>

                    {/* 価格 */}
                    <div className="text-center space-y-2">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-sm md:text-base font-sans text-stone-500">¥</span>
                        <span className="text-5xl md:text-6xl font-serif font-light text-mitsumata-primary tracking-tight">
                          00,000
                        </span>
                      </div>
                      <p className="text-sm font-sans text-stone-500 tracking-wide">
                        1名様あたり
                      </p>
                    </div>
                  </div>

                  {/* 区切り線 */}
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

                  {/* 含まれる内容 */}
                  <ul className="space-y-4" role="list">
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-mitsumata-primary mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        項目テキスト
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-mitsumata-primary mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        項目テキスト
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-mitsumata-primary mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        項目テキスト
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-mitsumata-primary mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        項目テキスト
                      </span>
                    </li>
                  </ul>
                </div>

                {/* ホバー時の背景効果 */}
                <div className="absolute inset-0 bg-mitsumata-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </FadeInSection>

            {/* 素泊まりカード */}
            <FadeInSection delay={0.2}>
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white rounded-sm shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] transition-all duration-400 overflow-hidden group cursor-pointer"
                tabIndex={0}
                role="article"
                aria-label="ラベルテキスト"
              >
                {/* アクセント線 */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-stone-400/80 via-stone-400 to-stone-400/80"
                  whileHover={{ height: '2px' }}
                  transition={{ duration: 0.3 }}
                />

                <div className="p-8 md:p-10 space-y-8">
                  {/* カードタイトル */}
                  <div className="space-y-4">
                    <h3 className={`${STYLES.title.card} text-stone-800 text-center font-medium`}>
                      素泊まり
                    </h3>

                    {/* 価格 */}
                    <div className="text-center space-y-2">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-sm md:text-base font-sans text-stone-500">¥</span>
                        <span className="text-5xl md:text-6xl font-serif font-light text-stone-700 tracking-tight">
                          00,000
                        </span>
                      </div>
                      <p className="text-sm font-sans text-stone-500 tracking-wide">
                        1名様あたり
                      </p>
                    </div>
                  </div>

                  {/* 区切り線 */}
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

                  {/* 含まれる内容 */}
                  <ul className="space-y-4" role="list">
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-500 mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        項目テキスト
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-500 mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        項目テキスト
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-500 mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        項目テキスト
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-500 mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        項目テキスト
                      </span>
                    </li>
                  </ul>
                </div>

                {/* ホバー時の背景効果 */}
                <div className="absolute inset-0 bg-stone-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </FadeInSection>

            {/* テント泊カード */}
            <FadeInSection delay={0.3}>
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white rounded-sm shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] transition-all duration-400 overflow-hidden group cursor-pointer"
                tabIndex={0}
                role="article"
                aria-label="ラベルテキスト"
              >
                {/* アクセント線 */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-stone-300/80 via-stone-300 to-stone-300/80"
                  whileHover={{ height: '2px' }}
                  transition={{ duration: 0.3 }}
                />

                <div className="p-8 md:p-10 space-y-8">
                  {/* カードタイトル */}
                  <div className="space-y-4">
                    <h3 className={`${STYLES.title.card} text-stone-800 text-center font-medium`}>
                      テント泊
                    </h3>

                    {/* 価格 */}
                    <div className="text-center space-y-2">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-sm md:text-base font-sans text-stone-500">¥</span>
                        <span className="text-5xl md:text-6xl font-serif font-light text-stone-600 tracking-tight">
                          0,000
                        </span>
                      </div>
                      <p className="text-sm font-sans text-stone-500 tracking-wide">
                        1名様あたり
                      </p>
                    </div>
                  </div>

                  {/* 区切り線 */}
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

                  {/* 含まれる内容 */}
                  <ul className="space-y-4" role="list">
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        項目テキスト
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        項目テキスト
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        項目テキスト
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        項目テキスト
                      </span>
                    </li>
                  </ul>
                </div>

                {/* ホバー時の背景効果 */}
                <div className="absolute inset-0 bg-stone-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </FadeInSection>
          </div>

          {/* 注意事項 */}
          <FadeInSection delay={0.4}>
            <div className="mt-16 md:mt-20 text-center space-y-4">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-stone-300 to-transparent max-w-md mx-auto" />

              <div className="space-y-2 text-sm md:text-base font-serif font-light text-stone-600 tracking-[0.04em] leading-[2]">
                <p>※ 注意事項テキスト</p>
                <p>※ 注意事項テキスト</p>
                <p>※ 注意事項テキスト</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Section Divider - Transition to food experience */}
      <div className="relative z-10">
        <SectionAnchorLinks
          previousSection={{ id: 'accommodation', label: '宿泊料金' }}
          nextSection={{ id: 'dining', label: 'お食事' }}
        />
      </div>

      {/* 食事セクション - ビジュアル重視 */}
      {/* 導入セクション（100vh） */}
      <section id="dining" className="relative h-screen overflow-hidden">
        {/* 背景写真 */}
        <div className="absolute inset-0">
          {/* 三俣山荘の食事風景または代表的な料理の全景を示す写真を配置（温かみのある雰囲気の写真） */}
          <Image
            src="/images/placeholder.jpg"
            alt="画像の説明"
            fill
            className="object-cover"
            style={{ filter: 'brightness(0.6) saturate(0.9)' }}
            quality={90}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>

        {/* コンテンツ */}
        <div className="relative h-full flex flex-col items-center justify-center z-10">
          <FadeInSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="text-center space-y-12"
            >
              {/* タイトル */}
              <h2
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-light text-white tracking-[0.15em] leading-[1.3]"
                style={{
                  textShadow: "0 6px 60px rgba(0,0,0,0.95), 0 3px 20px rgba(0,0,0,1)"
                }}
              >
                三俣山荘の食事
              </h2>
            </motion.div>
          </FadeInSection>
        </div>
      </section>

      {/* 料理ギャラリー - スクロール展開 */}
      {/* 1品目：左寄せ大判写真 + 右側テキスト */}
      <section className="relative py-12 md:py-20 lg:py-28">{/* Food gallery spacing */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            {/* 写真 - 左寄せ */}
            <div className="lg:col-span-7">
              <FadeInSection>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-150px" }}
                  className="relative aspect-[5/4] overflow-hidden shadow-2xl"
                >
                  <motion.div
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="w-full h-full"
                  >
                    {/* 三俣山荘の名物料理のクローズアップ写真を配置（美味しそうな盛り付けの写真） */}
                    <Image
                      src="/images/placeholder.jpg"
                      alt="画像の説明"
                      fill
                      className="object-cover"
                      style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                      quality={95}
                      loading="lazy"
                    />
                  </motion.div>
                </motion.div>
              </FadeInSection>
            </div>

            {/* テキスト - 右側 */}
            <div className="lg:col-span-5">
              <FadeInSection delay={0.3}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <h3 className={`${STYLES.title.section} text-stone-800`}>
                      名物料理
                      <br />
                      料理名
                    </h3>

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "3rem" }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="h-[1px] bg-gradient-to-r from-stone-400 to-stone-200"
                    />
                  </div>

                  <p className="text-lg md:text-xl leading-[2.2] font-serif font-light text-stone-600 tracking-[0.04em]">
                    ここに説明文が入ります。ダミーテキストです。
                    サンプルテキストがここに表示されます。
                    ダミーテキストです。
                  </p>
                </motion.div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 2品目：右寄せ大判写真 + 左側テキスト */}
      <section className="relative py-8 md:py-16 lg:py-20">{/* Tightly related content */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            {/* テキスト - 左側（モバイルでは下） */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <FadeInSection delay={0.3}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <h3 className={`${STYLES.title.section} text-stone-800`}>
                      おすすめ
                      <br />
                      料理名
                    </h3>

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "3rem" }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="h-[1px] bg-gradient-to-r from-stone-400 to-stone-200"
                    />
                  </div>

                  <p className="text-lg md:text-xl leading-[2.2] font-serif font-light text-stone-600 tracking-[0.04em]">
                    ここに説明文が入ります。ダミーテキストです。
                    サンプルテキストがここに表示されます。
                    ダミーテキストです。
                  </p>
                </motion.div>
              </FadeInSection>
            </div>

            {/* 写真 - 右寄せ */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <FadeInSection>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-150px" }}
                  className="relative aspect-[5/4] overflow-hidden shadow-2xl"
                >
                  <motion.div
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="w-full h-full"
                  >
                    {/* 2品目の料理写真を配置（例：山の幸を使った一品料理や煮物など） */}
                    <Image
                      src="/images/placeholder.jpg"
                      alt="画像の説明"
                      fill
                      className="object-cover"
                      style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                      quality={95}
                      loading="lazy"
                    />
                  </motion.div>
                </motion.div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 3品目：中央配置の正方形写真 */}
      <section className="relative py-8 md:py-16 lg:py-20">{/* Tightly related content */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-5xl relative z-10">
          <div className="space-y-16 md:space-y-20">
            {/* 写真 - 中央配置 */}
            <FadeInSection>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-150px" }}
                className="relative aspect-square overflow-hidden shadow-2xl mx-auto max-w-3xl"
              >
                <motion.div
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="w-full h-full"
                >
                  {/* 季節の料理写真を配置（例：旬の山菜料理や季節ごとの特別メニュー）正方形でアートな構図 */}
                  <Image
                    src="/images/placeholder.jpg"
                    alt="画像の説明"
                    fill
                    className="object-cover"
                    style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                    quality={95}
                    loading="lazy"
                  />
                </motion.div>
              </motion.div>
            </FadeInSection>

            {/* テキスト - 中央配置 */}
            <FadeInSection delay={0.3}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center space-y-8 max-w-2xl mx-auto"
              >
                <div className="space-y-4">
                  <h3 className={`${STYLES.title.section} text-stone-800`}>
                    季節料理
                  </h3>

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "3rem" }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto"
                  />
                </div>

                <p className="text-lg md:text-xl leading-[2.2] font-serif font-light text-stone-600 tracking-[0.04em]">
                  ここに説明文が入ります。ダミーテキストです。
                  サンプルテキストがここに表示されます。
                  ダミーテキストです。
                </p>
              </motion.div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Section Divider - Transition to goods */}
      <div className="relative z-10">
        <SectionDivider />
      </div>

      {/* グッズセクション - 山荘の記憶を持ち帰る */}
      <section className="relative py-16 md:py-24 lg:py-32">{/* Major section spacing */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          {/* セクションタイトル */}
          <FadeInSection>
            <div className="text-center mb-24 md:mb-32 space-y-6">
              <h2 className={`${STYLES.title.section} text-stone-800`}>
                お土産、グッズ
              </h2>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "4rem" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-[1px] bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto"
              />

              <p className="text-xs md:text-sm text-stone-600 font-serif font-light tracking-wider max-w-2xl mx-auto">
                サブタイトルテキスト。
                <br />
                説明文がここに入ります。
              </p>
            </div>
          </FadeInSection>

          {/* グッズグリッド - それぞれのタイル画像は、山荘で提供される様々な料理や食材の写真を配置（例：朝食、夕食、デザート、お茶菓子など） */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {[
              { id: 1, name: '商品名', image: '/images/placeholder.jpg' },
              { id: 2, name: '商品名', image: '/images/placeholder.jpg' },
              { id: 3, name: '商品名', image: '/images/placeholder.jpg' },
              { id: 4, name: '商品名', image: '/images/placeholder.jpg' },
              { id: 5, name: '商品名', image: '/images/placeholder.jpg' },
              { id: 6, name: '商品名', image: '/images/placeholder.jpg' },
              { id: 7, name: '商品名', image: '/images/placeholder.jpg' },
              { id: 8, name: '商品名', image: '/images/placeholder.jpg' },
            ].map((item, index) => (
              <FadeInSection key={item.id} delay={index * 0.05}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="group relative aspect-square overflow-hidden bg-white cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
                  tabIndex={0}
                  role="button"
                  aria-label="ラベルテキスト"
                >
                  {/* 商品画像 */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ filter: 'saturate(0.8) brightness(1.05)' }}
                    quality={85}
                    loading="lazy"
                  />

                  {/* ホバー時のオーバーレイと商品名 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                    <p className="text-white text-sm md:text-base font-serif font-light tracking-[0.1em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {item.name}
                    </p>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>

          {/* 注釈 */}
          <FadeInSection delay={0.5}>
            <div className="mt-16 md:mt-20 text-center">
              <p className="text-xs md:text-sm font-sans font-light text-stone-500 tracking-[0.15em]">
                テキストがここに入ります
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Section Divider - Transition to Kurobe Genryu story */}
      <div className="relative z-10">
        <SectionAnchorLinks
          previousSection={{ id: 'dining', label: 'お食事' }}
          nextSection={{ id: 'kurobe', label: '黒部源流' }}
        />
      </div>

      {/* セクション1 - サンプルコンテンツ */}
      {/* オープニング（100vh） */}
      <section id="kurobe" ref={kurobeRef} className="relative h-screen overflow-hidden">
        {/* 背景写真 */}
        <div className="absolute inset-0">
          {/* 黒部源流の雄大な自然風景写真を配置（例：源流の清流、山々の連なり、渓谷の風景など）*/}
          <Image
            src="/images/placeholder.jpg"
            alt="画像の説明"
            fill
            className="object-cover"
            style={{ filter: 'brightness(0.5) saturate(1.1)' }}
            quality={95}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* タイトル - スクロールで透明化 */}
        <motion.div
          className="relative h-full flex items-center justify-center z-10"
          style={{
            opacity: kurobeOpacity
          }}
        >
          <FadeInSection>
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-light text-white tracking-[0.15em] leading-[1.3]"
              style={{
                textShadow: "0 6px 60px rgba(0,0,0,0.95), 0 3px 20px rgba(0,0,0,1)",
                fontFeatureSettings: "'palt' 1"
              }}
            >
              黒部源流
            </motion.h2>
          </FadeInSection>
        </motion.div>
      </section>

      {/* ストーリー展開 - 画面1：朝靄の源流 */}
      <section className="relative py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* 左側60% - 写真 */}
            <div className="lg:col-span-7">
              <FadeInSection>
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative aspect-[4/5] overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* 朝靄に包まれた黒部源流の幻想的な風景写真を配置（霧がかった静謐な渓谷の様子） */}
                  <Image
                    src="/images/placeholder.jpg"
                    alt="画像の説明"
                    fill
                    className="object-cover"
                    quality={90}
                    loading="lazy"
                  />
                </motion.div>
              </FadeInSection>
            </div>

            {/* 右側40% - テキスト */}
            <div className="lg:col-span-5">
              <FadeInSection delay={0.3}>
                <div className="space-y-6 max-w-prose">
                  <h3 className={`${STYLES.title.section} text-stone-800`}>
                    エリア名
                    <br />
                    スポット名
                  </h3>
                  <p className="text-base md:text-lg leading-[2] font-serif font-light text-stone-600 tracking-[0.04em]">
                    ダミーテキスト。
                    ここに説明文が入ります。
                    ここに説明文が入ります。
                    ダミーテキストです。
                    サンプルテキストがここに表示されます。
                    ダミーテキストです。
                  </p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative z-10">
        <SectionDivider />
      </div>

      {/* ストーリー展開 - 画面2：原生林 */}
      <section className="relative py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <div className="space-y-16 md:space-y-20">
            {/* パノラマ写真 */}
            <FadeInSection>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative aspect-[21/9] lg:aspect-[32/9] overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
              >
                {/* 原生林のパノラマ写真を配置（木漏れ日が差し込む森の中、横長のワイド構図） */}
                <Image
                  src="/images/placeholder.jpg"
                  alt="画像の説明"
                  fill
                  className="object-cover"
                  quality={90}
                  loading="lazy"
                />
              </motion.div>
            </FadeInSection>

            {/* テキスト */}
            <FadeInSection delay={0.3}>
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <h3 className={`${STYLES.title.section} text-stone-800`}>
                  スポット名
                </h3>
                <p className="text-base md:text-lg leading-[2] font-serif font-light text-stone-600 tracking-[0.04em]">
                  ここに説明文が入ります。
                  ダミーテキストです。サンプルテキストがここに表示されます。
                  ここに説明文が入ります。
                  ダミーテキストです。
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative z-10">
        <SectionDivider />
      </div>

      {/* ストーリー展開 - 画面3：清流のクローズアップ */}
      <section className="relative py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* テキスト - 左側 (モバイルでは写真の下) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <FadeInSection delay={0.3}>
                <div className="space-y-6 max-w-prose">
                  <h3 className={`${STYLES.title.section} text-stone-800`}>
                    見出し
                    <br />
                    テキスト
                  </h3>
                  <p className="text-base md:text-lg leading-[2] font-serif font-light text-stone-600 tracking-[0.04em]">
                    ここに説明文が入ります。
                    ダミーテキストです。
                    ここに説明文が入ります。
                    ダミーテキストです。
                    サンプルテキストがここに表示されます。
                    ダミーテキストです。
                    ここに説明文が入ります。
                    ダミーテキストです。
                    サンプルテキストがここに表示されます。
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 写真 - 右側 */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <FadeInSection>
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative aspect-[4/5] overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* 黒部源流の渓流や滝の縦長写真を配置（水が流れる様子、ダイナミックな構図） */}
                  <Image
                    src="/images/placeholder.jpg"
                    alt="画像の説明"
                    fill
                    className="object-cover"
                    quality={90}
                    loading="lazy"
                  />
                </motion.div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider - Transition to Ito Shindo */}
      <div className="relative z-10">
        <SectionAnchorLinks
          previousSection={{ id: 'kurobe', label: '黒部源流' }}
          nextSection={{ id: 'ito-shindo', label: '稜線ルート' }}
        />
      </div>

      {/* セクション2 - サンプルコンテンツ */}
      {/* イントロ - 80vh */}
      <section id="ito-shindo" className="relative h-[80vh] overflow-hidden">
        {/* 伊藤新道の稜線ルートの風景写真を配置（登山道や山岳風景、登山者の姿など） */}
        <Image
          src="/images/placeholder.jpg"
          alt="画像の説明"
          fill
          className="object-cover object-center"
          style={{ filter: 'saturate(0.9) brightness(0.85)' }}
          quality={90}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        <div className="relative h-full flex items-center justify-center z-10">
          <FadeInSection>
            <div className="text-center space-y-6 md:space-y-8">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-light text-white tracking-[0.15em] leading-[1.3]"
                style={{
                  textShadow: "0 6px 60px rgba(0,0,0,0.95), 0 3px 20px rgba(0,0,0,1)"
                }}
              >
                伊藤新道
              </h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "8rem" }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent mx-auto"
              />
              <p className="text-xl md:text-2xl lg:text-3xl font-serif font-light text-white/95 tracking-[0.2em]">
                稜線ルート
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 紹介テキスト - 横スクロールギャラリー */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <FadeInSection>
            <div className="max-w-3xl mx-auto mb-16 md:mb-20 space-y-8 md:space-y-10">
              <p className={`${STYLES.text.hero} text-stone-700 leading-[2.5] md:leading-[2.8]`}>
                ここに説明文が入ります。ダミーテキストです。サンプルテキストがここに表示されます。
                ダミーテキストです。サンプルテキストがここに表示されます。
              </p>
              <p className={`${STYLES.text.hero} text-stone-600 leading-[2.5] md:leading-[2.8]`}>
                ここに説明文が入ります。ダミーテキストです。サンプルテキストがここに表示されます。
                ダミーテキストです。
              </p>
            </div>
          </FadeInSection>

          {/* 横スクロールギャラリー */}
          <div className="relative mt-20 md:mt-24">
            <FadeInSection delay={0.2}>
              <p className={`${STYLES.title.label} text-stone-500 mb-8 md:mb-10 text-center`}>
                Sample Text
              </p>

              <Swiper
                modules={[FreeMode, Mousewheel]}
                spaceBetween={24}
                slidesPerView="auto"
                freeMode={{
                  enabled: true,
                  momentum: true,
                  momentumRatio: 0.5,
                }}
                mousewheel={{
                  forceToAxis: true,
                }}
                className="!overflow-visible"
                breakpoints={{
                  640: { spaceBetween: 32 },
                  1024: { spaceBetween: 40 },
                }}
              >
                {/* 各スライド画像は、伊藤新道の主要ポイントの写真を配置（例：特徴的な岩場、展望ポイント、山小屋など） */}
                {[
                  {
                    image: '/images/placeholder.jpg',
                    title: 'ポイント名',
                    elevation: '0,000m',
                    description: '説明テキスト'
                  },
                  {
                    image: '/images/placeholder.jpg',
                    title: 'ポイント名',
                    elevation: '0,000m',
                    description: '説明テキスト'
                  },
                  {
                    image: '/images/placeholder.jpg',
                    title: 'ポイント名',
                    elevation: '0,000m',
                    description: '説明テキスト'
                  },
                  {
                    image: '/images/placeholder.jpg',
                    title: 'ポイント名',
                    elevation: '0,000m',
                    description: '説明テキスト'
                  },
                ].map((point, index) => (
                  <SwiperSlide key={index} className="!w-[85vw] md:!w-[600px] lg:!w-[700px]">
                    <motion.div
                      className="relative group cursor-grab active:cursor-grabbing"
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                        <Image
                          src={point.image}
                          alt={point.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                          style={{ filter: 'saturate(0.88) brightness(0.92)' }}
                          quality={90}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                        {/* ホバー時の標高情報 */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 flex flex-col items-center justify-center text-white backdrop-blur-[2px]"
                        >
                          <div className="text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-[0.1em] mb-3">
                            {point.elevation}
                          </div>
                          <div className={`${STYLES.title.label} text-white/95`}>
                            Sample Text
                          </div>
                        </motion.div>

                        {/* 常時表示の情報 */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 text-white z-10 group-hover:opacity-0 transition-opacity duration-300">
                          <h3 className={`${STYLES.title.card} text-white mb-2 md:mb-3`}>
                            {point.title}
                          </h3>
                          <p className="text-sm md:text-base font-light tracking-[0.05em] text-white/90 leading-relaxed">
                            {point.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 情報セクション - ミニマル表現 */}
      <section className="relative py-20 md:py-28 lg:py-36">{/* Major section spacing */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-5xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <FadeInSection delay={0.1}>
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md transition-shadow hover:shadow-lg">
                    <Flower2 className="w-6 h-6 text-mitsumata-primary" />
                  </div>
                  <h3 className={`${STYLES.title.subsection} text-stone-800`}>
                    ベストシーズン
                  </h3>
                </div>
                <div className="pl-16">
                  <p className={`${STYLES.text.body} text-stone-700 leading-[2.2] md:leading-[2.4]`}>
                    ここに説明文が入ります。ダミーテキストです。
                    サンプルテキストがここに表示されます。
                  </p>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md transition-shadow hover:shadow-lg">
                    <Calendar className="w-6 h-6 text-mitsumata-primary" />
                  </div>
                  <h3 className={`${STYLES.title.subsection} text-stone-800`}>
                    営業期間
                  </h3>
                </div>
                <div className="pl-16 space-y-4 md:space-y-5">
                  <p className={`${STYLES.text.body} text-stone-700 leading-[2.2] md:leading-[2.4]`}>
                    テキストがここに入ります
                  </p>
                  <p className={`${STYLES.text.caption} text-stone-500 leading-[2] md:leading-[2.2]`}>
                    説明テキストがここに入ります。ダミーテキストです。
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Section Divider - Transition to access information */}
      <div className="relative z-10">
        <SectionAnchorLinks
          previousSection={{ id: 'ito-shindo', label: '稜線ルート' }}
          nextSection={{ id: 'access', label: 'アクセス' }}
        />
      </div>

      {/* 交通・アクセスセクション */}
      {/* ヘッダー - 50vh */}
      <section id="access" className="relative h-[50vh] overflow-hidden">
        {/* 登山道や交通手段を示す写真を配置（例：バスやタクシー、登山口の様子など） */}
        <Image
          src="/images/placeholder.jpg"
          alt="画像の説明"
          fill
          className="object-cover object-center"
          style={{ filter: 'saturate(0.7) brightness(0.8)' }}
          quality={90}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

        <div className="relative h-full flex items-center justify-center z-10">
          <FadeInSection>
            <div className="text-center space-y-6">
              <h2 className={`${STYLES.title.section} text-white`}>
                アクセス・ルート
              </h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "4rem" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto"
              />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ルート詳細 - アコーディオン形式 */}
      <section className="relative py-16 md:py-24 lg:py-32">{/* Major section spacing */}
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl relative z-10">
          {/* イントロテキスト */}
          <FadeInSection>
            <div className="text-center mb-20 md:mb-24 space-y-6">
              <p className="text-xs md:text-sm text-stone-600 font-serif font-light tracking-wider max-w-2xl mx-auto">
                ここに説明文が入ります。ダミーテキストです。
                <br />
                サンプルテキストがここに表示されます。
              </p>
            </div>
          </FadeInSection>

          {/* アコーディオン */}
          <Accordion.Root type="single" collapsible className="space-y-6">
            {/* ルート1: サンプルルート */}
            <FadeInSection delay={0.1}>
              <Accordion.Item value="route-1" className="bg-white shadow-lg hover:shadow-xl overflow-hidden group transition-all duration-300">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full px-8 md:px-12 py-8 md:py-10 flex items-center justify-between gap-6 hover:bg-stone-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-mitsumata-primary focus:ring-inset">
                    <div className="flex items-center gap-6 md:gap-8">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-mitsumata-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-7 h-7 md:w-8 md:h-8 text-mitsumata-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className={`${STYLES.title.subsection} text-stone-800 mb-2`}>
                          ルート名
                        </h3>
                        <div className="flex items-center gap-3 text-mitsumata-primary">
                          <Clock className="w-5 h-5" />
                          <span className="text-3xl md:text-4xl font-serif font-light tracking-tight">0時間</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-6 h-6 flex-shrink-0">
                      <Plus className="absolute inset-0 w-6 h-6 text-stone-300 transition-all duration-300 group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-90" strokeWidth={1.5} />
                      <Minus className="absolute inset-0 w-6 h-6 text-mitsumata-primary transition-all duration-300 group-data-[state=closed]:opacity-0 group-data-[state=closed]:-rotate-90" strokeWidth={1.5} />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-8 md:px-12 pb-10 pt-2">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                      {/* タイムライン */}
                      <div className="lg:col-span-7 space-y-8">
                        {/* ステップ1 */}
                        <div className="flex gap-6">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
                              <Train className="w-6 h-6 text-stone-600" />
                            </div>
                            <div className="w-[2px] h-full bg-gradient-to-b from-stone-300 to-transparent mt-2" />
                          </div>
                          <div className="flex-1 pb-8">
                            <h4 className="text-lg font-serif font-medium text-stone-800 mb-2">場所名</h4>
                            <p className="text-sm md:text-base font-light text-stone-600 leading-[1.8]">
                              説明テキスト
                            </p>
                          </div>
                        </div>

                        {/* ステップ2 */}
                        <div className="flex gap-6">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
                              <Bus className="w-6 h-6 text-stone-600" />
                            </div>
                            <div className="w-[2px] h-full bg-gradient-to-b from-stone-300 to-transparent mt-2" />
                          </div>
                          <div className="flex-1 pb-8">
                            <h4 className="text-lg font-serif font-medium text-stone-800 mb-2">ステップ名</h4>
                            <p className="text-sm md:text-base font-light text-stone-600 leading-[1.8]">
                              説明テキストがここに入ります
                            </p>
                          </div>
                        </div>

                        {/* ステップ3 */}
                        <div className="flex gap-6">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-mitsumata-primary/10 flex items-center justify-center">
                              <Footprints className="w-6 h-6 text-mitsumata-primary" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-serif font-medium text-stone-800 mb-2">ステップ名</h4>
                            <p className="text-sm md:text-base font-light text-stone-600 leading-[1.8] mb-3">
                              説明テキストがここに入ります
                            </p>
                            <div className="inline-block px-4 py-2 bg-stone-50 rounded-full">
                              <span className="text-sm font-light text-stone-600">タグテキスト</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 写真 */}
                      <div className="lg:col-span-5">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          viewport={{ once: true }}
                          className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-lg"
                        >
                          {/* ルート1の代表的な風景写真を配置（登山道、風景、目印となる地点など） */}
                          <Image
                            src="/images/placeholder.jpg"
                            alt="画像の説明"
                            fill
                            className="object-cover"
                            style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                            quality={90}
                            loading="lazy"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </FadeInSection>

            {/* ルート2: 高瀬ダムから */}
            <FadeInSection delay={0.2}>
              <Accordion.Item value="route-2" className="bg-white shadow-lg hover:shadow-xl overflow-hidden group transition-all duration-300">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full px-8 md:px-12 py-8 md:py-10 flex items-center justify-between gap-6 hover:bg-stone-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-mitsumata-primary focus:ring-inset">
                    <div className="flex items-center gap-6 md:gap-8">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-mitsumata-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-7 h-7 md:w-8 md:h-8 text-mitsumata-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className={`${STYLES.title.subsection} text-stone-800 mb-2`}>
                          ルート名
                        </h3>
                        <div className="flex items-center gap-3 text-mitsumata-primary">
                          <Clock className="w-5 h-5" />
                          <span className="text-3xl md:text-4xl font-serif font-light tracking-tight">0時間</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-6 h-6 flex-shrink-0">
                      <Plus className="absolute inset-0 w-6 h-6 text-stone-300 transition-all duration-300 group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-90" strokeWidth={1.5} />
                      <Minus className="absolute inset-0 w-6 h-6 text-mitsumata-primary transition-all duration-300 group-data-[state=closed]:opacity-0 group-data-[state=closed]:-rotate-90" strokeWidth={1.5} />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-8 md:px-12 pb-10 pt-2">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                      {/* タイムライン */}
                      <div className="lg:col-span-7 space-y-8">
                        {/* ステップ1 */}
                        <div className="flex gap-6">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
                              <Car className="w-6 h-6 text-stone-600" />
                            </div>
                            <div className="w-[2px] h-full bg-gradient-to-b from-stone-300 to-transparent mt-2" />
                          </div>
                          <div className="flex-1 pb-8">
                            <h4 className="text-lg font-serif font-medium text-stone-800 mb-2">場所名</h4>
                            <p className="text-sm md:text-base font-light text-stone-600 leading-[1.8]">
                              説明テキスト
                            </p>
                          </div>
                        </div>

                        {/* ステップ2 */}
                        <div className="flex gap-6">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
                              <Bus className="w-6 h-6 text-stone-600" />
                            </div>
                            <div className="w-[2px] h-full bg-gradient-to-b from-stone-300 to-transparent mt-2" />
                          </div>
                          <div className="flex-1 pb-8">
                            <h4 className="text-lg font-serif font-medium text-stone-800 mb-2">場所名</h4>
                            <p className="text-sm md:text-base font-light text-stone-600 leading-[1.8]">
                              説明テキスト
                            </p>
                          </div>
                        </div>

                        {/* ステップ3 */}
                        <div className="flex gap-6">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-mitsumata-primary/10 flex items-center justify-center">
                              <Footprints className="w-6 h-6 text-mitsumata-primary" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-serif font-medium text-stone-800 mb-2">ステップ名</h4>
                            <p className="text-sm md:text-base font-light text-stone-600 leading-[1.8] mb-3">
                              説明テキストがここに入ります
                            </p>
                            <div className="inline-block px-4 py-2 bg-stone-50 rounded-full">
                              <span className="text-sm font-light text-stone-600">タグテキスト</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 写真 */}
                      <div className="lg:col-span-5">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          viewport={{ once: true }}
                          className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-lg"
                        >
                          {/* ルート2（高瀬ダムから）の代表的な風景写真を配置（ダム、登山道、目印となる地点など） */}
                          <Image
                            src="/images/placeholder.jpg"
                            alt="画像の説明"
                            fill
                            className="object-cover"
                            style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                            quality={90}
                            loading="lazy"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </FadeInSection>

            {/* ルート2: サンプルルート */}
            <FadeInSection delay={0.3}>
              <Accordion.Item value="route-3" className="bg-white shadow-lg hover:shadow-xl overflow-hidden group transition-all duration-300">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full px-8 md:px-12 py-8 md:py-10 flex items-center justify-between gap-6 hover:bg-stone-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-mitsumata-primary focus:ring-inset">
                    <div className="flex items-center gap-6 md:gap-8">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-mitsumata-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-7 h-7 md:w-8 md:h-8 text-mitsumata-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className={`${STYLES.title.subsection} text-stone-800 mb-2`}>
                          ルート名
                        </h3>
                        <div className="flex items-center gap-3 text-mitsumata-primary">
                          <Clock className="w-5 h-5" />
                          <span className="text-3xl md:text-4xl font-serif font-light tracking-tight">0時間</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-6 h-6 flex-shrink-0">
                      <Plus className="absolute inset-0 w-6 h-6 text-stone-300 transition-all duration-300 group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-90" strokeWidth={1.5} />
                      <Minus className="absolute inset-0 w-6 h-6 text-mitsumata-primary transition-all duration-300 group-data-[state=closed]:opacity-0 group-data-[state=closed]:-rotate-90" strokeWidth={1.5} />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-8 md:px-12 pb-10 pt-2">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                      {/* タイムライン */}
                      <div className="lg:col-span-7 space-y-8">
                        {/* ステップ1 */}
                        <div className="flex gap-6">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
                              <Train className="w-6 h-6 text-stone-600" />
                            </div>
                            <div className="w-[2px] h-full bg-gradient-to-b from-stone-300 to-transparent mt-2" />
                          </div>
                          <div className="flex-1 pb-8">
                            <h4 className="text-lg font-serif font-medium text-stone-800 mb-2">場所名</h4>
                            <p className="text-sm md:text-base font-light text-stone-600 leading-[1.8]">
                              説明テキスト
                            </p>
                          </div>
                        </div>

                        {/* ステップ2 */}
                        <div className="flex gap-6">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
                              <Bus className="w-6 h-6 text-stone-600" />
                            </div>
                            <div className="w-[2px] h-full bg-gradient-to-b from-stone-300 to-transparent mt-2" />
                          </div>
                          <div className="flex-1 pb-8">
                            <h4 className="text-lg font-serif font-medium text-stone-800 mb-2">場所名</h4>
                            <p className="text-sm md:text-base font-light text-stone-600 leading-[1.8]">
                              説明テキスト
                            </p>
                          </div>
                        </div>

                        {/* ステップ3 */}
                        <div className="flex gap-6">
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-mitsumata-primary/10 flex items-center justify-center">
                              <Footprints className="w-6 h-6 text-mitsumata-primary" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-serif font-medium text-stone-800 mb-2">ステップ名</h4>
                            <p className="text-sm md:text-base font-light text-stone-600 leading-[1.8] mb-3">
                              説明テキストがここに入ります
                            </p>
                            <div className="inline-block px-4 py-2 bg-stone-50 rounded-full">
                              <span className="text-sm font-light text-stone-600">タグテキスト</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 写真 */}
                      <div className="lg:col-span-5">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          viewport={{ once: true }}
                          className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-lg"
                        >
                          {/* ルート3の代表的な風景写真を配置（登山道、風景、目印となる地点など） */}
                          <Image
                            src="/images/placeholder.jpg"
                            alt="画像の説明"
                            fill
                            className="object-cover"
                            style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                            quality={90}
                            loading="lazy"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </FadeInSection>
          </Accordion.Root>

          {/* 注意事項 */}
          <FadeInSection delay={0.4}>
            <div className="mt-20 md:mt-24 text-center space-y-6">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-stone-300 to-transparent max-w-md mx-auto" />
              <div className="space-y-3 text-sm md:text-base font-serif font-light text-stone-600 tracking-[0.04em] leading-[2]">
                <p>※ 注意事項テキスト</p>
                <p>※ 注意事項テキスト</p>
                <p>※ 注意事項テキスト</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Section Divider - Transition to FAQ */}
      <div className="relative z-10">
        <SectionAnchorLinks
          previousSection={{ id: 'access', label: 'アクセス' }}
          nextSection={{ id: 'faq', label: 'FAQ' }}
        />
      </div>

      {/* よくある質問セクション */}
      <section id="faq" className="relative py-16 md:py-32 lg:py-40">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-5xl">
          {/* Section Header - Centered */}
          <FadeInSection delay={0.1}>
            <div className="text-center mb-16 md:mb-20 lg:mb-24 max-w-3xl mx-auto">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-light mb-6 md:mb-8 tracking-[0.08em] leading-[1.6] text-balance">
                よくあるご質問
              </h2>
              <p className="text-sm md:text-base text-gray-700 leading-[1.8] tracking-[0.04em] font-serif font-light text-pretty">
                お問い合わせの多いご質問をまとめました。
                <br className="hidden md:block" />
                その他のご質問は、お気軽にお問い合わせください。
              </p>
            </div>
          </FadeInSection>

          {/* FAQ Items - Simplified Single Section */}
          <div className="space-y-12 md:space-y-16 lg:space-y-20">
            <FadeInSection delay={0.2}>
              <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Questions Accordion */}
                <Accordion.Root type="single" collapsible className="space-y-3 md:space-y-4">
                  <Accordion.Item value="faq-1" className="border-none">
                    <Accordion.Trigger className="text-left font-serif font-light text-sm md:text-base tracking-[0.04em] leading-[1.7] text-gray-900 hover:no-underline py-4 md:py-5 border-b border-gray-200 hover:border-gray-400 transition-all duration-300">
                      <span className="pr-4">質問テキスト</span>
                    </Accordion.Trigger>
                    <Accordion.Content className="text-sm md:text-base text-gray-700 leading-[1.8] tracking-[0.04em] font-serif font-light pt-4 md:pt-5 pb-2 text-pretty">
                      ここに回答テキストが入ります。ダミーテキストです。
                      サンプルテキストがここに表示されます。
                    </Accordion.Content>
                  </Accordion.Item>

                  <Accordion.Item value="faq-2" className="border-none">
                    <Accordion.Trigger className="text-left font-serif font-light text-sm md:text-base tracking-[0.04em] leading-[1.7] text-gray-900 hover:no-underline py-4 md:py-5 border-b border-gray-200 hover:border-gray-400 transition-all duration-300">
                      <span className="pr-4">質問テキスト</span>
                    </Accordion.Trigger>
                    <Accordion.Content className="text-sm md:text-base text-gray-700 leading-[1.8] tracking-[0.04em] font-serif font-light pt-4 md:pt-5 pb-2 text-pretty">
                      ここに回答テキストが入ります。ダミーテキストです。
                      サンプルテキストがここに表示されます。
                    </Accordion.Content>
                  </Accordion.Item>

                  <Accordion.Item value="faq-3" className="border-none">
                    <Accordion.Trigger className="text-left font-serif font-light text-sm md:text-base tracking-[0.04em] leading-[1.7] text-gray-900 hover:no-underline py-4 md:py-5 border-b border-gray-200 hover:border-gray-400 transition-all duration-300">
                      <span className="pr-4">質問テキスト</span>
                    </Accordion.Trigger>
                    <Accordion.Content className="text-sm md:text-base text-gray-700 leading-[1.8] tracking-[0.04em] font-serif font-light pt-4 md:pt-5 pb-2 text-pretty">
                      ここに回答テキストが入ります。ダミーテキストです。
                      サンプルテキストがここに表示されます。
                    </Accordion.Content>
                  </Accordion.Item>

                  <Accordion.Item value="faq-4" className="border-none">
                    <Accordion.Trigger className="text-left font-serif font-light text-sm md:text-base tracking-[0.04em] leading-[1.7] text-gray-900 hover:no-underline py-4 md:py-5 border-b border-gray-200 hover:border-gray-400 transition-all duration-300">
                      <span className="pr-4">質問テキスト</span>
                    </Accordion.Trigger>
                    <Accordion.Content className="text-sm md:text-base text-gray-700 leading-[1.8] tracking-[0.04em] font-serif font-light pt-4 md:pt-5 pb-2 text-pretty">
                      ここに回答テキストが入ります。ダミーテキストです。
                      サンプルテキストがここに表示されます。
                    </Accordion.Content>
                  </Accordion.Item>

                  <Accordion.Item value="faq-5" className="border-none">
                    <Accordion.Trigger className="text-left font-serif font-light text-sm md:text-base tracking-[0.04em] leading-[1.7] text-gray-900 hover:no-underline py-4 md:py-5 border-b border-gray-200 hover:border-gray-400 transition-all duration-300">
                      <span className="pr-4">質問テキスト</span>
                    </Accordion.Trigger>
                    <Accordion.Content className="text-sm md:text-base text-gray-700 leading-[1.8] tracking-[0.04em] font-serif font-light pt-4 md:pt-5 pb-2 text-pretty">
                      ここに回答テキストが入ります。ダミーテキストです。
                      サンプルテキストがここに表示されます。
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* CTAセクション - 予約への誘い */}
      <section id="reservation" className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-stone-50 via-stone-100/50 to-stone-50" />
          {/* 和紙テクスチャ */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
              backgroundSize: '300px 300px',
            }}
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl relative z-10">
          <FadeInSection>
            {/* ヘッダー */}
            <div className="text-center mb-16 md:mb-20 space-y-6">
              <motion.h2
                className={`${STYLES.title.section} text-stone-800`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                ご予約
              </motion.h2>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "5rem" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="h-[2px] bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto"
              />

              <motion.p
                className="text-base md:text-lg leading-[1.9] font-serif font-light text-stone-600 tracking-[0.05em] max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                三俣山荘のご宿泊予約は、オンライン予約システムより承っております。
                <br className="hidden sm:block" />
                ご希望の日程をお選びいただき、お手続きください。
              </motion.p>
            </div>

            {/* 予約ボタン */}
            <FadeInSection delay={0.2}>
              <div className="flex flex-col items-center space-y-8 mb-16">
                <motion.a
                  href="https://example.com/reservation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-stone-700 to-stone-800 text-white rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-4"
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* 背景グラデーションアニメーション */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-stone-600 to-stone-700"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* 光沢エフェクト */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />

                  {/* コンテンツ */}
                  <div className="relative flex items-center gap-3">
                    <motion.div
                      animate={{
                        rotate: [0, -8, 8, -8, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      <Calendar className="w-6 h-6" />
                    </motion.div>
                    <span className="text-lg md:text-xl font-serif tracking-[0.15em]">
                      予約システムへ
                    </span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </motion.a>

                {/* サブテキスト */}
                <motion.p
                  className="text-sm text-stone-500 font-serif"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  ※ 外部の予約サイトに移動します
                </motion.p>
              </div>
            </FadeInSection>

            {/* 営業期間・注意事項 */}
            <FadeInSection delay={0.3}>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 md:p-10 border border-stone-200/50">
                <div className="space-y-6">
                  <h3 className="text-center text-lg md:text-xl font-serif font-medium text-stone-800 tracking-[0.08em] mb-6">
                    ご予約にあたって
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base font-serif text-stone-700 leading-[1.8]">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0"></div>
                        <p>ご予約に関する注意事項がここに入ります。ダミーテキストです。</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0"></div>
                        <p>営業期間や予約方法についての説明がここに入ります。</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0"></div>
                        <p>キャンセルポリシーについての説明文がここに入ります。</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0"></div>
                        <p>登山や宿泊に関する注意事項がここに入ります。</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0"></div>
                        <p>持ち物や装備についての説明がここに入ります。</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0"></div>
                        <p>お問い合わせ先についての情報がここに入ります。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </FadeInSection>
        </div>
      </section>
      </div>
    </main>
  )
}
