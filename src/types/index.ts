export type UserRole = 
  | 'Administrator' 
  | 'Engineering Lead' 
  | 'Senior Engineer' 
  | 'Product Manager' 
  | 'Security Analyst' 
  | 'DevOps Specialist'
  | 'Finance Manager';

export type UserDepartment = 
  | 'Engineering' 
  | 'Product & Design' 
  | 'Operations & Cloud' 
  | 'Security & Compliance' 
  | 'Customer Success' 
  | 'Finance';

export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: UserDepartment;
  status: UserStatus;
  lastActive: string;
  createdAt: string;
  phone?: string;
  location?: string;
  bio?: string;
  mfaEnabled?: boolean;
}

export interface ActivityItem {
  id: string;
  actor: string;
  actorEmail: string;
  action: string;
  resource: string;
  timestamp: string;
  status: 'success' | 'warning' | 'info';
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  unread: boolean;
  category: 'system' | 'security' | 'user' | 'billing';
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export interface KpiMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  comparison: string;
  iconName: string;
}

export interface ChartDataPoint {
  period: string;
  revenue: number;
  expenses: number;
  margin?: number;
}

export interface DayActivity {
  day: string;
  activeUsers: number;
  apiRequests: number;
}

export interface StatusDistribution {
  status: UserStatus;
  count: number;
  percentage: number;
}
