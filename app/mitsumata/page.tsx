'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { FadeInSection } from "@/components/animations/fade-in-section"
import { WashiBackground } from "@/components/effects/washi-background"
import TreeShadowBackground from "@/components/effects/tree-shadow-background"

export default function MitsumataPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 400])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

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
                className="text-7xl md:text-8xl lg:text-9xl font-serif font-light text-white tracking-[0.15em]"
                style={{
                  textShadow: "0 4px 30px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,1)",
                  letterSpacing: "0.2em"
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

      {/* イントロダクションセクション - 詩的なテキスト、大きな余白 */}
      <section className="relative py-32 md:py-40 lg:py-48">
        {/* 背景エフェクト */}
        <div className="absolute inset-0 z-0">
          <WashiBackground intensity="strong" animated={false} />
          <TreeShadowBackground intensity="subtle" enableParallax={true} />
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
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
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-stone-800 leading-[1.5] tracking-[0.08em]">
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
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-7xl">
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
      <section className="relative py-20 md:py-32 bg-stone-100/50">
        <div className="absolute inset-0 z-0">
          <WashiBackground intensity="medium" animated={false} />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
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
      <section className="relative py-32 md:py-40 lg:py-48">
        <div className="absolute inset-0 z-0">
          <WashiBackground intensity="strong" animated={false} />
          <TreeShadowBackground intensity="subtle" enableParallax={true} />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* セクションタイトル */}
          <FadeInSection>
            <div className="text-center mb-20 md:mb-24 space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-stone-800 tracking-[0.08em]">
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
      <section className="relative py-32 md:py-40 lg:py-48">
        <div className="absolute inset-0 z-0">
          <WashiBackground intensity="subtle" animated={false} />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
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
      <section className="relative py-32 md:py-40 lg:py-48 bg-stone-50">
        <div className="absolute inset-0 z-0">
          <WashiBackground intensity="medium" animated={false} />
          <TreeShadowBackground intensity="subtle" enableParallax={true} />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
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
      <section className="relative py-32 md:py-40 lg:py-48">
        <div className="absolute inset-0 z-0">
          <WashiBackground intensity="subtle" animated={false} />
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
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

      {/* CTAセクション - シンプルで余白たっぷり */}
      <section className="relative py-32 md:py-40">
        <div className="absolute inset-0 z-0">
          <TreeShadowBackground intensity="subtle" enableParallax={false} />
        </div>

        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
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
    </main>
  )
}
