import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Main = forwardRef(({ className, fixed, fluid, ...props }, ref) => {
    return (
        <main
            ref={ref}
            data-layout={fixed ? 'fixed' : 'auto'}
            className={cn(
                'px-4 py-6',
                fixed && 'flex grow flex-col overflow-hidden',
                !fluid && '@7xl/content:mx-auto @7xl/content:w-full @7xl/content:max-w-7xl',
                className
            )}
            {...props}
        />
    );
});

Main.displayName = 'Main';
