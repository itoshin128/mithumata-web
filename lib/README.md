# 三俣山荘グループ デザインシステム

和の美学と現代的なUIUXを融合した、三俣山荘グループのデザインシステムです。

## 📚 目次

- [アニメーション定数](#アニメーション定数)
- [カラー定数](#カラー定数)
- [使用例](#使用例)

---

## 🎬 アニメーション定数

### ファイル
`lib/animation-constants.ts`

### コンセプト
- **序破急（じょはきゅう）**: 能の伝統的なリズムをアニメーションに反映
- 自然界の優雅な動き（風に揺れる笹、水面の波紋）
- 和の静けさと品格を表現

### 主要な定数

#### 1. Easing（イージング関数）

```typescript
import { ANIMATION } from '@/lib/animation-constants'

// 和風イージング
ANIMATION.easing.wafuu // [0.22, 1, 0.36, 1] - 標準
ANIMATION.easing.wafuuFast // [0.4, 0, 0.2, 1] - 速い
ANIMATION.easing.wafuuSlow // [0.16, 1, 0.3, 1] - ゆったり

// 序破急イージング
ANIMATION.easing.johakyu // [0.1, 0.9, 0.2, 1]

// 弾性のある動き
ANIMATION.easing.spring // [0.5, 1.25, 0.75, 1]
```

#### 2. Duration（アニメーション時間）

```typescript
ANIMATION.duration.instant  // 100ms
ANIMATION.duration.fastest  // 200ms
ANIMATION.duration.fast     // 300ms
ANIMATION.duration.normal   // 500ms
ANIMATION.duration.slow     // 800ms
ANIMATION.duration.slower   // 1000ms
ANIMATION.duration.slowest  // 1500ms
```

#### 3. Transition Presets（トランジションプリセット）

```typescript
// フェードイン
ANIMATION.transition.fadeIn
// {
//   duration: 500,
//   ease: [0.22, 1, 0.36, 1]
// }

// スライドイン
ANIMATION.transition.slideIn
ANIMATION.transition.slideUp
ANIMATION.transition.slideDown

// モーダル
ANIMATION.transition.modal

// ページ遷移
ANIMATION.transition.page
```

### 使用例

#### framer-motion での使用

```typescript
import { motion } from 'framer-motion'
import { ANIMATION } from '@/lib/animation-constants'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={ANIMATION.transition.fadeIn}
>
  コンテンツ
</motion.div>
```

#### CSS Transition での使用

```typescript
<div
  style={{
    transitionDuration: `${ANIMATION.duration.slow}ms`,
    transitionTimingFunction: `cubic-bezier(${ANIMATION.easing.wafuu.join(',')})`,
  }}
>
  コンテンツ
</div>
```

---

## 🎨 カラー定数

### ファイル
`lib/color-constants.ts`

### コンセプト
- 日本の伝統色をベースに
- 自然の色彩（山、森、空、水、大地）
- 和紙の温かみと柔らかさ
- WCAG AA基準準拠（4.5:1以上のコントラスト比）

### 主要な定数

#### 1. 山荘別カラー

```typescript
import { COLORS } from '@/lib/color-constants'

// 三俣山荘 - 深い森の緑
COLORS.lodge.mitsumata.primary  // #2d5016
COLORS.lodge.mitsumata.light    // #4a7c29
COLORS.lodge.mitsumata.dark     // #1a3009
COLORS.lodge.mitsumata.bg       // #f0f5ed

// 水晶小屋 - 澄んだ空の青
COLORS.lodge.suisho.primary     // #5ba4cf
COLORS.lodge.suisho.light       // #87ceeb
COLORS.lodge.suisho.dark        // #3d7ba8
COLORS.lodge.suisho.bg          // #edf6fb

// 湯俣山荘 - 温かな大地の茶
COLORS.lodge.yumata.primary     // #b8604a
COLORS.lodge.yumata.light       // #d48770
COLORS.lodge.yumata.dark        // #8b4513
COLORS.lodge.yumata.bg          // #faf4f1
```

#### 2. 和紙カラー

```typescript
COLORS.washi.main       // #FAF7F1 - メイン背景
COLORS.washi.secondary  // #F8F5EF - セカンダリ背景
COLORS.washi.card       // #FFFDFB - カード背景
COLORS.washi.border     // #EDE9E3 - ボーダー
```

#### 3. テキストカラー

```typescript
COLORS.text.primary    // #252525 - 墨の黒
COLORS.text.secondary  // #707070 - グレー
COLORS.text.muted      // #8e8e8e - より薄いグレー
COLORS.text.subtle     // #a8a8a8 - 控えめな表示用
COLORS.text.light      // #fbfbfb - 白に近い
COLORS.text.link       // #2d5016 - リンク
```

#### 4. グラデーション

```typescript
// 和紙グラデーション
COLORS.gradients.washi
// 'linear-gradient(180deg, #f5f7f9 0%, #fafbfc 50%, #ffffff 100%)'

// 山荘別グラデーション
COLORS.gradients.mitsumata
COLORS.gradients.suisho
COLORS.gradients.yumata
```

### 使用例

```typescript
import { COLORS } from '@/lib/color-constants'

// 背景とテキスト
<div style={{
  backgroundColor: COLORS.washi.main,
  color: COLORS.text.primary
}}>
  コンテンツ
</div>

// 山荘別テーマ
<div style={{
  backgroundColor: COLORS.lodge.mitsumata.bg,
  borderLeft: `4px solid ${COLORS.lodge.mitsumata.primary}`
}}>
  三俣山荘コンテンツ
</div>

// グラデーション
<div style={{
  background: COLORS.gradients.washi
}}>
  背景
</div>
```

---

## 💡 使用例

### LoadingScreen コンポーネント

デザインシステムを完全に統合したLoadingScreenの例：

```typescript
import { ANIMATION } from '@/lib/animation-constants'
import { COLORS } from '@/lib/color-constants'

export function LoadingScreen() {
  return (
    <div
      style={{
        background: COLORS.gradients.washi,
        transitionDuration: `${ANIMATION.duration.slow}ms`,
        transitionTimingFunction: `cubic-bezier(${ANIMATION.easing.wafuu.join(',')})`,
      }}
    >
      <h1 style={{ color: COLORS.text.primary }}>
        北アルプス黒部源流
      </h1>
      <p style={{ color: COLORS.text.secondary }}>
        Northern Alps Kurobe Genryu
      </p>
    </div>
  )
}
```

### フェードインアニメーション

```typescript
import { motion } from 'framer-motion'
import { ANIMATION, COLORS } from '@/lib'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: ANIMATION.helpers.msToSeconds(ANIMATION.duration.slow),
    ease: ANIMATION.easing.wafuu,
  }}
  style={{ color: COLORS.text.primary }}
>
  優雅にフェードイン
</motion.div>
```

### ボタンホバーエフェクト

```typescript
import { motion } from 'framer-motion'
import { ANIMATION, COLORS } from '@/lib'

<motion.button
  whileHover={{
    scale: ANIMATION.scale.hover,
    backgroundColor: COLORS.lodge.mitsumata.light,
  }}
  transition={{
    duration: ANIMATION.helpers.msToSeconds(ANIMATION.duration.fast),
    ease: ANIMATION.easing.spring,
  }}
  style={{
    backgroundColor: COLORS.lodge.mitsumata.primary,
    color: COLORS.text.light,
  }}
>
  予約する
</motion.button>
```

---

## 🎯 ベストプラクティス

### 1. 一貫性の確保

常にデザインシステムの定数を使用し、ハードコードされた値を避けてください。

```typescript
// ❌ 悪い例
<div style={{ color: '#252525', transition: 'all 500ms cubic-bezier(0.22, 1, 0.36, 1)' }}>

// ✅ 良い例
<div style={{
  color: COLORS.text.primary,
  transitionDuration: `${ANIMATION.duration.normal}ms`,
  transitionTimingFunction: `cubic-bezier(${ANIMATION.easing.wafuu.join(',')})`,
}}>
```

### 2. セマンティックな命名

用途に応じて適切な定数を選択してください。

```typescript
// スキップヒントには subtle
<p style={{ color: COLORS.text.subtle }}>クリックでスキップ</p>

// メインコンテンツには primary
<h1 style={{ color: COLORS.text.primary }}>北アルプス黒部源流</h1>

// 補足説明には secondary
<p style={{ color: COLORS.text.secondary }}>Northern Alps</p>
```

### 3. アクセシビリティ

テキストカラーは全てWCAG AA基準に準拠しています。背景色との組み合わせに注意してください。

```typescript
// ✅ 良い例 - 十分なコントラスト
<div style={{ background: COLORS.washi.main }}>
  <p style={{ color: COLORS.text.primary }}>読みやすい</p>
</div>

// ⚠️ 注意 - コントラストが低い可能性
<div style={{ background: COLORS.washi.main }}>
  <p style={{ color: COLORS.text.subtle }}>読みにくい可能性</p>
</div>
```

---

## 📦 パッケージ構成

```
lib/
├── animation-constants.ts  # アニメーション定数（414行）
├── color-constants.ts      # カラー定数（457行）
└── README.md              # このファイル
```

---

## 🚀 今後の拡張

- [ ] Spacing（余白）システム
- [ ] Typography（タイポグラフィ）システム
- [ ] Shadow（影）システム
- [ ] Border Radius（角丸）システム
- [ ] Z-Index（重なり順）システム

---

## 📝 ライセンス

© 2025 三俣山荘グループ
