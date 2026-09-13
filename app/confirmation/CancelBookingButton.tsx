"use client";

import { useState } from "react";

export default function CancelBookingButton({
  bookingId,
}: {
  bookingId: string;
}) {
  const [cancelled, setCancelled] = useState(false);

  if (cancelled) {
    return (
      <p className="mt-4 text-red-600">This booking has been cancelled.</p>
    );
  }

  return (
    <button
      onClick={async () => {
        await fetch(`/api/bookings/${bookingId}`, { method: "DELETE" });
        setCancelled(true);
      }}
      className="mt-4 rounded bg-red-600 px-4 py-2 text-white"
    >
      Cancel Booking
    </button>
  );
}
