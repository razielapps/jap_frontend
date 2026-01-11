// src/components/Sections/Learning.tsx - UPDATED
import React from 'react';
import { Learning as LearningType } from '../../lib/api';
import './Learning.css';

interface LearningProps {
  learnings: LearningType[];
  onViewDetail?: () => void;
}

export const Learning: React.FC<LearningProps> = ({ learnings, onViewDetail }) => {
  const activeLearnings = learnings.filter(learning => learning.is_active);

  return (
    <section className="learning-section" id="learning">
      <div className="section-header">
        <h2 className="section-title">Currently Learning</h2>
        {onViewDetail && (
          <button onClick={onViewDetail} className="view-detail-button">
            View Learning Journey →
          </button>
        )}
      </div>
      
      <div className="learning-list">
        {activeLearnings.slice(0, 4).map((learning, index) => (
          <article 
            key={learning.id} 
            className="learning-preview-card"
            data-status={learning.progress < 100 ? 'In Progress' : 'Completed'}
            style={{ '--item-index': index } as React.CSSProperties}
          >
            <div className="learning-preview-header">
              <h3 className="learning-preview-name">{learning.name}</h3>
              
              <div className="learning-preview-progress">
                <span className="progress-value">{learning.progress}%</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${learning.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="learning-preview-details">
              <div className="learning-preview-dates">
                <span className="date-item">
                  📅 Started: <strong>{learning.since_when}</strong>
                </span>
                <span className="date-item">
                  🎯 Expected Finish: <strong>{learning.expected_finish_time}</strong>
                </span>
              </div>
              
              <div className="learning-preview-why">
                <h4>Why I'm Learning This</h4>
                <p>{learning.why}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {(activeLearnings.length > 4 || learnings.length > activeLearnings.length) && onViewDetail && (
        <div className="section-footer">
          <button onClick={onViewDetail} className="view-more-button">
            {activeLearnings.length > 4 ? `View all ${activeLearnings.length} active learnings` : 'View completed learnings'} →
          </button>
        </div>
      )}
    </section>
  );
};