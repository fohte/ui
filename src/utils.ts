import { type ClassValue, clsx } from 'clsx'
import type { CSSProperties } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type ColorSwatchStyle = CSSProperties & {
  '--color-swatch': string
}

export function colorSwatchStyle(color: string): ColorSwatchStyle {
  return { '--color-swatch': color }
}
