import { vehicles } from "@/app/lib/data";
import Header from "@/app/components/Header";

type BookPageProps = {
  searchParams: Promise<{
    vehicle_id?: string;
    start_date?: string;
    end_date?: string;
    error?: string;
  }>;
};

export default async function BookPage({ searchParams }: BookPageProps) {
  const { vehicle_id, start_date, end_date, error } = await searchParams;

  const vehicle = vehicles.find((v) => v.id === Number(vehicle_id));

  return (
    <div className="flex flex-col flex-1">
      <Header />

      <main className="flex flex-1 justify-center px-6 py-10">
        <div className="w-full max-w-md">
          {error === "unavailable" && (
            <p className="mb-4 rounded bg-red-100 p-3 text-red-700">
              Sorry, this vehicle was just booked by someone else. Please go
              back and choose another one.
            </p>
          )}

          {vehicle ? (
            <>
              <h2 className="mb-1 text-lg font-medium">
                {vehicle.make} {vehicle.model}
              </h2>
              <p className="text-sm opacity-70">
                {start_date} to {end_date}
              </p>
              <p className="mb-4 text-sm opacity-70">${vehicle.price}/day</p>

              <form
                action="/api/bookings"
                method="POST"
                className="flex flex-col gap-4 rounded-lg bg-white p-6 text-zinc-900 shadow-sm"
              >
                <input type="hidden" name="vehicle_id" value={vehicle.id} />
                <input type="hidden" name="start_date" value={start_date} />
                <input type="hidden" name="end_date" value={end_date} />

                <div className="flex flex-col gap-1">
                  <label htmlFor="customer_name">Your Name</label>
                  <input
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    required
                    className="rounded border border-black/[.15] px-3 py-2"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 rounded bg-black px-4 py-2 text-white"
                >
                  Confirm Booking
                </button>
              </form>
            </>
          ) : (
            <p>Vehicle not found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
