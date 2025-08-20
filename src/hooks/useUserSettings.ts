import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { UserSettings } from '../lib/supabase';
import { encryptApiKey, decryptApiKey } from '../utils/encryption';

export const useUserSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchSettings();
    } else {
      setSettings(null);
      setLoading(false);
    }
  }, [user]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Settings don't exist, create default settings
        const defaultSettings = {
          user_id: user!.id,
          default_provider: 'OpenAI',
          default_model: 'GPT-4',
          default_tone: 'professional',
          email_notifications: true,
          theme: 'light',
          selected_model: 'gpt-4',
          base_url: 'https://api.aimlapi.com/v1'
        };

        const { data: newSettings, error: createError } = await supabase
          .from('user_settings')
          .insert(defaultSettings)
          .select()
          .single();

        if (createError) throw createError;
        setSettings(newSettings);
      } else if (error) {
        throw error;
      } else {
        // Decrypt API key if it exists
        if (data.api_key) {
          data.api_key = decryptApiKey(data.api_key);
        }
        setSettings(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (updates: Partial<UserSettings>) => {
    if (!user || !settings) throw new Error('User not authenticated or settings not loaded');

    try {
      // Encrypt API key if it's being updated
      const updatesToSend = { ...updates };
      if (updates.api_key !== undefined) {
        updatesToSend.api_key = updates.api_key ? encryptApiKey(updates.api_key) : null;
      }

      const { data, error } = await supabase
        .from('user_settings')
        .update(updatesToSend)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      // Decrypt API key for local state
      if (data.api_key) {
        data.api_key = decryptApiKey(data.api_key);
      }
      
      setSettings(data);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update settings');
    }
  };

  const deleteApiKey = async () => {
    return updateSettings({ 
      api_key: null, 
      api_key_name: null 
    });
  };

  return {
    settings,
    loading,
    error,
    updateSettings,
    deleteApiKey,
    refetch: fetchSettings
  };
};