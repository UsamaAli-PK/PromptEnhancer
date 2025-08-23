import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
	console.warn('Supabase env vars are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface User {
  id: string
  email: string
  name: string
  created_at: string
  updated_at: string
}

export interface SavedPrompt {
  id: string
  user_id: string
  title: string
  input_text: string
  enhanced_text: string
  tool_type: string
  provider: string
  model: string
  tone: string
  output_format: string
  file_attachments?: string[]
  tags: string[]
  created_at: string
  updated_at: string
}

export interface UserSettings {
  id: string
  user_id: string
  default_provider: string
  default_model: string
  default_tone: string
  email_notifications: boolean
  theme: string
  api_key?: string
  selected_model: string
  base_url: string
  api_key_name?: string
  created_at: string
  updated_at: string
}