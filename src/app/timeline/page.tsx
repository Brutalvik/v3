import React from "react";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import timelineData from "@/data/timelineData.json";

type TimelineJsonItem = {
  id: string;
  type: "experience" | "education";
  title: string;
  summary: string;
  bullets: string[];
  tags: {
    heading: string;
    text: string;
  }[];
};

export default function TimelinePage() {
  const typedData = timelineData as TimelineJsonItem[];

  const data: TimelineItem[] = typedData.map((item) => ({
    title: item.title,
    content: (
      <div>
        {/* Summary */}
        <p className="mb-4 text-xs font-normal text-neutral-200 md:text-sm">
          {item.summary}
        </p>

        {/* Bullets */}
        <ul className="mb-6 space-y-1.5 text-[11px] md:text-xs text-neutral-300">
          {item.bullets.map((bullet, idx) => (
            <li key={`${item.id}-bullet-${idx}`}>• {bullet}</li>
          ))}
        </ul>

        {/* Tags grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {item.tags.map((tag, idx) => (
            <div
              key={`${item.id}-tag-${idx}`}
              className="rounded-xl border border-neutral-800/80 bg-neutral-900/80 p-3 text-[10px] md:text-xs shadow-sm"
            >
              <p className="mb-0.5 font-semibold text-neutral-50">
                {tag.heading}
              </p>
              <p className="text-neutral-300">{tag.text}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-neutral-50">
      {/* glow at top */}
      <div className="pointer-events-none absolute inset-x-0 top-[-120px] mx-auto h-80 max-w-xl bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.4),_transparent_65%)]" />

      <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-24 pt-16 md:px-6 lg:px-0">
        <header className="max-w-3xl space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Timeline
          </h1>
          <p className="text-sm text-neutral-300 md:text-base">
            A high-level view of my journey building secure, cloud-native
            systems across React, Angular, Node.js, AWS and Azure — from large
            government platforms to GIS and event-driven architectures.
          </p>
        </header>

        <Timeline data={data} />
      </section>
    </main>
  );
}
