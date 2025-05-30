import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Hamburger from '../components/Hamburger';
import Sidebar from '../components/Sidebar';

const NOTIFICATIONS_API = "https://qaw7e8om7e.execute-api.eu-west-2.amazonaws.com/dev/notifications";

function NotificationsPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (!role) {
      router.push('/login');
      return;
    }
    loadNotifications();
  }, [router]);

  const loadNotifications = async () => {
    const username = localStorage.getItem('username');
    if (!username) {
      setNotifications([]);
      return;
    }
    try {
      const res = await fetch(`${NOTIFICATIONS_API}?username=${encodeURIComponent(username)}`);
      if (!res.ok) throw new Error('Failed to fetch notifications');
      const data = await res.json();
      data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setNotifications(data);
    } catch (err) {
      setNotifications([]);
      console.error('Error loading notifications:', err);
    }
  };

  const clearAllNotifications = async () => {
    const username = localStorage.getItem('username');
    if (!username) return;
    const confirmClear = window.confirm('Are you sure you want to clear all notifications?');
    if (!confirmClear) return;
    try {
    await fetch(`${NOTIFICATIONS_API}?username=${encodeURIComponent(username)}`, {
      method: "DELETE"
    });
    await loadNotifications();

    } catch (err) {
    alert("Failed to clear notifications.");
    console.error(err);
  }
  };

  const deleteNotification = async (timestamp) => {
    const username = localStorage.getItem('username');
    if (!username) return;
    try {
      await fetch(`${NOTIFICATIONS_API}?username=${encodeURIComponent(username)}&timestamp=${encodeURIComponent(timestamp)}`, {
        method: "DELETE"
      });
      await loadNotifications();
    } catch (err) {
      alert("Failed to delete notification.");
      console.error(err);
    }
  };

  return (
    <div>
      <Head>
        <title>Device Notifications</title>
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
          <Link href="/notifications" style={{ color: 'white', margin: 0, textDecoration: 'none' }}>
            <h2>Notifications</h2>
          </Link>
        </div>
        <div id="nav-right"></div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <main>
        <div className="notifications-container">
          <section className="notification-section">
            <h3>Scheduled Device Notifications</h3>
            <div id="notificationsList">
              {notifications.length === 0 ? (
                <div className="empty-state">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                    alt="No Notifications"
                    className="empty-icon"
                  />
                  <p>No notifications to show.</p>
                </div>
              ) : (
                notifications.map((n, i) => (
                  <div className="notification-item" key={n.timestamp + n.device}>
                    <div className="notification-message">
                      <strong>Device:</strong> {n.device} <br />
                      <strong>Room:</strong> {n.room} <br />
                      <strong>Scheduled by:</strong> {n.username} <br />
                      <strong>Turn ON:</strong> {n.turnOnTime} <br />
                      <strong>Turn OFF:</strong> {n.turnOffTime} <br />
                    </div>
                    <button
                      onClick={() => deleteNotification(n.timestamp)}
                      title="Delete notification"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        marginLeft: '10px'
                      }}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                        alt="Delete"
                        style={{ width: '24px', height: '24px' }}
                      />
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
          <div className="clear-btn-wrapper">
            <button id="clearAllBtn" className="clear-all-btn" onClick={clearAllNotifications}>
              🧹 Clear All Notifications
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotificationsPage;