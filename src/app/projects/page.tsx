export default function ProjectsIndexPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Projects</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Select a project from the left to view details and a live preview.
      </p>

      {/* Placeholder grid, like your skeletons */}
      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2"></div>
    </div>
  );
}
