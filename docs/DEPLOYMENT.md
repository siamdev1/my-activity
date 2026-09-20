# Deployment & DevOps Guide

## 1. Containerization (Docker)

To containerize the individual services:

### Node.js Backend Dockerfile Example
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Python Service Dockerfile Example
```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "api_service.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## 2. Docker Compose Setup

Run all microservices locally in orchestrated harmony:

```yaml
version: '3.8'

services:
  backend-node:
    build: ./backend-node
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - NODE_ENV=production
    restart: always

  frontend-react:
    build: ./frontend-react
    ports:
      - "3000:3000"
    depends_on:
      - backend-node

  python-service:
    build: ./python-scripts
    ports:
      - "8000:8000"
    restart: always
```

---

## 3. Production Best Practices

1. **Environment Secrets:** Store secrets in environment variables (`.env`) or secret managers (AWS Secrets Manager, Doppler).
2. **Reverse Proxy:** Terminate SSL/TLS at Cloudflare or Nginx level.
3. **Database Indexing:** Ensure primary query keys in PostgreSQL and MySQL are properly indexed.
4. **Log Aggregation:** Route standard JSON outputs to Datadog or ELK Stack.
