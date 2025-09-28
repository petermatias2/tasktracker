![Build](https://github.com/petermatias2/tasktracker/actions/workflows/docker.yml/badge.svg)

# TaskTracker (Docker + Compose + Postgres)

Simple Node API with Postgres + Adminer.
## Run
docker compose up -d --build
- API: http://localhost:8082 (GET /healthz, GET/POST /tasks, PATCH /tasks/:id)
- Adminer: http://localhost:8090 (Server=db, user=appuser, pass=apppass, DB=appdb)

## What this shows
- Custom Dockerfile (multi-stage)
- Multi-service docker-compose (API + DB + Adminer)
- Healthcheck for DB, API depends_on
- Env-configured ports, volumes, init.sql
- (Optional) k8s manifests in /k8s


CI run: 2025-09-27 22:39:43Z

CI run: 2025-09-27 22:44:27Z

CI run: 2025-09-27 22:46:55Z
