# Akash Malviya — 3D Portfolio & Cloud Engineering Showcase

A high-performance, fully immersive 3D personal portfolio and cloud-native architecture showcase engineered for **Akash Malviya (Full Stack Developer & DevOps / Cloud Engineer)**.

Live Deployment: [https://akash-malviya-portfolio.vercel.app/](https://akash-malviya-portfolio.vercel.app/)

---

## 🌟 Key Highlights

- **Scroll-Driven 3D World (Three.js + React Three Fiber + Drei)**: Persistent 3D canvas behind the page with smooth camera transitions across Full Stack & DevOps worlds.
- **Hero Engine Switcher**: Toggle dynamically between the **3D Cloud Infrastructure Core**, **Liquid Metal Shaders**, and **Liquid Sculpture Particles**.
- **Interactive 3D Skills Orbit**: Draggable, interactive 3D tech globe paired with accessible semantic HTML categories.
- **Interactive CI/CD Pipeline Simulator**: Step-by-step interactive runner simulating Git commit, automated CI, Docker multi-stage builds, Terraform validation, CodeDeploy Blue/Green zero-downtime releases, and CloudWatch telemetry with real-time console logs.
- **3D Case Study Cards**: Tilting glass cards with real-time dynamic light glare calculations and expandable technical case studies for all 3 projects (*StormLane*, *Strapi ECS Pipeline*, *Terraform DocumentDB Module*).
- **Dual-Track Switcher**: Instant `[ Full Stack | DevOps | Both ]` filtering that adapts content, highlights relevant experiences, and shifts 3D camera focal planes.
- **Production Metrics**: 100% verified numbers (99.9% uptime, 60% faster deploys, 30% lower AWS cost, 40% faster releases, 80% faster provisioning, 3+ years experience).

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & Core** | React 19, TypeScript, Vite |
| **Styling & Design System** | Tailwind CSS, shadcn UI primitives, Glassmorphism, CSS Variables |
| **3D & Shaders** | Three.js, `@react-three/fiber`, `@react-three/drei`, WebGL2 GPGPU particles, `@paper-design/shaders-react` |
| **Animation & Micro-interactions** | Framer Motion / Motion, Canvas Confetti |
| **Icons & Typography** | Lucide React, Space Grotesk, Inter, JetBrains Mono |
| **CI/CD & Deployment** | GitHub Actions CI workflow, Vercel |

---

## 📁 Project Architecture & Component Path Convention

```
Portfolio/
├── components/
│   ├── 3d/
│   │   ├── Scene3D.tsx              # Persistent R3F scroll-driven 3D world
│   │   └── SkillsGlobe.tsx          # Draggable 3D interactive skills globe
│   ├── ui/                          # shadcn UI primitive library (/components/ui)
│   │   ├── button.tsx               # Reusable button variant primitive
│   │   ├── badge.tsx                # Status badge primitive
│   │   ├── card.tsx                 # Base card container
│   │   ├── liquid-metal-hero.tsx    # Interactive shader hero
│   │   ├── liquid-sculpture-hero.tsx# WebGL2 GPGPU particle hero
│   │   └── ...                      # Demos
│   ├── AboutSection.tsx             # Dual specialization narrative & credentials
│   ├── ContactSection.tsx           # 1-click email copy & direct message form
│   ├── ExperienceSection.tsx        # Career timeline container
│   ├── ExperienceTimeline.tsx       # Glowing 3D timeline with role milestones
│   ├── HeroSection.tsx              # Dynamic hero with mode selector
│   ├── ImpactStrip.tsx              # Animated impact counters with real metrics
│   ├── Navbar.tsx                   # Track switcher, visual mode dropdown, theme toggle
│   ├── PipelineVisual.tsx           # Interactive CI/CD conveyor & console terminal
│   ├── ProjectCard3D.tsx            # Tilting 3D card with glare & case-study modal
│   └── ProjectsSection.tsx          # Production & open source project showcase
├── data/
│   └── profile.ts                   # Central source of truth for all portfolio data
├── lib/
│   └── utils.ts                     # cn() class merging utility (clsx + tailwind-merge)
├── public/
│   ├── Akash.png                    # Profile portrait
│   └── Akash_Malviya_CV.pdf         # Resume PDF for direct 1-click downloads
└── .github/
    └── workflows/
        └── ci.yml                   # Automated lint, typecheck, and build verification
```

### Why the `/components/ui` Path is Standard

The `/components/ui` directory is the canonical convention established by shadcn/ui:
1. **Separation of Concerns**: Isolates low-level design system primitives (`Button`, `Card`, `Badge`) from domain-specific composite sections (`ProjectsSection`, `Navbar`).
2. **CLI & Component Tooling Compatibility**: Automated component registries (e.g., shadcn CLI, 21st.dev) rely on `@/components/ui/*` as the default import alias target.
3. **Reusability & Clean Imports**: Allows consuming any primitive anywhere with predictable, structured imports like `import { Button } from '@/components/ui/button'`.

---

## ✏️ How to Edit Content & Customize

### 1. Edit Profile Details
All text, metrics, experiences, skills, and links live in one typed file:
👉 **`data/profile.ts`**
Edit your bio, titles, contact info, or add new experiences/projects without needing to touch UI components.

### 2. Download CV File
The CV download button points directly to:
👉 **`public/Akash_Malviya_CV.pdf`**
To update your CV, simply replace this file with your updated PDF.

### 3. Customize Colors & Shaders
- **Color Palettes**: Open `tailwind.config.js` and `src/index.css` to tweak primary, secondary, and accent colors.
- **3D Core Colors**: In `components/3d/Scene3D.tsx`, customize `CloudInfrastructureCore` colors for Full Stack (`#06B6D4`), DevOps (`#6366F1`), or Both (`#818CF8`).

---

## 🚀 Local Development & Deployment

### Run Locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Deploy to Vercel
Deploy with 1 command via the Vercel CLI or by pushing to GitHub:
```bash
# Push to GitHub (triggers automated Vercel deployment)
git add .
git commit -m "Rebuild 3D portfolio with full-stack & DevOps architecture"
git push origin main

# Or deploy directly via Vercel CLI
npx vercel --prod
```
