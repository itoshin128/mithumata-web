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
        background: 'linear-gradient(180deg, #f8f9fa 0%, #e8eef3 50%, #f5f8fa 100%)',
      }}
    >
      {/* 霧レイヤー1 - 最も遠い、ゆっくり */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'mistClear1 4s ease-out forwards',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(255, 255, 255, 0.9) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'mistDrift1 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 70% 60%, rgba(240, 245, 250, 0.8) 0%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'mistDrift2 10s ease-in-out infinite',
          }}
        />
      </div>

      {/* 霧レイヤー2 - 中間、中速 */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'mistClear2 3.5s ease-out forwards',
          animationDelay: '0.3s',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 70% at 50% 30%, rgba(255, 255, 255, 0.7) 0%, transparent 65%)',
            filter: 'blur(40px)',
            animation: 'mistDrift3 7s ease-in-out infinite',
            animationDelay: '0.5s',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 60% at 20% 70%, rgba(235, 240, 245, 0.6) 0%, transparent 60%)',
            filter: 'blur(35px)',
            animation: 'mistDrift4 9s ease-in-out infinite',
            animationDelay: '1s',
          }}
        />
      </div>

      {/* 霧レイヤー3 - 最も近い、速い */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'mistClear3 3s ease-out forwards',
          animationDelay: '0.6s',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 40% 50% at 80% 50%, rgba(255, 255, 255, 0.5) 0%, transparent 55%)',
            filter: 'blur(25px)',
            animation: 'mistDrift5 6s ease-in-out infinite',
            animationDelay: '0.2s',
          }}
        />
      </div>

      {/* 光の揺らぎ - 霧の隙間から差し込む光 */}
      <div
        className="absolute inset-0 overflow-hidden opacity-40"
        style={{
          animation: 'lightReveal 3s ease-out forwards',
          animationDelay: '1s',
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)',
            filter: 'blur(30px)',
            animation: 'lightPulse 4s ease-in-out infinite',
          }}
        />
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center space-y-10 px-8">
        {/* 日本語テキスト */}
        <div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-800 tracking-wider"
            style={{
              fontFamily: 'var(--font-noto-serif)',
              animation: 'textReveal 2.8s ease-out forwards',
              animationDelay: '0.8s',
              opacity: 0,
              filter: 'blur(8px)',
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
              animationDelay: '1.8s',
              transformOrigin: 'center',
              transform: 'scaleX(0)',
            }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full bg-gray-500/60"
            style={{
              animation: 'dotReveal 2s ease-out forwards',
              animationDelay: '2.2s',
              opacity: 0,
            }}
          />
          <div
            className="h-px bg-gradient-to-r from-transparent via-gray-400/50 to-transparent"
            style={{
              width: '100px',
              animation: 'expandLine 2s ease-out forwards',
              animationDelay: '1.8s',
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
              animation: 'textReveal 2.8s ease-out forwards',
              animationDelay: '1.2s',
              opacity: 0,
              filter: 'blur(8px)',
            }}
          >
            Northern Alps Kurobe Genryu
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes mistClear1 {
          0% {
            opacity: 1;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-100px);
          }
        }

        @keyframes mistClear2 {
          0% {
            opacity: 1;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(120px);
          }
        }

        @keyframes mistClear3 {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-80px);
          }
        }

        @keyframes mistDrift1 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-30px, 20px);
          }
        }

        @keyframes mistDrift2 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(40px, -15px);
          }
        }

        @keyframes mistDrift3 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(25px, 30px);
          }
        }

        @keyframes mistDrift4 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-35px, -20px);
          }
        }

        @keyframes mistDrift5 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -25px);
          }
        }

        @keyframes lightReveal {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 0.6;
          }
        }

        @keyframes lightPulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes textReveal {
          0% {
            opacity: 0;
            filter: blur(8px);
            transform: translateY(10px);
          }
          60% {
            opacity: 0.3;
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0);
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

        @keyframes dotReveal {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
