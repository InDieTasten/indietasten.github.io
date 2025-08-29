# InDieTasten Website Development Instructions

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Overview

This is a Next.js 15.3.3 static website for [indietasten.net](https://indietasten.net), built with TypeScript and Tailwind CSS. The site compiles to static HTML for GitHub Pages deployment and includes automated project data generation from GitHub repositories.

## Working Effectively

### Bootstrap and Dependencies
- Install pnpm globally: `npm install -g pnpm` (if not available)
- Install dependencies: `pnpm install` -- takes ~10 seconds
- Dependencies are managed via pnpm, with lockfile `pnpm-lock.yaml`

### Development Workflow
- Start development server: `pnpm run dev` -- starts in ~1 second, runs on http://localhost:3000
- Development uses Next.js with Turbopack for fast rebuilds
- The dev server supports hot reloading and shows changes immediately

### Building and Production
- Build for production: `pnpm run build` -- **takes ~49 seconds. NEVER CANCEL. Set timeout to 90+ seconds**
- Output directory: `./out/` (static HTML files for GitHub Pages)
- The build process includes TypeScript type checking and static page generation
- Build artifacts are automatically ignored by .gitignore

### Project Data Management
- Update project data: `./scripts/fetch-projects.sh` -- **takes ~25 seconds. NEVER CANCEL. Set timeout to 60+ seconds**
- Generates `_data/projects.yml` from GitHub API data
- Script fetches all InDieTasten repositories and classifies them by status
- Requires `js-yaml` dependency (automatically installed by script if missing)

## Validation Requirements

### Always Test After Changes
- **ALWAYS** run development server and manually validate any changes
- **ALWAYS** build the application to ensure no TypeScript errors
- Navigate to all affected pages: home (/), articles (/articles), projects (/projects)
- Test that navigation between pages works correctly
- Verify that any new content appears properly

### Manual Testing Scenarios
- Run `pnpm run dev` and visit http://localhost:3000
- Click through navigation: About, Articles, Projects
- Verify articles load with proper syntax highlighting
- Verify projects page displays repository data correctly
- Check that external links (GitHub, Strava) work
- Test responsive design by resizing browser window

### Build Validation
- **ALWAYS** run `pnpm run build` before considering changes complete
- Check that build completes without TypeScript errors
- Verify that `./out/` directory contains expected HTML files
- Build includes automatic type checking - no separate linting needed

## Repository Structure

### Key Directories
- `src/app/` - Next.js App Router pages and components
- `src/components/` - Reusable React components
- `src/lib/` - Utility functions and API helpers
- `_data/` - YAML data files (projects.yml, bookmarks.json, etc.)
- `_posts/` - Markdown blog posts
- `public/` - Static assets (images, icons)
- `scripts/` - Utility scripts (fetch-projects.sh)
- `.devcontainer/` - Development container configuration

### Important Files
- `package.json` - Dependencies and scripts
- `next.config.ts` - Next.js configuration (static export setup)
- `tsconfig.json` - TypeScript configuration
- `postcss.config.js` - PostCSS configuration for Tailwind
- `.github/workflows/` - GitHub Actions for deployment and auto-updates

## Development Environment

### Preferred Setup
- Use the provided dev container configuration in `.devcontainer/devcontainer.json`
- Container includes Node.js 22, pnpm, and necessary VS Code extensions
- Port 3000 is automatically forwarded for development server

### Alternative Setup
- Node.js 22+ (LTS recommended)
- pnpm 10+ package manager
- VS Code with Tailwind CSS extension recommended

## GitHub Actions and Deployment

### Automatic Deployment
- Triggered on pushes to `main` branch
- Uses `.github/workflows/deployment.yaml`
- Build takes ~2-3 minutes in CI environment
- Deploys static files to GitHub Pages

### Auto-Update Projects
- Daily cron job at 2:00 AM UTC via `.github/workflows/auto-update-projects.yml`
- Fetches latest repository data and creates PR if changes detected
- Can be manually triggered from GitHub Actions tab

## Common Tasks

### Adding New Blog Posts
- Create Markdown file in `_posts/` with format: `YYYY-MM-DD-title.md`
- Include frontmatter with title, excerpt, date, author, and tags
- Posts automatically appear in articles listing
- Use existing posts as templates

### Modifying Project Data
- Projects are auto-generated from GitHub repositories
- Manual changes to `_data/projects.yml` will be overwritten
- To influence project classification, use GitHub repository topics
- Use `status-done` topic to mark projects as completed

### Updating Styles
- Tailwind CSS classes are used throughout the application
- Global styles in `src/app/globals.css`
- Component-specific styles are inline Tailwind classes
- PostCSS processes Tailwind automatically during build

### Adding New Pages
- Create new directory in `src/app/` following App Router conventions
- Include `page.tsx` for the main page component
- Optional `layout.tsx` for page-specific layouts
- Navigation links need manual updates in header component

## Troubleshooting

### Build Failures
- Most build failures are TypeScript errors - check console output
- Ensure all imports are correctly typed
- Verify that new dependencies are properly installed with `pnpm install`

### Development Server Issues
- If port 3000 is busy, Next.js will automatically use next available port
- Clear `.next/` cache directory if experiencing strange behavior
- Restart development server for configuration changes

### Project Data Issues
- Verify GitHub API rate limits aren't exceeded (script shows status)
- Check that `js-yaml` dependency is installed
- Ensure `_data/` directory is writable

## Timing Expectations

### Command Timeouts (Use These Values)
- `pnpm install`: 30 seconds timeout
- `pnpm run dev`: 10 seconds timeout (starts quickly)
- `pnpm run build`: **90 seconds timeout - NEVER CANCEL before completion**
- `./scripts/fetch-projects.sh`: **60 seconds timeout - NEVER CANCEL**

### Normal Operation Times
- Dependency installation: ~10 seconds
- Development server startup: ~1 second
- Production build: ~49 seconds
- Project data fetch: ~25 seconds

**CRITICAL**: Build operations may take longer on slower systems. Always wait for completion rather than canceling long-running commands.

## Content Guidelines

### Blog Posts
- Use clear, descriptive titles
- Include relevant tags for categorization
- Write in first person from Max's perspective
- Focus on technical topics, development experience, and personal projects

### Project Descriptions
- Automatically pulled from GitHub repository descriptions
- Keep repository descriptions concise and informative
- Use repository topics for tagging and classification

## Security and Best Practices

### Dependencies
- Regular dependency updates handled via Dependabot
- No secrets in code - all configuration is public
- Static site has minimal attack surface

### Content
- All content is public and version controlled
- No dynamic server-side processing
- Images and assets served statically from `public/`

## Final Reminders

- **ALWAYS** test changes manually by running the development server
- **ALWAYS** build before considering work complete
- **NEVER** cancel long-running build or data fetch operations
- Use the provided dev container for consistent development environment
- Check both desktop and mobile layouts when making UI changes
- Verify external links work after updates