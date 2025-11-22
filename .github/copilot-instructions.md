# CrestSports AI Coding Instructions

## Project Overview
CrestSports is a **guest-checkout e-commerce platform** built as a **Turborepo monorepo** with separate frontend and backend applications. The architecture emphasizes **type-safety, validation, and guest-friendly workflows** without authentication requirements for customers.

## Architecture & Structure

### Monorepo Layout (pnpm + Turborepo)
- `apps/web` - Next.js 16 (App Router) frontend with Tailwind + shadcn/ui
- `apps/api` - Express.js + TypeScript backend with Prisma ORM
- `apps/database-scripts` - Python utilities for database seeding
- `packages/ui` - Shared React components
- `packages/eslint-config`, `packages/typescript-config` - Shared configs

### Key Design Decisions
1. **Guest Checkout First**: No authentication required for purchases. Orders tracked via unique `trackingId` (nanoid)
2. **Strict Type Safety**: Zod schemas define and validate all API contracts (see `apps/api/src/types/schemas.ts`)
3. **Service Layer Pattern**: Business logic lives in `apps/api/src/services/`, routes are thin controllers
4. **Client-Side State**: Cart managed via React Context + localStorage (see `apps/web/contexts/CartContext.tsx`)

## Essential Workflows

### Development Commands
```bash
# From monorepo root
pnpm install              # Install all dependencies
pnpm dev                  # Run all apps (web on :3000, api on :3001)
turbo dev --filter=web    # Run only frontend
turbo dev --filter=@crestsports/api  # Run only backend

# Database operations (from apps/api/)
pnpm prisma:generate      # Generate Prisma client after schema changes
pnpm prisma:migrate       # Run migrations
pnpm prisma:studio        # Open Prisma Studio GUI
```

### Build & Type Checking
```bash
turbo build              # Build all apps (runs prisma generate automatically for API)
turbo check-types        # TypeScript validation across workspace
turbo lint               # ESLint validation
```

## Critical Conventions

### API Request/Response Pattern
**Always** follow this pattern in API routes:
```typescript
// In apps/api/src/routes/*.routes.ts
router.post(
  '/',
  validateRequest({ body: createOrderSchema }),  // Zod validation middleware
  async (req: Request, res: Response): Promise<Response> => {
    const result = await service.create(req.body);
    return sendCreated(res, result);  // Standardized response helpers
  }
);
```

### Schema-First Validation
1. Define Zod schema in `apps/api/src/types/schemas.ts`
2. Use `validateRequest` middleware in routes (auto-validates + transforms)
3. TypeScript types inferred from Zod: `type CreateOrderDto = z.infer<typeof createOrderSchema>`

### Frontend API Calls
API client in `apps/web/lib/api.ts` provides typed functions:
```typescript
// Use environment variable for API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// All responses follow ApiResponse<T> interface with success/data/message
```

### Error Handling
Backend uses custom error classes (`apps/api/src/utils/errors.ts`):
- `BadRequestError`, `NotFoundError`, `ValidationError`, `UnauthorizedError`
- Caught by centralized `errorHandler` middleware in `apps/api/src/middleware/errorHandler.ts`
- Returns consistent JSON error responses

### Database Access
- **Always** use Prisma client from `apps/api/src/config/database.ts`
- Database schema in `apps/api/prisma/schema.prisma`
- After schema changes: `pnpm prisma:generate` then restart dev server
- Key models: `Product`, `Order`, `OrderItem`, `Payment`
- Order status flow: `PENDING` → `PAID` → `PROCESSING` → `SHIPPED` → `DELIVERED`

## Integration Points

### Razorpay Payment Flow
1. Frontend calls `POST /api/v1/payments/create-order` with order details
2. Backend creates Razorpay order + saves to DB with status `PENDING`
3. Frontend displays Razorpay checkout modal
4. On success, webhook/verification endpoint updates order to `PAID`
5. Confirmation email sent via Resend

### Environment Variables
- Backend: Defined in `apps/api/src/config/env.ts` with Zod schema (strict validation on startup)
- Frontend: `NEXT_PUBLIC_API_URL` - only public vars need this prefix
- Critical: `DATABASE_URL`, `RAZORPAY_KEY_ID/SECRET`, `RESEND_API_KEY`, `SUPABASE_URL/KEYS`
- All env vars listed in `turbo.json` for build caching

### Cart Management
Cart stored in **localStorage** and managed via **React Context**:
- Cart items include product + size + quantity
- Cart persists across sessions
- Cleared after successful order placement
- No backend cart persistence (guest checkout model)

## Project-Specific Patterns

### Path Aliases (TypeScript)
Backend uses `@config`, `@middleware`, `@routes`, `@services`, `@utils`, `@types` (see `apps/api/tsconfig.json`)

### Component Structure (Frontend)
- `components/` - Reusable React components (Header, Footer, ProductCard, etc.)
- `components/ui/` - shadcn/ui primitives (button, card, dialog, etc.)
- `app/` - Next.js App Router pages + layouts
- Always use `"use client"` directive for components with state/context

### Logging
Backend uses Winston logger (`apps/api/src/utils/logger.ts`):
- Request logging via `requestLogger` middleware
- Structured JSON logs in production
- Include `requestId` for request tracing

### Vercel Deployment
- `apps/api/pages/api/index.ts` - Vercel serverless entry point for API
- Both apps have `vercel.json` configs
- Frontend deployed as Next.js app, backend as serverless functions

## Testing Patterns
- API tests use Jest + Supertest (not fully implemented yet)
- Test commands: `pnpm test`, `pnpm test:watch`, `pnpm test:coverage`

## Important Files to Reference
- `docs/Project.MD` - Original project spec with feature requirements
- `apps/api/README.md` - Detailed API setup instructions + endpoint docs
- `apps/api/prisma/schema.prisma` - Database schema (source of truth)
- `apps/web/contexts/CartContext.tsx` - Cart state management logic
- `apps/api/src/types/schemas.ts` - All API validation schemas
