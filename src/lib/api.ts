import { Article as Article } from "@/interfaces/post";
import { Project } from "@/interfaces/project";
import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");
const dataDirectory = join(process.cwd(), "_data");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Article;
}

export function getAllArticles(): Article[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getAllProjects(): Project[] {
  // Try to load YAML file first, fall back to JSON
  const yamlPath = join(dataDirectory, "projects.yml");
  const jsonPath = join(dataDirectory, "projects.json");
  
  let projects: Project[];
  
  if (fs.existsSync(yamlPath)) {
    const fileContents = fs.readFileSync(yamlPath, "utf8");
    projects = yaml.load(fileContents) as Project[];
  } else if (fs.existsSync(jsonPath)) {
    const fileContents = fs.readFileSync(jsonPath, "utf8");
    projects = JSON.parse(fileContents) as Project[];
  } else {
    throw new Error("No projects data file found (projects.yml or projects.json)");
  }
  
  // Sort projects by status (done first, then in-progress, then abandoned) 
  // and within each status by stars/name
  return projects.sort((a, b) => {
    const statusOrder = { 'done': 0, 'in-progress': 1, 'abandoned': 2 };
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;
    
    // Within same status, sort by stars if available, then by name
    if (a.stars !== undefined && b.stars !== undefined) {
      const starsDiff = b.stars - a.stars;
      if (starsDiff !== 0) return starsDiff;
    }
    
    return a.name.localeCompare(b.name);
  });
}
