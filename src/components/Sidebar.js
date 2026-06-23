import React from 'react';
import logo from '../assets/logo.svg';

export default function Sidebar({ view, setView, open, closeSidebar }) {
  const navClick = (v) => {
    try { window.location.hash = v; } catch(e) {}
    try { setView(v); } catch (e) {}
    // close on small screens
    try { if (window && window.innerWidth < 992) closeSidebar && closeSidebar(); } catch(e){}
  };

  return (
    <nav className={`sidebar bg-primary text-white p-3 d-flex flex-column ${open ? 'sidebar-visible' : 'sidebar-hidden'}`} aria-hidden={!open}>
      <div className="d-flex align-items-center mb-3">
        <img src={logo} alt="logo" style={{width:36,height:36,marginRight:10}} />
        <h4 className="mb-0">College Tracker</h4>
      </div>
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
