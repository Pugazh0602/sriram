import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  student_id: string;
  full_name: string;
  role: 'student' | 'staff';
  phone?: string;
  created_at: string;
  updated_at: string;
};

export type Item = {
  id: string;
  user_id: string;
  item_type: 'lost' | 'found';
  item_name: string;
  description: string;
  category: 'Electronics' | 'Books' | 'Clothing' | 'Documents' | 'Others';
  location: string;
  date_occurred: string;
  image_url?: string;
  status: 'active' | 'resolved' | 'claimed';
  contact_preference: 'email' | 'phone';
  created_at: string;
  updated_at: string;
  profiles?: Profile;
};

export type Message = {
  id: string;
  item_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  item_id?: string;
  type: 'match' | 'message' | 'claim' | 'system';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
};
