import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const ProgressChart = ({ attempts }) => {
  const chartData = attempts.map(a => ({
    date: new Date(a.submittedAt).toLocaleDateString(),
    score: a.score,
    percentage: ((a.score / a.total) * 100).toFixed(1),
    title: a.quizId.title
  }));

  return (
    <div className="progress-chart">
      <h3>Score Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="percentage" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;