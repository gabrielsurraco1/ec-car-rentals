import { beforeEach, describe, expect, it, vi } from "vitest";
import type * as DataModule from "./data";

// The data module keeps its vehicles/bookings in plain module-level arrays,
// so each test gets a fresh copy by resetting modules and re-importing.
let data: typeof DataModule;

beforeEach(async () => {
  vi.resetModules();
  data = await import("./data");
});

describe("getAvailableVehicles", () => {
  it("marks a vehicle as available when there is no overlapping booking", () => {
    const results = data.getAvailableVehicles({
      startDate: "2027-01-01",
      endDate: "2027-01-05",
    });

    const corolla = results.find((v) => v.id === 12);
    expect(corolla?.availability).toBe("available");
  });

  it("marks the seeded HiAce booking as booked for an overlapping range", () => {
    const results = data.getAvailableVehicles({
      startDate: "2026-06-01",
      endDate: "2026-06-05",
    });

    const hiAce = results.find((v) => v.id === 15);
    expect(hiAce?.availability).toBe("booked");
  });

  it("filters by location and type", () => {
    const results = data.getAvailableVehicles({
      startDate: "2027-01-01",
      endDate: "2027-01-05",
      location: "Gold Coast",
      type: "suv",
    });

    expect(results).toHaveLength(1);
    expect(results[0].id).toBe(13);
  });
});

describe("createBooking", () => {
  it("makes the vehicle unavailable for the booked date range", () => {
    data.createBooking({
      vehicleId: 12,
      startDate: "2027-02-01",
      endDate: "2027-02-05",
      customerName: "Test Customer",
    });

    expect(data.isVehicleBooked(12, "2027-02-01", "2027-02-05")).toBe(true);
    expect(data.isVehicleBooked(12, "2027-02-02", "2027-02-03")).toBe(true);
  });

  it("does not affect the vehicle's availability outside the booked range", () => {
    data.createBooking({
      vehicleId: 12,
      startDate: "2027-02-01",
      endDate: "2027-02-05",
      customerName: "Test Customer",
    });

    expect(data.isVehicleBooked(12, "2027-03-01", "2027-03-05")).toBe(false);
  });

  it("assigns increasing booking ids", () => {
    const first = data.createBooking({
      vehicleId: 12,
      startDate: "2027-02-01",
      endDate: "2027-02-05",
      customerName: "Customer A",
    });
    const second = data.createBooking({
      vehicleId: 13,
      startDate: "2027-02-01",
      endDate: "2027-02-05",
      customerName: "Customer B",
    });

    expect(second.id).toBeGreaterThan(first.id);
  });
});

describe("cancelBooking", () => {
  it("frees up the vehicle again after cancelling", () => {
    const booking = data.createBooking({
      vehicleId: 12,
      startDate: "2027-04-01",
      endDate: "2027-04-05",
      customerName: "Test Customer",
    });

    expect(data.isVehicleBooked(12, "2027-04-01", "2027-04-05")).toBe(true);

    data.cancelBooking(booking.id);

    expect(data.isVehicleBooked(12, "2027-04-01", "2027-04-05")).toBe(false);
  });

  it("does nothing when the booking id does not exist", () => {
    expect(() => data.cancelBooking(999999)).not.toThrow();
  });
});
