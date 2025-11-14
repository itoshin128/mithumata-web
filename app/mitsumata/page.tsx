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

  return (
    <main className="min-h-screen bg-stone-50">
      {/* ヒーローセクション - 100vh フルスクリーン */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* パラレックス背景画像 */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 w-full h-[120vh]"
        >
          <Image
            src="/images/lodges/mitsumata-1.jpg"
            alt="三俣山荘 - 黒部源流の壮大な景色"
            fill
            className="object-cover object-center"
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
                  黒部源流の守り人
                </p>
                <div className="h-[1px] w-16 bg-white/60" />
              </motion.div>

              {/* 標高・位置情報 */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="text-sm md:text-base font-sans text-white/80 tracking-[0.25em] uppercase"
                style={{ textShadow: "0 2px 15px rgba(0,0,0,0.7)" }}
              >
                Elevation 2,677m · Kurobe Genryu
              </motion.p>
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
            aria-label="次のセクションへスクロール"
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
          <TreeShadowBackground intensity="subtle" enableParallax={true} />
        </div>

        {/* イントロダクションセクション - 詩的なテキスト、大きな余白 */}
        <section className="relative">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            {/* 左側 - 大きな余白とキャッチコピー */}
            <div className="lg:col-span-5">
              <FadeInSection>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-8"
                >
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-light text-stone-800 leading-[1.5] tracking-[0.08em]">
                    源流に
                    <br />
                    たたずむ
                  </h2>

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "4rem" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="h-[1px] bg-gradient-to-r from-stone-400 to-stone-200"
                  />
                </motion.div>
              </FadeInSection>
            </div>

            {/* 右側 - 詩的な説明文 */}
            <div className="lg:col-span-7">
              <FadeInSection delay={0.2}>
                <div className="space-y-8 text-stone-700">
                  <p className="text-lg md:text-xl leading-[2.2] font-serif font-light tracking-[0.05em]">
                    北アルプスの最奥、黒部の源流域。
                    <br />
                    標高2,677mに位置する三俣山荘は、
                    <br />
                    槍ヶ岳を望む展望食堂を持つ山小屋です。
                  </p>

                  <p className="text-base md:text-lg leading-[2.2] font-serif font-light tracking-[0.05em] text-stone-600">
                    裏銀座縦走路の要所として、
                    <br />
                    多くの登山者を迎え入れてきました。
                    <br />
                    ここは、山の深さと静けさに出会う場所。
                  </p>

                  <p className="text-base md:text-lg leading-[2.2] font-serif font-light tracking-[0.05em] text-stone-600">
                    黒部源流の清らかな水、
                    <br />
                    名物のジビエシチュー、
                    <br />
                    そして、原始の自然がそのまま息づく風景。
                  </p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 写真セクション1 - 左寄せ大判写真 + 右側テキスト */}
      <section className="relative py-0">
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
                  <Image
                    src="/images/lodges/mitsumata-2.jpg"
                    alt="三俣山荘の展望"
                    fill
                    className="object-cover"
                    quality={90}
                  />
                </motion.div>
              </FadeInSection>
            </div>

            {/* テキスト - 30% */}
            <div className="lg:col-span-5">
              <FadeInSection delay={0.3}>
                <div className="space-y-6">
                  <h3 className="text-3xl md:text-4xl font-serif font-light text-stone-800 tracking-[0.08em]">
                    槍ヶ岳を望む
                  </h3>
                  <p className="text-base md:text-lg leading-[2] font-serif font-light text-stone-600 tracking-[0.04em]">
                    展望食堂から見える槍ヶ岳の雄姿は、
                    三俣山荘の象徴的な風景。
                    朝焼けに染まる穂先、
                    夕暮れに浮かぶシルエット。
                    刻々と変わる表情を眺めながら、
                    山の時間が流れていきます。
                  </p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 写真セクション2 - 右寄せ大判写真 + 左側テキスト */}
      <section className="relative py-0">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* テキスト - 30% (モバイルでは写真の下) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <FadeInSection delay={0.3}>
                <div className="space-y-6">
                  <h3 className="text-3xl md:text-4xl font-serif font-light text-stone-800 tracking-[0.08em]">
                    黒部源流の恵み
                  </h3>
                  <p className="text-base md:text-lg leading-[2] font-serif font-light text-stone-600 tracking-[0.04em]">
                    黒部川の源流に位置する三俣山荘。
                    豊かな清水と、周辺の自然が育む食材。
                    名物のジビエシチューは、
                    山の恵みを活かした一品として、
                    多くの登山者に愛されています。
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
                  <Image
                    src="/images/lodges/mitsumata-3.jpg"
                    alt="三俣山荘の食事"
                    fill
                    className="object-cover"
                    quality={90}
                  />
                </motion.div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 宿泊料金セクション */}
      <section className="relative py-0">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          {/* セクションタイトル */}
          <FadeInSection>
            <div className="text-center mb-20 md:mb-24 space-y-6">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-light text-stone-800 tracking-[0.08em]">
                宿泊料金
              </h2>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "4rem" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-[1px] bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto"
              />

              <p className="text-base md:text-lg font-serif font-light text-stone-600 tracking-[0.05em] leading-[2]">
                2025年シーズン料金
              </p>
            </div>
          </FadeInSection>

          {/* 料金カード */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
            {/* 一泊二食付きカード */}
            <FadeInSection delay={0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white rounded-sm shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
              >
                {/* アクセント線 */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-mitsumata-primary/80 via-mitsumata-primary to-mitsumata-primary/80" />

                <div className="p-8 md:p-10 space-y-8">
                  {/* カードタイトル */}
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-serif font-medium text-stone-800 tracking-[0.08em] text-center">
                      一泊二食付き
                    </h3>

                    {/* 価格 */}
                    <div className="text-center space-y-2">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-sm md:text-base font-sans text-stone-500">¥</span>
                        <span className="text-5xl md:text-6xl font-serif font-light text-mitsumata-primary tracking-tight">
                          12,000
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
                        夕食・朝食付き
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-mitsumata-primary mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        個室または相部屋
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-mitsumata-primary mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        寝具・シーツ付き
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-mitsumata-primary mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        展望食堂での食事
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
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white rounded-sm shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
              >
                {/* アクセント線 */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-stone-400/80 via-stone-400 to-stone-400/80" />

                <div className="p-8 md:p-10 space-y-8">
                  {/* カードタイトル */}
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-serif font-medium text-stone-800 tracking-[0.08em] text-center">
                      素泊まり
                    </h3>

                    {/* 価格 */}
                    <div className="text-center space-y-2">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-sm md:text-base font-sans text-stone-500">¥</span>
                        <span className="text-5xl md:text-6xl font-serif font-light text-stone-700 tracking-tight">
                          8,000
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
                        宿泊のみ
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-500 mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        個室または相部屋
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-500 mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        寝具・シーツ付き
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-500 mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        自炊スペース利用可
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
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white rounded-sm shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group"
              >
                {/* アクセント線 */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-stone-300/80 via-stone-300 to-stone-300/80" />

                <div className="p-8 md:p-10 space-y-8">
                  {/* カードタイトル */}
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-serif font-medium text-stone-800 tracking-[0.08em] text-center">
                      テント泊
                    </h3>

                    {/* 価格 */}
                    <div className="text-center space-y-2">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-sm md:text-base font-sans text-stone-500">¥</span>
                        <span className="text-5xl md:text-6xl font-serif font-light text-stone-600 tracking-tight">
                          2,000
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
                        テント場利用
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        トイレ・水場利用可
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        自炊スペース利用可
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-400 mt-2.5 flex-shrink-0" aria-hidden="true" />
                      <span className="text-base font-serif font-light text-stone-700 tracking-[0.03em] leading-[1.8]">
                        テント・寝具持参
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
                <p>※ 料金は税込です</p>
                <p>※ 個室は空き状況により案内いたします</p>
                <p>※ 営業期間：7月上旬〜11月上旬</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 食事セクション - ビジュアル重視 */}
      {/* 導入セクション（100vh） */}
      <section className="relative h-screen overflow-hidden">
        {/* 背景写真 */}
        <div className="absolute inset-0">
          <Image
            src="/images/lodges/mitsumata-3.jpg"
            alt="三俣山荘の食事"
            fill
            className="object-cover"
            style={{ filter: 'brightness(0.6) saturate(0.9)' }}
            quality={90}
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
              {/* 縦書き風のタイトル */}
              <h2
                className="text-8xl md:text-9xl font-serif font-light text-white tracking-[0.3em]"
                style={{
                  textShadow: "0 4px 40px rgba(0,0,0,0.9), 0 2px 15px rgba(0,0,0,1)",
                  writingMode: 'vertical-rl' as const,
                  textOrientation: 'upright' as const,
                  margin: '0 auto'
                }}
              >
                食事
              </h2>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-4"
              >
                <div className="h-[1px] w-12 bg-white/60" />
                <p
                  className="text-sm md:text-base font-sans text-white/90 tracking-[0.3em] uppercase"
                  style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
                >
                  Mountain Cuisine
                </p>
                <div className="h-[1px] w-12 bg-white/60" />
              </motion.div>
            </motion.div>
          </FadeInSection>
        </div>
      </section>

      {/* 料理ギャラリー - スクロール展開 */}
      {/* 1品目：左寄せ大判写真 + 右側テキスト */}
      <section className="relative py-0">
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
                    <Image
                      src="/images/lodges/mitsumata-2.jpg"
                      alt="鹿肉のジビエシチュー"
                      fill
                      className="object-cover"
                      style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                      quality={95}
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
                    <h3 className="text-4xl md:text-5xl font-serif font-light text-stone-800 tracking-[0.08em] leading-[1.4]">
                      鹿肉の
                      <br />
                      ジビエシチュー
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
                    北アルプスの大自然で育った鹿肉を、
                    じっくりと煮込んだ三俣山荘の名物料理。
                    深いコクと柔らかな食感が特徴です。
                  </p>
                </motion.div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 2品目：右寄せ大判写真 + 左側テキスト */}
      <section className="relative py-0">
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
                    <h3 className="text-4xl md:text-5xl font-serif font-light text-stone-800 tracking-[0.08em] leading-[1.4]">
                      三俣
                      <br />
                      オリジナルカレー
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
                    スパイスの香りが食欲をそそる、
                    山荘特製のカレー。
                    標高2,677mで味わう格別の一皿。
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
                    <Image
                      src="/images/lodges/mitsumata-1.jpg"
                      alt="三俣オリジナルカレー"
                      fill
                      className="object-cover"
                      style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                      quality={95}
                    />
                  </motion.div>
                </motion.div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 3品目：中央配置の正方形写真 */}
      <section className="relative py-0">
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
                  <Image
                    src="/images/lodges/mitsumata-3.jpg"
                    alt="山小屋の朝食"
                    fill
                    className="object-cover"
                    style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                    quality={95}
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
                  <h3 className="text-4xl md:text-5xl font-serif font-light text-stone-800 tracking-[0.08em]">
                    山小屋の朝食
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
                  槍ヶ岳を望む展望食堂で、
                  心と体を満たす朝食を。
                  新しい一日の始まりを迎えます。
                </p>
              </motion.div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* グッズセクション - 山荘の記憶を持ち帰る */}
      <section className="relative py-0">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          {/* セクションタイトル */}
          <FadeInSection>
            <div className="text-center mb-24 md:mb-32 space-y-6">
              <h2 className={`${STYLES.title.section} text-stone-800`}>
                山荘の記憶を
                <br className="md:hidden" />
                持ち帰る
              </h2>

              <SectionDivider />

              <p className={`${STYLES.text.caption} text-stone-600 max-w-2xl mx-auto`}>
                三俣山荘での時間を、日常へ。
                <br />
                ひとつひとつに宿る、黒部源流の物語。
              </p>
            </div>
          </FadeInSection>

          {/* グッズグリッド */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {[
              { id: 1, name: 'オリジナルタオル', image: '/images/lodges/mitsumata-1.jpg' },
              { id: 2, name: 'マグカップ', image: '/images/lodges/mitsumata-2.jpg' },
              { id: 3, name: 'ステッカー', image: '/images/lodges/mitsumata-3.jpg' },
              { id: 4, name: 'トートバッグ', image: '/images/lodges/mitsumata-1.jpg' },
              { id: 5, name: 'バンダナ', image: '/images/lodges/mitsumata-2.jpg' },
              { id: 6, name: '手ぬぐい', image: '/images/lodges/mitsumata-3.jpg' },
              { id: 7, name: 'ピンバッジ', image: '/images/lodges/mitsumata-1.jpg' },
              { id: 8, name: 'キーホルダー', image: '/images/lodges/mitsumata-2.jpg' },
            ].map((item, index) => (
              <FadeInSection key={item.id} delay={index * 0.05}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="group relative aspect-square overflow-hidden bg-white cursor-pointer"
                >
                  {/* 商品画像 */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ filter: 'saturate(0.8) brightness(1.05)' }}
                    quality={85}
                  />

                  {/* ホバー時のオーバーレイと商品名 */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <p className="text-white text-sm md:text-base font-serif font-light tracking-[0.1em]">
                        {item.name}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>

          {/* 注釈 */}
          <FadeInSection delay={0.5}>
            <div className="mt-16 md:mt-20 text-center">
              <p className="text-xs md:text-sm font-sans font-light text-stone-500 tracking-[0.15em]">
                詳細はお問い合わせください
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 黒部源流セクション - 壮大なストーリーテリング */}
      {/* オープニング（100vh） */}
      <section ref={kurobeRef} className="relative h-screen overflow-hidden">
        {/* 背景写真 */}
        <div className="absolute inset-0">
          <Image
            src="/images/lodges/mitsumata-1.jpg"
            alt="黒部源流"
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
              className="text-8xl md:text-9xl lg:text-[12rem] font-serif font-light text-white tracking-[0.15em]"
              style={{
                textShadow: "0 6px 60px rgba(0,0,0,0.95), 0 3px 20px rgba(0,0,0,1)",
                fontFeatureSettings: "'palt' 1"
              }}
            >
              黒部源流
            </motion.h2>
          </FadeInSection>
        </motion.div>

        {/* スクロールインジケーター */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-white/70 text-xs tracking-[0.3em] uppercase"
          >
            Scroll to Explore
          </motion.div>
        </motion.div>
      </section>

      {/* ストーリー展開 - 画面1：朝靄の源流 */}
      <section className="relative min-h-screen bg-stone-50">
        <div className="absolute inset-0 z-0">
          <WashiBackground intensity="strong" animated={false} />
          <TreeShadowBackground intensity="subtle" enableParallax={true} />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-screen items-center">
            {/* 左側60% - 写真 */}
            <div className="lg:col-span-7 relative h-screen lg:sticky lg:top-0">
              <FadeInSection>
                <motion.div
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-200px" }}
                  className="relative h-full w-full"
                >
                  <motion.div
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full w-full"
                  >
                    <Image
                      src="/images/lodges/mitsumata-2.jpg"
                      alt="朝靄に包まれる黒部源流"
                      fill
                      className="object-cover"
                      style={{ filter: 'saturate(0.9) brightness(0.92)' }}
                      quality={95}
                    />
                  </motion.div>

                  {/* 微細なアニメーション - 霧のエフェクト */}
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/5 pointer-events-none"
                  />
                </motion.div>
              </FadeInSection>
            </div>

            {/* 右側40% - 縦書きテキスト */}
            <div className="lg:col-span-5 py-20 lg:py-32">
              <FadeInSection delay={0.4}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-150px" }}
                  className="space-y-12 px-6 lg:px-12"
                >
                  <div className="space-y-8">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-light text-stone-800 tracking-[0.1em] leading-[1.5]">
                      原始の
                      <br />
                      水景
                    </h3>

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "4rem" }}
                      transition={{ duration: 1, delay: 0.8 }}
                      viewport={{ once: true }}
                      className="h-[2px] bg-gradient-to-r from-stone-700 via-stone-400 to-transparent"
                    />
                  </div>

                  <div className="space-y-6">
                    <p className="text-xl md:text-2xl leading-[2.2] font-serif font-light text-stone-700 tracking-[0.05em]">
                      標高2,600m。
                      <br />
                      ここは黒部川の始まりの地。
                    </p>

                    <p className="text-lg md:text-xl leading-[2.2] font-serif font-light text-stone-600 tracking-[0.04em]">
                      朝靄が立ち込める静寂の中、
                      <br />
                      清冽な水が岩肌を滑り落ちる。
                      <br />
                      太古から変わらぬ、
                      <br />
                      命の源流がここにある。
                    </p>
                  </div>
                </motion.div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* ストーリー展開 - 画面2：原生林 */}
      <section className="relative min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
        <div className="absolute inset-0 z-0">
          <WashiBackground intensity="strong" animated={false} />
          <TreeShadowBackground intensity="subtle" enableParallax={true} />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl py-20 lg:py-32 relative z-10">
          <div className="space-y-16 lg:space-y-24">
            {/* 上部70% - パノラマ写真 */}
            <FadeInSection>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-200px" }}
                className="relative aspect-[21/9] lg:aspect-[32/9] overflow-hidden shadow-2xl"
              >
                <motion.div
                  initial={{ scale: 1.15 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 3, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="w-full h-full"
                >
                  <Image
                    src="/images/lodges/mitsumata-3.jpg"
                    alt="原生林のパノラマ"
                    fill
                    className="object-cover"
                    style={{ filter: 'saturate(0.95) brightness(0.9)' }}
                    quality={95}
                  />
                </motion.div>

                {/* 木漏れ日のエフェクト */}
                <motion.div
                  animate={{
                    opacity: [0.1, 0.25, 0.1],
                    x: [-20, 20, -20]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-50/20 to-transparent pointer-events-none"
                />
              </motion.div>
            </FadeInSection>

            {/* 下部30% - テキスト */}
            <FadeInSection delay={0.3}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-4xl mx-auto text-center space-y-12"
              >
                <div className="space-y-6">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-light text-stone-800 tracking-[0.1em]">
                    手つかずの森
                  </h3>

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "4rem" }}
                    transition={{ duration: 1, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="h-[2px] bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto"
                  />
                </div>

                <p className="text-xl md:text-2xl leading-[2.2] font-serif font-light text-stone-700 tracking-[0.05em]">
                  標高2,000mを超える原生林。
                  <br />
                  苔むした巨木、清流のせせらぎ、野鳥のさえずり。
                  <br />
                  人の手が届かぬ場所だからこそ、
                  <br />
                  豊かな生態系が息づいている。
                </p>
              </motion.div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ストーリー展開 - 画面3：清流のクローズアップ */}
      <section className="relative min-h-screen bg-stone-50">
        <div className="absolute inset-0 z-0">
          <WashiBackground intensity="strong" animated={false} />
          <TreeShadowBackground intensity="subtle" enableParallax={true} />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-screen items-center">
            {/* 左側60% - 説明文 */}
            <div className="lg:col-span-7 py-20 lg:py-32 order-2 lg:order-1">
              <FadeInSection delay={0.3}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-150px" }}
                  className="space-y-12 px-6 lg:px-16"
                >
                  <div className="space-y-8">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-light text-stone-800 tracking-[0.1em] leading-[1.5]">
                      透明度
                      <br />
                      100%の水
                    </h3>

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "4rem" }}
                      transition={{ duration: 1, delay: 0.7 }}
                      viewport={{ once: true }}
                      className="h-[2px] bg-gradient-to-r from-stone-700 via-stone-400 to-transparent"
                    />
                  </div>

                  <div className="space-y-8">
                    <p className="text-xl md:text-2xl leading-[2.2] font-serif font-light text-stone-700 tracking-[0.05em]">
                      雪解け水が岩盤を伝い、
                      <br />
                      何千年もかけて濾過された清水。
                    </p>

                    <p className="text-lg md:text-xl leading-[2.2] font-serif font-light text-stone-600 tracking-[0.04em]">
                      手ですくえば、
                      <br />
                      冷たさが心地よい。
                      <br />
                      この水が、やがて黒部川となり、
                      <br />
                      富山湾へと注ぐ。
                    </p>

                    <p className="text-lg md:text-xl leading-[2.2] font-serif font-light text-stone-600 tracking-[0.04em]">
                      三俣山荘は、
                      <br />
                      この源流を守り続ける
                      <br />
                      守り人でありたい。
                    </p>
                  </div>
                </motion.div>
              </FadeInSection>
            </div>

            {/* 右側40% - 縦長写真 */}
            <div className="lg:col-span-5 relative h-screen lg:sticky lg:top-0 order-1 lg:order-2">
              <FadeInSection>
                <motion.div
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-200px" }}
                  className="relative h-full w-full"
                >
                  <motion.div
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full w-full"
                  >
                    <Image
                      src="/images/lodges/mitsumata-1.jpg"
                      alt="清流のクローズアップ"
                      fill
                      className="object-cover"
                      style={{ filter: 'saturate(1.05) brightness(0.95)' }}
                      quality={95}
                    />
                  </motion.div>

                  {/* 水の流れを表現するアニメーション */}
                  <motion.div
                    animate={{
                      y: [0, 100, 0],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent pointer-events-none"
                  />
                </motion.div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 伊藤新道セクション - 歴史と冒険 */}
      {/* イントロ - 80vh */}
      <section className="relative h-[80vh] overflow-hidden">
        <Image
          src="/images/lodges/mitsumata-1.jpg"
          alt="伊藤新道 稜線の朝焼け"
          fill
          className="object-cover object-center"
          style={{ filter: 'saturate(0.9) brightness(0.85)' }}
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        <div className="relative h-full flex items-center justify-center z-10">
          <FadeInSection>
            <div className="text-center space-y-6">
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light text-white tracking-[0.15em]">
                伊藤新道
              </h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                className="h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent mx-auto"
              />
              <p className="text-xl md:text-2xl font-serif font-light text-white/95 tracking-[0.2em]">
                稜線ルート
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 紹介テキスト - 横スクロールギャラリー */}
      <section className="relative py-0 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <FadeInSection>
            <div className="max-w-3xl mx-auto mb-16 space-y-8">
              <p className="text-lg md:text-xl leading-[2.5] font-serif font-light text-stone-700 tracking-[0.04em]">
                1962年、登山家・伊藤正一によって開拓された歴史ある登山道。三俣山荘から水晶岳へと続く稜線ルートは、
                高山植物の宝庫として知られ、7月から9月にかけて色とりどりの花々が登山者を迎えます。
              </p>
              <p className="text-lg md:text-xl leading-[2.5] font-serif font-light text-stone-700 tracking-[0.04em]">
                標高2,600mから3,000m近い高度を縦走するこのルートは、北アルプスの核心部を体感できる
                冒険の道として、多くの登山者に愛されています。
              </p>
            </div>
          </FadeInSection>

          {/* 横スクロールギャラリー */}
          <div className="relative mt-20">
            <FadeInSection delay={0.2}>
              <p className="text-sm font-light tracking-[0.2em] text-stone-500 mb-6 text-center">
                TRAIL POINTS
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
                {[
                  {
                    image: '/images/lodges/mitsumata-2.jpg',
                    title: '三俣山荘起点',
                    elevation: '2,677m',
                    description: '伊藤新道の始まり'
                  },
                  {
                    image: '/images/lodges/mitsumata-3.jpg',
                    title: '高山植物帯',
                    elevation: '2,800m',
                    description: 'コマクサ、チングルマの群生地'
                  },
                  {
                    image: '/images/lodges/mitsumata-1.jpg',
                    title: '稜線展望地',
                    elevation: '2,900m',
                    description: '槍ヶ岳を望む絶景ポイント'
                  },
                  {
                    image: '/images/lodges/mitsumata-2.jpg',
                    title: '水晶岳分岐',
                    elevation: '2,950m',
                    description: '水晶小屋へ続く道'
                  },
                ].map((point, index) => (
                  <SwiperSlide key={index} className="!w-[85vw] md:!w-[600px] lg:!w-[700px]">
                    <motion.div
                      className="relative group cursor-grab active:cursor-grabbing"
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                        <Image
                          src={point.image}
                          alt={point.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                          style={{ filter: 'saturate(0.88) brightness(0.92)' }}
                          quality={90}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                        {/* ホバー時の標高情報 */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute inset-0 flex flex-col items-center justify-center text-white"
                        >
                          <div className="text-5xl md:text-6xl font-serif font-light tracking-[0.1em] mb-2">
                            {point.elevation}
                          </div>
                          <div className="text-sm font-light tracking-[0.3em] opacity-90">
                            ELEVATION
                          </div>
                        </motion.div>

                        {/* 常時表示の情報 */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10">
                          <h3 className="text-2xl md:text-3xl font-serif font-light tracking-[0.08em] mb-2">
                            {point.title}
                          </h3>
                          <p className="text-sm md:text-base font-light tracking-[0.05em] opacity-90">
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
      <section className="relative py-0">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-5xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <FadeInSection delay={0.1}>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Flower2 className="w-6 h-6 text-mitsumata-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-light tracking-[0.08em] text-stone-800">
                    高山植物
                  </h3>
                </div>
                <div className="pl-16">
                  <p className="text-base md:text-lg leading-[2.2] font-light text-stone-600 tracking-[0.04em]">
                    コマクサ、チングルマ、ハクサンイチゲ、イワギキョウなど、
                    200種を超える高山植物が季節ごとに彩りを添えます。
                  </p>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Calendar className="w-6 h-6 text-mitsumata-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-light tracking-[0.08em] text-stone-800">
                    ベストシーズン
                  </h3>
                </div>
                <div className="pl-16">
                  <p className="text-base md:text-lg leading-[2.2] font-light text-stone-600 tracking-[0.04em]">
                    7月上旬〜9月下旬
                  </p>
                  <p className="text-sm md:text-base leading-[2] font-light text-stone-500 tracking-[0.04em] mt-4">
                    特に7月中旬から8月上旬は、高山植物が最も美しい季節です。
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 交通・アクセスセクション */}
      {/* ヘッダー - 50vh */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="/images/lodges/mitsumata-2.jpg"
          alt="登山道への道"
          fill
          className="object-cover object-center"
          style={{ filter: 'saturate(0.7) brightness(0.8)' }}
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

        <div className="relative h-full flex items-center justify-center z-10">
          <FadeInSection>
            <div className="text-center space-y-6">
              <h2 className={`${STYLES.title.section} text-white`}>
                Access
              </h2>
              <SectionDivider />
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ルート詳細 - アコーディオン形式 */}
      <section className="relative py-0">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-6xl relative z-10">
          {/* イントロテキスト */}
          <FadeInSection>
            <div className="text-center mb-24 md:mb-32 space-y-6">
              <p className={`${STYLES.text.caption} max-w-2xl mx-auto`}>
                三俣山荘へは、3つの主要ルートからアクセスできます。
                <br />
                それぞれの道のりには、独自の景色と魅力があります。
              </p>
            </div>
          </FadeInSection>

          {/* アコーディオン */}
          <Accordion.Root type="single" collapsible className="space-y-6">
            {/* ルート1: 新穂高温泉から */}
            <FadeInSection delay={0.1}>
              <Accordion.Item value="route-1" className="bg-white shadow-lg overflow-hidden group">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full px-8 md:px-12 py-8 md:py-10 flex items-center justify-between gap-6 hover:bg-stone-50 transition-colors duration-300">
                    <div className="flex items-center gap-6 md:gap-8">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-mitsumata-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-7 h-7 md:w-8 md:h-8 text-mitsumata-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-2xl md:text-3xl font-serif font-light text-stone-800 tracking-[0.08em] mb-2">
                          新穂高温泉から
                        </h3>
                        <div className="flex items-center gap-3 text-mitsumata-primary">
                          <Clock className="w-5 h-5" />
                          <span className="text-3xl md:text-4xl font-serif font-light tracking-tight">8時間</span>
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
                            <h4 className="text-lg font-serif font-medium text-stone-800 mb-2">松本駅</h4>
                            <p className="text-sm md:text-base font-light text-stone-600 leading-[1.8]">
                              電車でJR松本駅下車
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
                            <h4 className="text-lg font-serif font-medium text-stone-800 mb-2">バス移動</h4>
                            <p className="text-sm md:text-base font-light text-stone-600 leading-[1.8]">
                              アルピコ交通バスで新穂高温泉へ（約2時間30分）
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
                            <h4 className="text-lg font-serif font-medium text-stone-800 mb-2">登山</h4>
                            <p className="text-sm md:text-base font-light text-stone-600 leading-[1.8] mb-3">
                              わさび平小屋経由で三俣山荘へ（約8時間）
                            </p>
                            <div className="inline-block px-4 py-2 bg-stone-50 rounded-full">
                              <span className="text-sm font-light text-stone-600">最も一般的なルート</span>
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
                          <Image
                            src="/images/lodges/mitsumata-1.jpg"
                            alt="新穂高温泉からのルート"
                            fill
                            className="object-cover"
                            style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                            quality={90}
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
              <Accordion.Item value="route-2" className="bg-white shadow-lg overflow-hidden group">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full px-8 md:px-12 py-8 md:py-10 flex items-center justify-between gap-6 hover:bg-stone-50 transition-colors duration-300">
                    <div className="flex items-center gap-6 md:gap-8">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-mitsumata-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-7 h-7 md:w-8 md:h-8 text-mitsumata-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-2xl md:text-3xl font-serif font-light text-stone-800 tracking-[0.08em] mb-2">
                          高瀬ダムから
                        </h3>
                        <div className="flex items-center gap-3 text-mitsumata-primary">
                          <Clock className="w-5 h-5" />
                          <span className="text-3xl md:text-4xl font-serif font-light tracking-tight">7時間</span>
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
                            <h4 className="text-lg font-serif font-medium text-stone-800 mb-2">七倉山荘</h4>
                            <p className="text-sm md:text-base font-light text-stone-600 leading-[1.8]">
                              タクシーで七倉山荘へ（信濃大町駅から約50分）
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
                            <h4 className="text-lg font-serif font-medium text-stone-800 mb-2">高瀬ダム</h4>
                            <p className="text-sm md:text-base font-light text-stone-600 leading-[1.8]">
                              タクシーで高瀬ダムへ（約30分）
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
                            <h4 className="text-lg font-serif font-medium text-stone-800 mb-2">登山</h4>
                            <p className="text-sm md:text-base font-light text-stone-600 leading-[1.8] mb-3">
                              湯俣山荘経由で三俣山荘へ（約7時間）
                            </p>
                            <div className="inline-block px-4 py-2 bg-stone-50 rounded-full">
                              <span className="text-sm font-light text-stone-600">静かな森林ルート</span>
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
                          <Image
                            src="/images/lodges/mitsumata-3.jpg"
                            alt="高瀬ダムからのルート"
                            fill
                            className="object-cover"
                            style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                            quality={90}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </FadeInSection>

            {/* ルート3: 折立から */}
            <FadeInSection delay={0.3}>
              <Accordion.Item value="route-3" className="bg-white shadow-lg overflow-hidden group">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full px-8 md:px-12 py-8 md:py-10 flex items-center justify-between gap-6 hover:bg-stone-50 transition-colors duration-300">
                    <div className="flex items-center gap-6 md:gap-8">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-mitsumata-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-7 h-7 md:w-8 md:h-8 text-mitsumata-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-2xl md:text-3xl font-serif font-light text-stone-800 tracking-[0.08em] mb-2">
                          折立から
                        </h3>
                        <div className="flex items-center gap-3 text-mitsumata-primary">
                          <Clock className="w-5 h-5" />
                          <span className="text-3xl md:text-4xl font-serif font-light tracking-tight">6時間</span>
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
                            <h4 className="text-lg font-serif font-medium text-stone-800 mb-2">富山駅</h4>
                            <p className="text-sm md:text-base font-light text-stone-600 leading-[1.8]">
                              北陸新幹線で富山駅下車
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
                            <h4 className="text-lg font-serif font-medium text-stone-800 mb-2">折立</h4>
                            <p className="text-sm md:text-base font-light text-stone-600 leading-[1.8]">
                              バスで折立登山口へ（約3時間）
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
                            <h4 className="text-lg font-serif font-medium text-stone-800 mb-2">登山</h4>
                            <p className="text-sm md:text-base font-light text-stone-600 leading-[1.8] mb-3">
                              太郎平小屋経由で三俣山荘へ（約6時間）
                            </p>
                            <div className="inline-block px-4 py-2 bg-stone-50 rounded-full">
                              <span className="text-sm font-light text-stone-600">最短ルート</span>
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
                          <Image
                            src="/images/lodges/mitsumata-2.jpg"
                            alt="折立からのルート"
                            fill
                            className="object-cover"
                            style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                            quality={90}
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
                <p>※ 所要時間は一般的な登山者の目安です</p>
                <p>※ 天候や体力により大きく変動します</p>
                <p>※ 詳しいアクセス情報はお問い合わせください</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* よくある質問セクション - 超ミニマル */}
      <section className="relative py-0">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-3xl relative z-10">
          {/* セクション導入 */}
          <FadeInSection>
            <div className="text-center mb-24 md:mb-32 space-y-6">
              <p className={`${STYLES.title.label} text-stone-400`}>
                FAQ
              </p>
              <h2 className={`${STYLES.title.section} text-stone-800`}>
                よくある質問
              </h2>

              <SectionDivider />
            </div>
          </FadeInSection>

          {/* 質問リスト */}
          <Accordion.Root type="single" collapsible className="space-y-20">
            {/* Q1: 予約について */}
            <FadeInSection delay={0.1}>
              <Accordion.Item value="faq-1" className="group">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-start justify-between gap-6 text-left group">
                    <h3 className="text-xl font-serif font-normal text-[#2A2A2A] tracking-[0.04em] transition-colors duration-300 group-hover:text-mitsumata-primary">
                      予約は必要ですか？
                    </h3>
                    <div className="relative w-6 h-6 flex-shrink-0 mt-1">
                      <Plus className="absolute inset-0 w-6 h-6 text-stone-300 transition-all duration-300 group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-90" strokeWidth={1} />
                      <Minus className="absolute inset-0 w-6 h-6 text-mitsumata-primary transition-all duration-300 group-data-[state=closed]:opacity-0 group-data-[state=closed]:-rotate-90" strokeWidth={1} />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="pt-6">
                    <p className="text-base font-serif font-light text-[#666666] leading-[2] tracking-[0.04em]">
                      宿泊の予約は必須です。電話またはウェブサイトからご予約ください。
                      特に週末や連休は混雑が予想されるため、お早めのご予約をおすすめします。
                      テント泊の場合も、スペースに限りがあるため事前予約をお願いしています。
                    </p>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </FadeInSection>

            {/* Q2: キャンセルポリシー */}
            <FadeInSection delay={0.2}>
              <Accordion.Item value="faq-2" className="group">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-start justify-between gap-6 text-left group">
                    <h3 className="text-xl font-serif font-normal text-[#2A2A2A] tracking-[0.04em] transition-colors duration-300 group-hover:text-mitsumata-primary">
                      キャンセル料はかかりますか？
                    </h3>
                    <div className="relative w-6 h-6 flex-shrink-0 mt-1">
                      <Plus className="absolute inset-0 w-6 h-6 text-stone-300 transition-all duration-300 group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-90" strokeWidth={1} />
                      <Minus className="absolute inset-0 w-6 h-6 text-mitsumata-primary transition-all duration-300 group-data-[state=closed]:opacity-0 group-data-[state=closed]:-rotate-90" strokeWidth={1} />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="pt-6">
                    <p className="text-base font-serif font-light text-[#666666] leading-[2] tracking-[0.04em]">
                      前日キャンセルは50%、当日キャンセルは100%のキャンセル料が発生します。
                      天候不良による登山中止の場合は、キャンセル料はいただきません。
                      変更がある場合は、お早めにご連絡ください。
                    </p>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </FadeInSection>

            {/* Q3: 営業期間 */}
            <FadeInSection delay={0.3}>
              <Accordion.Item value="faq-3" className="group">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-start justify-between gap-6 text-left group">
                    <h3 className="text-xl font-serif font-normal text-[#2A2A2A] tracking-[0.04em] transition-colors duration-300 group-hover:text-mitsumata-primary">
                      営業期間を教えてください
                    </h3>
                    <div className="relative w-6 h-6 flex-shrink-0 mt-1">
                      <Plus className="absolute inset-0 w-6 h-6 text-stone-300 transition-all duration-300 group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-90" strokeWidth={1} />
                      <Minus className="absolute inset-0 w-6 h-6 text-mitsumata-primary transition-all duration-300 group-data-[state=closed]:opacity-0 group-data-[state=closed]:-rotate-90" strokeWidth={1} />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="pt-6">
                    <p className="text-base font-serif font-light text-[#666666] leading-[2] tracking-[0.04em]">
                      7月上旬から11月上旬まで営業しています。
                      積雪状況により、営業開始日と終了日は前後する可能性があります。
                      詳しい営業日程は、毎年6月頃にウェブサイトで発表いたします。
                    </p>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </FadeInSection>

            {/* Q4: 装備について */}
            <FadeInSection delay={0.4}>
              <Accordion.Item value="faq-4" className="group">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-start justify-between gap-6 text-left group">
                    <h3 className="text-xl font-serif font-normal text-[#2A2A2A] tracking-[0.04em] transition-colors duration-300 group-hover:text-mitsumata-primary">
                      必要な装備は何ですか？
                    </h3>
                    <div className="relative w-6 h-6 flex-shrink-0 mt-1">
                      <Plus className="absolute inset-0 w-6 h-6 text-stone-300 transition-all duration-300 group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-90" strokeWidth={1} />
                      <Minus className="absolute inset-0 w-6 h-6 text-mitsumata-primary transition-all duration-300 group-data-[state=closed]:opacity-0 group-data-[state=closed]:-rotate-90" strokeWidth={1} />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="pt-6">
                    <p className="text-base font-serif font-light text-[#666666] leading-[2] tracking-[0.04em]">
                      登山靴、レインウェア、ヘッドランプは必須です。
                      標高2,600m以上のため、夏でも防寒着をご持参ください。
                      宿泊の場合、寝具は山荘でご用意しますが、インナーシーツをお持ちいただくと快適です。
                    </p>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </FadeInSection>

            {/* Q5: 支払い方法 */}
            <FadeInSection delay={0.5}>
              <Accordion.Item value="faq-5" className="group">
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-start justify-between gap-6 text-left group">
                    <h3 className="text-xl font-serif font-normal text-[#2A2A2A] tracking-[0.04em] transition-colors duration-300 group-hover:text-mitsumata-primary">
                      支払い方法を教えてください
                    </h3>
                    <div className="relative w-6 h-6 flex-shrink-0 mt-1">
                      <Plus className="absolute inset-0 w-6 h-6 text-stone-300 transition-all duration-300 group-data-[state=open]:opacity-0 group-data-[state=open]:rotate-90" strokeWidth={1} />
                      <Minus className="absolute inset-0 w-6 h-6 text-mitsumata-primary transition-all duration-300 group-data-[state=closed]:opacity-0 group-data-[state=closed]:-rotate-90" strokeWidth={1} />
                    </div>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="pt-6">
                    <p className="text-base font-serif font-light text-[#666666] leading-[2] tracking-[0.04em]">
                      現金のみのお取り扱いとなります。
                      クレジットカードや電子マネーはご利用いただけませんので、
                      必要な現金を事前にご用意ください。山荘にATMはございません。
                    </p>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </FadeInSection>
          </Accordion.Root>
        </div>
      </section>

      {/* CTAセクション - シンプルで余白たっぷり */}
      <section className="relative py-0">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-4xl text-center relative z-10">
          <FadeInSection>
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-800 tracking-[0.08em]">
                  三俣山荘へ
                </h2>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto"
                />

                <p className="text-lg md:text-xl leading-[2] font-serif font-light text-stone-600 tracking-[0.05em] max-w-2xl mx-auto">
                  ご予約、お問い合わせは
                  <br />
                  お気軽にご連絡ください
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-12 py-5 bg-mitsumata-primary text-white font-serif tracking-[0.15em] text-base shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  予約する
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-12 py-5 border-2 border-stone-300 text-stone-700 font-serif tracking-[0.15em] text-base hover:border-stone-400 hover:bg-stone-50 transition-all duration-300"
                >
                  詳細を見る
                </motion.button>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
      </div>
    </main>
  )
}
