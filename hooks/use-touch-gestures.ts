import { useState, useEffect } from 'react'

interface TouchPosition {
  x: number
  y: number
}

export function useTouchGestures(ref: React.RefObject<HTMLElement>) {
  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null)
  const [touchEnd, setTouchEnd] = useState<TouchPosition | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY)

    if (isHorizontalSwipe && Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > 0) {
        // Swiped left
        return 'left'
      } else {
        // Swiped right
        return 'right'
      }
    }
  }

  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.addEventListener('touchstart', onTouchStart)
    element.addEventListener('touchmove', onTouchMove)
    element.addEventListener('touchend', onTouchEnd)

    return () => {
      element.removeEventListener('touchstart', onTouchStart)
      element.removeEventListener('touchmove', onTouchMove)
      element.removeEventListener('touchend', onTouchEnd)
    }
  }, [ref])

  return { touchStart, touchEnd, onTouchEnd }
} 