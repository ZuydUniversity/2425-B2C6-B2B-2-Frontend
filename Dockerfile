# ---------- BUILDER ----------
FROM node:24.2.0-alpine3.22 AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY yarn.lock package.json ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# ---------- RUNNER ----------
FROM node:24.2.0-alpine3.22 AS runner

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/.next .next
#COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules

EXPOSE 3000

HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

CMD ["yarn", "start:prod"]
