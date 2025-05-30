import React from 'react';

function DateFilter({ startDate, endDate, onStartDateChange, onEndDateChange, usernameFilter, onUsernameFilterChange, showUsernameFilter }) {
  return (
    <div className="date-filter" style={{ marginBottom: '20px' }}>
      <label htmlFor="startDate">From: </label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        onChange={onStartDateChange}
        className="styled-date"
      />
      <label htmlFor="endDate">To: </label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        onChange={onEndDateChange}
        className="styled-date"
      />
      {showUsernameFilter && (
        <>
          <label htmlFor="usernameFilter">Username: </label>
          <input
            type="text"
            id="usernameFilter"
            value={usernameFilter}
            onChange={onUsernameFilterChange}
            placeholder="Enter username"
            style={{ height: '30px', fontSize: '16px', padding: '5px' }}
          />
        </>
      )}
    </div>
  );
}
export default DateFilter;