'use client'

import { useEffect, useState } from 'react'

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // ローディング画面を4秒表示してからフェードアウト開始
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 4000)

    // フェードアウト完了後に非表示
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 5500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-1500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(180deg, #fafafa 0%, #f5f5f5 50%, #ffffff 100%)',
      }}
    >
      {/* 控えめな波紋エフェクト */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-300/40"
            style={{
              width: '200px',
              height: '200px',
              animation: `ripple 6s ease-out infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center space-y-10 px-8">
        {/* 日本語テキスト */}
        <div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-800 tracking-wider"
            style={{
              fontFamily: 'var(--font-noto-serif)',
              animation: 'fadeIn 2.5s ease-out forwards',
              opacity: 0,
            }}
          >
            北アルプス黒部源流
          </h1>
        </div>

        {/* 装飾ライン */}
        <div className="flex items-center justify-center gap-6">
          <div
            className="h-px bg-gradient-to-r from-transparent via-gray-400/50 to-transparent"
            style={{
              width: '100px',
              animation: 'expandLine 2s ease-out forwards',
              animationDelay: '1s',
              transformOrigin: 'center',
              transform: 'scaleX(0)',
            }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full bg-gray-500/60"
            style={{
              animation: 'subtlePulse 3s ease-in-out infinite',
              animationDelay: '1.5s',
              opacity: 0,
            }}
          />
          <div
            className="h-px bg-gradient-to-r from-transparent via-gray-400/50 to-transparent"
            style={{
              width: '100px',
              animation: 'expandLine 2s ease-out forwards',
              animationDelay: '1s',
              transformOrigin: 'center',
              transform: 'scaleX(0)',
            }}
          />
        </div>

        {/* 英語テキスト */}
        <div>
          <p
            className="text-xl md:text-2xl lg:text-3xl text-gray-600 tracking-[0.3em] font-light"
            style={{
              fontFamily: 'var(--font-noto-sans)',
              animation: 'fadeIn 2.5s ease-out forwards',
              animationDelay: '0.5s',
              opacity: 0,
            }}
          >
            Northern Alps Kurobe Genryu
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes ripple {
          0% {
            width: 200px;
            height: 200px;
            opacity: 0.6;
          }
          100% {
            width: 1000px;
            height: 1000px;
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes expandLine {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        @keyframes subtlePulse {
          0% {
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
          80% {
            opacity: 0.6;
          }
          100% {
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  )
}
