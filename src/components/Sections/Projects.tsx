// src/components/Sections/Projects.tsx - UPDATED
import React from 'react';
import { Project } from '../../lib/api';
import './Projects.css';

interface ProjectsProps {
  projects: Project[];
  onViewDetail?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onViewDetail }) => {
  const provableProjects = projects.filter(project => project.provable);
  const conceptProjects = projects.filter(project => !project.provable);
  
  // Combine and sort: provable first, then concepts
  const displayProjects = [
    ...provableProjects.slice(0, 3),
    ...conceptProjects.slice(0, 1)
  ].slice(0, 4); // Show max 4 projects

  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
        <h2 className="section-title">Projects</h2>
        {onViewDetail && (
          <button onClick={onViewDetail} className="view-detail-button">
            View All Projects →
          </button>
        )}
      </div>
      
      <div className="projects-grid">
        {displayProjects.map((project, index) => (
          <article 
            key={project.id} 
            className={`project-preview-card ${project.provable ? 'provable' : 'concept'}`}
            style={{ '--item-index': index } as React.CSSProperties}
          >
            <div className="project-preview-header">
              <h3 className="project-preview-name">{project.project_name}</h3>
            </div>
            
            <div className="project-preview-content">
              <div className="project-preview-purpose">
                <h4>Purpose</h4>
                <p>{project.purpose}</p>
              </div>
              
              {project.demonstration && (
                <div className="project-preview-demonstration">
                  <h4>Demonstration</h4>
                  <p>{project.demonstration}</p>
                </div>
              )}
              
              {project.technologies && (
                <div className="project-preview-technologies">
                  <h4>Technologies</h4>
                  <div className="tech-tags">
                    {project.technologies.split(',').slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech.trim()}</span>
                    ))}
                    {project.technologies.split(',').length > 4 && (
                      <span className="tech-tag more-tech">
                        +{project.technologies.split(',').length - 4}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="project-preview-links">
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Project
                </a>
                
                {project.github_repo && (
                  <a 
                    href={project.github_repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link github-link"
                  >
                    GitHub
                  </a>
                )}
                
                {project.live_demo && (
                  <a 
                    href={project.live_demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link demo-link"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {projects.length > 4 && onViewDetail && (
        <div className="section-footer">
          <button onClick={onViewDetail} className="view-more-button">
            View all {projects.length} projects ({provableProjects.length} provable) →
          </button>
        </div>
      )}
    </section>
  );
};