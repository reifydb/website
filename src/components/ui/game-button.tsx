import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib'

interface GameButtonProps {
  href: string
  size: 'sm' | 'lg'
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

export function GameButton({ href, size, variant = 'primary', children }: GameButtonProps) {
  const className = cn('game-button', size === 'sm' && 'game-button--sm', variant === 'secondary' && 'game-button--secondary')

  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
