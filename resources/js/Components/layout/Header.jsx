import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/Components/ui/separator';
import { SidebarTrigger } from '@/Components/ui/sidebar';

export function Header({ className, fixed, children, ...props }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        if (fixed) {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [fixed]);

    return (
        <header
            className={cn(
                'sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 bg-background px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12',
                fixed && 'border-b',
                fixed && isScrolled && 'backdrop-blur-sm',
                className
            )}
            {...props}
        >
            {children || (
                <>
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                    </div>
                </>
            )}
        </header>
    );
}
