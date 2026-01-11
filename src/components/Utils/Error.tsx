// src/components/Utils/Error.tsx - UPDATED
import React, { useState } from 'react';
import './Error.css';

interface ErrorProps {
  message: string;
  onRetry?: () => void;
  details?: string; // Optional detailed error information for debugging
}

export const Error: React.FC<ErrorProps> = ({ message, onRetry, details }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="error" role="alert">
      <div className="error-icon">⚠️</div>
      <h3>Oops! Something went wrong</h3>
      <p>{message}</p>
      
      <div className="error-actions">
        {onRetry && (
          <button onClick={onRetry} className="retry-button">
            <span>↻</span> Try Again
          </button>
        )}
        
        {details && (
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="details-button"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-primary)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              marginTop: 'var(--spacing-sm)',
              textDecoration: 'underline'
            }}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        )}
      </div>
      
      {showDetails && details && (
        <pre className="error-details">
          {details}
        </pre>
      )}
    </div>
  );
};