import React from "react";
import ProjectCard, { Project } from "./ProjectCard";

export interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return <p className="text-gray-500">No projects available.</p>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
