import { useState, useEffect } from 'react';
import { Plus, Package, Search, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Item } from '../lib/supabase';
import Navbar from '../components/Navbar';

interface DashboardPageProps {
  onNavigate: (page: string) => void;
}

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { profile } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    activeItems: 0,
    resolved: 0,
    recentActivity: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserItems();
  }, [profile]);

  const loadUserItems = async () => {
    if (!profile) return;

    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setItems(data || []);
      setStats({
        totalPosts: data?.length || 0,
        activeItems: data?.filter(item => item.status === 'active').length || 0,
        resolved: data?.filter(item => item.status === 'resolved').length || 0,
        recentActivity: data?.filter(item => {
          const itemDate = new Date(item.created_at);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return itemDate > weekAgo;
        }).length || 0,
      });
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'resolved':
        return 'bg-blue-100 text-blue-800';
      case 'claimed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'lost' ? 'text-red-600' : 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={onNavigate} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.full_name}!
          </h1>
          <p className="text-gray-600">Manage your lost and found items</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.totalPosts}</span>
            </div>
            <p className="text-gray-600 font-medium">Total Posts</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-8 w-8 text-green-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.activeItems}</span>
            </div>
            <p className="text-gray-600 font-medium">Active Items</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="h-8 w-8 text-cyan-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.resolved}</span>
            </div>
            <p className="text-gray-600 font-medium">Resolved</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <span className="text-3xl font-bold text-gray-900">{stats.recentActivity}</span>
            </div>
            <p className="text-gray-600 font-medium">This Week</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => onNavigate('post-lost')}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition flex items-center justify-between group"
          >
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-2">Report Lost Item</h3>
              <p className="text-red-100">Can't find something? Post it here</p>
            </div>
            <Plus className="h-12 w-12 group-hover:scale-110 transition" />
          </button>

          <button
            onClick={() => onNavigate('post-found')}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition flex items-center justify-between group"
          >
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-2">Report Found Item</h3>
              <p className="text-green-100">Found something? Help return it</p>
            </div>
            <Plus className="h-12 w-12 group-hover:scale-110 transition" />
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Posts</h2>
            <button
              onClick={() => onNavigate('search')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Search className="h-4 w-4" />
              <span>Search All Items</span>
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading your items...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-4">No items posted yet</p>
              <p className="text-gray-500">Start by reporting a lost or found item</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(`item-${item.id}`)}
                  className="w-full bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition text-left border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.item_name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(item.item_type)}`}>
                          {item.item_type.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{item.category}</span>
                        <span>•</span>
                        <span>{item.location}</span>
                        <span>•</span>
                        <span>{new Date(item.date_occurred).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.item_name}
                        className="w-20 h-20 object-cover rounded-lg ml-4"
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
