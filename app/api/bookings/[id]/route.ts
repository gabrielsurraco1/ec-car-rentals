import { NextResponse } from "next/server";
import { cancelBooking } from "@/app/lib/data";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  cancelBooking(Number(id));

  return NextResponse.json({ booking_id: Number(id), status: "cancelled" });
}
