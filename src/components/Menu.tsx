import { FloatingDock, type DockItem } from "@/components/ui/floating-dock";
import { TbTimeline } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa6";

export function Menu() {
  const links: DockItem[] = [
    {
      title: "Home",
      icon: (
        <FaHome className="h-full w-full text-neutral-700 dark:text-neutral-200" />
      ),
      href: "/",
    },
    {
      title: "Timeline",
      icon: (
        <TbTimeline className="h-full w-full text-neutral-700 dark:text-neutral-200" />
      ),
      href: "/timeline",
    },
    {
      title: "Projects",
      icon: (
        <MdWorkHistory className="h-full w-full text-neutral-700 dark:text-neutral-200" />
      ),
      href: "/projects",
    },
    {
      title: "LinkedIn",
      icon: (
        <FaLinkedin className="h-full w-full text-neutral-700 dark:text-neutral-200" />
      ),
      href: "https://www.linkedin.com/in/vbytes/",
      external: true, // opens in new tab
    },
    {
      title: "GitHub",
      icon: (
        <FaGithub className="h-full w-full text-neutral-700 dark:text-neutral-200" />
      ),
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
