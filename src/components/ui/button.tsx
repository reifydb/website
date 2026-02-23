import type { ReactNode, ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  children: ReactNode
}

const variantStyles = {
  primary: cn(
    'bg-primary text-bg-primary font-semibold',
    'hover:bg-primary-dark hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]',
    'transition-all duration-300'
  ),
  secondary: cn(
    'bg-bg-tertiary text-text-primary font-semibold',
    'border border-border-default',
    'hover:border-primary/50 hover:bg-bg-elevated',
    'active:bg-bg-secondary'
  ),
  ghost: cn(
    'text-text-secondary',
    'hover:text-text-primary hover:bg-bg-tertiary',
    'active:opacity-80'
  ),
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2',
    'rounded-lg font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-primary',
    variantStyles[variant],
    sizeStyles[size],
    className
  )

  if (href) {
    // Use Link for internal routes, <a> for external
    if (href.startsWith('/')) {
      return (
        <Link to={href} className={baseStyles}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} className={baseStyles} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button className={baseStyles} {...props}>
      {children}
    </button>
  )
}
