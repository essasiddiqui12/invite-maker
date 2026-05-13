'use client';

interface LuxuryInvitationProps {
  title: string;
  hostName: string;
  date: string;
  time: string;
  location: string;
  message?: string;
}

export default function LuxuryInvitation({
  title,
  hostName,
  date,
  time,
  location,
  message,
}: LuxuryInvitationProps) {
  const formatDate = (dateStr: string) => {
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
  };

  const formatTime = (timeStr: string) => {
    try {
      const [hours, minutes] = timeStr.split(':');
      const d = new Date();
      d.setHours(parseInt(hours), parseInt(minutes));
      return d.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch {
      return timeStr;
    }
  };

  return (
    <div id="invitation-content" className="min-h-screen bg-[#FDFBF7] flex flex-col pt-14">
      {/* Hero Section */}
      <header className="py-16 sm:py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>

          <p className="text-amber-700 tracking-[0.3em] text-xs sm:text-sm uppercase font-medium mb-4">
            You&apos;re Invited
          </p>

          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            {title}
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>
        </div>
      </header>

      {/* Event Details */}
      <main className="flex-1 px-4 pb-16">
        <div className="max-w-xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl shadow-amber-900/5 border border-amber-100/50 p-8 sm:p-10">
            {/* Host */}
            <div className="text-center mb-10">
              <p className="text-gray-500 text-sm uppercase tracking-widest mb-2">
                Together with their families
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-semibold text-gray-900">
                {hostName}
              </h2>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="w-12 h-px bg-amber-200" />
              <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
              </svg>
              <div className="w-12 h-px bg-amber-200" />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center shadow-inner">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-800 font-semibold text-lg leading-snug">
                  {formatDate(date)}
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center shadow-inner">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-800 font-semibold text-lg leading-snug">
                  {formatTime(time)}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="text-center mb-10">
              <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center shadow-inner">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-gray-800 font-semibold text-lg leading-relaxed max-w-xs mx-auto">
                {location}
              </p>
            </div>

            {/* Message */}
            {message && (
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-200 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-200 to-transparent" />
                <div className="py-6 px-4">
                  <p className="font-[family-name:var(--font-playfair)] text-gray-700 italic text-center text-lg leading-relaxed">
                    &ldquo;{message}&rdquo;
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Watermark */}
      <footer className="py-8 px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-amber-600/60">
          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-sm font-medium">InviteMaker</span>
        </div>
      </footer>
    </div>
  );
}