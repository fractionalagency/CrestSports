# Admin Section Implementation Plan

## Overview
Complete admin dashboard for CrestSports E-commerce platform with authentication, product management, order management, and analytics.

## Architecture

### Frontend (Next.js App Router)
- `/app/admin` - Admin section root
- `/app/admin/login` - Authentication page
- `/app/admin/dashboard` - Main dashboard with analytics
- `/app/admin/products` - Product management
- `/app/admin/products/new` - Add new product
- `/app/admin/products/[id]` - Edit product
- `/app/admin/orders` - Order management
- `/app/admin/orders/[id]` - Order details
- `/app/admin/settings` - Admin settings
- `/app/admin/admins` - Admin user management

### Backend API (Express)
- `/api/admin/auth/login` - Admin login
- `/api/admin/auth/me` - Get current admin
- `/api/admin/products` - Product CRUD
- `/api/admin/orders` - Order management
- `/api/admin/analytics` - Dashboard analytics
- `/api/admin/admins` - Admin user management

## Implementation Steps

### Phase 1: Backend API Setup
1. ✅ Database schema already exists (Admin model)
2. Create admin authentication middleware
3. Create admin routes and controllers
4. Add JWT token generation/validation
5. Implement admin CRUD operations

### Phase 2: Frontend Authentication
1. Create admin login page
2. Implement JWT storage (httpOnly cookies or localStorage)
3. Create auth context/provider
4. Add protected route middleware
5. Create admin layout with sidebar navigation

### Phase 3: Dashboard & Analytics
1. Create dashboard overview page
2. Implement analytics cards (sales, orders, revenue)
3. Add charts (sales trends, top products)
4. Create recent orders widget
5. Add quick stats

### Phase 4: Product Management
1. Create products list page with search/filter
2. Implement product creation form
3. Add product edit functionality
4. Implement image upload
5. Add bulk actions (activate/deactivate)
6. Category management

### Phase 5: Order Management
1. Create orders list with filters
2. Implement order details view
3. Add status update functionality
4. Implement tracking number assignment
5. Add order notes/comments
6. Export orders functionality

### Phase 6: Admin User Management
1. Create admin users list
2. Add new admin user form
3. Implement role-based permissions
4. Add admin user edit/deactivate

### Phase 7: Polish & Testing
1. Add loading states
2. Implement error handling
3. Add toast notifications
4. Mobile responsive design
5. Security audit
6. Performance optimization

## Technology Stack

### Frontend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Hook Form + Zod validation
- Recharts for analytics
- Lucide icons

### Backend
- Express.js
- Prisma ORM
- JWT authentication
- bcrypt for password hashing
- Zod for validation

## Security Considerations
1. JWT token with expiration
2. Password hashing with bcrypt
3. Role-based access control
4. CSRF protection
5. Rate limiting on auth endpoints
6. Input validation and sanitization
7. Secure headers (helmet.js)

## Database Setup

### Create First Admin User
```bash
# Run this script after migration
npx tsx scripts/create-admin.ts
```

### Migration
```bash
cd apps/api
npx prisma migrate dev --name add_admin_tables
npx prisma generate
```

## Environment Variables

### Backend (.env)
```
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## File Structure

```
apps/web/app/admin/
├── layout.tsx                 # Admin layout with sidebar
├── page.tsx                   # Redirect to dashboard
├── login/
│   └── page.tsx              # Login page
├── dashboard/
│   └── page.tsx              # Dashboard overview
├── products/
│   ├── page.tsx              # Products list
│   ├── new/
│   │   └── page.tsx          # Create product
│   └── [id]/
│       └── page.tsx          # Edit product
├── orders/
│   ├── page.tsx              # Orders list
│   └── [id]/
│       └── page.tsx          # Order details
├── admins/
│   ├── page.tsx              # Admin users list
│   └── new/
│       └── page.tsx          # Create admin
└── settings/
    └── page.tsx              # Settings

apps/web/components/admin/
├── AdminSidebar.tsx          # Navigation sidebar
├── AdminHeader.tsx           # Top header
├── DashboardStats.tsx        # Stats cards
├── SalesChart.tsx            # Sales chart
├── RecentOrders.tsx          # Recent orders widget
├── ProductForm.tsx           # Product form
├── OrderStatusBadge.tsx      # Order status badge
└── ...

apps/api/src/
├── routes/
│   └── admin.routes.ts       # Admin routes
├── controllers/
│   └── admin.controller.ts   # Admin controllers
├── middleware/
│   └── admin.auth.ts         # Admin auth middleware
└── services/
    └── admin.service.ts      # Admin business logic
```

## API Endpoints

### Authentication
- `POST /api/admin/auth/login` - Login
- `POST /api/admin/auth/logout` - Logout
- `GET /api/admin/auth/me` - Get current admin

### Products
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create product
- `GET /api/admin/products/:id` - Get product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `PATCH /api/admin/products/:id/toggle` - Toggle active status

### Orders
- `GET /api/admin/orders` - List all orders
- `GET /api/admin/orders/:id` - Get order details
- `PATCH /api/admin/orders/:id/status` - Update order status
- `PATCH /api/admin/orders/:id/tracking` - Update tracking info
- `POST /api/admin/orders/:id/notes` - Add order note

### Analytics
- `GET /api/admin/analytics/overview` - Dashboard stats
- `GET /api/admin/analytics/sales` - Sales data
- `GET /api/admin/analytics/products` - Product stats

### Admin Users
- `GET /api/admin/admins` - List admin users
- `POST /api/admin/admins` - Create admin user
- `PUT /api/admin/admins/:id` - Update admin user
- `DELETE /api/admin/admins/:id` - Delete admin user

## Next Steps
1. Run database migration
2. Create first admin user
3. Implement backend API
4. Build frontend pages
5. Test and deploy
