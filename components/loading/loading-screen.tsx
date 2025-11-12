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
        background: 'linear-gradient(180deg, #e8ecf0 0%, #f2f5f8 40%, #f8fafb 70%, #ffffff 100%)',
      }}
    >
      {/* 遠景の霧 - ゆっくりと全体を覆う */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'distantMistClear 5s ease-out forwards',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 130% 90% at 30% 40%, rgba(190, 200, 210, 0.7) 0%, rgba(210, 220, 230, 0.5) 40%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'gentleDrift1 15s ease-in-out infinite',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 120% 85% at 70% 50%, rgba(200, 210, 220, 0.65) 0%, rgba(215, 225, 235, 0.45) 40%, transparent 70%)',
            filter: 'blur(95px)',
            animation: 'gentleDrift2 17s ease-in-out infinite',
            animationDelay: '1s',
          }}
        />
      </div>

      {/* 中層の霧 - 左から晴れる */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'mistClearLeft 4.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          animationDelay: '0.4s',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 85% at 15% 50%, rgba(180, 190, 200, 0.8) 0%, rgba(200, 210, 220, 0.6) 35%, transparent 65%)',
            filter: 'blur(80px)',
            animation: 'gentleDrift3 12s ease-in-out infinite',
          }}
        />
      </div>

      {/* 中層の霧 - 右から晴れる */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'mistClearRight 4.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          animationDelay: '0.6s',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 85% at 85% 50%, rgba(180, 190, 200, 0.8) 0%, rgba(200, 210, 220, 0.6) 35%, transparent 65%)',
            filter: 'blur(80px)',
            animation: 'gentleDrift4 13s ease-in-out infinite',
            animationDelay: '0.5s',
          }}
        />
      </div>

      {/* 近景の霧 - 下から上へゆっくり流れる */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'mistRiseUp 4s ease-out forwards',
          animationDelay: '0.8s',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 50% 80%, rgba(170, 180, 190, 0.6) 0%, rgba(190, 200, 210, 0.4) 40%, transparent 60%)',
            filter: 'blur(65px)',
            animation: 'gentleDrift5 10s ease-in-out infinite',
          }}
        />
      </div>

      {/* 繊細な光芒 - 控えめに */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 left-1/2"
            style={{
              width: '1px',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 35%, transparent 60%)',
              transform: `translateX(-50%) rotate(${(i - 3) * 12}deg)`,
              transformOrigin: 'top center',
              animation: `gentleLightRay 4s ease-out forwards`,
              animationDelay: `${1.2 + i * 0.15}s`,
              opacity: 0,
              filter: 'blur(1.5px)',
            }}
          />
        ))}
      </div>

      {/* 中央の穏やかな光 */}
      <div
        className="absolute inset-0 overflow-hidden opacity-50"
        style={{
          animation: 'gentleLight 3.5s ease-out forwards',
          animationDelay: '1.5s',
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%)',
            filter: 'blur(90px)',
            opacity: 0,
            animation: 'gentlePulse 6s ease-in-out infinite',
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
              color: '#5a6a7a',
              animation: 'textSereneFade 3s ease-out forwards',
              animationDelay: '1s',
              opacity: 0,
              filter: 'blur(10px)',
            }}
          >
            北アルプス黒部源流
          </h1>
        </div>

        {/* 装飾ライン */}
        <div className="flex items-center justify-center gap-6">
          <div
            style={{
              width: '100px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(140, 150, 160, 0.5), transparent)',
              animation: 'lineGentleExpand 2.5s ease-out forwards',
              animationDelay: '2.2s',
              transformOrigin: 'center',
              transform: 'scaleX(0)',
            }}
          />
          <div
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: 'rgba(130, 140, 150, 0.6)',
              animation: 'dotGentleFade 2.5s ease-out forwards',
              animationDelay: '2.7s',
              opacity: 0,
            }}
          />
          <div
            style={{
              width: '100px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(140, 150, 160, 0.5), transparent)',
              animation: 'lineGentleExpand 2.5s ease-out forwards',
              animationDelay: '2.2s',
              transformOrigin: 'center',
              transform: 'scaleX(0)',
            }}
          />
        </div>

        {/* 英語テキスト */}
        <div>
          <p
            className="text-xl md:text-2xl lg:text-3xl tracking-[0.3em] font-light"
            style={{
              fontFamily: 'var(--font-noto-sans)',
              color: '#7a8a9a',
              animation: 'textSereneFade 3s ease-out forwards',
              animationDelay: '1.3s',
              opacity: 0,
              filter: 'blur(10px)',
            }}
          >
            Northern Alps Kurobe Genryu
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes distantMistClear {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }

        @keyframes mistClearLeft {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(-250px) scale(1.3);
          }
        }

        @keyframes mistClearRight {
          0% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(250px) scale(1.3);
          }
        }

        @keyframes mistRiseUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-150px) scale(0.9);
          }
        }

        @keyframes gentleDrift1 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-30px, 20px);
          }
        }

        @keyframes gentleDrift2 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(35px, -18px);
          }
        }

        @keyframes gentleDrift3 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-25px, 25px);
          }
        }

        @keyframes gentleDrift4 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(28px, 22px);
          }
        }

        @keyframes gentleDrift5 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -30px);
          }
        }

        @keyframes gentleLightRay {
          0% {
            opacity: 0;
            transform: translateX(-50%) scaleY(0);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) scaleY(1);
          }
        }

        @keyframes gentleLight {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes gentlePulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.08);
          }
        }

        @keyframes textSereneFade {
          0% {
            opacity: 0;
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
          }
        }

        @keyframes lineGentleExpand {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        @keyframes dotGentleFade {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
