'use client';

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

// Geometric grid background pattern
function GeometricBackground() {
  return (
    <svg
      viewBox="0 0 600 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Subtle grid lines */}
      <line x1="0" y1="200" x2="600" y2="200" stroke="#C0C8D0" strokeWidth="0.3" opacity="0.15" />
      <line x1="0" y1="400" x2="600" y2="400" stroke="#C0C8D0" strokeWidth="0.3" opacity="0.15" />
      <line x1="0" y1="600" x2="600" y2="600" stroke="#C0C8D0" strokeWidth="0.3" opacity="0.15" />
      <line x1="150" y1="0" x2="150" y2="800" stroke="#C0C8D0" strokeWidth="0.3" opacity="0.15" />
      <line x1="300" y1="0" x2="300" y2="800" stroke="#C0C8D0" strokeWidth="0.3" opacity="0.15" />
      <line x1="450" y1="0" x2="450" y2="800" stroke="#C0C8D0" strokeWidth="0.3" opacity="0.15" />
      {/* Diagonal accent lines */}
      <line x1="0" y1="0" x2="200" y2="200" stroke="#B8A060" strokeWidth="0.5" opacity="0.08" />
      <line x1="400" y1="0" x2="600" y2="200" stroke="#B8A060" strokeWidth="0.5" opacity="0.08" />
      <line x1="0" y1="600" x2="200" y2="800" stroke="#B8A060" strokeWidth="0.5" opacity="0.08" />
      <line x1="400" y1="600" x2="600" y2="800" stroke="#B8A060" strokeWidth="0.5" opacity="0.08" />
      {/* Corner geometric shapes */}
      <polygon points="0,0 60,0 0,60" fill="#B8A060" opacity="0.06" />
      <polygon points="600,0 540,0 600,60" fill="#B8A060" opacity="0.06" />
      <polygon points="0,800 60,800 0,740" fill="#B8A060" opacity="0.06" />
      <polygon points="600,800 540,800 600,740" fill="#B8A060" opacity="0.06" />
      {/* Hexagon accents */}
      <polygon points="300,30 315,39 315,57 300,66 285,57 285,39" stroke="#B8A060" strokeWidth="0.8" fill="none" opacity="0.15" />
      <polygon points="300,734 315,743 315,761 300,770 285,761 285,743" stroke="#B8A060" strokeWidth="0.8" fill="none" opacity="0.15" />
    </svg>
  );
}

// Geometric corner ornament
function GeometricCorner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* L-bracket */}
      <path d="M4 4 L4 40 M4 4 L40 4" stroke="#B8A060" strokeWidth="2" strokeLinecap="square" opacity="0.7" />
      {/* Inner bracket */}
      <path d="M12 12 L12 30 M12 12 L30 12" stroke="#9BA8B5" strokeWidth="1" strokeLinecap="square" opacity="0.4" />
      {/* Corner dot */}
      <rect x="2" y="2" width="4" height="4" fill="#B8A060" opacity="0.8" />
      {/* Accent diamond */}
      <path d="M20 20 L23 23 L20 26 L17 23 Z" fill="#B8A060" opacity="0.3" />
    </svg>
  );
}

// Silver/gold horizontal rule with diamond
function ExecutiveDivider() {
  return (
    <svg viewBox="0 0 320 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
      <line x1="0" y1="8" x2="130" y2="8" stroke="url(#silverGrad)" strokeWidth="0.8" opacity="0.7" />
      <defs>
        <linearGradient id="silverGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9BA8B5" stopOpacity="0" />
          <stop offset="100%" stopColor="#9BA8B5" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="silverGradR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9BA8B5" stopOpacity="1" />
          <stop offset="100%" stopColor="#9BA8B5" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Diamond */}
      <path d="M160 4 L164 8 L160 12 L156 8 Z" fill="#B8A060" opacity="0.9" />
      <path d="M160 5.5 L162.5 8 L160 10.5 L157.5 8 Z" fill="#D4C070" opacity="0.6" />
      <line x1="190" y1="8" x2="320" y2="8" stroke="url(#silverGradR)" strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
}

// Geometric monogram frame
function MonogramFrame() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto" aria-hidden="true">
      {/* Outer octagon */}
      <polygon
        points="24,4 56,4 76,24 76,56 56,76 24,76 4,56 4,24"
        stroke="#B8A060"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      {/* Inner octagon */}
      <polygon
        points="28,12 52,12 68,28 68,52 52,68 28,68 12,52 12,28"
        stroke="#9BA8B5"
        strokeWidth="0.8"
        fill="none"
        opacity="0.35"
      />
      {/* Center diamond */}
      <path d="M40 28 L52 40 L40 52 L28 40 Z" stroke="#B8A060" strokeWidth="1" fill="rgba(184,160,96,0.08)" opacity="0.7" />
      {/* Center dot */}
      <circle cx="40" cy="40" r="3" fill="#B8A060" opacity="0.7" />
    </svg>
  );
}

export default function CorporateInvitation({
  title,
  hostName,
  date,
  time,
  location,
  message,
}: CorporateInvitationProps) {
  const { weekday, day, month, year } = formatDate(date);
  const formattedTime = formatTime(time);

  return (
    <div
      id="invitation-content"
      className="min-h-screen flex items-center justify-center py-16 px-4 pt-14"
      style={{ background: 'linear-gradient(160deg, #1C2330 0%, #161D28 50%, #1A2130 100%)' }}
    >
      <div className="w-full max-w-2xl">

        {/* Outer silver-gold frame */}
        <div
          className="relative rounded-2xl p-px"
          style={{
            background: 'linear-gradient(135deg, #9BA8B5 0%, #B8A060 25%, #D4C070 50%, #B8A060 75%, #9BA8B5 100%)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(184,160,96,0.15)',
          }}
        >
          {/* Inner card */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #1E2A38 0%, #18222E 50%, #1C2838 100%)' }}
          >
            {/* Geometric background */}
            <GeometricBackground />

            {/* Corner ornaments */}
            <div className="absolute top-4 left-4">
              <GeometricCorner className="w-12 h-12" />
            </div>
            <div className="absolute top-4 right-4 rotate-90">
              <GeometricCorner className="w-12 h-12" />
            </div>
            <div className="absolute bottom-4 left-4 -rotate-90">
              <GeometricCorner className="w-12 h-12" />
            </div>
            <div className="absolute bottom-4 right-4 rotate-180">
              <GeometricCorner className="w-12 h-12" />
            </div>

            <div className="relative px-10 sm:px-16 py-14 sm:py-16">

              {/* Header */}
              <div className="text-center mb-8">
                {/* Monogram frame */}
                <div className="mb-5">
                  <MonogramFrame />
                </div>

                <p
                  className="text-xs tracking-[0.5em] uppercase mb-3"
                  style={{ color: '#9BA8B5', fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 500 }}
                >
                  Exclusive Invitation
                </p>

                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    color: '#EEE8D8',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {title}
                </h1>

                <ExecutiveDivider />
              </div>

              {/* Host */}
              <div className="text-center mb-10">
                <p
                  className="text-xs tracking-[0.4em] uppercase mb-2"
                  style={{ color: '#B8A060', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                >
                  Hosted by
                </p>
                <h2
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    color: '#EEE8D8',
                  }}
                >
                  {hostName}
                </h2>
                {/* Geometric underline */}
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="h-px w-12" style={{ backgroundColor: '#9BA8B5', opacity: 0.4 }} />
                  <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#B8A060', opacity: 0.8 }} />
                  <div className="h-px w-12" style={{ backgroundColor: '#9BA8B5', opacity: 0.4 }} />
                </div>
              </div>

              {/* Details card */}
              <div
                className="rounded-xl p-6 sm:p-8 mb-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(155,168,181,0.06) 0%, rgba(184,160,96,0.08) 100%)',
                  border: '1px solid rgba(155,168,181,0.2)',
                }}
              >
                {/* Date */}
                <div className="text-center mb-6">
                  <p
                    className="text-xs tracking-[0.35em] uppercase mb-2"
                    style={{ color: '#B8A060', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                  >
                    Date
                  </p>
                  <p
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ color: 'rgba(238,232,216,0.4)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                  >
                    {weekday}
                  </p>
                  <div className="flex items-baseline justify-center gap-3">
                    <span
                      className="text-5xl sm:text-6xl font-bold leading-none"
                      style={{
                        fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                        color: '#EEE8D8',
                      }}
                    >
                      {day}
                    </span>
                    <div className="flex flex-col items-start">
                      <span
                        className="text-lg font-semibold leading-tight"
                        style={{
                          fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                          color: '#B8A060',
                        }}
                      >
                        {month}
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: 'rgba(238,232,216,0.4)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                      >
                        {year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(155,168,181,0.4))' }} />
                  <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#B8A060', opacity: 0.7 }} />
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(270deg, transparent, rgba(155,168,181,0.4))' }} />
                </div>

                {/* Time & Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2"
                      style={{ background: 'linear-gradient(135deg, rgba(155,168,181,0.15), rgba(184,160,96,0.2))' }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="#B8A060" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#9BA8B5', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>Time</p>
                    <p className="text-base font-semibold" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)', color: '#EEE8D8' }}>
                      {formattedTime}
                    </p>
                  </div>

                  <div className="text-center">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2"
                      style={{ background: 'linear-gradient(135deg, rgba(155,168,181,0.15), rgba(184,160,96,0.2))' }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="#9BA8B5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#9BA8B5', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>Venue</p>
                    <p className="text-sm font-semibold leading-snug" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)', color: '#EEE8D8' }}>
                      {location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              {message && (
                <div className="text-center mb-8 px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(155,168,181,0.4))' }} />
                    <div className="w-2 h-2 rotate-45" style={{ backgroundColor: '#B8A060', opacity: 0.7 }} />
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(270deg, transparent, rgba(155,168,181,0.4))' }} />
                  </div>
                  <p
                    className="text-base sm:text-lg italic leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                      color: 'rgba(238,232,216,0.75)',
                    }}
                  >
                    &ldquo;{message}&rdquo;
                  </p>
                </div>
              )}

              {/* Bottom ornament */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(155,168,181,0.4))' }} />
                <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#B8A060', opacity: 0.6 }} />
                <div className="h-px w-8" style={{ backgroundColor: '#9BA8B5', opacity: 0.3 }} />
                <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#B8A060', opacity: 0.6 }} />
                <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(270deg, transparent, rgba(155,168,181,0.4))' }} />
              </div>

            </div>
          </div>
        </div>

        {/* Footer watermark */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(155,168,181,0.3))' }} />
            <p
              className="text-xs tracking-[0.35em] uppercase"
              style={{ color: 'rgba(155,168,181,0.4)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
            >
              Created with InviteMaker
            </p>
            <div className="h-px w-12" style={{ background: 'linear-gradient(270deg, transparent, rgba(155,168,181,0.3))' }} />
          </div>
        </div>

      </div>
    </div>
  );
}
