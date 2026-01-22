# 📦 StockFlow Manager

Intelligent stock management and internal product consumption control system with **Multi-tenancy (Whitelabel)** support.

---

## 🚀 About the Project

**StockFlow Manager** was developed for companies that need to manage material flow and product consumption by their employees in an organized and personalized way.

### Key Features:
- **🎨 Dynamic Whitelabel**: Each organization can have its own visual identity (logo, colors, and name) automatically applied to the dashboard.
- **🔐 Access Control (RBAC)**:
  - **Super Admin**: Manages organizations and global settings.
  - **Admin**: Manages products, stock, and users within their own organization.
  - **User**: Records product consumption.
- **📊 Metrics Dashboard**: Real-time visualization of consumption and stock status.
- **🛠 Stock Management**: Product registration with quantity and price control.
- **📝 Consumption History**: Full traceability of who consumed what and when.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Communication**: Axios with security interceptors

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL
- **Security**: JWT (JSON Web Token) + API Key Guard
- **Validation**: Class-validator

---

## ⚙️ How to Run

### Prerequisites
- Node.js (v18+)
- Docker and Docker Compose (for the database)
- NPM or Yarn

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/stockflow-manager.git
cd stockflow-manager
```

### 2. Configure Backend
```bash
cd backend
cp .env.example .env
npm install
```
*Make sure `DATABASE_URL` in `.env` points to your local database or Docker container.*

**Run Database (Docker):**
```bash
docker-compose up -d
```

**Run Migrations and Seeders:**
```bash
npx prisma migrate dev
npx prisma db seed
```

**Start Backend:**
```bash
npm run start:dev
```

### 3. Configure Frontend
```bash
cd ../frontend
cp .env.example .env.local
npm install
```

**Start Frontend:**
```bash
npm run dev
```

---

## 🔒 Security & Authentication

The system features two security layers:
1. **API Key**: All requests between Front and Back require the `x-api-key` header.
2. **JWT**: After login, users receive a Bearer token to authenticate specific actions based on their access level.

**Seed Accounts:**
- **Super Admin**: `admin@stockflow.com` / `admin`
- **System Link**: `http://localhost:3000`

---

## 📄 License
This project is under the UNLICENSED license.

---

Developed with 💙 by **Antigravity AI**.
