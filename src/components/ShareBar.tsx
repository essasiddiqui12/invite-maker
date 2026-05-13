'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ShareBarProps {
  inviteId: string;
  title: string;
}

export default function ShareBar({ inviteId, title }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [inviteUrl, setInviteUrl] = useState(`/invite/${inviteId}`);
  const [hasNativeShare, setHasNativeShare] = useState(false);

  useEffect(() => {
    setInviteUrl(`${window.location.origin}/invite/${inviteId}`);
    setHasNativeShare(!!navigator.share);
  }, [inviteId]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const input = document.createElement('input');
      input.value = inviteUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title,
        text: `You're invited! ${title}`,
        url: inviteUrl,
      });
    } catch {
      // User cancelled — no-op
    }
  };

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      // Use browser's native print-to-PDF — most reliable approach
      // Hide the share bar during print so only the invitation shows
      const shareBar = document.querySelector('[data-sharebar]') as HTMLElement;
      if (shareBar) shareBar.style.display = 'none';

      window.print();

      if (shareBar) shareBar.style.display = '';
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div data-sharebar className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/60 shadow-sm print:hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">

        {/* Left: back */}
        <Link
          href="/templates"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 font-medium transition-colors shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Create another</span>
        </Link>

        {/* Center: URL pill */}
        <div className="flex-1 min-w-0 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 max-w-sm mx-auto">
          <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="text-xs text-gray-500 truncate font-mono">{inviteUrl}</span>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Native share — mobile only, shown after mount */}
          {hasNativeShare && (
            <button
              onClick={handleNativeShare}
              className="sm:hidden p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
              aria-label="Share"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          )}

          {/* Save PDF */}
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
              downloading
                ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
            title="Download as PDF"
          >
            {downloading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="hidden sm:inline">Saving...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <span className="hidden sm:inline">Save PDF</span>
              </>
            )}
          </button>

          {/* Copy link */}
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              copied
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25'
            }`}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy Link</span>
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}
