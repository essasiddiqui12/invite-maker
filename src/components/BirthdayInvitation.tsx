'use client';

interface BirthdayInvitationProps {
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

// Confetti burst SVG — scattered festive shapes
function ConfettiBurst() {
  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      {/* Gold confetti pieces */}
      <rect x="30" y="20" width="8" height="8" rx="1" fill="#D4AF37" opacity="0.7" transform="rotate(25 30 20)" />
      <rect x="80" y="10" width="6" height="6" rx="1" fill="#E8C547" opacity="0.6" transform="rotate(-15 80 10)" />
      <rect x="340" y="15" width="8" height="8" rx="1" fill="#D4AF37" opacity="0.7" transform="rotate(40 340 15)" />
      <rect x="370" y="35" width="5" height="5" rx="1" fill="#F0D060" opacity="0.5" transform="rotate(-30 370 35)" />
      <rect x="15" y="80" width="7" height="7" rx="1" fill="#E8C547" opacity="0.6" transform="rotate(55 15 80)" />
      <rect x="385" y="90" width="6" height="6" rx="1" fill="#D4AF37" opacity="0.7" transform="rotate(-20 385 90)" />
      <rect x="50" y="160" width="8" height="8" rx="1" fill="#F0D060" opacity="0.5" transform="rotate(35 50 160)" />
      <rect x="360" y="155" width="7" height="7" rx="1" fill="#E8C547" opacity="0.6" transform="rotate(-45 360 155)" />
      {/* Rose gold confetti */}
      <circle cx="120" cy="18" r="5" fill="#E8A598" opacity="0.6" />
      <circle cx="280" cy="12" r="4" fill="#D4847A" opacity="0.5" />
      <circle cx="25" cy="130" r="5" fill="#E8A598" opacity="0.6" />
      <circle cx="375" cy="130" r="4" fill="#D4847A" opacity="0.5" />
      <circle cx="160" cy="185" r="5" fill="#E8A598" opacity="0.5" />
      <circle cx="240" cy="188" r="4" fill="#D4847A" opacity="0.4" />
      {/* Star confetti */}
      <path d="M200 8 L201.5 13 L207 13 L202.5 16 L204 21 L200 18 L196 21 L197.5 16 L193 13 L198.5 13 Z" fill="#D4AF37" opacity="0.8" />
      <path d="M60 50 L61 53.5 L65 53.5 L62 55.5 L63 59 L60 57 L57 59 L58 55.5 L55 53.5 L59 53.5 Z" fill="#E8A598" opacity="0.7" />
      <path d="M340 55 L341 58.5 L345 58.5 L342 60.5 L343 64 L340 62 L337 64 L338 60.5 L335 58.5 L339 58.5 Z" fill="#D4AF37" opacity="0.7" />
      <path d="M100 175 L101 178.5 L105 178.5 L102 180.5 L103 184 L100 182 L97 184 L98 180.5 L95 178.5 L99 178.5 Z" fill="#E8A598" opacity="0.6" />
      <path d="M300 178 L301 181.5 L305 181.5 L302 183.5 L303 187 L300 185 L297 187 L298 183.5 L295 181.5 L299 181.5 Z" fill="#D4AF37" opacity="0.6" />
      {/* Streamers */}
      <path d="M10 10 Q30 40 20 70 Q10 100 30 130" stroke="#D4AF37" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
      <path d="M390 10 Q370 40 380 70 Q390 100 370 130" stroke="#E8A598" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
      <path d="M150 5 Q160 25 155 45" stroke="#E8C547" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M250 5 Q240 25 245 45" stroke="#D4847A" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

// Decorative star divider
function StarDivider() {
  return (
    <svg viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
      <line x1="0" y1="10" x2="110" y2="10" stroke="#D4AF37" strokeWidth="0.6" opacity="0.5" />
      <circle cx="125" cy="10" r="3" fill="#E8A598" opacity="0.8" />
      <path d="M150 4 L151.5 8.5 L156 8.5 L152.5 11 L153.5 15.5 L150 13 L146.5 15.5 L147.5 11 L144 8.5 L148.5 8.5 Z" fill="#D4AF37" opacity="0.9" />
      <circle cx="175" cy="10" r="3" fill="#E8A598" opacity="0.8" />
      <line x1="190" y1="10" x2="300" y2="10" stroke="#D4AF37" strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}

// Balloon SVG ornament
function BalloonOrnament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <ellipse cx="20" cy="22" rx="14" ry="18" fill="#D4AF37" opacity="0.25" />
      <ellipse cx="20" cy="22" rx="14" ry="18" stroke="#D4AF37" strokeWidth="1" opacity="0.5" fill="none" />
      <ellipse cx="15" cy="16" rx="4" ry="5" fill="white" opacity="0.2" />
      <path d="M20 40 Q18 45 20 50 Q22 55 20 58" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M20 40 L18 42 L22 42 Z" fill="#D4AF37" opacity="0.4" />
    </svg>
  );
}

// Corner flourish
function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M4 4 L4 30 M4 4 L30 4" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M10 10 L10 22 M10 10 L22 10" stroke="#E8A598" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
      <circle cx="4" cy="4" r="2.5" fill="#D4AF37" opacity="0.7" />
      <circle cx="16" cy="16" r="1.5" fill="#E8A598" opacity="0.5" />
      <path d="M30 4 Q34 4 34 8" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M4 30 Q4 34 8 34" stroke="#D4AF37" strokeWidth="0.8" fill="none" opacity="0.4" />
    </svg>
  );
}

export default function BirthdayInvitation({
  title,
  hostName,
  date,
  time,
  location,
  message,
}: BirthdayInvitationProps) {
  const { weekday, day, month, year } = formatDate(date);
  const formattedTime = formatTime(time);

  return (
    <div
      id="invitation-content"
      className="min-h-screen flex items-center justify-center py-16 px-4 pt-14"
      style={{ background: 'linear-gradient(150deg, #0D1B3E 0%, #0A1628 40%, #12203A 100%)' }}
    >
      <div className="w-full max-w-2xl">

        {/* Outer gold frame */}
        <div
          className="relative rounded-3xl p-px"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #E8C547 25%, #F0D060 50%, #D4AF37 75%, #B8960C 100%)',
            boxShadow: '0 32px 80px rgba(212,175,55,0.25), 0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          {/* Inner card */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #0F1F45 0%, #0A1628 50%, #0D1B3E 100%)' }}
          >
            {/* Confetti overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ height: '200px' }}>
              <ConfettiBurst />
            </div>

            {/* Corner ornaments */}
            <div className="absolute top-4 left-4">
              <CornerFlourish className="w-12 h-12" />
            </div>
            <div className="absolute top-4 right-4 rotate-90">
              <CornerFlourish className="w-12 h-12" />
            </div>
            <div className="absolute bottom-4 left-4 -rotate-90">
              <CornerFlourish className="w-12 h-12" />
            </div>
            <div className="absolute bottom-4 right-4 rotate-180">
              <CornerFlourish className="w-12 h-12" />
            </div>

            {/* Balloon accents */}
            <div className="absolute top-8 left-8 opacity-60">
              <BalloonOrnament className="w-8 h-12" />
            </div>
            <div className="absolute top-8 right-8 opacity-60" style={{ transform: 'scaleX(-1)' }}>
              <BalloonOrnament className="w-8 h-12" />
            </div>

            <div className="relative px-8 sm:px-14 py-14 sm:py-16">

              {/* Header tag */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(232,165,152,0.15))',
                    border: '1px solid rgba(212,175,55,0.35)',
                  }}
                >
                  <span style={{ color: '#D4AF37', fontFamily: 'var(--font-inter, Inter, sans-serif)', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 600 }}>
                    ✦ You&apos;re Invited ✦
                  </span>
                </div>

                {/* Title */}
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-3"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F0D060 40%, #E8A598 70%, #D4847A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {title}
                </h1>

                <StarDivider />
              </div>

              {/* Host name */}
              <div className="text-center mb-10">
                <p
                  className="text-xs tracking-[0.35em] uppercase mb-2"
                  style={{ color: 'rgba(212,175,55,0.7)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                >
                  Celebrating
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    color: '#F5F0E8',
                  }}
                >
                  {hostName}
                </h2>
                {/* Underline flourish */}
                <svg viewBox="0 0 200 10" className="w-48 mx-auto mt-2 opacity-50" fill="none">
                  <path d="M10 5 Q100 10 190 5" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Details card */}
              <div
                className="rounded-2xl p-6 sm:p-8 mb-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(232,165,152,0.08) 100%)',
                  border: '1px solid rgba(212,175,55,0.2)',
                }}
              >
                {/* Date */}
                <div className="text-center mb-6">
                  <p
                    className="text-xs tracking-[0.3em] uppercase mb-2"
                    style={{ color: '#D4AF37', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                  >
                    Date
                  </p>
                  <p
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ color: 'rgba(245,240,232,0.5)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                  >
                    {weekday}
                  </p>
                  <div className="flex items-baseline justify-center gap-3">
                    <span
                      className="text-5xl sm:text-6xl font-bold leading-none"
                      style={{
                        fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                        color: '#F5F0E8',
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
                        style={{ color: 'rgba(245,240,232,0.5)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                      >
                        {year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4))' }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#E8A598', opacity: 0.8 }} />
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(270deg, transparent, rgba(212,175,55,0.4))' }} />
                </div>

                {/* Time & Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.35))' }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="#D4AF37" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#D4AF37', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>Time</p>
                    <p className="text-base font-semibold" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)', color: '#F5F0E8' }}>
                      {formattedTime}
                    </p>
                  </div>

                  <div className="text-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{ background: 'linear-gradient(135deg, rgba(232,165,152,0.2), rgba(232,165,152,0.35))' }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="#E8A598" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#E8A598', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>Venue</p>
                    <p className="text-sm font-semibold leading-snug" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)', color: '#F5F0E8' }}>
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
                    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="#D4AF37" opacity="0.8">
                      <path d="M10 1 L11.5 7 L18 7 L12.5 11 L14.5 17 L10 13.5 L5.5 17 L7.5 11 L2 7 L8.5 7 Z" />
                    </svg>
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(270deg, transparent, rgba(212,175,55,0.4))' }} />
                  </div>
                  <p
                    className="text-base sm:text-lg italic leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                      color: 'rgba(245,240,232,0.8)',
                    }}
                  >
                    &ldquo;{message}&rdquo;
                  </p>
                </div>
              )}

              {/* Bottom ornament */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)', opacity: 0.5 }} />
                <span style={{ color: '#D4AF37', fontSize: '0.7rem', opacity: 0.8 }}>✦</span>
                <div className="h-px w-8" style={{ backgroundColor: '#E8A598', opacity: 0.4 }} />
                <span style={{ color: '#E8A598', fontSize: '0.7rem', opacity: 0.8 }}>✦</span>
                <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(270deg, transparent, #D4AF37)', opacity: 0.5 }} />
              </div>

            </div>
          </div>
        </div>

        {/* Footer watermark */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4))' }} />
            <p
              className="text-xs tracking-[0.35em] uppercase"
              style={{ color: 'rgba(212,175,55,0.5)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
            >
              Created with InviteMaker
            </p>
            <div className="h-px w-12" style={{ background: 'linear-gradient(270deg, transparent, rgba(212,175,55,0.4))' }} />
          </div>
        </div>

      </div>
    </div>
  );
}
