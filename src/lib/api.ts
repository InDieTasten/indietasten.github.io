import { Article as Article } from "@/interfaces/post";
import { Project } from "@/interfaces/project";
import fs from "fs";
import matter from "gray-matter";
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
  const projectsPath = join(dataDirectory, "projects.json");
  const fileContents = fs.readFileSync(projectsPath, "utf8");
  const projects = JSON.parse(fileContents) as Project[];
  
  // Sort projects by status (done first, then in-progress, then abandoned) 
  // and within each status by name
  return projects.sort((a, b) => {
    const statusOrder = { 'done': 0, 'in-progress': 1, 'abandoned': 2 };
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;
    return a.name.localeCompare(b.name);
  });
}
