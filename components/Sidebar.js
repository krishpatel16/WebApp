import React from 'react';
import Link from 'next/link';

function Sidebar({ isOpen, onClose }) {
  return (
    <div id="sidebar" className="sidebar" style={{ display: isOpen ? 'block' : 'none' }}>
      <button id="close-btn" onClick={onClose}>
        &times;
      </button>
      <Link href="/">Login</Link>
      <Link href="/home">Home</Link>
      <Link href="/chart">Charts</Link>
      <Link href="/notifications">Notifications</Link>
    </div>
  );
}
export default Sidebar;