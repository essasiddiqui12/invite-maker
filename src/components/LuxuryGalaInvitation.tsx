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

interface LuxuryGalaInvitationProps {
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

function GalaCorner({ accent, rotate }: { accent: string; rotate: number }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 80, height: 80, transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path d="M6 6 L6 50 M6 6 L50 6" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M12 12 L12 40 M12 12 L40 12" stroke={accent} strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
      <path d="M6 6 L10 2 L14 6 L10 10 Z" fill={accent} opacity="0.9" />
      <circle cx="6" cy="28" r="2" fill={accent} opacity="0.5" />
      <circle cx="28" cy="6" r="2" fill={accent} opacity="0.5" />
      <path d="M6 50 Q10 60 18 62" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M50 6 Q60 10 62 18" stroke={accent} strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export default function LuxuryGalaInvitation({
  title, hostName, date, time, location, message, customization,
}: LuxuryGalaInvitationProps) {
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
          className="relative rounded-2xl p-[3px]"
          style={{
            background: `linear-gradient(135deg, ${c.accentColor} 0%, ${c.accentColor}88 25%, ${c.accentColor}cc 50%, ${c.accentColor}88 75%, ${c.accentColor} 100%)`,
            boxShadow: `0 40px 100px ${c.accentColor}35, 0 12px 40px rgba(0,0,0,0.2)`,
          }}
        >
          <div className="relative rounded-2xl overflow-hidden" style={{ background: c.bgColor }}>

            {/* Corner ornaments */}
            <div className="absolute top-3 left-3"><GalaCorner accent={c.accentColor} rotate={0} /></div>
            <div className="absolute top-3 right-3"><GalaCorner accent={c.accentColor} rotate={90} /></div>
            <div className="absolute bottom-3 left-3"><GalaCorner accent={c.accentColor} rotate={-90} /></div>
            <div className="absolute bottom-3 right-3"><GalaCorner accent={c.accentColor} rotate={180} /></div>

            <div className="relative px-10 sm:px-16 py-12 sm:py-16">

              {/* Top ornamental line */}
              <div className="mb-8">
                <svg viewBox="0 0 500 16" fill="none" style={{ width: '100%' }}>
                  <line x1="0" y1="8" x2="500" y2="8" stroke={c.accentColor} strokeWidth="0.5" opacity="0.3" />
                  {[0,50,100,150,200,250,300,350,400,450].map(x => (
                    <g key={x} transform={`translate(${x+25},8)`}>
                      <path d="M0 -3 L2 0 L0 3 L-2 0 Z" fill={c.accentColor} opacity="0.5" />
                    </g>
                  ))}
                </svg>
              </div>

              {/* Header */}
              <div className="text-center mb-8">
                <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: `${c.accentColor}cc`, fontWeight: 500 }}>
                  An Exclusive Invitation
                </p>

                {/* Star cluster */}
                <div className="flex justify-center mb-5">
                  <svg viewBox="0 0 80 30" fill="none" style={{ width: 80, height: 30 }}>
                    <path d="M40 2 L42 10 L50 10 L44 15 L46 23 L40 18 L34 23 L36 15 L30 10 L38 10 Z" fill={c.accentColor} opacity="0.85" />
                    <path d="M16 8 L17 12 L21 12 L18 14.5 L19 18.5 L16 16 L13 18.5 L14 14.5 L11 12 L15 12 Z" fill={c.accentColor} opacity="0.5" />
                    <path d="M64 8 L65 12 L69 12 L66 14.5 L67 18.5 L64 16 L61 18.5 L62 14.5 L59 12 L63 12 Z" fill={c.accentColor} opacity="0.5" />
                  </svg>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4" style={{ color: c.textColor }}>
                  {title}
                </h1>

                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${c.accentColor})` }} />
                  <div className="w-2 h-2 rotate-45" style={{ backgroundColor: c.accentColor }} />
                  <div className="h-px w-16" style={{ background: `linear-gradient(270deg, transparent, ${c.accentColor})` }} />
                </div>
              </div>

              {/* Host name */}
              <div className="text-center mb-10">
                <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: `${c.accentColor}cc` }}>
                  Hosted by
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: c.textColor }}>
                  {hostName}
                </h2>
                <svg viewBox="0 0 320 18" fill="none" style={{ width: '100%', maxWidth: 320, margin: '8px auto 0' }}>
                  <path d="M10 9 Q80 16 160 9 Q240 2 310 9" stroke={c.accentColor} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
                  <circle cx="160" cy="9" r="2.5" fill={c.accentColor} opacity="0.8" />
                </svg>
              </div>

              {/* Details card */}
              <div
                className="rounded-xl p-6 sm:p-8 mb-8"
                style={{
                  background: `${c.accentColor}08`,
                  border: `1px solid ${c.accentColor}25`,
                }}
              >
                <div className="text-center mb-1">
                  <p className="text-xs tracking-[0.35em] uppercase" style={{ color: `${c.textColor}60` }}>{weekday}</p>
                </div>
                <div className="flex items-baseline justify-center gap-4 mb-4">
                  <span className="text-6xl font-bold leading-none" style={{ color: c.textColor }}>{day}</span>
                  <div className="flex flex-col items-start">
                    <span className="text-xl font-semibold leading-tight" style={{ color: c.accentColor }}>{month}</span>
                    <span className="text-sm" style={{ color: `${c.textColor}60` }}>{year}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${c.accentColor}50)` }} />
                  <svg viewBox="0 0 12 12" className="w-3 h-3" fill={c.accentColor}>
                    <path d="M6 0 L7 4.5 L12 4.5 L8 7 L9.5 12 L6 9 L2.5 12 L4 7 L0 4.5 L5 4.5 Z" />
                  </svg>
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(270deg, transparent, ${c.accentColor}50)` }} />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{ background: `${c.accentColor}20`, border: `1px solid ${c.accentColor}30` }}>
                      <svg style={{ width: 18, height: 18 }} fill="none" stroke={c.accentColor} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: c.accentColor }}>Time</p>
                    <p className="text-base font-semibold" style={{ color: c.textColor }}>{formattedTime}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{ background: `${c.accentColor}20`, border: `1px solid ${c.accentColor}30` }}>
                      <svg style={{ width: 18, height: 18 }} fill="none" stroke={c.accentColor} viewBox="0 0 24 24">
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
                <div className="text-center mb-8 px-2">
                  <p className="text-base sm:text-lg italic leading-relaxed" style={{ color: `${c.textColor}cc` }}>
                    &ldquo;{message}&rdquo;
                  </p>
                </div>
              )}

              {/* Bottom ornamental line */}
              <div className="mb-6">
                <svg viewBox="0 0 500 16" fill="none" style={{ width: '100%' }}>
                  <line x1="0" y1="8" x2="500" y2="8" stroke={c.accentColor} strokeWidth="0.5" opacity="0.3" />
                  {[0,50,100,150,200,250,300,350,400,450].map(x => (
                    <g key={x} transform={`translate(${x+25},8)`}>
                      <path d="M0 -3 L2 0 L0 3 L-2 0 Z" fill={c.accentColor} opacity="0.5" />
                    </g>
                  ))}
                </svg>
              </div>

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
