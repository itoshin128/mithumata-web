'use client'

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useRef, useState } from "react"
import { FadeInSection } from "@/components/animations/fade-in-section"
import { WashiBackground } from "@/components/effects/washi-background"
import TreeShadowBackground from "@/components/effects/tree-shadow-background"
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { Calendar, Flower2, Train, Bus, Car, Footprints, Clock, MapPin, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react'
import * as Accordion from '@radix-ui/react-accordion'
import { SectionProgressBar } from '@/components/navigation/SectionProgressBar'
import { MobileSectionNav } from '@/components/navigation/MobileSectionNav'
import { SectionAnchorLinks } from '@/components/navigation/SectionAnchorLinks'
import { useActiveSection, type SectionConfig } from '@/hooks/useActiveSection'
import { useScrollProgress } from '@/hooks/useScrollProgress'

// デザインシステム - トップページと完全統一
const STYLES = {
  // セクションタイトルの階層（トップページと完全統一）
  title: {
    hero: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-light leading-[1.6] tracking-[0.08em]",
    section: "text-2xl md:text-3xl lg:text-4xl font-serif font-light tracking-[0.08em] leading-[1.6]",
    subsection: "text-lg md:text-xl lg:text-2xl font-serif font-light tracking-[0.04em] leading-[1.6]",
    card: "text-base md:text-lg lg:text-xl font-serif font-light tracking-[0.06em] leading-[1.6]",
    label: "text-xs md:text-sm tracking-[0.2em] font-light font-sans uppercase",
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
    hero: "text-lg md:text-xl lg:text-2xl leading-[1.8] font-serif font-light tracking-[0.04em]",
    body: "text-sm md:text-base lg:text-lg text-gray-700 leading-[1.8] tracking-[0.04em] font-serif font-light",
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

// 宿泊料金カードコンポーネント - モバイルはタブ、デスクトップはグリッド
function PricingCards() {
  const [activeTab, setActiveTab] = useState<'dinner' | 'room' | 'tent'>('dinner')

  // 料金プランデータ
  const plans = {
    dinner: {
      title: '一泊二食付き',
      price: '00,000',
      color: 'mitsumata-primary',
      items: [
        'ダミーテキスト ダミーテキスト',
        'ダミーテキスト ダミーテキスト',
        'ダミーテキスト ダミーテキスト',
        'ダミーテキスト ダミーテキスト',
      ]
    },
    room: {
      title: '素泊まり',
      price: '00,000',
      color: 'stone-700',
      items: [
        'ダミーテキスト ダミーテキスト',
        'ダミーテキスト ダミーテキスト',
        'ダミーテキスト ダミーテキスト',
        'ダミーテキスト ダミーテキスト',
      ]
    },
    tent: {
      title: 'テント泊',
      price: '0,000',
      color: 'stone-600',
      items: [
        'ダミーテキスト ダミーテキスト',
        'ダミーテキスト ダミーテキスト',
        'ダミーテキスト ダミーテキスト',
        'ダミーテキスト ダミーテキスト',
      ]
    }
  }

  type PlanKey = keyof typeof plans

  // タブボタンコンポーネント
  const TabButton = ({ planKey, label }: { planKey: PlanKey; label: string }) => (
    <button
      onClick={() => setActiveTab(planKey)}
      className={`
        relative flex-1 py-3 px-4
        text-sm md:text-base font-serif font-light tracking-[0.04em]
        transition-all duration-300
        ${activeTab === planKey
          ? 'text-stone-800'
          : 'text-stone-400 hover:text-stone-600'
        }
      `}
      aria-selected={activeTab === planKey}
      role="tab"
    >
      {label}
      {activeTab === planKey && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-800"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  )

  // カードコンポーネント
  const PricingCard = ({ planKey, delay = 0 }: { planKey: PlanKey; delay?: number }) => {
    const plan = plans[planKey]

    // 明示的なカラークラス定義（Tailwind JIT対応）
    const colorClass = planKey === 'dinner'
      ? 'text-mitsumata-primary'
      : planKey === 'room'
        ? 'text-stone-700'
        : 'text-stone-600'

    const bgClass = planKey === 'dinner'
      ? 'bg-mitsumata-primary'
      : planKey === 'room'
        ? 'bg-stone-500'
        : 'bg-stone-400'

    const accentGradient = planKey === 'dinner'
      ? 'bg-gradient-to-r from-mitsumata-primary/80 via-mitsumata-primary to-mitsumata-primary/80'
      : planKey === 'room'
        ? 'bg-gradient-to-r from-stone-400/80 via-stone-400 to-stone-400/80'
        : 'bg-gradient-to-r from-stone-300/80 via-stone-300 to-stone-300/80'

    const hoverBgClass = planKey === 'dinner' ? 'bg-mitsumata-primary/5' : 'bg-stone-500/5'

    return (
      <FadeInSection delay={delay}>
        <motion.div
          whileHover={{ y: -12, scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-white rounded-sm shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] transition-all duration-400 overflow-hidden group cursor-pointer"
          tabIndex={0}
          role="article"
          aria-label={`${plan.title}プラン`}
        >
          {/* アクセント線 */}
          <motion.div
            className={`absolute top-0 left-0 right-0 h-0.5 sm:h-1 ${accentGradient}`}
            whileHover={{ height: '2px' }}
            transition={{ duration: 0.3 }}
          />

          <div className="p-6 sm:p-7 md:p-8 lg:p-10 space-y-6 sm:space-y-7 md:space-y-8">
            {/* カードタイトル */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className={`${STYLES.title.card} text-stone-800 text-center font-medium`}>
                {plan.title}
              </h3>

              {/* 価格 */}
              <div className="text-center space-y-1.5 sm:space-y-2">
                <div className="flex items-baseline justify-center gap-0.5 sm:gap-1">
                  <span className="text-xs sm:text-sm md:text-base font-sans text-stone-500">¥</span>
                  <span className={`text-[2.5rem] leading-none sm:text-5xl md:text-6xl font-serif font-light ${colorClass} tracking-tight`}>
                    {plan.price}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-sans text-stone-500 tracking-wide">
                  1名様あたり
                </p>
              </div>
            </div>

            {/* 区切り線 */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

            {/* 含まれる内容 */}
            <ul className="space-y-3 sm:space-y-4" role="list">
              {plan.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 sm:gap-3">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${bgClass} mt-2 sm:mt-2.5 flex-shrink-0`} aria-hidden="true" />
                  <span className={`${STYLES.text.body}`}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ホバー時の背景効果 */}
          <div className={`absolute inset-0 ${hoverBgClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
        </motion.div>
      </FadeInSection>
    )
  }

  return (
    <>
      {/* モバイル: タブインターフェース */}
      <div className="md:hidden">
        {/* タブボタン */}
        <div className="flex border-b border-stone-200 mb-8" role="tablist">
          <TabButton planKey="dinner" label="一泊二食" />
          <TabButton planKey="room" label="素泊まり" />
          <TabButton planKey="tent" label="テント泊" />
        </div>

        {/* タブコンテンツ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            role="tabpanel"
          >
            <PricingCard planKey={activeTab} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* デスクトップ: 3列グリッド */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
        <PricingCard planKey="dinner" delay={0.1} />
        <PricingCard planKey="room" delay={0.2} />
        <PricingCard planKey="tent" delay={0.3} />
      </div>
    </>
  )
}

// グッズギャラリーコンポーネント - モバイルは横スクロール、デスクトップはグリッド
function GoodsGallery() {
  const goodsItems = [
    { id: 1, name: 'ダミー商品名', image: '/images/lodges/DSCF8815.jpg' },
    { id: 2, name: 'ダミー商品名', image: '/images/lodges/_DSF4055.jpg' },
    { id: 3, name: 'ダミー商品名', image: '/images/lodges/DSCF0241.jpg' },
  ]

  return (
    <>
      {/* モバイル: 横スクロールカルーセル */}
      <div className="md:hidden">
        {/* スワイプヒント */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-6 text-stone-500"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-xs font-serif font-light tracking-[0.15em]">
            スワイプして閲覧
          </span>
          <ChevronRight className="w-4 h-4" />
        </motion.div>

        <Swiper
          modules={[FreeMode, Mousewheel, Pagination]}
          spaceBetween={16}
          slidesPerView={1.15}
          centeredSlides={true}
          freeMode={{
            enabled: true,
            sticky: false,
          }}
          mousewheel={{
            forceToAxis: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          breakpoints={{
            480: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 1.3,
              spaceBetween: 24,
            },
          }}
          className="!overflow-visible !pb-12"
          role="region"
          aria-label="お土産・グッズギャラリー"
        >
          {goodsItems.map((item, index) => (
            <SwiperSlide key={item.id}>
              <FadeInSection delay={index * 0.1}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="group relative aspect-[3/4] overflow-hidden bg-white cursor-pointer shadow-lg active:shadow-2xl transition-all duration-500"
                >
                  {/* 商品画像 */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out active:scale-105"
                    style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                    quality={90}
                    loading="lazy"
                  />

                  {/* オーバーレイと商品名 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 flex items-end justify-center pb-6 sm:pb-8">
                    <p className="text-white text-sm sm:text-base font-serif font-light tracking-[0.15em]">
                      {item.name}
                    </p>
                  </div>
                </motion.div>
              </FadeInSection>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* デスクトップ: 3列グリッド */}
      <div className="hidden md:grid md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
        {goodsItems.map((item, index) => (
          <FadeInSection key={item.id} delay={index * 0.1}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative aspect-[3/4] overflow-hidden bg-white cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* 商品画像 */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                quality={90}
                loading="lazy"
              />

              {/* ホバー時のオーバーレイと商品名 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                <p className="text-white text-base md:text-lg font-serif font-light tracking-[0.15em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.name}
                </p>
              </div>
            </motion.div>
          </FadeInSection>
        ))}
      </div>
    </>
  )
}

// 館内写真ギャラリーのデータ
const INTERIOR_IMAGES = [
  {
    id: 1,
    src: '/images/lodges/DSCF0598.jpg',
    alt: '受付カウンター',
    caption: '温かみのある受付空間'
  },
  {
    id: 2,
    src: '/images/lodges/_DSF9002-2.jpg',
    alt: '山岳本棚',
    caption: '青い壁の図書コーナー'
  },
  {
    id: 3,
    src: '/images/lodges/DSCF5126-2.jpg',
    alt: '窓際の景色',
    caption: '霧に包まれる山景色'
  },
  {
    id: 4,
    src: '/images/lodges/DSCF0360-2.jpg',
    alt: 'テントサイト',
    caption: '遠くに見える山小屋'
  },
  {
    id: 5,
    src: '/images/lodges/3259_22.jpg',
    alt: '食堂',
    caption: '山を望む食事空間'
  }
]

// 帯状カルーセルコンポーネント（モバイル最適化版）
function InteriorGalleryCarousel() {
  const [isPaused, setIsPaused] = useState(false)

  // 画像を3倍に複製してスムーズな無限ループ
  const duplicatedImages = [...INTERIOR_IMAGES, ...INTERIOR_IMAGES, ...INTERIOR_IMAGES]

  return (
    <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-28 xl:mt-32">
      {/* セクションタイトル - モバイル最適化 */}
      <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-20 px-5 sm:px-6">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="h-[1px] w-10 sm:w-12 bg-stone-300 mx-auto mb-5 sm:mb-6"
        />
        <h3 className="text-xl leading-[1.5] sm:text-[1.375rem] md:text-2xl lg:text-3xl font-serif font-light text-stone-800 tracking-[0.06em] sm:tracking-[0.07em] md:tracking-[0.08em]">
          館内の様子
        </h3>
      </div>

      {/* 帯状スクロールカルーセル - モバイル最適化 */}
      <div
        className="relative overflow-hidden w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-2 sm:gap-3"
          animate={{
            x: isPaused ? undefined : [0, -1740], // 画像5枚分
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 45,
              ease: "linear",
            },
          }}
          style={{ willChange: 'transform' }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[345px] group"
            >
              {/* 画像コンテナ */}
              <div className="relative aspect-square overflow-hidden bg-stone-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  quality={85}
                  loading="lazy"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 345px"
                />

                {/* 装飾番号 - モバイル最適化 */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                  <span className="text-[0.625rem] sm:text-xs font-light tracking-[0.2em] sm:tracking-[0.25em] text-white/90 font-sans drop-shadow-lg">
                    {String(((index % 5) + 1)).padStart(2, '0')}
                  </span>
                </div>

                {/* タップ/ホバー時のオーバーレイ＋キャプション */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-400">
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                    <p className="text-xs sm:text-sm font-serif font-light text-white tracking-[0.06em] sm:tracking-[0.08em] leading-relaxed">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>


        {/* 一時停止インジケーター - モバイル最適化 */}
        {isPaused && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 bg-white/95 backdrop-blur-sm px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-md"
          >
            <span className="text-[0.563rem] sm:text-[0.625rem] text-stone-600 font-light tracking-[0.15em]">PAUSE</span>
          </motion.div>
        )}
      </div>

      {/* 装飾線 - モバイル最適化 */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        viewport={{ once: true }}
        className="h-[1px] w-16 sm:w-20 bg-stone-300 mx-auto mt-12 sm:mt-16 md:mt-20"
      />
    </div>
  )
}

// セクション定義
const SECTIONS: SectionConfig[] = [
  { id: 'hero', label: '三俣山荘' },
  { id: 'about', label: '山荘について' },
  { id: 'accommodation', label: '宿泊料金' },
  { id: 'dining', label: 'お食事' },
  { id: 'attractions', label: '周辺の魅力' },
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
          {/* グラデーションオーバーレイ - 明るめに調整 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
        </motion.div>

        {/* ヒーローコンテンツ */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 h-full flex items-center justify-center"
        >
          <div className="text-center px-4 space-y-8">
            {/* メインタイトル - トップページと統一 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <h1
                className={`${STYLES.title.hero} text-white`}
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
                  黒部源流の山小屋
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
            aria-label="スクロールして続きを読む"
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
      <div id="about" className="post-hero-content relative">
        {/* 統一背景エフェクト */}
        <div className="absolute inset-0 z-0">
          <WashiBackground intensity="strong" animated={false} />
          {/* 木の影アニメーションを一時的に無効化 */}
          {/* <TreeShadowBackground intensity="subtle" enableParallax={true} /> */}
        </div>

        {/* イントロダクションセクション */}
        <section className={`relative ${STYLES.spacing.section}`}>
        <div className={`container mx-auto ${STYLES.spacing.container} max-w-6xl relative z-10`}>

          {/* センター配置のリード文 */}
          <FadeInSection>
            <div className="space-y-12 md:space-y-16 text-stone-700 text-center max-w-4xl mx-auto mb-32 md:mb-40 lg:mb-48">
              <p className="text-lg md:text-xl lg:text-2xl leading-[2.4] font-serif font-light tracking-[0.08em] text-stone-800">
                ここにリード文が入ります。ここにリード文が入ります。
                <br />
                ここにリード文が入ります。ここにリード文が入ります。
                <br />
                ここにリード文が入ります。ここにリード文が入ります。
              </p>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="h-[1px] w-16 md:w-20 bg-stone-300 mx-auto"
              />

              <div className="space-y-10 md:space-y-12">
                <p className={`${STYLES.text.body} text-stone-600 leading-[2.4]`}>
                  ここにリード文が入ります。ここにリード文が入ります。
                  <br />
                  ここにリード文が入ります。ここにリード文が入ります。
                  <br />
                  ここにリード文が入ります。ここにリード文が入ります。
                </p>

                <p className={`${STYLES.text.body} text-stone-600 leading-[2.4]`}>
                  ここにリード文が入ります。ここにリード文が入ります。
                  <br />
                  ここにリード文が入ります。ここにリード文が入ります。
                  <br />
                  ここにリード文が入ります。ここにリード文が入ります。
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* イラストエリア - モバイル最適化された洗練デザイン */}
          <FadeInSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative max-w-5xl mx-auto"
            >
              {/* イラスト本体 - クリーンで上品なデザイン */}
              <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] bg-gradient-to-br from-stone-50 via-stone-100 to-stone-50 overflow-hidden rounded-sm shadow-[0_6px_24px_rgb(0,0,0,0.06)] sm:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                {/* イラストプレースホルダー */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 sm:space-y-6 p-6 sm:p-8">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto relative">
                      <div className="absolute inset-0 bg-stone-200/40 rounded-full" />
                      <div className="absolute inset-2 bg-stone-300/30 rounded-full" />
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-stone-500 font-serif tracking-[0.15em] sm:tracking-[0.2em] font-light px-4">
                      三俣山荘周辺を表現したイラスト
                    </p>
                  </div>
                </div>

                {/* 繊細なテクスチャオーバーレイ */}
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="minimal-texture" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="0.8" fill="#8B7355" opacity="0.08"/>
                        <circle cx="50" cy="30" r="0.6" fill="#8B7355" opacity="0.06"/>
                        <circle cx="80" cy="60" r="0.7" fill="#8B7355" opacity="0.07"/>
                        <circle cx="30" cy="80" r="0.5" fill="#8B7355" opacity="0.05"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#minimal-texture)"/>
                  </svg>
                </div>
              </div>

              {/* キャプション - モバイルで読みやすく */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center mt-6 sm:mt-8 md:mt-10 text-[0.688rem] sm:text-xs md:text-sm text-stone-500 font-serif tracking-[0.2em] sm:tracking-[0.25em] font-light"
              >
                北アルプスの懐に佇む山小屋
              </motion.p>
            </motion.div>
          </FadeInSection>
        </div>
      </section>

      {/* Section Divider - Transition to visual content */}
      <div className="relative z-10">
        <SectionDivider />
      </div>

      {/* 写真セクション1 */}
      <section className={`relative ${STYLES.spacing.section}`}>
        <div className={`container mx-auto ${STYLES.spacing.container} max-w-7xl relative z-10`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            {/* 写真 - モバイルで見やすいアスペクト比 */}
            <div className="lg:col-span-8">
              <FadeInSection>
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative aspect-[4/3] sm:aspect-[3/2] md:aspect-[16/10] overflow-hidden shadow-xl sm:shadow-2xl rounded-sm"
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

            {/* テキスト - モバイルで読みやすく */}
            <div className="lg:col-span-4">
              <FadeInSection delay={0.3}>
                <div className="space-y-8 max-w-prose">
                  <h3 className={`${STYLES.title.section} text-stone-800`}>
                    展望食堂からの景色
                  </h3>
                  <p className={`${STYLES.text.body}`}>
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

      {/* 写真セクション2 */}
      <section className={`relative ${STYLES.spacing.section}`}>
        <div className={`container mx-auto ${STYLES.spacing.container} max-w-7xl relative z-10`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            {/* テキスト - モバイルでは写真の下 */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <FadeInSection delay={0.3}>
                <div className="space-y-8 max-w-prose">
                  <h3 className={`${STYLES.title.section} text-stone-800`}>
                    豊かな植生
                  </h3>
                  <p className={`${STYLES.text.body}`}>
                    ここに説明文が入ります。ダミーテキストです。
                    サンプルテキストがここに表示されます。
                    ここに説明文が入ります。
                    ダミーテキストです。
                    サンプルテキストがここに表示されます。
                  </p>
                </div>
              </FadeInSection>
            </div>

            {/* 写真 - モバイルで見やすい縦長 */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <FadeInSection>
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden shadow-xl sm:shadow-2xl rounded-sm"
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

      {/* 写真セクション3 */}
      <section className={`relative ${STYLES.spacing.section}`}>
        <div className={`container mx-auto ${STYLES.spacing.container} max-w-7xl relative z-10`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            {/* 写真 */}
            <div className="lg:col-span-8">
              <FadeInSection>
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative aspect-[4/3] sm:aspect-[3/2] md:aspect-[16/10] overflow-hidden shadow-xl sm:shadow-2xl rounded-sm"
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

            {/* テキスト */}
            <div className="lg:col-span-4">
              <FadeInSection delay={0.3}>
                <div className="space-y-8 max-w-prose">
                  <h3 className={`${STYLES.title.section} text-stone-800`}>
                    スタッフの明るさ
                  </h3>
                  <p className={`${STYLES.text.body}`}>
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
      </div>

      {/* 宿泊料金セクション */}
      <section id="accommodation" className={`relative ${STYLES.spacing.section}`}>
        <div className={`container mx-auto ${STYLES.spacing.container} max-w-7xl relative z-10`}>
          {/* セクションタイトル */}
          <FadeInSection>
            <div className={`text-center ${STYLES.spacing.mb.header} space-y-6`}>
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

              <p className={`${STYLES.text.body} text-stone-600`}>
                料金プラン
              </p>
            </div>
          </FadeInSection>

          {/* 料金カード - モバイルはタブ、デスクトップは3列グリッド */}
          <PricingCards />

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

          {/* 館内写真ギャラリー - シネマティックカルーセル */}
          <FadeInSection delay={0.6}>
            <InteriorGalleryCarousel />
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
      {/* 導入セクション */}
      <section id="dining" className="relative h-[35vh] sm:h-[45vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        {/* 背景写真 */}
        <div className="absolute inset-0">
          {/* 三俣山荘の食事風景または代表的な料理の全景を示す写真を配置（温かみのある雰囲気の写真） */}
          <Image
            src="/images/lodges/DSCF8130.jpg"
            alt="三俣山荘の食事"
            fill
            className="object-cover"
            style={{ filter: 'brightness(0.75) saturate(0.9)' }}
            quality={90}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>

        {/* コンテンツ - モバイル最適化 */}
        <div className="relative h-full flex flex-col items-center justify-center z-10 px-5 sm:px-6">
          <FadeInSection>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="text-center space-y-8 sm:space-y-10 md:space-y-12"
            >
              {/* タイトル - モバイル最適化 */}
              <h2
                className="text-xl leading-[1.4] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-light text-white tracking-[0.12em] sm:tracking-[0.14em] md:tracking-[0.15em]"
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

      {/* 料理ギャラリー - モバイル最適化 */}
      <section className="relative py-10 sm:py-14 md:py-18 lg:py-24 xl:py-28">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 md:gap-14 lg:gap-20 items-center">
            {/* 写真エリア - 左側 */}
            <div className="lg:col-span-7">
              <FadeInSection>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-150px" }}
                >
                  {/* 2枚の縦構図写真を横並びに配置 */}
                  <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                    {/* 朝食の写真 */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true, margin: "-150px" }}
                      className="space-y-4"
                    >
                      <div className="relative aspect-[2/3] overflow-hidden shadow-2xl">
                        <Image
                          src="/images/lodges/DSCF4852.jpg"
                          alt="三俣山荘の朝食"
                          fill
                          className="object-cover"
                          style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                          quality={95}
                          loading="lazy"
                        />
                      </div>
                      {/* ラベル - 写真の下に配置 */}
                      <div className="text-center space-y-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "2rem" }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                          viewport={{ once: true }}
                          className="h-[1px] bg-stone-300 mx-auto"
                        />
                        <p className="text-sm md:text-base font-serif font-light text-stone-700 tracking-[0.2em]">
                          朝食
                        </p>
                      </div>
                    </motion.div>

                    {/* 夕食の写真 */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true, margin: "-150px" }}
                      className="space-y-4"
                    >
                      <div className="relative aspect-[2/3] overflow-hidden shadow-2xl">
                        <Image
                          src="/images/lodges/DSCF5065.jpg"
                          alt="三俣山荘の夕食"
                          fill
                          className="object-cover"
                          style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                          quality={95}
                          loading="lazy"
                        />
                      </div>
                      {/* ラベル - 写真の下に配置 */}
                      <div className="text-center space-y-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "2rem" }}
                          transition={{ duration: 0.8, delay: 0.7 }}
                          viewport={{ once: true }}
                          className="h-[1px] bg-stone-300 mx-auto"
                        />
                        <p className="text-sm md:text-base font-serif font-light text-stone-700 tracking-[0.2em]">
                          夕食
                        </p>
                      </div>
                    </motion.div>
                  </div>
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
                      三俣の朝食と夕食
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
                    標高2,550mの山小屋で味わう、心温まる食事。
                    新鮮な食材を使った朝食と、一日の疲れを癒す夕食をご用意しています。
                  </p>
                </motion.div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* 展望食堂の喫茶 */}
      <section className="relative py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            {/* テキスト - 左側 */}
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
                      展望食堂の喫茶
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
                    山々を見渡す展望食堂で、くつろぎのひとときを。
                    心地よい空間で、こだわりの喫茶メニューをお楽しみいただけます。
                  </p>
                </motion.div>
              </FadeInSection>
            </div>

            {/* 写真エリア - 右側 */}
            <div className="lg:col-span-7">
              <FadeInSection>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-150px" }}
                >
                  {/* 2枚の縦構図写真を横並びに配置 */}
                  <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                    {/* 喫茶の写真 1 */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true, margin: "-150px" }}
                      className="space-y-4"
                    >
                      <div className="relative aspect-[2/3] overflow-hidden shadow-2xl">
                        <Image
                          src="/images/lodges/DSCF4691.jpg"
                          alt="展望食堂の喫茶"
                          fill
                          className="object-cover"
                          style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                          quality={95}
                          loading="lazy"
                        />
                      </div>
                    </motion.div>

                    {/* 喫茶の写真 2 */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true, margin: "-150px" }}
                      className="space-y-4"
                    >
                      <div className="relative aspect-[2/3] overflow-hidden shadow-2xl">
                        <Image
                          src="/images/lodges/DSCF4820.jpg"
                          alt="展望食堂の喫茶"
                          fill
                          className="object-cover"
                          style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                          quality={95}
                          loading="lazy"
                        />
                      </div>
                    </motion.div>
                  </div>
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
                  {/* サイフォンコーヒーとチャイの写真 */}
                  <Image
                    src="/images/lodges/DSCF2356.jpg"
                    alt="サイフォンコーヒーとチャイ"
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
                    サイフォンコーヒーとチャイ
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
                  丁寧に淹れたサイフォンコーヒーと、スパイスの香り豊かなチャイ。
                  展望食堂で、特別なひとときをお過ごしください。
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

          {/* グッズギャラリー - モバイルは横スクロール、デスクトップはグリッド */}
          <GoodsGallery />

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

      {/* Section Divider - Transition to Attractions */}
      <div className="relative z-10">
        <SectionAnchorLinks
          previousSection={{ id: 'dining', label: 'お食事' }}
          nextSection={{ id: 'attractions', label: '周辺の魅力' }}
        />
      </div>

      {/* 周辺の魅力セクション */}
      <section id="attractions" className="relative">
        {/* 周辺の魅力 - 導入 */}
        <div className={`${STYLES.spacing.section}`}>
          <div className={`container mx-auto ${STYLES.spacing.container} max-w-4xl relative z-10`}>
            <FadeInSection>
              <div className={`text-center ${STYLES.spacing.mb.header} space-y-6`}>
                <h2 className={`${STYLES.title.section} text-stone-800`}>
                  周辺の魅力
                </h2>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto"
                />

                <p className={`${STYLES.text.body} text-stone-600`}>
                  三俣山荘を起点に広がる、雄大な自然の魅力をご紹介します
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>

        {/* 黒部源流サブセクション */}
        {/* オープニング */}
        <section id="kurobe" ref={kurobeRef} className="relative h-[35vh] sm:h-[45vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        {/* 背景写真 */}
        <div className="absolute inset-0">
          {/* 黒部源流の雄大な自然風景写真を配置（例：源流の清流、山々の連なり、渓谷の風景など）*/}
          <Image
            src="/images/lodges/DSCF9939.jpg"
            alt="黒部源流の景色"
            fill
            className="object-cover"
            style={{ filter: 'brightness(0.75) saturate(1.1)' }}
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
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-light text-white tracking-[0.15em] leading-[1.3]"
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

      {/* リード文セクション */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-4xl">
          <FadeInSection>
            <div className="text-center space-y-8">
              <p className="text-lg md:text-xl lg:text-2xl font-serif font-light text-stone-700 leading-[2.2] tracking-[0.05em]">
                ダミーテキスト。ここに説明文が入ります。
                <br />
                ダミーテキストです。サンプルテキストがここに表示されます。
                <br />
                ここに説明文が入ります。ダミーテキストです。
              </p>
              <p className="text-base md:text-lg font-serif font-light text-stone-600 leading-[2] tracking-[0.04em]">
                サンプルテキストがここに表示されます。ダミーテキストです。
                <br />
                ここに説明文が入ります。
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative z-10">
        <SectionDivider />
      </div>

      {/* アクセス・コースタイムセクション */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-4xl">
          <FadeInSection>
            <div className="space-y-8">
              <h3 className={`${STYLES.title.section} text-stone-800 text-center`}>
                アクセス
              </h3>

              <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-stone-200">
                <div className="space-y-6">
                  {/* コースタイム */}
                  <div className="text-center pb-6 border-b border-stone-200">
                    <p className="text-lg md:text-xl font-serif text-stone-700 mb-2">
                      三俣山荘から黒部源流
                    </p>
                    <p className="text-base md:text-lg text-stone-600 font-serif font-light">
                      片道 約1時間
                    </p>
                  </div>

                  {/* 注意事項 */}
                  <div className="space-y-3">
                    <p className="text-sm md:text-base text-stone-600 font-serif font-light leading-relaxed">
                      • 登山道は整備されていない箇所があります<br />
                      • 天候の急変に備え、早朝出発をおすすめします<br />
                      • 熊の生息地域です。熊鈴の携行をお願いします
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative z-10">
        <SectionDivider />
      </div>

      {/* ストーリー展開 - 画面1：朝靄の源流 */}
      <section className="relative py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* 左側：テキスト */}
            <div className="lg:col-span-5 flex items-center">
              <FadeInSection delay={0.1}>
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

            {/* 右側：写真2枚を上品にコンパクトに配置 */}
            <div className="lg:col-span-7">
              <div className="space-y-8 md:space-y-10 lg:space-y-12">
                {/* 1枚目：縦長写真（DSCF9236.jpg）- コンパクトに */}
                <FadeInSection delay={0.2}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative w-[52%] overflow-hidden shadow-lg"
                    whileHover={{ scale: 1.015 }}
                  >
                    <Image
                      src="/images/lodges/DSCF9236.jpg"
                      alt="黒部源流の風景"
                      width={6240}
                      height={4160}
                      className="w-full h-auto"
                      quality={90}
                      loading="lazy"
                    />
                  </motion.div>
                </FadeInSection>

                {/* 2枚目：横長写真（DSCF9354.jpg）- 見やすいサイズに右寄せ */}
                <FadeInSection delay={0.3}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative w-[80%] ml-auto overflow-hidden shadow-lg"
                    whileHover={{ scale: 1.015 }}
                  >
                    <Image
                      src="/images/lodges/DSCF9354.jpg"
                      alt="黒部源流の風景"
                      width={4160}
                      height={6240}
                      className="w-full h-auto"
                      quality={90}
                      loading="lazy"
                    />
                  </motion.div>
                </FadeInSection>
              </div>
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
            {/* パノラマ写真 - 元のアスペクト比で表示 */}
            <FadeInSection>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative w-full overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
              >
                {/* 原生林のパノラマ写真を配置（木漏れ日が差し込む森の中、横長のワイド構図） */}
                <Image
                  src="/images/lodges/_DSF5988.jpg"
                  alt="黒部源流の自然"
                  width={6240}
                  height={4160}
                  className="w-full h-auto"
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
                    イワナ
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
                  className="relative overflow-hidden shadow-2xl max-w-[65%] mx-auto"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* イワナの写真 */}
                  <Image
                    src="/images/lodges/DSCF2821.jpg"
                    alt="イワナ"
                    width={1365}
                    height={2048}
                    className="w-full h-auto"
                    quality={90}
                    loading="lazy"
                  />
                </motion.div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Subsection Divider */}
      <div className="relative z-10">
        <SectionDivider />
      </div>

      {/* 伊藤新道稜線ルート サブセクション */}
      {/* オープニング */}
      <section id="ito-shindo" className="relative h-[35vh] sm:h-[45vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        {/* 背景写真 */}
        <div className="absolute inset-0">
          {/* 伊藤新道の稜線ルートの風景写真を配置（登山道や山岳風景、登山者の姿など） */}
          <Image
            src="/images/lodges/DSCF3047.jpg"
            alt="伊藤新道稜線ルートの景色"
            fill
            className="object-cover"
            style={{ filter: 'brightness(0.75) saturate(1.1)' }}
            quality={95}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* タイトル */}
        <div className="relative h-full flex items-center justify-center z-10">
          <FadeInSection>
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-light text-white tracking-[0.15em] leading-[1.3]"
              style={{
                textShadow: "0 6px 60px rgba(0,0,0,0.95), 0 3px 20px rgba(0,0,0,1)",
                fontFeatureSettings: "'palt' 1"
              }}
            >
              伊藤新道 稜線ルート
            </motion.h2>
          </FadeInSection>
        </div>
      </section>

      {/* リード文セクション */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-4xl">
          <FadeInSection>
            <div className="text-center space-y-8">
              <p className="text-lg md:text-xl lg:text-2xl font-serif font-light text-stone-700 leading-[2.2] tracking-[0.05em]">
                ダミーテキスト。ここに説明文が入ります。
                <br />
                ダミーテキストです。サンプルテキストがここに表示されます。
                <br />
                ここに説明文が入ります。ダミーテキストです。
              </p>
              <p className="text-base md:text-lg font-serif font-light text-stone-600 leading-[2] tracking-[0.04em]">
                サンプルテキストがここに表示されます。ダミーテキストです。
                <br />
                ここに説明文が入ります。
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative z-10">
        <SectionDivider />
      </div>

      {/* ストーリー展開 - 画面1：スポット1 */}
      <section className="relative py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* 左側：テキスト */}
            <div className="lg:col-span-5 flex items-center">
              <FadeInSection delay={0.1}>
                <div className="space-y-6 max-w-prose">
                  <h3 className={`${STYLES.title.section} text-stone-800`}>
                    展望台
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

            {/* 右側：写真2枚を上品にコンパクトに配置 */}
            <div className="lg:col-span-7">
              <div className="space-y-8 md:space-y-10 lg:space-y-12">
                {/* 1枚目：写真 */}
                <FadeInSection delay={0.2}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative w-[52%] overflow-hidden shadow-lg"
                    whileHover={{ scale: 1.015 }}
                  >
                    <Image
                      src="/images/lodges/3256_10.jpg"
                      alt="展望台"
                      width={1361}
                      height={2048}
                      className="w-full h-auto"
                      quality={90}
                      loading="lazy"
                    />
                  </motion.div>
                </FadeInSection>

                {/* 2枚目：写真 */}
                <FadeInSection delay={0.3}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative w-[80%] ml-auto overflow-hidden shadow-lg"
                    whileHover={{ scale: 1.015 }}
                  >
                    <Image
                      src="/images/placeholder.jpg"
                      alt="伊藤新道稜線ルートの風景"
                      width={4160}
                      height={6240}
                      className="w-full h-auto"
                      quality={90}
                      loading="lazy"
                    />
                  </motion.div>
                </FadeInSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative z-10">
        <SectionDivider />
      </div>

      {/* ストーリー展開 - 画面2：スポット2 */}
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
                className="relative w-full overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="/images/placeholder.jpg"
                  alt="伊藤新道稜線ルートの自然"
                  width={6240}
                  height={4160}
                  className="w-full h-auto"
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

      {/* ストーリー展開 - 画面3：スポット3 */}
      <section className="relative py-12 md:py-20 lg:py-28">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* テキスト - 左側 (モバイルでは写真の下) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <FadeInSection delay={0.3}>
                <div className="space-y-6 max-w-prose">
                  <h3 className={`${STYLES.title.section} text-stone-800`}>
                    スポット名
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
                  className="relative overflow-hidden shadow-2xl max-w-[65%] mx-auto"
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src="/images/placeholder.jpg"
                    alt="伊藤新道稜線ルートの風景"
                    width={1365}
                    height={2048}
                    className="w-full h-auto"
                    quality={90}
                    loading="lazy"
                  />
                </motion.div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      </section>
      {/* End of 周辺の魅力 section */}

      {/* Section Divider - Transition to access information */}
      <div className="relative z-10">
        <SectionAnchorLinks
          previousSection={{ id: 'attractions', label: '周辺の魅力' }}
          nextSection={{ id: 'access', label: 'アクセス' }}
        />
      </div>

      {/* 交通・アクセスセクション */}
      {/* ヘッダー - 50vh */}
      <section id="access" className="relative h-[40vh] sm:h-[50vh] md:h-[55vh] overflow-hidden">
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
      <section id="faq" className={`relative ${STYLES.spacing.section}`}>
        <div className={`container mx-auto ${STYLES.spacing.container} max-w-5xl`}>
          {/* Section Header - Centered */}
          <FadeInSection delay={0.1}>
            <div className={`text-center ${STYLES.spacing.mb.header} max-w-3xl mx-auto`}>
              <h2 className={`${STYLES.title.section} mb-6 md:mb-8 text-balance`}>
                よくあるご質問
              </h2>
              <p className={`${STYLES.text.body} text-pretty`}>
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
                    <Accordion.Trigger className="text-left font-serif font-light text-base md:text-lg tracking-[0.04em] leading-[1.7] text-gray-900 hover:no-underline py-4 md:py-5 border-b border-gray-200 hover:border-gray-400 transition-all duration-300">
                      <span className="pr-4">質問テキスト</span>
                    </Accordion.Trigger>
                    <Accordion.Content className="text-sm md:text-base lg:text-lg text-gray-700 leading-[1.8] tracking-[0.04em] font-serif font-light pt-4 md:pt-5 pb-2 text-pretty">
                      ここに回答テキストが入ります。ダミーテキストです。
                      サンプルテキストがここに表示されます。
                    </Accordion.Content>
                  </Accordion.Item>

                  <Accordion.Item value="faq-2" className="border-none">
                    <Accordion.Trigger className="text-left font-serif font-light text-base md:text-lg tracking-[0.04em] leading-[1.7] text-gray-900 hover:no-underline py-4 md:py-5 border-b border-gray-200 hover:border-gray-400 transition-all duration-300">
                      <span className="pr-4">質問テキスト</span>
                    </Accordion.Trigger>
                    <Accordion.Content className="text-sm md:text-base lg:text-lg text-gray-700 leading-[1.8] tracking-[0.04em] font-serif font-light pt-4 md:pt-5 pb-2 text-pretty">
                      ここに回答テキストが入ります。ダミーテキストです。
                      サンプルテキストがここに表示されます。
                    </Accordion.Content>
                  </Accordion.Item>

                  <Accordion.Item value="faq-3" className="border-none">
                    <Accordion.Trigger className="text-left font-serif font-light text-base md:text-lg tracking-[0.04em] leading-[1.7] text-gray-900 hover:no-underline py-4 md:py-5 border-b border-gray-200 hover:border-gray-400 transition-all duration-300">
                      <span className="pr-4">質問テキスト</span>
                    </Accordion.Trigger>
                    <Accordion.Content className="text-sm md:text-base lg:text-lg text-gray-700 leading-[1.8] tracking-[0.04em] font-serif font-light pt-4 md:pt-5 pb-2 text-pretty">
                      ここに回答テキストが入ります。ダミーテキストです。
                      サンプルテキストがここに表示されます。
                    </Accordion.Content>
                  </Accordion.Item>

                  <Accordion.Item value="faq-4" className="border-none">
                    <Accordion.Trigger className="text-left font-serif font-light text-base md:text-lg tracking-[0.04em] leading-[1.7] text-gray-900 hover:no-underline py-4 md:py-5 border-b border-gray-200 hover:border-gray-400 transition-all duration-300">
                      <span className="pr-4">質問テキスト</span>
                    </Accordion.Trigger>
                    <Accordion.Content className="text-sm md:text-base lg:text-lg text-gray-700 leading-[1.8] tracking-[0.04em] font-serif font-light pt-4 md:pt-5 pb-2 text-pretty">
                      ここに回答テキストが入ります。ダミーテキストです。
                      サンプルテキストがここに表示されます。
                    </Accordion.Content>
                  </Accordion.Item>

                  <Accordion.Item value="faq-5" className="border-none">
                    <Accordion.Trigger className="text-left font-serif font-light text-base md:text-lg tracking-[0.04em] leading-[1.7] text-gray-900 hover:no-underline py-4 md:py-5 border-b border-gray-200 hover:border-gray-400 transition-all duration-300">
                      <span className="pr-4">質問テキスト</span>
                    </Accordion.Trigger>
                    <Accordion.Content className="text-sm md:text-base lg:text-lg text-gray-700 leading-[1.8] tracking-[0.04em] font-serif font-light pt-4 md:pt-5 pb-2 text-pretty">
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
      <section id="reservation" className="relative py-16 sm:py-20 md:py-28 lg:py-36 xl:py-40">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 max-w-6xl relative">
          <FadeInSection>
            {/* ヘッダー - モバイル最適化 */}
            <div className="text-center mb-12 sm:mb-14 md:mb-18 lg:mb-20 space-y-4 sm:space-y-5 md:space-y-6">
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
                whileInView={{ width: "4rem" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="h-[1.5px] sm:h-[2px] bg-gradient-to-r from-transparent via-stone-400 to-transparent mx-auto"
              />

              <motion.p
                className="text-[0.938rem] leading-[1.95] sm:text-base sm:leading-[1.9] md:text-lg font-serif font-light text-stone-600 tracking-[0.045em] sm:tracking-[0.05em] max-w-2xl mx-auto px-4 sm:px-0"
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

            {/* 予約ボタン - モバイル最適化 */}
            <FadeInSection delay={0.2}>
              <div className="flex flex-col items-center space-y-6 sm:space-y-8 mb-12 sm:mb-16">
                <motion.a
                  href="https://example.com/reservation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2.5 sm:gap-3 px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-6 bg-gradient-to-r from-stone-700 to-stone-800 text-white rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-300 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-600 focus-visible:ring-offset-2 sm:focus-visible:ring-offset-4 w-full max-w-xs sm:max-w-sm md:max-w-md"
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
    </main>
  )
}
