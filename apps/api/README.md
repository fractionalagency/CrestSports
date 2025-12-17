# CrestSports API

Backend API for CrestSports E-Commerce platform built with Express.js, TypeScript, Prisma, and PostgreSQL.

## Features

- **Express.js** - Fast, unopinionated web framework
- **TypeScript** - Type-safe development
- **Prisma ORM** - Type-safe database access
- **PostgreSQL** - Robust relational database (via Supabase)
- **Zod** - Schema validation for requests
- **Razorpay** - Payment gateway integration
- **Winston** - Structured logging
- **Security** - Helmet, CORS, Rate Limiting
- **Guest Checkout** - No authentication required for customers
- **Order Tracking** - Unique tracking IDs for all orders

## Project Structure

```
apps/api/
├── src/
│   ├── config/           # Configuration (env, database)
│   ├── middleware/       # Express middleware (auth, error handling, validation)
│   ├── routes/           # API route definitions
│   ├── services/         # Business logic layer
│   ├── types/            # TypeScript types and Zod schemas
│   ├── utils/            # Utility functions (logger, errors, responses)
│   └── index.ts          # Application entry point
├── prisma/
│   └── schema.prisma     # Database schema
├── .env.example          # Environment variables template
└── package.json
```

## Prerequisites

- Node.js >= 18
- pnpm >= 9.0.0
- PostgreSQL database (Supabase recommended)
- Razorpay account (for payments)
- Resend account (for emails)

## Setup Instructions

### 1. Install Dependencies

From the monorepo root:

```bash
pnpm install
```

### 2. Environment Configuration

Create a `.env` file in `apps/api/`:

```bash
cp .env.example .env
```

Update the following environment variables:

```env
# Server
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database (Supabase)
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Resend (Email)
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@crestsports.com

# Security
JWT_SECRET=your_jwt_secret_key_min_32_chars
JWT_EXPIRES_IN=7d

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Logging
LOG_LEVEL=info
```

### 3. Database Setup

Generate Prisma Client:

```bash
cd apps/api
pnpm prisma:generate
```

Run database migrations:

```bash
pnpm prisma:migrate
```

Open Prisma Studio to view/edit data:

```bash
pnpm prisma:studio
```

### 4. Start Development Server

From monorepo root:

```bash
pnpm dev
```

Or from the API directory:

```bash
cd apps/api
pnpm dev
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Health Check

```
GET /health
```

Returns API health status and database connection.

**Response:**

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2025-10-26T...",
    "uptime": 123.45,
    "database": "connected"
  }
}
```

### Products

#### Get All Products

```
GET /api/v1/products?page=1&limit=10&category=jerseys&minPrice=100&maxPrice=5000&search=india
```

**Query Parameters:**

- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Items per page (default: 10, max: 100)
- `category` (optional) - Filter by category slug
- `minPrice` (optional) - Minimum price filter
- `maxPrice` (optional) - Maximum price filter
- `search` (optional) - Search in name/description

**Response:**

```json
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

#### Get Featured Products

```
GET /api/v1/products/featured
```

Returns products marked as featured.

#### Get Product by ID

```
GET /api/v1/products/:id
```

Returns detailed product information including category and stock.

### Orders

#### Create Order

```
POST /api/v1/orders
```

**Request Body:**

```json
{
  "items": [
    {
      "productId": "prod_123",
      "quantity": 2,
      "size": "L"
    }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+919876543210",
    "line1": "123 Main Street",
    "line2": "Apt 4B",
    "city": "Mumbai",
    "state": "Maharashtra",
    "postalCode": "400001",
    "country": "India"
  }
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "ord_123",
    "trackingId": "TRK-XXXXXXXXXXXX",
    "total": 2500.00,
    "status": "pending",
    "items": [...],
    "shippingAddress": {...}
  }
}
```

#### Get Order by ID

```
GET /api/v1/orders/:id
```

Returns order details including items and shipping information.

#### Track Order

```
GET /api/v1/orders/track/:trackingId
```

Track order using the tracking ID (e.g., `TRK-XXXXXXXXXXXX`).

### Payments

#### Create Payment

```
POST /api/v1/payments/create/:orderId
```

Creates a Razorpay order for the specified order ID.

**Response:**

```json
{
  "success": true,
  "data": {
    "razorpayOrderId": "order_xyz",
    "amount": 250000,
    "currency": "INR",
    "keyId": "rzp_test_xxx"
  }
}
```

#### Verify Payment

```
POST /api/v1/payments/verify
```

**Request Body:**

```json
{
  "razorpayOrderId": "order_xyz",
  "razorpayPaymentId": "pay_abc",
  "razorpaySignature": "signature_string"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "verified": true,
    "order": {
      "id": "ord_123",
      "status": "confirmed",
      "trackingId": "TRK-XXXXXXXXXXXX"
    }
  }
}
```

## Available Scripts

### Development

```bash
pnpm dev              # Start development server with hot reload
pnpm build            # Build for production
pnpm start            # Start production server
```

### Database

```bash
pnpm prisma:generate  # Generate Prisma Client
pnpm prisma:migrate   # Run database migrations
pnpm prisma:studio    # Open Prisma Studio
pnpm prisma:push      # Push schema changes (dev only)
```

### Code Quality

```bash
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint errors
pnpm format           # Format code with Prettier
pnpm check-types      # Type-check without building
```

### Testing

```bash
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage
```

## Architecture

### Layered Architecture

```
Routes → Services → Prisma → Database
```

- **Routes**: Handle HTTP requests/responses, validation
- **Services**: Business logic, data transformation
- **Prisma**: Database access layer
- **Database**: PostgreSQL via Supabase

### Error Handling

The API uses centralized error handling with custom error classes:

- `AppError` - Base error class
- `ValidationError` - Request validation failures
- `NotFoundError` - Resource not found
- `UnauthorizedError` - Authentication failures

All errors return consistent JSON responses:

```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE",
    "statusCode": 400
  }
}
```

### Logging

Winston logger with different log levels:

- `error` - Error messages
- `warn` - Warning messages
- `info` - Informational messages
- `http` - HTTP requests (via Morgan)
- `debug` - Debug messages

Logs are written to:

- Console (formatted for development)
- `logs/error.log` - Error logs only
- `logs/combined.log` - All logs

### Security

- **Helmet** - Sets secure HTTP headers
- **CORS** - Configurable cross-origin resource sharing
- **Rate Limiting** - Prevents brute force attacks (100 requests/15 min)
- **Input Validation** - Zod schemas validate all requests
- **SQL Injection Protection** - Prisma parameterized queries
- **Environment Variables** - Sensitive data in `.env`

## Database Schema

Key entities:

- **Product** - Product catalog with images, prices, stock
- **Category** - Product categories with slugs
- **Order** - Customer orders with tracking IDs
- **OrderItem** - Individual items in orders
- **Payment** - Payment records (Razorpay integration)
- **User** - Admin users (future: customer authentication)
- **EmailLog** - Email delivery tracking

## Deployment

### Build for Production

```bash
pnpm build
```

### Environment Variables

Ensure all production environment variables are set:

- Use strong `JWT_SECRET` (min 32 characters)
- Set `NODE_ENV=production`
- Configure production database URL
- Set production `ALLOWED_ORIGINS`
- Use production Razorpay keys
- Configure Resend with verified domain

### Run Production Server

```bash
pnpm start
```

### Recommended Hosting

- **API**: Railway, Render, Fly.io, AWS/GCP/Azure
- **Database**: Supabase, Neon, Railway PostgreSQL
- **Environment**: Node.js >= 18

## Troubleshooting

### Database Connection Issues

```bash
# Test connection
pnpm prisma:studio

# Reset database (WARNING: deletes all data)
pnpm prisma:migrate reset
```

### TypeScript Errors

```bash
# Regenerate Prisma Client
pnpm prisma:generate

# Check for type errors
pnpm check-types
```

### Port Already in Use

Change `PORT` in `.env` or kill the process:

```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>
```

## Contributing

1. Create a feature branch
2. Make changes with proper type safety
3. Add tests for new features
4. Run `pnpm lint` and `pnpm check-types`
5. Submit pull request

## License

MIT
