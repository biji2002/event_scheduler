// frontend/src/pages/EventList.tsx
import React, { useEffect, useState } from "react";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

export default function EventList() {
  const [events, setEvents] = useState<any[]>([]);
  const { user } = useAuth();

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatTime = (mins: number) => {
    const h = Math.floor(mins / 60).toString().padStart(2, "0");
    const m = (mins % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Events</h2>

      {user?.role === "ADMIN" && (
        <button onClick={() => (window.location.href = "/add-event")}>
          Add Event
        </button>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {events.map((e) => (
          <li
            key={e.id}
            style={{
              marginBottom: 20,
              padding: 15,
              border: "1px solid #ccc",
              borderRadius: 8,
              background: "#fafafa",
            }}
          >
            <h3 style={{ marginBottom: 5 }}>{e.title}</h3>

            <p style={{ margin: "4px 0", opacity: 0.7 }}>
              {new Date(e.date).toLocaleDateString()}
            </p>

            <p style={{ margin: "4px 0", fontWeight: "bold" }}>
              {formatTime(e.startMinute)} → {formatTime(e.endMinute)}
            </p>

            
            {e.description && (
              <p style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>
                {e.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
