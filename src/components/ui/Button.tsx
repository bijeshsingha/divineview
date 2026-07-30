import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    
    // Base styles applied to all buttons
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    
    // Variant styles
    const variants = {
      primary: "bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md",
      secondary: "bg-secondary text-white hover:bg-secondary-dark shadow-sm hover:shadow-md",
      outline: "border border-gray-200 text-gray-700 hover:bg-gray-50",
      ghost: "text-secondary hover:text-primary-dark hover:underline decoration-2 underline-offset-4"
    };

    // Size styles
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-2.5 text-base",
      lg: "px-8 py-3.5 text-lg font-semibold"
    };

    // Width
    const widthClass = fullWidth ? 'w-full' : '';

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

    if (props.href) {
      return (
        <Link href={props.href} className={classes.trim()}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes.trim()} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
