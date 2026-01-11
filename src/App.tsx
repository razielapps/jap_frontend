// src/App.tsx - UPDATED WITH SCROLL-TO-TOP FIX
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Home } from './components/Home/Home';
import { SectionDetail } from './components/SectionDetail/SectionDetail';
import { usePortfolio } from './components/Hooks/usePortfolio';
import { Loading } from './components/Utils/Loading';
import { Error } from './components/Utils/Error';
import './App.css';

type SectionType = 
  | 'intro' 
  | 'specializations' 
  | 'skills' 
  | 'certifications' 
  | 'interests' 
  | 'learning' 
  | 'blog' 
  | 'traits' 
  | 'projects' 
  | 'contact'
  | null;

function App() {
  const [activeSection, setActiveSection] = useState<SectionType>(null);
  const { portfolio, loading, error, refetch } = usePortfolio();

  // Add a loading state delay for better UX
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Show loading for at least 500ms to prevent flash
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // CRITICAL: Scroll to top when switching between Home and Detail views
  // Using useLayoutEffect for immediate execution before paint
  useLayoutEffect(() => {
    // Scroll to top whenever the view changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'instant' instead of 'smooth' for immediate scroll
    });
    
    // Additional methods for maximum compatibility
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeSection]);

  // Show enhanced loading on initial load
  if (showLoading || loading) {
    return (
      <Loading 
        message="Loading Portfolio" 
        subtext="Preparing your professional showcase"
        variant="card"
      />
    );
  }

  // Show enhanced error state
  if (error || !portfolio) {
    return (
      <Error 
        message={error || 'Unable to load portfolio data'} 
        onRetry={refetch}
        details={error ? `Error details: ${error}` : 'No data received from server'}
      />
    );
  }

  // Handle section detail view
  if (activeSection) {
    return (
      <div className="App section-transition" key={`detail-${activeSection}`}>
        <SectionDetail 
          section={activeSection} 
          portfolio={portfolio} 
          onClose={() => setActiveSection(null)}
          onSectionClick={setActiveSection}
        />
      </div>
    );
  }

  // Show home view
  return (
    <div className="App" key="home">
      <Home 
        portfolio={portfolio} 
        onSectionClick={setActiveSection} 
      />
    </div>
  );
}

export default App;