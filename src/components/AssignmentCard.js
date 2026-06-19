import React from 'react';

export default function AssignmentCard({ a, onEdit, onDelete, updateAssignment }) {
  const markSubmitted = () => updateAssignment(a.id, { status: 'Submitted' });
  return (
    <div className={`card ${a.status === 'Late' ? 'border-danger' : ''}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h5>{a.title}</h5>
            <div className="text-muted small">{a.subject} • Due {new Date(a.dueDate).toLocaleDateString()}</div>
          </div>
          <div className="text-end">
            <span className={`badge ${a.status === 'Submitted'? 'bg-success' : a.status === 'Late'? 'bg-danger':'bg-warning'}`}>{a.status}</span>
          </div>
        </div>
        <p className="mt-2">{a.description}</p>
        {a.attachment && (
          <div className="mb-2">
            <a className="btn btn-sm btn-outline-secondary me-2" href={a.attachment.data} download={a.attachment.name}>Download Attachment</a>
          </div>
        )}
        <div className="d-flex gap-2">
          {a.status !== 'Submitted' && <button className="btn btn-sm btn-success" onClick={markSubmitted}>Mark Submitted</button>}
          <button className="btn btn-sm btn-primary" onClick={onEdit}>Edit</button>
          <button className="btn btn-sm btn-danger" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
