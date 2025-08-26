import React from 'react';

const RetakeHistory = ({ attempts }) => {
  // Group attempts by quiz title
  const grouped = {};
  attempts.forEach(({ quizId, score, total, createdAt }) => {
    const title = quizId.title;
    if (!grouped[title]) grouped[title] = [];
    grouped[title].push({ score, total, createdAt });
  });

  return (
    <div className="retake-history">
      <h3>Retake History</h3>
      {Object.entries(grouped).map(([title, attempts]) => (
        <div key={title} className="retake-block">
          <h4>{title}</h4>
          <table>
            <thead>
              <tr>
                <th>Attempt</th>
                <th>Date</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map(({ score, total, createdAt }, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{new Date(createdAt).toLocaleDateString()}</td>
                  <td>{score} / {total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default RetakeHistory;