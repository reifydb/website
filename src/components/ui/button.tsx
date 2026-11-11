import type { ReactNode, MouseEventHandler, ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'demo'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  children: ReactNode
}

const variantStyles = {
  primary: cn(
    'bg-[#4b52d6] text-white border border-[#4b52d6]',
    'hover:bg-primary-dark hover:border-primary-dark'
  ),
  secondary: cn(
    'bg-white border border-text-primary text-text-primary',
    'hover:bg-bg-tertiary'
  ),
  demo: cn(
    'bg-[#eef0fd] border border-[#7e85f2] text-[#2a2f8f]',
    'hover:bg-primary hover:border-primary hover:text-white'
  ),
  ghost: cn(
    'text-text-secondary',
    'underline underline-offset-4 decoration-text-muted',
    'hover:text-primary hover:decoration-primary',
    'active:opacity-80'
  ),
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-[13px]',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-[18px] py-2.5 text-[15px]',
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
    'group inline-flex items-center justify-center gap-2 rounded-none',
    'font-display font-semibold uppercase tracking-[0.06em] transition-colors duration-150',
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
        <Link to={href} className={baseStyles} onClick={onClick as unknown as MouseEventHandler<HTMLAnchorElement>}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} className={baseStyles} target="_blank" rel="noopener noreferrer" onClick={onClick as unknown as MouseEventHandler<HTMLAnchorElement>}>
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
