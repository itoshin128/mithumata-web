"use client"

import { useEffect, useRef, useState } from "react"

export function TreeShadows() {
  const [isVisible, setIsVisible] = useState(false)
  const shadow1Ref = useRef<HTMLDivElement>(null)
  const shadow2Ref = useRef<HTMLDivElement>(null)
  const shadow3Ref = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>()

  useEffect(() => {
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

        console.log("[v0] TreeShadows - scrollY:", scrollY, "threshold:", threshold, "visible:", scrollY > threshold)
      }

      // パララックス効果を適用
      if (shadow1Ref.current) {
        shadow1Ref.current.style.setProperty("--scroll-y", `${scrollY * 0.15}px`)
      }
      if (shadow2Ref.current) {
        shadow2Ref.current.style.setProperty("--scroll-y", `${scrollY * 0.12}px`)
      }
      if (shadow3Ref.current) {
        shadow3Ref.current.style.setProperty("--scroll-y", `${scrollY * 0.18}px`)
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
      const shadows = [shadow1Ref.current, shadow2Ref.current, shadow3Ref.current]

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
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <>
      {/* 木の影レイヤー - opacityを大幅に上げて明確に表示 */}
      <div
        className="fixed inset-0 pointer-events-none z-[2] overflow-hidden transition-opacity duration-1000"
        style={{ opacity: isVisible ? 0.75 : 0 }}
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
                <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
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
              opacity="0.65"
              style={{ mixBlendMode: "multiply" }}
            />
            <ellipse cx="450" cy="400" rx="200" ry="280" fill="#42382c" filter="url(#shadow1)" opacity="0.5" />
            <ellipse cx="280" cy="550" rx="180" ry="220" fill="#3d3429" filter="url(#shadow1)" opacity="0.55" />
          </svg>
        </div>

        {/* 木の影 2 - 右上 */}
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
                <feGaussianBlur in="SourceGraphic" stdDeviation="28" />
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
              opacity="0.6"
              style={{ mixBlendMode: "multiply" }}
            />
            <ellipse cx="450" cy="380" rx="220" ry="260" fill="#3f362b" filter="url(#shadow2)" opacity="0.48" />
          </svg>
        </div>

        {/* 木の影 3 - 中央やや下 */}
        <div
          ref={shadow3Ref}
          className="absolute top-[50vh] left-[8%] w-[700px] h-[800px]"
          style={{
            willChange: "transform",
            transform: "translate3d(0, 0, 0) rotate(12deg)",
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 700 800" className="select-none">
            <defs>
              <filter id="shadow3">
                <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.5" />
                </feComponentTransfer>
              </filter>
            </defs>
            <ellipse
              cx="300"
              cy="250"
              rx="240"
              ry="280"
              fill="#3b332b"
              filter="url(#shadow3)"
              opacity="0.58"
              style={{ mixBlendMode: "multiply" }}
            />
            <ellipse cx="380" cy="450" rx="190" ry="230" fill="#3e352d" filter="url(#shadow3)" opacity="0.45" />
          </svg>
        </div>
      </div>

      <div
        className="fixed inset-0 pointer-events-none z-[1] overflow-hidden transition-opacity duration-1000"
        style={{ opacity: isVisible ? 0.3 : 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 850px 650px at 30% 20%, rgba(255, 250, 240, 0.95) 0%, transparent 70%)",
            mixBlendMode: "soft-light",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 750px 550px at 75% 55%, rgba(255, 248, 235, 0.85) 0%, transparent 65%)",
            mixBlendMode: "soft-light",
          }}
        />
      </div>

      <div
        className="fixed inset-0 pointer-events-none z-[2] overflow-hidden transition-opacity duration-1000"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 5 + 3}px`,
              height: `${Math.random() * 5 + 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: "rgba(255, 248, 220, 0.85)",
              animation: `floatLight ${Math.random() * 25 + 35}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 12}s`,
              willChange: "transform",
              transform: "translate3d(0, 0, 0)",
              boxShadow: "0 0 12px rgba(255, 248, 200, 0.75)",
            }}
          />
        ))}
      </div>

      <div
        className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-1000"
        style={{ opacity: isVisible ? 0.18 : 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 5px 6px at 20% 25%, rgba(60, 50, 40, 0.55) 0%, transparent 100%),
              radial-gradient(ellipse 6px 5px at 52% 42%, rgba(55, 45, 35, 0.5) 0%, transparent 100%),
              radial-gradient(ellipse 4px 5px at 82% 58%, rgba(58, 48, 38, 0.48) 0%, transparent 100%),
              radial-gradient(ellipse 5px 4px at 28% 72%, rgba(62, 52, 42, 0.45) 0%, transparent 100%),
              radial-gradient(ellipse 4px 4px at 68% 88%, rgba(56, 46, 36, 0.42) 0%, transparent 100%)
            `,
            backgroundSize: "1500px 1000px, 1300px 900px, 1600px 1100px, 1200px 850px, 1400px 950px",
          }}
        />
      </div>

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
