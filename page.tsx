"use client";
import { useState } from "react";

const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
const statuses = [
  "הכנה ליציאה",
  "העמסה",
  "פירוק",
  "שתילה",
  "נבדק",
  "הסתיים",
  "החזרת עודפים",
];

export default function Dashboard() {
  const [schedule, setSchedule] = useState({});
  const [updates, setUpdates] = useState("");
  const [stats, setStats] = useState({ inYard: 0, rented: 0, sold: 0 });
  const [form, setForm] = useState({
    day: "ראשון",
    task: "",
    status: statuses[0],
  });

  const addTask = () => {
    const updated = { ...schedule };
    if (!updated[form.day]) updated[form.day] = [];
    updated[form.day].push({ task: form.task, status: form.status });
    setSchedule(updated);
    setForm({ ...form, task: "" });
  };

  return (
    <div className="p-4 space-y-4 text-right">
      <h1 className="text-2xl font-bold">לוח זמנים מגרש תפעולי קומסקו</h1>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
        {days.map((day) => (
          <div key={day} className="bg-white shadow p-2 rounded">
            <h2 className="font-semibold border-b mb-2">{day}</h2>
            {(schedule[day] || []).map((item, index) => (
              <div
                key={index}
                className="p-1 mb-1 rounded text-sm"
                style={{
                  backgroundColor:
                    item.status === "הכנה ליציאה"
                      ? "#e0f2fe"
                      : item.status === "העמסה"
                      ? "#fef9c3"
                      : item.status === "פירוק"
                      ? "#fee2e2"
                      : item.status === "שתילה"
                      ? "#d1fae5"
                      : item.status === "נבדק"
                      ? "#ede9fe"
                      : item.status === "הסתיים"
                      ? "#f0fdf4"
                      : "#f3f4f6",
                }}
              >
                {item.task} - {item.status}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-2 rounded shadow space-y-2">
          <h3 className="font-semibold">עדכון נתונים</h3>
          <label>יום</label>
          <select
            value={form.day}
            onChange={(e) => setForm({ ...form, day: e.target.value })}
            className="w-full border p-1"
          >
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <label>משימה</label>
          <input
            type="text"
            value={form.task}
            onChange={(e) => setForm({ ...form, task: e.target.value })}
            className="w-full border p-1"
          />

          <label>סטטוס</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full border p-1"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button onClick={addTask} className="w-full bg-blue-500 text-white p-2 rounded">
            הוסף משימה
          </button>
        </div>

        <div className="bg-white p-2 rounded shadow space-y-2">
          <h3 className="font-semibold">נתונים כלליים</h3>
          <label>במגרש</label>
          <input
            type="number"
            value={stats.inYard}
            onChange={(e) => setStats({ ...stats, inYard: e.target.value })}
            className="w-full border p-1"
          />
          <label>הושכרו</label>
          <input
            type="number"
            value={stats.rented}
            onChange={(e) => setStats({ ...stats, rented: e.target.value })}
            className="w-full border p-1"
          />
          <label>נמכרו</label>
          <input
            type="number"
            value={stats.sold}
            onChange={(e) => setStats({ ...stats, sold: e.target.value })}
            className="w-full border p-1"
          />
        </div>

        <div className="bg-white p-2 rounded shadow space-y-2">
          <h3 className="font-semibold">הודעות ועדכונים</h3>
          <textarea
            rows={4}
            value={updates}
            onChange={(e) => setUpdates(e.target.value)}
            className="w-full border p-1"
          ></textarea>
        </div>
      </div>
    </div>
  );
}