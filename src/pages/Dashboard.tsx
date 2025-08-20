import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toolsConfig from '../config/tools.json';
import { 
  Code, 
  Image, 
  MessageSquare, 
  PenTool, 
  BarChart3, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  Mail, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  BookOpen, 
  ShoppingBag, 
  Megaphone, 
  Search, 
  Newspaper, 
  GraduationCap, 
  Bug, 
  Database, 
  Zap, 
  TestTube, 
  FileCode, 
  Hash, 
  Palette, 
  Brush, 
  Monitor, 
  Video, 
  Camera, 
  Globe, 
  Lightbulb, 
  TrendingUp, 
  Star, 
  Users, 
  ClipboardList, 
  Calendar, 
  MessageCircle, 
  Briefcase, 
  UserCheck, 
  HelpCircle, 
  StickyNote, 
  Brain, 
  BookMarked, 
  Target,
  ChevronDown,
  ChevronUp,
  Filter,
  Grid3X3,
  List,
  Clock,
  Bookmark,
  Flame,
  Layers
} from 'lucide-react';
import Navbar from '../components/Navbar';
import SupabaseTest from '../components/SupabaseTest';

const Dashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showExtendedTools, setShowExtendedTools] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Core Tools - Featured prominently
  const getToolIcon = (categories: string[]) => {
    if (categories.includes('Development')) return <Code className="h-12 w-12" />;
    if (categories.includes('Design') || categories.includes('Creative')) return <Image className="h-12 w-12" />;
    if (categories.includes('Writing') || categories.includes('Content')) return <PenTool className="h-12 w-12" />;
    if (categories.includes('Social Media')) return <MessageSquare className="h-12 w-12" />;
    if (categories.includes('Marketing')) return <Megaphone className="h-12 w-12" />;
    if (categories.includes('Data')) return <BarChart3 className="h-12 w-12" />;
    return <Sparkles className="h-12 w-12" />;
  };

  const getToolGradient = (categories: string[]) => {
    if (categories.includes('Development')) return 'from-blue-500 via-cyan-500 to-blue-600';
    if (categories.includes('Design') || categories.includes('Creative')) return 'from-purple-500 via-pink-500 to-purple-600';
    if (categories.includes('Writing') || categories.includes('Content')) return 'from-emerald-500 via-green-500 to-emerald-600';
    if (categories.includes('Social Media')) return 'from-pink-500 via-rose-500 to-pink-600';
    if (categories.includes('Marketing')) return 'from-orange-500 via-amber-500 to-orange-600';
    if (categories.includes('Data')) return 'from-indigo-500 via-violet-500 to-indigo-600';
    return 'from-gray-500 via-slate-500 to-gray-600';
  };

  const getToolGlowColor = (categories: string[]) => {
    if (categories.includes('Development')) return 'shadow-blue-500/25';
    if (categories.includes('Design') || categories.includes('Creative')) return 'shadow-purple-500/25';
    if (categories.includes('Writing') || categories.includes('Content')) return 'shadow-emerald-500/25';
    if (categories.includes('Social Media')) return 'shadow-pink-500/25';
    if (categories.includes('Marketing')) return 'shadow-orange-500/25';
    if (categories.includes('Data')) return 'shadow-indigo-500/25';
    return 'shadow-gray-500/25';
  };

  // Get core tools (first 6 tools from config)
  const coreTools = toolsConfig.tools.slice(0, 6).map(tool => ({
    id: tool.id,
    name: tool.name,
    description: tool.description,
    icon: getToolIcon(tool.categories),
    gradient: getToolGradient(tool.categories),
    glowColor: getToolGlowColor(tool.categories),
    category: tool.categories[0],
    popular: true
  }));

  // Extended Tools - Organized by category
  const getExtendedToolIcon = (categories: string[], name: string) => {
    // Specific icons for certain tools
    if (name.includes('Email')) return <Mail className="h-6 w-6" />;
    if (name.includes('Facebook')) return <Facebook className="h-6 w-6" />;
    if (name.includes('LinkedIn')) return <Linkedin className="h-6 w-6" />;
    if (name.includes('Twitter')) return <Twitter className="h-6 w-6" />;
    if (name.includes('Product')) return <ShoppingBag className="h-6 w-6" />;
    if (name.includes('SEO')) return <Search className="h-6 w-6" />;
    if (name.includes('Press')) return <Newspaper className="h-6 w-6" />;
    if (name.includes('Landing')) return <Globe className="h-6 w-6" />;
    if (name.includes('Bug') || name.includes('Debug')) return <Bug className="h-6 w-6" />;
    if (name.includes('Regex')) return <Hash className="h-6 w-6" />;
    if (name.includes('Test')) return <TestTube className="h-6 w-6" />;
    if (name.includes('API')) return <FileCode className="h-6 w-6" />;
    if (name.includes('Logo')) return <Brush className="h-6 w-6" />;
    if (name.includes('UI') || name.includes('Mockup')) return <Monitor className="h-6 w-6" />;
    if (name.includes('Video')) return <Video className="h-6 w-6" />;
    if (name.includes('Photo')) return <Camera className="h-6 w-6" />;
    if (name.includes('Academic') || name.includes('Essay')) return <GraduationCap className="h-6 w-6" />;
    if (name.includes('Study') || name.includes('Notes')) return <StickyNote className="h-6 w-6" />;
    if (name.includes('Quiz')) return <HelpCircle className="h-6 w-6" />;
    if (name.includes('Research')) return <Brain className="h-6 w-6" />;
    if (name.includes('Sales')) return <TrendingUp className="h-6 w-6" />;
    if (name.includes('Proposal')) return <FileText className="h-6 w-6" />;
    if (name.includes('Job')) return <Briefcase className="h-6 w-6" />;
    if (name.includes('Resume')) return <UserCheck className="h-6 w-6" />;
    
    // Default category-based icons
    if (categories.includes('Development')) return <Code className="h-6 w-6" />;
    if (categories.includes('Design')) return <Palette className="h-6 w-6" />;
    if (categories.includes('Writing')) return <PenTool className="h-6 w-6" />;
    if (categories.includes('Marketing')) return <Megaphone className="h-6 w-6" />;
    if (categories.includes('Education')) return <BookOpen className="h-6 w-6" />;
    return <Sparkles className="h-6 w-6" />;
  };

  const getExtendedToolGradient = (categories: string[]) => {
    if (categories.includes('Development')) return 'from-blue-500 to-blue-600';
    if (categories.includes('Design')) return 'from-purple-500 to-purple-600';
    if (categories.includes('Writing')) return 'from-emerald-500 to-emerald-600';
    if (categories.includes('Marketing')) return 'from-orange-500 to-orange-600';
    if (categories.includes('Social Media')) return 'from-pink-500 to-pink-600';
    if (categories.includes('Education')) return 'from-indigo-500 to-indigo-600';
    if (categories.includes('Business')) return 'from-slate-600 to-slate-700';
    return 'from-gray-500 to-gray-600';
  };

  // Get extended tools (remaining tools from config)
  const extendedTools = toolsConfig.tools.slice(6).map(tool => ({
    id: tool.id,
    name: tool.name,
    description: tool.description,
    icon: getExtendedToolIcon(tool.categories, tool.name),
    category: tool.categories[0],
    gradient: getExtendedToolGradient(tool.categories)
  }));

  const categories = ['All', 'Development', 'Creative', 'Content', 'Marketing', 'Social Media', 'Business', 'Academic'];
  const extendedCategories = ['all', 'marketing', 'development', 'creative', 'academic', 'business'];

  const filteredCoreTools = coreTools.filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredExtendedTools = extendedTools.filter(tool => {
    const matchesTab = activeTab === 'all' || tool.category.toLowerCase().includes(activeTab);
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

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
        {/* Header Section */}
        <div className="mb-12">
          <div className="glass-strong rounded-2xl p-8 border border-white/20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Title & Welcome */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                  AI Prompt Dashboard
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                  Transform your ideas into powerful AI prompts with our specialized tools
                </p>
                
                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">40+ Tools Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">Multi-Model Support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400">Enterprise Ready</span>
                  </div>
                </div>
              </div>

              {/* Search & Controls */}
              <div className="flex flex-col space-y-4 lg:w-96">
                {/* Global Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tools, prompts, templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 glass border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-400 transition-all duration-300"
                  />
                </div>

                {/* View Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        viewMode === 'grid' 
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                          : 'glass border border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        viewMode === 'list' 
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                          : 'glass border border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>Last updated: 2 min ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="glass rounded-xl p-4 border border-white/10">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25'
                      : 'glass border border-white/10 text-gray-300 hover:text-white hover:border-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Core Tools Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3">
                <Flame className="h-8 w-8 text-orange-400" />
                <span>Core Tools</span>
              </h2>
              <p className="text-gray-400">Most popular and powerful prompt generators</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>Featured</span>
            </div>
          </div>

          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredCoreTools.map((tool) => (
              <Link
                key={tool.id}
                to={`/hybrid-tool/${tool.id}`}
                className="group relative"
              >
                <div className={`glass-strong rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl ${tool.glowColor} ${
                  viewMode === 'list' ? 'flex items-center space-x-6' : ''
                }`}>
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                  
                  <div className={`relative z-10 ${viewMode === 'list' ? 'flex-shrink-0' : ''}`}>
                    {/* Icon with glow effect */}
                    <div className={`relative mb-6 ${viewMode === 'list' ? 'mb-0' : ''}`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-20 blur-xl rounded-full group-hover:opacity-40 transition-opacity duration-500`}></div>
                      <div className={`relative p-4 bg-gradient-to-br ${tool.gradient} rounded-2xl text-white group-hover:scale-110 transition-transform duration-300`}>
                        {tool.icon}
                      </div>
                      {tool.popular && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                          <Star className="h-3 w-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`relative z-10 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {tool.name}
                      </h3>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4">
                      {tool.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${tool.gradient} bg-opacity-20 text-white border border-white/20`}>
                        {tool.category}
                      </span>
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm text-gray-400">Popular</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Extended Tools Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3">
                <Layers className="h-8 w-8 text-purple-400" />
                <span>Extended Tools</span>
              </h2>
              <p className="text-gray-400">Specialized tools for specific use cases</p>
            </div>
            <button
              onClick={() => setShowExtendedTools(!showExtendedTools)}
              className="flex items-center space-x-2 px-4 py-2 glass border border-white/20 rounded-lg hover:border-white/40 transition-all duration-300 text-white"
            >
              <span>{showExtendedTools ? 'Collapse' : 'Expand'}</span>
              {showExtendedTools ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {showExtendedTools && (
            <div className="glass rounded-2xl p-6 border border-white/10">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-white/10">
                {extendedCategories.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Extended Tools Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredExtendedTools.map((tool) => (
                  <Link
                    key={tool.id}
                    to={`/hybrid-tool/${tool.id}`}
                    className="group"
                  >
                    <div className="glass rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 bg-gradient-to-r ${tool.gradient} rounded-lg text-white group-hover:scale-110 transition-transform duration-300`}>
                          {tool.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 truncate">
                            {tool.name}
                          </h4>
                          <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 bg-white/10 text-gray-300 rounded-full">
                          {tool.category}
                        </span>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Quick Actions */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Zap className="h-6 w-6 text-yellow-400" />
              <span>Quick Actions</span>
            </h3>
            <div className="space-y-3">
              {[
                { icon: <Bookmark className="h-4 w-4" />, label: 'View Saved Prompts', action: '/library' },
                { icon: <Clock className="h-4 w-4" />, label: 'Recent Activity', action: '#' },
                { icon: <Users className="h-4 w-4" />, label: 'Team Workspace', action: '#' },
                { icon: <Star className="h-4 w-4" />, label: 'Favorite Tools', action: '#' }
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.action}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors duration-300 text-gray-300 hover:text-white group"
                >
                  <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                  <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Usage Stats */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-emerald-400" />
              <span>Usage Stats</span>
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Prompts Enhanced', value: '127', change: '+12%', color: 'text-emerald-400' },
                { label: 'Tools Used', value: '8', change: '+3', color: 'text-blue-400' },
                { label: 'Time Saved', value: '24h', change: '+5h', color: 'text-purple-400' },
                { label: 'Success Rate', value: '94%', change: '+2%', color: 'text-yellow-400' }
              ].map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <span className="text-gray-300">{stat.label}</span>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className={`text-sm ${stat.color}`}>{stat.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Supabase Connection Test */}
        <div className="mb-16">
          <SupabaseTest />
        </div>

        {/* No Results State */}
        {filteredCoreTools.length === 0 && (
          <div className="text-center py-16">
            <div className="glass rounded-2xl p-12 border border-white/10 max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or category filter.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;