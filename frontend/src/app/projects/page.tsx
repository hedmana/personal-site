export default async function ProjectsPage() {
  const res = await fetch("https://api.github.com/users/hedmana/repos", {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch GitHUb projects");
  }

  const projects = await res.json();

  const projectsToDisplay = [
    "blogs",
    "chess",
    "expenses-frontend",
    "neural_network",
    "personal-site",
    "python_tower_defense",
  ];

  const filteredProjects = projects.filter((project: any) =>
    projectsToDisplay.includes(project.name)
  );

  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-700">
        GitHub Projects
      </h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {filteredProjects.map((project: any) => (
          <div
            key={project.id}
            className="border p-4 rounded shadow hover:shadow-md hover:bg-white transition"
          >
            <h2 className="text-xl font-semibold text-gray-700">
              {project.name}
            </h2>
            <p className="mt-2 text-gray-700">
              {project.description || "No description available"}
            </p>
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-blue-500 hover:underline"
            >
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
