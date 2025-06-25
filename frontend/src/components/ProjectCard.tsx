import React from "react";

export interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

export interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-md hover:bg-white transition">
      <h2 className="text-xl font-semibold text-gray-700">{project.name}</h2>
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
  );
}
