FROM node:16 AS dependencies
WORKDIR /app

COPY Backend/package.json backend/package.json
RUN cd backend && yarn install

FROM dependencies AS dependencies-prod
RUN yarn --production

# BUILD-FRONTEND
FROM node:16 AS build-frontend
WORKDIR /app

COPY Frontend/ .

# BUILD-BACKEND
FROM node:16 AS build-backend
WORKDIR /app

COPY --from=dependencies /app/backend/node_modules node_modules
COPY Backend/ .
COPY Backend/package.json .

FROM node:16 AS runtime
WORKDIR /app

COPY --from=dependencies-prod /app/backend/node_modules node_modules
COPY --from=build-backend /app backend
COPY --from=build-frontend /app frontend

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "./backend/server.js"]