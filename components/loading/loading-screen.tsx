'use client'

import { useEffect, useState } from 'react'

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // ローディング画面を5秒表示してからフェードアウト開始
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 5000)

    // フェードアウト完了後に非表示
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 6500)

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
        background: 'linear-gradient(180deg, #e8ecf1 0%, #f0f4f8 50%, #f8fafb 100%)',
      }}
    >
      {/* 光芒（こうぼう）- 上から差し込む光の筋 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 left-1/2"
            style={{
              width: '2px',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0%, transparent 60%)',
              transform: `translateX(-50%) rotate(${(i - 4) * 8}deg)`,
              transformOrigin: 'top center',
              animation: `lightRay 4s ease-out forwards`,
              animationDelay: `${0.5 + i * 0.1}s`,
              opacity: 0,
              filter: 'blur(3px)',
            }}
          />
        ))}
      </div>

      {/* 大きな雲の塊 - 左から */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'cloudClearLeft 4.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 80% at 20% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(245, 248, 250, 0.8) 40%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'cloudFloat1 10s ease-in-out infinite',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 10% 60%, rgba(250, 252, 254, 0.9) 0%, transparent 65%)',
            filter: 'blur(70px)',
            animation: 'cloudFloat2 12s ease-in-out infinite',
            animationDelay: '0.5s',
          }}
        />
      </div>

      {/* 大きな雲の塊 - 右から */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'cloudClearRight 4.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          animationDelay: '0.2s',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 80% at 80% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(245, 248, 250, 0.8) 40%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'cloudFloat3 11s ease-in-out infinite',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 85% 75% at 90% 40%, rgba(250, 252, 254, 0.85) 0%, transparent 65%)',
            filter: 'blur(65px)',
            animation: 'cloudFloat4 13s ease-in-out infinite',
            animationDelay: '0.7s',
          }}
        />
      </div>

      {/* 中層の霧 - 上から下へ流れる */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'mistFallDown 4s ease-out forwards',
          animationDelay: '0.4s',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 20%, rgba(255, 255, 255, 0.7) 0%, transparent 65%)',
            filter: 'blur(50px)',
            animation: 'mistDrift1 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 40% 30%, rgba(245, 248, 252, 0.6) 0%, transparent 60%)',
            filter: 'blur(45px)',
            animation: 'mistDrift2 9s ease-in-out infinite',
            animationDelay: '0.3s',
          }}
        />
      </div>

      {/* 中央から放射状に晴れる霧 */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'radialClear 4s ease-out forwards',
          animationDelay: '0.6s',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 60%)',
            filter: 'blur(60px)',
            transform: 'scale(1)',
          }}
        />
      </div>

      {/* 細かい霧のパーティクル */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 150 + 100 + 'px',
              height: Math.random() * 150 + 100 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)',
              filter: 'blur(30px)',
              animation: `mistParticle ${Math.random() * 2 + 4}s ease-out forwards`,
              animationDelay: `${Math.random() * 1.5}s`,
              opacity: 1,
            }}
          />
        ))}
      </div>

      {/* 中央の光源 - 徐々に強まる */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'centralLight 3.5s ease-out forwards',
          animationDelay: '1.5s',
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'lightPulse 5s ease-in-out infinite',
            animationDelay: '2s',
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
              animation: 'textEmergence 3s ease-out forwards',
              animationDelay: '1.2s',
              opacity: 0,
              filter: 'blur(12px)',
              transform: 'scale(0.95)',
            }}
          >
            北アルプス黒部源流
          </h1>
        </div>

        {/* 装飾ライン */}
        <div className="flex items-center justify-center gap-6">
          <div
            className="h-px bg-gradient-to-r from-transparent via-gray-400/60 to-transparent"
            style={{
              width: '100px',
              animation: 'expandLine 2s ease-out forwards',
              animationDelay: '2.5s',
              transformOrigin: 'center',
              transform: 'scaleX(0)',
            }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full bg-gray-500/70"
            style={{
              animation: 'dotReveal 2s ease-out forwards',
              animationDelay: '3s',
              opacity: 0,
            }}
          />
          <div
            className="h-px bg-gradient-to-r from-transparent via-gray-400/60 to-transparent"
            style={{
              width: '100px',
              animation: 'expandLine 2s ease-out forwards',
              animationDelay: '2.5s',
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
              animation: 'textEmergence 3s ease-out forwards',
              animationDelay: '1.6s',
              opacity: 0,
              filter: 'blur(12px)',
              transform: 'scale(0.95)',
            }}
          >
            Northern Alps Kurobe Genryu
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes cloudClearLeft {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          60% {
            opacity: 0.8;
            transform: translateX(-50px) scale(1.05);
          }
          100% {
            opacity: 0;
            transform: translateX(-300px) scale(1.2);
          }
        }

        @keyframes cloudClearRight {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          60% {
            opacity: 0.8;
            transform: translateX(50px) scale(1.05);
          }
          100% {
            opacity: 0;
            transform: translateX(300px) scale(1.2);
          }
        }

        @keyframes mistFallDown {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(200px) scale(0.8);
          }
        }

        @keyframes radialClear {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(3);
          }
        }

        @keyframes mistParticle {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(
                ${Math.random() * 200 - 100}px,
                ${Math.random() * 200 - 100}px
              )
              scale(0.3);
          }
        }

        @keyframes lightRay {
          0% {
            opacity: 0;
            transform: translateX(-50%) rotate(var(--rotation)) scaleY(0);
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 0.3;
            transform: translateX(-50%) rotate(var(--rotation)) scaleY(1);
          }
        }

        @keyframes centralLight {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 0.8;
          }
        }

        @keyframes lightPulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.15);
          }
        }

        @keyframes cloudFloat1 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-40px, 25px);
          }
        }

        @keyframes cloudFloat2 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-30px, -20px);
          }
        }

        @keyframes cloudFloat3 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(40px, 20px);
          }
        }

        @keyframes cloudFloat4 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(35px, -25px);
          }
        }

        @keyframes mistDrift1 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, 40px);
          }
        }

        @keyframes mistDrift2 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-25px, 35px);
          }
        }

        @keyframes textEmergence {
          0% {
            opacity: 0;
            filter: blur(12px);
            transform: scale(0.95);
          }
          40% {
            opacity: 0.2;
            filter: blur(8px);
          }
          70% {
            opacity: 0.6;
            filter: blur(3px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: scale(1);
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
            transform: scale(0.3);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.3);
          }
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
