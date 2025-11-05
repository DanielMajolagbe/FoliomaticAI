/**
 * Email Configuration:
 * Using Brevo (formerly Sendinblue) for transactional emails
 * API Key is stored in environment variable for security
 */

import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Brevo API configuration
const BREVO_API_KEY = "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";
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-11b0a9ff/health", (c) => {
  return c.json({ status: "ok" });
});

// Waitlist signup endpoint
app.post("/make-server-11b0a9ff/waitlist", async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return c.json({ error: "Invalid email address" }, 400);
    }

    // Get current waitlist
    const waitlistData = await kv.get("waitlist_emails");
    let waitlist: string[] = waitlistData ? JSON.parse(waitlistData as string) : [];

    // Check if email already exists
    if (waitlist.includes(email)) {
      return c.json({ error: "Email already on waitlist" }, 400);
    }

    // Add new email
    waitlist.push(email);
    await kv.set("waitlist_emails", JSON.stringify(waitlist));

    // Send emails using Brevo
    try {
      console.log(`Attempting to send confirmation email to: ${email}`);
      await sendConfirmationEmail(email);
      console.log("Confirmation email sent successfully via Brevo");
      
      console.log(`Attempting to send admin notification for ${waitlist.length} emails`);
      await sendAdminNotification(email, waitlist.length);
      console.log("Admin notification sent successfully via Brevo");
    } catch (emailError) {
      console.error("Email sending error details:", emailError);
      console.error("Error message:", emailError instanceof Error ? emailError.message : String(emailError));
      // Continue even if email fails - user is still added to waitlist
    }

    return c.json({ 
      success: true, 
      message: "Successfully joined waitlist",
      count: waitlist.length
    });
  } catch (error) {
    console.error("Waitlist signup error:", error);
    return c.json({ error: "Failed to join waitlist" }, 500);
  }
});

// Send confirmation email to user using Brevo
async function sendConfirmationEmail(userEmail: string) {
  const emailData = {
    sender: {
      name: "Foliomatic AI",
      email: "noreply@foliomaticai.com"
    },
    to: [
      {
        email: userEmail,
        name: userEmail.split('@')[0]
      }
    ],
    subject: "Welcome to Foliomatic AI Waitlist! 🎉",
    htmlContent: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container {
              background: #ffffff;
              border-radius: 16px;
              padding: 40px;
              box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 32px;
              font-weight: bold;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              margin-bottom: 10px;
            }
            .content {
              margin: 30px 0;
            }
            .content h1 {
              color: #1a202c;
              font-size: 24px;
              margin-bottom: 20px;
            }
            .content p {
              color: #4a5568;
              margin-bottom: 15px;
              font-size: 16px;
            }
            .highlight-box {
              background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
              border-left: 4px solid #667eea;
              padding: 20px;
              border-radius: 8px;
              margin: 25px 0;
            }
            .features {
              margin: 25px 0;
            }
            .feature-item {
              display: flex;
              align-items: flex-start;
              margin: 15px 0;
            }
            .feature-icon {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: inline-flex;
              align-items: center;
              justify-center;
              margin-right: 12px;
              flex-shrink: 0;
              font-size: 14px;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              text-align: center;
              color: #718096;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">✨ Foliomatic AI</div>
              <p style="color: #718096; margin: 0;">Transform Your CV Into a Stunning Portfolio</p>
            </div>
            
            <div class="content">
              <h1>Thank you for joining our waitlist! 🚀</h1>
              
              <p>We're thrilled to have you on board! You've successfully joined the exclusive Foliomatic AI waitlist.</p>
              
              <div class="highlight-box">
                <p style="margin: 0;"><strong>What happens next?</strong></p>
                <p style="margin: 10px 0 0 0;">You'll be among the first to know when our beta launches. We'll send you an email with early access and special perks for being an early supporter!</p>
              </div>
              
              <div class="features">
                <p><strong>What you can expect from Foliomatic AI:</strong></p>
                
                <div class="feature-item">
                  <span class="feature-icon">✓</span>
                  <span><strong>AI-Powered Parsing:</strong> Automatically extract and organize your CV information</span>
                </div>
                
                <div class="feature-item">
                  <span class="feature-icon">✓</span>
                  <span><strong>Instant Generation:</strong> Create stunning portfolios in seconds</span>
                </div>
                
                <div class="feature-item">
                  <span class="feature-icon">✓</span>
                  <span><strong>Professional Templates:</strong> Multiple beautiful, responsive designs</span>
                </div>
                
                <div class="feature-item">
                  <span class="feature-icon">✓</span>
                  <span><strong>Privacy First:</strong> Your data is secure and never stored</span>
                </div>
              </div>
              
              <p style="margin-top: 25px;">In the meantime, feel free to follow our journey and stay updated on our progress!</p>
            </div>
            
            <div class="footer">
              <p>Thank you for your interest in Foliomatic AI!</p>
              <p>We can't wait to help you create an amazing portfolio.</p>
              <p style="margin-top: 20px; color: #a0aec0; font-size: 12px;">
                You're receiving this email because you signed up for the Foliomatic AI waitlist.
              </p>
            </div>
          </div>
        </body>
      </html>
    `
  };

  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`Brevo API error response: Status ${response.status}: ${error}`);
    throw new Error(`Failed to send confirmation email: ${error}`);
  }

  const result = await response.json();
  console.log("Brevo confirmation email sent:", result);
  return result;
}

// Send admin notification
async function sendAdminNotification(newEmail: string, totalCount: number) {
  const emailData = {
    sender: {
      name: "Foliomatic AI System",
      email: "noreply@foliomaticai.com"
    },
    to: [
      {
        email: "majolagbedaniel@gmail.com",
        name: "Admin"
      }
    ],
    subject: `🎯 New Waitlist Signup - Total: ${totalCount}`,
    htmlContent: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: #f7fafc;
              border-radius: 8px;
              padding: 30px;
              border: 2px solid #667eea;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .info-row {
              padding: 15px;
              background: white;
              margin: 10px 0;
              border-radius: 6px;
              border-left: 4px solid #667eea;
            }
            .label {
              font-weight: bold;
              color: #667eea;
              margin-bottom: 5px;
            }
            .value {
              color: #1a202c;
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New Waitlist Signup! 🎉</h1>
            </div>
            
            <div class="info-row">
              <div class="label">New Email:</div>
              <div class="value">${newEmail}</div>
            </div>
            
            <div class="info-row">
              <div class="label">Total Signups:</div>
              <div class="value">${totalCount}</div>
            </div>
            
            <div class="info-row">
              <div class="label">Date & Time:</div>
              <div class="value">${new Date().toLocaleString()}</div>
            </div>
            
            <p style="margin-top: 20px; color: #718096; font-size: 14px;">
              This is an automated notification from Foliomatic AI waitlist system.
            </p>
          </div>
        </body>
      </html>
    `
  };

  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`Brevo admin API error response: Status ${response.status}: ${error}`);
    throw new Error(`Failed to send admin notification: ${error}`);
  }

  const result = await response.json();
  console.log("Brevo admin notification sent:", result);
  return result;
}

Deno.serve(app.fetch);
