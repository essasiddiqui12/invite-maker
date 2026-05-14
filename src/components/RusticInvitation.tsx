'use client';

import { InvitationCustomization, DEFAULT_CUSTOMIZATION } from '@/types/invitation';

interface Props {
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

// Wood-grain texture overlay
function WoodGrain() {
  return (
    <svg viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      {/* Subtle wood grain lines */}
      <path d="M0 100 Q150 95 300 102 Q450 109 600 100" stroke="#8B4513" strokeWidth="0.5" opacity="0.08" fill="none" />
      <path d="M0 180 Q200 172 400 183 Q500 188 600 180" stroke="#8B4513" strokeWidth="0.5" opacity="0.07" fill="none" />
      <path d="M0 260 Q100 255 300 263 Q500 271 600 260" stroke="#8B4513" strokeWidth="0.5" opacity="0.08" fill="none" />
      <path d="M0 340 Q250 333 400 342 Q500 347 600 340" stroke="#8B4513" strokeWidth="0.5" opacity="0.07" fill="none" />
      <path d="M0 420 Q150 414 300 422 Q450 430 600 420" stroke="#8B4513" strokeWidth="0.5" opacity="0.08" fill="none" />
      <path d="M0 500 Q200 493 350 502 Q500 511 600 500" stroke="#8B4513" strokeWidth="0.5" opacity="0.07" fill="none" />
      <path d="M0 580 Q100 574 300 582 Q500 590 600 580" stroke="#8B4513" strokeWidth="0.5" opacity="0.08" fill="none" />
      <path d="M0 660 Q250 653 400 662 Q500 667 600 660" stroke="#8B4513" strokeWidth="0.5" opacity="0.07" fill="none" />
      <path d="M0 740 Q150 734 300 742 Q450 750 600 740" stroke="#8B4513" strokeWidth="0.5" opacity="0.06" fill="none" />
    </svg>
  );
}

// Rope-style border ornament
function RopeBorder() {
  return (
    <svg viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      {/* Outer rope border — dashed to simulate rope twist */}
      <rect x="12" y="12" width="576" height="776" rx="10"
        stroke="#8B4513" strokeWidth="2" strokeDasharray="8 4" opacity="0.3" fill="none" />
      <rect x="20" y="20" width="560" height="760" rx="8"
        stroke="#D4A853" strokeWidth="1" strokeDasharray="6 6" opacity="0.25" fill="none" />
      {/* Corner knots */}
      <circle cx="12" cy="12" r="7" fill="#8B4513" opacity="0.4" />
      <circle cx="12" cy="12" r="3.5" fill="#D4A853" opacity="0.5" />
      <circle cx="588" cy="12" r="7" fill="#8B4513" opacity="0.4" />
      <circle cx="588" cy="12" r="3.5" fill="#D4A853" opacity="0.5" />
      <circle cx="12" cy="788" r="7" fill="#8B4513" opacity="0.4" />
      <circle cx="12" cy="788" r="3.5" fill="#D4A853" opacity="0.5" />
      <circle cx="588" cy="788" r="7" fill="#8B4513" opacity="0.4" />
      <circle cx="588" cy="788" r="3.5" fill="#D4A853" opacity="0.5" />
    </svg>
  );
}

// Wheat/grain illustration
function WheatSprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      {/* Stem */}
      <path d="M30 95 Q28 70 30 50 Q32 30 30 10" stroke="#D4A853" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Grain heads */}
      <ellipse cx="30" cy="12" rx="5" ry="9" fill="#D4A853" opacity="0.6" />
      <ellipse cx="22" cy="22" rx="5" ry="8" fill="#D4A853" opacity="0.55" transform="rotate(-20 22 22)" />
      <ellipse cx="38" cy="22" rx="5" ry="8" fill="#D4A853" opacity="0.55" transform="rotate(20 38 22)" />
      <ellipse cx="18" cy="34" rx="4" ry="7" fill="#D4A853" opacity="0.45" transform="rotate(-30 18 34)" />
      <ellipse cx="42" cy="34" rx="4" ry="7" fill="#D4A853" opacity="0.45" transform="rotate(30 42 34)" />
      <ellipse cx="16" cy="46" rx="4" ry="6" fill="#D4A853" opacity="0.35" transform="rotate(-35 16 46)" />
      <ellipse cx="44" cy="46" rx="4" ry="6" fill="#D4A853" opacity="0.35" transform="rotate(35 44 46)" />
    </svg>
  );
}

// Lantern SVG icon
function LanternIcon() {
  return (
    <svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-16 mx-auto" aria-hidden="true">
      {/* Top hook */}
      <path d="M24 2 Q24 6 24 8" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <path d="M18 8 Q24 6 30 8" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      {/* Body */}
      <rect x="10" y="10" width="28" height="38" rx="4" fill="#3D5A3E" opacity="0.25" stroke="#D4A853" strokeWidth="1.2" />
      {/* Glass panels */}
      <rect x="14" y="14" width="8" height="30" rx="2" fill="#D4A853" opacity="0.12" />
      <rect x="26" y="14" width="8" height="30" rx="2" fill="#D4A853" opacity="0.12" />
      {/* Flame */}
      <path d="M24 22 Q26 26 24 30 Q22 26 24 22Z" fill="#D4A853" opacity="0.8" />
      <path d="M24 24 Q25 27 24 29 Q23 27 24 24Z" fill="#FDF6E8" opacity="0.9" />
      {/* Bottom cap */}
      <path d="M10 48 Q24 52 38 48" stroke="#D4A853" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M16 52 Q24 56 32 52" stroke="#D4A853" strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  );
}

// Rustic divider with wheat motif
function RusticDivider() {
  return (
    <svg viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
      <line x1="0" y1="10" x2="110" y2="10" stroke="#8B4513" strokeWidth="0.8" opacity="0.35" strokeDasharray="4 3" />
      <circle cx="125" cy="10" r="3" fill="#D4A853" opacity="0.6" />
      <path d="M150 4 Q152 8 150 12 Q148 8 150 4Z" fill="#D4A853" opacity="0.8" />
      <circle cx="175" cy="10" r="3" fill="#D4A853" opacity="0.6" />
      <line x1="190" y1="10" x2="300" y2="10" stroke="#8B4513" strokeWidth="0.8" opacity="0.35" strokeDasharray="4 3" />
    </svg>
  );
}

export default function RusticInvitation({ title, hostName, date, time, location, message }: Props) {
  const { weekday, day, month, year } = formatDate(date);
  const formattedTime = formatTime(time);

  return (
    <div
      id="invitation-content"
      className="min-h-screen flex items-center justify-center py-16 px-4 pt-14"
      style={{ background: 'linear-gradient(160deg, #F5EDD8 0%, #F0E5C8 50%, #EBD9B8 100%)' }}
    >
      <div className="w-full max-w-2xl">

        {/* Outer frame */}
        <div
          className="relative rounded-2xl p-px"
          style={{
            background: 'linear-gradient(135deg, #8B4513 0%, #D4A853 30%, #3D5A3E 60%, #8B4513 100%)',
            boxShadow: '0 28px 70px rgba(139,69,19,0.2), 0 8px 24px rgba(0,0,0,0.12)',
          }}
        >
          {/* Card */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ backgroundColor: '#FDF6E8' }}
          >
            <WoodGrain />
            <RopeBorder />

            {/* Wheat sprigs in corners */}
            <div className="absolute top-6 left-6 opacity-60">
              <WheatSprig className="w-8 h-14" />
            </div>
            <div className="absolute top-6 right-6 opacity-60" style={{ transform: 'scaleX(-1)' }}>
              <WheatSprig className="w-8 h-14" />
            </div>
            <div className="absolute bottom-6 left-6 opacity-40" style={{ transform: 'rotate(180deg)' }}>
              <WheatSprig className="w-8 h-14" />
            </div>
            <div className="absolute bottom-6 right-6 opacity-40" style={{ transform: 'rotate(180deg) scaleX(-1)' }}>
              <WheatSprig className="w-8 h-14" />
            </div>

            <div className="relative px-10 sm:px-16 py-14 sm:py-16">

              {/* Header */}
              <div className="text-center mb-8">
                <div
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
                  style={{
                    background: 'rgba(139,69,19,0.08)',
                    border: '1px solid rgba(139,69,19,0.25)',
                  }}
                >
                  <span style={{ color: '#8B4513', fontFamily: 'var(--font-inter, Inter, sans-serif)', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 600 }}>
                    ✦ You&apos;re Invited ✦
                  </span>
                </div>

                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    color: '#2C1810',
                  }}
                >
                  {title}
                </h1>

                <RusticDivider />
              </div>

              {/* Lantern icon */}
              <div className="mb-6">
                <LanternIcon />
              </div>

              {/* Host name */}
              <div className="text-center mb-10">
                <p
                  className="text-xs tracking-[0.35em] uppercase mb-2"
                  style={{ color: '#3D5A3E', fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 500 }}
                >
                  Join us with
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-2"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    color: '#2C1810',
                  }}
                >
                  {hostName}
                </h2>
                <svg viewBox="0 0 200 10" className="w-40 mx-auto mt-1 opacity-40" fill="none">
                  <path d="M10 5 Q100 9 190 5" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="5 3" />
                </svg>
              </div>

              {/* Details card */}
              <div
                className="rounded-xl p-6 sm:p-8 mb-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,168,83,0.1) 0%, rgba(139,69,19,0.08) 100%)',
                  border: '1px solid rgba(139,69,19,0.2)',
                }}
              >
                {/* Date */}
                <div className="text-center mb-6">
                  <p
                    className="text-xs tracking-[0.3em] uppercase mb-2"
                    style={{ color: '#8B4513', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                  >
                    Date
                  </p>
                  <p
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ color: 'rgba(44,24,16,0.4)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                  >
                    {weekday}
                  </p>
                  <div className="flex items-baseline justify-center gap-3">
                    <span
                      className="text-5xl sm:text-6xl font-bold leading-none"
                      style={{
                        fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                        color: '#2C1810',
                      }}
                    >
                      {day}
                    </span>
                    <div className="flex flex-col items-start">
                      <span
                        className="text-lg font-semibold leading-tight"
                        style={{
                          fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                          color: '#8B4513',
                        }}
                      >
                        {month}
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: 'rgba(44,24,16,0.45)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                      >
                        {year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,69,19,0.35))' }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#D4A853' }} />
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(270deg, transparent, rgba(139,69,19,0.35))' }} />
                </div>

                {/* Time & Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{ background: 'rgba(139,69,19,0.1)' }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="#8B4513" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#8B4513', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>Time</p>
                    <p className="text-base font-semibold" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)', color: '#2C1810' }}>
                      {formattedTime}
                    </p>
                  </div>

                  <div className="text-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{ background: 'rgba(61,90,62,0.1)' }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="#3D5A3E" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#3D5A3E', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>Venue</p>
                    <p className="text-sm font-semibold leading-snug" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)', color: '#2C1810' }}>
                      {location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              {message && (
                <div className="text-center mb-8 px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,69,19,0.35))' }} />
                    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="#D4A853" opacity="0.8">
                      <path d="M10 2 Q12 7 17 7 Q12 10 14 15 Q10 11 6 15 Q8 10 3 7 Q8 7 10 2Z" />
                    </svg>
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(270deg, transparent, rgba(139,69,19,0.35))' }} />
                  </div>
                  <p
                    className="text-base sm:text-lg italic leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                      color: 'rgba(44,24,16,0.75)',
                    }}
                  >
                    &ldquo;{message}&rdquo;
                  </p>
                </div>
              )}

              {/* Bottom ornament */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,69,19,0.4))' }} />
                <span style={{ color: '#D4A853', fontSize: '0.75rem', opacity: 0.8 }}>✦</span>
                <div className="h-px w-8" style={{ backgroundColor: '#3D5A3E', opacity: 0.3 }} />
                <span style={{ color: '#D4A853', fontSize: '0.75rem', opacity: 0.8 }}>✦</span>
                <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(270deg, transparent, rgba(139,69,19,0.4))' }} />
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,69,19,0.35))' }} />
            <p
              className="text-xs tracking-[0.35em] uppercase"
              style={{ color: 'rgba(139,69,19,0.5)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
            >
              Created with InviteMaker
            </p>
            <div className="h-px w-12" style={{ background: 'linear-gradient(270deg, transparent, rgba(139,69,19,0.35))' }} />
          </div>
        </div>

      </div>
    </div>
  );
}
