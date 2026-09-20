# API Guide & Endpoint Reference

## 1. Node.js API Service (Base URL: `/api/v1`)

### 1.1 Health Check
- **Endpoint:** `GET /health`
- **Description:** Returns service operational status, uptime, and timestamp.
- **Sample Response:**
```json
{
  "success": true,
  "status": "online",
  "uptime": 3600.42,
  "timestamp": "2026-09-20T17:00:00.000Z"
}
```

### 1.2 User Login
- **Endpoint:** `POST /auth/login`
- **Payload:**
```json
{
  "email": "developer@example.com",
  "password": "SecurePassword123!"
}
```
- **Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "usr_99812",
    "name": "Siam",
    "email": "developer@example.com",
    "role": "admin"
  }
}
```

### 1.3 Activity Summary
- **Endpoint:** `GET /activity/summary`
- **Headers:** `Authorization: Bearer <TOKEN>`
- **Response:**
```json
{
  "success": true,
  "data": {
    "totalCommits": 2540,
    "activeRepositories": 18,
    "languages": {
      "JavaScript": "42%",
      "Python": "28%",
      "PHP": "20%",
      "Other": "10%"
    },
    "weeklyContributionRate": "+14.5%"
  }
}
```

---

## 2. Python FastAPI Service (Base URL: `http://localhost:8000`)

### 2.1 Microservice Overview
- **Endpoint:** `GET /`
- **Response:**
```json
{
  "service": "Python Activity Microservice",
  "version": "1.0.0",
  "status": "healthy"
}
```

### 2.2 Trigger ETL Pipeline
- **Endpoint:** `POST /api/pipeline/trigger`
- **Payload:**
```json
{
  "source": "github_activity",
  "batch_size": 100
}
```
- **Response:**
```json
{
  "job_id": "job_a7b9c1d2",
  "status": "queued",
  "estimated_time_seconds": 4.5
}
```

---

## 3. WordPress REST API Extension

### 3.1 Custom Activity Route
- **Endpoint:** `GET /wp-json/siam/v1/activity`
- **Response:**
```json
{
  "status": "success",
  "plugin_version": "1.0.0",
  "posts_published": 142,
  "custom_post_types": ["portfolio", "testimonials"],
  "server_time": "2026-09-20 17:00:00"
}
```
