// frontend/src/pages/EditEvent.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

function timeToInput(mins: number) {
  const hh = Math.floor(mins / 60).toString().padStart(2, "0");
  const mm = (mins % 60).toString().padStart(2, "0");
  return `${hh}:${mm}`;
}

function inputToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/events");
        const ev = res.data.find((x: any) => x.id === id);
        if (!ev) return alert("Event not found");
        setTitle(ev.title);
        setDescription(ev.description || "");
        setDate(ev.date.slice(0, 10));
        setStartTime(timeToInput(ev.startMinute));
        setEndTime(timeToInput(ev.endMinute));
      } catch (err) {
        console.error(err);
        alert("Failed to load event");
      }
    };
    load();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== "ADMIN") return alert("Only admin can edit");
    setLoading(true);
    try {
      await api.put(`/events/${id}`, {
        title,
        description,
        date,
        startMinute: inputToMinutes(startTime),
        endMinute: inputToMinutes(endTime),
      });
      navigate("/add-event");
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Event</h2>
      <form onSubmit={handleSave}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: 400, padding: 6 }} required /><br /><br />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: 400, padding: 6 }} /><br /><br />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /><br /><br />
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required /><br /><br />
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required /><br /><br />
        <button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
      </form>
    </div>
  );
}
