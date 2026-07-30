import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, fullWidth = true, ...props }, ref) => {
    const baseStyles = "w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent transition-all";
    const errorStyles = error 
      ? "border-red-300 focus:ring-red-200" 
      : "border-gray-200 focus:ring-primary/20 hover:border-gray-300";
    
    const widthClass = fullWidth ? 'w-full' : '';
    const classes = `${baseStyles} ${errorStyles} ${widthClass} ${className}`;

    return (
      <div className={`${widthClass} flex flex-col gap-1.5`}>
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input ref={ref} className={classes.trim()} {...props} />
        {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
