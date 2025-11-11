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

  // Intensity settings - opacity for each layer - さらに控えめに調整
  const opacityLevels = {
    subtle: { deep: 0.022, mid: 0.016, light: 0.011 },
    medium: { deep: 0.05, mid: 0.035, light: 0.025 },
    strong: { deep: 0.08, mid: 0.055, light: 0.04 },
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
          z-index: -1;
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
          filter: blur(4px) contrast(1.2) brightness(0.9);
          animation: treeSway1 45s ease-in-out infinite;
        }

        /* Mid layer - soft-light for balanced tones */
        .tree-shadow-mid :global(.tree-shadow-image) {
          mix-blend-mode: soft-light;
          filter: blur(3px) contrast(1.1) brightness(0.95);
          animation: treeSway2 38s ease-in-out infinite;
          animation-delay: -8s;
        }

        /* Light layer - soft-light for gentle dappled effect */
        .tree-shadow-light :global(.tree-shadow-image) {
          mix-blend-mode: soft-light;
          filter: blur(5px) brightness(1.02) saturate(0.9);
          animation: treeSway3 52s ease-in-out infinite;
          animation-delay: -15s;
        }

        /* Organic swaying animation - layer 1 */
        @keyframes treeSway1 {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) rotateX(0deg) scale(1);
          }
          15% {
            transform: translate(-8px, 4px) rotate(-0.3deg) rotateX(0.2deg)
              scale(1.01);
          }
          35% {
            transform: translate(6px, -3px) rotate(0.25deg) rotateX(-0.15deg)
              scale(0.99);
          }
          50% {
            transform: translate(-4px, 5px) rotate(-0.2deg) rotateX(0.25deg)
              scale(1.005);
          }
          70% {
            transform: translate(9px, -6px) rotate(0.35deg) rotateX(-0.2deg)
              scale(1.01);
          }
          85% {
            transform: translate(-5px, 2px) rotate(-0.15deg) rotateX(0.1deg)
              scale(0.995);
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
            transform: translate(7px, -5px) rotate(0.28deg) rotateX(-0.18deg)
              rotateY(0.1deg) scale(1.008);
          }
          40% {
            transform: translate(-9px, 6px) rotate(-0.32deg) rotateX(0.22deg)
              rotateY(-0.12deg) scale(0.992);
          }
          55% {
            transform: translate(5px, -4px) rotate(0.18deg) rotateX(-0.14deg)
              rotateY(0.08deg) scale(1.006);
          }
          75% {
            transform: translate(-6px, 7px) rotate(-0.25deg) rotateX(0.19deg)
              rotateY(-0.09deg) scale(0.997);
          }
          90% {
            transform: translate(8px, -3px) rotate(0.22deg) rotateX(-0.16deg)
              rotateY(0.11deg) scale(1.004);
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
            transform: translate(-7px, 5px) rotate(-0.26deg) rotateX(0.17deg)
              rotateY(-0.13deg) scale(1.012);
          }
          28% {
            transform: translate(10px, -7px) rotate(0.34deg) rotateX(-0.21deg)
              rotateY(0.15deg) scale(0.988);
          }
          45% {
            transform: translate(-6px, 4px) rotate(-0.19deg) rotateX(0.13deg)
              rotateY(-0.1deg) scale(1.007);
          }
          62% {
            transform: translate(8px, -6px) rotate(0.29deg) rotateX(-0.19deg)
              rotateY(0.12deg) scale(0.993);
          }
          80% {
            transform: translate(-9px, 8px) rotate(-0.31deg) rotateX(0.23deg)
              rotateY(-0.14deg) scale(1.009);
          }
          95% {
            transform: translate(5px, -4px) rotate(0.16deg) rotateX(-0.12deg)
              rotateY(0.08deg) scale(0.998);
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
            animation: treeSwayMobile1 35s ease-in-out infinite;
          }

          .tree-shadow-mid :global(.tree-shadow-image) {
            animation: treeSwayMobile2 30s ease-in-out infinite;
          }

          .tree-shadow-light :global(.tree-shadow-image) {
            animation: treeSwayMobile3 40s ease-in-out infinite;
          }

          @keyframes treeSwayMobile1 {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg) scale(1);
            }
            25% {
              transform: translate(-4px, 2px) rotate(-0.2deg) scale(1.005);
            }
            50% {
              transform: translate(3px, -2px) rotate(0.15deg) scale(0.995);
            }
            75% {
              transform: translate(-3px, 3px) rotate(-0.18deg) scale(1.003);
            }
          }

          @keyframes treeSwayMobile2 {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg) scale(1);
            }
            30% {
              transform: translate(4px, -3px) rotate(0.18deg) scale(1.004);
            }
            60% {
              transform: translate(-5px, 4px) rotate(-0.22deg) scale(0.996);
            }
            85% {
              transform: translate(3px, -2px) rotate(0.14deg) scale(1.002);
            }
          }

          @keyframes treeSwayMobile3 {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg) scale(1);
            }
            20% {
              transform: translate(-4px, 3px) rotate(-0.16deg) scale(1.006);
            }
            55% {
              transform: translate(5px, -4px) rotate(0.2deg) scale(0.994);
            }
            90% {
              transform: translate(-3px, 2px) rotate(-0.12deg) scale(1.003);
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
