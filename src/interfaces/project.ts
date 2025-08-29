export type Project = {
  name: string;
  status: 'done' | 'abandoned' | 'in-progress' | 'idea';
  description: string;
  github_link?: string;
  website?: string;
  tags: string[];
  // Additional fields that will be auto-generated
  language?: string;
  created_at?: string;
  updated_at?: string;
  og_image?: string;
  archived?: boolean;
};