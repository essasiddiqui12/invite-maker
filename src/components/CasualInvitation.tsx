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

// Confetti dots and geometric shapes scattered around
function ConfettiField() {
  return (
    <svg viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      {/* Coral dots */}
      <circle cx="40" cy="60" r="7" fill="#FF6B6B" opacity="0.25" />
      <circle cx="560" cy="80" r="5" fill="#FF6B6B" opacity="0.2" />
      <circle cx="25" cy="300" r="6" fill="#FF6B6B" opacity="0.2" />
      <circle cx="575" cy="350" r="8" fill="#FF6B6B" opacity="0.18" />
      <circle cx="50" cy="600" r="5" fill="#FF6B6B" opacity="0.2" />
      <circle cx="555" cy="620" r="7" fill="#FF6B6B" opacity="0.18" />
      {/* Teal dots */}
      <circle cx="80" cy="140" r="6" fill="#4ECDC4" opacity="0.25" />
      <circle cx="520" cy="160" r="8" fill="#4ECDC4" opacity="0.2" />
      <circle cx="30" cy="450" r="7" fill="#4ECDC4" opacity="0.2" />
      <circle cx="570" cy="500" r="5" fill="#4ECDC4" opacity="0.2" />
      <circle cx="80" cy="720" r="6" fill="#4ECDC4" opacity="0.18" />
      <circle cx="520" cy="740" r="8" fill="#4ECDC4" opacity="0.15" />
      {/* Yellow dots */}
      <circle cx="55" cy="220" r="5" fill="#FFE66D" opacity="0.35" />
      <circle cx="545" cy="240" r="7" fill="#FFE66D" opacity="0.3" />
      <circle cx="40" cy="520" r="6" fill="#FFE66D" opacity="0.28" />
      <circle cx="560" cy="560" r="5" fill="#FFE66D" opacity="0.25" />
      {/* Triangles */}
      <path d="M550 120 L560 140 L540 140 Z" fill="#4ECDC4" opacity="0.25" />
      <path d="M35 380 L45 400 L25 400 Z" fill="#FF6B6B" opacity="0.22" />
      <path d="M565 680 L575 700 L555 700 Z" fill="#FFE66D" opacity="0.3" />
      <path d="M30 680 L40 700 L20 700 Z" fill="#4ECDC4" opacity="0.22" />
      {/* Zigzag accent top */}
      <path d="M0 30 L20 10 L40 30 L60 10 L80 30 L100 10 L120 30 L140 10 L160 30"
        stroke="#FF6B6B" strokeWidth="2" fill="none" opacity="0.15" strokeLinecap="round" strokeLinejoin="round" />
      {/* Zigzag accent bottom */}
      <path d="M440 770 L460 750 L480 770 L500 750 L520 770 L540 750 L560 770 L580 750 L600 770"
        stroke="#4ECDC4" strokeWidth="2" fill="none" opacity="0.15" strokeLinecap="round" strokeLinejoin="round" />
      {/* Small squares */}
      <rect x="555" cy="400" x1="555" y="400" width="8" height="8" rx="1" fill="#FFE66D" opacity="0.3" transform="rotate(20 555 400)" />
      <rect x="35" y="160" width="8" height="8" rx="1" fill="#FF6B6B" opacity="0.25" transform="rotate(-15 35 160)" />
      <rect x="560" y="300" width="7" height="7" rx="1" fill="#4ECDC4" opacity="0.25" transform="rotate(30 560 300)" />
    </svg>
  );
}

// Bold geometric top banner
function GeometricBanner() {
  return (
    <svg viewBox="0 0 600 80" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full" aria-hidden="true">
      <rect width="600" height="80" fill="#FF6B6B" opacity="0.08" />
      {/* Diagonal stripes */}
      <path d="M0 0 L80 80 L60 80 L0 20 Z" fill="#FF6B6B" opacity="0.1" />
      <path d="M100 0 L180 80 L160 80 L80 0 Z" fill="#4ECDC4" opacity="0.08" />
      <path d="M200 0 L280 80 L260 80 L180 0 Z" fill="#FFE66D" opacity="0.1" />
      <path d="M300 0 L380 80 L360 80 L280 0 Z" fill="#FF6B6B" opacity="0.08" />
      <path d="M400 0 L480 80 L460 80 L380 0 Z" fill="#4ECDC4" opacity="0.08" />
      <path d="M500 0 L580 80 L560 80 L480 0 Z" fill="#FFE66D" opacity="0.1" />
    </svg>
  );
}

// Playful divider with dots
function PlayfulDivider() {
  return (
    <svg viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
      <circle cx="10" cy="10" r="4" fill="#FF6B6B" opacity="0.6" />
      <circle cx="30" cy="10" r="3" fill="#FFE66D" opacity="0.7" />
      <circle cx="48" cy="10" r="4" fill="#4ECDC4" opacity="0.6" />
      <line x1="60" y1="10" x2="120" y2="10" stroke="#FF6B6B" strokeWidth="1.5" opacity="0.25" />
      <circle cx="150" cy="10" r="7" fill="#FF6B6B" opacity="0.5" />
      <line x1="180" y1="10" x2="240" y2="10" stroke="#4ECDC4" strokeWidth="1.5" opacity="0.25" />
      <circle cx="252" cy="10" r="4" fill="#4ECDC4" opacity="0.6" />
      <circle cx="270" cy="10" r="3" fill="#FFE66D" opacity="0.7" />
      <circle cx="290" cy="10" r="4" fill="#FF6B6B" opacity="0.6" />
    </svg>
  );
}

// Corner geometric accent
function CornerAccent({ className, color }: { className?: string; color: string }) {
  return (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <circle cx="5" cy="5" r="5" fill={color} opacity="0.4" />
      <circle cx="18" cy="5" r="3.5" fill={color} opacity="0.3" />
      <circle cx="5" cy="18" r="3.5" fill={color} opacity="0.3" />
      <circle cx="28" cy="5" r="2.5" fill={color} opacity="0.2" />
      <circle cx="5" cy="28" r="2.5" fill={color} opacity="0.2" />
    </svg>
  );
}

export default function CasualInvitation({ title, hostName, date, time, location, message }: Props) {
  const { weekday, day, month, year } = formatDate(date);
  const formattedTime = formatTime(time);

  return (
    <div
      id="invitation-content"
      className="min-h-screen flex items-center justify-center py-16 px-4 pt-14"
      style={{ backgroundColor: '#F8FFFE' }}
    >
      <div className="w-full max-w-2xl">

        {/* Outer frame */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0 28px 70px rgba(78,205,196,0.15), 0 8px 24px rgba(255,107,107,0.1)',
            border: '2px solid rgba(78,205,196,0.2)',
          }}
        >
          <ConfettiField />

          {/* Top geometric banner */}
          <div className="relative overflow-hidden" style={{ height: '80px' }}>
            <GeometricBanner />
            {/* Coral top bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: '#FF6B6B' }} />
          </div>

          {/* Corner accents */}
          <div className="absolute top-20 left-4">
            <CornerAccent className="w-10 h-10" color="#FF6B6B" />
          </div>
          <div className="absolute top-20 right-4" style={{ transform: 'scaleX(-1)' }}>
            <CornerAccent className="w-10 h-10" color="#4ECDC4" />
          </div>
          <div className="absolute bottom-4 left-4" style={{ transform: 'rotate(180deg) scaleX(-1)' }}>
            <CornerAccent className="w-10 h-10" color="#4ECDC4" />
          </div>
          <div className="absolute bottom-4 right-4" style={{ transform: 'rotate(180deg)' }}>
            <CornerAccent className="w-10 h-10" color="#FF6B6B" />
          </div>

          <div className="relative px-8 sm:px-14 py-10 sm:py-12">

            {/* Header */}
            <div className="text-center mb-8">
              <div
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,107,107,0.12), rgba(78,205,196,0.12))',
                  border: '1.5px solid rgba(255,107,107,0.3)',
                }}
              >
                <span style={{ color: '#FF6B6B', fontFamily: 'var(--font-inter, Inter, sans-serif)', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700 }}>
                  🎉 You&apos;re Invited!
                </span>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                style={{
                  fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                  color: '#2C3E50',
                }}
              >
                {title}
              </h1>

              <PlayfulDivider />
            </div>

            {/* Host name */}
            <div className="text-center mb-10">
              <p
                className="text-xs tracking-[0.35em] uppercase mb-2"
                style={{ color: '#4ECDC4', fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 600 }}
              >
                Hosted by
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-3"
                style={{
                  fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                  color: '#2C3E50',
                }}
              >
                {hostName}
              </h2>
              {/* Teal underline */}
              <div
                className="h-1 w-24 mx-auto rounded-full"
                style={{ background: 'linear-gradient(90deg, #FF6B6B, #4ECDC4)' }}
              />
            </div>

            {/* Details card */}
            <div
              className="rounded-2xl p-6 sm:p-8 mb-8"
              style={{
                background: 'linear-gradient(135deg, rgba(255,107,107,0.05) 0%, rgba(78,205,196,0.07) 100%)',
                border: '1.5px solid rgba(78,205,196,0.2)',
              }}
            >
              {/* Date */}
              <div className="text-center mb-6">
                <p
                  className="text-xs tracking-[0.3em] uppercase mb-2"
                  style={{ color: '#FF6B6B', fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 600 }}
                >
                  Date
                </p>
                <p
                  className="text-xs tracking-widest uppercase mb-1"
                  style={{ color: 'rgba(44,62,80,0.4)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                >
                  {weekday}
                </p>
                <div className="flex items-baseline justify-center gap-3">
                  <span
                    className="text-5xl sm:text-6xl font-bold leading-none"
                    style={{
                      fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                      color: '#2C3E50',
                    }}
                  >
                    {day}
                  </span>
                  <div className="flex flex-col items-start">
                    <span
                      className="text-lg font-semibold leading-tight"
                      style={{
                        fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                        color: '#FF6B6B',
                      }}
                    >
                      {month}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: 'rgba(44,62,80,0.45)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                    >
                      {year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,107,0.35))' }} />
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFE66D' }} />
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(270deg, transparent, rgba(78,205,196,0.35))' }} />
              </div>

              {/* Time & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{ background: 'rgba(255,107,107,0.12)' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="#FF6B6B" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#FF6B6B', fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 600 }}>Time</p>
                  <p className="text-base font-semibold" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)', color: '#2C3E50' }}>
                    {formattedTime}
                  </p>
                </div>

                <div className="text-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{ background: 'rgba(78,205,196,0.12)' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="#4ECDC4" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#4ECDC4', fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 600 }}>Venue</p>
                  <p className="text-sm font-semibold leading-snug" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)', color: '#2C3E50' }}>
                    {location}
                  </p>
                </div>
              </div>
            </div>

            {/* Message */}
            {message && (
              <div className="text-center mb-8 px-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,107,0.35))' }} />
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFE66D' }} />
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(270deg, transparent, rgba(78,205,196,0.35))' }} />
                </div>
                <p
                  className="text-base sm:text-lg italic leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    color: 'rgba(44,62,80,0.75)',
                  }}
                >
                  &ldquo;{message}&rdquo;
                </p>
              </div>
            )}

            {/* Bottom ornament */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF6B6B', opacity: 0.5 }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFE66D', opacity: 0.6 }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4ECDC4', opacity: 0.5 }} />
              <div className="h-px w-8" style={{ backgroundColor: '#FF6B6B', opacity: 0.25 }} />
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FF6B6B', opacity: 0.3 }} />
              <div className="h-px w-8" style={{ backgroundColor: '#4ECDC4', opacity: 0.25 }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4ECDC4', opacity: 0.5 }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFE66D', opacity: 0.6 }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF6B6B', opacity: 0.5 }} />
            </div>

          </div>

          {/* Bottom teal bar */}
          <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #FF6B6B, #4ECDC4, #FFE66D)' }} />
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,107,0.35))' }} />
            <p
              className="text-xs tracking-[0.35em] uppercase"
              style={{ color: 'rgba(78,205,196,0.6)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
            >
              Created with InviteMaker
            </p>
            <div className="h-px w-12" style={{ background: 'linear-gradient(270deg, transparent, rgba(78,205,196,0.35))' }} />
          </div>
        </div>

      </div>
    </div>
  );
}
