import React, { useEffect, useRef } from 'react';

function PowerConsumptionChart({ logs }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!logs || logs.length === 0) return;
    const deviceUsage = {};
    logs
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .forEach(log => {
        const key = `${log.device}||${log.room}`;
        if (!deviceUsage[key]) {
          deviceUsage[key] = { device: log.device, room: log.room, onTime: 0, lastState: null, lastTimestamp: null };
        }
        if (log.action === 'ON' || log.action === 'Turned On') {
          deviceUsage[key].lastState = 'ON';
          deviceUsage[key].lastTimestamp = new Date(log.timestamp);
        } else if (
          (log.action === 'OFF' || log.action === 'Turned Off') &&
          deviceUsage[key].lastState === 'ON'
        ) {
          const duration = new Date(log.timestamp) - deviceUsage[key].lastTimestamp;
          deviceUsage[key].onTime += duration;
          deviceUsage[key].lastState = 'OFF';
        }
      });

    const labels = Object.values(deviceUsage).map(
      usage => `${usage.device} (${usage.room})`
    );
    const data = Object.values(deviceUsage).map(
      usage => Number(((usage.onTime / (1000 * 60 * 60)) * 0.1).toFixed(3))
    );
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    chartInstance.current = new window.Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Power Usage (kWh)',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }, [logs]);

  return (
    <div style={{ width: '100%', maxWidth: 600, margin: '0 auto 2rem auto' }}>
      <canvas ref={chartRef} />
    </div>
  );
}
export default PowerConsumptionChart;