// src/components/SectionDetail/SectionDetail.tsx - UPDATED
import React from 'react';
import { ME } from '../../lib/api';
import { Navigation } from '../Navigation';
import './SectionDetail.css';

interface SectionDetailProps {
  section: string;
  portfolio: ME;
  onClose: () => void;
  onSectionClick: (section: string) => void;
}

export const SectionDetail: React.FC<SectionDetailProps> = ({ 
  section, 
  portfolio, 
  onClose,
  onSectionClick
}) => {
  const sections = [
    { id: 'intro', name: 'Intro' },
    { id: 'specializations', name: 'Specializations' },
    { id: 'skills', name: 'Skills' },
    { id: 'certifications', name: 'Certifications' },
    { id: 'interests', name: 'Interests' },
    { id: 'learning', name: 'Learning' },
    { id: 'blog', name: 'Blog' },
    { id: 'traits', name: 'Traits' },
    { id: 'projects', name: 'Projects' },
    { id: 'contact', name: 'Contact' },
  ];

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      'GitHub': '🐙',
      'LinkedIn': '💼',
      'Twitter': '🐦',
      'Email': '📧',
      'Discord': '🎮',
      'Medium': '✍️',
      'Dev.to': '👨‍💻',
      'Website': '🌐',
      'Other': '🔗'
    };
    return icons[platform] || '🔗';
  };

  const renderContent = () => {
    switch(section) {
      case 'intro':
        return (
          <div className="detail-content">
            <h1 className="detail-title">{portfolio.name}</h1>
            <div className="detail-bio">
              {portfolio.bio.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <div className="related-info">
              <h3>Related Specializations</h3>
              <div className="specializations-grid">
                {portfolio.specializations.map(spec => (
                  <div key={spec.id} className="spec-card">
                    <h4>{spec.name}</h4>
                    <p>{spec.specialization_commitment_age} years experience</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'specializations':
        return (
          <div className="detail-content">
            <h1 className="detail-title">Specializations</h1>
            <div className="specializations-grid"> {/* Changed from specializations-detail */}
              {portfolio.specializations.map(spec => (
                <div key={spec.id} className="spec-card"> {/* Changed from spec-detail-card */}
                  <div className="spec-header">
                    <h2>{spec.name}</h2>
                    <span className="years-badge">{spec.specialization_commitment_age} years</span>
                  </div>
                  
                  <div className="spec-details">
                    <div className="detail-group">
                      <h3>Skills</h3>
                      <div className="skills-list">
                        {spec.specialization_skills.split(',').map((skill, idx) => (
                          <span key={idx} className="skill-tag">{skill.trim()}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="detail-group">
                      <h3>Projects</h3>
                      <p>{spec.specialization_projects}</p>
                    </div>
                    
                    <div className="detail-group">
                      <h3>Research</h3>
                      <p>{spec.specialization_research}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="detail-content">
            <h1 className="detail-title">Skills</h1>
            <div className="skills-categories">
              {['Security', 'Backend', 'Technical', 'Soft'].map(category => {
                const categorySkills = portfolio.skills.filter(s => s.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category} className="category-section">
                    <h2>{category} Skills</h2>
                    <div className="skills-grid">
                      {categorySkills.map(skill => (
                        <div key={skill.id} className="skill-detail-card">
                          <div className="skill-header">
                            <h3>{skill.skill_name}</h3>
                            <span className="skill-years">{skill.skill_commitment_age} years</span>
                          </div>
                          
                          <div className="skill-progress">
                            <div className="progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{ width: `${skill.proficiency}%` }}
                              ></div>
                            </div>
                            <span className="progress-text">{skill.proficiency}%</span>
                          </div>
                          
                          {skill.skill_certificates && (
                            <div className="skill-certificates">
                              <p><strong>Certificates:</strong> {skill.skill_certificates}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'certifications':
        return (
          <div className="detail-content">
            <h1 className="detail-title">Education & Certifications</h1>
            <div className="certifications-detail"> {/* This needs CSS */}
              {portfolio.certifications.map(cert => (
                <div key={cert.id} className="certification-detail-card">
                  <div className="cert-header">
                    <h2>{cert.certification_name}</h2>
                    <div className="cert-dates">
                      <span className="date-earned">Earned: {cert.month_year_earned}</span>
                      {cert.month_year_started !== cert.month_year_earned && (
                        <span className="date-started">Started: {cert.month_year_started}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="cert-details">
                    <div className="detail-group">
                      <h3>Skills Acquired</h3>
                      <p>{cert.skills_acquired}</p>
                    </div>
                    
                    {cert.projects_done && (
                      <div className="detail-group">
                        <h3>Projects Completed</h3>
                        <p>{cert.projects_done}</p>
                      </div>
                    )}
                    
                    {cert.comment && (
                      <div className="detail-group">
                        <h3>Notes</h3>
                        <p>{cert.comment}</p>
                      </div>
                    )}
                    
                    <div className="cert-credentials">
                      {cert.credential_id && (
                        <p><strong>Credential ID:</strong> {cert.credential_id}</p>
                      )}
                      {cert.credential_url && (
                        <a 
                          href={cert.credential_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="credential-link"
                        >
                          Verify Credential
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'interests':
        return (
          <div className="detail-content">
            <h1 className="detail-title">Interests</h1>
            <div className="interests-detail">
              {portfolio.interests.map(interest => (
                <div key={interest.id} className="interest-detail-card">
                  <div className="interest-header">
                    <h2>{interest.interest_name}</h2>
                    <span className="interest-since">Since: {interest.since_interested}</span>
                  </div>
                  {interest.description && (
                    <div className="interest-description">
                      <p>{interest.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'learning':
        return (
          <div className="detail-content">
            <h1 className="detail-title">Currently Learning</h1>
            <div className="learning-detail">
              {portfolio.learnings
                .filter(learning => learning.is_active)
                .map(learning => (
                  <div key={learning.id} className="learning-detail-card">
                    <div className="learning-header">
                      <h2>{learning.name}</h2>
                      <div className="learning-progress-display">
                        <span className="progress-value">{learning.progress}%</span>
                        <span className="learning-status">
                          {learning.progress < 100 ? 'In Progress' : 'Completed'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="learning-timeline">
                      <span className="timeline-item">
                        <strong>Started:</strong> {learning.since_when}
                      </span>
                      <span className="timeline-item">
                        <strong>Expected Finish:</strong> {learning.expected_finish_time}
                      </span>
                    </div>
                    
                    <div className="learning-why">
                      <h3>Why I'm Learning This</h3>
                      <p>{learning.why}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );

      case 'blog':
        return (
          <div className="detail-content">
            <h1 className="detail-title">Blog & Writings</h1>
            <div className="blog-detail">
              {portfolio.blogs.map(blog => (
                <div key={blog.id} className="blog-detail-card">
                  <h2>{blog.title}</h2>
                  
                  <div className="blog-meta">
                    {blog.published_date && (
                      <span className="blog-date">
                        Published: {new Date(blog.published_date).toLocaleDateString()}
                      </span>
                    )}
                    {blog.read_time && (
                      <span className="blog-read-time">📖 {blog.read_time} min read</span>
                    )}
                  </div>
                  
                  <div className="blog-summary">
                    <p>{blog.summary}</p>
                  </div>
                  
                  <a 
                    href={blog.medium_blog_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-link"
                  >
                    Read on Medium →
                  </a>
                </div>
              ))}
            </div>
          </div>
        );

      case 'traits':
        return (
          <div className="detail-content">
            <h1 className="detail-title">Professional Traits</h1>
            <div className="traits-detail">
              {portfolio.traits.map(trait => (
                <div key={trait.id} className="trait-detail-card">
                  <div className="trait-header">
                    {trait.icon && <span className="trait-icon">{trait.icon}</span>}
                    <h2>{trait.trait_name}</h2>
                  </div>
                  <div className="trait-comment">
                    <p>{trait.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="detail-content">
            <h1 className="detail-title">Projects</h1>
            <div className="projects-detail">
              {portfolio.projects.map(project => (
                <div key={project.id} className="project-detail-card">
                  <div className="project-header">
                    <h2>{project.project_name}</h2>
                    {project.provable && (
                      <span className="project-badge provable">✓ Provable</span>
                    )}
                    {!project.provable && (
                      <span className="project-badge concept">Concept</span>
                    )}
                  </div>
                  
                  <div className="project-details">
                    <div className="detail-group">
                      <h3>Purpose</h3>
                      <p>{project.purpose}</p>
                    </div>
                    
                    <div className="detail-group">
                      <h3>Demonstration</h3>
                      <p>{project.demonstration}</p>
                    </div>
                    
                    <div className="detail-group">
                      <h3>Technologies</h3>
                      <div className="technologies-list">
                        {project.technologies.split(',').map((tech, idx) => (
                          <span key={idx} className="technology-tag">{tech.trim()}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="project-links">
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
                          className="project-link github"
                        >
                          GitHub
                        </a>
                      )}
                      
                      {project.live_demo && (
                        <a 
                          href={project.live_demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link demo"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="detail-content">
            <h1 className="detail-title">Contact & Connect</h1>
            <div className="contact-detail">
              <div className="contact-intro">
                <p>Feel free to reach out through any of these platforms:</p>
              </div>
              
              <div className="contacts-grid">
                {portfolio.contacts.map(contact => (
                  <a
                    key={contact.id}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`contact-detail-card ${contact.is_primary ? 'primary' : ''}`}
                  >
                    <div className="contact-platform">
                      <span className="contact-icon">{getPlatformIcon(contact.platform)}</span>
                      <div className="contact-info">
                        <h3>{contact.platform}</h3>
                        {contact.username && (
                          <p className="contact-username">{contact.username}</p>
                        )}
                      </div>
                    </div>
                    {contact.is_primary && (
                      <span className="primary-badge">Primary Contact</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return <div className="section-not-found">Section not found</div>;
    }
  };

  return (
    <div className="section-detail-app">
      <Navigation sections={sections} onSectionClick={onSectionClick} />
      
      <div className="section-detail-container">
        <button className="back-button" onClick={onClose}>
          ← Back to Portfolio
        </button>
        {renderContent()}
      </div>
    </div>
  );
};