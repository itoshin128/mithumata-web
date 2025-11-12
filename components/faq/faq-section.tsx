"use client"

import { Button } from "@/components/ui/button"

import { FadeInSection } from "@/components/animations/fade-in-section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar, Utensils, Home, MapPin, Mail, ArrowRight } from "lucide-react"

const faqData = [
  {
    category: "予約・キャンセル",
    icon: Calendar,
    color: "#2d5016",
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

export function FAQSection() {
  return (
    <section className="relative z-20 py-20 lg:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* セクションヘッダー */}
        <FadeInSection className="text-center mb-16">
          <h2 className="text-5xl md:text-4xl sm:text-3xl font-bold mb-6 text-gray-900 text-balance">よくあるご質問</h2>
          <p className="text-xl md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            お問い合わせの多いご質問をまとめました。
            <br className="hidden md:block" />
            その他のご質問は、お気軽にお問い合わせください。
          </p>
        </FadeInSection>

        {/* FAQ アコーディオン */}
        <FadeInSection delay={0.2}>
          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => {
              const Icon = category.icon
              return (
                <div key={categoryIndex} className="bg-gray-50 rounded-2xl p-6 md:p-8">
                  {/* カテゴリヘッダー */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: category.color }} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                  </div>

                  {/* 質問リスト */}
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((item, questionIndex) => (
                      <AccordionItem
                        key={questionIndex}
                        value={`${categoryIndex}-${questionIndex}`}
                        className="bg-white rounded-lg px-6 border-none shadow-sm"
                      >
                        <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline py-4">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700 leading-relaxed pb-4">{item.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )
            })}
          </div>
        </FadeInSection>

        {/* お問い合わせCTA */}
        <FadeInSection delay={0.4} className="text-center mt-12">
          <p className="text-gray-600 mb-6">その他のご質問がございましたら、お気軽にお問い合わせください。</p>
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-base bg-transparent border-2 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-300 group"
          >
            <span className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              お問い合わせ
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </FadeInSection>
      </div>
    </section>
  )
}
