import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wxzmhucqnyrffvlxqgmw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4em1odWNxbnlyZmZ2bHhxZ213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NTAzNzAsImV4cCI6MjA3MTAyNjM3MH0.-wWlsbq60lGjKlPmTkErWLN5GoltqPq6JG_LOfNIH3I'

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