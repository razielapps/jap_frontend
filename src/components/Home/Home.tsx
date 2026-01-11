// src/components/Home/Home.tsx - UPDATED WITH SCROLL-TO-SECTION
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ME } from '../../lib/api';
import { Navigation } from '../Navigation';
import { Intro } from '../Sections/Intro';
import { Specializations } from '../Sections/Specializations';
import { Skills } from '../Sections/Skills';
import { Certifications } from '../Sections/Certifications';
import { Interests } from '../Sections/Interests';
import { Learning } from '../Sections/Learning';
import { BlogSection } from '../Sections/Blog';
import { Traits } from '../Sections/Traits';
import { Projects } from '../Sections/Projects';
import { ContactSection } from '../Sections/Contact';
import './Home.css';

interface HomeProps {
  portfolio: ME;
  onSectionClick: (section: string) => void;
}

export const Home: React.FC<HomeProps> = ({ portfolio, onSectionClick }) => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
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

  // Function to scroll to a specific section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const headerOffset = 80; // Height of sticky navigation
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll progress indicator
  useEffect(() => {
    const updateProgressBar = () => {
      const progressBar = document.querySelector('.scroll-progress') as HTMLElement;
      if (progressBar) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.transform = `scaleX(${scrolled / 100})`;
      }
    };

    window.addEventListener('scroll', updateProgressBar);
    
    // Initial call to set progress on mount
    updateProgressBar();
    
    return () => window.removeEventListener('scroll', updateProgressBar);
  }, []);

  // Scroll to section when activeSection changes
  useEffect(() => {
    if (activeSection) {
      // Small delay to ensure the DOM is ready
      const timer = setTimeout(() => {
        scrollToSection(activeSection);
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [activeSection, scrollToSection]);

  const handleNavigationClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setActiveSection(sectionId);
  };

  return (
    <div className="portfolio-app">
      {/* Scroll progress indicator */}
      <div className="scroll-progress"></div>
      
      <Navigation 
        sections={sections} 
        onSectionClick={handleNavigationClick} 
      />
      
      <div className="portfolio-container">
        <main className="portfolio-content">
          {/* Each section with ref for scroll tracking */}
          <div 
            ref={el => sectionRefs.current['intro'] = el} 
            className="section-wrapper"
            id="intro"
          >
            <Intro 
              data={{ name: portfolio.name, bio: portfolio.bio }} 
              onViewDetail={() => onSectionClick('intro')} 
            />
          </div>
          
          <div 
            ref={el => sectionRefs.current['specializations'] = el} 
            className="section-wrapper"
            id="specializations"
          >
            <Specializations 
              specializations={portfolio.specializations} 
              onViewDetail={() => onSectionClick('specializations')} 
            />
          </div>
          
          <div 
            ref={el => sectionRefs.current['skills'] = el} 
            className="section-wrapper"
            id="skills"
          >
            <Skills 
              skills={portfolio.skills} 
              onViewDetail={() => onSectionClick('skills')} 
            />
          </div>
          
          <div 
            ref={el => sectionRefs.current['certifications'] = el} 
            className="section-wrapper"
            id="certifications"
          >
            <Certifications 
              certifications={portfolio.certifications} 
              onViewDetail={() => onSectionClick('certifications')} 
            />
          </div>
          
          <div 
            ref={el => sectionRefs.current['interests'] = el} 
            className="section-wrapper"
            id="interests"
          >
            <Interests 
              interests={portfolio.interests} 
              onViewDetail={() => onSectionClick('interests')} 
            />
          </div>
          
          <div 
            ref={el => sectionRefs.current['learning'] = el} 
            className="section-wrapper"
            id="learning"
          >
            <Learning 
              learnings={portfolio.learnings} 
              onViewDetail={() => onSectionClick('learning')} 
            />
          </div>
          
          <div 
            ref={el => sectionRefs.current['blog'] = el} 
            className="section-wrapper"
            id="blog"
          >
            <BlogSection 
              blogs={portfolio.blogs} 
              onViewDetail={() => onSectionClick('blog')} 
            />
          </div>
          
          <div 
            ref={el => sectionRefs.current['traits'] = el} 
            className="section-wrapper"
            id="traits"
          >
            <Traits 
              traits={portfolio.traits} 
              onViewDetail={() => onSectionClick('traits')} 
            />
          </div>
          
          <div 
            ref={el => sectionRefs.current['projects'] = el} 
            className="section-wrapper"
            id="projects"
          >
            <Projects 
              projects={portfolio.projects} 
              onViewDetail={() => onSectionClick('projects')} 
            />
          </div>
          
          <div 
            ref={el => sectionRefs.current['contact'] = el} 
            className="section-wrapper"
            id="contact"
          >
            <ContactSection 
              contacts={portfolio.contacts} 
              onViewDetail={() => onSectionClick('contact')} 
            />
          </div>
        </main>

        <footer className="portfolio-footer">
          <p>
            <strong>{portfolio.name}</strong> • Portfolio • {new Date().getFullYear()}
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            For The Dev Community
          </p>
        </footer>
      </div>
    </div>
  );
};