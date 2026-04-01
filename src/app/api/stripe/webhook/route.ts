import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      event = getStripe().webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
      );
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const customerId = session.customer as string;

        // TODO: Update user's plan and stripe_customer_id in Supabase
        // e.g. await supabase.from("users").update({ stripe_customer_id: customerId, plan: "pro" }).eq("id", userId);
        console.log(
          `Checkout completed for user ${userId}, customer ${customerId}`
        );
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const priceId = subscription.items.data[0]?.price.id;

        // TODO: Update user plan based on price ID in Supabase
        // Map priceId to plan name and update the user record
        console.log(
          `Subscription updated: ${subscription.id}, price: ${priceId}`
        );
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        // TODO: Downgrade user to free plan in Supabase
        // e.g. await supabase.from("users").update({ plan: "free" }).eq("stripe_customer_id", subscription.customer);
        console.log(`Subscription deleted: ${subscription.id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
