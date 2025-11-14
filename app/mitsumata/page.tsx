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
