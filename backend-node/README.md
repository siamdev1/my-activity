# 🚀 Node.js Core Backend Service

A lightweight, robust, and secure Express.js microservice architecture.

## Features
- **Security:** Equipped with `helmet` header security and origin-restricted `cors`.
- **Authentication:** Stateless JWT generation & verification middleware.
- **Rate Limiting:** Built-in sliding-window memory rate limiter.
- **Request Logging:** Formatted logging via `morgan`.
- **Centralized Error Handling:** Consistent JSON error structure.

## Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env

# 3. Start development server
npm run dev
```

## Structure
```
src/
├── controllers/    # Route controllers and business logic
├── middleware/     # Auth, error handling, rate limiting
├── routes/         # Express routes (api, auth)
├── utils/          # Logger, token helpers
└── app.js          # Main application file
```
