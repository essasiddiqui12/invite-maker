'use client';

interface Props {
  title: string;
  hostName: string;
  date: string;
  time: string;
  location: string;
  message?: string;
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

// Art Deco sunburst / fan pattern — top center
function ArtDecoSunburst() {
  return (
    <svg viewBox="0 0 300 120" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-xs mx-auto" aria-hidden="true">
      {/* Fan rays emanating from bottom center */}
      {Array.from({ length: 13 }, (_, i) => {
        const angle = -90 + (i - 6) * 14;
        const rad = (angle * Math.PI) / 180;
        const x2 = 150 + 110 * Math.cos(rad);
        const y2 = 120 + 110 * Math.sin(rad);
        return (
          <line key={i} x1="150" y1="120" x2={x2} y2={y2}
            stroke="#D4AF37" strokeWidth={i === 6 ? 1.5 : 0.8}
            opacity={i === 6 ? 0.7 : 0.35} />
        );
      })}
      {/* Concentric arcs */}
      <path d="M60 120 A90 90 0 0 1 240 120" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M80 120 A70 70 0 0 1 220 120" stroke="#D4AF37" strokeWidth="0.6" fill="none" opacity="0.3" />
      <path d="M100 120 A50 50 0 0 1 200 120" stroke="#D4AF37" strokeWidth="0.6" fill="none" opacity="0.25" />
      {/* Center diamond */}
      <path d="M150 100 L155 110 L150 120 L145 110 Z" fill="#D4AF37" opacity="0.7" />
    </svg>
  );
}

// Art Deco chevron border
function ArtDecoBorder() {
  return (
    <svg viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      {/* Outer border */}
      <rect x="10" y="10" width="580" height="780" rx="4" stroke="#D4AF37" strokeWidth="1" opacity="0.4" fill="none" />
      {/* Inner border */}
      <rect x="18" y="18" width="564" height="764" rx="2" stroke="#D4AF37" strokeWidth="0.5" opacity="0.25" fill="none" />
      {/* Corner Art Deco fans — top left */}
      <path d="M10 10 L50 10 L10 50 Z" fill="#D4AF37" opacity="0.08" />
      <path d="M10 10 L40 10 L10 40 Z" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.3" />
      <path d="M10 10 L30 10 L10 30 Z" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.25" />
      {/* Corner Art Deco fans — top right */}
      <path d="M590 10 L550 10 L590 50 Z" fill="#D4AF37" opacity="0.08" />
      <path d="M590 10 L560 10 L590 40 Z" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.3" />
      <path d="M590 10 L570 10 L590 30 Z" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.25" />
      {/* Corner Art Deco fans — bottom left */}
      <path d="M10 790 L50 790 L10 750 Z" fill="#D4AF37" opacity="0.08" />
      <path d="M10 790 L40 790 L10 760 Z" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.3" />
      {/* Corner Art Deco fans — bottom right */}
      <path d="M590 790 L550 790 L590 750 Z" fill="#D4AF37" opacity="0.08" />
      <path d="M590 790 L560 790 L590 760 Z" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.3" />
      {/* Mid-side chevrons */}
      <path d="M10 395 L22 400 L10 405" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M590 395 L578 400 L590 405" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.4" />
    </svg>
  );
}

// Gold divider with Art Deco diamond
function GoldDivider() {
  return (
    <svg viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
      <line x1="0" y1="10" x2="120" y2="10" stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />
      <path d="M135 10 L142 5 L149 10 L142 15 Z" fill="#D4AF37" opacity="0.8" />
      <path d="M151 10 L158 5 L165 10 L158 15 Z" fill="#D4AF37" opacity="0.5" />
      <line x1="180" y1="10" x2="300" y2="10" stroke="#D4AF37" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

// Art Deco geometric side ornament
function SideOrnament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 120" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <line x1="15" y1="0" x2="15" y2="120" stroke="#D4AF37" strokeWidth="0.8" opacity="0.4" />
      <path d="M15 20 L22 30 L15 40 L8 30 Z" fill="#D4AF37" opacity="0.3" />
      <path d="M15 55 L20 62 L15 69 L10 62 Z" fill="#D4AF37" opacity="0.25" />
      <path d="M15 80 L22 90 L15 100 L8 90 Z" fill="#D4AF37" opacity="0.3" />
      <circle cx="15" cy="10" r="2.5" fill="#D4AF37" opacity="0.5" />
      <circle cx="15" cy="110" r="2.5" fill="#D4AF37" opacity="0.5" />
    </svg>
  );
}

export default function LuxuryGalaInvitation({ title, hostName, date, time, location, message }: Props) {
  const { weekday, day, month, year } = formatDate(date);
  const formattedTime = formatTime(time);

  return (
    <div
      id="invitation-content"
      className="min-h-screen flex items-center justify-center py-16 px-4 pt-14"
      style={{ background: 'linear-gradient(160deg, #0A0A0A 0%, #0D0D0D 50%, #111111 100%)' }}
    >
      <div className="w-full max-w-2xl">

        {/* Outer gold frame */}
        <div
          className="relative rounded-sm p-px"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #F7E7CE 25%, #D4AF37 50%, #C0A030 75%, #D4AF37 100%)',
            boxShadow: '0 32px 80px rgba(212,175,55,0.3), 0 8px 32px rgba(0,0,0,0.8), inset 0 1px 0 rgba(247,231,206,0.3)',
          }}
        >
          {/* Card */}
          <div
            className="relative overflow-hidden"
            style={{ backgroundColor: '#111111' }}
          >
            <ArtDecoBorder />

            {/* Subtle gold shimmer overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 60%)',
              }}
            />

            {/* Side ornaments */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2">
              <SideOrnament className="w-6 h-28" />
            </div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2" style={{ transform: 'translateY(-50%) scaleX(-1)' }}>
              <SideOrnament className="w-6 h-28" />
            </div>

            <div className="relative px-12 sm:px-20 py-14 sm:py-16">

              {/* Header */}
              <div className="text-center mb-8">
                {/* Art Deco sunburst */}
                <div className="mb-6">
                  <ArtDecoSunburst />
                </div>

                <div
                  className="inline-flex items-center gap-2 px-6 py-2 mb-6"
                  style={{
                    background: 'rgba(212,175,55,0.08)',
                    border: '1px solid rgba(212,175,55,0.4)',
                  }}
                >
                  <span style={{ color: '#D4AF37', fontFamily: 'var(--font-inter, Inter, sans-serif)', fontSize: '0.6rem', letterSpacing: '0.5em', textTransform: 'uppercase', fontWeight: 600 }}>
                    Black Tie Gala
                  </span>
                </div>

                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F7E7CE 40%, #D4AF37 70%, #C0C0C0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {title}
                </h1>

                <GoldDivider />
              </div>

              {/* Host name */}
              <div className="text-center mb-10">
                <p
                  className="text-xs tracking-[0.5em] uppercase mb-3"
                  style={{ color: 'rgba(212,175,55,0.6)', fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 500 }}
                >
                  In the Presence of
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-3"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    color: '#F7E7CE',
                  }}
                >
                  {hostName}
                </h2>
                {/* Gold underline */}
                <svg viewBox="0 0 200 8" className="w-40 mx-auto" fill="none">
                  <path d="M10 4 Q100 8 190 4" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                </svg>
              </div>

              {/* Details card */}
              <div
                className="p-6 sm:p-8 mb-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(192,192,192,0.04) 100%)',
                  border: '1px solid rgba(212,175,55,0.2)',
                }}
              >
                {/* Date */}
                <div className="text-center mb-6">
                  <p
                    className="text-xs tracking-[0.4em] uppercase mb-2"
                    style={{ color: '#D4AF37', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                  >
                    Evening of
                  </p>
                  <p
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ color: 'rgba(245,245,240,0.35)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                  >
                    {weekday}
                  </p>
                  <div className="flex items-baseline justify-center gap-3">
                    <span
                      className="text-5xl sm:text-6xl font-bold leading-none"
                      style={{
                        fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                        color: '#F7E7CE',
                      }}
                    >
                      {day}
                    </span>
                    <div className="flex flex-col items-start">
                      <span
                        className="text-lg font-semibold leading-tight"
                        style={{
                          fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                          color: '#D4AF37',
                        }}
                      >
                        {month}
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: 'rgba(245,245,240,0.35)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                      >
                        {year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4))' }} />
                  <svg viewBox="0 0 12 12" className="w-3 h-3" fill="#D4AF37" opacity="0.7">
                    <path d="M6 0 L7 4.5 L12 4.5 L8 7.5 L9.5 12 L6 9 L2.5 12 L4 7.5 L0 4.5 L5 4.5 Z" />
                  </svg>
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(270deg, transparent, rgba(212,175,55,0.4))' }} />
                </div>

                {/* Time & Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div
                      className="w-10 h-10 flex items-center justify-center mx-auto mb-2"
                      style={{
                        background: 'rgba(212,175,55,0.1)',
                        border: '1px solid rgba(212,175,55,0.25)',
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="#D4AF37" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#D4AF37', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>Time</p>
                    <p className="text-base font-semibold" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)', color: '#F5F5F0' }}>
                      {formattedTime}
                    </p>
                  </div>

                  <div className="text-center">
                    <div
                      className="w-10 h-10 flex items-center justify-center mx-auto mb-2"
                      style={{
                        background: 'rgba(192,192,192,0.08)',
                        border: '1px solid rgba(192,192,192,0.2)',
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="#C0C0C0" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#C0C0C0', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>Venue</p>
                    <p className="text-sm font-semibold leading-snug" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)', color: '#F5F5F0' }}>
                      {location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              {message && (
                <div className="text-center mb-8 px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4))' }} />
                    <svg viewBox="0 0 16 16" className="w-3 h-3" fill="#D4AF37" opacity="0.8">
                      <path d="M8 0 L9 5.5 L15 5.5 L10.5 9 L12 14.5 L8 11 L4 14.5 L5.5 9 L1 5.5 L7 5.5 Z" />
                    </svg>
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(270deg, transparent, rgba(212,175,55,0.4))' }} />
                  </div>
                  <p
                    className="text-base sm:text-lg italic leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                      color: 'rgba(247,231,206,0.75)',
                    }}
                  >
                    &ldquo;{message}&rdquo;
                  </p>
                </div>
              )}

              {/* Bottom Art Deco ornament */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5))' }} />
                <svg viewBox="0 0 40 16" className="w-10 h-4" fill="none">
                  <path d="M0 8 L8 2 L16 8 L8 14 Z" fill="#D4AF37" opacity="0.4" />
                  <path d="M20 8 L28 2 L36 8 L28 14 Z" fill="#D4AF37" opacity="0.4" />
                  <circle cx="40" cy="8" r="2" fill="#D4AF37" opacity="0.5" />
                </svg>
                <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(270deg, transparent, rgba(212,175,55,0.5))' }} />
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.35))' }} />
            <p
              className="text-xs tracking-[0.4em] uppercase"
              style={{ color: 'rgba(212,175,55,0.4)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
            >
              Created with InviteMaker
            </p>
            <div className="h-px w-12" style={{ background: 'linear-gradient(270deg, transparent, rgba(212,175,55,0.35))' }} />
          </div>
        </div>

      </div>
    </div>
  );
}
