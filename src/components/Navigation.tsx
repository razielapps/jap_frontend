// src/components/Navigation.tsx - UPDATED WITH MOBILE MENU FOOTER
import React, { useState, useEffect } from 'react';
import './Navigation.css';

interface NavigationProps {
  sections: Array<{ id: string; name: string }>;
  onSectionClick: (section: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ sections, onSectionClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setIsMenuOpen(false); // Close menu on mobile after click
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Desktop Navigation */}
        <div className="nav-desktop">
          <div className="nav-links-container">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className="nav-link"
              >
                {section.name}
              </button>
            ))}
          </div>
          <div className="nav-brand">
            <span className="nav-logo">JAP</span>
          </div>
        </div>

        {/* Mobile Navigation Header */}
        <div className="nav-mobile-header">
          <span className="nav-logo-mobile">JAP</span>
          <button 
            className="menu-toggle" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation Menu (Full Screen Overlay) */}
        <div className={`nav-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <span className="mobile-menu-logo">JAP</span>
            <button 
              className="menu-close" 
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          
          <div className="mobile-menu-links">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className="mobile-nav-link"
              >
                {section.name}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Footer */}
          <div className="mobile-menu-footer">
            <p>Scroll for more sections</p>
            <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.25rem' }}>
              Tap any section to view details
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};