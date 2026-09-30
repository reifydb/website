import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib'

interface GameButtonProps {
  href: string
  size: 'sm' | 'lg'
  children: ReactNode
}

export function GameButton({ href, size, children }: GameButtonProps) {
  const className = cn('game-button', size === 'sm' && 'game-button--sm')

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
