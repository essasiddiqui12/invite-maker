import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { Navbar, Footer, TemplateCard } from '@/components';
import { Template } from '@/types/invitation';

interface SupabaseTemplate {
  id: string;
  name: string;
  category: string | null;
  image_url: string | null;
  description: string | null;
  created_at: string;
}

export const metadata: Metadata = {
  title: 'Templates - Choose Your Invitation Design',
  description: 'Browse our collection of beautiful invitation templates. Choose from classic, modern, floral, rustic, and more designs for your special event.',
};

async function getTemplates(): Promise<SupabaseTemplate[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching templates:', error);
    return [];
  }

  return (data as SupabaseTemplate[]) || [];
}

export default async function TemplatesPage() {
  const templates = await getTemplates();

  const templateCards: Template[] = templates.map((t) => ({
    id: t.id,
    name: t.name,
    description: t.description || t.category || '',
    preview: t.image_url || '',
    category: t.category || '',
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-b from-white to-gray-50/50 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                Choose Your{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Perfect Template
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Select from our professionally designed templates. Every template can be customized to match your event style.
              </p>
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-12 sm:py-16 bg-gray-50/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {templateCards.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">No templates found.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {templateCards.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              All templates can be customized with your own text and details.
              Pick one that matches your event style - you can always change it later!
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}