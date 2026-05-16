'use client';

import { InvitationCustomization, DEFAULT_CUSTOMIZATION } from '@/types/invitation';

// Convert hex color to rgba string
function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean.slice(0, 6);
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(201,169,110,${alpha})`;
  return `rgba(${r},${g},${b},${alpha})`;
}

interface BabyShowerInvitationProps {
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

function FloralDivider({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 320 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
      <line x1="0" y1="14" x2="110" y2="14" stroke={accent} strokeWidth="0.6" opacity="0.6" />
      <circle cx="160" cy="14" r="4" fill={accent} opacity="0.3" />
      <circle cx="160" cy="14" r="2" fill={accent} opacity="0.8" />
      <ellipse cx="160" cy="7" rx="2.5" ry="4" fill={accent} opacity="0.5" />
      <ellipse cx="160" cy="21" rx="2.5" ry="4" fill={accent} opacity="0.5" />
      <ellipse cx="153" cy="14" rx="4" ry="2.5" fill={accent} opacity="0.5" />
      <ellipse cx="167" cy="14" rx="4" ry="2.5" fill={accent} opacity="0.5" />
      <line x1="210" y1="14" x2="320" y2="14" stroke={accent} strokeWidth="0.6" opacity="0.6" />
    </svg>
  );
}

function CornerWreath({ className, accent }: { className?: string; accent: string }) {
  return (
    <svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M5 5 Q20 20 35 35" stroke={accent} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
      <ellipse cx="12" cy="12" rx="5" ry="3" fill={accent} opacity="0.3" transform="rotate(-45 12 12)" />
      <ellipse cx="20" cy="20" rx="5" ry="3" fill={accent} opacity="0.3" transform="rotate(-45 20 20)" />
      <ellipse cx="28" cy="28" rx="5" ry="3" fill={accent} opacity="0.3" transform="rotate(-45 28 28)" />
      <circle cx="8" cy="18" r="3" fill={accent} opacity="0.4" />
      <circle cx="8" cy="18" r="1.5" fill={accent} opacity="0.7" />
      <circle cx="22" cy="8" r="3" fill={accent} opacity="0.4" />
      <circle cx="22" cy="8" r="1.5" fill={accent} opacity="0.7" />
      <circle cx="35" cy="15" r="2.5" fill={accent} opacity="0.35" />
      <circle cx="15" cy="35" r="2.5" fill={accent} opacity="0.35" />
    </svg>
  );
}

export default function BabyShowerInvitation({
  title, hostName, date, time, location, message, customization,
}: BabyShowerInvitationProps) {
  const c = { ...DEFAULT_CUSTOMIZATION, ...customization };
  const fontSizeMap = { sm: 0.85, md: 1, lg: 1.15, xl: 1.3 };
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
      style={{ background: c.bgColor, fontFamily: fontFamilyMap[c.fontFamily] }}
    >
      <div className="w-full max-w-2xl" style={{ zoom: fontSizeMap[c.fontSize] }}>
        <div
          className="relative rounded-3xl p-px"
          style={{
            background: `linear-gradient(135deg, ${c.accentColor} 0%, ${hexToRgba(c.accentColor, 0.6)} 50%, ${c.accentColor} 100%)`,
            boxShadow: `0 24px 60px ${hexToRgba(c.accentColor, 0.18)}, 0 8px 24px rgba(0,0,0,0.08)`,
          }}
        >
          <div className="relative rounded-3xl overflow-hidden" style={{ background: c.bgColor, zoom: fontSizeMap[c.fontSize] }}>

            {/* Corner wreaths */}
            <div className="absolute top-4 left-4"><CornerWreath className="w-14 h-14" accent={c.accentColor} /></div>
            <div className="absolute top-4 right-4" style={{ transform: 'scaleX(-1)' }}><CornerWreath className="w-14 h-14" accent={c.accentColor} /></div>
            <div className="absolute bottom-4 left-4" style={{ transform: 'scaleY(-1)' }}><CornerWreath className="w-14 h-14" accent={c.accentColor} /></div>
            <div className="absolute bottom-4 right-4" style={{ transform: 'scale(-1,-1)' }}><CornerWreath className="w-14 h-14" accent={c.accentColor} /></div>

            <div className="relative px-8 sm:px-14 py-14 sm:py-16">

              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-5">
                  {[0,1,2].map(i => (
                    <svg key={i} viewBox="0 0 20 20" fill="none" className={i===1 ? 'w-4 h-4' : 'w-3 h-3'} style={{ opacity: i===1 ? 0.8 : 0.6 }}>
                      <path d="M10 2 L11 8 L17 8 L12.5 11.5 L14 18 L10 14.5 L6 18 L7.5 11.5 L3 8 L9 8 Z" fill={c.accentColor} />
                    </svg>
                  ))}
                </div>
                <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: hexToRgba(c.accentColor, 0.8), fontWeight: 500 }}>
                  You&apos;re Invited
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4" style={{ color: c.textColor }}>
                  {title}
                </h1>
                <FloralDivider accent={c.accentColor} />
              </div>

              {/* Host name */}
              <div className="text-center mb-10">
                <p className="text-xs tracking-[0.35em] uppercase mb-2" style={{ color: hexToRgba(c.accentColor, 0.8) }}>
                  Honoring
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: c.textColor }}>
                  {hostName}
                </h2>
                <svg viewBox="0 0 200 10" className="w-44 mx-auto mt-2" fill="none">
                  <path d="M10 5 Q100 10 190 5" stroke={c.accentColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                </svg>
              </div>

              {/* Details card */}
              <div
                className="rounded-2xl p-6 sm:p-8 mb-8"
                style={{ background: hexToRgba(c.accentColor, 0.06), border: `1px solid ${hexToRgba(c.accentColor, 0.2)}` }}
              >
                <div className="text-center mb-6">
                  <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: c.accentColor }}>Date</p>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: hexToRgba(c.textColor, 0.5) }}>{weekday}</p>
                  <div className="flex items-baseline justify-center gap-3">
                    <span className="text-5xl sm:text-6xl font-bold leading-none" style={{ color: c.textColor }}>{day}</span>
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-semibold leading-tight" style={{ color: c.accentColor }}>{month}</span>
                      <span className="text-sm" style={{ color: hexToRgba(c.textColor, 0.5) }}>{year}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${hexToRgba(c.accentColor, 0.4)})` }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.accentColor, opacity: 0.7 }} />
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(270deg, transparent, ${hexToRgba(c.accentColor, 0.4)})` }} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2" style={{ background: hexToRgba(c.accentColor, 0.15) }}>
                      <svg className="w-5 h-5" fill="none" stroke={c.accentColor} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: c.accentColor }}>Time</p>
                    <p className="text-base font-semibold" style={{ color: c.textColor }}>{formattedTime}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2" style={{ background: hexToRgba(c.accentColor, 0.15) }}>
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
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${hexToRgba(c.accentColor, 0.4)})` }} />
                    <svg viewBox="0 0 20 20" className="w-4 h-4" fill={c.accentColor} opacity="0.8">
                      <path d="M10 2 L11 8 L17 8 L12.5 11.5 L14 18 L10 14.5 L6 18 L7.5 11.5 L3 8 L9 8 Z" />
                    </svg>
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(270deg, transparent, ${hexToRgba(c.accentColor, 0.4)})` }} />
                  </div>
                  <p className="text-base sm:text-lg italic leading-relaxed" style={{ color: hexToRgba(c.textColor, 0.8) }}>
                    &ldquo;{message}&rdquo;
                  </p>
                </div>
              )}

              {/* Bottom ornament */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(90deg, transparent, ${c.accentColor})`, opacity: 0.5 }} />
                <span style={{ color: c.accentColor, fontSize: '0.7rem' }}>✦</span>
                <div className="h-px w-8" style={{ backgroundColor: c.accentColor, opacity: 0.4 }} />
                <span style={{ color: c.accentColor, fontSize: '0.7rem' }}>✦</span>
                <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(270deg, transparent, ${c.accentColor})`, opacity: 0.5 }} />
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${hexToRgba(c.accentColor, 0.3)})` }} />
            <p className="text-xs tracking-[0.35em] uppercase" style={{ color: hexToRgba(c.accentColor, 0.5) }}>
              Created with InviteMaker
            </p>
            <div className="h-px w-12" style={{ background: `linear-gradient(270deg, transparent, ${hexToRgba(c.accentColor, 0.3)})` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
