
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Enhanced error handling
const renderApp = () => {
  try {
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      throw new Error("Root element not found. Check the HTML structure.");
    }
    
    const root = createRoot(rootElement);
    
    // Add performance mark for metrics
    if (window.performance) {
      window.performance.mark('app-start-render');
    }
    
    root.render(<App />);
    
    // Log successful render
    console.log("Application successfully rendered");
    
    // Clear any previous error messages
    const errorContainer = document.getElementById("error-container");
    if (errorContainer) {
      errorContainer.remove();
    }
  } catch (error) {
    console.error("Failed to render application:", error);
    
    // Create fallback UI in case of render failure
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div id="error-container" style="padding: 2rem; text-align: center; font-family: system-ui, sans-serif;">
          <h2 style="color: #ef4444; margin-bottom: 1rem;">Something went wrong</h2>
          <p style="margin-bottom: 1.5rem;">The application failed to start. Please try refreshing the page.</p>
          <button onclick="window.location.reload()" style="background-color: #3b82f6; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.25rem; cursor: pointer;">
            Refresh Page
          </button>
        </div>
      `;
    }
    
    // Report error to monitoring service (if available)
    if (window.onerror) {
      window.onerror("App render failed", location.href, 0, 0, error);
    }
  }
};

// Ensure DOM is fully loaded before rendering
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// Add unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
