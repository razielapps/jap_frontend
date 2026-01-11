# JAP Portfolio (Just Another Portfolio)

A minimal, content-focused portfolio application for cybersecurity and backend security engineers. Built with Django REST Framework backend and Vite + React TypeScript frontend.

## 🎯 Philosophy

**JAP - Just Another Portfolio** emphasizes delivery and detail over impression and hype. It's designed for security professionals who want to showcase their expertise, projects, and professional journey in a straightforward, information-dense format.

## 🏗️ Tech Stack

### Backend
- **Django** (Python web framework)
- **Django REST Framework** (API development)
- **PostgreSQL/MySQL** (Database - configurable)
- **Swagger/OpenAPI** (API documentation)
- **CORS Headers** (Cross-origin resource sharing)

### Frontend
- **React 18** (UI library)
- **TypeScript** (Type safety)
- **Vite** (Build tool & dev server)
- **Axios** (HTTP client)
- **CSS3** (Styling - no frameworks)

## 📁 Project Structure

```
jap-portfolio/
├── backend/                    # Django project
│   ├── portfolio/              # Main app
│   │   ├── models.py           # Database models
│   │   ├── serializers.py      # API serializers
│   │   ├── views.py            # ViewSets
│   │   ├── urls.py             # API routes
│   │   └── admin.py           # Admin configuration
│   ├── manage.py
│   └── requirements.txt
│
└── frontend/                   # React TypeScript
    ├── src/
    │   ├── components/
    │   │   ├── Sections/       # Portfolio sections
    │   │   ├── Hooks/          # Custom hooks
    │   │   ├── Utils/          # Utility components
    │   │   └── Navigation.tsx  # Main navigation
    │   ├── lib/
    │   │   └── api.ts          # API client & types
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── .env
```

## 🗄️ Database Models

The portfolio consists of 10 main models:

1. **ME** - Personal information
2. **Specialization** - Areas of expertise
3. **Skill** - Technical and professional skills
4. **Certification** - Education and certifications
5. **Interest** - Personal interests
6. **Learning** - Current learning goals
7. **Blog** - Articles and writings
8. **Project** - Portfolio projects
9. **Contact** - Social links
10. **ProfessionalTrait** - Work traits and characteristics

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL/MySQL (or SQLite for development)

### Backend Setup

```bash
# Clone and navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure database in settings.py
# Set up DATABASES for your preferred database

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Load sample data (optional)
python manage.py shell < populate_data.py

# Run development server
python manage.py runserver
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Update VITE_API_URL to match your backend

# Start development server
npm run dev
```

## 🔌 API Endpoints

The backend exposes RESTful endpoints:

- `GET /api/me/portfolio_data/` - Complete portfolio data
- `GET /api/specializations/` - Specializations
- `GET /api/skills/` - Skills (with `/by_category/` grouping)
- `GET /api/certifications/` - Certifications
- `GET /api/interests/` - Interests
- `GET /api/learnings/` - Current learnings
- `GET /api/blogs/` - Blog posts
- `GET /api/projects/` - Projects (with `/provable/` filter)
- `GET /api/contacts/` - Contact links
- `GET /api/traits/` - Professional traits

All endpoints support query parameter `?me_id=` for filtering.

## 🎨 Frontend Components

The frontend is organized into modular sections:

1. **Intro** - Name and bio
2. **Specializations** - Expertise areas with experience
3. **Skills** - Technical skills by category with proficiency
4. **Certifications** - Education and certificates
5. **Interests** - Personal interests
6. **Learning** - Current learning progress
7. **Blog** - Articles and writings
8. **Traits** - Professional characteristics
9. **Projects** - Portfolio projects with links
10. **Contact** - Social and professional links

## ⚙️ Configuration

### Environment Variables

**Backend (.env or settings.py):**
```python
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/jap_portfolio

# Security
SECRET_KEY=your-secret-key-here
DEBUG=True  # Set to False in production
ALLOWED_HOSTS=['localhost', '127.0.0.1']

# CORS
CORS_ALLOWED_ORIGINS=['http://localhost:5173']
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:8000/api
VITE_PORT=5173
```

## 📦 Deployment

### Backend (Django)
```bash
# Collect static files
python manage.py collectstatic

# Use Gunicorn for production
gunicorn backend.wsgi:application

# Or deploy to platforms like:
# - Heroku
# - PythonAnywhere
# - AWS Elastic Beanstalk
# - DigitalOcean App Platform
```

### Frontend (Vite)
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to platforms like:
# - Vercel
# - Netlify
# - GitHub Pages
# - Cloudflare Pages
```

## 🔧 Customization

### Adding New Sections

1. **Backend**: Add model, serializer, and viewset
2. **Frontend**: Create component in `src/components/Sections/`
3. **Integration**: Update `usePortfolio` hook and Home component

### Styling

The CSS follows a simple pattern:
- Minimal, component-scoped styles
- CSS variables for easy theming
- Mobile-first responsive design
- No CSS frameworks for maximum control

### Content Management

Use Django Admin at `/admin` to:
- Add/update personal information
- Manage skills and certifications
- Add new projects and blog posts
- Update contact information

## 📱 Features

- **Single Page Application** - Smooth navigation
- **Responsive Design** - Works on all devices
- **Fast Loading** - Optimized API calls
- **Accessibility** - Semantic HTML and ARIA
- **Type Safety** - Full TypeScript coverage
- **Easy Updates** - Django admin interface

## 🧪 Testing

```bash
# Backend tests
python manage.py test portfolio

# Frontend tests (when configured)
npm test
```

## 🔒 Security Considerations

- Django's built-in security features
- CORS properly configured
- SQL injection protection
- XSS protection via React
- Environment variable management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with tests
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Django and Django REST Framework teams
- React and Vite communities
- Security professionals who inspired this portfolio approach

---

**Built for engineers who build with purpose, not hype.**
