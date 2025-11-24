import { useState, useEffect, useContext } from "react";
import api from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";

export default function AddEvent() {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [events, setEvents] = useState([]);

  
  const timeToMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };


  const minutesToTime = (mins: number) => {
    const h = Math.floor(mins / 60).toString().padStart(2, "0");
    const m = (mins % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const startMinute = timeToMinutes(startTime);
    const endMinute = timeToMinutes(endTime);

    try {
      await api.post("/events", {
        title,
        description,
        date,
        startMinute,
        endMinute,
      });

      alert("Event added successfully!");
      loadEvents();

      setTitle("");
      setDescription("");
      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (err: any) {
      console.log("EVENT ADD ERROR:", err.response?.data);
      alert("Failed to add event");
    }
  };

  const deleteEvent = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await api.delete(`/events/${id}`);
      loadEvents();
    } catch (error) {
      alert("Failed to delete event");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Event (Admin Only)</h2>

      {user?.role === "ADMIN" ? (
        <>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            /><br /><br />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            /><br /><br />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            /><br /><br />

            <label>Start Time</label><br />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            /><br /><br />

            <label>End Time</label><br />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            /><br /><br />

            <button type="submit">Add Event</button>
          </form>
        </>
      ) : (
        <p style={{ color: "red" }}>Only admin can create events</p>
      )}

      <h3 style={{ marginTop: 40 }}>All Events</h3>

      <ul>
        {events.map((event: any) => (
          <li key={event.id}>
            <strong>{event.title}</strong> — {new Date(event.date).toDateString()}
            <br />

            <div>
              <em>{event.description}</em>
            </div>

            <div>
               {minutesToTime(event.startMinute)} → {minutesToTime(event.endMinute)}
            </div>

            {user?.role === "ADMIN" && (
              <>
                <button
                  onClick={() => (window.location.href = `/edit-event/${event.id}`)}
                >
                  Edit
                </button>

                <button
                  style={{ marginLeft: 10 }}
                  onClick={() => deleteEvent(event.id)}
                >
                  Delete
                </button>
              </>
            )}

            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
