import { FadeInSection } from "@/components/animations/fade-in-section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const faqData = [
  {
    category: "予約について",
    questions: [
      {
        question: "予約は必要ですか？",
        answer: "はい、特に週末や連休は混雑が予想されますので、事前のご予約をお勧めします。お電話またはメールにてご予約を承っております。"
      },
      {
        question: "キャンセル料はかかりますか？",
        answer: "天候不良等やむを得ない事情を除き、キャンセル料が発生する場合がございます。詳しくは各山荘までお問い合わせください。"
      },
      {
        question: "当日予約は可能ですか？",
        answer: "空室がある場合のみ可能です。ただし、確実にご宿泊いただくためには事前のご予約をお勧めします。"
      }
    ]
  },
  {
    category: "施設について",
    questions: [
      {
        question: "個室はありますか？",
        answer: "三俣山荘には個室がございます。水晶小屋と湯俣山荘は相部屋のみとなります。"
      },
      {
        question: "Wi-Fiは使えますか？",
        answer: "申し訳ございませんが、山小屋という特性上、Wi-Fiはご利用いただけません。携帯電話の電波も届きにくい場所がございます。"
      },
      {
        question: "お風呂はありますか？",
        answer: "湯俣山荘には温泉がございます。三俣山荘と水晶小屋にはお風呂はございませんが、手拭きタオルをご用意しております。"
      }
    ]
  },
  {
    category: "食事について",
    questions: [
      {
        question: "食事のみの利用は可能ですか？",
        answer: "宿泊者優先となりますが、状況により可能です。事前にお問い合わせください。"
      },
      {
        question: "アレルギー対応はできますか？",
        answer: "可能な限り対応いたしますが、山小屋という環境のため、完全な対応が難しい場合がございます。予約時にご相談ください。"
      },
      {
        question: "名物料理はありますか？",
        answer: "三俣山荘のジビエシチューが名物です。ぜひお試しください。"
      }
    ]
  },
  {
    category: "アクセスについて",
    questions: [
      {
        question: "登山初心者でも大丈夫ですか？",
        answer: "三俣山荘グループは標高が高く、アクセスに時間がかかります。ある程度の登山経験と体力が必要です。不安な方は事前にご相談ください。"
      },
      {
        question: "荷物の事前配送は可能ですか？",
        answer: "申し訳ございませんが、荷物の事前配送サービスは行っておりません。"
      },
      {
        question: "悪天候時はどうなりますか？",
        answer: "登山道が通行止めになる場合がございます。出発前に必ず最新の情報をご確認ください。"
      }
    ]
  }
]

export default function FAQPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container mx-auto px-4 max-w-4xl py-20">
        <FadeInSection>
          <div className="text-center mb-12">
            <HelpCircle className="w-16 h-16 text-mitsumata mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-stone-900">よくある質問</h1>
            <p className="text-lg text-gray-700">
              三俣山荘グループに関するよくあるご質問をまとめました。
            </p>
          </div>
        </FadeInSection>

        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <FadeInSection key={categoryIndex} delay={categoryIndex * 0.1}>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-mitsumata border-b border-gray-200 pb-4">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, questionIndex) => (
                    <AccordionItem key={questionIndex} value={`item-${categoryIndex}-${questionIndex}`}>
                      <AccordionTrigger className="text-left hover:text-mitsumata transition-colors">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.5}>
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-8 mt-12 text-center">
            <h3 className="font-bold text-xl mb-4">その他のご質問</h3>
            <p className="text-gray-700 mb-6">
              上記以外のご質問がございましたら、お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div>
                <p className="font-semibold">電話</p>
                <p className="text-sm text-gray-600">0263-XX-XXXX</p>
              </div>
              <div>
                <p className="font-semibold">メール</p>
                <p className="text-sm text-gray-600">info@mitsumatasanso.com</p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </main>
  )
}
