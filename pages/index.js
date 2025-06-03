// pages/login.js
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Hamburger from '../components/Hamburger';
import Sidebar from '../components/Sidebar';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginActivities, setLoginActivities] = useState([]);
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [usernameFilter, setUsernameFilter] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    loadLoginHistory();
  }, []);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    if (!selectedRole || !username || !password) {
      setLoginError('Please fill in all fields.');
      return;
    }

    localStorage.setItem('userRole', selectedRole);
    localStorage.setItem('username', username);
    logLoginActivity(username, selectedRole);
    router.push('/home');
  };

  const logLoginActivity = (username, role) => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;

    const activities = JSON.parse(localStorage.getItem('loginActivities')) || [];
    activities.unshift({ username, role, date: formattedDate, time: formattedTime });
    localStorage.setItem('loginActivities', JSON.stringify(activities));
    loadLoginHistory();
  };

  const loadLoginHistory = () => {
    const activities = JSON.parse(localStorage.getItem('loginActivities')) || [];
    setLoginActivities(activities);
  };

  const parseDateString = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split('-');
    return new Date(`${year}-${month}-${day}`);
  };

  const handleFilterLogs = () => {
    const activities = JSON.parse(localStorage.getItem('loginActivities')) || [];
    const start = startDateFilter ? new Date(startDateFilter) : null;
    const end = endDateFilter ? new Date(endDateFilter + 'T23:59:59') : null;
    const lowerUsernameFilter = usernameFilter.trim().toLowerCase();

    const filtered = activities.filter((activity) => {
      const activityDate = parseDateString(activity.date);
      const usernameMatch = lowerUsernameFilter
        ? activity.username.toLowerCase().includes(lowerUsernameFilter)
        : true;

      const isAfterStart = !start || (activityDate && activityDate >= start);
      const isBeforeEnd = !end || (activityDate && activityDate <= end);

      return usernameMatch && isAfterStart && isBeforeEnd;
    });
    setLoginActivities(filtered);
  };

  const handleStartDateChange = (event) => {
    setStartDateFilter(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDateFilter(event.target.value);
  };

  const handleUsernameFilterChange = (event) => {
    setUsernameFilter(event.target.value);
  };

  const exportTableToPDF = () => {
    const doc = new jsPDF();
    doc.text('Login Activity', 14, 16);

    const rows = loginActivities.map((activity) => [
      activity.username,
      activity.role,
      activity.date,
      activity.time,
    ]);

    autoTable(doc, {
      head: [['Username', 'Role', 'Date', 'Time']],
      body: rows,
      startY: 24,
    });

    doc.save('login-activity.pdf');
  };

  const handleDeleteLogs = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete the filtered login logs?');
    if (confirmDelete) {
      const activities = JSON.parse(localStorage.getItem('loginActivities')) || [];
      const start = startDateFilter ? new Date(startDateFilter) : null;
      const end = endDateFilter ? new Date(endDateFilter + 'T23:59:59') : null;
      const lowerUsernameFilter = usernameFilter.trim().toLowerCase();

      const remainingActivities = activities.filter((activity) => {
        const activityDate = parseDateString(activity.date);
        const usernameMatch = lowerUsernameFilter
          ? activity.username.toLowerCase().includes(lowerUsernameFilter)
          : false;

        const isInRange =
          (!start || (activityDate && activityDate >= start)) &&
          (!end || (activityDate && activityDate <= end));

        return !(isInRange && usernameMatch);
      });

      localStorage.setItem('loginActivities', JSON.stringify(remainingActivities));
      loadLoginHistory();
    }
  };

  return (
    <div>
      <Head>
        <title>Smart Home System</title>
        <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
      </Head>
      <header>
        <h1 id="logo">Smart Home System</h1>
      </header>
      <nav>
        <div id="nav-left">
          <Hamburger onClick={toggleSidebar} />
        </div>
        <div id="nav-center">
        <Link href="/login" style={{ color: 'white', margin: 0, textDecoration: 'none' }}>
          <h2>Login</h2>
        </Link>
        </div>
        <div id="nav-right">
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <main>
        <section className="login-container">
          <h3>Select User Role</h3>
          <form id="role-form" onSubmit={handleLoginSubmit}>
            <label htmlFor="username">Username :</label>
            <input
              type="text"
              id="username"
              required
              placeholder="Enter username"
              style={{ height: '30px', fontSize: '16px', padding: '5px' }}
              value={username}
              onChange={handleUsernameChange}
            />
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              required
              placeholder="Enter password"
              style={{ height: '30px', fontSize: '16px', padding: '5px', marginBottom: '10px' }}
              value={password}
              onChange={handlePasswordChange}
            />
            <label htmlFor="role">Who is using the web app ?</label>
            <select id="role" required value={selectedRole} onChange={handleRoleChange}>
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Family">Family</option>
              <option value="Guest">Guest</option>
            </select>
            <button type="submit">Continue</button>
          </form>
          {loginError && <div id="login-error" className="error-message">{loginError}</div>}
        </section>

        <section className="login-container">
          <h3>Login Activity</h3>
          <div className="date-filter" style={{ marginBottom: '20px' }}>
            <label htmlFor="startDate">From: </label>
            <input type="date" id="startDate" value={startDateFilter} onChange={handleStartDateChange} />
            <label htmlFor="endDate">To: </label>
            <input type="date" id="endDate" value={endDateFilter} onChange={handleEndDateChange} />
            <label htmlFor="filterUsername">Username: </label>
            <input
              type="text"
              id="filterUsername"
              placeholder="Enter username"
              style={{ height: '30px', fontSize: '16px', padding: '5px' }}
              value={usernameFilter}
              onChange={handleUsernameFilterChange}
            />
              <button
              id="filterLogsBtn"
              onClick={handleFilterLogs}
              style={{
                padding: '6px 16px',
                background: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Filter
            </button>
          </div>
          <table id="loginHistoryTable" border="1" style={{ width: '100%', marginBottom: '1rem' }}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {loginActivities.map((activity, index) => (
                <tr key={index}>
                  <td>{activity.username}</td>
                  <td>{activity.role}</td>
                  <td>{activity.date}</td>
                  <td>{activity.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="exportPDFBtn-wrapper" style={{ display: 'flex', gap: '16px', marginTop: 12, marginBottom: 12 }}>
            <button id="exportPDFBtn" onClick={exportTableToPDF}>
              Export to PDF
            </button>
            <button id="deleteLogsBtn" onClick={handleDeleteLogs}>
              Delete Log
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LoginPage;