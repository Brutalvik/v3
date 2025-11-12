// app/page.tsx
"use client";

import Link from "next/link";
import { FlipWords } from "@/components/ui/flip-words";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export default function HomePage() {
  const words = [
    "Software Engineer",
    "Cloud Computing Expert",
    "Full-Stack Developer",
    "React & Angular Specialist",
    "Node & NestJS Architect",
    "AWS & Azure Engineer",
    "Microservices Designer",
    "Serverless Solutions Expert",
    "API & Integration Specialist",
    "Enterprise Application Developer",
    "Scalable Systems Engineer",
  ];

  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen text-foreground flex flex-col cursor-pointer">
      {/* 🧊 Glassy top bar */}
      <header className="w-full px-6 py-4.5 flex items-center justify-between border-b border-white/10 dark:border-white/5 bg/40 dark:bg/10 backdrop-blur-2xl supports-[backdrop-filter]:bg/30 shadow-sm shadow-black/10">
        <span className="text-sm font-mono tracking-tight">V-Bytes</span>
      </header>

      {/* Centered hero */}
      <section className="flex-1 flex items-center justify-center px-6">
        <BackgroundRippleEffect />
        <div className="max-w-xl w-full relative">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            <FlipWords words={words} />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Vikram Kumar
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8">
            Senior Full-Stack Developer crafting scalable web applications with{" "}
            <span className="font-medium">React, Angular, Node, NestJS</span>{" "}
            and cloud platforms like <span className="font-medium">AWS</span>{" "}
            and <span className="font-medium">Azure</span>. I build clean,
            reliable, and maintainable systems end to end.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Link
              href="#work"
              className="text-xs sm:text-sm px-4 py-2 rounded-full border border-foreground/20 hover:border-foreground/60 hover:bg-foreground/5 transition"
            >
              Download Resume
            </Link>
            <Link
              href="#contact"
              className="text-xs sm:text-sm px-4 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition"
            >
              Get in touch
            </Link>
          </div>

          {/* Tech summary – still minimal */}
          <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs text-muted-foreground">
            <span className="px-3 py-1 rounded-full border border-border">
              React &amp; Angular
            </span>
            <span className="px-3 py-1 rounded-full border border-border">
              Node.js &amp; NestJS
            </span>
            <span className="px-3 py-1 rounded-full border border-border">
              AWS &amp; Azure
            </span>
            <span className="px-3 py-1 rounded-full border border-border">
              Microservices
            </span>
            <span className="px-3 py-1 rounded-full border border-border">
              Serverless
            </span>
          </div>
        </div>
      </section>

      {/* 🧊 Glassy footer */}
      <footer className="w-full px-6 py-4 text-[11px] sm:text-xs text-muted-foreground border-t border-white/10 dark:border-white/5 bg/40 dark:bg/10 backdrop-blur-2xl supports-[backdrop-filter]:bg/30 shadow-[0_-1px_8px_rgba(0,0,0,0.25)] flex justify-between items-center">
        <span>© {year} V-Bytes</span>
        <span>Calgary · AB · Canada</span>
      </footer>
    </main>
  );
}
