const vehicles = [
  {
    id: 12,
    make: "Toyota",
    model: "Corolla",
    type: "sedan",
    location: "Southport",
    price: 100,
    availability: "available",
  },
  {
    id: 13,
    make: "Mazda",
    model: "CX-5",
    type: "suv",
    location: "Gold Coast",
    price: 130,
    availability: "available",
  },
  {
    id: 14,
    make: "Honda",
    model: "Civic",
    type: "hatch",
    location: "Brisbane",
    price: 90,
    availability: "available",
  },
  {
    id: 15,
    make: "Toyota",
    model: "HiAce",
    type: "van",
    location: "Southport",
    price: 150,
    availability: "unavailable",
  },
  {
    id: 16,
    make: "Ford",
    model: "Mustang",
    type: "convertible",
    location: "Byron Bay",
    price: 220,
    availability: "available",
  },
  {
    id: 17,
    make: "Kia",
    model: "Sportage",
    type: "suv",
    location: "Sydney",
    price: 120,
    availability: "available",
  },
];

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

  const results = vehicles.filter((vehicle) => {
    if (location && vehicle.location !== location) return false;
    if (type && vehicle.type !== type) return false;
    return true;
  });

  return (
    <div className="flex flex-col flex-1">
      <header className="border-b border-black/[.08] px-6 py-4">
        <h1 className="text-2xl font-semibold">East Coast Car Rentals</h1>
      </header>

      <main className="flex flex-1 flex-col gap-6 px-6 py-10">
        <div className="text-sm text-zinc-600">
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
            </div>
          ))}

          {results.length === 0 && <p>No vehicles found.</p>}
        </div>
      </main>
    </div>
  );
}
