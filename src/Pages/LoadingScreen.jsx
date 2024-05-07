import React from 'react';
import './CSS/LoadingScreen.css'; // Import the CSS file

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <h1 className="company-name">EUCWAY</h1>
      <div className="loader"></div>
    </div>
  );
}

export default LoadingScreen;
