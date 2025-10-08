import { Package, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  onNavigate: (page: string) => void;
  unreadCount?: number;
}

export default function Navbar({ onNavigate, unreadCount = 0 }: NavbarProps) {
  const { signOut, profile } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onNavigate('landing');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2 hover:opacity-80 transition"
          >
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Lost & Found</span>
          </button>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate('search')}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Search
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('notifications')}
              className="relative text-gray-600 hover:text-gray-900"
            >
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <User className="h-6 w-6" />
                <span className="font-medium">{profile?.full_name || 'User'}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 invisible group-hover:visible">
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
