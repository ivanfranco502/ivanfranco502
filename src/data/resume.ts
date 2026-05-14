export const summary = `Software Engineer with 10+ years of experience building distributed, high-throughput backend systems. Strong in .NET, Go (learning), Python, Node.js, message queues, caching, and real-time architectures. Experienced with cloud technologies, Terraform, CI/CD, observability, and debugging complex distributed behaviors. Passionate about offensive security, secure-by-design practices, and systems-level problem-solving. Thrive in fast-paced, high-ambiguity environments and small high-impact teams.`;

export type Experience = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    role: 'Senior Software Engineer',
    company: 'Derivco Sports (Betway)',
    location: 'Barcelona',
    start: 'Jun 2022',
    end: 'Present',
    highlights: [
      'Designed and maintained backend services in .NET for high-traffic sportsbook systems.',
      'Implemented distributed services using REST, GraphQL, and gRPC.',
      'Participated in multi-region platform migrations, improving reliability and scalability.',
      'Led IaC projects with Terraform and managed cloud configurations via Cloudflare.',
      'Improved performance and reduced operational issues through enhanced monitoring and debugging.',
      'Additionally contributed to high-performance UIs using TypeScript (React/Next.js) when needed, enabling smooth collaboration across backend, frontend, and product teams.',
    ],
  },
  {
    role: 'Staff Software Engineer',
    company: 'Betsson Group',
    location: 'Malta',
    start: 'Sep 2019',
    end: 'Jun 2022',
    highlights: [
      'Built and optimized real-time distributed backend systems for sports data delivery.',
      'Implemented high-throughput workflows using RabbitMQ and Redis.',
      'Maintained low-latency live updates via Diffusion technology.',
      'Used Splunk for monitoring, observability, and incident response.',
    ],
  },
  {
    role: 'Co-Founder / Software Engineer',
    company: 'Tupaca',
    location: 'Buenos Aires',
    start: 'Apr 2018',
    end: 'Sep 2019',
    highlights: [
      'Developed backend services with C#, PHP, microservices, and TDD.',
      'Supported engineering hiring and agile processes.',
    ],
  },
  {
    role: 'Professor (ASP.NET Core)',
    company: 'UTN',
    location: 'Buenos Aires',
    start: 'Sep 2018',
    end: 'Sep 2019',
    highlights: [
      'Taught algorithms, data structures, C#, ASP.NET Core, Entity Framework, testing, and deployment.',
    ],
  },
  {
    role: 'Freelance Software Engineer',
    company: 'Selected Projects',
    location: 'Buenos Aires',
    start: 'Aug 2015',
    end: 'Sep 2019',
    highlights: [
      'Video-conference platform (Symfony, MySQL).',
      'Billing & finance systems (C#, SQL Server).',
      'Management dashboards and data integrations.',
    ],
  },
  {
    role: 'Software Developer / Analyst',
    company: 'APG Consulting',
    location: 'Buenos Aires',
    start: 'Oct 2014',
    end: 'Feb 2016',
    highlights: [
      'Built financial and traceability systems for enterprise clients using .NET and SQL Server.',
    ],
  },
  {
    role: 'Software Developer',
    company: 'APG Consulting',
    location: 'Buenos Aires',
    start: 'Jan 2013',
    end: 'Oct 2014',
    highlights: [
      'Developed applications with .NET, PHP, NHibernate, Doctrine, and Symfony.',
    ],
  },
];

export type Education = {
  degree: string;
  institution: string;
  location: string;
  start: string;
  end: string;
};

export const education: Education[] = [
  {
    degree: 'Information Systems Engineer',
    institution: 'UTN',
    location: 'Buenos Aires',
    start: 'Mar 2009',
    end: 'Dec 2014',
  },
];

export const skillGroups: { label: string; items: string[] }[] = [
  { label: 'Backend', items: ['.NET (C#)', 'Go (learning)', 'Python', 'PHP', 'Node.js'] },
  { label: 'API & Service Communication', items: ['gRPC', 'REST', 'GraphQL'] },
  { label: 'Distributed Systems', items: ['RabbitMQ', 'Redis'] },
  { label: 'Cloud / Infra', items: ['Terraform', 'Docker', 'Cloudflare', 'CI/CD'] },
  { label: 'Monitoring & Observability', items: ['Grafana', 'Splunk', 'ElasticSearch'] },
  { label: 'Databases', items: ['MS SQL Server', 'MySQL', 'PostgreSQL'] },
  { label: 'Security', items: ['Secure coding', 'Pentesting fundamentals', 'Automation tooling'] },
  { label: 'Frontend', items: ['TypeScript', 'React', 'Next.js'] },
];

export const languages: { name: string; level: string }[] = [
  { name: 'Spanish', level: 'Native speaker' },
  { name: 'English', level: 'Full professional' },
  { name: 'Italian', level: 'Elementary' },
];

export const externalProfiles: { label: string; href: string; icon: string }[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ivanfranco89', icon: 'simple-icons:linkedin' },
  { label: 'GitHub', href: 'https://github.com/ivanfranco502', icon: 'simple-icons:github' },
];
