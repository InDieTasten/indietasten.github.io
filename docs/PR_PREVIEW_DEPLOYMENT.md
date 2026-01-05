# PR Preview Deployment Documentation

## Overview

This repository uses GitHub Actions to automatically deploy preview versions of the website for each pull request. The previews are deployed to subdirectories under the main site, allowing multiple previews to coexist with the production deployment.

## Architecture

### Preview URL Structure

- **Production**: `https://indietasten.net/`
- **PR Previews**: `https://indietasten.net/pr-preview/pr-{number}/`

Each PR gets its own unique subdirectory based on the PR number.

### Workflows

#### 1. Deploy PR Preview (`.github/workflows/pr-preview.yaml`)

**Triggers:**
- Pull request opened
- Pull request synchronized (new commits pushed)
- Pull request reopened

**Process:**
1. Checks out the PR branch
2. Installs dependencies with pnpm
3. Builds the Next.js site with a PR-specific base path (`/pr-preview/pr-{number}`)
4. Checks out the `gh-pages` branch
5. Copies the built site to `pr-preview/pr-{number}` directory
6. Commits and pushes to the `gh-pages` branch
7. Creates a GitHub deployment for tracking
8. Posts/updates a comment on the PR with the preview URL

**Permissions Required:**
- `contents: write` - To push to gh-pages branch
- `pull-requests: write` - To comment on PRs
- `deployments: write` - To create deployment records

#### 2. Cleanup PR Preview (`.github/workflows/pr-preview-cleanup.yaml`)

**Triggers:**
- Pull request closed (merged or closed without merging)

**Process:**
1. Checks out the `gh-pages` branch
2. Removes the `pr-preview/pr-{number}` directory
3. Commits and pushes the deletion
4. Marks the GitHub deployment as inactive
5. Posts a cleanup comment on the PR

**Permissions Required:**
- `contents: write` - To push to gh-pages branch
- `pull-requests: write` - To comment on PRs
- `deployments: write` - To update deployment status

## How It Works

### Base Path Configuration

The Next.js configuration (`next.config.ts`) reads the `PAGES_BASE_PATH` environment variable:

```typescript
basePath: process.env.PAGES_BASE_PATH,
```

During PR preview builds, this is set to `/pr-preview/pr-{number}`, which ensures all assets and routes are correctly prefixed.

### GitHub Pages Branch

The site uses the `gh-pages` branch for deployment. This branch contains:
- The production site at the root
- Preview deployments in the `pr-preview/` directory

The main production deployment (from the `deployment.yaml` workflow) continues to deploy to the root, while PR previews are isolated in subdirectories.

### Concurrency Control

Each PR has its own concurrency group to prevent conflicts:

```yaml
concurrency:
  group: "pr-preview-${{ github.event.pull_request.number }}"
  cancel-in-progress: true
```

This ensures that if multiple commits are pushed quickly, only the latest build runs.

## Coexistence with Production

The PR preview system is designed to coexist with the main production deployment:

1. **Separate Paths**: Production is at `/`, previews are at `/pr-preview/pr-{number}/`
2. **Separate Workflows**: The main deployment workflow (`deployment.yaml`) only runs on pushes to `main`
3. **Branch-based Deployment**: Both write to `gh-pages` but in different directories

## Testing Locally

To test how a preview build would look:

```bash
# Set the base path
export PAGES_BASE_PATH=/pr-preview/pr-123

# Build the site
pnpm run build

# The output in ./out will have the correct base path
```

## Troubleshooting

### Preview Not Updating

If a preview doesn't update after pushing commits:
1. Check the GitHub Actions tab for workflow runs
2. Ensure the workflow has the required permissions
3. Check if the concurrency group is blocking the run

### Preview Not Found (404)

If the preview URL returns 404:
1. Verify the build completed successfully
2. Check that the files were pushed to the `gh-pages` branch
3. Wait a few minutes for GitHub Pages to update

### Cleanup Not Running

If a preview isn't removed after closing a PR:
1. Check the cleanup workflow run in the Actions tab
2. Verify the workflow has write permissions
3. Manually remove the directory from `gh-pages` if needed

## Security Considerations

- Workflows use `github-actions[bot]` for commits
- Deployments are marked as non-production and transient
- No secrets or sensitive data are exposed in previews
- Previews are publicly accessible (same as production)
