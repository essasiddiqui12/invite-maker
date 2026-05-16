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

interface FloralInvitationProps {
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

function FloralCorner({ accent, flip }: { accent: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 80, height: 80, transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
    >
      <path d="M5 5 Q25 25 45 45" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
      <ellipse cx="15" cy="15" rx="7" ry="4" fill={accent} opacity="0.2" transform="rotate(-45 15 15)" />
      <ellipse cx="25" cy="25" rx="7" ry="4" fill={accent} opacity="0.2" transform="rotate(-45 25 25)" />
      <ellipse cx="35" cy="35" rx="6" ry="3.5" fill={accent} opacity="0.2" transform="rotate(-45 35 35)" />
      <circle cx="10" cy="25" r="4" fill={accent} opacity="0.3" />
      <circle cx="10" cy="25" r="2" fill={accent} opacity="0.6" />
      <circle cx="25" cy="10" r="4" fill={accent} opacity="0.3" />
      <circle cx="25" cy="10" r="2" fill={accent} opacity="0.6" />
      <circle cx="45" cy="20" r="3" fill={accent} opacity="0.25" />
      <circle cx="20" cy="45" r="3" fill={accent} opacity="0.25" />
      <ellipse cx="5" cy="40" rx="3" ry="5" fill={accent} opacity="0.15" transform="rotate(-20 5 40)" />
      <ellipse cx="40" cy="5" rx="5" ry="3" fill={accent} opacity="0.15" transform="rotate(-20 40 5)" />
    </svg>
  );
}

export default function FloralInvitation({
  title, hostName, date, time, location, message, customization,
}: FloralInvitationProps) {
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
          className="relative rounded-3xl p-[2px]"
          style={{
            background: `linear-gradient(135deg, ${c.accentColor} 0%, ${c.accentColor}88 50%, ${c.accentColor} 100%)`,
            boxShadow: `0 24px 60px ${c.accentColor}25, 0 8px 24px rgba(0,0,0,0.08)`,
          }}
        >
          <div className="relative rounded-3xl overflow-hidden" style={{ background: c.bgColor }}>

            {/* Floral corners */}
            <div className="absolute top-2 left-2"><FloralCorner accent={c.accentColor} /></div>
            <div className="absolute top-2 right-2"><FloralCorner accent={c.accentColor} flip /></div>
            <div className="absolute bottom-2 left-2" style={{ transform: 'scaleY(-1)' }}><FloralCorner accent={c.accentColor} /></div>
            <div className="absolute bottom-2 right-2" style={{ transform: 'scale(-1,-1)' }}><FloralCorner accent={c.accentColor} /></div>

            <div className="relative px-10 sm:px-16 py-12 sm:py-14">

              {/* Header */}
              <div className="text-center mb-8">
                {/* Floral divider top */}
                <svg viewBox="0 0 300 30" fill="none" className="w-full max-w-xs mx-auto mb-5">
                  <line x1="0" y1="15" x2="100" y2="15" stroke={c.accentColor} strokeWidth="0.6" opacity="0.5" />
                  <circle cx="150" cy="15" r="5" fill={c.accentColor} opacity="0.25" />
                  <circle cx="150" cy="15" r="2.5" fill={c.accentColor} opacity="0.7" />
                  <ellipse cx="150" cy="7" rx="3" ry="5" fill={c.accentColor} opacity="0.4" />
                  <ellipse cx="150" cy="23" rx="3" ry="5" fill={c.accentColor} opacity="0.4" />
                  <ellipse cx="142" cy="15" rx="5" ry="3" fill={c.accentColor} opacity="0.4" />
                  <ellipse cx="158" cy="15" rx="5" ry="3" fill={c.accentColor} opacity="0.4" />
                  <line x1="200" y1="15" x2="300" y2="15" stroke={c.accentColor} strokeWidth="0.6" opacity="0.5" />
                </svg>

                <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: `${c.accentColor}cc`, fontWeight: 500 }}>
                  You&apos;re Invited
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4" style={{ color: c.textColor }}>
                  {title}
                </h1>
              </div>

              {/* Host name */}
              <div className="text-center mb-10">
                <p className="text-xs tracking-[0.35em] uppercase mb-2" style={{ color: `${c.accentColor}cc` }}>
                  Hosted by
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: c.textColor }}>
                  {hostName}
                </h2>
                <svg viewBox="0 0 200 10" className="w-48 mx-auto mt-2 opacity-60" fill="none">
                  <path d="M10 5 Q100 10 190 5" stroke={c.accentColor} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Details card */}
              <div
                className="rounded-2xl p-6 sm:p-8 mb-8"
                style={{ background: `${c.accentColor}08`, border: `1px solid ${c.accentColor}25` }}
              >
                <div className="text-center mb-6">
                  <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: c.accentColor }}>Date</p>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: `${c.textColor}60` }}>{weekday}</p>
                  <div className="flex items-baseline justify-center gap-3">
                    <span className="text-5xl sm:text-6xl font-bold leading-none" style={{ color: c.textColor }}>{day}</span>
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-semibold leading-tight" style={{ color: c.accentColor }}>{month}</span>
                      <span className="text-sm" style={{ color: `${c.textColor}60` }}>{year}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${c.accentColor}50)` }} />
                  <circle cx="4" cy="4" r="4" fill={c.accentColor} opacity="0.6" />
                  <svg viewBox="0 0 8 8" className="w-2 h-2" fill={c.accentColor} opacity="0.6"><circle cx="4" cy="4" r="4" /></svg>
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(270deg, transparent, ${c.accentColor}50)` }} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2" style={{ background: `${c.accentColor}20` }}>
                      <svg className="w-5 h-5" fill="none" stroke={c.accentColor} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: c.accentColor }}>Time</p>
                    <p className="text-base font-semibold" style={{ color: c.textColor }}>{formattedTime}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2" style={{ background: `${c.accentColor}20` }}>
                      <svg className="w-5 h-5" fill="none" stroke={c.accentColor} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: c.accentColor }}>Venue</p>
                    <p className="text-sm font-semibold leading-snug" style={{ color: c.textColor }}>{location}</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              {message && (
                <div className="text-center mb-8 px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${c.accentColor}40)` }} />
                    <svg viewBox="0 0 8 8" className="w-2 h-2" fill={c.accentColor}><circle cx="4" cy="4" r="4" /></svg>
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(270deg, transparent, ${c.accentColor}40)` }} />
                  </div>
                  <p className="text-base sm:text-lg italic leading-relaxed" style={{ color: `${c.textColor}cc` }}>
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
        </div>
      </div>
    </div>
  );
}
