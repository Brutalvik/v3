"use client";

import { cn } from "@/lib/utils";

export function DeviceFrame({
  children,
  className,
  title = "Preview",
}: {
  children?: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <div className={cn("flex w-full justify-center", className)}>
      <div
        className={cn(
          "relative rounded-[2.5rem] border border-black/10 bg-black/50 p-2 shadow-2xl",
          "dark:border-white/10 dark:bg-white/5",
          "backdrop-blur-md"
        )}
        aria-label={`${title} (virtual phone)`}
      >
        {/* Notch / status bar */}
        <div className="mx-auto mb-2 h-5 w-40 rounded-b-2xl bg-black/70 dark:bg-white/20" />
        {/* Viewport 390×844 (iPhone 15-ish) */}
        <div
          className={cn(
            "h-[844px] w-[390px] overflow-hidden rounded-[2rem] bg-white shadow-inner",
            "dark:bg-neutral-950"
          )}
        >
          {children ?? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-neutral-500">
                Demo coming soon. Open full app to view.
              </p>
            </div>
          )}
        </div>
        {/* Home indicator */}
        <div className="mx-auto mt-2 h-1.5 w-24 rounded-full bg-black/70 dark:bg-white/20" />
      </div>
    </div>
  );
}
