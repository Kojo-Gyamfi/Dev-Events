"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";
import { useState } from "react";

const Bookevent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email address");
      return;
    }

    const result = await createBooking({ eventId, slug, email });

    if (result.success) {
      setSubmitted(true);
      posthog.capture("event_booked", { eventId, slug, email });
    } else {
      console.error("Booking creation failed:", result.error);
      const errorMessage =
        result.error &&
        typeof result.error === "object" &&
        "message" in result.error
          ? (result.error as any).message
          : "Unknown error";
      alert(`Booking failed: ${errorMessage}`);
      posthog.captureException("Booking creation failed");
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm"> Thank you for signing up</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
            />
          </div>

          <button className="button-submit" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Bookevent;
