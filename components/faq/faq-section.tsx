"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FadeInSection } from "@/components/animations/fade-in-section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar, Utensils, Home, MapPin, Mail, ArrowRight } from "lucide-react"

const faqData = [
  {
    category: "予約・キャンセル",
    icon: Calendar,
    color: "#2d5016",
    align: "left" as const,
    questions: [
      {
        q: "予約はいつから可能ですか?",
        a: "一般予約は3月1日から開始します。団体予約(10名以上)は1月から受付を開始しています。",
      },
      {
        q: "キャンセル料はかかりますか?",
        a: "前日キャンセルは50%、当日キャンセルは100%のキャンセル料が発生します。天候不良による中止の場合はキャンセル料はかかりません。",
      },
    ],
  },
  {
    category: "食事・喫茶",
    icon: Utensils,
    color: "#b8604a",
    align: "right" as const,
    questions: [
      {
        q: "ジビエシチューは予約が必要ですか?",
        a: "三俣山荘のジビエシチューは予約不要です。営業時間内であればいつでもお召し上がりいただけます。",
      },
      {
        q: "テント泊でも食事は利用できますか?",
        a: "はい、テント泊の方も食堂をご利用いただけます。夕食・朝食ともに事前予約をおすすめします。",
      },
    ],
  },
  {
    category: "設備・トイレ",
    icon: Home,
    color: "#5ba4cf",
    align: "left" as const,
    questions: [
      {
        q: "水は購入できますか?",
        a: "はい、各山荘で飲料水を販売しています。また、水場も利用可能です(無料)。",
      },
      {
        q: "トイレは水洗ですか?",
        a: "環境に配慮したバイオトイレを導入しています。清潔で快適にご利用いただけます。",
      },
    ],
  },
  {
    category: "アクセス・装備",
    icon: MapPin,
    color: "#f9a825",
    align: "right" as const,
    questions: [
      {
        q: "初心者でも行けますか?",
        a: "三俣山荘へは裏銀座縦走路を通るため、中級者以上の体力と経験が必要です。湯俣山荘は比較的アクセスしやすい立地です。",
      },
      {
        q: "必要な装備を教えてください",
        a: "登山靴、雨具、防寒着、ヘッドランプ、地図・コンパスは必須です。詳しくは装備リストをご確認ください。",
      },
    ],
  },
]

function SectionDivider() {
  return (
    <div className="flex items-center justify-center my-20 md:my-24 lg:my-32">
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

export function FAQSection() {
  return (
    <section className="relative py-20 md:py-32 lg:py-40">
      <div className="container mx-auto px-0 md:px-6 max-w-7xl">
        {/* Section Header */}
        <FadeInSection delay={0.1}>
          <div className="flex justify-end mb-20 md:mb-24 lg:mb-32">
            <div className="max-w-xl text-right mr-6 md:mr-12 lg:mr-20 ml-auto">
              <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-serif font-light mb-8 md:mb-10 tracking-[0.08em] leading-[1.6] text-balance">
                よくあるご質問
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-[1.9] tracking-[0.04em] font-serif font-light text-pretty">
                お問い合わせの多いご質問をまとめました。
                <br className="hidden md:block" />
                その他のご質問は、お気軽にお問い合わせください。
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* FAQ Categories */}
        {faqData.map((category, categoryIndex) => {
          const Icon = category.icon
          const isLeft = category.align === "left"

          return (
            <div key={categoryIndex}>
              <FadeInSection delay={categoryIndex * 0.1 + 0.2}>
                <div
                  className={`mb-20 md:mb-24 lg:mb-28 max-w-[340px] md:max-w-lg lg:max-w-3xl ${
                    isLeft ? "ml-6 md:ml-12 lg:ml-20 mr-auto" : "mr-6 md:mr-12 lg:mr-20 ml-auto"
                  }`}
                >
                  {/* Category Header */}
                  <div className={`flex items-center gap-4 mb-8 md:mb-10 ${
                    isLeft ? "" : "flex-row-reverse"
                  }`}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg"
                      style={{
                        backgroundColor: `${category.color}15`,
                        borderColor: category.color,
                        borderWidth: "2px",
                      }}
                    >
                      <Icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: category.color }} />
                    </motion.div>

                    <div className={isLeft ? "text-left" : "text-right"}>
                      <h3
                        className="text-lg md:text-xl lg:text-2xl font-serif font-light tracking-[0.06em] leading-[1.6]"
                        style={{ color: category.color }}
                      >
                        {category.category}
                      </h3>
                    </div>
                  </div>

                  {/* Questions Accordion */}
                  <Accordion type="single" collapsible className="space-y-4 md:space-y-5">
                    {category.questions.map((item, questionIndex) => (
                      <AccordionItem
                        key={questionIndex}
                        value={`${categoryIndex}-${questionIndex}`}
                        className="border-none"
                      >
                        <AccordionTrigger
                          className={`
                            text-left font-serif font-light text-sm md:text-base lg:text-lg
                            tracking-[0.04em] leading-[1.6]
                            text-gray-900 hover:no-underline
                            py-5 md:py-6
                            border-b border-gray-200
                            hover:border-gray-400
                            transition-all duration-300
                          `}
                        >
                          <span className="pr-4">{item.q}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm md:text-base text-gray-700 leading-[1.9] tracking-[0.04em] font-serif font-light pt-4 md:pt-5 pb-2 text-pretty">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </FadeInSection>

              {categoryIndex < faqData.length - 1 && (
                <div className="my-16 md:my-20 lg:my-24">
                  <div className={`flex ${
                    isLeft ? "justify-end mr-6 md:mr-20" : "justify-start ml-6 md:ml-20"
                  }`}>
                    <div className="w-12 md:w-20 h-[1px]" style={{ backgroundColor: `${category.color}40` }}></div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        <SectionDivider />

        {/* Contact CTA */}
        <FadeInSection delay={0.5}>
          <div className="text-center mt-24 md:mt-28 lg:mt-32">
            <p className="text-sm md:text-base text-gray-700 mb-8 md:mb-10 font-serif font-light tracking-[0.04em] leading-[1.9]">
              その他のご質問がございましたら、お気軽にお問い合わせください。
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgb(17, 24, 39)" }}
                whileTap={{ scale: 0.95 }}
                className="
                  group
                  inline-flex items-center gap-3
                  px-10 py-5
                  border border-gray-900
                  rounded-full
                  text-gray-900
                  font-light
                  tracking-[0.2em]
                  transition-all duration-500
                  hover:text-white
                  hover:shadow-xl
                "
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">お問い合わせ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
              </motion.button>
            </Link>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
