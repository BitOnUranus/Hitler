import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function calculateDiscountPercentage(monthly: number, annual: number): number {
  const monthlyAnnual = monthly * 12;
  const discount = ((monthlyAnnual - annual) / monthlyAnnual) * 100;
  return Math.round(discount);
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return `${start} - ${end}`;
}

export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    canceled: 'bg-gray-100 text-gray-800',
    past_due: 'bg-yellow-100 text-yellow-800',
    trialing: 'bg-blue-100 text-blue-800',
    incomplete: 'bg-red-100 text-red-800',
    paid: 'bg-green-100 text-green-800',
    open: 'bg-blue-100 text-blue-800',
    draft: 'bg-gray-100 text-gray-800',
    uncollectible: 'bg-red-100 text-red-800',
    void: 'bg-gray-100 text-gray-800',
  };
  
  return statusMap[status] || 'bg-gray-100 text-gray-800';
}