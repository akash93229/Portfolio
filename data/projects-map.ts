import { PROFILE_DATA } from '@/data/profile';

export interface ProjectDetail {
  slug: string;
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
  track: 'fullstack' | 'devops' | 'both';
  metrics: string[];
}

export const PROJECTS_BY_SLUG: Record<string, ProjectDetail> = {
  'stormlane': {
    slug: 'stormlane',
    title: 'StormLane: Weather-Aware Truck Routing',
    tagline: 'Weather-aware route optimization engine built at UpScaleWebAi in 1 week',
    featured: true,
    track: 'both',
    period: '2026',
    problem:
      'Standard commercial navigation tools optimize purely for shortest distance or travel duration, ignoring severe en-route weather that jeopardizes truck safety and freight schedules.',
    role:
      'Designed and implemented full-stack architecture, dynamic temporal weather sampling along polyline intervals, and automated deployment pipeline.',
    outcome:
      'Recommends the safest truck route by dynamically evaluating weather forecasts at the exact estimated arrival time for each segment.',
    description:
      'Weather-aware commercial truck routing application. Computes alternative routes, queries Open-Meteo & TomTom APIs at specific temporal checkpoints, and visualizes route hazards on an interactive MapLibre map with complete elevation and wind vectors.',
    tech: [
      'React',
      'Vite',
      'MapLibre',
      'Django REST Framework',
      'Python',
      'TomTom API',
      'Open-Meteo API',
      'GitHub Actions CI',
      'Vercel',
      'Render',
    ],
    liveUrl: 'https://stormlane.vercel.app',
    githubUrl: 'https://github.com/akash93229/weather-aware-truck-routing',
    metrics: [
      'Temporal weather checkpoints calculated along polyline intervals',
      'Built with AI tools (Claude, Copilot) with full review & tests',
      'Vercel frontend + Render backend continuous deployment',
      'Multi-alternative route hazard comparison in real-time',
    ],
  },
  'strapi-ecs-pipeline': {
    slug: 'strapi-ecs-pipeline',
    title: 'Strapi Full Stack Deployment Pipeline',
    tagline: 'High-availability AWS ECS Fargate pipeline with Terraform and Blue/Green releases',
    featured: false,
    track: 'devops',
    period: '2025 – 2026',
    problem:
      'Enterprise clients needed high-availability CMS deployments with zero downtime, instant rollbacks, and automated scaling without manual provisioning overhead.',
    role:
      'Architected Terraform IaC, ECS Fargate cluster configuration, and GitHub Actions continuous delivery pipelines.',
    outcome:
      'Achieved 99.9% uptime, reduced deployment time by 60%, and slashed cloud costs by 30% using Fargate Spot capacity providers.',
    description:
      'Production-grade Strapi CMS on AWS ECS Fargate. Infrastructure defined 100% via Terraform with multi-environment configuration, automated CodeDeploy Blue/Green zero-downtime release workflows, and centralized CloudWatch alerting.',
    tech: [
      'Terraform',
      'AWS ECS Fargate',
      'AWS ECR',
      'AWS CodeDeploy',
      'GitHub Actions',
      'Docker',
      'CloudWatch',
      'PostgreSQL',
    ],
    githubUrl: 'https://github.com/akash93229',
    metrics: [
      '99.9% production uptime maintained',
      '60% reduction in deployment duration',
      '30% AWS cost reduction with Fargate Spot capacity providers',
      'Instant automated rollback on failed health checks',
    ],
  },
  'terraform-documentdb': {
    slug: 'terraform-documentdb',
    title: 'Terraform AWS DocumentDB Module',
    tagline: 'Open-source production-ready Terraform module for Amazon DocumentDB clusters',
    featured: false,
    track: 'devops',
    period: '2024',
    problem:
      'Teams were manually configuring DocumentDB instances with inconsistent security group rules, encryption gaps, and slow provisioning cycles.',
    role:
      'Authored modular, parameter-driven Terraform module adhering to AWS Well-Architected framework.',
    outcome:
      '80% faster database provisioning for adopting teams with automated snapshot backups, encryption in transit/at rest, and CloudWatch metrics.',
    description:
      'Reusable, production-grade open-source Terraform module for provisioning and managing Amazon DocumentDB (MongoDB-compatible) clusters with automated encryption, backup retention, audit logging, and subnet group isolation.',
    tech: [
      'Terraform',
      'AWS DocumentDB',
      'AWS KMS',
      'CloudWatch',
      'IaC',
      'MongoDB Protocol',
    ],
    githubUrl: 'https://github.com/akash93229',
    metrics: [
      '80% faster infrastructure provisioning',
      'KMS encryption at rest & in transit enabled by default',
      'Multi-AZ cluster failover support with automated snapshots',
      'Adheres to AWS Well-Architected security best practices',
    ],
  },
};

export function getAllProjectSlugs(): string[] {
  return Object.keys(PROJECTS_BY_SLUG);
}
