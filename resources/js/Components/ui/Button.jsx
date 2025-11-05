import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    {
        variants: {
            variant: {
                default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
                destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
                outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-blue-500',
                secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
                ghost: 'hover:bg-gray-100 text-gray-700',
                link: 'text-blue-600 underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 px-3 text-sm',
                lg: 'h-11 px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

const Button = forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
        <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
});
Button.displayName = 'Button';

export { Button, buttonVariants };
