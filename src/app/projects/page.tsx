import { Card } from "@/components/Card";
import { SimpleLayout } from "@/components/SimpleLayout";
import { Project } from "@/interfaces/project";
import { getAllProjects } from "@/lib/api";

function ProjectStatus({ status }: { status: Project['status'] }) {
  const statusConfig = {
    'done': { label: 'Completed', className: 'bg-green-900/50 text-green-300 border-green-500/50' },
    'in-progress': { label: 'In Progress', className: 'bg-blue-900/50 text-blue-300 border-blue-500/50' },
    'abandoned': { label: 'Archived', className: 'bg-zinc-700/50 text-zinc-400 border-zinc-600/50' },
  };

  const config = statusConfig[status];
  
  return (
    <span
      className={`border px-2 py-0.5 rounded text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const links = [];
  
  if (project.github_link) {
    links.push({ url: project.github_link, label: 'GitHub', type: 'github' });
  }
  if (project.demo_link) {
    links.push({ url: project.demo_link, label: 'Demo', type: 'demo' });
  }
  if (project.youtube_link) {
    links.push({ url: project.youtube_link, label: 'YouTube', type: 'youtube' });
  }
  if (project.website) {
    links.push({ url: project.website, label: 'Website', type: 'website' });
  }

  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-2 py-1 rounded border border-teal-500/50 text-teal-300 hover:bg-teal-500/10 transition-colors"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="md:col-span-3">
      <div className="flex items-start justify-between mb-2">
        <Card.Title href={project.github_link}>
          {project.name}
        </Card.Title>
        <div className="flex items-center gap-2">
          {project.stars !== undefined && project.stars > 0 && (
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {project.stars}
            </span>
          )}
          <ProjectStatus status={project.status} />
        </div>
      </div>
      
      {project.tags && project.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className={`border text-xs px-2 py-0.5 rounded ${
                index === 0 && project.language === tag
                  ? 'border-teal-500/50 text-teal-300 bg-teal-500/10'
                  : 'border-zinc-600 text-zinc-300 bg-transparent'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <Card.Description>{project.description}</Card.Description>
      
      {(project.forks !== undefined && project.forks > 0) && (
        <div className="mt-2 text-xs text-zinc-500">
          {project.forks} fork{project.forks !== 1 ? 's' : ''}
        </div>
      )}
      
      <ProjectLinks project={project} />
      
      {project.github_link && (
        <Card.Cta>View on GitHub</Card.Cta>
      )}
    </Card>
  );
}

export default function ProjectsIndex() {
  const projects = getAllProjects();

  return (
    <SimpleLayout
      title="Projects"
      intro="A collection of open source projects, experiments, and ideas I've worked on over the years."
    >
      <div className="md:border-l md:pl-6 md:border-zinc-700/40">
        <div className="grid gap-8 md:grid-cols-1">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  );
}