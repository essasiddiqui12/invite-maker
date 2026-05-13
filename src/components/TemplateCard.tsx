'use client';

import Link from 'next/link';
import { Template } from '@/types/invitation';

interface TemplateCardProps {
  template: Template;
}

interface CategoryStyle {
  bgFrom: string;
  bgTo: string;
  accentFrom: string;
  accentTo: string;
  accentLight: string;
  textColor: string;
  badgeBg: string;
  badgeText: string;
  label: string;
  emoji: string;
  tagline: string;
  nameLine: string;
  dateLine: string;
}

const styles: Record<string, CategoryStyle> = {
  birthday: {
    bgFrom: '#fce7f3',
    bgTo: '#fdf2f8',
    accentFrom: '#ec4899',
    accentTo: '#f43f5e',
    accentLight: '#fce7f3',
    textColor: '#db2777',
    badgeBg: '#fce7f3',
    badgeText: '#be185d',
    label: 'Birthday',
    emoji: '🎂',
    tagline: "You're Invited!",
    nameLine: "Sarah's 30th",
    dateLine: 'June 14 · 7:00 PM',
  },
  wedding: {
    bgFrom: '#fffbeb',
    bgTo: '#fff7ed',
    accentFrom: '#f59e0b',
    accentTo: '#d97706',
    accentLight: '#fef3c7',
    textColor: '#b45309',
    badgeBg: '#fef3c7',
    badgeText: '#92400e',
    label: 'Wedding',
    emoji: '💍',
    tagline: 'Together Forever',
    nameLine: 'Emma & James',
    dateLine: 'Sept 21 · 4:00 PM',
  },
  baby: {
    bgFrom: '#eff6ff',
    bgTo: '#eef2ff',
    accentFrom: '#60a5fa',
    accentTo: '#818cf8',
    accentLight: '#dbeafe',
    textColor: '#4338ca',
    badgeBg: '#e0e7ff',
    badgeText: '#3730a3',
    label: 'Baby Shower',
    emoji: '🍼',
    tagline: 'A Baby is Coming!',
    nameLine: 'Baby Johnson',
    dateLine: 'Aug 5 · 2:00 PM',
  },
  graduation: {
    bgFrom: '#fffbeb',
    bgTo: '#fff7ed',
    accentFrom: '#f59e0b',
    accentTo: '#ea580c',
    accentLight: '#fef3c7',
    textColor: '#b45309',
    badgeBg: '#fef3c7',
    badgeText: '#92400e',
    label: 'Graduation',
    emoji: '🎓',
    tagline: 'Celebrate With Us',
    nameLine: 'Class of 2025',
    dateLine: 'May 30 · 3:00 PM',
  },
  corporate: {
    bgFrom: '#f8fafc',
    bgTo: '#f1f5f9',
    accentFrom: '#475569',
    accentTo: '#1e293b',
    accentLight: '#e2e8f0',
    textColor: '#334155',
    badgeBg: '#e2e8f0',
    badgeText: '#1e293b',
    label: 'Corporate',
    emoji: '🏢',
    tagline: 'You Are Invited',
    nameLine: 'Annual Gala 2025',
    dateLine: 'Nov 12 · 6:00 PM',
  },
  formal: {
    bgFrom: '#f4f4f5',
    bgTo: '#e4e4e7',
    accentFrom: '#52525b',
    accentTo: '#18181b',
    accentLight: '#e4e4e7',
    textColor: '#3f3f46',
    badgeBg: '#e4e4e7',
    badgeText: '#18181b',
    label: 'Formal',
    emoji: '🎩',
    tagline: 'Formal Invitation',
    nameLine: 'Black Tie Event',
    dateLine: 'Dec 6 · 7:30 PM',
  },
  floral: {
    bgFrom: '#fdf2f8',
    bgTo: '#f5f3ff',
    accentFrom: '#e879f9',
    accentTo: '#a855f7',
    accentLight: '#fae8ff',
    textColor: '#a21caf',
    badgeBg: '#fae8ff',
    badgeText: '#86198f',
    label: 'Floral',
    emoji: '🌸',
    tagline: 'Bloom & Celebrate',
    nameLine: 'Garden Party',
    dateLine: 'July 19 · 5:00 PM',
  },
  rustic: {
    bgFrom: '#fff7ed',
    bgTo: '#fffbeb',
    accentFrom: '#fb923c',
    accentTo: '#d97706',
    accentLight: '#ffedd5',
    textColor: '#c2410c',
    badgeBg: '#ffedd5',
    badgeText: '#9a3412',
    label: 'Rustic',
    emoji: '🌾',
    tagline: 'Rustic Charm',
    nameLine: 'Barn Wedding',
    dateLine: 'Oct 4 · 5:00 PM',
  },
  luxury: {
    bgFrom: '#fefce8',
    bgTo: '#fff7ed',
    accentFrom: '#eab308',
    accentTo: '#d97706',
    accentLight: '#fef9c3',
    textColor: '#a16207',
    badgeBg: '#fef9c3',
    badgeText: '#713f12',
    label: 'Luxury',
    emoji: '✨',
    tagline: 'An Exclusive Evening',
    nameLine: 'Golden Gala',
    dateLine: 'Jan 18 · 8:00 PM',
  },
  casual: {
    bgFrom: '#ecfdf5',
    bgTo: '#f0fdfa',
    accentFrom: '#34d399',
    accentTo: '#14b8a6',
    accentLight: '#d1fae5',
    textColor: '#047857',
    badgeBg: '#d1fae5',
    badgeText: '#065f46',
    label: 'Casual',
    emoji: '🎉',
    tagline: 'Come Hang Out!',
    nameLine: 'Summer Cookout',
    dateLine: 'Aug 23 · 4:00 PM',
  },
};

const fallback = styles.casual;

export default function TemplateCard({ template }: TemplateCardProps) {
  const s = styles[template.category] ?? fallback;

  return (
    <Link href={`/create/${template.id}`} className="group block">
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200/50"
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)' }}
        onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 20px 40px rgba(99,102,241,0.12), 0 4px 12px rgba(0,0,0,0.06)')}
        onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)')}
      >
        {/* Preview area */}
        <div
          className="relative h-60 flex items-center justify-center p-6 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${s.bgFrom}, ${s.bgTo})` }}
        >
          {/* Soft blobs */}
          <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white opacity-25 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white opacity-25 blur-2xl pointer-events-none" />

          {/* Mini invitation card */}
          <div
            className="relative w-44 bg-white rounded-xl overflow-hidden flex flex-col"
            style={{
              boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)',
              border: `1px solid ${s.accentLight}`,
            }}
          >
            {/* Top accent bar */}
            <div
              className="h-1 w-full"
              style={{ background: `linear-gradient(90deg, ${s.accentFrom}, ${s.accentTo})` }}
            />

            <div className="px-4 py-4 flex flex-col items-center text-center gap-2">
              {/* Emoji circle */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-md"
                style={{ background: `linear-gradient(135deg, ${s.accentFrom}, ${s.accentTo})` }}
              >
                {s.emoji}
              </div>

              {/* Tagline */}
              <p
                className="text-[9px] font-bold tracking-widest uppercase leading-tight"
                style={{ color: s.textColor }}
              >
                {s.tagline}
              </p>

              {/* Divider */}
              <div
                className="w-10 h-px opacity-50"
                style={{ background: `linear-gradient(90deg, ${s.accentFrom}, ${s.accentTo})` }}
              />

              {/* Name */}
              <p
                className="text-gray-800 font-bold text-sm leading-tight"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                {s.nameLine}
              </p>

              {/* Date */}
              <p className="text-gray-400 text-[10px] font-medium tracking-wide">
                {s.dateLine}
              </p>

              {/* Location bars */}
              <div className="w-full flex flex-col gap-1 mt-1 pb-1">
                <div
                  className="h-1.5 rounded-full w-3/4 mx-auto"
                  style={{ backgroundColor: s.accentLight }}
                />
                <div
                  className="h-1.5 rounded-full w-1/2 mx-auto"
                  style={{ backgroundColor: s.accentLight }}
                />
              </div>
            </div>

            {/* Bottom accent bar */}
            <div
              className="h-0.5 w-full opacity-40"
              style={{ background: `linear-gradient(90deg, ${s.accentFrom}, ${s.accentTo})` }}
            />
          </div>

          {/* Category badge */}
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: s.badgeBg, color: s.badgeText }}
          >
            {s.label}
          </div>
        </div>

        {/* Card info */}
        <div className="p-5">
          <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {template.name}
          </h3>
          <p className="text-sm text-gray-400 mt-1 line-clamp-1">
            {template.description || s.tagline}
          </p>
          <div className="mt-3 inline-flex items-center text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
            <span>Use template</span>
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
