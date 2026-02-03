
import React, { ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// --- Error Boundary Component ---
// This component catches JavaScript errors anywhere in its child component tree,
// logs those errors, and displays a fallback UI instead of the component tree that crashed.
interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Fix: Explicitly extending React.Component and utilizing standard property initializers 
// to ensure the 'props' property is correctly inherited and typed, resolving the 
// 'Property props does not exist on type ErrorBoundary' error.
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false
  };

  // Fix: Removed the constructor as it was redundant for property initialization in modern React/TS.
  
  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          backgroundColor: '#f8fafc',
          color: '#334155',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>Application Error</h1>
          <p style={{ fontSize: '1rem', marginBottom: '2rem', maxWidth: '400px' }}>
            A critical error occurred, which might be temporary. Please refresh the page to continue.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#f97316',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.875rem',
              textTransform: 'uppercase'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    // Fix: Accessing children from this.props which is now correctly inherited from React.Component.
    return this.props.children;
  }
}


const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
