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
    'bg-primary text-[#1a1a1a]',
    'hover:bg-primary-light',
    'transition-all duration-200'
  ),
  secondary: cn(
    'bg-transparent border border-border-default text-text-secondary',
    'hover:border-primary hover:text-primary',
    'transition-all duration-200'
  ),
  ghost: cn(
    'text-text-secondary',
    'underline underline-offset-4 decoration-text-muted',
    'hover:text-text-primary hover:decoration-primary',
    'active:opacity-80'
  ),
}

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2',
    'font-medium tracking-wide rounded-md transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-primary',
    'disabled:opacity-30 disabled:cursor-not-allowed',
    variantStyles[variant],
    sizeStyles[size],
    className
  )

  if (href) {
    // Use Link for internal routes, <a> for external
    if (href.startsWith('/')) {
      return (
        <Link to={href} className={baseStyles} onClick={onClick}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} className={baseStyles} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button className={baseStyles} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
