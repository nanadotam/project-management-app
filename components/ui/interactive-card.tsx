"use client"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { MouseEvent } from "react"
import { cn } from "@/lib/utils"

interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  enableHover?: boolean
}

export function InteractiveCard({ 
  children, 
  className,
  enableHover = true,
  ...props 
}: InteractiveCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      className={cn(
        "group relative rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-200",
        enableHover && "hover:shadow-md",
        className
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {enableHover && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                rgba(var(--primary-rgb), 0.1),
                transparent 80%
              )
            `,
          }}
        />
      )}
      {children}
    </motion.div>
  )
} 