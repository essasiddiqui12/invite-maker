'use client';

import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar, Footer, Button, Input, TextArea } from '@/components';
import { supabase } from '@/lib/supabase';
import LuxuryInvitation from '@/components/LuxuryInvitation';
import PremiumWeddingInvitation from '@/components/PremiumWeddingInvitation';
import BirthdayInvitation from '@/components/BirthdayInvitation';
import BabyShowerInvitation from '@/components/BabyShowerInvitation';
import GraduationInvitation from '@/components/GraduationInvitation';
import CorporateInvitation from '@/components/CorporateInvitation';

interface FormData {
  title: string;
  host_name: string;
  event_date: string;
  event_time: string;
  location: string;
  message: string;
}

interface FormErrors {
  title?: string;
  host_name?: string;
  event_date?: string;
  event_time?: string;
  location?: string;
}

interface Template {
  id: string;
  name: string;
  category: string;
}

// Wrapper that scales the real invitation component to fit the preview panel
function ScaledPreview({
  formData,
  category,
}: {
  formData: FormData;
  category: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.45);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setScale(containerWidth / 1024);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const sharedPreviewProps = {
    title: formData.title || "You're Invited!",
    hostName: formData.host_name || 'Your Name',
    date: formData.event_date || '2025-12-31',
    time: formData.event_time || '18:00',
    location: formData.location || 'Venue TBD',
    message: formData.message || undefined,
  };

  let previewComponent: ReactNode;
  if (category === 'wedding') {
    previewComponent = (
      <PremiumWeddingInvitation
        title={formData.title || "You're Invited!"}
        brideName={formData.host_name || 'Bride & Groom'}
        groomName=""
        date={formData.event_date || '2025-12-31'}
        time={formData.event_time || '18:00'}
        location={formData.location || 'Venue TBD'}
        message={formData.message}
      />
    );
  } else if (category === 'birthday') {
    previewComponent = <BirthdayInvitation {...sharedPreviewProps} />;
  } else if (category === 'baby') {
    previewComponent = <BabyShowerInvitation {...sharedPreviewProps} />;
  } else if (category === 'graduation') {
    previewComponent = <GraduationInvitation {...sharedPreviewProps} />;
  } else if (category === 'corporate') {
    previewComponent = <CorporateInvitation {...sharedPreviewProps} />;
  } else {
    previewComponent = (
      <LuxuryInvitation
        title={formData.title || "You're Invited!"}
        hostName={formData.host_name || 'Your Name'}
        date={formData.event_date || '2025-12-31'}
        time={formData.event_time || '18:00'}
        location={formData.location || 'Venue TBD'}
        message={formData.message || undefined}
      />
    );
  }

  // Estimated height of the real component at 1024px width
  const realHeight = 900;

  return (
    <div ref={containerRef} className="w-full overflow-hidden rounded-2xl">
      <div
        style={{
          width: '1024px',
          height: `${realHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {/* Remove pt-14 that's meant for the fixed ShareBar */}
        <div className="[&_#invitation-content]:pt-0">
          {previewComponent}
        </div>
      </div>
      {/* Spacer to match scaled height */}
      <div style={{ height: `${realHeight * scale}px` }} />
    </div>
  );
}

export default function CreatePage() {
  const router = useRouter();
  const params = useParams();
  const templateId = params.template as string;

  const [loading, setLoading] = useState(false);
  const [templateLoading, setTemplateLoading] = useState(true);
  const [template, setTemplate] = useState<Template | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    host_name: '',
    event_date: '',
    event_time: '',
    location: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    async function fetchTemplate() {
      const { data, error } = await supabase
        .from('templates')
        .select('id, name, category')
        .eq('id', templateId)
        .single();
      if (error || !data) setTemplate(null);
      else setTemplate(data);
      setTemplateLoading(false);
    }
    if (templateId) fetchTemplate();
  }, [templateId]);

  useEffect(() => {
    if (template && !formData.title) {
      setFormData((prev) => ({ ...prev, title: "You're Invited!" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.host_name.trim()) newErrors.host_name = 'Host name is required';
    if (!formData.event_date.trim()) newErrors.event_date = 'Event date is required';
    if (!formData.event_time.trim()) newErrors.event_time = 'Event time is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!validateForm()) return;
    setLoading(true);
    try {
      const { data, error: insertError } = await supabase
        .from('invitations')
        .insert({
          template: templateId,
          title: formData.title,
          host_name: formData.host_name,
          event_date: formData.event_date,
          event_time: formData.event_time,
          location: formData.location,
          message: formData.message,
        })
        .select()
        .single();
      if (insertError) throw new Error(insertError.message);
      if (data) router.push(`/invite/${data.id}`);
    } catch (err) {
      console.error('Error creating invitation:', err);
      setError('Failed to create invitation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (templateLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Template Not Found</h1>
            <p className="text-gray-500 mb-6">The template you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/templates"><Button>Back to Templates</Button></Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1">
        {/* Header bar */}
        <div className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/templates"
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Templates
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-sm font-semibold text-gray-900">{template.name}</span>
            </div>

            <button
              type="button"
              onClick={() => setShowMobilePreview(!showMobilePreview)}
              className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {showMobilePreview ? 'Hide Preview' : 'Preview'}
            </button>
          </div>
        </div>

        {/* Mobile preview */}
        {showMobilePreview && (
          <div className="lg:hidden bg-gray-100 border-b border-gray-200 p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest text-center mb-3">Live Preview</p>
            <ScaledPreview formData={formData} category={template.category} />
          </div>
        )}

        {/* Two-column layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="flex gap-8 items-start">

            {/* LEFT: Form */}
            <div className="w-full lg:w-[460px] shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                <div className="p-6 sm:p-8">
                  <h1 className="text-xl font-bold text-gray-900 mb-1">Customize Your Invitation</h1>
                  <p className="text-sm text-gray-400 mb-6">
                    Using <span className="font-semibold text-indigo-600">{template.name}</span> template
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3 text-sm">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                      </div>
                    )}

                    <Input label="Event Title" name="title" placeholder="You're Invited!" value={formData.title} onChange={handleChange} error={errors.title} required />
                    <Input label="Host Name" name="host_name" placeholder="John & Jane" value={formData.host_name} onChange={handleChange} error={errors.host_name} required />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Event Date" name="event_date" type="date" value={formData.event_date} onChange={handleChange} error={errors.event_date} required />
                      <Input label="Event Time" name="event_time" type="time" value={formData.event_time} onChange={handleChange} error={errors.event_time} required />
                    </div>
                    <Input label="Location" name="location" placeholder="123 Main Street, City" value={formData.location} onChange={handleChange} error={errors.location} required />
                    <TextArea label="Personal Message (Optional)" name="message" placeholder="Add a warm message for your guests..." value={formData.message} onChange={handleChange} rows={3} />

                    <div className="pt-2">
                      <Button type="submit" size="lg" className="w-full" loading={loading}>
                        Create Invitation
                      </Button>
                      <p className="text-center text-xs text-gray-400 mt-3">
                        No account required · Free forever
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* RIGHT: Live Preview — exact same component, scaled */}
            <div className="hidden lg:flex flex-1 flex-col min-w-0">
              <div className="sticky top-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Live Preview</p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-green-600 font-medium bg-green-50 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Updates as you type
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xl shadow-gray-200/50">
                  <ScaledPreview formData={formData} category={template.category} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
