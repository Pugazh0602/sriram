import { Search, Package, Users, TrendingUp } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Campus Lost & Found</span>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Never Lose Track of Your Belongings Again
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A centralized platform connecting students and staff to reunite lost items with their rightful owners
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => onNavigate('search')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-lg transition flex items-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Search Items</span>
            </button>
            <button
              onClick={() => onNavigate('signup')}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-lg transition flex items-center space-x-2"
            >
              <Package className="h-5 w-5" />
              <span>Report Item</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
            <p className="text-gray-600">Items Recovered</p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">1,200+</h3>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="bg-cyan-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-cyan-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">95%</h3>
            <p className="text-gray-600">Success Rate</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Report Lost or Found Item</h3>
              <p className="text-gray-600">
                Create a post with details, location, and photo of the item
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Matched</h3>
              <p className="text-gray-600">
                Our system notifies you when similar items are posted
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Securely</h3>
              <p className="text-gray-600">
                Message the finder or owner through our secure platform
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community and help reunite lost items with their owners
          </p>
          <button
            onClick={() => onNavigate('signup')}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-medium text-lg transition"
          >
            Create Free Account
          </button>
        </div>
      </div>

      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <p className="text-gray-400">
                Campus Lost & Found helps students and staff recover lost items efficiently and securely.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => onNavigate('search')} className="hover:text-white">Search Items</button></li>
                <li><button onClick={() => onNavigate('login')} className="hover:text-white">Login</button></li>
                <li><button onClick={() => onNavigate('signup')} className="hover:text-white">Sign Up</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">support@campuslostandfound.edu</p>
              <p className="text-gray-400">Emergency: (555) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Campus Lost & Found. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
