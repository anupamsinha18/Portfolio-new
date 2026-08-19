import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields (name, email, message) are required." },
        { status: 400 }
      );
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Log the contact submission
    console.log("=== NEW CONTACT DISPATCH ===");
    console.log(`From: ${name} <${email}>`);
    console.log(`Message:\n${message}`);
    console.log("============================");

    // If WEB3FORMS_KEY environment variable is set, forward to Web3Forms
    if (process.env.WEB3FORMS_KEY) {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_KEY,
          name,
          email,
          message,
          subject: `Portfolio Contact from ${name}`,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        return NextResponse.json(
          { success: false, error: data.message || "Failed to dispatch email via provider." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Message received successfully! We will get back to you shortly.",
    });
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while dispatching the message." },
      { status: 500 }
    );
  }
}
