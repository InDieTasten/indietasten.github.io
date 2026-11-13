# My Homepage - [indietasten.net](https://indietasten.net)

Written using Next.js + Tailwind, compiled to static HTML.

## Developing

This repo provides a dev container config. Open in dev container and run

    pnpm install
    pnpm run dev

to start coding. `pnpm run dev` and `pnpm run build` download the repository social previews
from GitHub into `public/project-previews/` (gitignored) so the Projects page serves them itself;
use `PREVIEWS_SKIP=1` to skip that step when offline.

## PR previews and deploys

Every pull request from this repository gets a preview at `https://homepage-pr-<N>.dev.indietasten.net` (link in a PR
comment, removed when the PR is closed). Every merge to `main` deploys https://indietasten.net. Details:
[docs/PR_PREVIEW_DEPLOYMENT.md](docs/PR_PREVIEW_DEPLOYMENT.md).
