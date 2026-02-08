"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>

const Tooltip = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <div
            className="relative inline-block group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    // @ts-ignore
                    return React.cloneElement(child, { isOpen })
                }
                return child
            })}
        </div>
    )
}

const TooltipTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"
    return (
        // @ts-ignore
        <Comp ref={ref} className={className} {...props} />
    )
})
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { side?: "top" | "right" | "bottom" | "left", isOpen?: boolean }
>(({ className, side = "top", isOpen, ...props }, ref) => {
    // In a real implementation this would use context, but for this mock we rely on group-hover or passed props
    // We'll use CSS based group-[name] if possible, but the wrapper has 'group'.
    // Actually, simple CSS visibility is better for stability here.
    return (
        <div
            ref={ref}
            className={cn(
                "absolute z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                "invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200",
                side === "bottom" && "top-full mt-2 left-1/2 -translate-x-1/2",
                side === "top" && "bottom-full mb-2 left-1/2 -translate-x-1/2",
                side === "left" && "right-full mr-2 top-1/2 -translate-y-1/2",
                side === "right" && "left-full ml-2 top-1/2 -translate-y-1/2",
                "w-max max-w-[300px]",
                className
            )}
            {...props}
        />
    )
})
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
