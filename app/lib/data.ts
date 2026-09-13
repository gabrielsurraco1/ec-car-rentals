export type Vehicle = {
  id: number;
  make: string;
  model: string;
  type: string;
  location: string;
  price: number;
};

export const vehicles: Vehicle[] = [
  {
    id: 12,
    make: "Toyota",
    model: "Corolla",
    type: "sedan",
    location: "Southport",
    price: 100,
  },
  {
    id: 13,
    make: "Mazda",
    model: "CX-5",
    type: "suv",
    location: "Gold Coast",
    price: 130,
  },
  {
    id: 14,
    make: "Honda",
    model: "Civic",
    type: "hatch",
    location: "Brisbane",
    price: 90,
  },
  {
    id: 15,
    make: "Toyota",
    model: "HiAce",
    type: "van",
    location: "Southport",
    price: 150,
  },
  {
    id: 16,
    make: "Ford",
    model: "Mustang",
    type: "convertible",
    location: "Byron Bay",
    price: 220,
  },
  {
    id: 17,
    make: "Kia",
    model: "Sportage",
    type: "suv",
    location: "Sydney",
    price: 120,
  },
];

export type Booking = {
  id: number;
  vehicleId: number;
  startDate: string;
  endDate: string;
  customerName: string;
};

// In-memory "database" — resets whenever the server restarts.
export const bookings: Booking[] = [
  {
    id: 1,
    vehicleId: 15,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    customerName: "Existing Customer",
  },
];

let nextBookingId = 2;

export function isVehicleBooked(
  vehicleId: number,
  startDate: string,
  endDate: string
) {
  return bookings.some(
    (booking) =>
      booking.vehicleId === vehicleId &&
      startDate <= booking.endDate &&
      endDate >= booking.startDate
  );
}

export function getAvailableVehicles({
  startDate,
  endDate,
  location,
  type,
}: {
  startDate: string;
  endDate: string;
  location?: string;
  type?: string;
}) {
  return vehicles
    .filter((vehicle) => {
      if (location && vehicle.location !== location) return false;
      if (type && vehicle.type !== type) return false;
      return true;
    })
    .map((vehicle) => ({
      ...vehicle,
      availability: isVehicleBooked(vehicle.id, startDate, endDate)
        ? "booked"
        : "available",
    }));
}

export function createBooking({
  vehicleId,
  startDate,
  endDate,
  customerName,
}: {
  vehicleId: number;
  startDate: string;
  endDate: string;
  customerName: string;
}) {
  const booking: Booking = {
    id: nextBookingId++,
    vehicleId,
    startDate,
    endDate,
    customerName,
  };
  bookings.push(booking);
  return booking;
}

export function cancelBooking(id: number) {
  const index = bookings.findIndex((booking) => booking.id === id);
  if (index !== -1) {
    bookings.splice(index, 1);
  }
}
