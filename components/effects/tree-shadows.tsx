"use client"

import { useEffect, useRef, useState } from "react"

export function TreeShadows() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const shadow1Ref = useRef<HTMLDivElement>(null)
  const shadow2Ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleScroll = () => {
      const scrollY = window.scrollY
      const lodgesSection = document.getElementById("lodges-section")

      if (lodgesSection) {
        const rect = lodgesSection.getBoundingClientRect()
        const lodgesSectionTop = rect.top + window.scrollY
        const viewportHeight = window.innerHeight

        // 山荘セクションが画面の中央に達したら表示開始
        const threshold = lodgesSectionTop - viewportHeight * 0.7

        setIsVisible(scrollY > threshold)
      }

      // パララックス効果を適用
      if (shadow1Ref.current) {
        shadow1Ref.current.style.setProperty("--scroll-y", `${scrollY * 0.15}px`)
      }
      if (shadow2Ref.current) {
        shadow2Ref.current.style.setProperty("--scroll-y", `${scrollY * 0.12}px`)
      }
    }

    // 初回実行
    setTimeout(() => {
      handleScroll()
    }, 100)

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    const animateNaturalMovement = () => {
      const time = Date.now() * 0.0005
      const shadows = [shadow1Ref.current, shadow2Ref.current]

      shadows.forEach((shadow, index) => {
        if (shadow) {
          const wave = Math.sin(time + index * 1.5) * 1.5
          const translateX = Math.sin(time * 0.4 + index) * 6
          const translateY = Math.cos(time * 0.3 + index) * 5
          const scrollY = shadow.style.getPropertyValue("--scroll-y") || "0px"

          shadow.style.transform = `translate3d(calc(${translateX}px), calc(${translateY}px + ${scrollY}), 0) rotate(${wave}deg)`
        }
      })

      rafRef.current = requestAnimationFrame(animateNaturalMovement)
    }

    rafRef.current = requestAnimationFrame(animateNaturalMovement)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      window.removeEventListener("resize", checkMobile)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  // モバイルではパーティクル数を削減
  const particleCount = isMobile ? 4 : 8 // 元は18個

  return (
    <>
      {/* 木の影レイヤー - 簡素化して2つのSVG影のみ */}
      <div
        className="fixed inset-0 pointer-events-none z-[2] overflow-hidden transition-opacity duration-1000"
        style={{ opacity: isVisible ? (isMobile ? 0.85 : 1) : 0 }}
      >
        {/* 木の影 1 - 左上 */}
        <div
          ref={shadow1Ref}
          className="absolute -top-20 -left-32 w-[800px] h-[900px]"
          style={{
            willChange: "transform",
            transform: "translate3d(0, 0, 0)",
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 800 900" className="select-none">
            <defs>
              <filter id="shadow1">
                <feGaussianBlur in="SourceGraphic" stdDeviation={isMobile ? "20" : "25"} />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.6" />
                </feComponentTransfer>
              </filter>
            </defs>
            <ellipse
              cx="350"
              cy="200"
              rx="280"
              ry="320"
              fill="#3a3228"
              filter="url(#shadow1)"
              opacity="0.8"
              style={{ mixBlendMode: "multiply" }}
            />
            {!isMobile && (
              <>
                <ellipse cx="450" cy="400" rx="200" ry="280" fill="#42382c" filter="url(#shadow1)" opacity="0.7" />
                <ellipse cx="280" cy="550" rx="180" ry="220" fill="#3d3429" filter="url(#shadow1)" opacity="0.75" />
              </>
            )}
          </svg>
        </div>

        {/* 木の影 2 - 右上（簡素化） */}
        <div
          ref={shadow2Ref}
          className="absolute -top-28 -right-24 w-[750px] h-[850px]"
          style={{
            willChange: "transform",
            transform: "translate3d(0, 0, 0)",
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 750 850" className="select-none">
            <defs>
              <filter id="shadow2">
                <feGaussianBlur in="SourceGraphic" stdDeviation={isMobile ? "22" : "28"} />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.55" />
                </feComponentTransfer>
              </filter>
            </defs>
            <ellipse
              cx="550"
              cy="180"
              rx="260"
              ry="300"
              fill="#3c342a"
              filter="url(#shadow2)"
              opacity="0.75"
              style={{ mixBlendMode: "multiply" }}
            />
            {!isMobile && (
              <ellipse cx="450" cy="380" rx="220" ry="260" fill="#3f362b" filter="url(#shadow2)" opacity="0.65" />
            )}
          </svg>
        </div>
      </div>

      {/* 光のグラデーション（簡素化・デスクトップのみ） */}
      {!isMobile && (
        <div
          className="fixed inset-0 pointer-events-none z-[1] overflow-hidden transition-opacity duration-1000"
          style={{ opacity: isVisible ? 0.4 : 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 850px 650px at 30% 20%, rgba(255, 250, 240, 0.95) 0%, transparent 70%)",
              mixBlendMode: "soft-light",
            }}
          />
        </div>
      )}

      {/* パーティクル - 大幅に削減 */}
      <div
        className="fixed inset-0 pointer-events-none z-[2] overflow-hidden transition-opacity duration-1000"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {[...Array(particleCount)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: "rgba(255, 248, 220, 0.8)",
              animation: `floatLight ${Math.random() * 25 + 35}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 12}s`,
              willChange: "transform",
              transform: "translate3d(0, 0, 0)",
              boxShadow: isMobile ? "0 0 8px rgba(255, 248, 200, 0.6)" : "0 0 12px rgba(255, 248, 200, 0.75)",
            }}
          />
        ))}
      </div>

      {/* 木漏れ日パターン - radial-gradientを削減（デスクトップのみ） */}
      {!isMobile && (
        <div
          className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-1000"
          style={{ opacity: isVisible ? 0.25 : 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(ellipse 5px 6px at 20% 25%, rgba(60, 50, 40, 0.5) 0%, transparent 100%),
                radial-gradient(ellipse 6px 5px at 52% 42%, rgba(55, 45, 35, 0.45) 0%, transparent 100%),
                radial-gradient(ellipse 4px 5px at 82% 58%, rgba(58, 48, 38, 0.4) 0%, transparent 100%)
              `,
              backgroundSize: "1500px 1000px, 1300px 900px, 1600px 1100px",
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes floatLight {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.6;
          }
          50% {
            transform: translate3d(15px, -30px, 0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
