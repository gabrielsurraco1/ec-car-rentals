import { NextRequest, NextResponse } from "next/server";
import { getAvailableVehicles } from "@/app/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const vehicles = getAvailableVehicles({
    startDate: searchParams.get("start_date") ?? "",
    endDate: searchParams.get("end_date") ?? "",
    location: searchParams.get("location") ?? undefined,
    type: searchParams.get("type") ?? undefined,
  });

  return NextResponse.json(vehicles);
}
