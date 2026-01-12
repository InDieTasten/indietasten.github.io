# My Homepage - [indietasten.net](https://indietasten.net)

Written using Next.js + Tailwind, compiled to static HTML.

## Developing

This repo provides a dev container config. Open in dev container and run

    pnpm install
    pnpm run dev

to start coding.

## PR Preview Deployments

This repository automatically deploys preview versions of the site for each pull request. When you open a PR:

1. A GitHub Actions workflow builds the site with a PR-specific base path
2. The built site is deployed to `https://indietasten.net/pr-preview/pr-{number}`
3. A comment is posted on the PR with the preview URL
4. The preview is automatically updated when you push new commits
5. When the PR is closed or merged, the preview is automatically removed

This allows reviewers to see changes live before merging to production.