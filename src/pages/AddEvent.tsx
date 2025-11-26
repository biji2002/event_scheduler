import React, { useState, useContext, useEffect } from "react";
import api from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import "./AddEvent.css";

export default function AddEvent() {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [errors, setErrors] = useState("");

  const combineDateTime = (dateStr: string, timeStr: string) => {
    return new Date(`${dateStr}T${timeStr}:00`).toISOString();
  };

  const loadEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (error) {
      console.log("Event loading error:", error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const validateForm = () => {
    if (!title || !description || !location || !date || !startTime || !endTime) {
      return "All fields are required.";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date + "T00:00:00");

    if (selectedDate < today) {
      return "Date cannot be in the past.";
    }

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    if (end <= start) {
      return "End time must be after start time.";
    }

   for (const ev of events) {
  const evDate = new Date(ev.date).toISOString().slice(0, 10);

  if (evDate === date) {
    const evStart = new Date(ev.startTime);
    const evEnd = new Date(ev.endTime);

    // Overlap happens if the start is before existing end AND end is after existing start
    const isOverlap = start < evEnd && end > evStart;

    if (isOverlap) {
      return `Another event "${ev.title}" already exists from ${formatTime(
        ev.startTime
      )} to ${formatTime(ev.endTime)}.`;
    }
  }
}


    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors("");

    const validationMsg = validateForm();
    if (validationMsg) {
      setErrors(validationMsg);
      return;
    }

    const startISO = combineDateTime(date, startTime);
    const endISO = combineDateTime(date, endTime);

    try {
      await api.post("/events", {
        title,
        description,
        location,
        date,
        startTime: startISO,
        endTime: endISO,
      });

      alert("Event added successfully!");

      setTitle("");
      setDescription("");
      setLocation("");
      setDate("");
      setStartTime("");
      setEndTime("");
      loadEvents();
    } catch (err: any) {
      console.error("EVENT ADD ERROR:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to add event");
    }
  };

  const deleteEvent = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/events/${id}`);
      loadEvents();
    } catch (error) {
      alert("Failed to delete event");
    }
  };

  const formatTime = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="add-event-container">
      <h2>Add Event (Admin Only)</h2>

      {errors && <div className="error-box">{errors}</div>}

      {user?.role === "ADMIN" ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea className="form-textarea" value={description} onChange={e => setDescription(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input className="form-input" value={location} onChange={e => setLocation(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input type="date" className="form-date" min={new Date().toISOString().slice(0, 10)} value={date} onChange={e => setDate(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Start Time</label>
            <input type="time" className="form-time" value={startTime} onChange={e => setStartTime(e.target.value)} />
          </div>

          <div className="form-group">
            <label>End Time</label>
            <input type="time" className="form-time" value={endTime} onChange={e => setEndTime(e.target.value)} />
          </div>

          <button className="add-btn" type="submit">Add Event</button>
        </form>
      ) : (
        <p style={{ color: "red" }}>Only admin can create events</p>
      )}

      <h3 style={{ marginTop: 40 }}>All Events</h3>

      {events.map(ev => (
        <div key={ev.id} className="event-card">
          <h3>{ev.title}</h3>
          <p><strong>Location:</strong> {ev.location || "—"}</p>
          <p><strong>Date:</strong> {new Date(ev.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {formatTime(ev.startTime)} → {formatTime(ev.endTime)}</p>
          <p>{ev.description}</p>

          <div className="event-actions">
            {user?.role === "ADMIN" && ev.createdBy === user.id && (
              <>
                <button className="btn-edit" onClick={() => window.location.href = `/edit-event/${ev.id}`}>Edit</button>
                <button className="btn-delete" onClick={() => deleteEvent(ev.id)}>Delete</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
