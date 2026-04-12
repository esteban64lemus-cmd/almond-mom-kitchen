import Stripe from "stripe";
import { getDb } from "./db";
import { orders, subscriptions } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

/**
 * Create a checkout session for one-time purchases
 */
export async function createCheckoutSession(
  userId: number,
  productId: string,
  priceId: string,
  origin: string,
  userEmail?: string,
  userName?: string
) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: userEmail,
      client_reference_id: userId.toString(),
      metadata: {
        user_id: userId.toString(),
        product_id: productId,
        customer_email: userEmail || "",
        customer_name: userName || "",
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products`,
      allow_promotion_codes: true,
    });

    return session;
  } catch (error) {
    console.error("[Stripe] Error creating checkout session:", error);
    throw error;
  }
}

/**
 * Create a checkout session for subscriptions
 */
export async function createSubscriptionCheckoutSession(
  userId: number,
  productId: string,
  priceId: string,
  origin: string,
  userEmail?: string,
  userName?: string
) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer_email: userEmail,
      client_reference_id: userId.toString(),
      metadata: {
        user_id: userId.toString(),
        product_id: productId,
        customer_email: userEmail || "",
        customer_name: userName || "",
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products`,
      allow_promotion_codes: true,
    });

    return session;
  } catch (error) {
    console.error("[Stripe] Error creating subscription checkout session:", error);
    throw error;
  }
}

/**
 * Handle successful payment
 */
export async function handlePaymentSuccess(
  sessionId: string,
  mode: "payment" | "subscription"
) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const db = await getDb();

    if (!db) {
      console.error("[Stripe] Database not available");
      return;
    }

    const userId = parseInt(session.client_reference_id || "0");
    const productId = session.metadata?.product_id;

    if (!userId || !productId) {
      console.error("[Stripe] Missing user or product ID in session metadata");
      return;
    }

    if (mode === "payment") {
      // Create order record
      await db.insert(orders).values({
        userId,
        productId: parseInt(productId),
        stripePaymentIntentId: (session.payment_intent as string) || "",
        stripeCheckoutSessionId: sessionId,
        amount: session.amount_total || 0,
        currency: ((session.currency || "usd") as string).toUpperCase(),
        status: "completed",
      });

      console.log(`[Stripe] Payment completed for user ${userId}, product ${productId}`);
    } else if (mode === "subscription") {
      // Create subscription record
      const sess = session as any;
      const subscription = await stripe.subscriptions.retrieve(
        sess.subscription as string
      );

      const sub = subscription as any;
      await db.insert(subscriptions).values({
        userId,
        productId: parseInt(productId),
        stripeSubscriptionId: sub.id,
        stripeCustomerId: (sub.customer as string) || "",
        status: "active",
        currentPeriodStart: sub.current_period_start ? new Date(sub.current_period_start * 1000) : new Date(),
        currentPeriodEnd: sub.current_period_end ? new Date(sub.current_period_end * 1000) : new Date(),
      });

      console.log(`[Stripe] Subscription created for user ${userId}, product ${productId}`);
    }
  } catch (error) {
    console.error("[Stripe] Error handling payment success:", error);
    throw error;
  }
}

/**
 * Handle subscription updates
 */
export async function handleSubscriptionUpdate(stripeSubscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
    const db = await getDb();

    if (!db) {
      console.error("[Stripe] Database not available");
      return;
    }

    // Map Stripe status to our status
    let status: "active" | "paused" | "cancelled" | "expired" = "active";
    if (subscription.status === "paused") status = "paused";
    if (subscription.status === "canceled") status = "cancelled";
    if (subscription.status === "incomplete_expired") status = "expired";

    const sub = subscription as any;
    await db
      .update(subscriptions)
      .set({
        status,
        currentPeriodStart: sub.current_period_start ? new Date(sub.current_period_start * 1000) : new Date(),
        currentPeriodEnd: sub.current_period_end ? new Date(sub.current_period_end * 1000) : new Date(),
      })
      .where(eq(subscriptions.stripeSubscriptionId, stripeSubscriptionId));

    console.log(`[Stripe] Subscription ${stripeSubscriptionId} updated to status: ${status}`);
  } catch (error) {
    console.error("[Stripe] Error handling subscription update:", error);
    throw error;
  }
}

/**
 * Handle subscription cancellation
 */
export async function handleSubscriptionCancelled(stripeSubscriptionId: string) {
  try {
    const db = await getDb();

    if (!db) {
      console.error("[Stripe] Database not available");
      return;
    }

    await db
      .update(subscriptions)
      .set({
        status: "cancelled",
        cancelledAt: new Date(),
      })
      .where(eq(subscriptions.stripeSubscriptionId, stripeSubscriptionId));

    console.log(`[Stripe] Subscription ${stripeSubscriptionId} cancelled`);
  } catch (error) {
    console.error("[Stripe] Error handling subscription cancellation:", error);
    throw error;
  }
}

export default stripe;
