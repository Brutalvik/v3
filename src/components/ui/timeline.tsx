"use client";

import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export type TimelineItem = {
  id?: string;
  title: string;
  content: React.ReactNode;
};

export const Timeline = ({ data }: { data: TimelineItem[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Measure the height of the timeline container for the animated line
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full dark:bg-neutral-950 font-sans" ref={containerRef}>
      {/* Timeline body */}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <motion.div
            key={item.id ?? item.title ?? index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Left side: sticky title & dot */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <motion.div
                  className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(59,130,246,0.4)",
                      "0 0 0 10px rgba(59,130,246,0)",
                    ],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
            </div>

            {/* Right side: content card */}
            <motion.div
              className="relative pl-20 pr-4 md:pl-4 w-full group cursor-pointer"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Mobile title */}
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>

              {/* Content card */}
              <div className="relative rounded-2xl border border-neutral-200/70 bg-white/80 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.15)] backdrop-blur-md dark:border-neutral-800/70 dark:bg-neutral-900/80 md:p-6">
                {/* subtle hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">{item.content}</div>
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Vertical animated line */}
        <div
          style={{
            height: `${height}px`,
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
