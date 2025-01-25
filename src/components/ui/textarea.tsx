import * as React from 'react';

    import { cn } from '@/lib/utils';

    export interface TextareaProps
      extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

    const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
      ({ className, ...props }, ref) => {
        return (
          <textarea
            className={cn(
              'flex min-h-[60px] w-full rounded-md border border-gold-500/20 bg-black-900 px-3 py-2 text-sm text-black shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            ref={ref}
            {...props}
          />
        );
      }
    );
    Textarea.displayName = 'Textarea';

    export { Textarea };
