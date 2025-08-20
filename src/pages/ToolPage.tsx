import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Copy, RefreshCw, Settings, Wand2, RotateCcw, Save, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import toolConfig from '../config/toolConfig.json';

interface ToolConfig {
  title: string;
  description: string;
  dropdowns: Array<{
    label: string;
    options: string[];
  }>;
}

const ToolPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [inputPrompt, setInputPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<{ [key: string]: string }>({});
  const [showSettings, setShowSettings] = useState(false);
  const [saved, setSaved] = useState(false);

  // Get tool configuration
  const getCurrentTool = (): ToolConfig => {
    const allTools = { ...toolConfig['core-tools'], ...toolConfig['extended-tools'] };
    const tool = allTools[type as keyof typeof allTools];
    
    if (!tool) {
      return {
        title: 'Unknown Tool',
        description: 'Tool configuration not found',
        dropdowns: []
      };
    }
    
    return tool as ToolConfig;
  };

  const currentTool = getCurrentTool();

  // Initialize settings with default values
  useEffect(() => {
    const initialSettings: { [key: string]: string } = {};
    currentTool.dropdowns.forEach(dropdown => {
      const key = dropdown.label.toLowerCase().replace(/\s+/g, '-');
      initialSettings[key] = dropdown.options[0] || '';
    });
    setSettings(initialSettings);
  }, [type]);

  // Get tool icon based on type
  const getToolIcon = () => {
    const iconMap: { [key: string]: JSX.Element } = {
      'code-generator': <Wand2 className="h-8 w-8" />,
      'image-prompts': <Sparkles className="h-8 w-8" />,
      'content-writer': <RefreshCw className="h-8 w-8" />,
      'social-captions': <Settings className="h-8 w-8" />,
      'marketing-copy': <Copy className="h-8 w-8" />,
      'data-sql': <ExternalLink className="h-8 w-8" />
    };
    
    return iconMap[type || ''] || <Wand2 className="h-8 w-8" />;
  };

  const handleEnhance = async () => {
    if (!inputPrompt.trim()) return;
    
    setLoading(true);
    try {
      // Simulate API call to OpenAI GPT-5
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create enhanced prompt based on tool type and settings
      const settingsText = Object.entries(settings)
        .map(([key, value]) => `${key.replace('-', ' ')}: ${value}`)
        .join(', ');
      
      const mockEnhancement = `Enhanced ${currentTool.title} Prompt:

**Original Request**: ${inputPrompt}

**Configuration**: ${settingsText}

**Optimized Prompt**:
${generateToolSpecificPrompt(type || '', inputPrompt, settings)}

**Additional Context**:
- Target: Professional-grade output
- Style: Optimized for ${currentTool.title}
- Quality: Production-ready
- Format: Clear and actionable

This enhanced prompt is specifically crafted for ${currentTool.title} to deliver superior results compared to basic prompts.`;

      setEnhancedPrompt(mockEnhancement);
    } catch (error) {
      console.error('Enhancement error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateToolSpecificPrompt = (toolType: string, input: string, config: { [key: string]: string }): string => {
    const prompts: { [key: string]: string } = {
      'code-generator': `Create ${config.language || 'Python'} code that ${input}. Use ${config.provider || 'OpenAI'} best practices, include proper error handling, documentation, and follow ${config['coding-agent'] || 'Bolt'} conventions.`,
      'image-prompts': `Generate a detailed ${config.style || 'Realistic'} image prompt for ${config.provider || 'OpenAI DALL-E'}: ${input}. Include specific details about composition, lighting, colors, and mood. Format for ${config['aspect-ratio'] || '1:1'} aspect ratio.`,
      'content-writer': `Write ${config.length || 'Medium'} content about ${input} in a ${config.tone || 'Professional'} tone. Include SEO optimization, clear structure with headings, and engaging introduction and conclusion.`,
      'social-captions': `Create an engaging ${config.platform || 'Instagram'} caption for ${input} using a ${config.tone || 'Casual'} tone. Include relevant hashtags, call-to-action, and platform-specific best practices.`,
      'marketing-copy': `Write compelling ${config.format || 'Ad Copy'} for ${input} using a ${config.tone || 'Persuasive'} tone. Focus on benefits, create urgency, and include a strong call-to-action.`,
      'data-sql': `Generate a ${config['query-type'] || 'Select'} query for ${config.database || 'MySQL'} database to ${input}. Include proper indexing considerations, error handling, and optimization for performance.`
    };
    
    return prompts[toolType] || `Create professional content for ${input} based on the specified requirements and best practices.`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(enhancedPrompt);
  };

  const handleImprovePrompt = () => {
    setInputPrompt(enhancedPrompt);
    setEnhancedPrompt('');
  };

  const handleSave = () => {
    // Save to library logic here
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSettingChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

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
                {getToolIcon()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{currentTool.title}</h1>
                <p className="text-gray-300">{currentTool.description}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-3 glass border border-white/20 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              showSettings ? 'bg-cyan-500/20 border-cyan-500/30' : 'hover:bg-white/20'
            }`}
          >
            <Settings className="h-5 w-5 text-white" />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Input */}
            <div className="glass-card rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Wand2 className="h-5 w-5 text-cyan-400" />
                <span>Your Input</span>
              </h2>
              <textarea
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder={`Describe what you want to create with ${currentTool.title}...`}
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
                      onClick={handleSave}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                        saved 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'glass border border-white/20 text-white hover:bg-white/20'
                      }`}
                    >
                      <Save className="h-4 w-4 inline mr-1" />
                      {saved ? 'Saved!' : 'Save'}
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
                    <p className="text-gray-500 text-sm mt-2">Using GPT-5 optimization</p>
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
                  <p className="text-sm mt-2">Enter your input and click Generate to get started</p>
                </div>
              )}
            </div>
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Settings</h3>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>

              {/* Dynamic Dropdowns */}
              <div className="space-y-4">
                {currentTool.dropdowns.map((dropdown, index) => {
                  const key = dropdown.label.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {dropdown.label}
                      </label>
                      <select
                        value={settings[key] || dropdown.options[0]}
                        onChange={(e) => handleSettingChange(key, e.target.value)}
                        className="w-full p-3 glass border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white bg-transparent transition-all duration-300"
                      >
                        {dropdown.options.map(option => (
                          <option key={option} value={option} className="bg-slate-800 text-white">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleEnhance}
              disabled={!inputPrompt.trim() || loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              <Sparkles className="h-6 w-6" />
              <span>{loading ? 'Generating...' : 'Generate Enhanced Prompt'}</span>
            </button>

            {/* Tool Info */}
            <div className="glass rounded-xl p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-2">About This Tool</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {currentTool.description} This tool uses advanced AI optimization to create 
                professional-grade prompts tailored for your specific needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;