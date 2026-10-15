import { useEffect, useState } from 'react'

interface VisualViewportInsets {
  top: number
  height: number
}

const VIEWPORT_HEIGHT_EPSILON = 1

function getVisualViewportInsets(): VisualViewportInsets | null {
  if (typeof window === 'undefined') return null

  const viewport = window.visualViewport
  if (!viewport) return null
  if (
    viewport.offsetTop === 0 &&
    Math.abs(viewport.height - window.innerHeight) < VIEWPORT_HEIGHT_EPSILON
  ) {
    return null
  }

  return { top: viewport.offsetTop, height: viewport.height }
}

export function useVisualViewportInsets(): VisualViewportInsets | null {
  const [insets, setInsets] = useState(getVisualViewportInsets)

  useEffect(() => {
    const viewport = window.visualViewport
    if (!viewport) return

    const handleChange = () => {
      setInsets(getVisualViewportInsets())
    }
    viewport.addEventListener('resize', handleChange)
    viewport.addEventListener('scroll', handleChange)
    return () => {
      viewport.removeEventListener('resize', handleChange)
      viewport.removeEventListener('scroll', handleChange)
    }
  }, [])

  return insets
}
