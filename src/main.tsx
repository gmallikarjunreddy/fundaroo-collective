
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Wrap in a try-catch to prevent crashed renders in production
try {
  // Create root once and render the app
  const rootElement = document.getElementById("root");
  
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
  } else {
    console.error("Root element not found. Check the HTML structure.");
  }
} catch (error) {
  console.error("Failed to render application:", error);
  
  // Create minimal fallback UI in case of render failure
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h2>Something went wrong</h2>
        <p>The application failed to start. Please try refreshing the page.</p>
      </div>
    `;
  }
}
