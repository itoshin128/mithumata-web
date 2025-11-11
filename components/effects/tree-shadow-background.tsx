'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface TreeShadowBackgroundProps {
  intensity?: 'subtle' | 'medium' | 'strong'
  enableParallax?: boolean
  className?: string
}

export default function TreeShadowBackground({
  intensity = 'medium',
  enableParallax = true,
  className = '',
}: TreeShadowBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  // Intensity settings - opacity for each layer
  const opacityLevels = {
    subtle: { deep: 0.15, mid: 0.12, light: 0.08 },
    medium: { deep: 0.25, mid: 0.18, light: 0.12 },
    strong: { deep: 0.35, mid: 0.25, light: 0.18 },
  }

  const opacity = opacityLevels[intensity]

  // Mouse parallax effect
  useEffect(() => {
    if (!enableParallax) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2 // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2 // -1 to 1
      setMousePosition({ x, y })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [enableParallax])

  // Calculate parallax transforms
  const getParallaxStyle = (depth: number) => {
    if (!enableParallax) return {}

    const mouseX = mousePosition.x * depth * 15
    const mouseY = mousePosition.y * depth * 15
    const scrollOffset = scrollY * depth * 0.3

    return {
      transform: `translate3d(${mouseX}px, ${mouseY + scrollOffset}px, 0)`,
    }
  }

  return (
    <div
      ref={containerRef}
      className={`tree-shadow-background ${className}`}
      aria-hidden="true"
    >
      {/* Deep shadow layer - slowest movement */}
      <div
        className="tree-shadow-layer tree-shadow-deep"
        style={{
          opacity: opacity.deep,
          ...getParallaxStyle(0.3),
        }}
      >
        <Image
          src="/images/tree-shadow.jpg"
          alt=""
          fill
          className="tree-shadow-image"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>

      {/* Mid shadow layer - medium movement */}
      <div
        className="tree-shadow-layer tree-shadow-mid"
        style={{
          opacity: opacity.mid,
          ...getParallaxStyle(0.5),
        }}
      >
        <Image
          src="/images/tree-shadow.jpg"
          alt=""
          fill
          className="tree-shadow-image"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>

      {/* Light dappled layer - fastest movement */}
      <div
        className="tree-shadow-layer tree-shadow-light"
        style={{
          opacity: opacity.light,
          ...getParallaxStyle(0.7),
        }}
      >
        <Image
          src="/images/tree-shadow.jpg"
          alt=""
          fill
          className="tree-shadow-image"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>

      <style jsx>{`
        .tree-shadow-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        .tree-shadow-layer {
          position: absolute;
          inset: -10%;
          width: 120%;
          height: 120%;
          will-change: transform;
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        :global(.tree-shadow-image) {
          object-fit: cover;
          object-position: center;
        }

        /* Deep shadow layer - multiply for dark shadows */
        .tree-shadow-deep :global(.tree-shadow-image) {
          mix-blend-mode: multiply;
          filter: blur(2px) contrast(1.3);
          animation: treeSway1 25s ease-in-out infinite;
        }

        /* Mid layer - overlay for balanced tones */
        .tree-shadow-mid :global(.tree-shadow-image) {
          mix-blend-mode: overlay;
          filter: blur(1px) contrast(1.1);
          animation: treeSway2 20s ease-in-out infinite;
          animation-delay: -5s;
        }

        /* Light layer - soft-light for gentle dappled effect */
        .tree-shadow-light :global(.tree-shadow-image) {
          mix-blend-mode: soft-light;
          filter: blur(3px) brightness(1.1);
          animation: treeSway3 30s ease-in-out infinite;
          animation-delay: -10s;
        }

        /* Organic swaying animation - layer 1 */
        @keyframes treeSway1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) rotateX(0deg) scale(1);
          }
          15% {
            transform: translate(-20px, 10px) rotate(-0.8deg) rotateX(0.5deg)
              scale(1.02);
          }
          35% {
            transform: translate(15px, -8px) rotate(0.6deg) rotateX(-0.4deg)
              scale(0.98);
          }
          50% {
            transform: translate(-10px, 12px) rotate(-0.5deg) rotateX(0.6deg)
              scale(1.01);
          }
          70% {
            transform: translate(22px, -15px) rotate(0.9deg) rotateX(-0.5deg)
              scale(1.02);
          }
          85% {
            transform: translate(-12px, 5px) rotate(-0.4deg) rotateX(0.3deg)
              scale(0.99);
          }
        }

        /* Organic swaying animation - layer 2 */
        @keyframes treeSway2 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) rotateX(0deg)
              rotateY(0deg) scale(1);
          }
          20% {
            transform: translate(18px, -12px) rotate(0.7deg) rotateX(-0.45deg)
              rotateY(0.3deg) scale(1.02);
          }
          40% {
            transform: translate(-22px, 15px) rotate(-0.8deg) rotateX(0.55deg)
              rotateY(-0.35deg) scale(0.98);
          }
          55% {
            transform: translate(12px, -10px) rotate(0.5deg) rotateX(-0.35deg)
              rotateY(0.25deg) scale(1.015);
          }
          75% {
            transform: translate(-15px, 18px) rotate(-0.6deg) rotateX(0.48deg)
              rotateY(-0.28deg) scale(0.99);
          }
          90% {
            transform: translate(20px, -8px) rotate(0.55deg) rotateX(-0.4deg)
              rotateY(0.32deg) scale(1.01);
          }
        }

        /* Organic swaying animation - layer 3 */
        @keyframes treeSway3 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) rotateX(0deg)
              rotateY(0deg) scale(1);
          }
          12% {
            transform: translate(-18px, 12px) rotate(-0.65deg) rotateX(0.42deg)
              rotateY(-0.38deg) scale(1.03);
          }
          28% {
            transform: translate(25px, -18px) rotate(0.85deg) rotateX(-0.52deg)
              rotateY(0.45deg) scale(0.97);
          }
          45% {
            transform: translate(-15px, 10px) rotate(-0.48deg) rotateX(0.32deg)
              rotateY(-0.3deg) scale(1.018);
          }
          62% {
            transform: translate(20px, -15px) rotate(0.72deg) rotateX(-0.48deg)
              rotateY(0.35deg) scale(0.985);
          }
          80% {
            transform: translate(-22px, 20px) rotate(-0.78deg) rotateX(0.58deg)
              rotateY(-0.42deg) scale(1.022);
          }
          95% {
            transform: translate(12px, -10px) rotate(0.4deg) rotateX(-0.3deg)
              rotateY(0.25deg) scale(0.995);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .tree-shadow-layer {
            inset: -5%;
            width: 110%;
            height: 110%;
          }

          .tree-shadow-deep :global(.tree-shadow-image) {
            animation: treeSwayMobile1 18s ease-in-out infinite;
          }

          .tree-shadow-mid :global(.tree-shadow-image) {
            animation: treeSwayMobile2 15s ease-in-out infinite;
          }

          .tree-shadow-light :global(.tree-shadow-image) {
            animation: treeSwayMobile3 22s ease-in-out infinite;
          }

          @keyframes treeSwayMobile1 {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg) scale(1);
            }
            25% {
              transform: translate(-10px, 5px) rotate(-0.5deg) scale(1.015);
            }
            50% {
              transform: translate(8px, -5px) rotate(0.4deg) scale(0.99);
            }
            75% {
              transform: translate(-8px, 8px) rotate(-0.45deg) scale(1.008);
            }
          }

          @keyframes treeSwayMobile2 {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg) scale(1);
            }
            30% {
              transform: translate(10px, -8px) rotate(0.45deg) scale(1.01);
            }
            60% {
              transform: translate(-12px, 10px) rotate(-0.55deg) scale(0.99);
            }
            85% {
              transform: translate(8px, -5px) rotate(0.35deg) scale(1.005);
            }
          }

          @keyframes treeSwayMobile3 {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg) scale(1);
            }
            20% {
              transform: translate(-10px, 8px) rotate(-0.4deg) scale(1.015);
            }
            55% {
              transform: translate(12px, -10px) rotate(0.5deg) scale(0.985);
            }
            90% {
              transform: translate(-8px, 5px) rotate(-0.3deg) scale(1.008);
            }
          }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .tree-shadow-layer {
            transition: none;
          }

          .tree-shadow-deep :global(.tree-shadow-image),
          .tree-shadow-mid :global(.tree-shadow-image),
          .tree-shadow-light :global(.tree-shadow-image) {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
