export interface ProfileData {
  identity: {
    name: string;
    titles: string[];
    roleHeadline: string;
    location: string;
    availability: string;
    summary: string;
    avatar: string;
    resumeUrl: string;
    contact: {
      email: string;
      phone: string;
      linkedin: string;
      github: string;
      linkedinUrl: string;
      githubUrl: string;
    };
  };
  impactStats: Array<{
    value: string;
    label: string;
    sublabel: string;
    suffix?: string;
    numericValue?: number;
  }>;
  experiences: Array<{
    role: string;
    company: string;
    location: string;
    period: string;
    mode: string;
    current?: boolean;
    highlights: string[];
    tech: string[];
    track: "fullstack" | "devops" | "both";
  }>;
  projects: Array<{
    title: string;
    tagline: string;
    featured?: boolean;
    problem: string;
    role: string;
    outcome: string;
    description: string;
    tech: string[];
    period: string;
    liveUrl?: string;
    githubUrl?: string;
    image?: string;
    track: "fullstack" | "devops" | "both";
    metrics?: string[];
  }>;
  skills: {
    orbitIcons: Array<{
      name: string;
      category: string;
      color: string;
      track: "fullstack" | "devops" | "both";
    }>;
    groups: Array<{
      category: string;
      track: "fullstack" | "devops" | "both";
      items: Array<{
        name: string;
        level?: string;
      }>;
    }>;
  };
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    period: string;
    grade: string;
  }>;
  training: Array<{
    name: string;
    issuer: string;
    status: string;
  }>;
  pipelineStages: Array<{
    id: string;
    title: string;
    stageNumber: string;
    subtitle: string;
    tools: string[];
    status: "success" | "active" | "queued";
    description: string;
    metrics: string;
    command: string;
  }>;
}

export const PROFILE_DATA: ProfileData = {
  identity: {
    name: "Akash Malviya",
    titles: [
      "Full Stack Developer",
      "DevOps / Cloud Engineer",
      "Cloud Infrastructure Specialist",
      "AWS ECS & Terraform Architect"
    ],
    roleHeadline: "Full Stack Developer & DevOps / Cloud Engineer",
    location: "Bhopal, India",
    availability: "Open to roles in India & Remote",
    summary:
      "Associate Software Engineer and Full Stack Developer with 3+ years of experience designing and operating web applications and cloud-native infrastructure on AWS (with Azure/GCP exposure). Cut deployment time by 60% with GitHub Actions CI/CD, reduced cloud spend by 30% with Fargate Spot and autoscaling, and maintained 99.9% uptime with Blue/Green deployments.",
    avatar: "/Akash.png",
    resumeUrl: "/Akash_Malviya_CV.pdf",
    contact: {
      email: "akashpasay567@gmail.com",
      phone: "+91-9753072646",
      linkedin: "linkedin.com/in/akash-malviya-47069216a",
      github: "github.com/akash93229",
      linkedinUrl: "https://linkedin.com/in/akash-malviya-47069216a",
      githubUrl: "https://github.com/akash93229"
    }
  },

  impactStats: [
    {
      value: "99.9%",
      numericValue: 99.9,
      suffix: "%",
      label: "Uptime Maintained",
      sublabel: "Blue/Green zero-downtime releases"
    },
    {
      value: "60%",
      numericValue: 60,
      suffix: "%",
      label: "Faster Deployments",
      sublabel: "GitHub Actions automated CI/CD"
    },
    {
      value: "30%",
      numericValue: 30,
      suffix: "%",
      label: "AWS Cost Reduction",
      sublabel: "Fargate Spot & autoscaling"
    },
    {
      value: "40%",
      numericValue: 40,
      suffix: "%",
      label: "Faster Release Cycles",
      sublabel: "Jenkins automated pipelines"
    },
    {
      value: "80%",
      numericValue: 80,
      suffix: "%",
      label: "Faster Provisioning",
      sublabel: "Reusable Terraform modules"
    },
    {
      value: "3+",
      numericValue: 3,
      suffix: "+",
      label: "Years Experience",
      sublabel: "Full Stack & Cloud Infrastructure"
    }
  ],

  experiences: [
    {
      company: "UpScaleWebAi Agency",
      role: "Associate Software Engineer I",
      location: "Remote / Project-Based",
      period: "01/2026 – Present",
      mode: "Remote",
      current: true,
      track: "both",
      highlights: [
        "Working in a 2-person engineering team delivering web apps and deployment pipelines for client projects.",
        "Architecting and managing full-stack environments with AWS, Docker, Kubernetes, Terraform, and GitHub Actions.",
        "Overseeing end-to-end deployment pipelines for zero-downtime releases.",
        "Containerised deployment workflows with Docker and AWS ECS across multiple client projects.",
        "Supporting a junior team member and sharing engineering best practices.",
        "Recent 1-week showcase project: StormLane (weather-aware truck routing)."
      ],
      tech: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "React", "Python", "FastAPI"]
    },
    {
      company: "Pearl Thoughts",
      role: "Software Engineer (Intern)",
      location: "Chennai, India (Remote)",
      period: "07/2025 – 01/2026",
      mode: "Remote",
      track: "devops",
      highlights: [
        "Production Strapi CMS on AWS ECS Fargate with Terraform IaC, achieving 99.9% uptime with zero manual provisioning.",
        "GitHub Actions CI/CD cut deployment time by 60%, enabling multiple daily releases.",
        "Implemented AWS CodeDeploy Blue/Green deployment strategy with instant rollback capabilities.",
        "Delivered 30% AWS cost reduction via Fargate Spot capacity providers, right-sizing, and autoscaling.",
        "Containerized multi-tier applications with Docker + AWS ECR across dev, staging, and production environments."
      ],
      tech: ["AWS ECS Fargate", "Terraform", "GitHub Actions", "Docker", "AWS CodeDeploy", "AWS ECR", "CloudWatch"]
    },
    {
      company: "ITSC Technologies",
      role: "Software Engineer",
      location: "Bhopal, India",
      period: "08/2024 – 07/2025",
      mode: "On-site",
      track: "both",
      highlights: [
        "Engineered Jenkins CI/CD pipeline design, accelerating deployment speed by 40% and minimizing manual errors.",
        "Architected Docker-based deployment automation with automated rollback capabilities.",
        "Developed Python enterprise applications integrated seamlessly with AWS cloud services.",
        "Established continuous integration and shift-left testing practices across developer workflows."
      ],
      tech: ["Jenkins", "Docker", "Python", "AWS", "Java", ".NET", "CI/CD Automation"]
    },
    {
      company: "Promact",
      role: "Software Engineering Intern",
      location: "Vadodara, India",
      period: "01/2023 – 03/2023",
      mode: "On-site",
      track: "devops",
      highlights: [
        "Automated CI/CD and Docker workflows deployed on AWS EC2 instances.",
        "Supported infrastructure automation initiatives and Terraform provisioning for repeatable environments."
      ],
      tech: ["Docker", "AWS EC2", "Terraform", "CI/CD Pipelines", "Linux"]
    },
    {
      company: "Pa Say Web Script",
      role: "Software Developer",
      location: "Bhopal, India",
      period: "01/2021 – 01/2022",
      mode: "On-site",
      track: "fullstack",
      highlights: [
        "Built responsive web applications and robust REST APIs with modern frontend and backend architectures.",
        "Spearheaded performance optimizations and cross-browser improvements, boosting page load speeds by 35%."
      ],
      tech: ["JavaScript", "React", "REST APIs", "Node.js", "SQL", "Performance Tuning"]
    }
  ],

  projects: [
    {
      title: "StormLane: Weather-Aware Truck Routing",
      tagline: "Weather-aware route optimization engine built at UpScaleWebAi in 1 week",
      featured: true,
      track: "both",
      period: "2026",
      problem:
        "Standard commercial navigation tools optimize purely for shortest distance or travel duration, ignoring severe en-route weather that jeopardizes truck safety and freight schedules.",
      role:
        "Designed and implemented full-stack architecture, dynamic temporal weather sampling along polyline intervals, and deployment pipeline.",
      outcome:
        "Recommends the safest truck route by dynamically evaluating weather forecasts at the exact estimated arrival time for each segment.",
      description:
        "Weather-aware commercial truck routing application. Computes alternative routes, queries Open-Meteo & TomTom APIs at specific temporal checkpoints, and visualizes route hazards on an interactive MapLibre map.",
      tech: [
        "React",
        "Vite",
        "MapLibre",
        "Django REST Framework",
        "Python",
        "TomTom API",
        "Open-Meteo API",
        "GitHub Actions CI",
        "Vercel",
        "Render"
      ],
      liveUrl: "https://stormlane.vercel.app",
      githubUrl: "https://github.com/akash93229/weather-aware-truck-routing",
      metrics: [
        "Temporal weather checkpoints along route",
        "Built with AI tools (Claude, Copilot) with full review & tests",
        "Vercel frontend + Render backend continuous deployment"
      ]
    },
    {
      title: "Strapi Full Stack Deployment Pipeline",
      tagline: "High-availability AWS ECS Fargate pipeline with Terraform and Blue/Green releases",
      featured: false,
      track: "devops",
      period: "2025 – 2026",
      problem:
        "Enterprise clients needed high-availability CMS deployments with zero downtime, instant rollbacks, and automated scaling without manual provisioning overhead.",
      role:
        "Architected Terraform IaC, ECS Fargate cluster configuration, and GitHub Actions continuous delivery pipelines.",
      outcome:
        "Achieved 99.9% uptime, reduced deployment time by 60%, and slashed cloud costs by 30% using Fargate Spot capacity providers.",
      description:
        "Production-grade Strapi CMS on AWS ECS Fargate. Infrastructure defined 100% via Terraform with multi-environment configuration, automated CodeDeploy Blue/Green zero-downtime release workflows, and centralized CloudWatch alerting.",
      tech: [
        "Terraform",
        "AWS ECS Fargate",
        "AWS ECR",
        "AWS CodeDeploy",
        "GitHub Actions",
        "Docker",
        "CloudWatch",
        "PostgreSQL"
      ],
      githubUrl: "https://github.com/akash93229",
      metrics: [
        "99.9% production uptime",
        "60% reduction in deployment duration",
        "30% AWS cost reduction with Fargate Spot"
      ]
    },
    {
      title: "Terraform AWS DocumentDB Module",
      tagline: "Open-source production-ready Terraform module for Amazon DocumentDB clusters",
      featured: false,
      track: "devops",
      period: "2024",
      problem:
        "Teams were manually configuring DocumentDB instances with inconsistent security group rules, encryption gaps, and slow provisioning cycles.",
      role:
        "Authored modular, parameter-driven Terraform module adhering to AWS Well-Architected framework.",
      outcome:
        "80% faster database provisioning for adopting teams with automated snapshot backups, encryption in transit/at rest, and CloudWatch metrics.",
      description:
        "Reusable, production-grade open-source Terraform module for provisioning and managing Amazon DocumentDB (MongoDB-compatible) clusters with automated encryption, backup retention, audit logging, and subnet group isolation.",
      tech: [
        "Terraform",
        "AWS DocumentDB",
        "AWS KMS",
        "CloudWatch",
        "IaC",
        "MongoDB Protocol"
      ],
      githubUrl: "https://github.com/akash93229",
      metrics: [
        "80% faster infrastructure provisioning",
        "KMS encryption at rest & in transit enabled",
        "Multi-AZ cluster failover support"
      ]
    }
  ],

  skills: {
    orbitIcons: [
      { name: "AWS", category: "Cloud", color: "#FF9900", track: "devops" },
      { name: "Docker", category: "Containers", color: "#2496ED", track: "devops" },
      { name: "Kubernetes", category: "Orchestration", color: "#326CE5", track: "devops" },
      { name: "Terraform", category: "IaC", color: "#7B42BC", track: "devops" },
      { name: "React", category: "Frontend", color: "#61DAFB", track: "fullstack" },
      { name: "Python", category: "Backend", color: "#3776AB", track: "both" },
      { name: "Node.js", category: "Backend", color: "#339933", track: "fullstack" },
      { name: "PostgreSQL", category: "Database", color: "#4169E1", track: "both" },
      { name: "GitHub Actions", category: "CI/CD", color: "#2088FF", track: "devops" },
      { name: "Jenkins", category: "CI/CD", color: "#D24939", track: "devops" }
    ],
    groups: [
      {
        category: "DevOps & Cloud Infrastructure",
        track: "devops",
        items: [
          { name: "AWS (ECS Fargate, ECR, CodeDeploy, EC2, DocumentDB)" },
          { name: "Docker & Multi-Stage Builds" },
          { name: "Kubernetes Orchestration" },
          { name: "Terraform (IaC Automation)" },
          { name: "GitHub Actions CI/CD" },
          { name: "Jenkins Pipeline Architecture" },
          { name: "Blue/Green Deployments" },
          { name: "AWS CloudWatch & Monitoring" }
        ]
      },
      {
        category: "Frontend & Web Architecture",
        track: "fullstack",
        items: [
          { name: "React & React Three Fiber (Three.js)" },
          { name: "TypeScript & JavaScript (ESNext)" },
          { name: "Tailwind CSS & Modern UI Systems" },
          { name: "Angular & Component Architecture" },
          { name: "Vite, Next.js & Build Optimization" },
          { name: "Responsive & Accessible Design (WCAG AA)" }
        ]
      },
      {
        category: "Backend & APIs",
        track: "fullstack",
        items: [
          { name: "Python (FastAPI, Django REST Framework)" },
          { name: "Node.js & Express / RESTful Services" },
          { name: "REST APIs & Microservices Integration" },
          { name: "Strapi Headless CMS" }
        ]
      },
      {
        category: "Databases & Storage",
        track: "both",
        items: [
          { name: "PostgreSQL" },
          { name: "MongoDB" },
          { name: "Amazon DocumentDB" },
          { name: "SQL & Query Optimization" }
        ]
      },
      {
        category: "AI-Assisted Engineering",
        track: "both",
        items: [
          { name: "Claude (Architectural Planning & Prompting)" },
          { name: "GitHub Copilot (Accelerated Development)" },
          { name: "Cursor (AI-driven Refactoring & Review)" },
          { name: "Automated Testing & AI Code Audits" }
        ]
      }
    ]
  },

  education: [
    {
      degree: "B.E. in Computer Science & Engineering",
      institution: "Truba Institute of Engineering & IT (RGPV)",
      location: "Bhopal, India",
      period: "2017 – 2021",
      grade: "CGPA 7.8 / 10"
    }
  ],

  training: [
    {
      name: "AWS Cloud & Software Engineering",
      issuer: "Jetking",
      status: "In Progress"
    },
    {
      name: "Docker & Kubernetes Fundamentals",
      issuer: "Hands-on Container Orchestration",
      status: "Completed"
    },
    {
      name: "Terraform Infrastructure as Code (IaC)",
      issuer: "Production Cloud Provisioning",
      status: "Completed"
    }
  ],

  pipelineStages: [
    {
      id: "stage-1",
      title: "Commit & Shift-Left QA",
      stageNumber: "01",
      subtitle: "Git Hook Verification",
      tools: ["Git", "ESLint", "TypeScript", "Prettier"],
      status: "success",
      description: "Code check-in with pre-commit hooks, static type checks, and semantic release versioning.",
      metrics: "0 lint warnings, 100% type safety",
      command: "git push origin main"
    },
    {
      id: "stage-2",
      title: "Automated CI Testing",
      stageNumber: "02",
      subtitle: "GitHub Actions Parallel Runners",
      tools: ["GitHub Actions", "Jest", "PyTest", "SonarQube"],
      status: "success",
      description: "Automated test suites running in isolated ephemeral Linux containers with branch protection.",
      metrics: "95%+ pass rate, 2.4m run time",
      command: "npm test && pytest --cov=app"
    },
    {
      id: "stage-3",
      title: "Docker Container Build",
      stageNumber: "03",
      subtitle: "Multi-Stage Optimization",
      tools: ["Docker", "AWS ECR", "Trivy Scanner"],
      status: "success",
      description: "Multi-stage Docker builds reducing image size by 45%, scanning CVE vulnerabilities before push.",
      metrics: "-45% image size, 0 high CVEs",
      command: "docker build -t app:latest . && docker push $ECR_REGISTRY"
    },
    {
      id: "stage-4",
      title: "Terraform IaC Validation",
      stageNumber: "04",
      subtitle: "Zero-Manual Cloud Provisioning",
      tools: ["Terraform", "AWS Provider", "TFLint"],
      status: "success",
      description: "Immutable infrastructure validation, state lock via DynamoDB, automated plan output.",
      metrics: "80% faster cloud provisioning",
      command: "terraform plan -out=tfplan && terraform apply tfplan"
    },
    {
      id: "stage-5",
      title: "AWS Blue/Green Release",
      stageNumber: "05",
      subtitle: "CodeDeploy ECS Zero-Downtime",
      tools: ["AWS ECS", "Fargate Spot", "CodeDeploy", "ALB"],
      status: "active",
      description: "Traffic shifting from Green to Blue with automated health checks and instant 1-click rollback.",
      metrics: "99.9% uptime, 0 dropped sessions",
      command: "aws deploy create-deployment --application-name strapi-app"
    },
    {
      id: "stage-6",
      title: "CloudWatch Telemetry & Auto-scale",
      stageNumber: "06",
      subtitle: "Proactive Incident Response",
      tools: ["AWS CloudWatch", "Prometheus", "Grafana", "Alarms"],
      status: "success",
      description: "Synthetic health pings, p99 latency alarms, and automated target tracking autoscaling.",
      metrics: "50% faster incident resolution",
      command: "aws cloudwatch put-metric-alarm --alarm-name p99-latency"
    }
  ]
};
