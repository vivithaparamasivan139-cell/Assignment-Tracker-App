import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarView({ assignments }) {
  const [date, setDate] = useState(new Date());

  const onChange = d => setDate(d);

  // Use local date string YYYY-MM-DD to avoid timezone shifts from toISOString()
  const pad = n => String(n).padStart(2, '0');
  const selectedDate = `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
  const items = assignments.filter(a => a.dueDate === selectedDate);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5>Calendar</h5>
        <div className="row">
          <div className="col-md-4">
            <Calendar onChange={onChange} value={date} />
          </div>
          <div className="col-md-8">
            <h6>Due on {new Date(date).toLocaleDateString()}</h6>
            {items.length === 0 && <div className="text-muted">No assignments due</div>}
            <ul className="list-group">
              {items.map(a => (
                <li key={a.id} className="list-group-item d-flex justify-content-between align-items-start">
                  <div>
                    <div className="fw-bold">{a.title}</div>
                    <div className="small text-muted">{a.subject} • {a.status}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
