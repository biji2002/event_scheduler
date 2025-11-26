// frontend/src/pages/EventList.tsx
import React, { useEffect, useState } from "react";
import api from "../api/axiosClient";
import "./EventList.css"; // <-- Add this line (you create this file)

interface Admin {
  id: string;
  name: string;
  email: string;
}

interface Booking {
  id: string;
  userId?: string;
  eventId?: string;
}

interface EventItem {
  id: string;
  title: string;
  description: string | null;
  date: string | null;
  location?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  admin?: Admin | null;
  
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get<EventItem[]>("/events");

        if (Array.isArray(res.data)) setEvents(res.data);
        else if (Array.isArray((res.data as any).events)) setEvents((res.data as any).events);
        else setEvents([]);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading)
    return (
      <div className="event-loading">
        <div className="spinner"></div>
        <p>Loading events...</p>
      </div>
    );

  return (
    <div className="event-container">
      <h2 className="event-title">Upcoming Events</h2>

      {error && <p className="event-error">⚠ {error}</p>}

      {events.length === 0 ? (
        <p className="no-events">No events found.</p>
      ) : (
        <div className="event-grid">
          {events.map((event) => (
            <div className="event-card" key={event.id}>
              <h3 className="event-card-title">{event.title}</h3>
              <p className="event-desc">{event.description}</p>

              <div className="event-info">
                <p><strong>Date:</strong> {event.date?.substring(0, 10) || "N/A"}</p>
                <p><strong>Location:</strong> {event.location || "—"}</p>
                <p><strong>Organizer:</strong> {event.admin?.name || "—"}</p>
                <p><strong>Start:</strong> {event.startTime ? new Date(event.startTime).toLocaleTimeString() : "N/A"}</p>
                <p><strong>End:</strong> {event.endTime ? new Date(event.endTime).toLocaleTimeString() : "N/A"}</p>
              </div>

              <div className="event-footer">
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
