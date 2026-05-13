import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900">InviteMaker</span>
            </div>
            <p className="text-gray-500 text-sm max-w-sm">
              Create beautiful, professional invitations in minutes. No design skills needed.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/templates" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
                  Browse Templates
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">
                  Create Invitation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-500 text-sm">Help Center</span>
              </li>
              <li>
                <span className="text-gray-500 text-sm">Contact Us</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} InviteMaker. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Free invitations</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>No signup required</span>
          </div>
        </div>
      </div>
    </footer>
  );
}