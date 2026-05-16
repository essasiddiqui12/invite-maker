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

interface LuxuryInvitationProps {
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

export default function LuxuryInvitation({
  title,
  hostName,
  date,
  time,
  location,
  message,
  customization,
}: LuxuryInvitationProps) {
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
      style={{
        background: c.bgColor,
        fontSize: fontSizeMap[c.fontSize],
        fontFamily: fontFamilyMap[c.fontFamily],
      }}
    >
      <div className="w-full max-w-2xl" style={{ zoom: fontSizeMap[c.fontSize] }}>
        <div
          className="relative rounded-2xl p-[3px]"
          style={{
            background: `linear-gradient(135deg, ${c.accentColor} 0%, ${c.accentColor}dd 50%, ${c.accentColor} 100%)`,
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
          }}
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ background: c.bgColor }}
          >
            <div className="relative px-8 sm:px-12 py-12 sm:py-16">
              
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-block px-6 py-2 rounded-full mb-6"
                  style={{
                    background: `${c.accentColor}15`,
                    border: `1px solid ${c.accentColor}30`,
                  }}
                >
                  <p className="text-xs tracking-[0.3em] uppercase" style={{ color: c.accentColor, fontWeight: 600 }}>
                    You&apos;re Invited
                  </p>
                </div>

                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                  style={{ color: c.textColor }}
                >
                  {title}
                </h1>

                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${c.accentColor})` }} />
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.accentColor }} />
                  <div className="h-px w-16" style={{ background: `linear-gradient(270deg, transparent, ${c.accentColor})` }} />
                </div>
              </div>

              {/* Host name */}
              <div className="text-center mb-10">
                <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: `${c.accentColor}cc` }}>
                  Hosted by
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: c.textColor }}>
                  {hostName}
                </h2>
              </div>

              {/* Details card */}
              <div
                className="rounded-xl p-6 sm:p-8 mb-8"
                style={{
                  background: `${c.accentColor}08`,
                  border: `1px solid ${c.accentColor}20`,
                }}
              >
                <div className="text-center mb-6">
                  <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: c.accentColor }}>
                    Date
                  </p>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: `${c.textColor}80` }}>
                    {weekday}
                  </p>
                  <div className="flex items-baseline justify-center gap-3">
                    <span className="text-5xl sm:text-6xl font-bold leading-none" style={{ color: c.textColor }}>
                      {day}
                    </span>
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-semibold leading-tight" style={{ color: c.accentColor }}>
                        {month}
                      </span>
                      <span className="text-sm" style={{ color: `${c.textColor}80` }}>
                        {year}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${c.accentColor}40)` }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.accentColor, opacity: 0.8 }} />
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(270deg, transparent, ${c.accentColor}40)` }} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{ background: `${c.accentColor}20` }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke={c.accentColor} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: c.accentColor }}>Time</p>
                    <p className="text-base font-semibold" style={{ color: c.textColor }}>
                      {formattedTime}
                    </p>
                  </div>

                  <div className="text-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{ background: `${c.accentColor}20` }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke={c.accentColor} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: c.accentColor }}>Venue</p>
                    <p className="text-sm font-semibold leading-snug" style={{ color: c.textColor }}>
                      {location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              {message && (
                <div className="text-center mb-8 px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${c.accentColor}40)` }} />
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: c.accentColor }} />
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
