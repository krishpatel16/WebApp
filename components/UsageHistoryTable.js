import React from 'react';

function UsageHistoryTable({ logs }) {
  console.log('UsageHistoryTable logs:', logs);
  return (
    <table id="usageHistoryTable" border="1" style={{ width: '100%', marginBottom: '1rem', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Username</th>
          <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Device</th>
          <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Room</th>
          <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Action</th>
          <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Date</th>
          <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Time</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => {
          const logDate = new Date(log.timestamp);
          const formattedDate = `${String(logDate.getDate()).padStart(2, '0')}-${String(
            logDate.getMonth() + 1
          ).padStart(2, '0')}-${logDate.getFullYear()}`;
          const formattedTime = logDate.toLocaleTimeString();
          return (
            <tr key={index}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{log.username}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{log.device}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{log.room}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{log.action}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{formattedDate}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{formattedTime}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default UsageHistoryTable;