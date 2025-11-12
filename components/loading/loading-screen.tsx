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
        background: 'linear-gradient(180deg, #f0f3f6 0%, #f8fafb 50%, #ffffff 100%)',
      }}
    >
      {/* シンプルな霧レイヤー1 */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'simpleMistFade 4s ease-out forwards',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 110% 90% at 50% 50%, rgba(200, 210, 220, 0.6) 0%, rgba(220, 230, 240, 0.4) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* シンプルな霧レイヤー2 */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          animation: 'simpleMistFade 3.5s ease-out forwards',
          animationDelay: '0.3s',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(190, 200, 210, 0.5) 0%, rgba(210, 220, 230, 0.3) 40%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* メインコンテンツ - 確実に最前面 */}
      <div className="relative z-[100] text-center space-y-8 px-8">
        {/* 日本語テキスト */}
        <div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-wider"
            style={{
              fontFamily: 'var(--font-noto-serif)',
              color: '#4a5a6a',
              animation: 'textSimpleFade 2.5s ease-out forwards',
              animationDelay: '0.5s',
              opacity: 0,
            }}
          >
            北アルプス黒部源流
          </h1>
        </div>

        {/* 装飾ライン */}
        <div className="flex items-center justify-center gap-6">
          <div
            style={{
              width: '80px',
              height: '1px',
              background: 'rgba(130, 140, 150, 0.4)',
              animation: 'lineSimpleFade 2s ease-out forwards',
              animationDelay: '1.5s',
              opacity: 0,
            }}
          />
          <div
            style={{
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: 'rgba(120, 130, 140, 0.5)',
              animation: 'lineSimpleFade 2s ease-out forwards',
              animationDelay: '1.8s',
              opacity: 0,
            }}
          />
          <div
            style={{
              width: '80px',
              height: '1px',
              background: 'rgba(130, 140, 150, 0.4)',
              animation: 'lineSimpleFade 2s ease-out forwards',
              animationDelay: '1.5s',
              opacity: 0,
            }}
          />
        </div>

        {/* 英語テキスト */}
        <div>
          <p
            className="text-xl md:text-2xl lg:text-3xl tracking-[0.25em] font-light"
            style={{
              fontFamily: 'var(--font-noto-sans)',
              color: '#6a7a8a',
              animation: 'textSimpleFade 2.5s ease-out forwards',
              animationDelay: '0.8s',
              opacity: 0,
            }}
          >
            Northern Alps Kurobe Genryu
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes simpleMistFade {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes textSimpleFade {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes lineSimpleFade {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
