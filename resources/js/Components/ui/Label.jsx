import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Label = forwardRef(({ className, required, ...props }, ref) => {
    return (
        <label
            ref={ref}
            className={cn('block text-sm font-medium text-gray-700 mb-2', className)}
            {...props}
        >
            {props.children}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    );
});
Label.displayName = 'Label';

export { Label };
