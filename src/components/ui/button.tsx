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
    'bg-accent-dark text-white font-semibold',
    'border-2 border-border-default shadow-minimal-md',
    'hover:bg-[#4a4a4a] hover:shadow-minimal-lg hover:translate-x-[-1px] hover:translate-y-[-1px]',
    'active:shadow-minimal-sm active:translate-x-[1px] active:translate-y-[1px]'
  ),
  secondary: cn(
    'bg-white text-accent-dark font-semibold',
    'border-2 border-border-default shadow-minimal-md',
    'hover:shadow-minimal-lg hover:translate-x-[-1px] hover:translate-y-[-1px]',
    'active:shadow-minimal-sm active:translate-x-[1px] active:translate-y-[1px]'
  ),
  ghost: cn(
    'text-text-secondary',
    'hover:text-accent-dark',
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
    'rounded-md font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-bg-primary',
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
