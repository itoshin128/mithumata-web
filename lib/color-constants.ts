/**
 * カラー定数
 *
 * 三俣山荘グループのデザインシステム - カラー編
 *
 * コンセプト：
 * - 日本の伝統色をベースに
 * - 自然の色彩（山、森、空、水）
 * - 和紙の温かみ
 */

// ===================================
// Brand Colors（ブランドカラー）
// ===================================

/**
 * 三俣山荘グループの山荘別カラー
 */
export const LODGE_COLORS = {
  /** 三俣山荘 - 深い森の緑 */
  mitsumata: {
    primary: '#2d5016',
    light: '#4a7c29',
    dark: '#1a3009',
    bg: '#f0f5ed',
  },

  /** 水晶小屋 - 澄んだ空の青 */
  suisho: {
    primary: '#5ba4cf',
    light: '#87ceeb',
    dark: '#3d7ba8',
    bg: '#edf6fb',
  },

  /** 湯俣山荘 - 温かな大地の茶 */
  yumata: {
    primary: '#b8604a',
    light: '#d48770',
    dark: '#8b4513',
    bg: '#faf4f1',
  },
} as const

// ===================================
// Seasonal Colors（季節のカラー）
// ===================================

/**
 * 営業期間（7-11月）の季節別カラー
 */
export const SEASONAL_COLORS = {
  /** 夏（7-8月）- 新緑と青空 */
  summer: {
    primary: '#2d5016', // 深緑
    accent: '#4a90e2', // 夏空の青
  },

  /** 初秋（9月前半）- 晩夏の色合い */
  earlyAutumn: {
    primary: '#d4a373', // 枯草色
    accent: '#2d5016', // 残る緑
  },

  /** 秋（9月後半-10月）- 紅葉の色 */
  autumn: {
    primary: '#d4622b', // 紅葉
    accent: '#f9a825', // 黄葉
  },

  /** 晩秋（11月）- 冬の気配 */
  lateAutumn: {
    primary: '#8b7355', // 枯れ葉
    accent: '#b8c5d6', // 冬の空
  },
} as const

// ===================================
// Washi Colors（和紙の色）
// ===================================

/**
 * 和紙をベースにした背景色
 */
export const WASHI_COLORS = {
  /** メイン背景 - 和紙の温かみ */
  main: '#FAF7F1',

  /** セカンダリ背景 - より明るい和紙 */
  secondary: '#F8F5EF',

  /** カード背景 - 白に近い和紙 */
  card: '#FFFDFB',

  /** ボーダー - 繊細な境界線 */
  border: '#EDE9E3',
} as const

// ===================================
// Text Colors（テキストカラー）
// ===================================

/**
 * テキスト用のカラー
 */
export const TEXT_COLORS = {
  /** プライマリテキスト - 墨の黒 */
  primary: '#252525',

  /** セカンダリテキスト - グレー */
  secondary: '#707070',

  /** ミュートテキスト - より薄いグレー */
  muted: '#8e8e8e',

  /** ライトテキスト - 白に近い */
  light: '#fbfbfb',

  /** リンクテキスト - mitsumataプライマリ */
  link: '#2d5016',
} as const

// ===================================
// State Colors（状態を示すカラー）
// ===================================

/**
 * 成功、エラー、警告などの状態カラー
 */
export const STATE_COLORS = {
  /** 成功 - 深い緑 */
  success: {
    light: '#d1f2eb',
    main: '#2d5016',
    dark: '#1a3009',
  },

  /** エラー - 和風の赤 */
  error: {
    light: '#fde2e4',
    main: '#dc2626',
    dark: '#b91c1c',
  },

  /** 警告 - 山吹色 */
  warning: {
    light: '#fff4e6',
    main: '#f9a825',
    dark: '#d4622b',
  },

  /** 情報 - 澄んだ青 */
  info: {
    light: '#e3f2fd',
    main: '#5ba4cf',
    dark: '#3d7ba8',
  },
} as const

// ===================================
// Shadow Colors（影のカラー）
// ===================================

/**
 * シャドウ用のRGBA値
 */
export const SHADOW_COLORS = {
  /** 軽い影 */
  light: 'rgba(0, 0, 0, 0.08)',

  /** 標準の影 */
  normal: 'rgba(0, 0, 0, 0.12)',

  /** 濃い影 */
  dark: 'rgba(0, 0, 0, 0.20)',

  /** とても濃い影 */
  darker: 'rgba(0, 0, 0, 0.30)',
} as const

// ===================================
// Overlay Colors（オーバーレイカラー）
// ===================================

/**
 * モーダル、ドロワーなどのオーバーレイ
 */
export const OVERLAY_COLORS = {
  /** 軽いオーバーレイ */
  light: 'rgba(0, 0, 0, 0.3)',

  /** 標準のオーバーレイ */
  normal: 'rgba(0, 0, 0, 0.5)',

  /** 濃いオーバーレイ */
  dark: 'rgba(0, 0, 0, 0.7)',
} as const

// ===================================
// Gradient Colors（グラデーションカラー）
// ===================================

/**
 * よく使うグラデーション
 */
export const GRADIENTS = {
  /** 和紙の温かいグラデーション */
  washi: `linear-gradient(135deg,
    rgba(250, 247, 241, 0.98) 0%,
    rgba(255, 253, 248, 0.96) 50%,
    rgba(250, 247, 241, 0.98) 100%
  )`,

  /** 三俣山荘の緑グラデーション */
  mitsumata: `linear-gradient(135deg,
    #2d5016 0%,
    #4a7c29 100%
  )`,

  /** 水晶小屋の青グラデーション */
  suisho: `linear-gradient(135deg,
    #5ba4cf 0%,
    #87ceeb 100%
  )`,

  /** 湯俣山荘の茶グラデーション */
  yumata: `linear-gradient(135deg,
    #b8604a 0%,
    #d48770 100%
  )`,

  /** 光の透過感 - 和紙の光沢 */
  shimmer: `radial-gradient(circle at 50% 50%,
    rgba(255, 255, 255, 0.6) 0%,
    transparent 70%
  )`,
} as const

// ===================================
// Opacity（透明度）
// ===================================

/**
 * 標準的な透明度レベル
 */
export const OPACITY = {
  /** ほぼ見えない */
  invisible: 0,

  /** とても薄い */
  faint: 0.05,

  /** 薄い */
  light: 0.1,

  /** やや薄い */
  medium: 0.3,

  /** 半透明 */
  half: 0.5,

  /** やや濃い */
  strong: 0.7,

  /** 濃い */
  dark: 0.9,

  /** 完全に不透明 */
  opaque: 1,
} as const

// ===================================
// Helper Functions（ヘルパー関数）
// ===================================

/**
 * RGBカラーをRGBA形式に変換
 *
 * @param rgb - RGB値（例: "45, 80, 22"）
 * @param opacity - 透明度（0-1）
 * @returns RGBA形式の文字列
 */
export function rgba(rgb: string, opacity: number): string {
  return `rgba(${rgb}, ${opacity})`
}

/**
 * 16進数カラーにアルファ値を追加
 *
 * @param hex - 16進数カラー（例: "#2d5016"）
 * @param opacity - 透明度（0-1）
 * @returns 16進数 + アルファ形式の文字列
 */
export function hexWithAlpha(hex: string, opacity: number): string {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0')
  return `${hex}${alpha}`
}

// ===================================
// エクスポート
// ===================================

/**
 * すべてのカラー定数をまとめたオブジェクト
 */
export const COLORS = {
  lodge: LODGE_COLORS,
  seasonal: SEASONAL_COLORS,
  washi: WASHI_COLORS,
  text: TEXT_COLORS,
  state: STATE_COLORS,
  shadow: SHADOW_COLORS,
  overlay: OVERLAY_COLORS,
  gradients: GRADIENTS,
  opacity: OPACITY,
} as const
