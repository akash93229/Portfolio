
import { Experience, Project, SkillGroup, Education, Certification } from './types';

export const EXPERIENCES: Experience[] = [
  {
    company: "PearlThoughts",
    role: "DevOps Intern",
    duration: "July 2025 – Jan 2026",
    location: "Remote",
    bullets: [
      "Architected and deployed end-to-end DevOps pipelines for Strapi CMS application using Docker, AWS ECS Fargate, and Terraform, serving production traffic for enterprise clients.",
      "Reduced deployment time by 60% through implementation of automated CI/CD pipelines using GitHub Actions with automated build, test, and deployment workflows.",
      "Containerized multi-tier applications using Docker with multi-stage builds, reducing image size by 45% and improving deployment speed.",
      "Implemented Blue/Green deployment strategy with AWS CodeDeploy, achieving zero-downtime releases with automated rollback capabilities.",
      "Optimized cloud infrastructure costs by 30% through implementation of Fargate Spot capacity providers and right-sizing of resources.",
      "Established centralized logging and monitoring using AWS CloudWatch with custom metrics and alarms, improving incident response time by 50%."
    ]
  },
  {
    company: "ITSC Technologies Pvt. Ltd",
    role: "Software Engineer",
    duration: "Aug 2024 – Jul 2025",
    location: "Bhopal, India",
    bullets: [
      "Developed and deployed enterprise-level applications using Java, .NET, Angular, and AWS cloud services for multiple client projects.",
      "Engineered and optimized CI/CD pipelines using Jenkins, reducing deployment time by 40% and minimizing manual intervention.",
      "Automated build and deployment workflows using Docker and AWS ECS, improving release frequency from bi-weekly to daily deployments.",
      "Architected cloud infrastructure solutions focusing on application scalability, high availability, and system reliability.",
      "Conducted technical training sessions on Cloud and DevOps best practices, up-skilling team of 15+ developers."
    ]
  },
  {
    company: "Promact Pvt. Ltd",
    role: "DevOps Intern",
    duration: "Jan 2023 – Mar 2023",
    location: "Vadodara, India",
    bullets: [
      "Assisted in building and maintaining CI/CD pipelines for automated application deployment.",
      "Deployed containerized applications on AWS EC2 instances using Docker.",
      "Supported infrastructure automation initiatives using Terraform for consistent environment provisioning."
    ]
  },
  {
    company: "Pa Say Web Script Pvt. Ltd",
    role: "Web Developer",
    duration: "Aug 2021 – Jan 2022",
    location: "Bhopal, India",
    bullets: [
      "Developed responsive web applications using modern frontend and backend technologies.",
      "Optimized application performance, improving page load times by 35%.",
      "Collaborated with design team to implement user-friendly interfaces."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Strapi DevOps Deployment Pipeline",
    description: "Deployed production-grade Strapi CMS application using Docker containers on AWS ECS Fargate with high availability configuration. Implemented complete CI/CD automation and Blue/Green strategy.",
    tech: ["Docker", "AWS ECS", "Terraform", "GitHub Actions", "CodeDeploy"],
    period: "2024 - 2025",
    client: "PearlThoughts",
    link: "https://github.com/akash93229"
  },
  {
    title: "Terraform AWS DocumentDB Cluster Module",
    description: "Developed reusable Terraform modules for Amazon DocumentDB cluster provisioning. Automated cluster creation, backup configuration, encryption, and monitoring setup.",
    tech: ["Terraform", "AWS", "DocumentDB", "IaC"],
    period: "2024",
    link: "https://github.com/akash93229"
  },
  {
    title: "Enterprise CI/CD Pipeline Implementation",
    description: "Designed and implemented Jenkins-based CI/CD pipelines for automated build, test, and deployment workflows. Integrated SonarQube for code quality and achieved 95% success rate.",
    tech: ["Jenkins", "SonarQube", "Docker", "Java", ".NET"],
    period: "2023 - 2024",
    client: "ITSC Technologies",
    link: "https://github.com/akash93229"
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Cloud & Infrastructure",
    skills: ["AWS (ECS, Fargate, ECR, EC2)", "Terraform (IaC)", "IAM", "ALB", "CodeDeploy"]
  },
  {
    category: "DevOps & Automation",
    skills: ["Docker", "Docker Swarm", "CI/CD Pipelines", "GitHub Actions", "Jenkins", "Blue/Green Deployment"]
  },
  {
    category: "Monitoring & Logging",
    skills: ["AWS CloudWatch (Logs, Metrics, Alarms)", "Centralized Logging", "Prometheus", "Grafana"]
  },
  {
    category: "Backend & Databases",
    skills: ["Node.js", "Strapi CMS", "PostgreSQL", "MySQL", "MongoDB", "Amazon DocumentDB", "Nginx"]
  },
  {
    category: "Programming & Tools",
    skills: ["Java", ".NET", "JavaScript (Angular)", "Git", "GitHub", "SonarQube", "Linux"]
  }
];

export const EDUCATION: Education[] = [
  {
    degree: "Bachelor of Engineering - Computer Science",
    school: "RGPV University, Bhopal",
    period: "2017 - 2021",
    location: "Bhopal, India",
    description: "Truba Institute of Engineering & Information Technology"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "AWS Cloud & DevOps",
    issuer: "Jetking Institute",
    status: "In Progress"
  },
  {
    name: "Docker & Kubernetes",
    issuer: "Hands-on Container Orchestration",
    status: "Completed"
  },
  {
    name: "Terraform for Cloud Infrastructure",
    issuer: "Infrastructure as Code Practices",
    status: "Completed"
  }
];

export const KEY_ACHIEVEMENTS = [
  "Reduced deployment time by 40% through CI/CD automation at ITSC Technologies.",
  "Optimized cloud infrastructure costs by 30% using Fargate Spot instances.",
  "Reduced Docker image sizes by 45% using multi-stage builds.",
  "Improved incident response time by 50% through comprehensive monitoring implementation."
];
