import React, { ComponentProps } from "react";
import { VariantProps, cva } from "class-variance-authority";
import cs from "@/utils/cs";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors text-foreground",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        ghost: "hover:text-primary",
      },

      size: {
        large: "px-6 py-4 text-lg",
        default: "px-4 py-2",
        md: "px-3 py-2",
        sm: "px-2 py-1 text-xs",
        icon: "w-9 h-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={cs(
          buttonVariants({
            variant: props.variant,
            size: props.size,
            className,
          })
        )}
      />
    );
  }
);

export default Button;
