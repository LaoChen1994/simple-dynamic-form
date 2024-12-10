import { cn } from '@/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground shadow hover:bg-primary/90',
                destructive:
                    'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
                outline:
                    'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
                secondary:
                    'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        const {
            className,
            variant,
            size,
            asChild = false,
            onClick,
            children,
            loading: controlledLoading,
            ...rest
        } = props;

        const [isLoading, setIsLoading] = React.useState(false);

        const handleClick = React.useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
            if (onClick) {
                const result = onClick(e);

                if (typeof result === 'object' && 'then' in result) {
                    setIsLoading(true);
                    try {
                        await result;
                    } finally {
                        setIsLoading(false);
                    }
                }
            }
        }, [onClick]);

        const mergedLoading = 'loading' in props ? controlledLoading : isLoading;

        const mergedClass = cn(buttonVariants({ variant, size, className }));

        if (asChild) {
            return (
                <Slot
                    className={mergedClass}
                    ref={ref}
                    onClick={onClick}
                    {...rest}
                >
                    {children}
                </Slot>
            );
        }

        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                onClick={handleClick}
                {...rest}
                disabled={mergedLoading || rest.disabled}
            >
                {
                    mergedLoading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : null
                }
                {(mergedLoading && size === 'icon') ? null : children}
            </button>
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
