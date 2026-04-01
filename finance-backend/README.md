# JP Morgan Finance Dashboard — Backend API

Production-grade Node.js + Express + TypeScript REST API with RBAC, JWT authentication, and MongoDB aggregation pipelines.

## Tech Stack

- **Runtime**: Node.js + Express.js + TypeScript
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT (access + refresh tokens)
- **Validation**: Zod
- **Docs**: Swagger/OpenAPI 3.0
- **Testing**: Jest + Supertest + mongodb-memory-server
- **Logging**: Winston
- **Security**: Helmet + CORS + Rate Limiting

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Ensure MongoDB is running, then seed the database
npm run seed

# Start development server
npm run dev
```

Server starts at `http://localhost:5000`
Swagger docs at `http://localhost:5000/api/docs`

## API Endpoints

### Auth (`/api/v1/auth`)
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/register` | ❌ | Register new user |
| POST | `/login` | ❌ | Login |
| POST | `/refresh` | 🍪 | Refresh access token |
| POST | `/logout` | ✅ | Logout |
| GET | `/me` | ✅ | Get current user |

### Users (`/api/v1/users`) — Admin Only
| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | List users (paginated) |
| GET | `/:id` | Get user by ID |
| PATCH | `/:id` | Update user role/status |
| DELETE | `/:id` | Soft delete user |

### Transactions (`/api/v1/transactions`)
| Method | Path | Roles | Description |
|--------|------|-------|-------------|
| GET | `/` | All | List with filters |
| GET | `/:id` | All | Get by ID |
| GET | `/categories/list` | All | Get categories |
| POST | `/` | Analyst, Admin | Create |
| PATCH | `/:id` | Analyst, Admin | Update |
| DELETE | `/:id` | Admin | Soft delete |

### Dashboard (`/api/v1/dashboard`)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/summary` | Income/Expenses/Net/Count |
| GET | `/category-breakdown` | By category with % |
| GET | `/monthly-trends` | 12-month trends |
| GET | `/recent-activity` | Last 10 transactions |
| GET | `/weekly-summary` | Current week by day |

## Role Matrix

| Permission | Viewer | Analyst | Admin |
|------------|--------|---------|-------|
| View Dashboard | ✅ | ✅ | ✅ |
| View Transactions | ✅ | ✅ | ✅ |
| Create Transactions | ❌ | ✅ | ✅ |
| Edit Transactions | ❌ | ✅ | ✅ |
| Delete Transactions | ❌ | ❌ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |

## Test Accounts (after seeding)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@jpmorgan.com | admin123 |
| Analyst | analyst@jpmorgan.com | analyst123 |
| Viewer | viewer@jpmorgan.com | viewer123 |

## Scripts

```bash
npm run dev         # Development server (hot reload)
npm run build       # Build TypeScript
npm start           # Run production build
npm run seed        # Seed database with demo data
npm test            # Run tests
npm run test:coverage  # Run tests with coverage
```
