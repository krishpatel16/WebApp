import React from 'react';

function Hamburger({ onClick }) {
  return (
    <div id="hamburger-menu" onClick={onClick}>
      ☰
    </div>
  );
}
export default Hamburger;