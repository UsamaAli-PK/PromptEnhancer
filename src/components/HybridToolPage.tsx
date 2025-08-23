import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sparkles, 
  Copy, 
  RefreshCw, 
  Settings, 
  Wand2, 
  RotateCcw, 
  Save, 
  ExternalLink,
  Upload,
  X,
  File,
  Image,
  FileText,
  Database,
  Code,
  Download,
  Plus
} from 'lucide-react';
import Navbar from './Navbar';
import toolsConfig from '../config/tools.json';
import prompts from '../config/prompts.json';
import { useAuth } from '../contexts/AuthContext';
import { databaseService } from '../lib/database';
import type { SavedPrompt } from '../lib/supabase';
import { useUserSettings } from '../hooks/useUserSettings';

interface Tool {
  id: string;
  name: string;
  description: string;
  categories: string[];
  providers: string[];
  models: { [key: string]: string[] };
  agents?: string[];
  allowCustomProvider: boolean;
  allowCustomModel: boolean;
  allowCustomAgent: boolean;
  fileUploadRules: {
    allowedTypes: string[];
    maxSizeMB: number;
  };
  outputFormats: {
    options: string[];
    defaultFormat: string;
  };
}

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
  content?: string;
  type: 'text' | 'image' | 'other';
}

// Helper to replace {{placeholders}} in templates
const replacePlaceholders = (template: string, vars: Record<string, string>): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (_match, key) => (vars[key] ?? ''));
};

const HybridToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const { user } = useAuth();
  const { settings, loading: settingsLoading } = useUserSettings();
  const [tool, setTool] = useState<Tool | null>(null);
  const [inputPrompt, setInputPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Configuration states
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [selectedOutputFormat, setSelectedOutputFormat] = useState('');
  const [customProvider, setCustomProvider] = useState('');
  const [customModel, setCustomModel] = useState('');
  const [customAgent, setCustomAgent] = useState('');
  const [showCustomProvider, setShowCustomProvider] = useState(false);
  const [showCustomModel, setShowCustomModel] = useState(false);
  const [showCustomAgent, setShowCustomAgent] = useState(false);
  
  // File upload states
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const toneOptions = [
    'professional', 'casual', 'friendly', 'educational', 'funny', 
    'marketing', 'storytelling', 'technical', 'persuasive', 'creative'
  ];

  const isUserApiConfigured = !!(settings?.api_key && settings?.base_url);

  useEffect(() => {
    const foundTool = toolsConfig.tools.find(t => t.id === toolId);
    if (foundTool) {
      setTool(foundTool);
      setSelectedProvider(foundTool.providers[0] || '');
      setSelectedOutputFormat(foundTool.outputFormats.defaultFormat);
      if (foundTool.agents && foundTool.agents.length > 0) {
        setSelectedAgent(foundTool.agents[0]);
      }
    }
  }, [toolId]);

  useEffect(() => {
    if (tool && selectedProvider && tool.models[selectedProvider]) {
      setSelectedModel(tool.models[selectedProvider][0] || '');
    }
  }, [selectedProvider, tool]);

  const getFileIcon = (fileName: string) => {
    const extension = fileName.toLowerCase().split('.').pop();
    
    if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].some(ext => fileName.toLowerCase().endsWith(ext))) {
      return <Image className="h-5 w-5 text-purple-500" />;
    }
    if (['.py', '.js', '.ts', '.java', '.cpp', '.json'].some(ext => fileName.toLowerCase().endsWith(ext))) {
      return <Code className="h-5 w-5 text-blue-500" />;
    }
    if (['.csv', '.sql', '.xlsx'].some(ext => fileName.toLowerCase().endsWith(ext))) {
      return <Database className="h-5 w-5 text-green-500" />;
    }
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  const isValidFileType = (fileName: string): boolean => {
    if (!tool) return false;
    return tool.fileUploadRules.allowedTypes.some(type => 
      fileName.toLowerCase().endsWith(type.toLowerCase())
    );
  };

  const getFileType = (file: File): 'text' | 'image' | 'other' => {
    const extension = file.name.toLowerCase().split('.').pop();
    
    if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(`.${extension}`)) {
      return 'image';
    }
    if (['.txt', '.md', '.py', '.js', '.ts', '.java', '.cpp', '.json', '.csv', '.sql', '.docx', '.pdf'].includes(`.${extension}`)) {
      return 'text';
    }
    return 'other';
  };

  const processFile = async (file: File): Promise<UploadedFile> => {
    const fileType = getFileType(file);
    const uploadedFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      file,
      type: fileType
    };

    if (fileType === 'image') {
      uploadedFile.preview = URL.createObjectURL(file);
    }

    if (fileType === 'text') {
      try {
        const text = await file.text();
        uploadedFile.content = text;
      } catch (error) {
        console.error('Error reading file content:', error);
      }
    }

    return uploadedFile;
  };

  const handleFiles = async (files: FileList) => {
    if (!tool) return;

    const validFiles = Array.from(files).filter(file => {
      if (!isValidFileType(file.name)) {
        alert(`File type not allowed: ${file.name}`);
        return false;
      }
      if (file.size > tool.fileUploadRules.maxSizeMB * 1024 * 1024) {
        alert(`File too large: ${file.name} (max ${tool.fileUploadRules.maxSizeMB}MB)`);
        return false;
      }
      return true;
    });

    const processedFiles = await Promise.all(validFiles.map(processFile));
    setUploadedFiles(prev => [...prev, ...processedFiles]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleEnhance = async () => {
    if (!tool) return;
    if (!inputPrompt.trim()) return;

    if (!isUserApiConfigured) {
      alert('Please add your API key and base URL in Profile → API Keys before generating.');
      return;
    }
    
    setLoading(true);
    try {
      // Prepare uploaded files block for template
      const filesBlock = uploadedFiles
        .filter(f => !!f.content)
        .map(f => `--- File: ${f.file.name} ---\n${f.content}\n--- End of ${f.file.name} ---`)
        .join('\n\n');

      const provider = showCustomProvider ? customProvider : selectedProvider;
      const model = showCustomModel ? customModel : selectedModel;
      const agent = showCustomAgent ? customAgent : selectedAgent;
      const output_format = selectedOutputFormat;
      const tone = selectedTone;

      // Gather template
      // @ts-expect-error json typing
      const tmpl = prompts?.templates?.[tool.id];
      const optimized: string | undefined = tmpl?.optimized;

      // Build placeholder map (include common fields; others default to '')
      const vars: Record<string, string> = {
        provider: provider || '',
        model: model || '',
        tone: tone || '',
        output_format: output_format || '',
        user_input: inputPrompt || '',
        uploaded_files: filesBlock || '',
        coding_agent: agent || '',
        // Optional extras used by some templates
        language: '', framework: '', libraries: '', environment: '', io_contracts: '', constraints: '', style_guide: '', codebase_context: '',
        style: '', aspect_ratio: '', camera_settings: '', lighting: '', color_palette: '', mood: '', details: '', negative_prompts: '', quality: '',
        audience: '', length: '', key_points: '', sources: '',
        platform: '', hashtags: '', cta: '',
        usp: '', product: '', benefits: '', features: '', social_proof: '',
        database: '', schema: '', samples: '', query_type: '', expected_output: '',
        recipient: '', context: '', signature: '',
        seo_keywords: '', outline: '', references: '',
        target_url: '', primary_keyword: '', secondary_keywords: '', brand: '',
        duration: '', hook_style: '',
        job_description: '', experience: '', achievements: '', skills: '', format_pref: '',
        level: '', objectives: '', prerequisites: '', materials: '', assessment: '', question_types: '', difficulty: '', num_questions: '', include_answers: '',
        key_questions: '', depth: '', thesis: '', citation_style: '', key_concepts: '', brand_voice: '', differentiators: '', sections: '', context_channel: '', uvp: '',
        company: '', headline_angle: '', facts: '', quotes: '', media_contact: '', date: '',
        composition: '', lens_camera: '', location: '', time_weather: '', color_mood: '',
        genre: '', setting: '', characters: '', pov_tense: '', themes: ''
      };

      const compiledPrompt = optimized ? replacePlaceholders(optimized, vars) : inputPrompt;

      // Lazy import API service
      const { apiService } = await import('../lib/api');

      const response = await apiService.enhancePromptWithUserConfig(
        {
          prompt: compiledPrompt,
          provider,
          model,
          tone,
          outputFormat: output_format,
          toolType: tool.name
        },
        settings!.api_key!,
        settings!.base_url!
      );

      setEnhancedPrompt(response.enhancedPrompt);
      // Optionally auto-save can be added here
    } catch (error) {
      console.error('Enhancement error:', error);
      setEnhancedPrompt(`Error: ${error instanceof Error ? error.message : 'Failed to enhance prompt. Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  const generateToolSpecificPrompt = (tool: Tool, input: string, config: any): string => {
    const basePrompt = `Create ${config.outputFormat.toLowerCase()} content for: ${input}`;
    
    if (tool.categories.includes('Development')) {
      return `Generate ${config.model} optimized code that ${input}. Use ${config.provider} best practices, include proper error handling, documentation, and follow ${config.agent || 'industry standard'} conventions. Output format: ${config.outputFormat}.`;
    }
    
    if (tool.categories.includes('Design') || tool.categories.includes('Creative')) {
      return `Create a detailed ${config.tone} prompt for ${config.provider} ${config.model}: ${input}. Include specific details about composition, style, colors, and mood. Format for ${config.outputFormat} output.`;
    }
    
    if (tool.categories.includes('Writing') || tool.categories.includes('Content')) {
      return `Write ${config.tone} content about ${input} using ${config.provider} ${config.model}. Include clear structure, engaging introduction and conclusion. Output format: ${config.outputFormat}.`;
    }
    
    if (tool.categories.includes('Marketing') || tool.categories.includes('Social Media')) {
      return `Create ${config.tone} ${tool.name.toLowerCase()} content for ${input} using ${config.provider} ${config.model}. Focus on engagement, include relevant hashtags and call-to-action. Format: ${config.outputFormat}.`;
    }
    
    return `${basePrompt} using ${config.provider} ${config.model} with ${config.tone} tone. Output format: ${config.outputFormat}.`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(enhancedPrompt);
  };

  const handleImprovePrompt = () => {
    setInputPrompt(enhancedPrompt);
    setEnhancedPrompt('');
  };

  const handleSave = async () => {
    if (!user) {
      alert('Please log in to save prompts.');
      return;
    }
    if (!inputPrompt.trim() || !tool) return;

    setSaving(true);
    try {
      const promptData = {
        user_id: user.id,
        title: `${tool.name} - ${inputPrompt.substring(0, 50)}${inputPrompt.length > 50 ? '...' : ''}`,
        input_text: inputPrompt,
        enhanced_text: enhancedPrompt,
        tool_type: tool.name,
        provider: showCustomProvider ? customProvider : selectedProvider,
        model: showCustomModel ? customModel : selectedModel,
        tone: selectedTone,
        output_format: selectedOutputFormat,
        file_attachments: uploadedFiles
          .filter(f => f.content)
          .map(f => `${f.file.name}: ${f.content}`),
        tags: [tool.name, selectedTone, selectedOutputFormat]
      };

      await databaseService.savePrompt(promptData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving prompt:', error);
      alert('Failed to save prompt. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([enhancedPrompt], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${tool?.name.replace(/\s+/g, '-').toLowerCase()}-prompt.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!tool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Sparkles className="h-12 w-12 mx-auto mb-4 animate-spin" />
          <p className="text-xl">Tool not found</p>
          <Link to="/dashboard" className="text-cyan-400 hover:text-cyan-300 mt-4 inline-block">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <Navbar />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="p-3 glass border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </Link>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white">
                <Wand2 className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{tool.name}</h1>
                <p className="text-gray-300">{tool.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tool.categories.map(category => (
                    <span key={category} className="px-2 py-1 bg-white/10 text-xs text-gray-300 rounded-full">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <div className="glass-card rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Wand2 className="h-5 w-5 text-cyan-400" />
                <span>Your Input</span>
              </h2>
              <textarea
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder={`Describe what you want to create with ${tool.name}...`}
                className="w-full h-40 p-4 glass border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-400 resize-none transition-all duration-300"
              />
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  Be specific about your requirements for better results
                </p>
                <div className="text-sm text-gray-500">
                  {inputPrompt.length}/2000
                </div>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="glass-card rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Upload className="h-5 w-5 text-purple-400" />
                <span>File Upload</span>
              </h2>
              
              {/* Upload Area */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 mb-4 ${
                  dragActive
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-white/20 hover:border-purple-400 hover:bg-white/5'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept={tool.fileUploadRules.allowedTypes.join(',')}
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="space-y-2">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-sm font-medium text-white">
                      Drop files here or click to upload
                    </p>
                    <p className="text-xs text-gray-400">
                      Supported: {tool.fileUploadRules.allowedTypes.join(', ')}
                    </p>
                    <p className="text-xs text-gray-400">
                      Max size: {tool.fileUploadRules.maxSizeMB}MB per file
                    </p>
                  </div>
                </div>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white">Uploaded Files</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((uploadedFile) => (
                      <div
                        key={uploadedFile.id}
                        className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div className="flex-shrink-0">
                          {uploadedFile.type === 'image' && uploadedFile.preview ? (
                            <img
                              src={uploadedFile.preview}
                              alt={uploadedFile.file.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                          ) : (
                            getFileIcon(uploadedFile.file.name)
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {uploadedFile.file.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatFileSize(uploadedFile.file.size)}
                            {uploadedFile.content && (
                              <span className="ml-2 text-green-400">
                                • Content extracted
                              </span>
                            )}
                          </p>
                        </div>

                        <button
                          onClick={() => removeFile(uploadedFile.id)}
                          className="flex-shrink-0 p-1 text-gray-400 hover:text-red-400 transition-colors duration-200"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Output */}
            <div className="glass-card rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                  <span>Enhanced Output</span>
                </h2>
                {enhancedPrompt && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleDownload}
                      className="px-3 py-2 glass border border-white/20 text-white rounded-lg text-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                    >
                      <Download className="h-4 w-4 inline mr-1" />
                      Download
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                        saved 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'glass border border-white/20 text-white hover:bg-white/20'
                      } ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Save className={`h-4 w-4 inline mr-1 ${saving ? 'animate-spin' : ''}`} />
                      {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
                    </button>
                    <button
                      onClick={handleCopy}
                      className="px-3 py-2 glass border border-white/20 text-white rounded-lg text-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                    >
                      <Copy className="h-4 w-4 inline mr-1" />
                      Copy
                    </button>
                    <button
                      onClick={handleImprovePrompt}
                      className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
                    >
                      <RotateCcw className="h-4 w-4 inline mr-1" />
                      Improve
                    </button>
                  </div>
                )}
              </div>
              
              {loading ? (
                <div className="flex items-center justify-center h-40">
                  <div className="text-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-cyan-400 mx-auto mb-4" />
                    <p className="text-gray-300 text-lg">Enhancing your prompt...</p>
                    <p className="text-gray-500 text-sm mt-2">Using {selectedProvider} {selectedModel}</p>
                  </div>
                </div>
              ) : enhancedPrompt ? (
                <div className="glass rounded-xl p-4 border border-white/10">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
                    {enhancedPrompt}
                  </pre>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Your enhanced prompt will appear here</p>
                  <p className="text-sm mt-2">Configure settings and click Generate to get started</p>
                </div>
              )}
            </div>
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            {/* Configuration */}
            <div className="glass-card rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Configuration</h3>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>

              <div className="space-y-4">
                {/* Provider Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    AI Provider
                  </label>
                  <div className="space-y-2">
                    <select
                      value={showCustomProvider ? 'custom' : selectedProvider}
                      onChange={(e) => {
                        if (e.target.value === 'custom') {
                          setShowCustomProvider(true);
                        } else {
                          setShowCustomProvider(false);
                          setSelectedProvider(e.target.value);
                        }
                      }}
                      className="w-full p-3 glass border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white bg-transparent transition-all duration-300"
                    >
                      {tool.providers.map(provider => (
                        <option key={provider} value={provider} className="bg-slate-800 text-white">
                          {provider}
                        </option>
                      ))}
                      {tool.allowCustomProvider && (
                        <option value="custom" className="bg-slate-800 text-white">
                          Custom Provider
                        </option>
                      )}
                    </select>
                    {showCustomProvider && (
                      <input
                        type="text"
                        placeholder="Enter custom provider"
                        value={customProvider}
                        onChange={(e) => setCustomProvider(e.target.value)}
                        className="w-full p-3 glass border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-400 bg-transparent transition-all duration-300"
                      />
                    )}
                  </div>
                </div>

                {/* Model Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Model
                  </label>
                  <div className="space-y-2">
                    <select
                      value={showCustomModel ? 'custom' : selectedModel}
                      onChange={(e) => {
                        if (e.target.value === 'custom') {
                          setShowCustomModel(true);
                        } else {
                          setShowCustomModel(false);
                          setSelectedModel(e.target.value);
                        }
                      }}
                      className="w-full p-3 glass border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white bg-transparent transition-all duration-300"
                    >
                      {tool.models[selectedProvider]?.map(model => (
                        <option key={model} value={model} className="bg-slate-800 text-white">
                          {model}
                        </option>
                      )) || []}
                      {tool.allowCustomModel && (
                        <option value="custom" className="bg-slate-800 text-white">
                          Custom Model
                        </option>
                      )}
                    </select>
                    {showCustomModel && (
                      <input
                        type="text"
                        placeholder="Enter custom model"
                        value={customModel}
                        onChange={(e) => setCustomModel(e.target.value)}
                        className="w-full p-3 glass border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-400 bg-transparent transition-all duration-300"
                      />
                    )}
                  </div>
                </div>

                {/* Agent Selection (for coding tools) */}
                {tool.agents && tool.agents.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Coding Agent
                    </label>
                    <div className="space-y-2">
                      <select
                        value={showCustomAgent ? 'custom' : selectedAgent}
                        onChange={(e) => {
                          if (e.target.value === 'custom') {
                            setShowCustomAgent(true);
                          } else {
                            setShowCustomAgent(false);
                            setSelectedAgent(e.target.value);
                          }
                        }}
                        className="w-full p-3 glass border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white bg-transparent transition-all duration-300"
                      >
                        {tool.agents.map(agent => (
                          <option key={agent} value={agent} className="bg-slate-800 text-white">
                            {agent}
                          </option>
                        ))}
                        {tool.allowCustomAgent && (
                          <option value="custom" className="bg-slate-800 text-white">
                            Custom Agent
                          </option>
                        )}
                      </select>
                      {showCustomAgent && (
                        <input
                          type="text"
                          placeholder="Enter custom agent"
                          value={customAgent}
                          onChange={(e) => setCustomAgent(e.target.value)}
                          className="w-full p-3 glass border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-400 bg-transparent transition-all duration-300"
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Tone Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tone
                  </label>
                  <select
                    value={selectedTone}
                    onChange={(e) => setSelectedTone(e.target.value)}
                    className="w-full p-3 glass border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white bg-transparent transition-all duration-300"
                  >
                    {toneOptions.map(tone => (
                      <option key={tone} value={tone} className="bg-slate-800 text-white capitalize">
                        {tone}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Output Format Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Output Format
                  </label>
                  <select
                    value={selectedOutputFormat}
                    onChange={(e) => setSelectedOutputFormat(e.target.value)}
                    className="w-full p-3 glass border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white bg-transparent transition-all duration-300"
                  >
                    {tool.outputFormats.options.map(format => (
                      <option key={format} value={format} className="bg-slate-800 text-white">
                        {format}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleEnhance}
              disabled={!inputPrompt.trim() || loading || (!settingsLoading && !isUserApiConfigured)}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              <Sparkles className="h-6 w-6" />
              <span>{loading ? 'Generating...' : 'Generate Enhanced Prompt'}</span>
            </button>
            {(!settingsLoading && !isUserApiConfigured) && (
              <div className="text-sm text-red-300 mt-2">
                Add your API key and base URL in <Link to="/profile" className="underline text-cyan-300">Profile → API Keys</Link>.
              </div>
            )}

            {/* Tool Info */}
            <div className="glass rounded-xl p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-2">About This Tool</h4>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                {tool.description}
              </p>
              <div className="space-y-2 text-xs text-gray-500">
                <div>
                  <strong>Supported Providers:</strong> {tool.providers.join(', ')}
                </div>
                <div>
                  <strong>File Types:</strong> {tool.fileUploadRules.allowedTypes.join(', ')}
                </div>
                <div>
                  <strong>Max File Size:</strong> {tool.fileUploadRules.maxSizeMB}MB
                </div>
                <div>
                  <strong>Output Formats:</strong> {tool.outputFormats.options.join(', ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HybridToolPage;