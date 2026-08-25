import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, service, preferredDate, preferredTime, message } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !service || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: "Missing required booking fields" },
        { status: 400 }
      );
    }

    // Generate unique reference
    const referenceId = "WDS-" + Math.floor(100000 + Math.random() * 900000);

    // In production, integrate with EmailJS, SendGrid, Twilio SMS, or Dental PMS (Dentrix/Curve)
    console.log("Appointment Booked:", {
      referenceId,
      fullName,
      email,
      phone,
      service,
      preferredDate,
      preferredTime,
      message,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Appointment reservation created successfully",
        referenceId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking API Error:", error);
    return NextResponse.json(
      { error: "Internal server error processing appointment" },
      { status: 500 }
    );
  }
}
