import React, { HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'neutral' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ 
  className = '', 
  variant = 'neutral', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider";
  
  const variants = {
    primary: "bg-primary/10 text-primary-dark",
    secondary: "bg-secondary/10 text-secondary-dark",
    neutral: "bg-gray-100 text-gray-700",
    outline: "border border-gray-200 text-gray-600 bg-transparent"
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <span className={classes.trim()} {...props}>
      {children}
    </span>
  );
};
