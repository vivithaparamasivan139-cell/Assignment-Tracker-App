import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import StatisticsChart from './StatisticsChart';
import banner from '../assets/banner.svg';

export default function Dashboard({ assignments }) {
  const total = assignments.length;
  const submitted = assignments.filter(a => a.status === 'Submitted').length;
  const late = assignments.filter(a => a.status === 'Late').length;
  const pending = assignments.filter(a => a.status === 'Pending').length;

  const pieData = {
    labels: ['Submitted', 'Pending', 'Late'],
    datasets: [{ data: [submitted, pending, late], backgroundColor: ['#198754','#0d6efd','#dc3545'] }]
  };

  return (
    <div className="dashboard">
      <img src={banner} alt="Banner" className="dashboard-banner mb-3" />
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Total Assignments</h6>
              <h3>{total}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Submitted</h6>
              <h3>{submitted}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Pending</h6>
              <h3>{pending}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Late</h6>
              <h3>{late}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <Pie data={pieData} />
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div style={{width: '60%'}}>
            <h6>Submission Progress</h6>
            <div className="progress" style={{height: '24px'}}>
              <div className="progress-bar bg-success" role="progressbar" style={{width: `${total? (submitted/total)*100:0}%`}} aria-valuenow={submitted} aria-valuemin="0" aria-valuemax={total}></div>
            </div>
            <div className="text-center mt-2">{total? Math.round((submitted/total)*100):0}% submitted</div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <div className="card p-3 shadow-sm">
            <h6>Subject-wise Analytics</h6>
            <StatisticsChart assignments={assignments} />
          </div>
        </div>
      </div>
    </div>
  );
}
