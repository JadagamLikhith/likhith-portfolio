import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface DeviceFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const DeviceFrame = React.forwardRef<HTMLDivElement, DeviceFrameProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative mx-auto w-full max-w-[320px] sm:max-w-[360px] rounded-[2.5rem] bg-[#0A0C14] p-3 border-[6px] border-[#1C1F2E] shadow-2xl shadow-brand-indigo/10",
          className
        )}
        {...props}
      >
        {/* Dynamic Island / Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#1C1F2E] rounded-full z-20 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-surface-1 ml-auto mr-2" />
        </div>

        {/* Screen Container */}
        <div className="relative w-full h-full min-h-[480px] sm:min-h-[540px] rounded-[2rem] bg-canvas overflow-hidden border border-border-ghost">
          {children}
        </div>

        {/* Bottom Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#1C1F2E] rounded-full" />
      </div>
    );
  }
);

DeviceFrame.displayName = "DeviceFrame";
