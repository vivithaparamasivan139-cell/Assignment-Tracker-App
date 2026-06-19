import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AssignmentForm from './components/AssignmentForm';
import AssignmentList from './components/AssignmentList';
import CalendarView from './components/CalendarView';
import { ToastContainer, toast } from 'react-toastify';
import StudentSubmit from './components/StudentSubmit';

const LOCAL_KEY = 'assignments_v1';

function App() {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [view, setView] = useState('dashboard');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState({ subject: 'All', status: 'All' });
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('dark_mode');
    return saved !== null ? JSON.parse(saved) : true; // default to dark theme
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) {
      setAssignments(JSON.parse(raw));
    } else {
      // seed sample/demo assignments on first load
      const today = new Date();
      const fmt = d => d.toISOString().slice(0,10);
      const sample = [
        { id: 's1', title: 'Intro to Algorithms - HW1', subject: 'CS101', description: 'Solve exercises 1-5', dueDate: fmt(new Date(today.getTime() - 2*24*3600*1000)), status: 'Late' },
        { id: 's2', title: 'Linear Algebra - Assignment A', subject: 'MA102', description: 'Matrix problems', dueDate: fmt(new Date(today.getTime() + 5*24*3600*1000)), status: 'Pending' },
        { id: 's3', title: 'Web Dev - Project', subject: 'CS201', description: 'Build a small website', dueDate: fmt(new Date(today.getTime() + 1*24*3600*1000)), status: 'Submitted' },
        { id: 's4', title: 'Database - Query Set', subject: 'CS301', description: 'SQL queries', dueDate: fmt(new Date(today.getTime() - 5*24*3600*1000)), status: 'Late' }
      ];
      setAssignments(sample);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(sample));
    }

    // Initialize view from hash if present
    const h = window.location.hash.replace('#','');
    if (h) setView(h);

    // Listen for manual hash changes (back/forward)
    const onHash = () => {
      const hv = window.location.hash.replace('#','');
      if (hv) setView(hv);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('dark_mode', JSON.stringify(dark));
    document.body.classList.toggle('dark-mode', dark);
  }, [dark]);

  // Auto-detect late assignments whenever assignments change
  useEffect(() => {
    const now = new Date();
    let changed = false;
    const updated = assignments.map(a => {
      if (a.status !== 'Submitted' && new Date(a.dueDate) < now && a.status !== 'Late') {
        changed = true;
        return { ...a, status: 'Late' };
      }
      return a;
    });
    if (changed) setAssignments(updated);
  }, [assignments]);

  const changeView = (v) => {
    setView(v);
    try { window.location.hash = v; } catch(e){}
  };

  const addAssignment = (data) => {
    const newA = { id: Date.now().toString(), ...data };
    setAssignments(prev => [newA, ...prev]);
    toast.success('Assignment added');
  };

  const updateAssignment = (id, data) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
    toast.success('Assignment updated');
  };

  const deleteAssignment = (id) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
    toast.success('Assignment deleted');
  };

  // If accessed as a public student submission page (direct link), render standalone
  const hashView = typeof window !== 'undefined' ? window.location.hash.replace('#','') : '';
  if (view === 'student-public' || hashView === 'student-public') {
    return (
      <div className={`app d-flex ${dark ? 'dark' : ''}`}>
        <div className="container p-4">
          <a href="#" className="btn btn-link mb-3" onClick={(e)=>{ e.preventDefault(); try{ window.location.hash=''; }catch{} setView('dashboard'); setSidebarOpen(true); }}>Back to site</a>
          <StudentSubmit onSubmit={(data)=>{ const newA = { id: Date.now().toString(), ...data }; setAssignments(prev=>[newA,...prev]); window.location.hash = '#assignments'; }} />
        </div>
      </div>
    );
  }

  // If user opened a specific view directly via hash and wants a single-page view
  const singleViews = ['dashboard','assignments','calendar','export','student'];
  if (singleViews.includes(hashView)) {
    return (
      <div className={`app d-flex ${dark ? 'dark' : ''}`}>
        <div className="container p-4">
          <a href="#" className="btn btn-link mb-3" onClick={(e)=>{ e.preventDefault(); try{ window.location.hash=''; }catch{} setView('dashboard'); setSidebarOpen(true); }}>Back to site</a>
          {hashView === 'dashboard' && <Dashboard assignments={assignments} />}

          {hashView === 'assignments' && (
            <div className="row mt-4">
              <div className="col-lg-4">
                <AssignmentForm
                  onAdd={addAssignment}
                  onUpdate={updateAssignment}
                  selected={selectedAssignment}
                  setSelected={setSelectedAssignment}
                />
              </div>
              <div className="col-lg-8">
                <AssignmentList
                  assignments={assignments}
                  setSelected={setSelectedAssignment}
                  deleteAssignment={deleteAssignment}
                  query={query}
                  filter={filter}
                  setFilter={setFilter}
                  updateAssignment={updateAssignment}
                />
              </div>
            </div>
          )}

          {hashView === 'calendar' && (
            <div className="row mt-4">
              <div className="col-12">
                <CalendarView assignments={assignments} />
              </div>
            </div>
          )}

          {hashView === 'export' && (
            <div className="row mt-4">
              <div className="col-12">
                <AssignmentList
                  assignments={assignments}
                  setSelected={setSelectedAssignment}
                  deleteAssignment={deleteAssignment}
                  query={query}
                  filter={filter}
                  setFilter={setFilter}
                  updateAssignment={updateAssignment}
                />
              </div>
            </div>
          )}

          {hashView === 'student' && (
            <div className="row mt-4">
              <div className="col-md-6">
                <StudentSubmit onSubmit={(data) => {
                  const newA = { id: Date.now().toString(), ...data };
                  setAssignments(prev => [newA, ...prev]);
                }} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`app d-flex ${dark ? 'dark' : ''} ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar view={view} setView={changeView} open={sidebarOpen} closeSidebar={()=>setSidebarOpen(false)} />
      {sidebarOpen && <div className="sidebar-backdrop" onClick={()=>setSidebarOpen(false)} />}
      <div className="main flex-grow-1">
        <Navbar query={query} setQuery={setQuery} dark={dark} setDark={setDark} toggleSidebar={()=>setSidebarOpen(s=>!s)} goToDashboard={()=>changeView('dashboard')} />
        <div className="container-fluid p-4">
          {view === 'dashboard' && <Dashboard assignments={assignments} />}

          {view === 'assignments' && (
            <div className="row mt-4">
              <div className="col-lg-4">
                <AssignmentForm
                  onAdd={addAssignment}
                  onUpdate={updateAssignment}
                  selected={selectedAssignment}
                  setSelected={setSelectedAssignment}
                />
              </div>
              <div className="col-lg-8">
                <AssignmentList
                  assignments={assignments}
                  setSelected={setSelectedAssignment}
                  deleteAssignment={deleteAssignment}
                  query={query}
                  filter={filter}
                  setFilter={setFilter}
                  updateAssignment={updateAssignment}
                />
              </div>
            </div>
          )}

          {view === 'calendar' && (
            <div className="row mt-4">
              <div className="col-12">
                <CalendarView assignments={assignments} />
              </div>
            </div>
          )}

          {view === 'export' && (
            <div className="row mt-4">
              <div className="col-12">
                <AssignmentList
                  assignments={assignments}
                  setSelected={setSelectedAssignment}
                  deleteAssignment={deleteAssignment}
                  query={query}
                  filter={filter}
                  setFilter={setFilter}
                  updateAssignment={updateAssignment}
                />
              </div>
            </div>
          )}
          {view === 'student' && (
            <div className="row mt-4">
              <div className="col-md-6">
                <StudentSubmit onSubmit={(data) => {
                  const newA = { id: Date.now().toString(), ...data };
                  setAssignments(prev => [newA, ...prev]);
                }} />
              </div>
              <div className="col-md-6">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h6>How students use this</h6>
                    <p className="small text-muted">Students can submit assignment files here. Faculty will see them in the Assignments view.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
