FROM node:26-bookworm-slim

RUN npm install -g corepack

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . . 

EXPOSE 5000

 CMD ["pnpm", "dev"]