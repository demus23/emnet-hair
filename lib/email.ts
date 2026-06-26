import nodemailer from "nodemailer";

const emailHost = process.env.EMAIL_HOST || "smtp.gmail.com";
const emailPort = Number(process.env.EMAIL_PORT || 465);

const transporter = nodemailer.createTransport({
  host: emailHost,
  port: emailPort,
  secure: emailPort === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function money(amount: number) {
  return `AED ${Number(amount || 0).toFixed(2)}`;
}

function orderItemsHtml(items: any[]) {
  return items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee;">
            ${item.name} × ${item.quantity || 1}
          </td>
          <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">
            ${money((item.price || 0) * (item.quantity || 1))}
          </td>
        </tr>
      `
    )
    .join("");
}

export async function sendCustomerOrderEmail(order: any) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("Email env missing. Skipping customer email.");
    return;
  }

  if (!order.customerEmail) {
    console.log("No customer email. Skipping customer email.");
    return;
  }

  await transporter.sendMail({
    from: `"Emnet Hair" <${process.env.EMAIL_USER}>`,
    to: order.customerEmail,
    subject: "Your Emnet Hair order confirmation",
    html: `
      <div style="font-family:Arial,sans-serif;background:#fbf6ef;padding:30px;color:#2C2018;">
        <div style="max-width:650px;margin:auto;background:white;border-radius:24px;padding:30px;">
          <p style="letter-spacing:4px;color:#C9A978;font-weight:bold;text-transform:uppercase;">
            Order Confirmed
          </p>

          <h1 style="color:#8b3a4a;">Thank you for your order</h1>

          <p>Hello ${order.customerName || "Customer"},</p>

          <p>Your Emnet Hair order has been received successfully.</p>

          <p><strong>Order ID:</strong><br/>${order.stripeSessionId}</p>
          <p><strong>Status:</strong> ${order.status}</p>

          <table style="width:100%;border-collapse:collapse;margin-top:20px;">
            ${orderItemsHtml(order.items || [])}
          </table>

          <h2 style="text-align:right;color:#8b3a4a;">
            Total: ${money(order.totalAmount)}
          </h2>

          <div style="margin-top:25px;background:#fbf6ef;border-radius:18px;padding:18px;">
            <h3>Delivery Details</h3>
            <p>
              ${order.shipping?.fullName || ""}<br/>
              ${order.shipping?.phone || ""}<br/>
              ${order.shipping?.address || ""}<br/>
              ${order.shipping?.city || ""}, ${order.shipping?.country || ""}
            </p>
          </div>

          <p style="margin-top:25px;">
            We will contact you soon on WhatsApp or email for delivery updates.
          </p>

          <p style="color:#8b3a4a;font-weight:bold;">Emnet Hair</p>
        </div>
      </div>
    `,
  });
}

export async function sendAdminNewOrderEmail(order: any) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.ADMIN_EMAIL) {
    console.log("Admin email env missing. Skipping admin email.");
    return;
  }

  await transporter.sendMail({
    from: `"Emnet Hair Website" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "New Emnet Hair order received",
    html: `
      <div style="font-family:Arial,sans-serif;background:#fbf6ef;padding:30px;color:#2C2018;">
        <div style="max-width:650px;margin:auto;background:white;border-radius:24px;padding:30px;">
          <h1 style="color:#8b3a4a;">New Order Received</h1>

          <p><strong>Order ID:</strong><br/>${order.stripeSessionId}</p>
          <p><strong>Status:</strong> ${order.status}</p>

          <h3>Customer</h3>
          <p>
            ${order.customerName || ""}<br/>
            ${order.customerEmail || ""}<br/>
            ${order.shipping?.phone || ""}
          </p>

          <h3>Delivery</h3>
          <p>
            ${order.shipping?.address || ""}<br/>
            ${order.shipping?.city || ""}, ${order.shipping?.country || ""}<br/>
            Notes: ${order.shipping?.notes || "None"}
          </p>

          <table style="width:100%;border-collapse:collapse;margin-top:20px;">
            ${orderItemsHtml(order.items || [])}
          </table>

          <h2 style="text-align:right;color:#8b3a4a;">
            Total: ${money(order.totalAmount)}
          </h2>
        </div>
      </div>
    `,
  });
}

export async function sendOrderStatusEmail(order: any) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !order.customerEmail) {
    console.log("Email missing. Skipping status email.");
    return;
  }

  await transporter.sendMail({
    from: `"Emnet Hair" <${process.env.EMAIL_USER}>`,
    to: order.customerEmail,
    subject: `Your Emnet Hair order is ${order.status}`,
    html: `
      <div style="font-family:Arial,sans-serif;background:#fbf6ef;padding:30px;color:#2C2018;">
        <div style="max-width:650px;margin:auto;background:white;border-radius:24px;padding:30px;">
          <h1 style="color:#8b3a4a;">Order Update</h1>

          <p>Hello ${order.customerName || "Customer"},</p>

          <p>Your order status is now:</p>

          <h2 style="color:#8b3a4a;text-transform:capitalize;">${order.status}</h2>

          <p><strong>Order ID:</strong><br/>${order.stripeSessionId}</p>

          <p>Thank you for shopping with Emnet Hair.</p>
        </div>
      </div>
    `,
  });
}

export async function sendNewOrderEmails(order: any) {
  await sendCustomerOrderEmail(order);
  await sendAdminNewOrderEmail(order);
}