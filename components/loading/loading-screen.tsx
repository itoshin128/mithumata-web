'use client'

import { useEffect, useState } from 'react'

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // ローディング画面を2.5秒表示してからフェードアウト開始
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 2500)

    // フェードアウト完了後に非表示
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 3500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 25%, #3b82f6 50%, #60a5fa 75%, #93c5fd 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite',
      }}
    >
      {/* 波紋エフェクト */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/20"
            style={{
              width: '100px',
              height: '100px',
              animation: `ripple 3s ease-out infinite`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* 光の粒子エフェクト */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/30"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 3 + 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center space-y-8">
        {/* 日本語テキスト */}
        <div className="overflow-hidden">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wider"
            style={{
              fontFamily: 'var(--font-noto-serif)',
              animation: 'slideInFromTop 1.2s ease-out forwards',
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            北アルプス黒部源流
          </h1>
        </div>

        {/* 装飾ライン */}
        <div className="flex items-center justify-center gap-4">
          <div
            className="h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
            style={{
              width: '120px',
              animation: 'expandLine 1.5s ease-out forwards',
              animationDelay: '0.6s',
              transformOrigin: 'center',
              transform: 'scaleX(0)',
            }}
          />
          <div
            className="w-2 h-2 rounded-full bg-white/80"
            style={{
              animation: 'pulse 2s ease-in-out infinite',
              animationDelay: '1s',
            }}
          />
          <div
            className="h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
            style={{
              width: '120px',
              animation: 'expandLine 1.5s ease-out forwards',
              animationDelay: '0.6s',
              transformOrigin: 'center',
              transform: 'scaleX(0)',
            }}
          />
        </div>

        {/* 英語テキスト */}
        <div className="overflow-hidden">
          <p
            className="text-xl md:text-2xl lg:text-3xl text-white/90 tracking-widest font-light"
            style={{
              fontFamily: 'var(--font-noto-sans)',
              animation: 'slideInFromBottom 1.2s ease-out forwards',
              animationDelay: '0.3s',
              opacity: 0,
              textShadow: '0 2px 15px rgba(0, 0, 0, 0.2)',
            }}
          >
            Northern Alps Kurobe Genryu
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes ripple {
          0% {
            width: 100px;
            height: 100px;
            opacity: 1;
          }
          100% {
            width: 800px;
            height: 800px;
            opacity: 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(20px);
            opacity: 0.8;
          }
        }

        @keyframes slideInFromTop {
          0% {
            transform: translateY(-50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromBottom {
          0% {
            transform: translateY(50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
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

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  )
}
