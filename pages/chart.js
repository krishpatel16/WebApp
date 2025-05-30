import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Hamburger from '../components/Hamburger';
import Sidebar from '../components/Sidebar';
import UsageHistoryTable from '../components/UsageHistoryTable';
import PowerConsumptionChart from '../components/PowerConsumptionChart';
import BillEstimation from '../components/BillEstimation';
import DateFilter from '../components/DateFilter';
import GuestNoAccessModal from '../components/GuestNoAccessModal';
import DeleteLogsConfirmationModal from '../components/DeleteLogsConfirmationModal';

const API_URL = 'https://75e60r3zm0.execute-api.eu-west-2.amazonaws.com/dev/device-usage-logs'; // <-- Replace with your actual API Gateway endpoint

function ChartsPage() {
  const router = useRouter();
  const [deviceLogs, setDeviceLogs] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [usernameFilter, setUsernameFilter] = useState('');
  const [showUsernameFilter, setShowUsernameFilter] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [guestModalVisible, setGuestModalVisible] = useState(false);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [filteredLogs, setFilteredLogs] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (!role) {
      router.push('/login');
      return;
    }
    if (role === 'Guest') {
      setGuestModalVisible(true);
      return;
    }
    setShowUsernameFilter(role === 'Admin');

    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
    setEndDate(today);
    loadDeviceLogs(today, today);

    const handleLogUpdate = () => {
      const currentStartDate = document.getElementById('startDate')?.value || today;
      const currentEndDate = document.getElementById('endDate')?.value || today;
      loadDeviceLogs(currentStartDate, currentEndDate);
    };

    window.addEventListener('deviceLogUpdated', handleLogUpdate);

    return () => {
      window.removeEventListener('deviceLogUpdated', handleLogUpdate);
    };
  }, [router]);

  useEffect(() => {
    setFilteredLogs(deviceLogs);
  }, [deviceLogs]);

  const loadDeviceLogs = async (start, end) => {
    const role = localStorage.getItem('userRole');
    let url;
    if (role === 'Admin') {
      url = `${API_URL}?all=true`;
    } else {
      const username = localStorage.getItem('username');
      if (!username) return;
      url = `${API_URL}?username=${encodeURIComponent(username)}`;
    }
    if (start) url += `${url.includes('?') ? '&' : '?'}startDate=${encodeURIComponent(start)}`;
    if (end) url += `&endDate=${encodeURIComponent(end)}`;
    try {
      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) throw new Error('Failed to fetch logs');
      const logs = await response.json();
      logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setDeviceLogs(logs);
    } catch (err) {
      setDeviceLogs([]);
      console.error('Error loading logs:', err);
    }
  };

  const addDeviceLog = async (log) => {
    const username = localStorage.getItem('username');
    if (!username) return;
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...log, username })
      });
      loadDeviceLogs(startDate, endDate, usernameFilter);
      window.dispatchEvent(new Event('deviceLogUpdated'));
    } catch (err) {
      console.error('Error adding log:', err);
    }
  };

  const confirmDeleteLogs = async () => {
  const role = localStorage.getItem('userRole');
  let usernameToDelete;
  if (role === 'Admin' && usernameFilter.trim()) {
    usernameToDelete = usernameFilter.trim();
  } else {
    usernameToDelete = localStorage.getItem('username');
  }
  if (!usernameToDelete || !startDate || !endDate) {
    alert("Username, start date, and end date are required to delete logs.");
    return;
  }
    try {
      await fetch(API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameToDelete, startDate, endDate })
      });
      loadDeviceLogs(startDate, endDate);
      setDeleteConfirmationVisible(false);
    } catch (err) {
      console.error('Error deleting logs:', err);
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    loadDeviceLogs(event.target.value, endDate);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    loadDeviceLogs(startDate, event.target.value);
  };

  const handleUsernameFilterChange = (event) => {
    setUsernameFilter(event.target.value);
  };

  const handleFilterLogs = () => {
    let logs = deviceLogs;
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate + 'T23:59:59') : null;
    const lowerUsernameFilter = usernameFilter.trim().toLowerCase();

    console.log('Filtering logs with username:', lowerUsernameFilter);
    console.log('Device logs before filter:', deviceLogs);

    const filtered = logs.filter((log) => {
      const logDate = new Date(log.timestamp);
      const usernameMatch = lowerUsernameFilter
        ? log.username && log.username.toLowerCase().includes(lowerUsernameFilter)
        : true;
      const isAfterStart = !start || (logDate && logDate >= start);
      const isBeforeEnd = !end || (logDate && logDate <= end);
      return usernameMatch && isAfterStart && isBeforeEnd;
    });
    console.log('Filtered logs:', filtered);
    setFilteredLogs(filtered);
  };

  const handleExportPDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('Device Usage History', 14, 16);

    let logs = filteredLogs;

    if (startDate || endDate) {
      logs = logs.filter((log) => {
        const logDate = new Date(log.timestamp);
        if (startDate && logDate < new Date(startDate)) return false;
        if (endDate && logDate > new Date(endDate + 'T23:59:59')) return false;
        return true;
      });
    }

    const rows = logs.map((log) => {
      const logDate = new Date(log.timestamp);
      const formattedDate = `${String(logDate.getDate()).padStart(2, '0')}-${String(
        logDate.getMonth() + 1
      ).padStart(2, '0')}-${logDate.getFullYear()}`;
      const formattedTime = logDate.toLocaleTimeString();
      return [log.username, log.device, log.room, log.action, formattedDate, formattedTime];
    });

    doc.autoTable({
      head: [['Username', 'Device', 'Room', 'Action', 'Date', 'Time']],
      body: rows,
      startY: 20,
    });

    doc.save('Device_Usage_History.pdf');
  };

  const handleDeleteLogsClick = () => {
    setDeleteConfirmationVisible(true);
  };

  const cancelDeleteLogs = () => {
    setDeleteConfirmationVisible(false);
  };

  return (
    <div>
      <Head>
        <title>Power Usage Charts</title>
        <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" defer></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"
          defer
        ></script>
      </Head>
      <header>
        <h1 id="logo">Smart Home System</h1>
      </header>

      <nav>
        <div id="nav-left">
          <Hamburger onClick={toggleSidebar} />
        </div>
        <div id="nav-center">
          <Link href="/chart" style={{ color: 'white', margin: 0, textDecoration: 'none' }}>
            <h2>Power Charts</h2>
          </Link>
        </div>
        <div id="nav-right">
        </div>
      </nav>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <main>
        <section className="content-section">
          <h3>Device Usage History</h3>
          <div className="date-filter" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label htmlFor="startDate">From: </label>
            <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} />
            <label htmlFor="endDate">To: </label>
            <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} />
            <label htmlFor="usernameFilter">Username: </label>
            <input
              type="text"
              id="usernameFilter"
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
          <UsageHistoryTable logs={filteredLogs} />
          <div className="exportPDFBtn-wrapper" style={{ display: 'flex', gap: '16px', marginTop: 12, marginBottom: 12 }}>
            <button id="exportPDFBtn" onClick={handleExportPDF}>
              Export to PDF
            </button>
            <button id="deleteLogsBtn" onClick={handleDeleteLogsClick}>
              Delete Log
            </button>
          </div>
        </section>

        <section className="content-section">
          <h3>Power Consumption per Device</h3>
          <PowerConsumptionChart logs={deviceLogs} />
        </section>

        <section className="content-section">
          <h3>Estimated Electricity Bill</h3>
          <BillEstimation logs={deviceLogs} />
        </section>
      </main>

      <GuestNoAccessModal isVisible={guestModalVisible} onClose={() => setGuestModalVisible(false)} />
      <DeleteLogsConfirmationModal
        isVisible={deleteConfirmationVisible}
        onConfirm={confirmDeleteLogs}
        onCancel={cancelDeleteLogs}
      />
    </div>
  );
}

export default ChartsPage;