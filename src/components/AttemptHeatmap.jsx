//C:\Users\KALPNA\Desktop\secure-coding-dashboard\frontend\src\components\AttemptHeadmap.jsx
import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const AttemptHeatmap = ({ attempts }) => {
  const today = new Date();

  const dateMap = {};
  attempts.forEach(({ createdAt }) => {
    const date = new Date(createdAt).toISOString().split('T')[0];
    dateMap[date] = (dateMap[date] || 0) + 1;
  });

  const values = Object.entries(dateMap).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <div className="attempt-heatmap">
      <h3>Quiz Activity</h3>
      <CalendarHeatmap
        startDate={new Date(today.getFullYear(), today.getMonth() - 3, 1)}
        endDate={today}
        values={values}
        classForValue={(val) => {
          if (!val) return 'color-empty';
          if (val.count >= 5) return 'color-scale-4';
          if (val.count >= 3) return 'color-scale-3';
          if (val.count >= 2) return 'color-scale-2';
          return 'color-scale-1';
        }}
        tooltipDataAttrs={(val) => ({
          'data-tip': `${val.date}: ${val.count} attempt(s)`,
        })}
        showWeekdayLabels
      />
    </div>
  );
};

export default AttemptHeatmap;