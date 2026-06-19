import React from 'react';

export default function Sidebar({ view, setView, open, closeSidebar }) {
  const navClick = (v) => {
    try { window.location.hash = v; } catch(e) {}
    try { setView(v); } catch (e) {}
    // close on small screens
    try { if (window && window.innerWidth < 992) closeSidebar && closeSidebar(); } catch(e){}
  };

  return (
    <nav className={`sidebar bg-primary text-white p-3 d-flex flex-column ${open ? 'sidebar-visible' : 'sidebar-hidden'}`} aria-hidden={!open}>
      <h3 className="mb-3">College Tracker</h3>
      <ul className="nav flex-column">
        <li className="nav-item mb-2"><button type="button" className={`nav-link btn btn-link text-white text-start ${view==='dashboard'?'fw-bold':''}`} onClick={()=>navClick('dashboard')}>Dashboard</button></li>
        <li className="nav-item mb-2"><button type="button" className={`nav-link btn btn-link text-white text-start ${view==='assignments'?'fw-bold':''}`} onClick={()=>navClick('assignments')}>Assignments</button></li>
        <li className="nav-item mb-2"><button type="button" className={`nav-link btn btn-link text-white text-start ${view==='calendar'?'fw-bold':''}`} onClick={()=>navClick('calendar')}>Calendar</button></li>
        <li className="nav-item mb-2"><button type="button" className={`nav-link btn btn-link text-white text-start ${view==='export'?'fw-bold':''}`} onClick={()=>navClick('export')}>Export</button></li>
        <li className="nav-item mb-2"><button type="button" className={`nav-link btn btn-link text-white text-start ${view==='student'?'fw-bold':''}`} onClick={()=>navClick('student')}>Student Portal</button></li>
      </ul>
      <div className="mt-auto small">© College</div>
    </nav>
  );
}
