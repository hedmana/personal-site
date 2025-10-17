import ProjectGrid from "@/components/ProjectGrid";
import { Project } from "@/types";

// Only show selected repos
const PROJECTS_TO_DISPLAY = [
  "chess",
  "leetcode",
  "mnist-neural-network",
  "personal-site",
  "pygame-tower-defense",
];

export default async function ProjectsPage() {
  const res = await fetch("https://api.github.com/users/hedmana/repos", {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub projects");
  }

  const projects: Project[] = await res.json();
  const filtered = projects.filter((p) => PROJECTS_TO_DISPLAY.includes(p.name));

  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-700">GitHub Projects</h1>
      <ProjectGrid projects={filtered} />
    </main>
  );
}
