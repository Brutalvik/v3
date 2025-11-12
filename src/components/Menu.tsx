import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";

export function Menu() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-700 dark:text-neutral-200" />
      ),
      href: "#",
    },
    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-700 dark:text-neutral-200" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-700 dark:text-neutral-200" />
      ),
      href: "#",
    },
    {
      title: "Aceternity UI",
      icon: (
        <img
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
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
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-700 dark:text-neutral-200" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-700 dark:text-neutral-200" />
      ),
      href: "#",
    },
  ];

  return (
    <div
      className="
        fixed z-50
        bottom-6 right-6                 /* mobile: bottom-right */
        md:bottom-6 md:left-1/2          /* md+: bottom-center */
        md:-translate-x-1/2 md:right-auto
        pointer-events-auto
      "
      style={{
        // keeps it above iOS home indicator
        marginBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <FloatingDock
        items={links}
        // optional: tweak spacing per viewport
        mobileClassName="" // your mobile FAB layout
        desktopClassName="shadow-lg" // any extra desktop styles
      />
    </div>
  );
}
