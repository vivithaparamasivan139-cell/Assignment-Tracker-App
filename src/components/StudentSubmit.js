import React, { useState } from 'react';

export default function StudentSubmit({ onSubmit }) {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (!name || !title || !subject || !file) return alert('Please fill all fields and attach a file');
    const reader = new FileReader();
    reader.onload = () => {
      const attachment = { name: file.name, data: reader.result };
      onSubmit({ title, subject, description: `Submitted by ${name}`, dueDate: new Date().toISOString().slice(0,10), status: 'Submitted', attachment });
      setName(''); setTitle(''); setSubject(''); setFile(null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5>Student Submission</h5>
        <form onSubmit={submit}>
          <div className="mb-2">
            <label className="form-label">Student Name</label>
            <input className="form-control" value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div className="mb-2">
            <label className="form-label">Assignment Title</label>
            <input className="form-control" value={title} onChange={e=>setTitle(e.target.value)} />
          </div>
          <div className="mb-2">
            <label className="form-label">Subject</label>
            <input className="form-control" value={subject} onChange={e=>setSubject(e.target.value)} />
          </div>
          <div className="mb-2">
            <label className="form-label">Attachment</label>
            <input className="form-control" type="file" onChange={e=>setFile(e.target.files[0])} />
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-success" type="submit">Submit Assignment</button>
          </div>
        </form>
      </div>
    </div>
  );
}
