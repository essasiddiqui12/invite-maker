'use client';

interface GraduationInvitationProps {
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

// Diploma-style border — double-line with corner medallions
function DiplomaBorder() {
  return (
    <svg
      viewBox="0 0 600 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Outer border */}
      <rect x="8" y="8" width="584" height="784" rx="12" stroke="#C9A96E" strokeWidth="1.5" opacity="0.5" />
      {/* Inner border */}
      <rect x="18" y="18" width="564" height="764" rx="8" stroke="#C9A96E" strokeWidth="0.8" opacity="0.35" />
      {/* Corner medallion — top left */}
      <circle cx="8" cy="8" r="10" fill="#6B1E2E" stroke="#C9A96E" strokeWidth="1" opacity="0.8" />
      <circle cx="8" cy="8" r="5" fill="#C9A96E" opacity="0.6" />
      {/* Corner medallion — top right */}
      <circle cx="592" cy="8" r="10" fill="#6B1E2E" stroke="#C9A96E" strokeWidth="1" opacity="0.8" />
      <circle cx="592" cy="8" r="5" fill="#C9A96E" opacity="0.6" />
      {/* Corner medallion — bottom left */}
      <circle cx="8" cy="792" r="10" fill="#6B1E2E" stroke="#C9A96E" strokeWidth="1" opacity="0.8" />
      <circle cx="8" cy="792" r="5" fill="#C9A96E" opacity="0.6" />
      {/* Corner medallion — bottom right */}
      <circle cx="592" cy="792" r="10" fill="#6B1E2E" stroke="#C9A96E" strokeWidth="1" opacity="0.8" />
      <circle cx="592" cy="792" r="5" fill="#C9A96E" opacity="0.6" />
      {/* Mid-side ornaments */}
      <circle cx="300" cy="8" r="5" fill="#C9A96E" opacity="0.4" />
      <circle cx="300" cy="792" r="5" fill="#C9A96E" opacity="0.4" />
      <circle cx="8" cy="400" r="5" fill="#C9A96E" opacity="0.4" />
      <circle cx="592" cy="400" r="5" fill="#C9A96E" opacity="0.4" />
    </svg>
  );
}

// Laurel wreath SVG
function LaurelWreath() {
  return (
    <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 mx-auto" aria-hidden="true">
      {/* Left branch */}
      <path d="M90 40 Q70 30 55 20 Q45 15 40 25 Q50 20 60 28 Q70 35 80 42" stroke="#C9A96E" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
      <ellipse cx="55" cy="22" rx="9" ry="5" fill="#8B6914" opacity="0.35" transform="rotate(-30 55 22)" />
      <ellipse cx="65" cy="28" rx="9" ry="5" fill="#8B6914" opacity="0.35" transform="rotate(-20 65 28)" />
      <ellipse cx="75" cy="35" rx="9" ry="5" fill="#8B6914" opacity="0.35" transform="rotate(-10 75 35)" />
      <ellipse cx="48" cy="30" rx="8" ry="4" fill="#C9A96E" opacity="0.25" transform="rotate(-40 48 30)" />
      <ellipse cx="58" cy="36" rx="8" ry="4" fill="#C9A96E" opacity="0.25" transform="rotate(-25 58 36)" />
      {/* Right branch (mirrored) */}
      <path d="M110 40 Q130 30 145 20 Q155 15 160 25 Q150 20 140 28 Q130 35 120 42" stroke="#C9A96E" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
      <ellipse cx="145" cy="22" rx="9" ry="5" fill="#8B6914" opacity="0.35" transform="rotate(30 145 22)" />
      <ellipse cx="135" cy="28" rx="9" ry="5" fill="#8B6914" opacity="0.35" transform="rotate(20 135 28)" />
      <ellipse cx="125" cy="35" rx="9" ry="5" fill="#8B6914" opacity="0.35" transform="rotate(10 125 35)" />
      <ellipse cx="152" cy="30" rx="8" ry="4" fill="#C9A96E" opacity="0.25" transform="rotate(40 152 30)" />
      <ellipse cx="142" cy="36" rx="8" ry="4" fill="#C9A96E" opacity="0.25" transform="rotate(25 142 36)" />
      {/* Center ribbon knot */}
      <path d="M95 55 Q100 50 105 55 Q100 60 95 55 Z" fill="#C9A96E" opacity="0.6" />
      <path d="M90 58 Q95 55 100 58" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M110 58 Q105 55 100 58" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  );
}

// Academic star divider
function AcademicDivider() {
  return (
    <svg viewBox="0 0 320 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
      <line x1="0" y1="10" x2="120" y2="10" stroke="#C9A96E" strokeWidth="0.6" opacity="0.5" />
      <path d="M150 3 L151.5 8 L157 8 L152.5 11 L154 16 L150 13 L146 16 L147.5 11 L143 8 L148.5 8 Z" fill="#C9A96E" opacity="0.8" />
      <circle cx="135" cy="10" r="2" fill="#C9A96E" opacity="0.4" />
      <circle cx="165" cy="10" r="2" fill="#C9A96E" opacity="0.4" />
      <line x1="180" y1="10" x2="320" y2="10" stroke="#C9A96E" strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}

// Graduation cap icon
function GradCapIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" aria-hidden="true">
      <path d="M24 8 L44 18 L24 28 L4 18 Z" fill="#C9A96E" opacity="0.9" />
      <path d="M12 22 L12 34 Q24 40 36 34 L36 22" stroke="#C9A96E" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <line x1="44" y1="18" x2="44" y2="30" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="44" cy="31" r="2" fill="#C9A96E" opacity="0.6" />
    </svg>
  );
}

export default function GraduationInvitation({
  title,
  hostName,
  date,
  time,
  location,
  message,
}: GraduationInvitationProps) {
  const { weekday, day, month, year } = formatDate(date);
  const formattedTime = formatTime(time);

  return (
    <div
      id="invitation-content"
      className="min-h-screen flex items-center justify-center py-16 px-4 pt-14"
      style={{ background: 'linear-gradient(160deg, #F8F4EE 0%, #F5EFE8 40%, #F2EDE5 100%)' }}
    >
      <div className="w-full max-w-2xl">

        {/* Outer gold-burgundy frame */}
        <div
          className="relative rounded-2xl p-px"
          style={{
            background: 'linear-gradient(135deg, #C9A96E 0%, #E8D5A3 25%, #C9A96E 50%, #B8960C 75%, #C9A96E 100%)',
            boxShadow: '0 28px 70px rgba(107,30,46,0.15), 0 8px 24px rgba(0,0,0,0.1)',
          }}
        >
          {/* Inner card */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ background: 'linear-gradient(170deg, #2A0A12 0%, #3D1020 50%, #2A0A12 100%)' }}
          >
            {/* Diploma border overlay */}
            <DiplomaBorder />

            {/* Subtle texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(201,169,110,0.5) 3px, rgba(201,169,110,0.5) 4px)',
              }}
            />

            <div className="relative px-10 sm:px-16 py-14 sm:py-16">

              {/* Header */}
              <div className="text-center mb-8">
                {/* Grad cap */}
                <div className="mb-4">
                  <GradCapIcon />
                </div>

                <p
                  className="text-xs tracking-[0.45em] uppercase mb-3"
                  style={{ color: '#C9A96E', fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 500 }}
                >
                  Class of {year || new Date().getFullYear()}
                </p>

                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    color: '#F5EDD8',
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  {title}
                </h1>

                <AcademicDivider />
              </div>

              {/* Honoree */}
              <div className="text-center mb-8">
                <p
                  className="text-xs tracking-[0.35em] uppercase mb-2"
                  style={{ color: 'rgba(201,169,110,0.7)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                >
                  In Honor of
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-3"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    color: '#F5EDD8',
                  }}
                >
                  {hostName}
                </h2>
                {/* Laurel wreath */}
                <LaurelWreath />
              </div>

              {/* Details card */}
              <div
                className="rounded-xl p-6 sm:p-8 mb-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(201,169,110,0.08) 0%, rgba(201,169,110,0.14) 100%)',
                  border: '1px solid rgba(201,169,110,0.25)',
                }}
              >
                {/* Date */}
                <div className="text-center mb-6">
                  <p
                    className="text-xs tracking-[0.3em] uppercase mb-2"
                    style={{ color: '#C9A96E', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                  >
                    Ceremony Date
                  </p>
                  <p
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ color: 'rgba(245,237,216,0.45)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                  >
                    {weekday}
                  </p>
                  <div className="flex items-baseline justify-center gap-3">
                    <span
                      className="text-5xl sm:text-6xl font-bold leading-none"
                      style={{
                        fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                        color: '#F5EDD8',
                      }}
                    >
                      {day}
                    </span>
                    <div className="flex flex-col items-start">
                      <span
                        className="text-lg font-semibold leading-tight"
                        style={{
                          fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                          color: '#C9A96E',
                        }}
                      >
                        {month}
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: 'rgba(245,237,216,0.45)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                      >
                        {year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4))' }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#C9A96E', opacity: 0.7 }} />
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(270deg, transparent, rgba(201,169,110,0.4))' }} />
                </div>

                {/* Time & Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.2), rgba(201,169,110,0.35))' }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="#C9A96E" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#C9A96E', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>Time</p>
                    <p className="text-base font-semibold" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)', color: '#F5EDD8' }}>
                      {formattedTime}
                    </p>
                  </div>

                  <div className="text-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.2), rgba(201,169,110,0.35))' }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="#C9A96E" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#C9A96E', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>Venue</p>
                    <p className="text-sm font-semibold leading-snug" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)', color: '#F5EDD8' }}>
                      {location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              {message && (
                <div className="text-center mb-8 px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4))' }} />
                    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="#C9A96E" opacity="0.8">
                      <path d="M10 1 L11.5 7 L18 7 L12.5 11 L14.5 17 L10 13.5 L5.5 17 L7.5 11 L2 7 L8.5 7 Z" />
                    </svg>
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(270deg, transparent, rgba(201,169,110,0.4))' }} />
                  </div>
                  <p
                    className="text-base sm:text-lg italic leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                      color: 'rgba(245,237,216,0.8)',
                    }}
                  >
                    &ldquo;{message}&rdquo;
                  </p>
                </div>
              )}

              {/* Bottom ornament */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5))' }} />
                <svg viewBox="0 0 16 16" className="w-3 h-3" fill="#C9A96E" opacity="0.7">
                  <path d="M8 1 L9 6 L14 6 L10 9 L11.5 14 L8 11 L4.5 14 L6 9 L2 6 L7 6 Z" />
                </svg>
                <div className="h-px w-8" style={{ backgroundColor: '#C9A96E', opacity: 0.4 }} />
                <svg viewBox="0 0 16 16" className="w-3 h-3" fill="#C9A96E" opacity="0.7">
                  <path d="M8 1 L9 6 L14 6 L10 9 L11.5 14 L8 11 L4.5 14 L6 9 L2 6 L7 6 Z" />
                </svg>
                <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(270deg, transparent, rgba(201,169,110,0.5))' }} />
              </div>

            </div>
          </div>
        </div>

        {/* Footer watermark */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4))' }} />
            <p
              className="text-xs tracking-[0.35em] uppercase"
              style={{ color: 'rgba(107,30,46,0.5)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
            >
              Created with InviteMaker
            </p>
            <div className="h-px w-12" style={{ background: 'linear-gradient(270deg, transparent, rgba(201,169,110,0.4))' }} />
          </div>
        </div>

      </div>
    </div>
  );
}
