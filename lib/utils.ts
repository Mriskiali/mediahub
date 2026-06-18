import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateShort(date: Date | string): string {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function getMediaTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    VIDEO: 'Video',
    AUDIO: 'Audio',
    IMAGE: 'Gambar',
    ARTICLE: 'Artikel',
  };
  return labels[type] ?? type;
}

export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  if (url.startsWith('/')) return true;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getMediaTypeColor(type: string): string {
  const colors: Record<string, string> = {
    VIDEO: 'bg-[#fde047] text-black brutal-border',
    AUDIO: 'bg-[#4ade80] text-black brutal-border',
    IMAGE: 'bg-[#f472b6] text-black brutal-border',
    ARTICLE: 'bg-[#60a5fa] text-black brutal-border',
  };
  return colors[type] ?? 'bg-white text-black brutal-border';
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^#&?]*)/,
    /youtube\.com\/watch\?v=([^#&?]*)/,
    /youtube\.com\/embed\/([^#&?]*)/,
    /youtube\.com\/v\/([^#&?]*)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function isYouTubeUrl(url: string): boolean {
  return /youtu(be\.com|\.be)/i.test(url);
}

export function calculateReadingTime(content: string | null, mediaType: string): string {
  if (mediaType === 'VIDEO') return '[WATCH]';
  if (mediaType === 'AUDIO') return '[LISTEN]';
  if (!content) return '[1 MIN READ]';
  
  // Asumsi rata-rata kecepatan membaca adalah 200 kata per menit
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 200);
  return `[${minutes} MIN READ]`;
}
