import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const ghostFieldClassName =
  '-mx-1 border-x-0 border-t-0 border-b border-transparent bg-transparent px-1 hover:bg-accent/50 data-[hovered]:bg-accent/50 focus:border-b-border-strong aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 focus:aria-invalid:border-b-destructive dark:focus:aria-invalid:border-b-destructive/50'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
