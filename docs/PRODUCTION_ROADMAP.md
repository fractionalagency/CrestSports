# Production Roadmap: CrestSports

This document outlines the remaining tasks required to transition CrestSports from a development prototype to a fully production-ready e-commerce platform.

## 1. Critical Security & Authentication
*   **Protect Admin Routes**:
    *   Currently, `POST /products` and `DELETE /products/:id` are public.
    *   **Action**: Implement `authMiddleware` to verify JWT tokens and `requireAdmin` middleware to restrict access.
*   **Admin Authentication**:
    *   **Action**: Create a dedicated login flow (e.g., `/admin/login`) for administrators to authenticate and receive tokens for accessing the dashboard.

## 2. Payment Integration (Real Money)
*   **Enable Razorpay**:
    *   Currently, the system bypasses payments (`status: 'PAID'`).
    *   **Action**: Uncomment Razorpay order creation logic in `payment.service.ts` and integrate the Razorpay Checkout script on the frontend.
*   **Webhooks**:
    *   **Action**: Implement `POST /api/v1/payments/webhook` to handle asynchronous payment updates (e.g., ensuring orders are marked as paid even if the user closes the browser early).

## 3. Admin Dashboard (Operations Center)
*   **Real Data Integration**:
    *   Currently, `/dashboard` uses static JSON data.
    *   **Action**: Connect the dashboard to fetch real `Order` and `Product` data from the API.
*   **Product Management UI**:
    *   **Action**: Build forms to Add/Edit products, including image uploading, price setting, and description editing.
*   **Order Management UI**:
    *   **Action**: Build an interface to view orders and manually update statuses (e.g., `PAID` → `SHIPPED` → `DELIVERED`), triggering email notifications.

## 4. Infrastructure & Reliability
*   **Image Hosting**:
    *   Currently relying on external URLs.
    *   **Action**: Implement an Image Upload Service using Supabase Storage or AWS S3 to allow admins to upload product photos directly.
*   **Error Monitoring**:
    *   **Action**: Integrate Sentry or a similar tool to track crashes and API errors in production.
*   **Rate Limiting**:
    *   **Action**: Tune `express-rate-limit` configuration in `apps/api/src/config/env.ts` for production traffic loads.

## 5. Frontend Polish (SEO & UX)
*   **Search & Filtering**:
    *   **Action**: Ensure the header search bar and shop page filters are fully functional and connected to the `GET /products` API.
*   **SEO Metadata**:
    *   **Action**: Implement Next.js `generateMetadata` for product pages to ensure proper OpenGraph tags and social sharing previews.
*   **Loading States**:
    *   **Action**: Add Skeleton loaders for the product grid and cart to prevent layout shifts and improve perceived performance.

## 6. Legal & Compliance
*   **Static Pages**:
    *   **Action**: Create "Terms of Service", "Privacy Policy", and "Refund Policy" pages, which are typically required by payment gateways and for legal compliance.
