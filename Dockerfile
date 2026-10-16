# Static export of the site (next build → out/), served by nginx as an unprivileged user on port 8080.
FROM node:22.23.2-bookworm-slim AS build
RUN corepack enable && corepack prepare pnpm@10.34.6 --activate
WORKDIR /src
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM nginxinc/nginx-unprivileged:1.30.4-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/out /usr/share/nginx/html
EXPOSE 8080
