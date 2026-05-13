'use client';

interface BabyShowerInvitationProps {
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

// Watercolor-style soft petal/circle background
function WatercolorBackground() {
  return (
    <svg
      viewBox="0 0 600 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Large soft blush circles */}
      <circle cx="80" cy="120" r="90" fill="#F2C4CE" opacity="0.12" />
      <circle cx="520" cy="100" r="110" fill="#E8B4C0" opacity="0.10" />
      <circle cx="50" cy="650" r="100" fill="#F2C4CE" opacity="0.10" />
      <circle cx="560" cy="700" r="80" fill="#E8B4C0" opacity="0.12" />
      <circle cx="300" cy="400" r="200" fill="#F9E8EC" opacity="0.08" />
      {/* Sage green soft shapes */}
      <ellipse cx="150" cy="300" rx="60" ry="80" fill="#8FAF8A" opacity="0.07" transform="rotate(-20 150 300)" />
      <ellipse cx="450" cy="500" rx="70" ry="50" fill="#7A9E75" opacity="0.07" transform="rotate(15 450 500)" />
      <ellipse cx="300" cy="750" rx="120" ry="50" fill="#8FAF8A" opacity="0.06" />
      {/* Petal shapes */}
      <ellipse cx="100" cy="200" rx="20" ry="35" fill="#F2C4CE" opacity="0.25" transform="rotate(-30 100 200)" />
      <ellipse cx="120" cy="200" rx="20" ry="35" fill="#F2C4CE" opacity="0.20" transform="rotate(30 120 200)" />
      <ellipse cx="500" cy="180" rx="20" ry="35" fill="#E8B4C0" opacity="0.25" transform="rotate(20 500 180)" />
      <ellipse cx="520" cy="180" rx="20" ry="35" fill="#E8B4C0" opacity="0.20" transform="rotate(-20 520 180)" />
      <ellipse cx="80" cy="580" rx="18" ry="30" fill="#F2C4CE" opacity="0.20" transform="rotate(-15 80 580)" />
      <ellipse cx="520" cy="600" rx="18" ry="30" fill="#E8B4C0" opacity="0.20" transform="rotate(15 520 600)" />
    </svg>
  );
}

// Delicate floral divider
function FloralDivider() {
  return (
    <svg viewBox="0 0 320 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
      <line x1="0" y1="14" x2="110" y2="14" stroke="#D4A0B0" strokeWidth="0.6" opacity="0.6" />
      {/* Small flower center */}
      <circle cx="160" cy="14" r="4" fill="#F2C4CE" opacity="0.9" />
      <circle cx="160" cy="14" r="2" fill="#D4A0B0" opacity="0.8" />
      {/* Petals */}
      <ellipse cx="160" cy="7" rx="2.5" ry="4" fill="#F2C4CE" opacity="0.7" />
      <ellipse cx="160" cy="21" rx="2.5" ry="4" fill="#F2C4CE" opacity="0.7" />
      <ellipse cx="153" cy="14" rx="4" ry="2.5" fill="#F2C4CE" opacity="0.7" />
      <ellipse cx="167" cy="14" rx="4" ry="2.5" fill="#F2C4CE" opacity="0.7" />
      <ellipse cx="155" cy="9" rx="2.5" ry="4" fill="#E8B4C0" opacity="0.5" transform="rotate(-45 155 9)" />
      <ellipse cx="165" cy="9" rx="2.5" ry="4" fill="#E8B4C0" opacity="0.5" transform="rotate(45 165 9)" />
      <ellipse cx="155" cy="19" rx="2.5" ry="4" fill="#E8B4C0" opacity="0.5" transform="rotate(45 155 19)" />
      <ellipse cx="165" cy="19" rx="2.5" ry="4" fill="#E8B4C0" opacity="0.5" transform="rotate(-45 165 19)" />
      {/* Small leaf accents */}
      <ellipse cx="135" cy="14" rx="6" ry="3" fill="#8FAF8A" opacity="0.4" transform="rotate(-20 135 14)" />
      <ellipse cx="185" cy="14" rx="6" ry="3" fill="#8FAF8A" opacity="0.4" transform="rotate(20 185 14)" />
      <line x1="210" y1="14" x2="320" y2="14" stroke="#D4A0B0" strokeWidth="0.6" opacity="0.6" />
    </svg>
  );
}

// Soft corner wreath
function CornerWreath({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Branch */}
      <path d="M5 5 Q20 20 35 35" stroke="#8FAF8A" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
      {/* Leaves */}
      <ellipse cx="12" cy="12" rx="5" ry="3" fill="#8FAF8A" opacity="0.4" transform="rotate(-45 12 12)" />
      <ellipse cx="20" cy="20" rx="5" ry="3" fill="#7A9E75" opacity="0.4" transform="rotate(-45 20 20)" />
      <ellipse cx="28" cy="28" rx="5" ry="3" fill="#8FAF8A" opacity="0.4" transform="rotate(-45 28 28)" />
      {/* Small flowers */}
      <circle cx="8" cy="18" r="3" fill="#F2C4CE" opacity="0.6" />
      <circle cx="8" cy="18" r="1.5" fill="#D4A0B0" opacity="0.7" />
      <circle cx="22" cy="8" r="3" fill="#F2C4CE" opacity="0.6" />
      <circle cx="22" cy="8" r="1.5" fill="#D4A0B0" opacity="0.7" />
      <circle cx="35" cy="15" r="2.5" fill="#E8B4C0" opacity="0.5" />
      <circle cx="15" cy="35" r="2.5" fill="#E8B4C0" opacity="0.5" />
    </svg>
  );
}

// Baby star / sparkle
function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M10 2 L11 8 L17 8 L12.5 11.5 L14 18 L10 14.5 L6 18 L7.5 11.5 L3 8 L9 8 Z" fill="#D4A0B0" opacity="0.8" />
    </svg>
  );
}

export default function BabyShowerInvitation({
  title,
  hostName,
  date,
  time,
  location,
  message,
}: BabyShowerInvitationProps) {
  const { weekday, day, month, year } = formatDate(date);
  const formattedTime = formatTime(time);

  return (
    <div
      id="invitation-content"
      className="min-h-screen flex items-center justify-center py-16 px-4 pt-14"
      style={{ background: 'linear-gradient(160deg, #FDF0F3 0%, #FAF5F8 40%, #F5F8F2 100%)' }}
    >
      <div className="w-full max-w-2xl">

        {/* Outer soft frame */}
        <div
          className="relative rounded-3xl p-px"
          style={{
            background: 'linear-gradient(135deg, #F2C4CE 0%, #D4A0B0 30%, #E8D5DC 50%, #8FAF8A 70%, #D4A0B0 100%)',
            boxShadow: '0 24px 60px rgba(212,160,176,0.2), 0 8px 24px rgba(0,0,0,0.06)',
          }}
        >
          {/* Inner card */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #FEFBFC 0%, #FDF8FA 50%, #F8FCF6 100%)' }}
          >
            {/* Watercolor background */}
            <WatercolorBackground />

            {/* Corner wreaths */}
            <div className="absolute top-4 left-4">
              <CornerWreath className="w-14 h-14" />
            </div>
            <div className="absolute top-4 right-4" style={{ transform: 'scaleX(-1)' }}>
              <CornerWreath className="w-14 h-14" />
            </div>
            <div className="absolute bottom-4 left-4" style={{ transform: 'scaleY(-1)' }}>
              <CornerWreath className="w-14 h-14" />
            </div>
            <div className="absolute bottom-4 right-4" style={{ transform: 'scale(-1,-1)' }}>
              <CornerWreath className="w-14 h-14" />
            </div>

            <div className="relative px-8 sm:px-14 py-14 sm:py-16">

              {/* Header */}
              <div className="text-center mb-8">
                {/* Sparkle row */}
                <div className="flex items-center justify-center gap-2 mb-5">
                  <Sparkle className="w-3 h-3 opacity-60" />
                  <Sparkle className="w-4 h-4 opacity-80" />
                  <Sparkle className="w-3 h-3 opacity-60" />
                </div>

                <p
                  className="text-xs tracking-[0.4em] uppercase mb-3"
                  style={{ color: '#B07A8A', fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 500 }}
                >
                  You&apos;re Invited
                </p>

                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    color: '#5C3A4A',
                  }}
                >
                  {title}
                </h1>

                <FloralDivider />
              </div>

              {/* Host name */}
              <div className="text-center mb-10">
                <p
                  className="text-xs tracking-[0.35em] uppercase mb-2"
                  style={{ color: '#8FAF8A', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                >
                  Honoring
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-1"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    color: '#5C3A4A',
                  }}
                >
                  {hostName}
                </h2>
                {/* Soft underline */}
                <svg viewBox="0 0 200 10" className="w-44 mx-auto mt-2" fill="none">
                  <path d="M10 5 Q100 10 190 5" stroke="#D4A0B0" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                </svg>
              </div>

              {/* Details card */}
              <div
                className="rounded-2xl p-6 sm:p-8 mb-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(242,196,206,0.12) 0%, rgba(143,175,138,0.10) 100%)',
                  border: '1px solid rgba(212,160,176,0.3)',
                }}
              >
                {/* Date */}
                <div className="text-center mb-6">
                  <p
                    className="text-xs tracking-[0.3em] uppercase mb-2"
                    style={{ color: '#D4A0B0', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                  >
                    Date
                  </p>
                  <p
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ color: 'rgba(92,58,74,0.5)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                  >
                    {weekday}
                  </p>
                  <div className="flex items-baseline justify-center gap-3">
                    <span
                      className="text-5xl sm:text-6xl font-bold leading-none"
                      style={{
                        fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                        color: '#5C3A4A',
                      }}
                    >
                      {day}
                    </span>
                    <div className="flex flex-col items-start">
                      <span
                        className="text-lg font-semibold leading-tight"
                        style={{
                          fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                          color: '#D4A0B0',
                        }}
                      >
                        {month}
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: 'rgba(92,58,74,0.5)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                      >
                        {year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,160,176,0.5))' }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#8FAF8A', opacity: 0.7 }} />
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(270deg, transparent, rgba(212,160,176,0.5))' }} />
                </div>

                {/* Time & Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{ background: 'linear-gradient(135deg, rgba(242,196,206,0.4), rgba(212,160,176,0.3))' }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="#B07A8A" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#D4A0B0', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>Time</p>
                    <p className="text-base font-semibold" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)', color: '#5C3A4A' }}>
                      {formattedTime}
                    </p>
                  </div>

                  <div className="text-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{ background: 'linear-gradient(135deg, rgba(143,175,138,0.3), rgba(122,158,117,0.25))' }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="#5A8A55" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#8FAF8A', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>Venue</p>
                    <p className="text-sm font-semibold leading-snug" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)', color: '#5C3A4A' }}>
                      {location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              {message && (
                <div className="text-center mb-8 px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,160,176,0.5))' }} />
                    <Sparkle className="w-4 h-4" />
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(270deg, transparent, rgba(212,160,176,0.5))' }} />
                  </div>
                  <p
                    className="text-base sm:text-lg italic leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                      color: '#7A5060',
                    }}
                  >
                    &ldquo;{message}&rdquo;
                  </p>
                </div>
              )}

              {/* Bottom ornament */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,160,176,0.5))' }} />
                <Sparkle className="w-3 h-3 opacity-70" />
                <div className="h-px w-8" style={{ backgroundColor: '#8FAF8A', opacity: 0.4 }} />
                <Sparkle className="w-3 h-3 opacity-70" />
                <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(270deg, transparent, rgba(212,160,176,0.5))' }} />
              </div>

            </div>
          </div>
        </div>

        {/* Footer watermark */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,160,176,0.4))' }} />
            <p
              className="text-xs tracking-[0.35em] uppercase"
              style={{ color: 'rgba(176,122,138,0.5)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
            >
              Created with InviteMaker
            </p>
            <div className="h-px w-12" style={{ background: 'linear-gradient(270deg, transparent, rgba(212,160,176,0.4))' }} />
          </div>
        </div>

      </div>
    </div>
  );
}
