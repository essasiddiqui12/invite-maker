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

// Large peony/rose in top-right corner
function PeonyCorner() {
  return (
    <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 right-0 w-48 h-48 pointer-events-none" aria-hidden="true">
      {/* Outer petals */}
      <ellipse cx="160" cy="60" rx="38" ry="22" fill="#E8A0B0" opacity="0.45" transform="rotate(-30 160 60)" />
      <ellipse cx="175" cy="85" rx="38" ry="22" fill="#C4687A" opacity="0.35" transform="rotate(15 175 85)" />
      <ellipse cx="155" cy="100" rx="36" ry="20" fill="#E8A0B0" opacity="0.4" transform="rotate(60 155 100)" />
      <ellipse cx="130" cy="90" rx="36" ry="20" fill="#C4687A" opacity="0.3" transform="rotate(-60 130 90)" />
      <ellipse cx="125" cy="65" rx="34" ry="19" fill="#E8A0B0" opacity="0.4" transform="rotate(-10 125 65)" />
      {/* Mid petals */}
      <ellipse cx="155" cy="72" rx="26" ry="15" fill="#C4687A" opacity="0.5" transform="rotate(-20 155 72)" />
      <ellipse cx="165" cy="88" rx="26" ry="15" fill="#E8A0B0" opacity="0.55" transform="rotate(25 165 88)" />
      <ellipse cx="148" cy="95" rx="24" ry="14" fill="#C4687A" opacity="0.5" transform="rotate(70 148 95)" />
      <ellipse cx="135" cy="80" rx="24" ry="14" fill="#E8A0B0" opacity="0.5" transform="rotate(-50 135 80)" />
      {/* Center */}
      <circle cx="150" cy="80" r="16" fill="#C4687A" opacity="0.7" />
      <circle cx="150" cy="80" r="10" fill="#F5EDE8" opacity="0.5" />
      <circle cx="150" cy="80" r="5" fill="#C4687A" opacity="0.8" />
      {/* Stamens */}
      <circle cx="145" cy="74" r="1.5" fill="#F5EDE8" opacity="0.9" />
      <circle cx="155" cy="74" r="1.5" fill="#F5EDE8" opacity="0.9" />
      <circle cx="150" cy="72" r="1.5" fill="#F5EDE8" opacity="0.9" />
      {/* Leaves */}
      <path d="M110 110 Q130 85 155 75" stroke="#6B8F71" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
      <ellipse cx="125" cy="97" rx="14" ry="7" fill="#6B8F71" opacity="0.35" transform="rotate(-40 125 97)" />
      <ellipse cx="140" cy="88" rx="12" ry="6" fill="#6B8F71" opacity="0.3" transform="rotate(-25 140 88)" />
    </svg>
  );
}

// Scattered petals background
function ScatteredPetals() {
  return (
    <svg viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      <ellipse cx="30" cy="120" rx="10" ry="6" fill="#E8A0B0" opacity="0.25" transform="rotate(30 30 120)" />
      <ellipse cx="570" cy="200" rx="9" ry="5" fill="#C4687A" opacity="0.2" transform="rotate(-20 570 200)" />
      <ellipse cx="50" cy="400" rx="10" ry="6" fill="#E8A0B0" opacity="0.2" transform="rotate(50 50 400)" />
      <ellipse cx="560" cy="450" rx="8" ry="5" fill="#C4687A" opacity="0.2" transform="rotate(-40 560 450)" />
      <ellipse cx="80" cy="650" rx="10" ry="6" fill="#E8A0B0" opacity="0.2" transform="rotate(15 80 650)" />
      <ellipse cx="520" cy="700" rx="9" ry="5" fill="#C4687A" opacity="0.15" transform="rotate(-30 520 700)" />
      <ellipse cx="300" cy="780" rx="10" ry="6" fill="#E8A0B0" opacity="0.15" transform="rotate(45 300 780)" />
      <ellipse cx="150" cy="760" rx="8" ry="5" fill="#C4687A" opacity="0.15" transform="rotate(-15 150 760)" />
      <ellipse cx="450" cy="750" rx="9" ry="5" fill="#E8A0B0" opacity="0.15" transform="rotate(35 450 750)" />
    </svg>
  );
}

// Vine border along left side
function VineBorder() {
  return (
    <svg viewBox="0 0 40 600" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="absolute left-0 top-0 h-full w-10 pointer-events-none" aria-hidden="true">
      <path d="M20 0 Q10 80 20 160 Q30 240 20 320 Q10 400 20 480 Q30 560 20 600"
        stroke="#6B8F71" strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round" />
      <ellipse cx="12" cy="80" rx="9" ry="5" fill="#6B8F71" opacity="0.3" transform="rotate(-30 12 80)" />
      <ellipse cx="26" cy="160" rx="9" ry="5" fill="#6B8F71" opacity="0.3" transform="rotate(20 26 160)" />
      <ellipse cx="12" cy="240" rx="9" ry="5" fill="#6B8F71" opacity="0.3" transform="rotate(-25 12 240)" />
      <ellipse cx="26" cy="320" rx="9" ry="5" fill="#6B8F71" opacity="0.3" transform="rotate(15 26 320)" />
      <ellipse cx="12" cy="400" rx="9" ry="5" fill="#6B8F71" opacity="0.3" transform="rotate(-35 12 400)" />
      <ellipse cx="26" cy="480" rx="9" ry="5" fill="#6B8F71" opacity="0.3" transform="rotate(25 26 480)" />
      <circle cx="20" cy="120" r="3" fill="#E8A0B0" opacity="0.5" />
      <circle cx="20" cy="280" r="3" fill="#C4687A" opacity="0.4" />
      <circle cx="20" cy="440" r="3" fill="#E8A0B0" opacity="0.4" />
    </svg>
  );
}

// Floral wreath around host name
function FloralWreath() {
  return (
    <svg viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-xs mx-auto" aria-hidden="true">
      {/* Left branch */}
      <path d="M80 40 Q55 30 35 20 Q20 14 18 24 Q28 18 42 26 Q56 34 72 42"
        stroke="#6B8F71" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
      <ellipse cx="35" cy="22" rx="10" ry="5" fill="#6B8F71" opacity="0.3" transform="rotate(-35 35 22)" />
      <ellipse cx="50" cy="28" rx="10" ry="5" fill="#6B8F71" opacity="0.3" transform="rotate(-20 50 28)" />
      <ellipse cx="64" cy="35" rx="10" ry="5" fill="#6B8F71" opacity="0.3" transform="rotate(-8 64 35)" />
      <circle cx="22" cy="28" r="5" fill="#E8A0B0" opacity="0.6" />
      <circle cx="40" cy="34" r="4" fill="#C4687A" opacity="0.5" />
      {/* Right branch */}
      <path d="M220 40 Q245 30 265 20 Q280 14 282 24 Q272 18 258 26 Q244 34 228 42"
        stroke="#6B8F71" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
      <ellipse cx="265" cy="22" rx="10" ry="5" fill="#6B8F71" opacity="0.3" transform="rotate(35 265 22)" />
      <ellipse cx="250" cy="28" rx="10" ry="5" fill="#6B8F71" opacity="0.3" transform="rotate(20 250 28)" />
      <ellipse cx="236" cy="35" rx="10" ry="5" fill="#6B8F71" opacity="0.3" transform="rotate(8 236 35)" />
      <circle cx="278" cy="28" r="5" fill="#E8A0B0" opacity="0.6" />
      <circle cx="260" cy="34" r="4" fill="#C4687A" opacity="0.5" />
      {/* Center rose bud */}
      <circle cx="150" cy="35" r="10" fill="#C4687A" opacity="0.6" />
      <circle cx="150" cy="35" r="6" fill="#E8A0B0" opacity="0.7" />
      <circle cx="150" cy="35" r="3" fill="#C4687A" opacity="0.9" />
    </svg>
  );
}

// Floral divider
function FloralDivider() {
  return (
    <svg viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
      <line x1="0" y1="10" x2="115" y2="10" stroke="#C4687A" strokeWidth="0.6" opacity="0.4" />
      <circle cx="130" cy="10" r="4" fill="#E8A0B0" opacity="0.7" />
      <circle cx="150" cy="10" r="6" fill="#C4687A" opacity="0.6" />
      <circle cx="170" cy="10" r="4" fill="#E8A0B0" opacity="0.7" />
      <line x1="185" y1="10" x2="300" y2="10" stroke="#C4687A" strokeWidth="0.6" opacity="0.4" />
    </svg>
  );
}

export default function FloralInvitation({ title, hostName, date, time, location, message }: Props) {
  const { weekday, day, month, year } = formatDate(date);
  const formattedTime = formatTime(time);

  return (
    <div
      id="invitation-content"
      className="min-h-screen flex items-center justify-center py-16 px-4 pt-14"
      style={{ background: 'linear-gradient(160deg, #FDFAF8 0%, #F9F3EF 50%, #F5EDE8 100%)' }}
    >
      <div className="w-full max-w-2xl">

        {/* Outer frame */}
        <div
          className="relative rounded-3xl p-px"
          style={{
            background: 'linear-gradient(135deg, #C4687A 0%, #E8A0B0 30%, #6B8F71 60%, #C4687A 100%)',
            boxShadow: '0 28px 70px rgba(196,104,122,0.2), 0 8px 24px rgba(0,0,0,0.08)',
          }}
        >
          {/* Card */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ backgroundColor: '#FFFFFF' }}
          >
            <ScatteredPetals />
            <VineBorder />
            {/* Right vine (mirrored) */}
            <div className="absolute right-0 top-0 h-full w-10 pointer-events-none" aria-hidden="true"
              style={{ transform: 'scaleX(-1)' }}>
              <svg viewBox="0 0 40 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                <path d="M20 0 Q10 80 20 160 Q30 240 20 320 Q10 400 20 480 Q30 560 20 600"
                  stroke="#6B8F71" strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round" />
                <ellipse cx="12" cy="80" rx="9" ry="5" fill="#6B8F71" opacity="0.3" transform="rotate(-30 12 80)" />
                <ellipse cx="26" cy="160" rx="9" ry="5" fill="#6B8F71" opacity="0.3" transform="rotate(20 26 160)" />
                <ellipse cx="12" cy="240" rx="9" ry="5" fill="#6B8F71" opacity="0.3" transform="rotate(-25 12 240)" />
                <ellipse cx="26" cy="320" rx="9" ry="5" fill="#6B8F71" opacity="0.3" transform="rotate(15 26 320)" />
                <circle cx="20" cy="120" r="3" fill="#E8A0B0" opacity="0.5" />
                <circle cx="20" cy="280" r="3" fill="#C4687A" opacity="0.4" />
              </svg>
            </div>
            <PeonyCorner />

            <div className="relative px-10 sm:px-16 py-14 sm:py-16">

              {/* Header */}
              <div className="text-center mb-8">
                <div
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(196,104,122,0.1), rgba(232,160,176,0.15))',
                    border: '1px solid rgba(196,104,122,0.3)',
                  }}
                >
                  <span style={{ color: '#C4687A', fontFamily: 'var(--font-inter, Inter, sans-serif)', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 600 }}>
                    ✿ You&apos;re Invited ✿
                  </span>
                </div>

                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    color: '#2D1B20',
                  }}
                >
                  {title}
                </h1>

                <FloralDivider />
              </div>

              {/* Host name with wreath */}
              <div className="text-center mb-10">
                <p
                  className="text-xs tracking-[0.35em] uppercase mb-2"
                  style={{ color: '#6B8F71', fontFamily: 'var(--font-inter, Inter, sans-serif)', fontWeight: 500 }}
                >
                  Hosted by
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-3"
                  style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    color: '#2D1B20',
                  }}
                >
                  {hostName}
                </h2>
                <FloralWreath />
              </div>

              {/* Details card */}
              <div
                className="rounded-2xl p-6 sm:p-8 mb-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(245,237,232,0.6) 0%, rgba(232,160,176,0.1) 100%)',
                  border: '1px solid rgba(196,104,122,0.2)',
                }}
              >
                {/* Date */}
                <div className="text-center mb-6">
                  <p
                    className="text-xs tracking-[0.3em] uppercase mb-2"
                    style={{ color: '#C4687A', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                  >
                    Date
                  </p>
                  <p
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ color: 'rgba(45,27,32,0.4)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                  >
                    {weekday}
                  </p>
                  <div className="flex items-baseline justify-center gap-3">
                    <span
                      className="text-5xl sm:text-6xl font-bold leading-none"
                      style={{
                        fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                        color: '#2D1B20',
                      }}
                    >
                      {day}
                    </span>
                    <div className="flex flex-col items-start">
                      <span
                        className="text-lg font-semibold leading-tight"
                        style={{
                          fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                          color: '#C4687A',
                        }}
                      >
                        {month}
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: 'rgba(45,27,32,0.45)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
                      >
                        {year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,104,122,0.35))' }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#E8A0B0' }} />
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(270deg, transparent, rgba(196,104,122,0.35))' }} />
                </div>

                {/* Time & Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{ background: 'rgba(196,104,122,0.12)' }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="#C4687A" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#C4687A', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>Time</p>
                    <p className="text-base font-semibold" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)', color: '#2D1B20' }}>
                      {formattedTime}
                    </p>
                  </div>

                  <div className="text-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{ background: 'rgba(107,143,113,0.12)' }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="#6B8F71" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#6B8F71', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}>Venue</p>
                    <p className="text-sm font-semibold leading-snug" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)', color: '#2D1B20' }}>
                      {location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              {message && (
                <div className="text-center mb-8 px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,104,122,0.35))' }} />
                    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="#C4687A" opacity="0.7">
                      <path d="M10 2 Q12 6 16 6 Q12 8 14 12 Q10 9 6 12 Q8 8 4 6 Q8 6 10 2Z" />
                    </svg>
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(270deg, transparent, rgba(196,104,122,0.35))' }} />
                  </div>
                  <p
                    className="text-base sm:text-lg italic leading-relaxed"
                    style={{
                      fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                      color: 'rgba(45,27,32,0.75)',
                    }}
                  >
                    &ldquo;{message}&rdquo;
                  </p>
                </div>
              )}

              {/* Bottom ornament */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,104,122,0.4))' }} />
                <span style={{ color: '#C4687A', fontSize: '0.8rem', opacity: 0.7 }}>✿</span>
                <div className="h-px w-8" style={{ backgroundColor: '#6B8F71', opacity: 0.3 }} />
                <span style={{ color: '#6B8F71', fontSize: '0.8rem', opacity: 0.7 }}>✿</span>
                <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(270deg, transparent, rgba(196,104,122,0.4))' }} />
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,104,122,0.35))' }} />
            <p
              className="text-xs tracking-[0.35em] uppercase"
              style={{ color: 'rgba(196,104,122,0.5)', fontFamily: 'var(--font-inter, Inter, sans-serif)' }}
            >
              Created with InviteMaker
            </p>
            <div className="h-px w-12" style={{ background: 'linear-gradient(270deg, transparent, rgba(196,104,122,0.35))' }} />
          </div>
        </div>

      </div>
    </div>
  );
}
