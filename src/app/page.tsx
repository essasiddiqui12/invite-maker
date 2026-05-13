import Link from 'next/link';
import { Navbar, Footer, Button } from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-gray-50/50">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-indigo-700">Free & No Signup Required</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                Create Beautiful{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Invitations
                </span>
                {' '}in Minutes
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                No design skills needed. Choose from professionally designed templates, customize your details, and share stunning invitations instantly.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/templates">
                  <Button size="lg" className="w-full sm:w-auto">
                    Browse Templates
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>

            {/* Preview Cards */}
            <div className="mt-16 sm:mt-20 flex justify-center gap-6 sm:gap-8 flex-wrap">
              <div className="w-40 sm:w-48 h-56 sm:h-64 bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 rounded-2xl shadow-2xl rotate-[-6deg] hover:rotate-0 transition-transform duration-500 border border-white/50" />
              <div className="w-40 sm:w-48 h-56 sm:h-64 bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 rounded-2xl shadow-2xl hover:rotate-0 transition-transform duration-500 border border-white/50" />
              <div className="w-40 sm:w-48 h-56 sm:h-64 bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-200 rounded-2xl shadow-2xl rotate-[6deg] hover:rotate-0 transition-transform duration-500 border border-white/50" />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white py-16 sm:py-20 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
                Three simple steps to your perfect invitation
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8 relative">
              {/* Connector line (desktop only) */}
              <div className="hidden sm:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200" />

              {[
                {
                  step: '1',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  ),
                  title: 'Pick a Template',
                  desc: 'Browse our collection and choose a design that fits your event.',
                },
                {
                  step: '2',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  ),
                  title: 'Fill in Your Details',
                  desc: 'Add your event name, date, time, location, and a personal message.',
                },
                {
                  step: '3',
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  ),
                  title: 'Share the Link',
                  desc: 'Get a unique link and send it to your guests — no app needed.',
                },
              ].map(({ step, icon, title, desc }) => (
                <div key={step} className="flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/25 z-10">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {icon}
                    </svg>
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-indigo-200 rounded-full text-xs font-bold text-indigo-600 flex items-center justify-center">
                      {step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="how-it-works" className="bg-white py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Why Choose InviteMaker?
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to create professional invitations effortlessly
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Feature 1 */}
              <div className="group bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-100/50 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Beautiful Templates
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Choose from professionally designed templates for any occasion - weddings, birthdays, parties, and more.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-100/50 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-shadow">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Fast & Easy
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Create your invitation in just a few minutes. No sign-up required - start creating immediately.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-100/50 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-pink-500/25 group-hover:shadow-pink-500/40 transition-shadow">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Easy to Share
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Share your invitation via a unique link. Send it to guests anywhere, anytime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white">500+</div>
                <div className="text-indigo-200 text-sm sm:text-base mt-1">Templates</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white">10K+</div>
                <div className="text-indigo-200 text-sm sm:text-base mt-1">Invitations Created</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white">Free</div>
                <div className="text-indigo-200 text-sm sm:text-base mt-1">No Hidden Costs</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Ready to Create Your Invitation?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Start with a beautiful template and create your perfect invitation today. It only takes a few minutes!
            </p>
            <Link href="/templates">
              <Button size="lg">
                Get Started Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}