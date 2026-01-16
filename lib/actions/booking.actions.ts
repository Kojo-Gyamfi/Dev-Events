"use server";

import { Booking } from "@/database";
import connectDB from "../mongodb";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    console.log("Creating booking:", { eventId, slug, email });

    await connectDB();

    const booking = await Booking.create({ eventId, slug, email });
    console.log("Booking created successfully:", booking);

    return { success: true };
  } catch (e) {
    console.error("create booking failed:", e);
    return { success: false, error: e };
  }
};
