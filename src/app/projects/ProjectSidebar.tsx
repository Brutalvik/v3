"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROJECTS } from "./projects-data";
import { cn } from "@/lib/utils";

export function ProjectsSidebar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Projects" className="mt-6 flex flex-col gap-1">
      <SidebarSection label="Pinned" />
      {PROJECTS.filter((p) => p.status === "active").map((p) => (
        <SidebarRow
          key={p.slug}
          href={`/projects/${p.slug}`}
          label={p.title}
          icon={p.icon}
          active={pathname?.startsWith(`/projects/${p.slug}`)}
          meta={p.lastUpdatedAt ? `Updated ${p.lastUpdatedAt}` : undefined}
        />
      ))}

      <SidebarSection label="Archived" className="mt-6" />
      {PROJECTS.filter((p) => p.status === "archived").map((p) => (
        <SidebarRow
          key={p.slug}
          href={`/projects/${p.slug}`}
          label={p.title}
          icon={p.icon}
          active={pathname?.startsWith(`/projects/${p.slug}`)}
          dim
          meta="Archived"
        />
      ))}
    </nav>
  );
}

function SidebarSection({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "px-1 text-xs uppercase tracking-wide text-neutral-500",
        className
      )}
    >
      {label}
    </div>
  );
}

function SidebarRow({
  href,
  label,
  icon,
  active,
  meta,
  dim,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  meta?: string;
  dim?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex items-center justify-between gap-2 rounded-lg px-2 py-2",
        "transition-colors",
        active
          ? "bg-white text-black dark:bg-neutral-900 dark:text-white"
          : "text-neutral-700 hover:bg-white/60 dark:text-neutral-300 dark:hover:bg-white/10",
        dim && !active && "opacity-70"
      )}
    >
      <span className="flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center text-neutral-600 dark:text-neutral-200">
          {icon}
        </span>
        <span className="truncate">{label}</span>
      </span>
      {meta && (
        <span className="hidden text-xs text-neutral-500 md:block">{meta}</span>
      )}
    </Link>
  );
}
