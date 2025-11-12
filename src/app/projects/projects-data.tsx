import { IconLayoutKanban, IconNotebook, IconPlug } from "@tabler/icons-react";

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  demoUrl?: string; // for the phone frame later
  repoUrl?: string;
  tags: string[];
  icon?: React.ReactNode;
  status: "active" | "archived";
  lastUpdatedAt?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "v-bytes-tasks",
    title: "V-Bytes Tasks",
    shortDescription:
      "Advanced task tracker: Google/Facebook auth, offline-first, realtime, Kanban + Calendar.",
    demoUrl: "https://demo.v-bytes.cloud/tasks", // adjust/leave empty
    repoUrl: "https://github.com/brutalvik/v-bytes-tasks",
    tags: ["Next.js", "Auth.js", "Supabase Realtime", "PWA"],
    icon: <IconLayoutKanban className="h-4 w-4" />,
    status: "active",
    lastUpdatedAt: "2025-11-10",
  },
  {
    slug: "portfolio-v3",
    title: "Portfolio V3",
    shortDescription:
      "Next.js + shadcn/ui + glassy dock. Device-frame previews.",
    repoUrl: "https://github.com/brutalvik/portfolio-v3",
    tags: ["Next.js", "shadcn/ui", "Tailwind"],
    icon: <IconNotebook className="h-4 w-4" />,
    status: "active",
    lastUpdatedAt: "2025-11-11",
  },
  {
    slug: "swe-bench-aegis-1691",
    title: "SWE-Bench: Aegis 1691",
    shortDescription: "Automated test task; importer fixes and rubric design.",
    repoUrl: "https://github.com/Mercor-Intelligence/swe-bench-extended",
    tags: ["Java", "CI", "Testing"],
    icon: <IconPlug className="h-4 w-4" />,
    status: "archived",
    lastUpdatedAt: "2025-11-07",
  },
];
