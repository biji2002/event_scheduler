export interface Admin {
  id: string;
  name: string;
  email: string;
}

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  startTime: string | null;
  endTime: string | null;
  admin: Admin;
  bookings: Booking[];
}
