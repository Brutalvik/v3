import ProjectsShell from "@/app/projects/ProjectShell";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Shell is client; this layout can be server and just renders the shell
  return <ProjectsShell>{children}</ProjectsShell>;
}
