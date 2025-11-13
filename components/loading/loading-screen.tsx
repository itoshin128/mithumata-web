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
      {/* 遠景の雲レイヤー - 最も遠く、最もゆっくり */}
      <div className="absolute inset-0 z-[1]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 130% 100% at 50% 50%, rgba(210, 220, 230, 0.5) 0%, rgba(220, 230, 240, 0.3) 40%, transparent 70%)',
            filter: 'blur(120px)',
            animation: 'cloudClearSlow 3.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        />
      </div>

      {/* 中景の雲レイヤー左 - 中間の速度 */}
      <div className="absolute inset-0 z-[2]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 110% 90% at 25% 50%, rgba(200, 210, 220, 0.6) 0%, rgba(215, 225, 235, 0.4) 35%, transparent 65%)',
            filter: 'blur(90px)',
            animation: 'cloudClearLeft 3.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            animationDelay: '0.2s',
          }}
        />
      </div>

      {/* 中景の雲レイヤー右 - 中間の速度 */}
      <div className="absolute inset-0 z-[2]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 110% 90% at 75% 50%, rgba(200, 210, 220, 0.6) 0%, rgba(215, 225, 235, 0.4) 35%, transparent 65%)',
            filter: 'blur(90px)',
            animation: 'cloudClearRight 3.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            animationDelay: '0.2s',
          }}
        />
      </div>

      {/* 近景の雲レイヤー左 - 最も速い */}
      <div className="absolute inset-0 z-[3]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 80% at 20% 50%, rgba(190, 200, 210, 0.7) 0%, rgba(205, 215, 225, 0.5) 30%, transparent 60%)',
            filter: 'blur(70px)',
            animation: 'cloudClearLeftFast 2.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            animationDelay: '0.4s',
          }}
        />
      </div>

      {/* 近景の雲レイヤー右 - 最も速い */}
      <div className="absolute inset-0 z-[3]">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 80% at 80% 50%, rgba(190, 200, 210, 0.7) 0%, rgba(205, 215, 225, 0.5) 30%, transparent 60%)',
            filter: 'blur(70px)',
            animation: 'cloudClearRightFast 2.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            animationDelay: '0.4s',
          }}
        />
      </div>

      {/* 上から差し込む淡い光 */}
      <div className="absolute inset-0 z-[4]">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)',
            filter: 'blur(60px)',
            animation: 'lightReveal 2.5s ease-out forwards',
            animationDelay: '0.8s',
            opacity: 0,
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
