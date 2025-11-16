'use client'

import { HorizontalScroll } from "@/components/horizontal/horizontal-scroll"
import { LoadingScreen } from "@/components/loading/loading-screen"

export default function HorizontalPage() {
  return (
    <>
      <LoadingScreen />
      <HorizontalScroll />
    </>
  )
}
