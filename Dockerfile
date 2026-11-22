# Static export of the site (next build → out/), served by nginx as an unprivileged user on port 8080.
FROM node:26.13.1-bookworm-slim AS build
# corepack was unbundled from the Node.js images in 26, install pnpm through npm instead
RUN npm install -g pnpm@10.34.6
WORKDIR /src
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM nginxinc/nginx-unprivileged:1.31.7-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/out /usr/share/nginx/html
EXPOSE 8080
