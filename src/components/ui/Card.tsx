import React, { HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', hoverEffect = false, children, ...props }, ref) => {
    const baseStyles = "bg-white border border-gray-100 rounded-2xl shadow-sm";
    const hoverStyles = hoverEffect ? "transition-all duration-300 hover:shadow-md hover:-translate-y-1" : "";
    
    const classes = `${baseStyles} ${hoverStyles} ${className}`;

    return (
      <div ref={ref} className={classes.trim()} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
