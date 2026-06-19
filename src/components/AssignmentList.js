import React, { useState, useMemo } from 'react';
import AssignmentCard from './AssignmentCard';
import html2pdf from 'html2pdf.js';
import { toast } from 'react-toastify';

export default function AssignmentList({ assignments, setSelected, deleteAssignment, query, filter, setFilter, updateAssignment }) {
  const subjects = useMemo(() => ['All', ...Array.from(new Set(assignments.map(a=>a.subject)))], [assignments]);

  const filtered = assignments.filter(a => {
    if (query && !a.title.toLowerCase().includes(query.toLowerCase())) return false;
    if (filter.subject !== 'All' && a.subject !== filter.subject) return false;
    if (filter.status !== 'All' && a.status !== filter.status) return false;
    return true;
  });

  const exportPDF = () => {
    const opt = { margin: 0.5, filename: 'assignments.pdf', html2canvas: {}, jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' } };
    const elem = document.getElementById('export-area');
    try {
      html2pdf().from(elem).set(opt).save();
      toast.success('Export started');
    } catch (err) {
      console.error('Export failed', err);
      toast.error('Export failed');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-2">
        <div>
          <select className="form-select d-inline-block w-auto me-2" value={filter.subject} onChange={e=>setFilter({...filter, subject: e.target.value})}>
            {subjects.map(s=> <option key={s}>{s}</option>)}
          </select>
          <select className="form-select d-inline-block w-auto me-2" value={filter.status} onChange={e=>setFilter({...filter, status: e.target.value})}>
            <option>All</option>
            <option>Pending</option>
            <option>Submitted</option>
            <option>Late</option>
          </select>
        </div>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={exportPDF}><i className="bi bi-file-earmark-pdf"></i> Export PDF</button>
        </div>
      </div>

      <div id="export-area">
        {filtered.length === 0 && <div className="text-muted">No assignments</div>}
        <div className="row">
          {filtered.map(a => (
            <div key={a.id} className="col-md-6 mb-3">
              <AssignmentCard a={a} onEdit={()=>setSelected(a)} onDelete={()=>deleteAssignment(a.id)} updateAssignment={updateAssignment} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
