import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { UserStatus } from '../types';

dayjs.extend(relativeTime);

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatDate(dateString: string, format = 'MMM D, YYYY'): string {
  if (!dateString) return '';
  const d = dayjs(dateString);
  return d.isValid() ? d.format(format) : dateString;
}

export function formatRelativeTime(dateString: string): string {
  if (!dateString) return '';
  const d = dayjs(dateString);
  return d.isValid() ? d.fromNow() : dateString;
}

export function getStatusBadgeVariant(status: UserStatus): {
  bg: string;
  text: string;
  dot: string;
  border: string;
} {
  switch (status) {
    case 'Active':
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        text: 'text-emerald-700 dark:text-emerald-400',
        dot: 'bg-emerald-500',
        border: 'border-emerald-200 dark:border-emerald-800/60'
      };
    case 'Pending':
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/40',
        text: 'text-amber-700 dark:text-amber-400',
        dot: 'bg-amber-500',
        border: 'border-amber-200 dark:border-amber-800/60'
      };
    case 'Inactive':
      return {
        bg: 'bg-slate-100 dark:bg-slate-800/60',
        text: 'text-slate-600 dark:text-slate-400',
        dot: 'bg-slate-400',
        border: 'border-slate-200 dark:border-slate-700'
      };
    case 'Suspended':
      return {
        bg: 'bg-rose-50 dark:bg-rose-950/40',
        text: 'text-rose-700 dark:text-rose-400',
        dot: 'bg-rose-500',
        border: 'border-rose-200 dark:border-rose-800/60'
      };
  }
}
