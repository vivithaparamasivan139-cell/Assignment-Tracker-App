import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function StatisticsChart({ assignments }) {
  const data = useMemo(() => {
    const counts = {};
    assignments.forEach(a => { counts[a.subject] = (counts[a.subject] || 0) + 1; });
    const labels = Object.keys(counts);
    const vals = labels.map(l => counts[l]);
    return { labels, datasets: [{ label: 'Assignments', data: vals, backgroundColor: 'rgba(13,110,253,0.8)' }] };
  }, [assignments]);

  if (!data.labels.length) return <div className="text-muted">No data for analytics</div>;

  return (
    <div>
      <Bar data={data} />
    </div>
  );
}
