export type Project = {
  name: string;
  status: 'done' | 'abandoned' | 'in-progress';
  description: string;
  github_link?: string;
  website?: string;
  tags: string[];
  // Additional fields that will be auto-generated
  language?: string;
  created_at?: string;
  updated_at?: string;
  preview_image?: string;
  // Attached at build time from _data/previews.json when the preview was
  // downloaded to public/project-previews/ (see scripts/fetch-previews.mjs)
  previewPath?: string;
  archived?: boolean;
};