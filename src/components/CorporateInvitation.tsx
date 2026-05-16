'use client';

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map(x => x + x).join('') : clean.slice(0, 6);
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(201,169,110,${alpha})`;
  return `rgba(${r},${g},${b},${alpha})`;
}

import { InvitationCustomization, DEFAULT_CUSTOMIZATION } from '@/types/invitation';

interface CorporateInvitationProps {
  title: string;
  hostName: string;
  date: string;
  time: string;
  location: string;
  message?: string;
  customization?: InvitationCustomization;
}

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return {
      weekday: d.toLocaleDateString('en-US', { weekday: 'long' }),
      day: d.toLocaleDateString('en-US', { day: 'numeric' }),
      month: d.toLocaleDateString('en-US', { month: 'long' }),
      year: d.toLocaleDateString('en-US', { year: 'numeric' }),
    };
  } catch {
    return { weekday: '', day: dateStr, month: '', year: '' };
  }
}

function formatTime(timeStr: string) {
  try {
    const [h, m] = timeStr.split(':');
    const d = new Date();
    d.setHours(parseInt(h), parseInt(m));
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  } catch {
    return timeStr;
  }
}

export default function CorporateInvitation({
  title, hostName, date, time, location, message, customization,
}: CorporateInvitationProps) {
  const c = { ...DEFAULT_CUSTOMIZATION, ...customization };
  const fontSizeMap = { sm: '0.85rem', md: '1rem', lg: '1.15rem', xl: '1.3rem' };
  const fontFamilyMap = {
    playfair: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
    inter: 'var(--font-inter, Inter, sans-serif)',
    mono: '"Courier New", Courier, monospace',
  };
  const { weekday, day, month, year } = formatDate(date);
  const formattedTime = formatTime(time);

  return (
    <div
      id="invitation-content"
      className="min-h-screen flex items-center justify-center py-16 px-4 pt-14"
      style={{ background: c.bgColor, fontSize: fontSizeMap[c.fontSize], fontFamily: fontFamilyMap[c.fontFamily] }}
    >
      <div className="w-full max-w-2xl">
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            boxShadow: `0 32px 80px ${c.accentColor}25, 0 8px 32px rgba(0,0,0,0.12)`,
            border: `1px solid ${c.accentColor}30`,
          }}
        >
          {/* Top accent bar */}
          <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${c.accentColor}, ${c.accentColor}aa, ${c.accentColor})` }} />

          <div style={{ background: c.bgColor }}>
            <div className="px-8 sm:px-12 py-12 sm:py-14">

              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="h-px w-8" style={{ backgroundColor: c.accentColor, opacity: 0.5 }} />
                  <p className="text-xs tracking-[0.5em] uppercase font-semibold" style={{ color: c.accentColor }}>
                    Formal Invitation
                  </p>
                  <div className="h-px w-8" style={{ backgroundColor: c.accentColor, opacity: 0.5 }} />
                </div>

                <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4" style={{ color: c.textColor }}>
                  {title}
                </h1>

                <div className="flex items-center justify-center gap-2">
                  <div className="h-px w-20" style={{ background: `linear-gradient(90deg, transparent, ${c.accentColor})` }} />
                  <div className="w-1.5 h-1.5" style={{ backgroundColor: c.accentColor }} />
                  <div className="h-px w-20" style={{ background: `linear-gradient(270deg, transparent, ${c.accentColor})` }} />
                </div>
              </div>

              {/* Hosted by */}
              <div className="text-center mb-10 pb-8" style={{ borderBottom: `1px solid ${c.accentColor}20` }}>
                <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: `${c.accentColor}cc` }}>
                  Presented by
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: c.textColor }}>
                  {hostName}
                </h2>
              </div>

              {/* Details — horizontal layout */}
              <div className="grid grid-cols-3 gap-6 mb-10">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke={c.accentColor} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ),
                    label: 'Date',
                    value: `${weekday}`,
                    sub: `${day} ${month} ${year}`,
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke={c.accentColor} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    label: 'Time',
                    value: formattedTime,
                    sub: 'Sharp',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" stroke={c.accentColor} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    label: 'Venue',
                    value: location,
                    sub: '',
                  },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ background: `${c.accentColor}15`, border: `1px solid ${c.accentColor}25` }}>
                      {item.icon}
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: c.accentColor }}>{item.label}</p>
                    <p className="text-sm font-semibold leading-snug" style={{ color: c.textColor }}>{item.value}</p>
                    {item.sub && <p className="text-xs mt-0.5" style={{ color: `${c.textColor}60` }}>{item.sub}</p>}
                  </div>
                ))}
              </div>

              {/* Message */}
              {message && (
                <div
                  className="rounded-lg p-5 mb-8"
                  style={{ background: `${c.accentColor}08`, borderLeft: `3px solid ${c.accentColor}` }}
                >
                  <p className="text-sm leading-relaxed italic" style={{ color: `${c.textColor}cc` }}>
                    &ldquo;{message}&rdquo;
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${c.accentColor}40)` }} />
                  <p className="text-xs tracking-[0.35em] uppercase" style={{ color: `${c.accentColor}80` }}>
                    Created with InviteMaker
                  </p>
                  <div className="h-px w-12" style={{ background: `linear-gradient(270deg, transparent, ${c.accentColor}40)` }} />
                </div>
              </div>

            </div>
          </div>

          {/* Bottom accent bar */}
          <div className="h-1" style={{ background: `linear-gradient(90deg, ${c.accentColor}40, ${c.accentColor}, ${c.accentColor}40)` }} />
        </div>
      </div>
    </div>
  );
}
