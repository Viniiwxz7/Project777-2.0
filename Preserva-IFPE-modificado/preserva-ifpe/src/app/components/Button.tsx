import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-[#0047AB] active:scale-[0.98] shadow-sm',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-[#0090D1] active:scale-[0.98] shadow-sm',
    outline: 'border-2 border-primary text-primary hover:bg-accent active:scale-[0.98]',
    danger: 'bg-destructive text-destructive-foreground hover:bg-red-600 active:scale-[0.98] shadow-sm',
    ghost: 'text-muted-foreground hover:bg-muted hover:text-foreground'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm h-9',
    md: 'px-4 py-2.5 h-11',
    lg: 'px-6 py-3 text-lg h-14'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
