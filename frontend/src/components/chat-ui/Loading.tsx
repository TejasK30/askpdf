import React from "react"

export type LoadingProps = {
  label?: string
  size?: "sm" | "md" | "lg"
  className?: string
  ariaLive?: "off" | "polite" | "assertive"
}

const sizeMap = {
  sm: {
    text: "text-sm",
    dot: "w-1.5 h-1.5",
    gap: "gap-1.5",
  },
  md: {
    text: "text-base",
    dot: "w-2 h-2",
    gap: "gap-2",
  },
  lg: {
    text: "text-xl",
    dot: "w-2.5 h-2.5",
    gap: "gap-2.5",
  },
}

/**
 * LoadingDots — "Loading" text with three bouncing dots.
 * - TailwindCSS animate-bounce with staggered delays using arbitrary values.
 * - Inherits color via text-current; wrap with text-* utilities to recolor.
 * - Respects reduced motion (motion-safe).
 */
export default function Loading({
  label = "Loading",
  size = "md",
  className = "",
  ariaLive = "polite",
}: LoadingProps) {
  const sz = sizeMap[size]

  return (
    <div
      className={`inline-flex items-center ${sz.gap} ${sz.text} text-current ${className}`}
      role="status"
      aria-live={ariaLive}
      aria-label={`${label}…`}
    >
      <span>{label}</span>
      <span
        className={`ml-1 inline-block ${sz.dot} rounded-full bg-current motion-safe:animate-bounce`}
        style={{ animationDelay: "0ms" }}
      />
      <span
        className={`ml-1 inline-block ${sz.dot} rounded-full bg-current motion-safe:animate-bounce`}
        style={{ animationDelay: "200ms" }}
      />
      <span
        className={`ml-1 inline-block ${sz.dot} rounded-full bg-current motion-safe:animate-bounce`}
        style={{ animationDelay: "400ms" }}
      />
    </div>
  )
}
