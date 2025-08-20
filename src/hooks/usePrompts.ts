import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { SavedPrompt } from '../lib/supabase';

export const usePrompts = () => {
  const { user } = useAuth();
  const [prompts, setPrompts] = useState<SavedPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchPrompts();
    } else {
      setPrompts([]);
      setLoading(false);
    }
  }, [user]);

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('saved_prompts')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrompts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prompts');
    } finally {
      setLoading(false);
    }
  };

  const savePrompt = async (promptData: Omit<SavedPrompt, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('saved_prompts')
        .insert({
          ...promptData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      
      setPrompts(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to save prompt');
    }
  };

  const updatePrompt = async (id: string, updates: Partial<SavedPrompt>) => {
    try {
      const { data, error } = await supabase
        .from('saved_prompts')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()
        .single();

      if (error) throw error;
      
      setPrompts(prev => prev.map(p => p.id === id ? data : p));
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update prompt');
    }
  };

  const deletePrompt = async (id: string) => {
    try {
      const { error } = await supabase
        .from('saved_prompts')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;
      
      setPrompts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete prompt');
    }
  };

  return {
    prompts,
    loading,
    error,
    savePrompt,
    updatePrompt,
    deletePrompt,
    refetch: fetchPrompts
  };
};