import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const TopicMasteryChart = ({ attempts }) => {
  // Group scores by quiz title
  const scoresByTitle = {};

  attempts.forEach(({ quizId, score, total }) => {
    const title = quizId.title;
    if (!scoresByTitle[title]) {
      scoresByTitle[title] = { totalScore: 0, totalPossible: 0 };
    }
    scoresByTitle[title].totalScore += score;
    scoresByTitle[title].totalPossible += total;
  });

  const chartData = Object.entries(scoresByTitle).map(([title, data]) => ({
    title,
    percentage: ((data.totalScore / data.totalPossible) * 100).toFixed(1),
  }));

  return (
    <div className="topic-mastery-chart">
      <h3>Topic Mastery</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Bar dataKey="percentage" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopicMasteryChart;