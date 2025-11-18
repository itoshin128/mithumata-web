/**
 * アニメーション定数
 *
 * 三俣山荘グループのデザインシステム - アニメーション編
 *
 * コンセプト：
 * - 「序破急」（じょはきゅう）: 能の伝統的なリズム
 * - 自然界の優雅な動き
 * - 和の静けさと品格
 */

// ===================================
// Easing Functions（イージング関数）
// ===================================

/**
 * Wafuu Easing - 和風の優雅なイージング
 *
 * Material Design の emphasized easing をベースに、
 * より柔らかく、優雅な動きを実現
 */
export const EASING = {
  /** 標準の和風イージング - ほとんどの場合に使用 */
  wafuu: [0.22, 1, 0.36, 1] as const,

  /** より速い和風イージング - クイックアクション用 */
  wafuuFast: [0.4, 0, 0.2, 1] as const,

  /** ゆったりとした和風イージング - 大きな要素や重要な演出用 */
  wafuuSlow: [0.16, 1, 0.3, 1] as const,

  /** 序破急（じょはきゅう）- 緩やかに始まり、急速に終わる */
  johakyu: [0.1, 0.9, 0.2, 1] as const,

  /** 弾性のある動き - ボタンやインタラクティブ要素用 */
  spring: [0.5, 1.25, 0.75, 1] as const,
} as const

// ===================================
// Duration（アニメーション時間）
// ===================================

/**
 * アニメーションの持続時間（ミリ秒）
 *
 * 基準：
 * - 短い: 200-300ms（マイクロインタラクション）
 * - 標準: 500-800ms（通常の遷移）
 * - 長い: 1000-1500ms（大きな演出）
 */
export const DURATION = {
  /** 即座 - ほぼ瞬時 */
  instant: 150,

  /** とても速い - ホバー、タップフィードバック */
  fastest: 200,

  /** 速い - 小さな要素の表示/非表示 */
  fast: 300,

  /** 標準 - ほとんどの遷移に使用 */
  normal: 500,

  /** やや遅い - カードの展開など */
  slow: 800,

  /** 遅い - 大きなセクションの遷移 */
  slower: 1000,

  /** とても遅い - ページ遷移やローディング */
  slowest: 1500,
} as const

// ===================================
// Spring Configuration（バネアニメーション設定）
// ===================================

/**
 * framer-motion のスプリングアニメーション設定
 */
export const SPRING = {
  /** 標準のスプリング */
  default: {
    type: 'spring' as const,
    damping: 25,
    stiffness: 300,
  },

  /** 柔らかいスプリング - 大きな要素用 */
  soft: {
    type: 'spring' as const,
    damping: 30,
    stiffness: 200,
  },

  /** 硬いスプリング - 小さな要素、ボタン用 */
  stiff: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 400,
  },

  /** バウンス - 楽しい効果用 */
  bouncy: {
    type: 'spring' as const,
    damping: 15,
    stiffness: 200,
  },
} as const

// ===================================
// Transition Presets（トランジションプリセット）
// ===================================

/**
 * よく使われるトランジション設定
 */
export const TRANSITION = {
  /** フェードイン - 要素の表示 */
  fadeIn: {
    duration: DURATION.normal / 1000, // framer-motionは秒単位
    ease: EASING.wafuu,
  },

  /** フェードアウト - 要素の非表示 */
  fadeOut: {
    duration: DURATION.fast / 1000,
    ease: EASING.wafuuFast,
  },

  /** スライドイン - スムーズな登場 */
  slideIn: {
    duration: DURATION.slow / 1000,
    ease: EASING.wafuu,
  },

  /** ホバー - インタラクティブ要素のホバー */
  hover: {
    duration: DURATION.fastest / 1000,
    ease: EASING.wafuuFast,
  },

  /** タップ - ボタンのタップフィードバック */
  tap: {
    duration: DURATION.instant / 1000,
    ease: EASING.wafuuFast,
  },

  /** モーダル - モーダルウィンドウの表示 */
  modal: {
    duration: DURATION.slow / 1000,
    ease: EASING.wafuu,
  },

  /** ページ遷移 - 大きなコンテンツの変化 */
  page: {
    duration: DURATION.slower / 1000,
    ease: EASING.wafuuSlow,
  },
} as const

// ===================================
// Delay（遅延時間）
// ===================================

/**
 * アニメーションの遅延時間（ミリ秒）
 *
 * 連続する要素のスタッガー効果に使用
 */
export const DELAY = {
  /** 遅延なし */
  none: 0,

  /** 最小の遅延 */
  tiny: 50,

  /** 小さい遅延 - スタッガー効果の最小単位 */
  small: 100,

  /** 標準の遅延 - 通常のスタッガー */
  normal: 150,

  /** 大きい遅延 */
  large: 300,

  /** とても大きい遅延 */
  xlarge: 500,
} as const

// ===================================
// Scale（スケール変化）
// ===================================

/**
 * ホバーやタップ時のスケール変化
 */
export const SCALE = {
  /** タップ時の縮小 */
  tapDown: 0.95,

  /** ホバー時の拡大（控えめ） */
  hoverSubtle: 1.02,

  /** ホバー時の拡大（標準） */
  hover: 1.05,

  /** ホバー時の拡大（強調） */
  hoverStrong: 1.08,
} as const

// ===================================
// Variants（アニメーションバリアント）
// ===================================

/**
 * よく使われるframer-motion variants
 */
export const VARIANTS = {
  /** フェードインバリアント */
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },

  /** スライドインバリアント（右から） */
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  },

  /** スライドインバリアント（左から） */
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  },

  /** スケールインバリアント */
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
} as const

// ===================================
// Stagger（スタッガー設定）
// ===================================

/**
 * 連続する要素のスタッガーアニメーション設定
 */
export const STAGGER = {
  /** 速いスタッガー - 多数の小さな要素 */
  fast: {
    staggerChildren: DELAY.tiny / 1000,
    delayChildren: DELAY.small / 1000,
  },

  /** 標準のスタッガー */
  normal: {
    staggerChildren: DELAY.small / 1000,
    delayChildren: DELAY.normal / 1000,
  },

  /** 遅いスタッガー - 大きな要素、演出重視 */
  slow: {
    staggerChildren: DELAY.normal / 1000,
    delayChildren: DELAY.large / 1000,
  },
} as const

// ===================================
// エクスポート
// ===================================

/**
 * すべてのアニメーション定数をまとめたオブジェクト
 */
export const ANIMATION = {
  easing: EASING,
  duration: DURATION,
  spring: SPRING,
  transition: TRANSITION,
  delay: DELAY,
  scale: SCALE,
  variants: VARIANTS,
  stagger: STAGGER,
} as const
