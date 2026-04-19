'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-glow-blue to-glow-purple text-white shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)] hover:-translate-y-1 hover:scale-105 active:scale-95 after:shine',
        secondary:
          'glass hover:shadow-[0_6px_20px_rgba(255,255,255,0.2)] hover:-translate-y-1 hover:scale-105 active:scale-95',
        outline:
          'border-2 border-slate-700 bg-transparent text-slate-300 hover:border-glow-blue hover:text-white hover:bg-slate-800/50',
        ghost:
          'hover:bg-slate-800 hover:text-white text-slate-300',
        danger:
          'bg-red-600 text-white hover:bg-red-700 shadow-[0_4px_14px_0_rgba(220,38,38,0.39)]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
