import { supabase } from './supabase'
import type { User, SavedPrompt, UserSettings } from './supabase'

export class DatabaseService {
  // User Profile Operations
  async getUserProfile(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in getUserProfile:', error)
      return null
    }
  }

  async createUserProfile(userId: string, email: string, name: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          id: userId,
          email,
          name
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating user profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in createUserProfile:', error)
      return null
    }
  }

  async updateUserProfile(userId: string, updates: Partial<User>): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        console.error('Error updating user profile:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in updateUserProfile:', error)
      return null
    }
  }

  // Saved Prompts Operations
  async getSavedPrompts(userId: string): Promise<SavedPrompt[]> {
    try {
      const { data, error } = await supabase
        .from('saved_prompts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching saved prompts:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in getSavedPrompts:', error)
      return []
    }
  }

  async savePrompt(prompt: Omit<SavedPrompt, 'id' | 'created_at' | 'updated_at'>): Promise<SavedPrompt | null> {
    try {
      const { data, error } = await supabase
        .from('saved_prompts')
        .insert(prompt)
        .select()
        .single()

      if (error) {
        console.error('Error saving prompt:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in savePrompt:', error)
      return null
    }
  }

  async updatePrompt(promptId: string, updates: Partial<SavedPrompt>): Promise<SavedPrompt | null> {
    try {
      const { data, error } = await supabase
        .from('saved_prompts')
        .update(updates)
        .eq('id', promptId)
        .select()
        .single()

      if (error) {
        console.error('Error updating prompt:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in updatePrompt:', error)
      return null
    }
  }

  async deletePrompt(promptId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('saved_prompts')
        .delete()
        .eq('id', promptId)

      if (error) {
        console.error('Error deleting prompt:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in deletePrompt:', error)
      return false
    }
  }

  async getPromptById(promptId: string): Promise<SavedPrompt | null> {
    try {
      const { data, error } = await supabase
        .from('saved_prompts')
        .select('*')
        .eq('id', promptId)
        .single()

      if (error) {
        console.error('Error fetching prompt:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in getPromptById:', error)
      return null
    }
  }

  // User Settings Operations
  async getUserSettings(userId: string): Promise<UserSettings | null> {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error && error.code === 'PGRST116') {
        // User settings don't exist, create default settings
        return await this.createDefaultUserSettings(userId)
      }

      if (error) {
        console.error('Error fetching user settings:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in getUserSettings:', error)
      return null
    }
  }

  async createDefaultUserSettings(userId: string): Promise<UserSettings | null> {
    try {
      const defaultSettings = {
        user_id: userId,
        default_provider: 'OpenAI',
        default_model: 'GPT-4',
        default_tone: 'professional',
        email_notifications: true,
        theme: 'light',
        selected_model: 'gpt-4',
        base_url: 'https://api.openai.com/v1'
      }

      const { data, error } = await supabase
        .from('user_settings')
        .insert(defaultSettings)
        .select()
        .single()

      if (error) {
        console.error('Error creating default user settings:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in createDefaultUserSettings:', error)
      return null
    }
  }

  async updateUserSettings(userId: string, updates: Partial<UserSettings>): Promise<UserSettings | null> {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single()

      if (error) {
        console.error('Error updating user settings:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in updateUserSettings:', error)
      return null
    }
  }

  // Search and Filter Operations
  async searchPrompts(userId: string, searchTerm: string): Promise<SavedPrompt[]> {
    try {
      const { data, error } = await supabase
        .from('saved_prompts')
        .select('*')
        .eq('user_id', userId)
        .or(`title.ilike.%${searchTerm}%,input_text.ilike.%${searchTerm}%,enhanced_text.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error searching prompts:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in searchPrompts:', error)
      return []
    }
  }

  async getPromptsByToolType(userId: string, toolType: string): Promise<SavedPrompt[]> {
    try {
      const { data, error } = await supabase
        .from('saved_prompts')
        .select('*')
        .eq('user_id', userId)
        .eq('tool_type', toolType)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching prompts by tool type:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error in getPromptsByToolType:', error)
      return []
    }
  }

  // Analytics Operations
  async getPromptStats(userId: string): Promise<{
    totalPrompts: number
    toolTypeBreakdown: { [key: string]: number }
    recentActivity: SavedPrompt[]
  }> {
    try {
      const [promptsResult, recentResult] = await Promise.all([
        supabase
          .from('saved_prompts')
          .select('tool_type')
          .eq('user_id', userId),
        supabase
          .from('saved_prompts')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(10)
      ])

      if (promptsResult.error || recentResult.error) {
        console.error('Error fetching prompt stats:', promptsResult.error || recentResult.error)
        return { totalPrompts: 0, toolTypeBreakdown: {}, recentActivity: [] }
      }

      const totalPrompts = promptsResult.data?.length || 0
      const toolTypeBreakdown = (promptsResult.data || []).reduce((acc, prompt) => {
        acc[prompt.tool_type] = (acc[prompt.tool_type] || 0) + 1
        return acc
      }, {} as { [key: string]: number })

      return {
        totalPrompts,
        toolTypeBreakdown,
        recentActivity: recentResult.data || []
      }
    } catch (error) {
      console.error('Error in getPromptStats:', error)
      return { totalPrompts: 0, toolTypeBreakdown: {}, recentActivity: [] }
    }
  }
}

export const databaseService = new DatabaseService()
