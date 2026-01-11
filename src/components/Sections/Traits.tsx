// src/components/Sections/Traits.tsx - UPDATED
import React from 'react';
import { ProfessionalTrait } from '../../lib/api';
import './Traits.css';

interface TraitsProps {
  traits: ProfessionalTrait[];
  onViewDetail?: () => void;
}

export const Traits: React.FC<TraitsProps> = ({ traits, onViewDetail }) => (
  <section className="traits-section" id="traits">
    <div className="section-header">
      <h2 className="section-title">Professional Traits</h2>
      {onViewDetail && (
        <button onClick={onViewDetail} className="view-detail-button">
          View All Traits →
        </button>
      )}
    </div>
    
    <div className="traits-grid">
      {traits.slice(0, 4).map((trait, index) => (
        <article 
          key={trait.id} 
          className="trait-preview-card"
          style={{ '--item-index': index } as React.CSSProperties}
        >
          <div className="trait-preview-header">
            {trait.icon && <span className="trait-preview-icon">{trait.icon}</span>}
            <h3 className="trait-preview-name">{trait.trait_name}</h3>
          </div>
          <p className="trait-preview-comment">{trait.comment}</p>
        </article>
      ))}
    </div>
    
    {traits.length > 4 && onViewDetail && (
      <div className="section-footer">
        <div className="traits-preview">
          <h4>Additional Traits</h4>
          <div className="additional-traits">
            {traits.slice(4, 8).map((trait, index) => (
              <button
                key={trait.id}
                onClick={onViewDetail}
                className="additional-trait"
                style={{ '--item-index': index + 4 } as React.CSSProperties}
              >
                {trait.icon && <span className="trait-icon-small">{trait.icon}</span>}
                <span className="trait-name-small">{trait.trait_name}</span>
              </button>
            ))}
          </div>
        </div>
        <button onClick={onViewDetail} className="view-more-button">
          View all {traits.length} professional traits →
        </button>
      </div>
    )}
  </section>
);