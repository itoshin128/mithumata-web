/**
 * 季節テーマユーティリティ
 * 営業期間(7-11月)に合わせた季節演出を提供
 */

export type SeasonName = "summer" | "early-autumn" | "autumn" | "late-autumn" | "off-season" | "summer-preview"

export interface SeasonalTheme {
  name: SeasonName
  primary: string
  accent: string
  gradient: string
  description: string
  banner?: {
    show: boolean
    text: string
    type: "info" | "warning"
  }
}

/**
 * 現在の月に基づいて季節テーマを取得
 */
export function getSeasonalTheme(): SeasonalTheme {
  const month = new Date().getMonth() + 1 // 1-12

  // 営業期間外の処理
  if (month < 7 || month > 11) {
    // 予約受付期間(3-6月)
    if (month >= 3 && month <= 6) {
      return {
        name: "summer-preview",
        primary: "#2d5016",
        accent: "#4a90e2",
        gradient: "from-green-50 via-green-25 to-blue-50",
        banner: {
          show: true,
          text: "ここは最新情報を記載します",
          type: "info",
        },
        description: "今年の夏山へ、早めの予約をおすすめします",
      }
    }

    // 営業終了期間(12-2月)
    return {
      name: "off-season",
      primary: "#525252",
      accent: "#737373",
      gradient: "from-gray-50 to-white",
      banner: {
        show: true,
        text: "ここは最新情報を記載します",
        type: "warning",
      },
      description: "雪に閉ざされた黒部源流の冬",
    }
  }

  // 営業期間内の季節判定
  switch (month) {
    case 7:
    case 8:
      return {
        name: "summer",
        primary: "#2d5016",
        accent: "#4a90e2",
        gradient: "from-green-50 to-blue-50",
        description: "高山植物と青空の季節",
      }

    case 9:
      return {
        name: "early-autumn",
        primary: "#d4a373",
        accent: "#2d5016",
        gradient: "from-amber-50 to-green-50",
        description: "紅葉の始まり",
      }

    case 10:
      return {
        name: "autumn",
        primary: "#d4622b",
        accent: "#f9a825",
        gradient: "from-orange-50 to-yellow-50",
        description: "錦秋の絶景",
      }

    case 11:
      return {
        name: "late-autumn",
        primary: "#8b7355",
        accent: "#b8c5d6",
        gradient: "from-stone-50 to-slate-50",
        banner: {
          show: true,
          text: "ここは最新情報を記載します",
          type: "info",
        },
        description: "晩秋の静けさと初雪",
      }

    default:
      return {
        name: "summer",
        primary: "#0a0a0a",
        accent: "#525252",
        gradient: "from-white to-gray-50",
        description: "北アルプス最奥、黒部源流",
      }
  }
}

/**
 * 山荘ごとのテーマカラーを取得
 */
export function getLodgeTheme(lodge: "mitsumata" | "suisho" | "yumata") {
  const themes = {
    mitsumata: {
      name: "三俣山荘",
      primary: "#2d5016",
      light: "#4a7c29",
      dark: "#1a3009",
      bg: "#f0f5ed",
      description: "力強さ、包容力",
    },
    suisho: {
      name: "水晶小屋",
      primary: "#5ba4cf",
      light: "#87ceeb",
      dark: "#3d7ba8",
      bg: "#edf6fb",
      description: "透明感、繊細さ",
    },
    yumata: {
      name: "湯俣山荘",
      primary: "#b8604a",
      light: "#d48770",
      dark: "#8b4513",
      bg: "#faf4f1",
      description: "温かさ、くつろぎ",
    },
  }

  return themes[lodge]
}
