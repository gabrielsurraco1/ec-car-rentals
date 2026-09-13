import { vehicles } from "@/app/lib/data";
import CancelBookingButton from "./CancelBookingButton";

type ConfirmationPageProps = {
  searchParams: Promise<{
    booking_id?: string;
    vehicle_id?: string;
    start_date?: string;
    end_date?: string;
    customer_name?: string;
  }>;
};

export default async function ConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const { booking_id, vehicle_id, start_date, end_date, customer_name } =
    await searchParams;

  const vehicle = vehicles.find((v) => v.id === Number(vehicle_id));

  return (
    <div className="flex flex-col flex-1">
      <header className="border-b border-black/[.08] px-6 py-4">
        <h1 className="text-2xl font-semibold">East Coast Car Rentals</h1>
      </header>

      <main className="flex flex-1 justify-center px-6 py-10">
        <div className="w-full max-w-md rounded-lg bg-white p-6 text-zinc-900 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Booking Confirmed!</h2>
          <p>Booking ID: {booking_id}</p>
          {vehicle && (
            <p>
              Vehicle: {vehicle.make} {vehicle.model}
            </p>
          )}
          <p>Name: {customer_name}</p>
          <p>Start date: {start_date}</p>
          <p>End date: {end_date}</p>

          {booking_id && <CancelBookingButton bookingId={booking_id} />}
        </div>
      </main>
    </div>
  );
}
