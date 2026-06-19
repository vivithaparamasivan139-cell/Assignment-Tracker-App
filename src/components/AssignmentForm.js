import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function AssignmentForm({ onAdd, onUpdate, selected, setSelected }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    if (selected) {
      setTitle(selected.title);
      setSubject(selected.subject);
      setDescription(selected.description);
      setDueDate(selected.dueDate);
      setStatus(selected.status);
      setAttachment(selected.attachment || null);
    }
  }, [selected]);

  const reset = () => { setTitle(''); setSubject(''); setDescription(''); setDueDate(''); setStatus('Pending'); setSelected(null); };

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim() || !dueDate) {
      toast.error('Please fill Title, Subject, and Due Date');
      return;
    }
    const data = { title: title.trim(), subject: subject.trim(), description: description.trim(), dueDate, status, attachment };
    if (selected) {
      onUpdate(selected.id, data);
    } else {
      onAdd(data);
    }
    reset();
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5>{selected? 'Edit Assignment' : 'Add Assignment'}</h5>
        <form onSubmit={submit}>
          <div className="mb-2">
            <label className="form-label">Title</label>
            <input className="form-control" value={title} onChange={e=>setTitle(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label className="form-label">Subject</label>
            <input className="form-control" value={subject} onChange={e=>setSubject(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label className="form-label">Due Date</label>
            <input type="date" className="form-control" value={dueDate} onChange={e=>setDueDate(e.target.value)} required />
          </div>
          <div className="mb-2">
            <label className="form-label">Status</label>
            <select className="form-select" value={status} onChange={e=>setStatus(e.target.value)}>
              <option>Pending</option>
              <option>Submitted</option>
              <option>Late</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="form-label">Description</label>
            <textarea className="form-control" value={description} onChange={e=>setDescription(e.target.value)} />
          </div>
          <div className="mb-2">
            <label className="form-label">Attachment (optional)</label>
            <input className="form-control" type="file" onChange={async e => {
              const file = e.target.files[0];
              if (!file) return setAttachment(null);
              const reader = new FileReader();
              reader.onload = () => {
                setAttachment({ name: file.name, data: reader.result });
              };
              reader.readAsDataURL(file);
            }} />
            {attachment && <div className="small mt-1">Attached: {attachment.name}</div>}
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary" type="submit">{selected? 'Update' : 'Add'}</button>
            <button className="btn btn-secondary" type="button" onClick={reset}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
}
