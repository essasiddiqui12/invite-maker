'use client';

import { useState } from 'react';
import { InvitationCustomization, DEFAULT_CUSTOMIZATION } from '@/types/invitation';

interface CustomizationPanelProps {
  value: InvitationCustomization;
  onChange: (v: InvitationCustomization) => void;
}

const THEMES: { name: string; label: string; accent: string; bg: string; text: string; preview: string }[] = [
  { name: 'gold',     label: 'Gold',     accent: '#C9A96E', bg: '#FDFAF4', text: '#1A1208', preview: 'linear-gradient(135deg, #FDFAF4, #C9A96E)' },
  { name: 'rose',     label: 'Rose',     accent: '#C4687A', bg: '#FDF8F8', text: '#2D1B20', preview: 'linear-gradient(135deg, #FDF8F8, #C4687A)' },
  { name: 'midnight', label: 'Midnight', accent: '#6B8FD4', bg: '#0D1B3E', text: '#F0F4FF', preview: 'linear-gradient(135deg, #0D1B3E, #6B8FD4)' },
  { name: 'forest',   label: 'Forest',   accent: '#3D5A3E', bg: '#F5EDD8', text: '#1A2A1A', preview: 'linear-gradient(135deg, #F5EDD8, #3D5A3E)' },
  { name: 'ocean',    label: 'Ocean',    accent: '#2A7A8C', bg: '#F0F8FA', text: '#0A2030', preview: 'linear-gradient(135deg, #F0F8FA, #2A7A8C)' },
  { name: 'noir',     label: 'Noir',     accent: '#D4AF37', bg: '#111111', text: '#F5F5F0', preview: 'linear-gradient(135deg, #111111, #D4AF37)' },
];

const FONT_SIZES: { value: InvitationCustomization['fontSize']; label: string }[] = [
  { value: 'sm', label: 'S' },
  { value: 'md', label: 'M' },
  { value: 'lg', label: 'L' },
  { value: 'xl', label: 'XL' },
];

const FONT_FAMILIES: { value: InvitationCustomization['fontFamily']; label: string; preview: string }[] = [
  { value: 'playfair', label: 'Serif',  preview: '"Playfair Display", Georgia, serif' },
  { value: 'inter',    label: 'Sans',   preview: 'Inter, system-ui, sans-serif' },
  { value: 'mono',     label: 'Mono',   preview: '"Courier New", Courier, monospace' },
];

export default function CustomizationPanel({ value, onChange }: CustomizationPanelProps) {
  const [open, setOpen] = useState(false);

  const update = (partial: Partial<InvitationCustomization>) => {
    onChange({ ...value, ...partial });
  };

  const applyTheme = (theme: typeof THEMES[0]) => {
    onChange({
      ...value,
      theme: theme.name,
      accentColor: theme.accent,
      bgColor: theme.bg,
      textColor: theme.text,
    });
  };

  const reset = () => onChange({ ...DEFAULT_CUSTOMIZATION });

  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(99,102,241,0.2)' }}>
      {/* Toggle header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 transition-colors"
        style={{ background: open ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.03)' }}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-lg">🎨</span>
          <span className="text-sm font-semibold" style={{ color: '#4F46E5' }}>
            Customize Design
          </span>
          {value.theme !== 'gold' && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: 'rgba(99,102,241,0.1)', color: '#4F46E5' }}
            >
              {THEMES.find(t => t.name === value.theme)?.label ?? 'Custom'}
            </span>
          )}
        </div>
        <svg
          className="w-4 h-4 transition-transform"
          style={{ color: '#6366F1', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-5 pt-4 space-y-5" style={{ background: 'rgba(99,102,241,0.02)' }}>

          {/* Color Themes */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              Color Theme
            </p>
            <div className="grid grid-cols-3 gap-2">
              {THEMES.map((theme) => (
                <button
                  key={theme.name}
                  type="button"
                  onClick={() => applyTheme(theme)}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all"
                  style={{
                    border: value.theme === theme.name
                      ? '2px solid #6366F1'
                      : '2px solid transparent',
                    background: value.theme === theme.name
                      ? 'rgba(99,102,241,0.08)'
                      : 'rgba(0,0,0,0.02)',
                  }}
                >
                  <div
                    className="w-full h-8 rounded-lg"
                    style={{ background: theme.preview }}
                  />
                  <span className="text-xs font-medium text-gray-600">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              Font Size
            </p>
            <div className="flex gap-2">
              {FONT_SIZES.map((fs) => (
                <button
                  key={fs.value}
                  type="button"
                  onClick={() => update({ fontSize: fs.value })}
                  className="flex-1 py-2 rounded-xl text-sm font-bold transition-all"
                  style={{
                    background: value.fontSize === fs.value ? '#6366F1' : 'rgba(0,0,0,0.04)',
                    color: value.fontSize === fs.value ? '#fff' : '#374151',
                    border: value.fontSize === fs.value ? 'none' : '1px solid rgba(0,0,0,0.08)',
                  }}
                >
                  {fs.label}
                </button>
              ))}
            </div>
          </div>

          {/* Font Family */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              Font Style
            </p>
            <div className="flex gap-2">
              {FONT_FAMILIES.map((ff) => (
                <button
                  key={ff.value}
                  type="button"
                  onClick={() => update({ fontFamily: ff.value })}
                  className="flex-1 py-2.5 rounded-xl text-sm transition-all"
                  style={{
                    fontFamily: ff.preview,
                    fontWeight: value.fontFamily === ff.value ? 700 : 500,
                    background: value.fontFamily === ff.value ? '#6366F1' : 'rgba(0,0,0,0.04)',
                    color: value.fontFamily === ff.value ? '#fff' : '#374151',
                    border: value.fontFamily === ff.value ? 'none' : '1px solid rgba(0,0,0,0.08)',
                  }}
                >
                  {ff.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              Custom Colors
            </p>
            <div className="space-y-2.5">
              {[
                { key: 'accentColor' as const, label: 'Accent' },
                { key: 'bgColor' as const,     label: 'Background' },
                { key: 'textColor' as const,   label: 'Text' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between gap-3">
                  <span className="text-sm text-gray-600 w-24">{label}</span>
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="w-8 h-8 rounded-lg border border-gray-200 overflow-hidden cursor-pointer shrink-0"
                      style={{ backgroundColor: value[key] }}
                    >
                      <input
                        type="color"
                        value={value[key]}
                        onChange={(e) => update({ [key]: e.target.value, theme: 'custom' })}
                        className="w-10 h-10 -ml-1 -mt-1 cursor-pointer opacity-0 absolute"
                        style={{ width: '32px', height: '32px', opacity: 0, cursor: 'pointer' }}
                      />
                    </div>
                    <input
                      type="color"
                      value={value[key]}
                      onChange={(e) => update({ [key]: e.target.value, theme: 'custom' })}
                      className="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer shrink-0"
                      style={{ padding: '1px', backgroundColor: 'transparent' }}
                    />
                    <span className="text-xs font-mono text-gray-400 flex-1">{value[key]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reset */}
          <button
            type="button"
            onClick={reset}
            className="w-full py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors"
            style={{ border: '1px dashed rgba(0,0,0,0.12)' }}
          >
            Reset to default
          </button>

        </div>
      )}
    </div>
  );
}
