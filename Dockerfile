# Base deps
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./

# ---- Test stage: installs dev deps and runs tests
FROM deps AS test
RUN npm ci
COPY . .
CMD ["npm","test"]

# ---- Runtime image: prod-only deps, starts API
FROM deps AS runtime
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node","index.js"]
