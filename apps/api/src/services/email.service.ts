import { Resend } from 'resend';
import { config } from '@config/env';
import { Order, OrderItem, Product } from '@prisma/client';
import { logger } from '@utils/logger';

const resend = new Resend(config.email.apiKey);

export class EmailService {
  async sendOrderConfirmation(order: Order & { items: (OrderItem & { product: Product })[] }) {
    try {
      logger.info(`Attempting to send email to ${order.customerEmail} from ${config.email.from}`);
      
      const response = await resend.emails.send({
        from: config.email.from,
        to: [order.customerEmail],
        subject: `Order Confirmation - ${order.trackingId}`,
        html: this.generateOrderEmailHtml(order),
      });

      logger.info('Resend API Response:', { response });

      if (!response) {
        logger.error('Resend API returned no response');
        return false;
      }

      if (response.error) {
        logger.error('Resend API Error:', response.error);
        return false;
      }

      logger.info(`Order confirmation email sent successfully to ${order.customerEmail}`, { id: response.data?.id });
      return true;
    } catch (err) {
      logger.error('Exception sending email:', err);
      return false;
    }
  }

  private generateOrderEmailHtml(order: Order & { items: (OrderItem & { product: Product })[] }): string {
    const itemsHtml = order.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 16px 0; border-bottom: 1px solid #e5e5e5;">
          <div style="display: flex; align-items: center;">
            ${item.product.imageUrl ? `<img src="${item.product.imageUrl}" alt="${item.name}" style="width: 60px; height: 80px; object-fit: cover; margin-right: 16px; border-radius: 4px;" />` : ''}
            <div>
              <div style="font-weight: 600; font-size: 14px; color: #171717;">${item.name}</div>
              <div style="color: #737373; font-size: 12px; margin-top: 4px;">Qty: ${item.quantity}</div>
            </div>
          </div>
        </td>
        <td style="padding: 16px 0; border-bottom: 1px solid #e5e5e5; text-align: right; vertical-align: middle; font-weight: 500;">
          ₹${item.total}
        </td>
      </tr>
    `
      )
      .join('');

    const shippingAddress = order.shippingAddress as any;
    const addressHtml = `
      <div style="color: #404040; font-size: 14px; line-height: 1.6;">
        <div style="font-weight: 600; color: #171717; margin-bottom: 4px;">${shippingAddress.fullName}</div>
        ${shippingAddress.addressLine1}<br>
        ${shippingAddress.addressLine2 ? `${shippingAddress.addressLine2}<br>` : ''}
        ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.pincode}<br>
        ${shippingAddress.country}<br>
        <div style="margin-top: 8px; color: #737373;">${shippingAddress.phone}</div>
      </div>
    `;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #171717; margin: 0; padding: 0; background-color: #ffffff; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { text-align: center; margin-bottom: 48px; }
          .logo { font-family: 'Times New Roman', serif; font-size: 24px; font-weight: bold; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 8px; }
          .subtitle { font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #737373; }
          .confirmation-box { text-align: center; margin-bottom: 48px; }
          .h1 { font-family: 'Times New Roman', serif; font-size: 32px; font-weight: 400; margin: 0 0 16px 0; color: #171717; }
          .order-id { background-color: #f5f5f5; display: inline-block; padding: 8px 16px; border-radius: 4px; font-family: monospace; font-size: 14px; letter-spacing: 0.05em; margin-top: 16px; }
          .section-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #737373; border-bottom: 1px solid #171717; padding-bottom: 12px; margin-bottom: 24px; }
          .summary-table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
          .totals-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          .totals-row td { padding: 8px 0; color: #404040; font-size: 14px; }
          .final-total td { padding-top: 16px; border-top: 1px solid #e5e5e5; font-weight: 600; font-size: 16px; color: #171717; }
          .footer { text-align: center; font-size: 12px; color: #a3a3a3; margin-top: 64px; border-top: 1px solid #f5f5f5; padding-top: 32px; }
          .button { display: inline-block; background-color: #171717; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 9999px; font-weight: 500; font-size: 14px; margin-top: 32px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">CrestSports</div>
            <div class="subtitle">Premium Sportswear</div>
          </div>

          <div class="confirmation-box">
            <h1 class="h1">Order Confirmed</h1>
            <p style="color: #404040; margin: 0;">Thank you for your purchase, ${order.customerName.split(' ')[0]}.</p>
            <p style="color: #404040; margin: 4px 0 0 0;">We've received your order and will notify you when it ships.</p>
            <div class="order-id">Order #${order.trackingId}</div>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/track-order?id=${order.trackingId}" class="button" style="color: #ffffff !important; text-decoration: none;">Track Order</a>
          </div>

          <div class="order-details">
            <div class="section-title">Order Summary</div>
            <table class="summary-table">
              ${itemsHtml}
            </table>

            <table class="totals-table">
              <tr class="totals-row">
                <td style="text-align: right; padding-right: 24px;">Subtotal</td>
                <td style="text-align: right; width: 100px;">₹${order.subtotal}</td>
              </tr>
              <tr class="totals-row">
                <td style="text-align: right; padding-right: 24px;">Shipping</td>
                <td style="text-align: right; width: 100px;">${order.shippingCost === 0 ? 'Free' : `₹${order.shippingCost}`}</td>
              </tr>
              <tr class="totals-row final-total">
                <td style="text-align: right; padding-right: 24px;">Total</td>
                <td style="text-align: right; width: 100px;">₹${order.total}</td>
              </tr>
            </table>
          </div>

          <div class="shipping-details" style="margin-top: 48px;">
            <div class="section-title">Shipping Address</div>
            ${addressHtml}
          </div>

          <div class="footer">
            <p>Questions? Reply to this email or contact support.</p>
            <p>&copy; ${new Date().getFullYear()} CrestSports. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export default new EmailService();
