"use client"

import { motion } from "framer-motion"
import { type SeasonalTheme } from "@/lib/seasonal-theme"

interface SeasonalGradientTransitionProps {
  seasonalTheme: SeasonalTheme
}

export function SeasonalGradientTransition({ seasonalTheme }: SeasonalGradientTransitionProps) {
  // 季節ごとのグラデーション色を定義
  const getSeasonalColors = () => {
    switch (seasonalTheme.name) {
      case "summer":
        return {
          from: "rgba(0, 0, 0, 0.95)", // 深い黒
          via1: "rgba(15, 35, 10, 0.85)", // 深緑
          via2: "rgba(30, 60, 20, 0.65)", // 中間緑
          via3: "rgba(45, 80, 22, 0.35)", // 明るい緑
          to: "rgba(240, 245, 237, 0)", // 和紙の緑（透明）
          mistColor1: "rgba(200, 220, 190, 0.15)", // 緑がかった霧
          mistColor2: "rgba(220, 235, 210, 0.10)",
          mistColor3: "rgba(240, 245, 237, 0.08)",
        }
      case "early-autumn":
        return {
          from: "rgba(0, 0, 0, 0.95)",
          via1: "rgba(80, 50, 30, 0.85)", // 深い琥珀
          via2: "rgba(140, 90, 60, 0.65)", // 中間琥珀
          via3: "rgba(180, 130, 90, 0.35)", // 明るい琥珀
          to: "rgba(255, 251, 240, 0)",
          mistColor1: "rgba(220, 200, 170, 0.15)",
          mistColor2: "rgba(235, 220, 195, 0.10)",
          mistColor3: "rgba(250, 240, 220, 0.08)",
        }
      case "autumn":
        return {
          from: "rgba(0, 0, 0, 0.95)",
          via1: "rgba(100, 40, 20, 0.85)", // 深いオレンジ
          via2: "rgba(170, 80, 40, 0.65)", // 中間オレンジ
          via3: "rgba(214, 98, 43, 0.35)", // 明るいオレンジ
          to: "rgba(254, 248, 235, 0)",
          mistColor1: "rgba(230, 180, 140, 0.15)",
          mistColor2: "rgba(240, 210, 180, 0.10)",
          mistColor3: "rgba(250, 235, 210, 0.08)",
        }
      case "late-autumn":
        return {
          from: "rgba(0, 0, 0, 0.95)",
          via1: "rgba(60, 55, 50, 0.85)", // 深いグレー
          via2: "rgba(100, 90, 80, 0.65)", // 中間グレー
          via3: "rgba(139, 115, 85, 0.35)", // 明るいストーン
          to: "rgba(250, 250, 250, 0)",
          mistColor1: "rgba(200, 205, 210, 0.15)",
          mistColor2: "rgba(220, 225, 230, 0.10)",
          mistColor3: "rgba(240, 242, 245, 0.08)",
        }
      case "off-season":
        return {
          from: "rgba(0, 0, 0, 0.95)",
          via1: "rgba(40, 40, 40, 0.85)",
          via2: "rgba(82, 82, 82, 0.65)",
          via3: "rgba(115, 115, 115, 0.35)",
          to: "rgba(249, 249, 249, 0)",
          mistColor1: "rgba(200, 200, 200, 0.15)",
          mistColor2: "rgba(220, 220, 220, 0.10)",
          mistColor3: "rgba(240, 240, 240, 0.08)",
        }
      case "summer-preview":
        return {
          from: "rgba(0, 0, 0, 0.95)",
          via1: "rgba(15, 35, 25, 0.85)", // 深緑青
          via2: "rgba(30, 60, 45, 0.65)",
          via3: "rgba(45, 80, 50, 0.35)",
          to: "rgba(240, 250, 245, 0)",
          mistColor1: "rgba(200, 230, 220, 0.15)",
          mistColor2: "rgba(220, 240, 235, 0.10)",
          mistColor3: "rgba(240, 250, 245, 0.08)",
        }
      default:
        return {
          from: "rgba(0, 0, 0, 0.95)",
          via1: "rgba(20, 20, 20, 0.85)",
          via2: "rgba(60, 60, 60, 0.65)",
          via3: "rgba(100, 100, 100, 0.35)",
          to: "rgba(255, 255, 255, 0)",
          mistColor1: "rgba(200, 200, 200, 0.15)",
          mistColor2: "rgba(220, 220, 220, 0.10)",
          mistColor3: "rgba(240, 240, 240, 0.08)",
        }
    }
  }

  const colors = getSeasonalColors()

  return (
    <div className="absolute inset-x-0 top-0 h-[500px] md:h-[600px] lg:h-[700px] pointer-events-none overflow-hidden">
      {/* SVG定義 - 霧のテクスチャ */}
      <svg className="absolute w-0 h-0">
        <defs>
          {/* 細かい霧のテクスチャ */}
          <filter id="mist-texture-fine">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="4"
              seed="1"
              result="turbulence"
            />
            <feColorMatrix
              in="turbulence"
              type="saturate"
              values="0"
              result="grayscale"
            />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.3 0.6 0.8 1" />
            </feComponentTransfer>
          </filter>

          {/* 粗い霧のテクスチャ */}
          <filter id="mist-texture-coarse">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008"
              numOctaves="3"
              seed="5"
              result="turbulence"
            />
            <feColorMatrix
              in="turbulence"
              type="saturate"
              values="0"
              result="grayscale"
            />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.2 0.5 0.7 1" />
            </feComponentTransfer>
          </filter>

          {/* 非常に細かい霧のテクスチャ */}
          <filter id="mist-texture-ultra-fine">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.025"
              numOctaves="5"
              seed="10"
              result="turbulence"
            />
            <feColorMatrix
              in="turbulence"
              type="saturate"
              values="0"
              result="grayscale"
            />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.4 0.7 0.9 1" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {/* メイングラデーション - 季節の色へ滑らかに遷移 */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              ${colors.from} 0%,
              ${colors.via1} 20%,
              ${colors.via2} 45%,
              ${colors.via3} 70%,
              ${colors.to} 100%
            )
          `,
        }}
      />

      {/* 霧レイヤー1 - 最も奥の粗い霧 */}
      <motion.div
        className="absolute inset-0 opacity-60"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse 150% 100% at 50% 0%,
                ${colors.mistColor1} 0%,
                transparent 60%
              )
            `,
            filter: "url(#mist-texture-coarse) blur(40px)",
          }}
        />
      </motion.div>

      {/* 霧レイヤー2 - 中間の霧 */}
      <motion.div
        className="absolute inset-0 opacity-70"
        animate={{
          x: [0, -25, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse 140% 90% at 30% 10%,
                ${colors.mistColor2} 0%,
                transparent 65%
              ),
              radial-gradient(
                ellipse 140% 90% at 70% 15%,
                ${colors.mistColor2} 0%,
                transparent 65%
              )
            `,
            filter: "url(#mist-texture-fine) blur(30px)",
          }}
        />
      </motion.div>

      {/* 霧レイヤー3 - 最も手前の細かい霧 */}
      <motion.div
        className="absolute inset-0 opacity-80"
        animate={{
          x: [0, 20, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse 130% 80% at 60% 5%,
                ${colors.mistColor3} 0%,
                transparent 70%
              ),
              radial-gradient(
                ellipse 130% 80% at 40% 8%,
                ${colors.mistColor3} 0%,
                transparent 70%
              )
            `,
            filter: "url(#mist-texture-ultra-fine) blur(20px)",
          }}
        />
      </motion.div>

      {/* 追加の柔らかいグラデーション - より滑らかな遷移のため */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `
            linear-gradient(
              to bottom,
              transparent 0%,
              transparent 40%,
              ${colors.mistColor3} 60%,
              ${colors.to.replace('0)', '0.05)')} 80%,
              ${colors.to.replace('0)', '0.1)')} 100%
            )
          `,
          filter: "blur(60px)",
        }}
      />

      {/* 光の差し込み効果 - 山頂からの光のイメージ */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse 100% 60% at 50% 0%,
                rgba(255, 255, 255, 0.08) 0%,
                transparent 50%
              )
            `,
            filter: "blur(50px)",
          }}
        />
      </motion.div>
    </div>
  )
}
