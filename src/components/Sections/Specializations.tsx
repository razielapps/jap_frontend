// src/components/Sections/Specializations.tsx - UPDATED
import React from 'react';
import { Specialization } from '../../lib/api';
import './Specializations.css';

interface SpecializationsProps {
  specializations: Specialization[];
  onViewDetail?: () => void;
}

export const Specializations: React.FC<SpecializationsProps> = ({ specializations, onViewDetail }) => (
  <section className="specializations-section" id="specializations">
    <div className="section-header">
      <h2 className="section-title">Specializations</h2>
      {onViewDetail && (
        <button onClick={onViewDetail} className="view-detail-button">
          View All Specializations →
        </button>
      )}
    </div>
    
    <div className="specializations-grid">
      {specializations.slice(0, 2).map((spec, index) => (
        <article 
          key={spec.id} 
          className="specialization-preview-card"
          style={{ '--item-index': index } as React.CSSProperties}
        >
          <div className="specialization-preview-header">
            <h3 className="specialization-preview-title">{spec.name}</h3>
            <span className="specialization-preview-experience">
              {spec.specialization_commitment_age} years
            </span>
          </div>
          
          <div className="specialization-preview-detail">
            <h4>Skills</h4>
            <div className="skills-preview">
              {spec.specialization_skills.split(',').slice(0, 4).map((skill, idx) => (
                <span key={idx} className="skill-preview">{skill.trim()}</span>
              ))}
              {spec.specialization_skills.split(',').length > 4 && (
                <span className="more-skills">
                  +{spec.specialization_skills.split(',').length - 4} more
                </span>
              )}
            </div>
          </div>
          
          <div className="specialization-preview-detail">
            <h4>Projects</h4>
            <p>{spec.specialization_projects}</p>
          </div>
          
          {spec.specialization_research && (
            <div className="specialization-preview-detail">
              <h4>Research</h4>
              <p>{spec.specialization_research}</p>
            </div>
          )}
          
          {onViewDetail && (
            <button onClick={onViewDetail} className="card-action-button">
              Learn more about {spec.name} →
            </button>
          )}
        </article>
      ))}
    </div>
    
    {specializations.length > 2 && onViewDetail && (
      <div className="section-footer">
        <div className="other-specializations">
          <h4>More Specializations</h4>
          <div className="other-specs-list">
            {specializations.slice(2).map((spec, index) => (
              <div 
                key={spec.id} 
                className="other-spec-item"
                style={{ '--item-index': index } as React.CSSProperties}
              >
                <span className="other-spec-name">{spec.name}</span>
                <span className="other-spec-years">{spec.specialization_commitment_age} years</span>
              </div>
            ))}
          </div>
        </div>
        
        <button onClick={onViewDetail} className="view-more-button">
          View all {specializations.length} specializations →
        </button>
      </div>
    )}
  </section>
);