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

interface CasualInvitationProps {
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

export default function CasualInvitation({
  title, hostName, date, time, location, message, customization,
}: CasualInvitationProps) {
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
          className="relative rounded-3xl overflow-hidden"
          style={{
            border: `2px solid ${c.accentColor}40`,
            boxShadow: `0 20px 50px ${c.accentColor}20, 0 8px 20px rgba(0,0,0,0.08)`,
          }}
        >
          {/* Colorful top strip */}
          <div className="h-2" style={{ background: `linear-gradient(90deg, ${c.accentColor}, ${c.accentColor}88, ${c.accentColor})` }} />

          <div style={{ background: c.bgColor }}>
            <div className="px-8 sm:px-12 py-10 sm:py-12">

              {/* Header */}
              <div className="text-center mb-8">
                <div
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-5"
                  style={{ background: `${c.accentColor}15`, border: `1.5px solid ${c.accentColor}30` }}
                >
                  <span style={{ color: c.accentColor, fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700 }}>
                    🎉 You&apos;re Invited!
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4" style={{ color: c.textColor }}>
                  {title}
                </h1>

                <div className="flex items-center justify-center gap-2">
                  <div className="h-1 w-8 rounded-full" style={{ backgroundColor: c.accentColor, opacity: 0.5 }} />
                  <div className="h-1 w-4 rounded-full" style={{ backgroundColor: c.accentColor, opacity: 0.3 }} />
                  <div className="h-1 w-2 rounded-full" style={{ backgroundColor: c.accentColor, opacity: 0.2 }} />
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

              {/* Details — card style */}
              <div className="space-y-3 mb-8">
                {[
                  {
                    emoji: '📅',
                    label: 'Date',
                    value: `${weekday}, ${day} ${month} ${year}`,
                  },
                  {
                    emoji: '⏰',
                    label: 'Time',
                    value: formattedTime,
                  },
                  {
                    emoji: '📍',
                    label: 'Location',
                    value: location,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-xl px-5 py-4"
                    style={{ background: `${c.accentColor}08`, border: `1px solid ${c.accentColor}20` }}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <p className="text-xs tracking-widest uppercase mb-0.5" style={{ color: c.accentColor }}>{item.label}</p>
                      <p className="text-sm font-semibold" style={{ color: c.textColor }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message */}
              {message && (
                <div
                  className="rounded-2xl p-5 mb-8"
                  style={{ background: `${c.accentColor}10`, border: `1px solid ${c.accentColor}25` }}
                >
                  <p className="text-base italic leading-relaxed text-center" style={{ color: `${c.textColor}cc` }}>
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

          {/* Bottom strip */}
          <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${c.accentColor}40, ${c.accentColor}, ${c.accentColor}40)` }} />
        </div>
      </div>
    </div>
  );
}
