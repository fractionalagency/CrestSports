# Admin Section Setup Checklist

## 1. Database Migration
Run the following command to update your database schema with the new Admin tables:

```bash
cd apps/api
npx prisma migrate dev --name add_admin_tables
npx prisma generate
```

## 2. Create First Admin User
Run the script to create your initial admin account:

```bash
cd apps/api
npx tsx scripts/create-admin.ts
```
Follow the prompts to enter email, name, and password.

## 3. Environment Variables
Ensure your `.env` files are set up correctly.

**apps/api/.env**:
```
JWT_SECRET=your_secure_secret_key
JWT_EXPIRES_IN=7d
```

**apps/web/.env.local**:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## 4. Start the Server
Start the development server:

```bash
pnpm dev
```

## 5. Access Admin Panel
Navigate to: `http://localhost:3000/admin/login`

Login with the credentials you created in step 2.

## Features Implemented
- 🔐 **Secure Authentication**: JWT-based login with role-based access control (Admin, Manager, Staff).
- 📊 **Dashboard**: Real-time analytics, sales charts, and recent activity.
- 📦 **Product Management**: Create, edit, delete products with image support and category selection.
- 🛍️ **Order Management**: View orders, update status, add tracking numbers, and view timeline.
- 👥 **Team Management**: Invite and manage other admin users.
- ⚙️ **Settings**: Configure store preferences and security settings.
