import Header from "@/app/components/Header";

const locations = [
  "Southport",
  "Gold Coast",
  "Brisbane",
  "Byron Bay",
  "Sydney",
  "Newcastle",
];

const vehicleTypes = ["sedan", "suv", "hatch", "van", "convertible"];

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Header />

      <main className="flex flex-1 justify-center px-6 py-10">
        <form
          action="/search"
          method="GET"
          className="flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-6 text-zinc-900 shadow-sm"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="start_date">Start Date</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              required
              className="rounded border border-black/[.15] px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="end_date">End Date</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              required
              className="rounded border border-black/[.15] px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="location">Location</label>
            <select
              id="location"
              name="location"
              className="rounded border border-black/[.15] px-3 py-2"
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="type">Vehicle Type</label>
            <select
              id="type"
              name="type"
              className="rounded border border-black/[.15] px-3 py-2"
            >
              {vehicleTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="mt-2 rounded bg-black px-4 py-2 text-white"
          >
            Search
          </button>
        </form>
      </main>
    </div>
  );
}
