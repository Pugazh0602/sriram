import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import SearchPage from './pages/SearchPage';
import PostItemPage from './pages/PostItemPage';
import ItemDetailsPage from './pages/ItemDetailsPage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    if (user && currentPage === 'landing') {
      setCurrentPage('dashboard');
    } else if (!user && !['landing', 'login', 'signup', 'search'].includes(currentPage)) {
      setCurrentPage('landing');
    }
  }, [user]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentPage === 'landing') {
    return <LandingPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'login') {
    return <LoginPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'signup') {
    return <SignupPage onNavigate={handleNavigate} />;
  }

  if (!user) {
    return <LandingPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'dashboard') {
    return <DashboardPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'search') {
    return <SearchPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'post-lost') {
    return <PostItemPage onNavigate={handleNavigate} itemType="lost" />;
  }

  if (currentPage === 'post-found') {
    return <PostItemPage onNavigate={handleNavigate} itemType="found" />;
  }

  if (currentPage === 'notifications') {
    return <NotificationsPage onNavigate={handleNavigate} />;
  }

  if (currentPage.startsWith('item-')) {
    const itemId = currentPage.replace('item-', '');
    return <ItemDetailsPage onNavigate={handleNavigate} itemId={itemId} />;
  }

  if (currentPage.startsWith('messages-')) {
    const itemId = currentPage.replace('messages-', '');
    return <MessagesPage onNavigate={handleNavigate} itemId={itemId} />;
  }

  return <DashboardPage onNavigate={handleNavigate} />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
