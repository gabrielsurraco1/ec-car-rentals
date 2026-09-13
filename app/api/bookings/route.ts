import { NextRequest, NextResponse } from "next/server";
import { createBooking, isVehicleBooked } from "@/app/lib/data";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const vehicleId = Number(formData.get("vehicle_id"));
  const startDate = String(formData.get("start_date"));
  const endDate = String(formData.get("end_date"));
  const customerName = String(formData.get("customer_name"));

  if (isVehicleBooked(vehicleId, startDate, endDate)) {
    const params = new URLSearchParams({
      vehicle_id: String(vehicleId),
      start_date: startDate,
      end_date: endDate,
      error: "unavailable",
    });

    return NextResponse.redirect(new URL(`/book?${params}`, request.url), 303);
  }

  const booking = createBooking({ vehicleId, startDate, endDate, customerName });

  const params = new URLSearchParams({
    booking_id: String(booking.id),
    vehicle_id: String(vehicleId),
    start_date: startDate,
    end_date: endDate,
    customer_name: customerName,
  });

  return NextResponse.redirect(new URL(`/confirmation?${params}`, request.url), 303);
}
