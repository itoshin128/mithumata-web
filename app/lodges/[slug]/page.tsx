import { notFound } from "next/navigation"
import Image from "next/image"
import { Mountain, Users, MapPin, Utensils, Home, Droplet, Calendar, Phone, Mail } from "lucide-react"
import { getLodgeTheme } from "@/lib/seasonal-theme"
import { FadeInSection } from "@/components/animations/fade-in-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const lodgesData = {
  mitsumata: {
    name: "三俣山荘",
    slug: "mitsumata",
    elevation: "2,677m",
    capacity: "250名",
    location: "裏銀座縦走路",
    description:
      "北アルプスの中心に位置し、槍ヶ岳を望む展望食堂が自慢。ジビエシチューが名物で、黒部源流の豊かな自然に囲まれた山荘です。",
    heroImage: "/placeholder.svg?height=800&width=1600",
    features: [
      {
        icon: Mountain,
        title: "槍ヶ岳展望",
        description: "展望食堂から槍ヶ岳の雄姿を一望できます",
      },
      {
        icon: Utensils,
        title: "ジビエ料理",
        description: "名物のジビエシチューをお楽しみください",
      },
      {
        icon: Home,
        title: "個室完備",
        description: "プライベートな空間でゆっくりお休みいただけます",
      },
      {
        icon: Droplet,
        title: "豊富な水",
        description: "黒部源流の清らかな水を利用できます",
      },
    ],
    facilities: {
      accommodation: "個室、相部屋、テント場",
      meals: "夕食、朝食、喫茶(ジビエシチュー)",
      amenities: "トイレ(バイオ)、水場、乾燥室",
      season: "7月上旬〜11月上旬",
    },
    access: ["新穂高温泉から約8時間", "高瀬ダムから約7時間", "折立から約6時間"],
    nearbyPeaks: ["槍ヶ岳", "双六岳", "鷲羽岳", "水晶岳"],
  },
  suisho: {
    name: "水晶小屋",
    slug: "suisho",
    elevation: "2,986m",
    capacity: "80名",
    location: "水晶岳直下",
    description: "水晶岳の直下に位置する、透明感あふれる山荘。高山植物の宝庫で、夏には色とりどりの花々が咲き誇ります。",
    heroImage: "/placeholder.svg?height=800&width=1600",
    features: [
      {
        icon: Mountain,
        title: "水晶岳",
        description: "小屋から30分で水晶岳山頂へアクセス",
      },
      {
        icon: Utensils,
        title: "高山植物",
        description: "200種以上の高山植物が咲き誇ります",
      },
      {
        icon: Home,
        title: "静寂の空間",
        description: "標高3,000m近い静かな環境",
      },
      {
        icon: Droplet,
        title: "星空観察",
        description: "満天の星空を楽しめます",
      },
    ],
    facilities: {
      accommodation: "相部屋、テント場",
      meals: "夕食、朝食",
      amenities: "トイレ(バイオ)、水場",
      season: "7月中旬〜10月中旬",
    },
    access: ["三俣山荘から約3時間", "新穂高温泉から約11時間"],
    nearbyPeaks: ["水晶岳", "鷲羽岳", "赤牛岳", "野口五郎岳"],
  },
  yumata: {
    name: "湯俣山荘",
    slug: "yumata",
    elevation: "1,583m",
    capacity: "50名",
    location: "湯俣温泉",
    description:
      "湯俣温泉に隣接し、温泉と自然を楽しめる山荘。伊藤新道の起点として、湯俣川ネイチャーフィールドの拠点となります。",
    heroImage: "/placeholder.svg?height=800&width=1600",
    features: [
      {
        icon: Droplet,
        title: "温泉",
        description: "湯俣温泉で疲れを癒せます",
      },
      {
        icon: Mountain,
        title: "伊藤新道",
        description: "伊藤新道の起点となる山荘",
      },
      {
        icon: Utensils,
        title: "釣り",
        description: "湯俣川でイワナ釣りを楽しめます",
      },
      {
        icon: Home,
        title: "藪漕ぎ",
        description: "湯俣川ネイチャーフィールドの拠点",
      },
    ],
    facilities: {
      accommodation: "相部屋、テント場",
      meals: "夕食、朝食",
      amenities: "トイレ、水場、温泉",
      season: "7月上旬〜11月上旬",
    },
    access: ["高瀬ダムから約4時間", "七倉山荘から約5時間"],
    nearbyPeaks: ["湯俣岳", "水晶岳", "鷲羽岳"],
  },
}

export async function generateStaticParams() {
  return Object.keys(lodgesData).map((slug) => ({
    slug,
  }))
}

export default function LodgePage({ params }: { params: { slug: string } }) {
  const lodge = lodgesData[params.slug as keyof typeof lodgesData]

  if (!lodge) {
    notFound()
  }

  const theme = getLodgeTheme(params.slug as "mitsumata" | "suisho" | "yumata")

  return (
    <main className="min-h-screen pt-20">
      {/* ヒーローセクション */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image src={lodge.heroImage || "/placeholder.svg"} alt={lodge.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />

        <div className="relative h-full flex items-end pb-20">
          <div className="container mx-auto px-4 max-w-7xl text-white">
            <FadeInSection>
              <span
                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-lg"
                style={{ backgroundColor: theme.primary }}
              >
                {lodge.name}
              </span>
              <h1 className="text-6xl md:text-5xl sm:text-4xl font-bold mb-4 text-balance">{lodge.description}</h1>
              <div className="flex flex-wrap items-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Mountain className="w-5 h-5" />
                  <span>{lodge.elevation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>収容{lodge.capacity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{lodge.location}</span>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: theme.primary }}>
              {lodge.name}の特徴
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {lodge.features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <FadeInSection key={index} delay={index * 0.1}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div
                        className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                        style={{ backgroundColor: `${theme.primary}20` }}
                      >
                        <Icon className="w-8 h-8" style={{ color: theme.primary }} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* 施設情報セクション */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 施設情報 */}
            <FadeInSection>
              <h2 className="text-3xl font-bold mb-8" style={{ color: theme.primary }}>
                施設情報
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">宿泊施設</h3>
                  <p className="text-gray-700">{lodge.facilities.accommodation}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">食事</h3>
                  <p className="text-gray-700">{lodge.facilities.meals}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">設備</h3>
                  <p className="text-gray-700">{lodge.facilities.amenities}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Calendar className="w-5 h-5" style={{ color: theme.primary }} />
                    営業期間
                  </h3>
                  <p className="text-gray-700">{lodge.facilities.season}</p>
                </div>
              </div>
            </FadeInSection>

            {/* アクセス情報 */}
            <FadeInSection delay={0.2}>
              <h2 className="text-3xl font-bold mb-8" style={{ color: theme.primary }}>
                アクセス
              </h2>
              <div className="space-y-4 mb-8">
                {lodge.access.map((route, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <p className="text-gray-700">{route}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-bold text-lg mb-4">周辺の山</h3>
              <div className="flex flex-wrap gap-2">
                {lodge.nearbyPeaks.map((peak, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: theme.bg,
                      color: theme.primary,
                    }}
                  >
                    {peak}
                  </span>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <FadeInSection>
            <h2 className="text-4xl font-bold mb-6">ご予約・お問い合わせ</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {lodge.name}へのご予約、ご質問はお気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="px-8 py-6 text-lg text-white hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primary}dd 100%)`,
                }}
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  予約する
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg bg-transparent border-2 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-300 group"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  お問い合わせ
                </span>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </main>
  )
}
