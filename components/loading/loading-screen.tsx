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
        background: 'linear-gradient(180deg, #2a3441 0%, #3d4d5f 30%, #566b7d 60%, #a0b4c5 100%)',
        animation: 'backgroundLighten 4.5s ease-out forwards',
      }}
    >
      {/* 濃い霧のレイヤー - 最初は画面全体を覆う */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'heavyMistClear 4.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 120% 100% at 30% 50%, rgba(90, 105, 120, 0.95) 0%, rgba(60, 75, 90, 0.9) 35%, transparent 70%)',
            filter: 'blur(90px)',
            animation: 'mistFloat1 12s ease-in-out infinite',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 110% 90% at 70% 60%, rgba(80, 95, 110, 0.9) 0%, rgba(70, 85, 100, 0.85) 40%, transparent 70%)',
            filter: 'blur(85px)',
            animation: 'mistFloat2 14s ease-in-out infinite',
            animationDelay: '0.7s',
          }}
        />
      </div>

      {/* 中層の霧 - 左右から晴れる */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'mistSweepLeft 4s ease-out forwards',
          animationDelay: '0.3s',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 80% at 20% 50%, rgba(120, 135, 150, 0.8) 0%, rgba(100, 115, 130, 0.6) 40%, transparent 65%)',
            filter: 'blur(70px)',
            animation: 'mistFloat3 10s ease-in-out infinite',
          }}
        />
      </div>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'mistSweepRight 4s ease-out forwards',
          animationDelay: '0.5s',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 80% at 80% 50%, rgba(120, 135, 150, 0.8) 0%, rgba(100, 115, 130, 0.6) 40%, transparent 65%)',
            filter: 'blur(70px)',
            animation: 'mistFloat4 11s ease-in-out infinite',
            animationDelay: '0.4s',
          }}
        />
      </div>

      {/* 光の爆発 - 中央から広がる強い光 */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'lightBurst 3.5s ease-out forwards',
          animationDelay: '1s',
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.6) 30%, transparent 70%)',
            filter: 'blur(50px)',
            opacity: 0,
          }}
        />
      </div>

      {/* 光芒 - 劇的な光の筋 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 left-1/2"
            style={{
              width: '3px',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 40%, transparent 70%)',
              transform: `translateX(-50%) rotate(${(i - 6) * 10}deg)`,
              transformOrigin: 'top center',
              animation: `dramaticLightRay 3.5s ease-out forwards`,
              animationDelay: `${0.8 + i * 0.08}s`,
              opacity: 0,
              filter: 'blur(2px)',
            }}
          />
        ))}
      </div>

      {/* 霧のパーティクル */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 200 + 120 + 'px',
              height: Math.random() * 200 + 120 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: `radial-gradient(circle, rgba(${100 + Math.random() * 80}, ${115 + Math.random() * 80}, ${130 + Math.random() * 80}, 0.6) 0%, transparent 70%)`,
              filter: 'blur(40px)',
              animation: `mistParticleDisperse ${Math.random() * 2 + 3.5}s ease-out forwards`,
              animationDelay: `${Math.random() * 1.2}s`,
              opacity: 1,
            }}
          />
        ))}
      </div>

      {/* 中央の強い光源 */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'centralLightIntense 3s ease-out forwards',
          animationDelay: '1.8s',
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.3) 40%, transparent 70%)',
            filter: 'blur(80px)',
            opacity: 0,
            animation: 'lightPulseIntense 4s ease-in-out infinite',
            animationDelay: '2.5s',
          }}
        />
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center space-y-10 px-8">
        {/* 日本語テキスト */}
        <div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-wider"
            style={{
              fontFamily: 'var(--font-noto-serif)',
              color: '#e5eaf0',
              animation: 'textDramaticReveal 3.5s ease-out forwards',
              animationDelay: '1.5s',
              opacity: 0,
              filter: 'blur(15px)',
              transform: 'scale(0.9)',
              textShadow: '0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.2)',
            }}
          >
            北アルプス黒部源流
          </h1>
        </div>

        {/* 装飾ライン */}
        <div className="flex items-center justify-center gap-6">
          <div
            style={{
              width: '120px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.6), transparent)',
              animation: 'lineExpand 2.5s ease-out forwards',
              animationDelay: '2.8s',
              transformOrigin: 'center',
              transform: 'scaleX(0)',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
            }}
          />
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5))',
              animation: 'dotGlow 2.5s ease-out forwards',
              animationDelay: '3.3s',
              opacity: 0,
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
            }}
          />
          <div
            style={{
              width: '120px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.6), transparent)',
              animation: 'lineExpand 2.5s ease-out forwards',
              animationDelay: '2.8s',
              transformOrigin: 'center',
              transform: 'scaleX(0)',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
            }}
          />
        </div>

        {/* 英語テキスト */}
        <div>
          <p
            className="text-xl md:text-2xl lg:text-3xl tracking-[0.3em] font-light"
            style={{
              fontFamily: 'var(--font-noto-sans)',
              color: '#d0dae5',
              animation: 'textDramaticReveal 3.5s ease-out forwards',
              animationDelay: '2s',
              opacity: 0,
              filter: 'blur(15px)',
              transform: 'scale(0.9)',
              textShadow: '0 0 25px rgba(255, 255, 255, 0.25), 0 0 50px rgba(255, 255, 255, 0.15)',
            }}
          >
            Northern Alps Kurobe Genryu
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes backgroundLighten {
          0% {
            background: linear-gradient(180deg, #2a3441 0%, #3d4d5f 30%, #566b7d 60%, #a0b4c5 100%);
          }
          100% {
            background: linear-gradient(180deg, #c5d4e3 0%, #dae6f0 30%, #e8f0f5 60%, #f5f8fa 100%);
          }
        }

        @keyframes heavyMistClear {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          70% {
            opacity: 0.6;
            transform: scale(1.1);
          }
          100% {
            opacity: 0;
            transform: scale(1.3);
          }
        }

        @keyframes mistSweepLeft {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(-400px) scale(1.4);
          }
        }

        @keyframes mistSweepRight {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(400px) scale(1.4);
          }
        }

        @keyframes lightBurst {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(2);
          }
          100% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(3);
          }
        }

        @keyframes dramaticLightRay {
          0% {
            opacity: 0;
            transform: translateX(-50%) scaleY(0);
          }
          40% {
            opacity: 1;
          }
          100% {
            opacity: 0.7;
            transform: translateX(-50%) scaleY(1);
          }
        }

        @keyframes mistParticleDisperse {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(
                ${Math.random() * 300 - 150}px,
                ${Math.random() * 300 - 150}px
              )
              scale(0.2);
          }
        }

        @keyframes centralLightIntense {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes lightPulseIntense {
          0%,
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes mistFloat1 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-50px, 30px);
          }
        }

        @keyframes mistFloat2 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(45px, -25px);
          }
        }

        @keyframes mistFloat3 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-35px, 40px);
          }
        }

        @keyframes mistFloat4 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(40px, 35px);
          }
        }

        @keyframes textDramaticReveal {
          0% {
            opacity: 0;
            filter: blur(15px);
            transform: scale(0.9);
          }
          30% {
            opacity: 0.1;
            filter: blur(12px);
          }
          60% {
            opacity: 0.5;
            filter: blur(6px);
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: scale(1);
          }
        }

        @keyframes lineExpand {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scaleX(1);
            opacity: 0.8;
          }
        }

        @keyframes dotGlow {
          0% {
            opacity: 0;
            transform: scale(0.2);
          }
          50% {
            opacity: 1;
            transform: scale(1.4);
          }
          100% {
            opacity: 0.9;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
