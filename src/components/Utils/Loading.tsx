// src/components/Utils/Loading.tsx - UPDATED
import React from 'react';
import './Loading.css';

interface LoadingProps {
  message?: string;
  subtext?: string;
  variant?: 'default' | 'card' | 'skeleton';
}

export const Loading: React.FC<LoadingProps> = ({ 
  message = 'Loading portfolio data', 
  subtext,
  variant = 'default' 
}) => {
  if (variant === 'skeleton') {
    return (
      <div className="skeleton-loading">
        <div className="skeleton-line long"></div>
        <div className="skeleton-line medium"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-line long"></div>
        <div className="skeleton-line medium"></div>
      </div>
    );
  }

  const content = (
    <>
      <div className="loading-spinner"></div>
      <p>
        {message}
        <span className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </p>
      {subtext && <p className="loading-subtext">{subtext}</p>}
    </>
  );

  if (variant === 'card') {
    return (
      <div className="loading-card">
        <div className="loading">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="loading">
      {content}
    </div>
  );
};