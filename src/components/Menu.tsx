import React from "react";
import { FloatingDock, type DockItem } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { FcHome, FcTemplate, FcTimeline } from "react-icons/fc";
import github from "../assets/github.png";

export function Menu() {
  const links: DockItem[] = [
    {
      title: "Home",
      icon: (
        <FcHome className="h-full w-full text-neutral-700 dark:text-neutral-200" />
      ),
      href: "/",
    },
    {
      title: "Timeline",
      icon: (
        <FcTimeline className="h-full w-full text-neutral-700 dark:text-neutral-200" />
      ),
      href: "#",
    },
    {
      title: "Projects",
      icon: (
        <FcTemplate className="h-full w-full text-neutral-700 dark:text-neutral-200" />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-700 dark:text-neutral-200" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: <img src="github.png" width={30} height={30} alt="Github" />,
      href: "https://github.com/brutalvik",
      external: true, // opens in new tab
    },
  ];

  return (
    <div
      className="
        fixed z-50
        bottom-6 right-6
        md:bottom-6 md:left-1/2
        md:-translate-x-1/2 md:right-auto
        pointer-events-auto
      "
      style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <FloatingDock
        items={links}
        mobileClassName=""
        desktopClassName="shadow-lg"
      />
    </div>
  );
}
