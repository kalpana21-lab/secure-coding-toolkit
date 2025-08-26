import React from 'react';

const ExportCSV = ({ attempts }) => {
  const handleExport = () => {
    const headers = ['Quiz Title', 'Score', 'Total', 'Date'];
    const rows = attempts.map(({ quizId, score, total, submittedAt }) => [
      `"${quizId.title}"`,
      score,
      total,
      new Date(submittedAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'quiz_history.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button className="export-btn" onClick={handleExport}>
      Export to CSV
    </button>
  );
};

export default ExportCSV;