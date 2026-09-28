import type { User, ActivityItem, AppNotification, ChartDataPoint, DayActivity, StatusDistribution, KpiMetric } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-9481',
    name: 'Marcus Vance',
    email: 'marcus.vance@acmewave.io',
    role: 'Administrator',
    department: 'Engineering',
    status: 'Active',
    lastActive: '2 minutes ago',
    createdAt: '2025-03-14',
    phone: '+1 (555) 234-8910',
    location: 'San Francisco, CA',
    bio: 'Platform infrastructure architect and root workspace admin.',
    mfaEnabled: true
  },
  {
    id: 'usr-8192',
    name: 'Elena Rostova',
    email: 'elena.rostova@acmewave.io',
    role: 'Engineering Lead',
    department: 'Engineering',
    status: 'Active',
    lastActive: '8 minutes ago',
    createdAt: '2025-04-02',
    phone: '+1 (555) 902-1144',
    location: 'Seattle, WA',
    bio: 'Distributed microservices lead and core API maintainer.',
    mfaEnabled: true
  },
  {
    id: 'usr-7231',
    name: 'David Kalu',
    email: 'david.kalu@acmewave.io',
    role: 'Senior Engineer',
    department: 'Engineering',
    status: 'Active',
    lastActive: '14 minutes ago',
    createdAt: '2025-06-19',
    phone: '+1 (555) 831-7729',
    location: 'Austin, TX',
    bio: 'Frontend architecture specialist and design system champion.',
    mfaEnabled: true
  },
  {
    id: 'usr-6612',
    name: 'Sarah Chen-Morrison',
    email: 'sarah.chen@acmewave.io',
    role: 'Product Manager',
    department: 'Product & Design',
    status: 'Active',
    lastActive: '25 minutes ago',
    createdAt: '2025-05-11',
    phone: '+1 (555) 341-9988',
    location: 'New York, NY',
    bio: 'Oversees customer workflow analytics and enterprise roadmap.',
    mfaEnabled: true
  },
  {
    id: 'usr-5890',
    name: 'Julian Sterling',
    email: 'julian.sterling@acmewave.io',
    role: 'Security Analyst',
    department: 'Security & Compliance',
    status: 'Active',
    lastActive: '1 hour ago',
    createdAt: '2025-07-28',
    phone: '+1 (555) 492-3810',
    location: 'Boston, MA',
    bio: 'SOC2 compliance auditor, IAM governance, and threat detection.',
    mfaEnabled: true
  },
  {
    id: 'usr-4419',
    name: 'Kavita Patel',
    email: 'kavita.patel@acmewave.io',
    role: 'DevOps Specialist',
    department: 'Operations & Cloud',
    status: 'Active',
    lastActive: '2 hours ago',
    createdAt: '2025-08-05',
    phone: '+1 (555) 774-2918',
    location: 'Chicago, IL',
    bio: 'Kubernetes cluster operations and CI/CD pipeline automation.',
    mfaEnabled: true
  },
  {
    id: 'usr-3920',
    name: 'Liam O\'Connor',
    email: 'liam.oconnor@acmewave.io',
    role: 'Finance Manager',
    department: 'Finance',
    status: 'Active',
    lastActive: '3 hours ago',
    createdAt: '2025-02-18',
    phone: '+1 (555) 612-4091',
    location: 'Dublin, Ireland',
    bio: 'Corporate treasury, billing reconciliation, and SaaS licensing.',
    mfaEnabled: true
  },
  {
    id: 'usr-3104',
    name: 'Amara Okafor',
    email: 'amara.okafor@acmewave.io',
    role: 'Product Manager',
    department: 'Product & Design',
    status: 'Pending',
    lastActive: 'Yesterday',
    createdAt: '2026-01-12',
    phone: '+1 (555) 883-9122',
    location: 'London, UK',
    bio: 'Growth product manager focusing on onboarding friction and retention.',
    mfaEnabled: false
  },
  {
    id: 'usr-2891',
    name: 'Tobias Lindqvist',
    email: 'tobias.lindqvist@acmewave.io',
    role: 'Senior Engineer',
    department: 'Engineering',
    status: 'Active',
    lastActive: '4 hours ago',
    createdAt: '2025-09-03',
    phone: '+1 (555) 301-4475',
    location: 'Stockholm, Sweden',
    bio: 'Database query optimizer and Redis caching architect.',
    mfaEnabled: true
  },
  {
    id: 'usr-2510',
    name: 'Chloe Devereaux',
    email: 'chloe.devereaux@acmewave.io',
    role: 'Engineering Lead',
    department: 'Engineering',
    status: 'Inactive',
    lastActive: '6 days ago',
    createdAt: '2025-04-19',
    phone: '+1 (555) 782-9901',
    location: 'Paris, France',
    bio: 'Mobile client SDK engineering lead (on parental leave).',
    mfaEnabled: true
  },
  {
    id: 'usr-2198',
    name: 'Hiroshi Tanaka',
    email: 'hiroshi.tanaka@acmewave.io',
    role: 'DevOps Specialist',
    department: 'Operations & Cloud',
    status: 'Active',
    lastActive: '35 minutes ago',
    createdAt: '2025-10-15',
    phone: '+1 (555) 438-6621',
    location: 'Tokyo, Japan',
    bio: 'Multi-region AWS failover and edge latency optimization.',
    mfaEnabled: true
  },
  {
    id: 'usr-1945',
    name: 'Nadia Benali',
    email: 'nadia.benali@acmewave.io',
    role: 'Security Analyst',
    department: 'Security & Compliance',
    status: 'Suspended',
    lastActive: '12 days ago',
    createdAt: '2025-06-01',
    phone: '+1 (555) 918-3482',
    location: 'Montreal, Canada',
    bio: 'Account temporarily locked pending credential rotation policy.',
    mfaEnabled: false
  },
  {
    id: 'usr-1732',
    name: 'Gabriel Morales',
    email: 'gabriel.morales@acmewave.io',
    role: 'Senior Engineer',
    department: 'Engineering',
    status: 'Active',
    lastActive: '18 minutes ago',
    createdAt: '2025-11-20',
    phone: '+1 (555) 674-1290',
    location: 'Madrid, Spain',
    bio: 'Real-time WebSocket event pipelines and webhook delivery.',
    mfaEnabled: true
  },
  {
    id: 'usr-1520',
    name: 'Ingrid Sorensen',
    email: 'ingrid.sorensen@acmewave.io',
    role: 'Product Manager',
    department: 'Product & Design',
    status: 'Active',
    lastActive: '5 hours ago',
    createdAt: '2025-07-09',
    phone: '+1 (555) 293-8471',
    location: 'Copenhagen, Denmark',
    bio: 'Enterprise workspace administration and permissions team.',
    mfaEnabled: true
  },
  {
    id: 'usr-1399',
    name: 'Tariq Al-Mansoor',
    email: 'tariq.mansoor@acmewave.io',
    role: 'Finance Manager',
    department: 'Finance',
    status: 'Pending',
    lastActive: '3 days ago',
    createdAt: '2026-02-01',
    phone: '+1 (555) 551-7782',
    location: 'Dubai, UAE',
    bio: 'Awaiting executive sign-off for enterprise procurement access.',
    mfaEnabled: false
  },
  {
    id: 'usr-1102',
    name: 'Valerie Dupont',
    email: 'valerie.dupont@acmewave.io',
    role: 'Engineering Lead',
    department: 'Engineering',
    status: 'Active',
    lastActive: '50 minutes ago',
    createdAt: '2025-03-29',
    phone: '+1 (555) 819-2347',
    location: 'Geneva, Switzerland',
    bio: 'Core search and telemetry processing team lead.',
    mfaEnabled: true
  },
  {
    id: 'usr-0988',
    name: 'Nathaniel Ward',
    email: 'nathaniel.ward@acmewave.io',
    role: 'Senior Engineer',
    department: 'Operations & Cloud',
    status: 'Active',
    lastActive: '1 hour ago',
    createdAt: '2025-08-14',
    phone: '+1 (555) 441-9034',
    location: 'Denver, CO',
    bio: 'Site reliability engineering and disaster recovery simulation.',
    mfaEnabled: true
  },
  {
    id: 'usr-0850',
    name: 'Aisha Al-Hashimi',
    email: 'aisha.hashimi@acmewave.io',
    role: 'Administrator',
    department: 'Security & Compliance',
    status: 'Active',
    lastActive: '10 minutes ago',
    createdAt: '2025-01-20',
    phone: '+1 (555) 629-1103',
    location: 'Toronto, Canada',
    bio: 'Global ISO 27001 audit officer and cryptographic key administrator.',
    mfaEnabled: true
  },
  {
    id: 'usr-0733',
    name: 'Roman Novak',
    email: 'roman.novak@acmewave.io',
    role: 'Senior Engineer',
    department: 'Engineering',
    status: 'Inactive',
    lastActive: '14 days ago',
    createdAt: '2025-05-18',
    phone: '+1 (555) 390-2819',
    location: 'Prague, Czechia',
    bio: 'Backend microservices specialist on scheduled leave.',
    mfaEnabled: true
  },
  {
    id: 'usr-0612',
    name: 'Siddharth Rao',
    email: 'siddharth.rao@acmewave.io',
    role: 'DevOps Specialist',
    department: 'Operations & Cloud',
    status: 'Active',
    lastActive: '4 minutes ago',
    createdAt: '2025-09-22',
    phone: '+1 (555) 710-4491',
    location: 'Bengaluru, India',
    bio: 'Observability stacks, Prometheus alerting, and Grafana matrices.',
    mfaEnabled: true
  },
  {
    id: 'usr-0498',
    name: 'Zoe Katsaros',
    email: 'zoe.katsaros@acmewave.io',
    role: 'Product Manager',
    department: 'Product & Design',
    status: 'Active',
    lastActive: '42 minutes ago',
    createdAt: '2025-10-30',
    phone: '+1 (555) 890-3320',
    location: 'Athens, Greece',
    bio: 'UX research operations and cross-functional feature validation.',
    mfaEnabled: true
  },
  {
    id: 'usr-0341',
    name: 'Benoit Mercier',
    email: 'benoit.mercier@acmewave.io',
    role: 'Finance Manager',
    department: 'Finance',
    status: 'Active',
    lastActive: '2 hours ago',
    createdAt: '2025-04-10',
    phone: '+1 (555) 234-9011',
    location: 'Lyon, France',
    bio: 'Revenue forecasting and automated billing infrastructure.',
    mfaEnabled: true
  },
  {
    id: 'usr-0219',
    name: 'Hannah Abbott',
    email: 'hannah.abbott@acmewave.io',
    role: 'Senior Engineer',
    department: 'Engineering',
    status: 'Suspended',
    lastActive: '30 days ago',
    createdAt: '2025-02-14',
    phone: '+1 (555) 991-3820',
    location: 'Manchester, UK',
    bio: 'Contractor account expired; pending renewal verification.',
    mfaEnabled: false
  },
  {
    id: 'usr-0188',
    name: 'Kenji Sato',
    email: 'kenji.sato@acmewave.io',
    role: 'Engineering Lead',
    department: 'Engineering',
    status: 'Active',
    lastActive: '12 minutes ago',
    createdAt: '2025-06-25',
    phone: '+1 (555) 402-9118',
    location: 'Osaka, Japan',
    bio: 'Frontend engineering lead for enterprise reporting modules.',
    mfaEnabled: true
  }
];

export const KPI_METRICS: KpiMetric[] = [
  {
    title: 'Total Users',
    value: '12,842',
    change: '+12.4%',
    isPositive: true,
    comparison: 'vs previous month',
    iconName: 'Users'
  },
  {
    title: 'Active Users',
    value: '8,429',
    change: '+8.7%',
    isPositive: true,
    comparison: 'vs previous month',
    iconName: 'UserCheck'
  },
  {
    title: 'Monthly Recurring Revenue',
    value: '$84,290',
    change: '+14.2%',
    isPositive: true,
    comparison: 'vs previous month',
    iconName: 'TrendingUp'
  },
  {
    title: 'Pending Approvals',
    value: '128',
    change: '-4.3%',
    isPositive: true,
    comparison: 'vs previous month',
    iconName: 'CheckSquare'
  }
];

export const REVENUE_DATA: ChartDataPoint[] = [
  { period: 'Jan', revenue: 64200, expenses: 38100, margin: 26100 },
  { period: 'Feb', revenue: 68500, expenses: 39400, margin: 29100 },
  { period: 'Mar', revenue: 71900, expenses: 41200, margin: 30700 },
  { period: 'Apr', revenue: 74800, expenses: 42000, margin: 32800 },
  { period: 'May', revenue: 77300, expenses: 43500, margin: 33800 },
  { period: 'Jun', revenue: 79100, expenses: 44100, margin: 35000 },
  { period: 'Jul', revenue: 81400, expenses: 45600, margin: 35800 },
  { period: 'Aug', revenue: 82900, expenses: 46200, margin: 36700 },
  { period: 'Sep', revenue: 84290, expenses: 47100, margin: 37190 }
];

export const WEEKLY_ACTIVITY: DayActivity[] = [
  { day: 'Mon', activeUsers: 6420, apiRequests: 428000 },
  { day: 'Tue', activeUsers: 7890, apiRequests: 512000 },
  { day: 'Wed', activeUsers: 8429, apiRequests: 589000 },
  { day: 'Thu', activeUsers: 8120, apiRequests: 564000 },
  { day: 'Fri', activeUsers: 7650, apiRequests: 498000 },
  { day: 'Sat', activeUsers: 3410, apiRequests: 210000 },
  { day: 'Sun', activeUsers: 2890, apiRequests: 184000 }
];

export const STATUS_DISTRIBUTION: StatusDistribution[] = [
  { status: 'Active', count: 18, percentage: 75 },
  { status: 'Inactive', count: 3, percentage: 12.5 },
  { status: 'Pending', count: 2, percentage: 8.3 },
  { status: 'Suspended', count: 1, percentage: 4.2 }
];

export const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    actor: 'Marcus Vance',
    actorEmail: 'marcus.vance@acmewave.io',
    action: 'Rotated production API key',
    resource: 'Vault Cluster prod-us-east-1',
    timestamp: '12 minutes ago',
    status: 'success'
  },
  {
    id: 'act-2',
    actor: 'Elena Rostova',
    actorEmail: 'elena.rostova@acmewave.io',
    action: 'Deployed service release v4.12.0',
    resource: 'Payment Gateway Microservice',
    timestamp: '45 minutes ago',
    status: 'success'
  },
  {
    id: 'act-3',
    actor: 'Julian Sterling',
    actorEmail: 'julian.sterling@acmewave.io',
    action: 'Flagged unusual IP login pattern',
    resource: 'Security Rule #8491 (EU-Central)',
    timestamp: '2 hours ago',
    status: 'warning'
  },
  {
    id: 'act-4',
    actor: 'Sarah Chen-Morrison',
    actorEmail: 'sarah.chen@acmewave.io',
    action: 'Exported quarterly user retention metrics',
    resource: 'Analytics Engine CSV export',
    timestamp: '3 hours ago',
    status: 'info'
  },
  {
    id: 'act-5',
    actor: 'Liam O\'Connor',
    actorEmail: 'liam.oconnor@acmewave.io',
    action: 'Reconciled September cloud infrastructure invoice',
    resource: 'AWS Enterprise Billing Account',
    timestamp: '5 hours ago',
    status: 'success'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'New user registered',
    description: 'Tariq Al-Mansoor requested enterprise Finance workspace access.',
    timestamp: '10 minutes ago',
    unread: true,
    category: 'user'
  },
  {
    id: 'notif-2',
    title: 'System backup completed',
    description: 'PostgreSQL primary shard snapshot verified (34.2 GB compressed).',
    timestamp: '42 minutes ago',
    unread: true,
    category: 'system'
  },
  {
    id: 'notif-3',
    title: 'Monthly report generated',
    description: 'September 2026 platform utilization and MRR analysis is ready.',
    timestamp: '2 hours ago',
    unread: false,
    category: 'billing'
  },
  {
    id: 'notif-4',
    title: 'MFA compliance warning',
    description: 'Two team accounts are missing mandatory hardware security keys.',
    timestamp: 'Yesterday',
    unread: false,
    category: 'security'
  }
];
