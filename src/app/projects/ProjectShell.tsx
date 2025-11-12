"use client";

import { useState } from "react";
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import { ProjectsSidebar } from "@/app/projects/ProjectSidebar";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function ProjectsShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "mx-auto flex h-screen w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-6">
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <ProjectsSidebar />
          </div>
          <FooterProfile />
        </SidebarBody>
      </Sidebar>

      {/* Right side content slot */}
      <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 bg-white p-4 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
          {children}
        </div>
      </div>
    </div>
  );
}

function FooterProfile() {
  return (
    <a
      href="https://github.com/brutalvik"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-neutral-700 hover:bg-white/60 dark:text-neutral-300 dark:hover:bg-white/10"
    >
      <img src="/boy.png" alt="Vikram Kumar" className="h-7 w-7 rounded-full" />
      <span className="truncate">Vikram Kumar</span>
    </a>
  );
}

function Logo() {
  return (
    <div className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre font-medium text-black dark:text-white"
      >
        V-Bytes
      </motion.span>
    </div>
  );
}

function LogoIcon() {
  return (
    <div className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </div>
  );
}
