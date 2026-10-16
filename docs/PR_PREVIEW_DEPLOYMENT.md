# PR previews

Every pull request from this repository gets its own environment at `https://homepage-pr-<N>.dev.indietasten.net`.

- **`.github/workflows/pr-preview.yaml`** (PR opened, synchronized, reopened): builds the site image (`Dockerfile`: static
  export served by nginx), pushes it as `ghcr.io/indietasten/homepage:pr-<N>-<sha>` and asks the lab's preview deployer
  (`https://preview.indietasten.net`) to run it, authenticated with the job's GitHub OIDC token. It waits until the URL
  answers, then records a GitHub deployment (`pr-preview-<N>`) and posts or updates the preview comment.
  PRs from forks only build the image (no token for the deployer, nothing pushed).
- **`.github/workflows/pr-preview-cleanup.yaml`** (PR closed): removes the environment, marks the deployments inactive and
  comments. Previews without a new commit for 14 days are removed by the deployer anyway.
- **`.github/workflows/release.yml`** (push to main): builds `ghcr.io/indietasten/homepage:sha-<short>` and opens a tag-bump
  PR in `InDieTasten/lab` (`stacks/homepage/compose.yaml`), merged right away; the lab deploys it to https://indietasten.net.
  Needs the secret `LAB_BUMP_TOKEN` (fine-grained PAT: `InDieTasten/lab` only, contents + pull requests write).

The deployer's contract (names, limits, private previews) is documented in the lab repo, `stacks/README.md`
"Preview environments".

Run the production image locally: `docker build -t homepage . && docker run --rm -p 8080:8080 homepage`.
