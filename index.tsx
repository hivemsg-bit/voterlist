
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Analytics } from "@vercel/analytics/react";

console.log("System Initializing: Bharat Election Data Core...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Critical Error: Root element not found.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
        <Analytics />
      </React.StrictMode>
    );
    console.log("System Status: Operational");
  } catch (err) {
    console.error("Mounting Error:", err);
  }
}
