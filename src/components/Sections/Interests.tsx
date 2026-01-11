// src/components/Sections/Interests.tsx - UPDATED
import React from 'react';
import { Interest } from '../../lib/api';
import './Interests.css';

interface InterestsProps {
  interests: Interest[];
  onViewDetail?: () => void;
}

export const Interests: React.FC<InterestsProps> = ({ interests, onViewDetail }) => (
  <section className="interests-section" id="interests">
    <div className="section-header">
      <h2 className="section-title">Interests</h2>
      {onViewDetail && (
        <button onClick={onViewDetail} className="view-detail-button">
          View All Interests →
        </button>
      )}
    </div>
    
    <div className="interests-grid">
      {interests.slice(0, 6).map((interest, index) => (
        <article key={interest.id} className="interest-preview-card"
          style={{ '--item-index': index } as React.CSSProperties}>
          
          <h3 className="interest-preview-name">{interest.interest_name}</h3>
          
          <div className="interest-preview-meta">
            <span className="interest-preview-since">
              Since: {interest.since_interested}
            </span>
          </div>
          
          {interest.description && (
            <p className="interest-preview-description">{interest.description}</p>
          )}
          
          {!interest.description && (
            <p className="interest-preview-description">
              Passionate about {interest.interest_name.toLowerCase()} with ongoing exploration and learning.
            </p>
          )}
        </article>
      ))}
    </div>
    
    {interests.length > 6 && onViewDetail && (
      <div className="section-footer">
        <button onClick={onViewDetail} className="view-more-button">
          View all {interests.length} interests →
        </button>
      </div>
    )}
  </section>
);