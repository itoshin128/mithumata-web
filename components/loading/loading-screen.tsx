'use client'

import { useEffect, useState, useCallback } from 'react'

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [showSkipHint, setShowSkipHint] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // スキップ処理
  const handleSkip = useCallback(() => {
    setFadeOut(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 800)
  }, [])

  // モーション設定の検知
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    if (mediaQuery.matches) {
      // モーション配慮設定がONの場合は即座にスキップ
      handleSkip()
    }
  }, [handleSkip])

  useEffect(() => {
    // フォントの読み込みを待機
    const loadFonts = async () => {
      try {
        // document.fonts.ready でフォント読み込み完了を待つ
        await document.fonts.ready

        // さらに特定のフォントが確実に読み込まれているか確認
        await Promise.all([
          document.fonts.load('400 1em "Noto Serif JP"'),
          document.fonts.load('300 1em "Noto Sans JP"'),
        ])

        setFontsLoaded(true)
      } catch (error) {
        // エラーが発生してもテキストを表示
        console.error('Font loading error:', error)
        setFontsLoaded(true)
      }
    }

    loadFonts()
  }, [])

  useEffect(() => {
    // フォント読み込み完了後にタイマーを開始
    if (!fontsLoaded || prefersReducedMotion) return

    // スキップヒントを1秒後に表示
    const skipHintTimer = setTimeout(() => {
      setShowSkipHint(true)
    }, 1000)

    // ローディング画面を1.5秒表示してからフェードアウト開始（短縮：3.5秒→1.5秒）
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 1500)

    // フェードアウト完了後に非表示（短縮：5秒→2.3秒）
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 2300)

    return () => {
      clearTimeout(skipHintTimer)
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [fontsLoaded, prefersReducedMotion])

  // キーボードイベント（Escキー）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSkip])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] transition-opacity duration-800 cursor-pointer ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(180deg, #f5f7f9 0%, #fafbfc 50%, #ffffff 100%)',
      }}
      onClick={handleSkip}
      role="button"
      aria-label="ローディング画面をスキップ"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleSkip()
        }
      }}
    >
      {/* 遠景の雲レイヤー - 最も遠く、最もゆっくり（短縮：3.8秒→1.8秒） */}
      <div className="absolute inset-0 z-[1]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 130% 100% at 50% 50%, rgba(210, 220, 230, 0.5) 0%, rgba(220, 230, 240, 0.3) 40%, transparent 70%)',
            filter: 'blur(120px)',
            animation: 'cloudClearSlow 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        />
      </div>

      {/* 中景の雲レイヤー左 - 中間の速度（短縮：3.2秒→1.5秒） */}
      <div className="absolute inset-0 z-[2]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 110% 90% at 25% 50%, rgba(200, 210, 220, 0.6) 0%, rgba(215, 225, 235, 0.4) 35%, transparent 65%)',
            filter: 'blur(90px)',
            animation: 'cloudClearLeft 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            animationDelay: '0.1s',
          }}
        />
      </div>

      {/* 中景の雲レイヤー右 - 中間の速度（短縮：3.2秒→1.5秒） */}
      <div className="absolute inset-0 z-[2]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 110% 90% at 75% 50%, rgba(200, 210, 220, 0.6) 0%, rgba(215, 225, 235, 0.4) 35%, transparent 65%)',
            filter: 'blur(90px)',
            animation: 'cloudClearRight 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            animationDelay: '0.1s',
          }}
        />
      </div>

      {/* 近景の雲レイヤー左 - 最も速い（短縮：2.8秒→1.2秒） */}
      <div className="absolute inset-0 z-[3]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 80% at 20% 50%, rgba(190, 200, 210, 0.7) 0%, rgba(205, 215, 225, 0.5) 30%, transparent 60%)',
            filter: 'blur(70px)',
            animation: 'cloudClearLeftFast 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            animationDelay: '0.2s',
          }}
        />
      </div>

      {/* 近景の雲レイヤー右 - 最も速い（短縮：2.8秒→1.2秒） */}
      <div className="absolute inset-0 z-[3]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 80% at 80% 50%, rgba(190, 200, 210, 0.7) 0%, rgba(205, 215, 225, 0.5) 30%, transparent 60%)',
            filter: 'blur(70px)',
            animation: 'cloudClearRightFast 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            animationDelay: '0.2s',
          }}
        />
      </div>

      {/* 上から差し込む淡い光（短縮：2.5秒→1.2秒） */}
      <div className="absolute inset-0 z-[4]">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)',
            filter: 'blur(60px)',
            animation: 'lightReveal 1.2s ease-out forwards',
            animationDelay: '0.3s',
            opacity: 0,
          }}
        />
      </div>

      {/* テキストコンテンツ - 絶対に最前面 */}
      <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-6 px-8">
          {/* 日本語テキスト */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-wider"
            style={{
              fontFamily: 'var(--font-noto-serif)',
              color: '#3a4a5a',
              animation: fontsLoaded ? 'textFadeIn 2s ease-out forwards' : 'none',
              opacity: fontsLoaded ? 0 : 0,
            }}
          >
            北アルプス黒部源流
          </h1>

          {/* 英語テキスト */}
          <p
            className="text-lg md:text-xl lg:text-2xl tracking-[0.2em] font-light"
            style={{
              fontFamily: 'var(--font-noto-sans)',
              color: '#5a6a7a',
              animation: fontsLoaded ? 'textFadeIn 2s ease-out forwards' : 'none',
              animationDelay: fontsLoaded ? '0.4s' : '0s',
              opacity: fontsLoaded ? 0 : 0,
            }}
          >
            Northern Alps Kurobe Genryu
          </p>

          {/* スキップヒント - 和風で控えめなデザイン */}
          {showSkipHint && !fadeOut && (
            <div
              className="pt-12 md:pt-16"
              style={{
                animation: 'textFadeIn 1s ease-out forwards',
                opacity: 0,
              }}
            >
              <p
                className="text-xs md:text-sm tracking-[0.3em] font-light flex items-center justify-center gap-3"
                style={{
                  fontFamily: 'var(--font-noto-sans)',
                  color: '#7a8a9a',
                }}
              >
                <span className="inline-block w-6 h-[1px] bg-gradient-to-r from-transparent to-gray-400/50" />
                <span>クリックまたはEscでスキップ</span>
                <span className="inline-block w-6 h-[1px] bg-gradient-to-l from-transparent to-gray-400/50" />
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes cloudClearSlow {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.15);
          }
        }

        @keyframes cloudClearLeft {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(-180px) scale(1.25);
          }
        }

        @keyframes cloudClearRight {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(180px) scale(1.25);
          }
        }

        @keyframes cloudClearLeftFast {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(-280px) scale(1.35);
          }
        }

        @keyframes cloudClearRightFast {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(280px) scale(1.35);
          }
        }

        @keyframes lightReveal {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes textFadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
