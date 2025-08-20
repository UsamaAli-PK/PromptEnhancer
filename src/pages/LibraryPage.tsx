import React, { useState } from 'react';
import { Search, Filter, Copy, Edit, Trash2, ExternalLink, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import { usePrompts } from '../hooks/usePrompts';
import LoadingSpinner from '../components/LoadingSpinner';


const LibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null);
  
  const { prompts, loading, error, deletePrompt } = usePrompts();


  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.input_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterBy === 'all' || prompt.tool_type === filterBy;
    
    return matchesSearch && matchesFilter;
  });

  const toolTypes = [
    { value: 'all', label: 'All Tools' },
    { value: 'coding', label: 'Coding' },
    { value: 'image', label: 'Image' },
    { value: 'text', label: 'Text' },
    { value: 'copywriting', label: 'Copywriting' },
    { value: 'data', label: 'Data' },
    { value: 'captions', label: 'Captions' }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDelete = async (promptId: string) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      try {
        await deletePrompt(promptId);
      } catch (error) {
        alert('Failed to delete prompt');
      }
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getToolColor = (toolType: string) => {
    const colors: { [key: string]: string } = {
      coding: 'bg-blue-100 text-blue-800',
      image: 'bg-pink-100 text-pink-800',
      text: 'bg-green-100 text-green-800',
      copywriting: 'bg-orange-100 text-orange-800',
      data: 'bg-purple-100 text-purple-800',
      captions: 'bg-teal-100 text-teal-800'
    };
    return colors[toolType] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-red-600">Error loading prompts: {error}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Prompt Library</h1>
          </div>
          <p className="text-gray-600">Manage your saved and enhanced prompts</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search prompts, tags, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {toolTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid gap-6">
          {filteredPrompts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <Sparkles className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No prompts found</h3>
              <p className="text-gray-600">Try adjusting your search or create your first enhanced prompt.</p>
            </div>
          ) : (
            filteredPrompts.map(prompt => (
              <div key={prompt.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getToolColor(prompt.tool_type)}`}>
                          {prompt.tool_type}
                        </span>
                        <span className="text-sm text-gray-500">
                          {prompt.provider} • {prompt.model}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{prompt.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{prompt.input_text}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {prompt.tags.map(tag => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <p className="text-sm text-gray-500">
                        Created {formatDate(prompt.created_at)}
                      </p>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleCopy(prompt.enhanced_text)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        title="Copy enhanced prompt"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setSelectedPrompt(prompt)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        title="View details"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(prompt.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Preview of enhanced text */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-700 line-clamp-2">
                      {prompt.enhanced_text}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal for viewing prompt details */}
        {selectedPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPrompt.title}</h2>
                  <button
                    onClick={() => setSelectedPrompt(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Close</span>
                    ✕
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Original Prompt</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700">{selectedPrompt.input_text}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Enhanced Prompt</h3>
                      <button
                        onClick={() => handleCopy(selectedPrompt.enhanced_text)}
                        className="flex items-center space-x-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200"
                      >
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                        {selectedPrompt.enhanced_text}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;