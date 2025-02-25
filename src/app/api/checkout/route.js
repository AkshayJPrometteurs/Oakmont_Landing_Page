import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { amount, currency } = await req.json();

        // Create a Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            description: "Software developer payment testing",
            automatic_payment_methods: { enabled: true },
            shipping: {
                name: "Rahul Sharma",
                address: {
                    line1: "501, Sunflower Apartments",
                    line2: "Sector 17",
                    city: "Mumbai",
                    state: "Maharashtra",
                    postal_code: "400001",
                    country: "IN",
                },
            },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
