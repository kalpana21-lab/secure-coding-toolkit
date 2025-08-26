//C:\Users\KALPNA\Desktop\secure-coding2\frontend\src\components\FeedbackChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const FeedbackChart = ({ summary }) => {
  const labels = summary.map((s, i) => `Q${i + 1}`);

  const confusingData = summary.map(s =>
    s.feedback.find(f => f.type === 'confusing')?.count || 0
  );

  const rewordingData = summary.map(s =>
    s.feedback.find(f => f.type === 'needs rewording')?.count || 0
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Confusing',
        data: confusingData,
        backgroundColor: '#f39c12',
      },
      {
        label: 'Needs Rewording',
        data: rewordingData,
        backgroundColor: '#e74c3c',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h3>📊 Feedback Trends</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default FeedbackChart;