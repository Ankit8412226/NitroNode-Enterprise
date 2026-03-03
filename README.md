# Node.js Enterprise Backend Foundation

Production-grade, enterprise-level modular backend architecture built with Node.js, Express, and JavaScript.

## 🚀 Features

### 🛡️ Core Security
- **JWT Auth**: Access & Refresh token system with secure storage.
- **RBAC**: Role-Based Access Control with per-endpoint permissions.
- **Super-Admin Override**: Global access for maintenance tasks.
- **Advanced Rate Limiting**: Sliding-window Redis-based protection.
- **IP Guard**: Automatic IP blocking after repeated failed login attempts.
- **Helmet & HPP**: Protection against common web vulnerabilities.
- **Sanitization**: XSS and Mongo Injection protection.

### 🧩 Architecture
- **Layered Structure**: Route → Controller → Service → Repository → Model.
- **Modular Design**: Fully self-contained features in `src/modules`.
- **Request Context**: Every request tracks `requestId`, `userId`, and `startTime`.
- **Centralized Errors**: Custom `ApiError` class with global error handling.
- **Response Formatter**: Unified JSON success/error structures.

### 🤖 AI & RAG Ready
- **AI Service**: Full OpenAI integration for chat and embeddings.
- **RAG System**: Retrieval-Augmented Generation with PDF document processing.
- **Storage Service**: Multi-cloud file uploads (AWS S3 & Cloudinary).
- **Payment Service**: Production-ready Stripe billing integration.
- **Notification Service**: Multi-channel alerts (Email, Slack, SMS).

### ⚡ Infrastructure & DX
- **Dockerized**: Pre-configured `Dockerfile` and `docker-compose.yml`.
- **Redis Caching**: Advanced caching layer for performance.
- **Data Export**: Built-in CSV/Excel generation utility.
- **Emails**: Nodemailer with reusable HTML templates.

## 📁 Project Structure

```text
src/
├── app.js              # Express app definition & middleware
├── server.js           # Server bootstrap & lifecyle management
├── common/             # Utilities, constants, and custom errors
├── config/             # Environment, DB, Redis, and Logger setup
├── cron/               # Scheduled background tasks
├── database/           # Global Mongoose model registry
├── middlewares/        # Security, validation, and context handlers
├── modules/            # Domain-specific logic (Auth, User, Audit, etc.)
│   └── [module]/
│       ├── module.controller.js
│       ├── module.service.js
│       ├── module.repository.js
│       ├── module.model.js
│       ├── module.validation.js
│       └── index.js    # Modular router definition
├── services/           # External service integrations (AI, Email, Stripe)
└── routes/v1/          # Central API versioning
```

## 🛠️ Setup & Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Update `.env` with your credentials (see `.env.example`).

3. **Development Mode**:
   ```bash
   npm run dev
   ```

4. **Production Mode**:
   ```bash
   npm start
   ```

## 📜 Development Guidelines

- **Dry Controllers**: Controllers must only receive inputs and call services.
- **Fat Services**: All business logic resides here.
- **Isolated Repositories**: Only repositories should touch the database.
- **Modular Routes**: Always use `router.route()` chaining style.
- **Zero Console**: Use `logger` for all monitoring needs.
- **Production Safety**: No stack traces or verbose errors leaked in PROD mode.
