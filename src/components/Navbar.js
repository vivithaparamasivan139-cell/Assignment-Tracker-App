import React from 'react';

export default function Navbar({ query, setQuery, dark, setDark, toggleSidebar, goToDashboard }) {
  return (
    <header className={`navbar navbar-expand-lg ${dark ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        <button className="btn btn-outline-light d-lg-none me-2" onClick={toggleSidebar}><i className="bi bi-list" /></button>
        <a className="navbar-brand" href="#" onClick={(e)=>{e.preventDefault(); goToDashboard ? goToDashboard() : (toggleSidebar && toggleSidebar());}}>Assignment Tracker</a>
        <div className="d-flex align-items-center ms-auto">
          <input className="form-control me-2" placeholder="Search assignments" value={query} onChange={e => setQuery(e.target.value)} />
          <div className="form-check form-switch ms-3">
            <input className="form-check-input" type="checkbox" id="darkSwitch" checked={dark} onChange={e => setDark(e.target.checked)} />
            <label className="form-check-label" htmlFor="darkSwitch">Dark</label>
          </div>
        </div>
      </div>
    </header>
  );
}
