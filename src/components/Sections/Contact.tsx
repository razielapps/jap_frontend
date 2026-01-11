// src/components/Sections/Contact.tsx - UPDATED
import React from 'react';
import { Contact } from '../../lib/api';
import './Contact.css';

interface ContactProps {
  contacts: Contact[];
  onViewDetail?: () => void;
}

export const ContactSection: React.FC<ContactProps> = ({ contacts, onViewDetail }) => {
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

  // Combine all contacts but sort primary first
  const displayContacts = [...contacts]
    .sort((a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0))
    .slice(0, 6); // Show up to 6 contacts

  return (
    <section className="contact-section" id="contact">
      <div className="section-header">
        <h2 className="section-title">Contact & Connect</h2>
        {onViewDetail && (
          <button onClick={onViewDetail} className="view-detail-button">
            All Contact Options →
          </button>
        )}
      </div>
      
      <div className="contact-grid">
        {displayContacts.map((contact, index) => (
          <a
            key={contact.id}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`contact-preview-card ${contact.is_primary ? 'primary-contact' : ''}`}
            style={{ '--item-index': index } as React.CSSProperties}
          >
            <div className="contact-preview-platform">
              <span className="contact-preview-icon">{getPlatformIcon(contact.platform)}</span>
              <h3 className="contact-preview-platform-name">{contact.platform}</h3>
            </div>
            
            {contact.username && (
              <p className="contact-preview-username">{contact.username}</p>
            )}
            
            {contact.is_primary && (
              <span className="contact-preview-label">Primary Contact</span>
            )}
          </a>
        ))}
      </div>
      
      {contacts.length > 6 && onViewDetail && (
        <div className="section-footer">
          <button onClick={onViewDetail} className="view-more-button">
            View all {contacts.length} contact options →
          </button>
        </div>
      )}
    </section>
  );
};