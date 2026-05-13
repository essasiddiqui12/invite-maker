'use client';

interface FormData {
  title: string;
  host_name: string;
  event_date: string;
  event_time: string;
  location: string;
  message: string;
}

interface InvitePreviewProps {
  formData: FormData;
  category: string;
}

const categoryTheme: Record<string, {
  bg: string;
  cardBg: string;
  accentFrom: string;
  accentTo: string;
  accentLight: string;
  accentText: string;
  dividerColor: string;
  emoji: string;
}> = {
  birthday: {
    bg: '#fdf2f8',
    cardBg: '#ffffff',
    accentFrom: '#ec4899',
    accentTo: '#f43f5e',
    accentLight: '#fce7f3',
    accentText: '#db2777',
    dividerColor: '#f9a8d4',
    emoji: '🎂',
  },
  wedding: {
    bg: '#fffbeb',
    cardBg: '#fdfaf5',
    accentFrom: '#f59e0b',
    accentTo: '#d97706',
    accentLight: '#fef3c7',
    accentText: '#b45309',
    dividerColor: '#fcd34d',
    emoji: '💍',
  },
  baby: {
    bg: '#eff6ff',
    cardBg: '#ffffff',
    accentFrom: '#60a5fa',
    accentTo: '#818cf8',
    accentLight: '#dbeafe',
    accentText: '#4338ca',
    dividerColor: '#a5b4fc',
    emoji: '🍼',
  },
  graduation: {
    bg: '#fffbeb',
    cardBg: '#ffffff',
    accentFrom: '#f59e0b',
    accentTo: '#ea580c',
    accentLight: '#fef3c7',
    accentText: '#b45309',
    dividerColor: '#fcd34d',
    emoji: '🎓',
  },
  corporate: {
    bg: '#f8fafc',
    cardBg: '#ffffff',
    accentFrom: '#475569',
    accentTo: '#1e293b',
    accentLight: '#e2e8f0',
    accentText: '#334155',
    dividerColor: '#94a3b8',
    emoji: '🏢',
  },
  formal: {
    bg: '#f4f4f5',
    cardBg: '#ffffff',
    accentFrom: '#52525b',
    accentTo: '#18181b',
    accentLight: '#e4e4e7',
    accentText: '#3f3f46',
    dividerColor: '#a1a1aa',
    emoji: '🎩',
  },
  floral: {
    bg: '#fdf2f8',
    cardBg: '#ffffff',
    accentFrom: '#e879f9',
    accentTo: '#a855f7',
    accentLight: '#fae8ff',
    accentText: '#a21caf',
    dividerColor: '#d8b4fe',
    emoji: '🌸',
  },
  rustic: {
    bg: '#fff7ed',
    cardBg: '#fefcf8',
    accentFrom: '#fb923c',
    accentTo: '#d97706',
    accentLight: '#ffedd5',
    accentText: '#c2410c',
    dividerColor: '#fdba74',
    emoji: '🌾',
  },
  luxury: {
    bg: '#fefce8',
    cardBg: '#fdfaf5',
    accentFrom: '#eab308',
    accentTo: '#d97706',
    accentLight: '#fef9c3',
    accentText: '#a16207',
    dividerColor: '#fde047',
    emoji: '✨',
  },
  casual: {
    bg: '#ecfdf5',
    cardBg: '#ffffff',
    accentFrom: '#34d399',
    accentTo: '#14b8a6',
    accentLight: '#d1fae5',
    accentText: '#047857',
    dividerColor: '#6ee7b7',
    emoji: '🎉',
  },
};

const fallbackTheme = categoryTheme.casual;

function formatDate(dateStr: string) {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function formatTime(timeStr: string) {
  if (!timeStr) return null;
  try {
    const [hours, minutes] = timeStr.split(':');
    const d = new Date();
    d.setHours(parseInt(hours), parseInt(minutes));
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  } catch {
    return timeStr;
  }
}

export default function InvitePreview({ formData, category }: InvitePreviewProps) {
  const t = categoryTheme[category] ?? fallbackTheme;

  const title = formData.title || 'Your Event Title';
  const hostName = formData.host_name || 'Host Name';
  const dateFormatted = formatDate(formData.event_date);
  const timeFormatted = formatTime(formData.event_time);
  const location = formData.location || null;
  const message = formData.message || null;

  return (
    <div
      className="w-full min-h-[600px] flex flex-col items-center justify-start py-10 px-6"
      style={{ backgroundColor: t.bg }}
    >
      {/* Card */}
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          backgroundColor: t.cardBg,
          boxShadow: '0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
          border: `1px solid ${t.accentLight}`,
        }}
      >
        {/* Top accent bar */}
        <div
          className="h-1.5 w-full"
          style={{ background: `linear-gradient(90deg, ${t.accentFrom}, ${t.accentTo})` }}
        />

        <div className="px-8 py-8 flex flex-col items-center text-center">

          {/* Emoji */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-4 shadow-md"
            style={{ background: `linear-gradient(135deg, ${t.accentFrom}, ${t.accentTo})` }}
          >
            {t.emoji}
          </div>

          {/* Tagline */}
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
            style={{ color: t.accentText }}
          >
            You&apos;re Invited
          </p>

          {/* Divider */}
          <div className="flex items-center gap-2 w-full mb-4">
            <div className="flex-1 h-px" style={{ backgroundColor: t.dividerColor }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.dividerColor }} />
            <div className="flex-1 h-px" style={{ backgroundColor: t.dividerColor }} />
          </div>

          {/* Title */}
          <h1
            className="text-2xl font-bold text-gray-900 leading-tight mb-2"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            {title}
          </h1>

          {/* Host */}
          <p
            className="text-lg font-semibold mb-5"
            style={{
              color: t.accentText,
              fontFamily: '"Playfair Display", Georgia, serif',
            }}
          >
            {hostName}
          </p>

          {/* Divider */}
          <div className="flex items-center gap-2 w-full mb-5">
            <div className="flex-1 h-px" style={{ backgroundColor: t.dividerColor }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.dividerColor }} />
            <div className="flex-1 h-px" style={{ backgroundColor: t.dividerColor }} />
          </div>

          {/* Date & Time */}
          <div className="w-full grid grid-cols-2 gap-3 mb-4">
            <div
              className="rounded-xl p-3 flex flex-col items-center gap-1"
              style={{ backgroundColor: t.accentLight }}
            >
              <svg className="w-4 h-4 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: t.accentText }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-xs font-semibold text-gray-700 leading-snug text-center">
                {dateFormatted ?? <span className="text-gray-300 italic">Date TBD</span>}
              </p>
            </div>
            <div
              className="rounded-xl p-3 flex flex-col items-center gap-1"
              style={{ backgroundColor: t.accentLight }}
            >
              <svg className="w-4 h-4 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: t.accentText }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs font-semibold text-gray-700 leading-snug text-center">
                {timeFormatted ?? <span className="text-gray-300 italic">Time TBD</span>}
              </p>
            </div>
          </div>

          {/* Location */}
          <div
            className="w-full rounded-xl p-3 flex items-start gap-2 mb-4"
            style={{ backgroundColor: t.accentLight }}
          >
            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: t.accentText }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-xs font-semibold text-gray-700 text-left leading-snug">
              {location ?? <span className="text-gray-300 italic">Location TBD</span>}
            </p>
          </div>

          {/* Message */}
          {message && (
            <div className="w-full border-t pt-4 mt-1" style={{ borderColor: t.dividerColor }}>
              <p
                className="text-sm italic text-gray-500 leading-relaxed"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                &ldquo;{message}&rdquo;
              </p>
            </div>
          )}

        </div>

        {/* Bottom accent bar */}
        <div
          className="h-1 w-full opacity-50"
          style={{ background: `linear-gradient(90deg, ${t.accentFrom}, ${t.accentTo})` }}
        />
      </div>

      {/* Watermark */}
      <p className="mt-5 text-xs text-gray-300 tracking-widest uppercase">
        InviteMaker
      </p>
    </div>
  );
}
