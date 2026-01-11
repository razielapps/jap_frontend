// src/components/Sections/Skills.tsx - UPDATED
import React from 'react';
import { Skill } from '../../lib/api';
import './Skills.css';

interface SkillsProps {
  skills: Skill[];
  onViewDetail?: () => void;
}

export const Skills: React.FC<SkillsProps> = ({ skills, onViewDetail }) => {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Define category order for consistent display
  const categoryOrder = ['Security', 'Backend', 'Technical', 'Soft'];
  const orderedCategories = categoryOrder.filter(cat => skillsByCategory[cat]);

  return (
    <section className="skills-section" id="skills">
      <div className="section-header">
        <h2 className="section-title">Technical Skills</h2>
        {onViewDetail && (
          <button onClick={onViewDetail} className="view-detail-button">
            View All Skills →
          </button>
        )}
      </div>
      
      {orderedCategories.slice(0, 2).map((category) => (
        <div key={category} className="skills-category">
          <h3 className="category-title">{category}</h3>
          <div className="skills-grid">
            {skillsByCategory[category]
              .sort((a, b) => b.proficiency - a.proficiency)
              .slice(0, 4)
              .map((skill, index) => (
                <article 
                  key={skill.id} 
                  className="skill-preview-card"
                  style={{ '--item-index': index } as React.CSSProperties}
                >
                  <div className="skill-preview-header">
                    <span className="skill-preview-name">{skill.skill_name}</span>
                    <span className="skill-preview-experience">{skill.skill_commitment_age} years</span>
                  </div>
                  
                  <div className="skill-preview-progress">
                    <div className="skill-preview-progress-text">
                      <span>Proficiency</span>
                      <span>{skill.proficiency}%</span>
                    </div>
                    <div className="skill-preview-progress-bar-container">
                      <div 
                        className="skill-preview-progress-bar" 
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {skill.skill_certificates && (
                    <div className="skill-preview-certificates">
                      <small>Certifications: {skill.skill_certificates}</small>
                    </div>
                  )}
                </article>
              ))}
          </div>
        </div>
      ))}
      
      {orderedCategories.length > 2 && onViewDetail && (
        <div className="category-preview">
          <h3 className="category-title">More Categories</h3>
          <div className="categories-list">
            {orderedCategories.slice(2).map((category, index) => (
              <div 
                key={category} 
                className="category-preview-item"
                style={{ '--item-index': index } as React.CSSProperties}
              >
                <span className="category-name">{category}</span>
                <span className="category-count">{skillsByCategory[category].length} skills</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {skills.length > 8 && onViewDetail && (
        <div className="section-footer">
          <button onClick={onViewDetail} className="view-more-button">
            View all {skills.length} skills across {orderedCategories.length} categories →
          </button>
        </div>
      )}
    </section>
  );
};