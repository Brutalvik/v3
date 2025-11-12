"use client";

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export type DockItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
  external?: boolean; // open in a new tab if true
};

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: DockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="dock-popout"
            layoutId="nav"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => {
              const isExternal =
                item.external ?? /^https?:\/\//i.test(item.href);
              return (
                <motion.div
                  key={`${item.href}-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    transition: { delay: idx * 0.05 },
                  }}
                  transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                >
                  <a
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      "bg-white/20 dark:bg-white/10 backdrop-blur-md",
                      "border border-white/30 dark:border-white/10",
                      "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_20px_rgba(0,0,0,0.18)]",
                      "[will-change:width,height]"
                    )}
                  >
                    <div className="h-4 w-4 [will-change:width,height]">
                      {item.icon}
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full",
          "bg-white/20 dark:bg-white/10 backdrop-blur-xl",
          "border border-white/30 dark:border-white/10",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_24px_rgba(0,0,0,0.2)]"
        )}
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: DockItem[];
  className?: string;
}) => {
  // Keep original behavior: track pageX and reset to Infinity on leave
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      initial={false}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "relative mx-auto hidden h-16 items-end gap-4 rounded-2xl px-4 pb-3 md:flex",
        "bg-white/10 dark:bg-white/5 backdrop-blur-xl",
        "ring-1 ring-white/20 dark:ring-white/10",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_30px_rgba(0,0,0,0.2)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl [mask-image:linear-gradient(to_bottom,black,transparent_60%)]">
        <div className="h-1/2 rounded-t-2xl bg-white/20 dark:bg-white/10" />
      </div>

      {items.map((item, idx) => (
        <IconContainer mouseX={mouseX} key={`${item.href}-${idx}`} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  external,
}: {
  mouseX: MotionValue<number>;
  title: string;
  icon: React.ReactNode;
  href: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Same distance calc (center of bubble)
  const distance = useTransform(mouseX, (val) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - (b.x + b.width / 2);
  });

  // Keep original mapping ranges & sizes
  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  // 🚀 SNAPPY SPRINGS — only change
  // - Very low mass + very high stiffness → reacts immediately
  // - Slightly lower damping to prevent “sticky” feeling
  // - Aggressive rest thresholds to stop computing ASAP
  const springCfg = {
    mass: 0.045,
    stiffness: 1600,
    damping: 22,
    restDelta: 0.0005,
    restSpeed: 120,
  };

  const width = useSpring(widthTransform, springCfg);
  const height = useSpring(heightTransform, springCfg);
  const widthIcon = useSpring(widthTransformIcon, springCfg);
  const heightIcon = useSpring(heightTransformIcon, springCfg);

  const [hovered, setHovered] = useState(false);
  const isExternal = external ?? /^https?:\/\//i.test(href);

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <motion.div
        ref={ref}
        style={{ width, height }} // ← still animating size (behavior unchanged)
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative flex aspect-square items-center justify-center rounded-full",
          "bg-white/20 dark:bg-white/10 backdrop-blur-md",
          "border border-white/30 dark:border-white/10",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_20px_rgba(0,0,0,0.18)]",
          "[will-change:width,height]" // hint layout changes
        )}
      >
        <AnimatePresence initial={false}>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className={cn(
                "absolute -top-8 left-1/2 w-fit whitespace-pre rounded-md px-2 py-0.5 text-xs",
                "bg-white/20 dark:bg-white/10 backdrop-blur-md",
                "border border-white/30 dark:border-white/10",
                "text-neutral-800 dark:text-white"
              )}
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          style={{ width: widthIcon, height: heightIcon }} // icon size follows bubble
          className="flex items-center justify-center [will-change:width,height]"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
