import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

const alertVariants = cva(
    'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-current',
    {
        variants: {
            variant: {
                default: 'bg-white text-gray-900 border-gray-200',
                success: 'bg-green-50 text-green-800 border-green-200',
                warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
                error: 'bg-red-50 text-red-800 border-red-200',
                info: 'bg-blue-50 text-blue-800 border-blue-200',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const iconMap = {
    success: CheckCircle,
    warning: AlertCircle,
    error: XCircle,
    info: Info,
};

function Alert({ className, variant, children, ...props }) {
    const Icon = iconMap[variant];

    return (
        <div role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
            {Icon && <Icon className="h-4 w-4" />}
            <div>{children}</div>
        </div>
    );
}

function AlertTitle({ className, ...props }) {
    return <h5 className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />;
}

function AlertDescription({ className, ...props }) {
    return <div className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />;
}

export { Alert, AlertTitle, AlertDescription };
