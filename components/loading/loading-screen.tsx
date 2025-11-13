'use client'

import { useEffect, useState } from 'react'

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // ローディング画面を3.5秒表示してからフェードアウト開始
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 3500)

    // フェードアウト完了後に非表示
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] transition-opacity duration-1500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(180deg, #f5f7f9 0%, #fafbfc 50%, #ffffff 100%)',
      }}
    >
      {/* 背景の控えめな霧 - テキストより絶対に下 */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(220, 228, 235, 0.3) 0%, transparent 60%)',
            filter: 'blur(100px)',
            animation: 'backgroundMistFade 3.5s ease-out forwards',
          }}
        />
      </div>

      {/* テキストコンテンツ - 絶対に最前面 */}
      <div className="absolute inset-0 z-50 flex items-center justify-center">
        <div className="text-center space-y-6 px-8">
          {/* 日本語テキスト */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-wider"
            style={{
              fontFamily: 'var(--font-noto-serif)',
              color: '#3a4a5a',
              animation: 'textFadeIn 2s ease-out forwards',
              opacity: 0,
            }}
          >
            北アルプス黒部源流
          </h1>

          {/* 装飾 */}
          <div
            className="flex items-center justify-center gap-4"
            style={{
              animation: 'textFadeIn 2s ease-out forwards',
              animationDelay: '0.8s',
              opacity: 0,
            }}
          >
            <div
              style={{
                width: '60px',
                height: '1px',
                background: 'rgba(120, 130, 140, 0.3)',
              }}
            />
            <div
              style={{
                width: '2px',
                height: '2px',
                borderRadius: '50%',
                background: 'rgba(110, 120, 130, 0.4)',
              }}
            />
            <div
              style={{
                width: '60px',
                height: '1px',
                background: 'rgba(120, 130, 140, 0.3)',
              }}
            />
          </div>

          {/* 英語テキスト */}
          <p
            className="text-lg md:text-xl lg:text-2xl tracking-[0.2em] font-light"
            style={{
              fontFamily: 'var(--font-noto-sans)',
              color: '#5a6a7a',
              animation: 'textFadeIn 2s ease-out forwards',
              animationDelay: '0.4s',
              opacity: 0,
            }}
          >
            Northern Alps Kurobe Genryu
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes backgroundMistFade {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
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
