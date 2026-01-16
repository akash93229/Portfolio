# Akash Malviya - DevOps Portfolio

A modern, responsive portfolio website showcasing DevOps engineering expertise, cloud infrastructure projects, and professional experience.

![Portfolio Preview](./Akash.png)

## 🌐 Live Demo

**[View Live Portfolio →](https://portfolio-akash-malviya.vercel.app)**

## ✨ Features

- **Modern UI/UX** - Clean, professional design with dark/light theme toggle
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Contact Form** - Functional email system with dual notifications (admin + user confirmation)
- **Interactive Elements** - Smooth animations and hover effects
- **SEO Optimized** - Meta tags and semantic HTML structure

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

### Backend
- **FastAPI** - Python web framework
- **SQLite** - Database
- **SMTP** - Email service (Gmail)
- **Alembic** - Database migrations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Git

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Set environment variables
export EMAIL_HOST=smtp.gmail.com
export EMAIL_PORT=587
export EMAIL_USER=your-email@gmail.com
export EMAIL_PASSWORD=your-app-password
export EMAIL_USE_TLS=true

# Run server
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 📁 Project Structure

```
├── App.tsx              # Main React component
├── components/          # Reusable UI components
│   ├── Navbar.tsx
│   ├── ProjectCard.tsx
│   ├── SkillBadge.tsx
│   ├── ExperienceItem.tsx
│   └── SectionHeading.tsx
├── constants.ts         # Data constants
├── types.ts            # TypeScript interfaces
├── backend/            # FastAPI backend
│   ├── app/
│   │   ├── api/        # API endpoints
│   │   ├── core/       # Config & email
│   │   ├── db/         # Database models
│   │   └── schemas/    # Pydantic schemas
│   └── alembic/        # DB migrations
└── index.html          # Entry point
```

## 📧 Contact Form

The contact form sends two emails:
1. **Admin Notification** - Sent to portfolio owner with client details
2. **User Confirmation** - Sent to the user confirming message receipt

## 🎨 Sections

- **Hero** - Introduction with profile image
- **About** - Professional summary with key achievements
- **Skills** - Technical arsenal organized by category
- **Experience** - Work history timeline
- **Projects** - Featured DevOps projects
- **Education** - Academic background & certifications
- **Contact** - Contact form and social links

## 👤 Author

**Akash Malviya**
- DevOps Engineer | Cloud Infrastructure Specialist
- 📧 akashpasay567@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/akash-malviya-47069216a)
- 🐙 [GitHub](https://github.com/akash93229)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ If you found this helpful, please star the repository!
