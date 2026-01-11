// src/components/Sections/Intro.tsx - UPDATED
import React from 'react';
import { ME } from '../../lib/api';
import './Intro.css';

interface IntroProps {
  data: Pick<ME, 'name' | 'bio'>;
  onViewDetail?: () => void;
}

export const Intro: React.FC<IntroProps> = ({ data, onViewDetail }) => (
  <section className="intro-section" id="intro">
    <div className="intro-content">
      <div className="intro-header">
        <h1 className="intro-name">{data.name}</h1>
        {onViewDetail && (
          <button onClick={onViewDetail} className="view-detail-button">
            View Full Profile →
          </button>
        )}
      </div>
      
      <div className="intro-bio">
        {data.bio.split('\n').slice(0, 3).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        
        {onViewDetail && (
          <button onClick={onViewDetail} className="read-more-button">
            Read more about me
          </button>
        )}
      </div>
    </div>
  </section>
);