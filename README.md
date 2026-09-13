# East Coast Car Rentals

A small Next.js app for searching vehicle availability and booking a car, built for the frontend technical assessment brief in this repo's `CLAUDE.md`.

## Running it locally

1. Install dependencies (inside car-rentals-app - node -v = 22.17.0):
  ```bash
   npm install
  ```
2. Start the dev server:
  ```bash
   npm run dev
  ```
3. Open [http://localhost:3000](http://localhost:3000).

No environment variables, database, or backend setup is needed — the "API" is simulated in-memory (see below), so data resets whenever the dev server restarts.

To run the test suite (covers the booking/cancellation/availability logic in `app/lib/data.ts`):

```bash
npm run test
```



## Approach and key decisions

- **Plain HTML forms wherever possible, instead of client-side JS.** The search form (`/`) and the booking form (`/book`) are regular `<form method="GET">` / `<form method="POST">` submissions. The browser puts the search filters straight into the URL, and the booking form posts directly to the API route and follows its redirect — no `fetch`, no `onSubmit` handlers, no client state for either flow.
- **The URL is the source of truth for search/booking state.** Search filters, the vehicle being booked, and the final booking confirmation are all passed via query params between routes rather than kept in memory on the client. This means every page is shareable/refreshable and matches how a user actually expects browser navigation to behave.
- **One small client component, only where the platform requires it.** Cancelling a booking needs an HTTP `DELETE` request, which an HTML form cannot send. `app/confirmation/CancelBookingButton.tsx` is the only `"use client"` component in the app for exactly this reason.
- **Availability is derived, not stored.** Vehicles don't have a static "available" flag — `getAvailableVehicles()` in `app/lib/data.ts` computes it on every request by checking the in-memory `bookings` array against the requested date range. This is what makes the booking-conflict flow possible: two different requests can get different answers for the same vehicle as bookings come in.



## Trade-offs and shortcuts

- **In-memory "database."** Vehicles and bookings live in a plain array in `app/lib/data.ts`. It resets on every server restart and wouldn't be safe under concurrent server instances (e.g. serverless). Fine for this exercise; a real version would swap this module for a real datastore without changing the route handlers' shapes much.
- **Conflict handling is a redirect, not optimistic UI.** If a vehicle gets booked between search and submission, `POST /api/bookings` redirects back to `/book` with an error flag and a message, rather than doing optimistic UI + rollback (listed as optional in the brief). Kept this simple on purpose.
- **Minimal validation.** Required HTML attributes (`required` on inputs) are the only validation. No date-range sanity checks (e.g. end date after start date), no duplicate-booking checks beyond the availability conflict, no toast/inline field errors.
- **No design system.** Tailwind utility classes directly in each page, no shared button/input components yet (see below for why, and what I'd do next).



## Next.js routing/architecture

Uses the App Router with a real route per step of the flow, not a single client-rendered page:


| Route                            | Purpose                                                              |
| -------------------------------- | -------------------------------------------------------------------- |
| `/`                              | Search form                                                          |
| `/search`                        | Results, filtered from `?start_date&end_date&location&type`          |
| `/book`                          | Booking form for one vehicle, from `?vehicle_id&start_date&end_date` |
| `/confirmation`                  | Booking confirmation + cancel action                                 |
| `GET /api/vehicles/availability` | Mock API: vehicles + computed availability                           |
| `POST /api/bookings`             | Mock API: create a booking, or redirect with a conflict              |
| `DELETE /api/bookings/[id]`      | Mock API: cancel a booking                                           |


Every page except the cancel button is a server component — data is read straight from `app/lib/data.ts` on the server and rendered as HTML, so there's no client-side data-fetching waterfall. `app/search/loading.tsx` provides the loading UI Next.js shows automatically while `/search` is rendering (a small artificial delay was added there specifically to make that state visible during a demo, since the in-memory lookup itself is instant).

## Structuring components for reuse (if this grew into a bigger site)

Right now there's only one shared piece, `app/components/Header.tsx`, extracted because it was being copy-pasted across all four pages. If this were the start of a larger site, the next things I'd pull out are:

- `VehicleCard` — currently inline in `app/search/page.tsx`; would become its own component once it's needed on more than one page (e.g. a "featured vehicles" section on the homepage).
- **Form primitives** (`TextInput`, `Select`, `SubmitButton`) — the same `rounded border border-black/[.15] px-3 py-2` input styling is duplicated across the search and booking forms today. A shared set of form components would remove that duplication and give a single place to update styling/accessibility later.
- **A** `Card` **layout primitive** — the white rounded box with padding and shadow is repeated for the search form, booking form, and confirmation panel.

I didn't extract these now since there's only one or two usages of each and the brief asked to avoid over-engineering for a 2–3 hour scope — but they're the obvious first candidates.

## AI usage notes

AI was used to generate dummy data for vehicles, locations, and vehicle types, create the Vitest test cases, and help write this README.