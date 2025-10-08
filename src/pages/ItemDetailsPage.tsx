import { useState, useEffect } from 'react';
import { MapPin, Calendar, User, Mail, Phone, MessageCircle, Package, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Item } from '../lib/supabase';
import Navbar from '../components/Navbar';

interface ItemDetailsPageProps {
  onNavigate: (page: string) => void;
  itemId: string;
}

export default function ItemDetailsPage({ onNavigate, itemId }: ItemDetailsPageProps) {
  const { profile } = useAuth();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadItem();
  }, [itemId]);

  const loadItem = async () => {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*, profiles(full_name, student_id, phone)')
        .eq('id', itemId)
        .maybeSingle();

      if (error) throw error;
      setItem(data);
    } catch (error) {
      console.error('Error loading item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsResolved = async () => {
    if (!item || item.user_id !== profile?.id) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('items')
        .update({ status: 'resolved' })
        .eq('id', itemId);

      if (error) throw error;

      await loadItem();
    } catch (error) {
      console.error('Error updating item:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleContactOwner = () => {
    onNavigate(`messages-${itemId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onNavigate={onNavigate} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading item details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onNavigate={onNavigate} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Item not found</p>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = item.user_id === profile?.id;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={onNavigate} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate('search')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Search</span>
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div>
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.item_name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <Package className="h-24 w-24 text-gray-400" />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    item.item_type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {item.item_type.toUpperCase()}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    item.status === 'active' ? 'bg-green-100 text-green-800' :
                    item.status === 'resolved' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status.toUpperCase()}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.item_name}</h1>

                <div className="flex items-center space-x-2 text-gray-600 mb-6">
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">{item.description}</p>
              </div>

              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">{item.location}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.item_type === 'lost' ? 'Date Lost' : 'Date Found'}
                    </p>
                    <p className="text-gray-600">
                      {new Date(item.date_occurred).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Posted By</p>
                    <p className="text-gray-600">{item.profiles?.full_name}</p>
                    <p className="text-gray-500 text-sm">{item.profiles?.student_id}</p>
                  </div>
                </div>
              </div>

              {!isOwner && item.status === 'active' && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    {item.contact_preference === 'email' && (
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Mail className="h-5 w-5" />
                        <span>Contact via email</span>
                      </div>
                    )}
                    {item.contact_preference === 'phone' && item.profiles?.phone && (
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Phone className="h-5 w-5" />
                        <span>{item.profiles.phone}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleContactOwner}
                    className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Send Message</span>
                  </button>
                </div>
              )}

              {isOwner && item.status === 'active' && (
                <div className="border-t border-gray-200 pt-6">
                  <button
                    onClick={handleMarkAsResolved}
                    disabled={updating}
                    className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>{updating ? 'Updating...' : 'Mark as Returned'}</span>
                  </button>
                </div>
              )}

              {item.status === 'resolved' && (
                <div className="border-t border-gray-200 pt-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">Item Returned</p>
                      <p className="text-green-700 text-sm">This item has been successfully returned to its owner</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
