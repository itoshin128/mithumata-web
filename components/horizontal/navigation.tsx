'use client'

import { motion } from 'framer-motion'
import { Mountain } from 'lucide-react'

interface NavigationProps {
  totalSections: number
  currentSection: number
  onNavigate: (index: number) => void
  sectionNames: string[]
}

export function Navigation({ totalSections, currentSection, onNavigate, sectionNames }: NavigationProps) {
  // 稜線上の各ポイントの位置（Y座標）
  const ridgePoints = [
    { y: 380, name: 'ホーム', elevation: '' },
    { y: 320, name: '物語の始まり', elevation: '' },
    { y: 220, name: '三俣山荘', elevation: '2,550m' },
    { y: 120, name: '水晶小屋', elevation: '2,986m' }, // 最高地点
    { y: 240, name: '湯俣山荘', elevation: '1,580m' },
    { y: 300, name: '体験', elevation: '' },
    { y: 340, name: '最新情報', elevation: '' },
    { y: 380, name: 'お問い合わせ', elevation: '' },
  ]

  // 現在位置のY座標（補間）
  const currentY = ridgePoints[currentSection]?.y || 380

  return (
    <>
      {/* デスクトップ版 - 稜線型ナビゲーション */}
      <div className="hidden md:block fixed right-8 top-1/2 -translate-y-1/2 z-50">
        {/* 目次ラベル */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-stone-200/50">
          <span className="text-[10px] font-serif text-stone-600 tracking-[0.15em] font-medium">
            目次
          </span>
        </div>

        {/* 現在のセクション名 */}
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 -translate-x-full pr-4"
          style={{ top: `${currentY}px`, transform: 'translate(-100%, -50%)' }}
        >
          <div className="px-3 py-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-stone-200/50 min-w-[120px]">
            <div className="text-xs font-serif text-stone-800 tracking-[0.08em] whitespace-nowrap">
              {ridgePoints[currentSection]?.name || ''}
            </div>
            {ridgePoints[currentSection]?.elevation && (
              <div className="text-[10px] text-stone-500 mt-0.5 flex items-center gap-1">
                <Mountain className="w-3 h-3" />
                {ridgePoints[currentSection].elevation}
              </div>
            )}
          </div>
        </motion.div>

        <svg className="w-24 h-96" viewBox="0 0 100 400" preserveAspectRatio="none">
          <defs>
            {/* 山小屋アイコンの光エフェクト */}
            <radialGradient id="lodgeGlow">
              <stop offset="0%" stopColor="rgba(255, 200, 100, 0.8)" />
              <stop offset="100%" stopColor="rgba(255, 200, 100, 0)" />
            </radialGradient>
          </defs>

          {/* 稜線パス（背景） */}
          <path
            d="M 50,380 Q 50,340 50,320 T 50,220 Q 50,150 50,120 Q 50,170 50,240 T 50,340 L 50,380"
            stroke="rgba(200, 200, 200, 0.3)"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />

          {/* 進捗ライン（現在位置まで） */}
          <motion.path
            d={`M 50,380 L 50,${currentY}`}
            stroke="rgba(100, 100, 100, 0.5)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />

          {/* 登山者アイコン（現在位置） */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ y: currentY }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <circle cx="50" cy="0" r="6" fill="orange" opacity="0.9" />
            <circle cx="50" cy="0" r="12" fill="url(#lodgeGlow)">
              <animate
                attributeName="r"
                values="12;16;12"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </motion.g>

          {/* 山小屋マーカー */}
          {ridgePoints.map((point, index) => {
            const isActive = currentSection === index
            const isMountain = point.elevation !== '' // 山荘かどうか

            return (
              <g key={index} className="cursor-pointer" onClick={() => onNavigate(index)}>
                {isMountain ? (
                  // 山荘セクション: 山小屋アイコン
                  <>
                    <motion.path
                      d={`M 45,${point.y - 5} L 50,${point.y - 10} L 55,${point.y - 5} L 55,${point.y} L 45,${point.y} Z`}
                      fill={isActive ? 'rgba(100, 100, 100, 0.9)' : 'rgba(150, 150, 150, 0.6)'}
                      stroke="rgba(80, 80, 80, 0.8)"
                      strokeWidth="0.5"
                      whileHover={{ scale: 1.2, fill: 'rgba(80, 80, 80, 1)' }}
                      transition={{ duration: 0.2 }}
                    />
                    {isActive && (
                      <circle
                        cx="50"
                        cy={point.y - 7}
                        r="8"
                        fill="url(#lodgeGlow)"
                        opacity="0.6"
                      >
                        <animate
                          attributeName="r"
                          values="8;12;8"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </>
                ) : (
                  // その他のセクション: 小さなドット
                  <motion.circle
                    cx="50"
                    cy={point.y}
                    r={isActive ? 4 : 3}
                    fill={isActive ? 'rgba(100, 100, 100, 0.9)' : 'rgba(150, 150, 150, 0.5)'}
                    whileHover={{ r: 5, fill: 'rgba(80, 80, 80, 1)' }}
                    transition={{ duration: 0.2 }}
                  />
                )}

                {/* ホバー時のラベル */}
                <motion.g
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <foreignObject x="-180" y={point.y - 25} width="160" height="50">
                    <div className="flex flex-col items-end gap-1 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-md shadow-lg border border-gray-200">
                      <span className="text-xs font-serif tracking-wider text-gray-800 whitespace-nowrap">
                        {point.name}
                      </span>
                      {point.elevation && (
                        <span className="text-[10px] font-serif text-gray-500 flex items-center gap-1">
                          <Mountain className="w-3 h-3" />
                          {point.elevation}
                        </span>
                      )}
                    </div>
                  </foreignObject>
                </motion.g>
              </g>
            )
          })}
        </svg>
      </div>

      {/* モバイル版 - 下部のドットナビゲーション */}
      <div className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-3 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200">
        {Array.from({ length: totalSections }).map((_, index) => {
          const isActive = currentSection === index
          return (
            <motion.button
              key={index}
              onClick={() => onNavigate(index)}
              className="relative"
              whileTap={{ scale: 0.8 }}
            >
              <motion.div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-gray-900' : 'bg-gray-300'
                }`}
                animate={{
                  scale: isActive ? 1.3 : 1,
                }}
              />
            </motion.button>
          )
        })}
      </div>
    </>
  )
}
