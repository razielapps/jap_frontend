// src/lib/api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types based on Django models
export interface ME {
  id: number;
  name: string;
  bio: string;
  created_at: string;
  updated_at: string;
  specializations: Specialization[];
  skills: Skill[];
  certifications: Certification[];
  interests: Interest[];
  learnings: Learning[];
  blogs: Blog[];
  projects: Project[];
  contacts: Contact[];
  traits: ProfessionalTrait[];
}

export interface Specialization {
  id: number;
  name: string;
  specialization_commitment_age: number;
  specialization_skills: string;
  specialization_projects: string;
  specialization_research: string;
  order: number;
}

export interface Skill {
  id: number;
  skill_name: string;
  skill_commitment_age: number;
  skill_certificates: string;
  category: string;
  proficiency: number;
}

export interface Certification {
  id: number;
  certification_name: string;
  skills_acquired: string;
  projects_done: string;
  month_year_started: string;
  month_year_earned: string;
  comment: string;
  credential_id?: string;
  credential_url?: string;
}

export interface Interest {
  id: number;
  interest_name: string;
  since_interested: string;
  description?: string;
}

export interface Learning {
  id: number;
  name: string;
  why: string;
  since_when: string;
  expected_finish_time: string;
  progress: number;
  is_active: boolean;
}

export interface Blog {
  id: number;
  medium_blog_link: string;
  summary: string;
  title: string;
  published_date?: string;
  read_time?: number;
}

export interface Project {
  id: number;
  project_name: string;
  demonstration: string;
  purpose: string;
  provable: boolean;
  link: string;
  technologies: string;
  github_repo?: string;
  live_demo?: string;
}

export interface Contact {
  id: number;
  platform: string;
  link: string;
  username?: string;
  is_primary: boolean;
}

export interface ProfessionalTrait {
  id: number;
  trait_name: string;
  comment: string;
  icon?: string;
}






// API Functions
export const portfolioAPI = {
  // Get complete portfolio data
  getPortfolio: async (): Promise<ME> => {
    const response = await api.get('/me/portfolio_data/');
    return response.data;
  },

  // Individual endpoints (for selective loading if needed)
  getSpecializations: async () => {
    const response = await api.get('/specializations/');
    return response.data;
  },

  getSkills: async () => {
    const response = await api.get('/skills/');
    return response.data;
  },

  getCertifications: async () => {
    const response = await api.get('/certifications/');
    return response.data;
  },

  getInterests: async () => {
    const response = await api.get('/interests/');
    return response.data;
  },

  getLearnings: async () => {
    const response = await api.get('/learnings/');
    return response.data;
  },

  getBlogs: async () => {
    const response = await api.get('/blogs/');
    return response.data;
  },

  getProjects: async () => {
    const response = await api.get('/projects/');
    return response.data;
  },

  getContacts: async () => {
    const response = await api.get('/contacts/');
    return response.data;
  },

  getTraits: async () => {
    const response = await api.get('/traits/');
    return response.data;
  },
};

export default api;