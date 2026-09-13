import Link from "next/link";
import { getAvailableVehicles } from "@/app/lib/data";
import Header from "@/app/components/Header";

type SearchPageProps = {
  searchParams: Promise<{
    start_date?: string;
    end_date?: string;
    location?: string;
    type?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { start_date, end_date, location, type } = await searchParams;

  const results = getAvailableVehicles({
    startDate: start_date ?? "",
    endDate: end_date ?? "",
    location,
    type,
  });

  return (
    <div className="flex flex-col flex-1">
      <Header />

      <main className="flex flex-1 flex-col gap-6 px-6 py-10">
        <div className="text-sm opacity-70">
          <p>Start date: {start_date}</p>
          <p>End date: {end_date}</p>
          <p>Location: {location}</p>
          <p>Vehicle type: {type}</p>
        </div>

        <div className="flex flex-col gap-4">
          {results.map((vehicle) => (
            <div
              key={vehicle.id}
              className="rounded border border-black/[.1] p-4"
            >
              <h2 className="text-lg font-medium">
                {vehicle.make} {vehicle.model}
              </h2>
              <p>Type: {vehicle.type}</p>
              <p>Location: {vehicle.location}</p>
              <p>Price: ${vehicle.price}/day</p>
              <p>Availability: {vehicle.availability}</p>

              {vehicle.availability === "available" ? (
                <Link
                  href={`/book?vehicle_id=${vehicle.id}&start_date=${start_date}&end_date=${end_date}`}
                  className="mt-2 inline-block rounded bg-black px-4 py-2 text-white"
                >
                  Book Now
                </Link>
              ) : (
                <p className="mt-2 text-red-600">Not available for these dates</p>
              )}
            </div>
          ))}

          {results.length === 0 && <p>No vehicles found.</p>}
        </div>
      </main>
    </div>
  );
}
