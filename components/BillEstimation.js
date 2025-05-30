import React from 'react';

function BillEstimation({ logs }) {
  const deviceUsage = {};
  logs
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    .forEach(log => {
      const key = `${log.device}||${log.room}`;
      if (!deviceUsage[key]) {
        deviceUsage[key] = { onTime: 0, lastState: null, lastTimestamp: null };
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
  const totalKwh = Object.values(deviceUsage).reduce(
    (sum, usage) => sum + (usage.onTime / (1000 * 60 * 60)) * 1,
    0
  );
  const ratePerKwh = 10;
  const estimatedBill = totalKwh * ratePerKwh;
  return (
    <p id="bill-estimation">
      Estimated Monthly Bill: £{estimatedBill.toFixed(2)} ({totalKwh.toFixed(2)} kWh)
      <br />
      <span style={{ fontSize: '0.9em', color: '#888' }}>
        (Rate: £{ratePerKwh}/kWh)
      </span>
    </p>
  );
}
export default BillEstimation;