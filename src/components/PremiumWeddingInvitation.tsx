'use client';

type WeddingInvitationProps = {
  title: string;
  brideName: string;
  groomName: string;
  date: string;
  time: string;
  location: string;
  message: string;
};

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

// ─── SVG Sub-components ───────────────────────────────────────────────────────

function CornerOrnament({ rotate }: { rotate: number }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 80, height: 80, transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      {/* L-bracket */}
      <path d="M6 6 L6 52 M6 6 L52 6" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" />
      {/* Inner L-bracket */}
      <path d="M12 12 L12 44 M12 12 L44 12" stroke="#E8D5A3" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      {/* Diamond at corner point */}
      <path d="M6 6 L10 2 L14 6 L10 10 Z" fill="#C9A96E" />
      {/* Curved flourish from vertical arm */}
      <path d="M6 52 Q8 62 16 66 Q22 68 26 64" stroke="#C9A96E" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.8" />
      {/* Curved flourish from horizontal arm */}
      <path d="M52 6 Q62 8 66 16 Q68 22 64 26" stroke="#C9A96E" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.8" />
      {/* Small leaf on vertical flourish */}
      <ellipse cx="21" cy="66" rx="5" ry="3" fill="#C9A96E" opacity="0.4" transform="rotate(-30 21 66)" />
      {/* Small leaf on horizontal flourish */}
      <ellipse cx="66" cy="21" rx="5" ry="3" fill="#C9A96E" opacity="0.4" transform="rotate(60 66 21)" />
      {/* 4-pointed star at inner end of vertical flourish */}
      <path d="M26 64 L27.5 61 L29 64 L27.5 67 Z M24.5 62.5 L27.5 61 L30.5 62.5 L27.5 64 Z" fill="#C9A96E" opacity="0.9" />
      {/* 4-pointed star at inner end of horizontal flourish */}
      <path d="M64 26 L61 27.5 L64 29 L67 27.5 Z M62.5 24.5 L61 27.5 L62.5 30.5 L64 27.5 Z" fill="#C9A96E" opacity="0.9" />
      {/* Dot accents along arms */}
      <circle cx="6" cy="28" r="1.5" fill="#E8D5A3" opacity="0.7" />
      <circle cx="28" cy="6" r="1.5" fill="#E8D5A3" opacity="0.7" />
    </svg>
  );
}

function OrnamentalBand() {
  return (
    <svg viewBox="0 0 500 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }} aria-hidden="true">
      {/* Main center line */}
      <line x1="0" y1="12" x2="500" y2="12" stroke="#C9A96E" strokeWidth="0.5" opacity="0.4" />
      {/* Repeating diamond-dot pattern */}
      {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450].map((x) => (
        <g key={x} transform={`translate(${x + 25}, 12)`}>
          <path d="M0 -4 L3 0 L0 4 L-3 0 Z" fill="#C9A96E" opacity="0.6" />
          <circle cx="0" cy="0" r="1" fill="#F0E0B0" opacity="0.9" />
        </g>
      ))}
      {/* Top and bottom accent lines */}
      <line x1="0" y1="4" x2="500" y2="4" stroke="#E8D5A3" strokeWidth="0.4" opacity="0.25" />
      <line x1="0" y1="20" x2="500" y2="20" stroke="#E8D5A3" strokeWidth="0.4" opacity="0.25" />
    </svg>
  );
}

function StarCluster() {
  return (
    <svg viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 80, height: 30 }} aria-hidden="true">
      {/* Large center star */}
      <path d="M40 2 L42 10 L50 10 L44 15 L46 23 L40 18 L34 23 L36 15 L30 10 L38 10 Z" fill="#C9A96E" opacity="0.85" />
      {/* Small left star */}
      <path d="M16 8 L17 12 L21 12 L18 14.5 L19 18.5 L16 16 L13 18.5 L14 14.5 L11 12 L15 12 Z" fill="#E8D5A3" opacity="0.7" />
      {/* Small right star */}
      <path d="M64 8 L65 12 L69 12 L66 14.5 L67 18.5 L64 16 L61 18.5 L62 14.5 L59 12 L63 12 Z" fill="#E8D5A3" opacity="0.7" />
    </svg>
  );
}

function NameUnderline() {
  return (
    <svg viewBox="0 0 320 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 320 }} aria-hidden="true">
      {/* Main flowing underline */}
      <path d="M10 9 Q80 16 160 9 Q240 2 310 9" stroke="#C9A96E" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Thin echo line */}
      <path d="M30 12 Q100 17 160 12 Q220 7 290 12" stroke="#E8D5A3" strokeWidth="0.6" fill="none" strokeLinecap="round" opacity="0.4" />
      {/* Center dot accent */}
      <circle cx="160" cy="9" r="2.5" fill="#C9A96E" opacity="0.8" />
      <circle cx="80" cy="13" r="1.5" fill="#E8D5A3" opacity="0.5" />
      <circle cx="240" cy="5" r="1.5" fill="#E8D5A3" opacity="0.5" />
    </svg>
  );
}

function BotanicalBranch({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 120, height: 80, transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
    >
      {/* Main stem */}
      <path d="M110 40 Q80 38 50 35 Q30 33 10 40" stroke="#C9A96E" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.8" />
      {/* Upper leaves */}
      <ellipse cx="85" cy="28" rx="12" ry="5" fill="#C9A96E" opacity="0.25" transform="rotate(-25 85 28)" />
      <ellipse cx="85" cy="28" rx="12" ry="5" stroke="#C9A96E" strokeWidth="0.8" fill="none" opacity="0.5" transform="rotate(-25 85 28)" />
      <path d="M85 28 Q90 32 85 36" stroke="#C9A96E" strokeWidth="0.6" fill="none" opacity="0.4" />
      <ellipse cx="65" cy="24" rx="11" ry="4.5" fill="#C9A96E" opacity="0.2" transform="rotate(-20 65 24)" />
      <ellipse cx="65" cy="24" rx="11" ry="4.5" stroke="#C9A96E" strokeWidth="0.7" fill="none" opacity="0.45" transform="rotate(-20 65 24)" />
      <ellipse cx="45" cy="26" rx="10" ry="4" fill="#C9A96E" opacity="0.2" transform="rotate(-15 45 26)" />
      <ellipse cx="45" cy="26" rx="10" ry="4" stroke="#C9A96E" strokeWidth="0.7" fill="none" opacity="0.4" transform="rotate(-15 45 26)" />
      {/* Lower leaves */}
      <ellipse cx="90" cy="50" rx="11" ry="4.5" fill="#C9A96E" opacity="0.2" transform="rotate(20 90 50)" />
      <ellipse cx="90" cy="50" rx="11" ry="4.5" stroke="#C9A96E" strokeWidth="0.7" fill="none" opacity="0.4" transform="rotate(20 90 50)" />
      <ellipse cx="70" cy="54" rx="10" ry="4" fill="#C9A96E" opacity="0.18" transform="rotate(15 70 54)" />
      <ellipse cx="70" cy="54" rx="10" ry="4" stroke="#C9A96E" strokeWidth="0.6" fill="none" opacity="0.35" transform="rotate(15 70 54)" />
      <ellipse cx="50" cy="52" rx="9" ry="3.5" fill="#C9A96E" opacity="0.15" transform="rotate(10 50 52)" />
      <ellipse cx="50" cy="52" rx="9" ry="3.5" stroke="#C9A96E" strokeWidth="0.6" fill="none" opacity="0.3" transform="rotate(10 50 52)" />
      {/* Small berry dots */}
      <circle cx="30" cy="36" r="2.5" fill="#C9A96E" opacity="0.5" />
      <circle cx="22" cy="38" r="2" fill="#E8D5A3" opacity="0.4" />
      <circle cx="26" cy="32" r="1.5" fill="#C9A96E" opacity="0.35" />
    </svg>
  );
}

function FleuronDivider() {
  return (
    <svg viewBox="0 0 500 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }} aria-hidden="true">
      {/* Left vine line */}
      <path d="M0 18 Q60 18 100 18" stroke="#C9A96E" strokeWidth="0.8" opacity="0.5" />
      {/* Left vine curves with leaves */}
      <path d="M40 18 Q50 10 60 14" stroke="#C9A96E" strokeWidth="0.7" fill="none" opacity="0.4" />
      <ellipse cx="55" cy="11" rx="7" ry="3" fill="#C9A96E" opacity="0.2" transform="rotate(-20 55 11)" />
      <path d="M70 18 Q80 26 90 22" stroke="#C9A96E" strokeWidth="0.7" fill="none" opacity="0.4" />
      <ellipse cx="85" cy="25" rx="7" ry="3" fill="#C9A96E" opacity="0.2" transform="rotate(15 85 25)" />
      <circle cx="40" cy="18" r="2" fill="#E8D5A3" opacity="0.5" />
      <circle cx="70" cy="18" r="2" fill="#E8D5A3" opacity="0.5" />
      {/* Right vine line */}
      <path d="M500 18 Q440 18 400 18" stroke="#C9A96E" strokeWidth="0.8" opacity="0.5" />
      {/* Right vine curves with leaves (mirrored) */}
      <path d="M460 18 Q450 10 440 14" stroke="#C9A96E" strokeWidth="0.7" fill="none" opacity="0.4" />
      <ellipse cx="445" cy="11" rx="7" ry="3" fill="#C9A96E" opacity="0.2" transform="rotate(20 445 11)" />
      <path d="M430 18 Q420 26 410 22" stroke="#C9A96E" strokeWidth="0.7" fill="none" opacity="0.4" />
      <ellipse cx="415" cy="25" rx="7" ry="3" fill="#C9A96E" opacity="0.2" transform="rotate(-15 415 25)" />
      <circle cx="460" cy="18" r="2" fill="#E8D5A3" opacity="0.5" />
      <circle cx="430" cy="18" r="2" fill="#E8D5A3" opacity="0.5" />
      {/* Center medallion */}
      <circle cx="250" cy="18" r="14" stroke="#C9A96E" strokeWidth="1.2" fill="#FEFCF7" opacity="0.9" />
      <circle cx="250" cy="18" r="10" stroke="#E8D5A3" strokeWidth="0.6" fill="none" opacity="0.6" />
      {/* Inner 6-pointed star */}
      <path d="M250 8 L251.8 14 L258 14 L253 17.5 L255 23.5 L250 20 L245 23.5 L247 17.5 L242 14 L248.2 14 Z" fill="#C9A96E" opacity="0.8" />
      {/* Connecting lines to medallion */}
      <path d="M100 18 L236 18" stroke="#C9A96E" strokeWidth="0.8" opacity="0.5" />
      <path d="M264 18 L400 18" stroke="#C9A96E" strokeWidth="0.8" opacity="0.5" />
      {/* Small dot accents near medallion */}
      <circle cx="220" cy="18" r="2.5" fill="#C9A96E" opacity="0.4" />
      <circle cx="280" cy="18" r="2.5" fill="#C9A96E" opacity="0.4" />
      <circle cx="200" cy="18" r="1.5" fill="#E8D5A3" opacity="0.35" />
      <circle cx="300" cy="18" r="1.5" fill="#E8D5A3" opacity="0.35" />
    </svg>
  );
}

function QuoteMark({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 40 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 40, height: 32, transform: open ? undefined : 'rotate(180deg)' }}
      aria-hidden="true"
    >
      <path d="M4 20 Q4 8 14 6 L16 10 Q10 12 10 20 L16 20 L16 30 L4 30 Z" fill="#C9A96E" opacity="0.35" />
      <path d="M22 20 Q22 8 32 6 L34 10 Q28 12 28 20 L34 20 L34 30 L22 30 Z" fill="#C9A96E" opacity="0.35" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PremiumWeddingInvitation({
  title,
  brideName,
  groomName,
  date,
  time,
  location,
  message,
}: WeddingInvitationProps) {
  const { weekday, day, month, year } = formatDate(date);
  const formattedTime = formatTime(time);

  return (
    <div
      id="invitation-content"
      className="min-h-screen flex items-center justify-center py-16 px-4 pt-14"
      style={{
        background: '#FDFAF4',
        backgroundImage:
          'radial-gradient(ellipse at center, #FDFAF4 40%, #EDE4D0 100%)',
      }}
    >
      <div className="w-full max-w-2xl">

        {/* ── Outer gold-foil border ── */}
        <div
          className="relative rounded-2xl p-[2px]"
          style={{
            background:
              'linear-gradient(135deg, #F0E0B0 0%, #A07840 15%, #C9A96E 30%, #F0E0B0 45%, #A07840 60%, #C9A96E 75%, #F0E0B0 90%, #A07840 100%)',
            boxShadow:
              '0 32px 80px rgba(160,120,64,0.22), 0 8px 32px rgba(160,120,64,0.14), inset 0 1px 0 rgba(240,224,176,0.6)',
          }}
        >
          {/* ── Inner card ── */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: '#FEFCF7',
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(201,169,110,0.12) 1px, transparent 0)',
              backgroundSize: '20px 20px',
            }}
          >
            {/* Vignette overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, transparent 55%, rgba(160,120,64,0.07) 100%)',
              }}
            />

            {/* ── Corner ornaments ── */}
            <div className="absolute top-3 left-3 pointer-events-none">
              <CornerOrnament rotate={0} />
            </div>
            <div className="absolute top-3 right-3 pointer-events-none">
              <CornerOrnament rotate={90} />
            </div>
            <div className="absolute bottom-3 left-3 pointer-events-none">
              <CornerOrnament rotate={-90} />
            </div>
            <div className="absolute bottom-3 right-3 pointer-events-none">
              <CornerOrnament rotate={180} />
            </div>

            {/* ── Content ── */}
            <div className="relative px-10 sm:px-16 py-12 sm:py-14">

              {/* ── Top ornamental band ── */}
              <div className="mb-6">
                <OrnamentalBand />
              </div>

              {/* ── Together with their families ── */}
              <div className="text-center mb-4">
                <p
                  className="text-xs tracking-[0.45em] uppercase"
                  style={{
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    color: '#8B7355',
                    fontWeight: 500,
                  }}
                >
                  Together with their families
                </p>
              </div>

              {/* ── Star cluster ── */}
              <div className="flex justify-center mb-6">
                <StarCluster />
              </div>

              {/* ── Title (if provided) ── */}
              {title && (
                <div className="text-center mb-6">
                  <p
                    className="text-sm tracking-[0.3em] uppercase"
                    style={{
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      color: '#A07840',
                    }}
                  >
                    {title}
                  </p>
                </div>
              )}

              {/* ── Bride name ── */}
              <div className="text-center mb-2">
                <h2
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    color: '#1A1208',
                    textShadow: '0 2px 12px rgba(201,169,110,0.35), 0 1px 3px rgba(160,120,64,0.2)',
                  }}
                >
                  {brideName}
                </h2>
                <div className="flex justify-center mt-2">
                  <NameUnderline />
                </div>
              </div>

              {/* ── Ampersand section ── */}
              <div className="flex items-center justify-center gap-4 my-6">
                <BotanicalBranch />
                <div className="flex-shrink-0">
                  <span
                    className="text-6xl sm:text-7xl italic font-bold"
                    style={{
                      fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                      color: '#C9A96E',
                      textShadow: '0 2px 16px rgba(201,169,110,0.4)',
                      lineHeight: 1,
                    }}
                  >
                    &amp;
                  </span>
                </div>
                <BotanicalBranch flip />
              </div>

              {/* ── Groom name ── */}
              <div className="text-center mb-8">
                <h2
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    color: '#1A1208',
                    textShadow: '0 2px 12px rgba(201,169,110,0.35), 0 1px 3px rgba(160,120,64,0.2)',
                  }}
                >
                  {groomName}
                </h2>
                <div className="flex justify-center mt-2">
                  <NameUnderline />
                </div>
              </div>

              {/* ── Ornate fleuron divider ── */}
              <div className="mb-6">
                <FleuronDivider />
              </div>

              {/* ── Request text ── */}
              <div className="text-center mb-8">
                <p
                  className="text-xs tracking-[0.4em] uppercase"
                  style={{
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    color: '#5C4A2A',
                    fontWeight: 500,
                  }}
                >
                  cordially request the honour of your presence
                </p>
              </div>

              {/* ── Date / Time / Location card ── */}
              <div
                className="rounded-xl p-6 sm:p-8 mb-8"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(201,169,110,0.1) 0%, rgba(232,213,163,0.15) 50%, rgba(201,169,110,0.1) 100%)',
                  border: '1px solid rgba(201,169,110,0.3)',
                }}
              >
                {/* Weekday */}
                <div className="text-center mb-1">
                  <p
                    className="text-xs tracking-[0.35em] uppercase"
                    style={{
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      color: '#8B7355',
                    }}
                  >
                    {weekday}
                  </p>
                </div>

                {/* Day + Month + Year */}
                <div className="flex items-baseline justify-center gap-4 mb-4">
                  <span
                    className="text-6xl font-bold leading-none"
                    style={{
                      fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                      color: '#1A1208',
                    }}
                  >
                    {day}
                  </span>
                  <div className="flex flex-col items-start">
                    <span
                      className="text-xl font-semibold leading-tight"
                      style={{
                        fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                        color: '#C9A96E',
                      }}
                    >
                      {month}
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: 'var(--font-inter, Inter, sans-serif)',
                        color: '#8B7355',
                      }}
                    >
                      {year}
                    </span>
                  </div>
                </div>

                {/* Thin ornamental separator */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="flex-1 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5))' }}
                  />
                  <svg viewBox="0 0 12 12" style={{ width: 12, height: 12 }} fill="#C9A96E" aria-hidden="true">
                    <path d="M6 0 L7 4.5 L12 4.5 L8 7 L9.5 12 L6 9 L2.5 12 L4 7 L0 4.5 L5 4.5 Z" />
                  </svg>
                  <div
                    className="flex-1 h-px"
                    style={{ background: 'linear-gradient(270deg, transparent, rgba(201,169,110,0.5))' }}
                  />
                </div>

                {/* Time & Location columns */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Time */}
                  <div className="text-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{
                        background: 'linear-gradient(135deg, rgba(201,169,110,0.2), rgba(201,169,110,0.38))',
                        border: '1px solid rgba(201,169,110,0.4)',
                      }}
                    >
                      <svg style={{ width: 18, height: 18 }} fill="none" stroke="#C9A96E" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p
                      className="text-xs tracking-widest uppercase mb-1"
                      style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', color: '#A07840' }}
                    >
                      Time
                    </p>
                    <p
                      className="text-base font-semibold"
                      style={{
                        fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                        color: '#1A1208',
                      }}
                    >
                      {formattedTime}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="text-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{
                        background: 'linear-gradient(135deg, rgba(201,169,110,0.2), rgba(201,169,110,0.38))',
                        border: '1px solid rgba(201,169,110,0.4)',
                      }}
                    >
                      <svg style={{ width: 18, height: 18 }} fill="none" stroke="#C9A96E" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p
                      className="text-xs tracking-widest uppercase mb-1"
                      style={{ fontFamily: 'var(--font-inter, Inter, sans-serif)', color: '#A07840' }}
                    >
                      Venue
                    </p>
                    <p
                      className="text-sm font-semibold leading-snug"
                      style={{
                        fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                        color: '#1A1208',
                      }}
                    >
                      {location}
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Message section ── */}
              {message && (
                <div className="text-center mb-8 px-2">
                  <div className="flex justify-start mb-2">
                    <QuoteMark open={true} />
                  </div>
                  <p
                    className="text-base sm:text-lg italic leading-relaxed px-6"
                    style={{
                      fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                      color: '#5C4A2A',
                    }}
                  >
                    {message}
                  </p>
                  <div className="flex justify-end mt-2">
                    <QuoteMark open={false} />
                  </div>
                </div>
              )}

              {/* ── Bottom ornamental band ── */}
              <div className="mb-6">
                <OrnamentalBand />
              </div>

              {/* ── Watermark ── */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-3">
                  <div
                    className="h-px w-12"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4))' }}
                  />
                  <p
                    className="text-xs tracking-[0.35em] uppercase"
                    style={{
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      color: '#8B7355',
                      opacity: 0.6,
                    }}
                  >
                    Created with InviteMaker
                  </p>
                  <div
                    className="h-px w-12"
                    style={{ background: 'linear-gradient(270deg, transparent, rgba(201,169,110,0.4))' }}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
