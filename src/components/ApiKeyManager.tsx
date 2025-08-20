import React, { useState } from 'react';
import { Key, Eye, EyeOff, Save, Trash2, Plus, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';
import { validateApiKey, validateUrl, maskApiKey } from '../utils/encryption';
import type { UserSettings } from '../lib/supabase';

interface ApiKeyManagerProps {
  settings: UserSettings | null;
  onUpdateSettings: (updates: Partial<UserSettings>) => Promise<UserSettings>;
  onDeleteApiKey: () => Promise<UserSettings>;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ 
  settings, 
  onUpdateSettings, 
  onDeleteApiKey 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [formData, setFormData] = useState({
    api_key: '',
    api_key_name: settings?.api_key_name || '',
    selected_model: settings?.selected_model || 'gpt-4',
    base_url: settings?.base_url || 'https://api.aimlapi.com/v1'
  });
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const modelOptions = [
    'gpt-3.5-turbo',
    'gpt-4',
    'gpt-4-turbo',
    'gpt-5',
    'claude-3-haiku',
    'claude-3-sonnet',
    'claude-3-opus',
    'gemini-pro',
    'gemini-ultra'
  ];

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    if (formData.api_key) {
      const apiKeyError = validateApiKey(formData.api_key);
      if (apiKeyError) errors.api_key = apiKeyError;
    }
    
    const urlError = validateUrl(formData.base_url);
    if (urlError) errors.base_url = urlError;
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setSaving(true);
    try {
      await onUpdateSettings({
        api_key: formData.api_key || null,
        api_key_name: formData.api_key_name || null,
        selected_model: formData.selected_model,
        base_url: formData.base_url
      });
      
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save API settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your API key? This action cannot be undone.')) {
      return;
    }
    
    setSaving(true);
    try {
      await onDeleteApiKey();
      setFormData(prev => ({ ...prev, api_key: '', api_key_name: '' }));
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to delete API key:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = () => {
    setFormData({
      api_key: settings?.api_key || '',
      api_key_name: settings?.api_key_name || '',
      selected_model: settings?.selected_model || 'gpt-4',
      base_url: settings?.base_url || 'https://api.aimlapi.com/v1'
    });
    setIsEditing(true);
    setValidationErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setValidationErrors({});
    setShowApiKey(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Key className="h-5 w-5 text-purple-600" />
            <span>API Key Management</span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Configure your AI provider API keys and settings
          </p>
        </div>
        
        {saveSuccess && (
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Settings saved!</span>
          </div>
        )}
      </div>

      {!isEditing ? (
        // Display Mode
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          {settings?.api_key ? (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    API Key Name
                  </label>
                  <p className="text-sm text-gray-900">
                    {settings.api_key_name || 'Unnamed API Key'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    API Key
                  </label>
                  <p className="text-sm text-gray-900 font-mono">
                    {maskApiKey(settings.api_key)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Selected Model
                  </label>
                  <p className="text-sm text-gray-900">
                    {settings.selected_model}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Base URL
                  </label>
                  <p className="text-sm text-gray-900 break-all">
                    {settings.base_url}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm font-medium"
                >
                  Edit Configuration
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium flex items-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete API Key</span>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Key className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No API Key Configured</h4>
              <p className="text-gray-600 mb-6">
                Add your AI provider API key to enable enhanced prompt generation
              </p>
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add API Key
              </button>
            </div>
          )}
        </div>
      ) : (
        // Edit Mode
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key Name (Optional)
              </label>
              <input
                type="text"
                value={formData.api_key_name}
                onChange={(e) => handleInputChange('api_key_name', e.target.value)}
                placeholder="e.g., My OpenAI Key"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Give your API key a memorable name
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key *
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={formData.api_key}
                  onChange={(e) => handleInputChange('api_key', e.target.value)}
                  placeholder="Enter your API key"
                  className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    validationErrors.api_key ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showApiKey ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {validationErrors.api_key && (
                <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{validationErrors.api_key}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selected Model *
              </label>
              <select
                value={formData.selected_model}
                onChange={(e) => handleInputChange('selected_model', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {modelOptions.map(model => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base URL *
              </label>
              <input
                type="url"
                value={formData.base_url}
                onChange={(e) => handleInputChange('base_url', e.target.value)}
                placeholder="https://api.aimlapi.com/v1"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  validationErrors.base_url ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {validationErrors.base_url && (
                <p className="text-xs text-red-600 mt-1 flex items-center space-x-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>{validationErrors.base_url}</span>
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                API endpoint URL for your AI provider
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-blue-900">Security Notice</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Your API key will be encrypted before storage. Never share your API keys with others.
                  <a 
                    href="https://platform.openai.com/api-keys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center ml-2 text-blue-600 hover:text-blue-800"
                  >
                    Manage API Keys
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeyManager;