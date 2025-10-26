# PROJECT OVERVIEW

## 🛍 E-Commerce Platform (Next.js + Supabase + Razorpay)

### 🧱 Tech Stack

**Frontend:**

* Next.js (App Router)
* Tailwind CSS
* shadcn/ui (UI components)
* Zustand (State management)

**Backend / API:**

* Turborepo structure with separate `/api` app
* Prisma ORM
* Supabase (Postgres DB + Storage)
* Razorpay (Payment Gateway)
* Zod (Validation)

**Other Integrations:**

* Resend / Postmark (Transactional emails)
* UUID / NanoID (Tracking IDs)
* Vercel (Deployment)

---

## 🧩 Architecture

```
root/
├── apps/
│   ├── web/                 # Frontend (Next.js + Zustand + Tailwind + shadcn)
│   └── api/                 # Backend (Prisma + Supabase + Razorpay)
├── packages/
│   ├── ui/                  # Shared UI components
│   └── utils/               # Shared schemas, types, helpers
├── prisma/                  # Prisma schema + migrations
└── .env                     # Environment variables
```

---

## ⚙️ Core Features

### 1. **Product Browsing**

* Fetch products from Supabase database
* Product images hosted on Supabase Storage
* Search and filter features

### 2. **Cart & Checkout (Guest Flow)**

* Cart stored via Zustand
* User enters minimal info: name, phone, email, address
* Checkout triggers `/api/checkout`
* Razorpay order created and payment link returned

### 3. **Order Handling**

* Order saved in Supabase (via Prisma)
* Order status: `pending` → `paid` → `shipped` → `delivered`
* Unique tracking ID generated per order (UUID/NanoID)
* Confirmation email sent with tracking link

### 4. **Payment Flow (Razorpay)**

1. Client calls `/api/checkout`
2. Backend creates Razorpay order
3. Razorpay popup handles payment
4. `/api/verify-payment` verifies signature
5. Order status updated + confirmation email sent

### 5. **Order Tracking**

* `/track/[id]` route to allow users to view order details
* Email includes a direct link with tracking ID

### 6. **Admin Dashboard (Future Scope)**

* Protected backend route for managing products, orders, and inventory
* Possible Supabase Auth integration for admin access

---

## 🧰 Development Notes

**Validation:**

* Use Zod for validating form inputs and API requests

**Emailing:**

* Use Resend/Postmark for transactional emails (confirmation, status updates)

**Error Handling:**

* Graceful UI fallbacks using error boundaries in Next.js
* Centralized error logging (optionally integrate Sentry)

**Deployment:**

* Web app deployed on Vercel
* Supabase manages DB, Auth (optional), and Storage
* Razorpay handles payments

---

## 🚀 Next Steps

1. Initialize Turborepo structure (`apps/web`, `apps/api`)
2. Configure Supabase + Prisma
3. Integrate Razorpay SDK in backend and frontend
4. Build product listing and checkout flow
5. Add email + tracking system
6. Test full purchase → tracking → delivery cycle

---

## 📦 Future Enhancements

* Admin panel for order management
* Discount codes / coupons
* Wishlist & user accounts (optional later)
* Analytics dashboard (PostHog / Vercel Analytics)
* PWA setup for mobile users
