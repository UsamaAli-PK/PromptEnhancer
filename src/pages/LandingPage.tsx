import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Zap, 
  Target, 
  Shield, 
  ArrowRight, 
  Code, 
  Image, 
  MessageSquare, 
  PenTool, 
  BarChart3, 
  FileText,
  Play,
  Check,
  Star,
  ChevronLeft,
  ChevronRight,
  Globe,
  Users,
  Cpu,
  Brain,
  Layers,
  Palette,
  TrendingUp,
  Lock,
  Infinity,
  Rocket,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentToolCategory, setCurrentToolCategory] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [animatedText, setAnimatedText] = useState('');
  const [isAnnual, setIsAnnual] = useState(false);

  const fullText = "Across GPT-5, Claude, Gemini, DALL·E & More.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setAnimatedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'AI-Powered Enhancement',
      description: 'Transform simple ideas into sophisticated prompts using advanced AI algorithms',
      example: 'Input: "Make a logo" → Enhanced: "Create a minimalist, modern logo design for a tech startup..."'
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: 'Multi-Model Support',
      description: 'Optimize prompts for GPT-5, Claude, Gemini, DALL·E, and 20+ AI models',
      example: 'Automatically adapts prompt structure for each AI model\'s strengths'
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: 'Tone & Style Control',
      description: 'Fine-tune voice, creativity, and output style with precision controls',
      example: 'Professional, Creative, Technical, Casual - with granular adjustments'
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Task-Specific Templates',
      description: '40+ specialized tools for coding, marketing, design, and content creation',
      example: 'Email Writer, Code Generator, Image Prompts, Social Media Captions'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Prompt Library',
      description: 'Save, organize, and share your best prompts with version control',
      example: 'Build your personal collection of high-performing prompts'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Team Collaboration',
      description: 'Share prompts, collaborate on projects, and maintain brand consistency',
      example: 'Team workspaces with role-based permissions and shared libraries'
    }
  ];

  const toolCategories = [
    {
      name: 'Coding & Development',
      icon: <Code className="h-12 w-12" />,
      tools: ['Code Generator', 'Bug Fixer', 'API Docs', 'Unit Tests'],
      example: 'Input: "React component" → Enhanced: "Create a responsive React functional component with TypeScript..."',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Visual & Design',
      icon: <Image className="h-12 w-12" />,
      tools: ['AI Art', 'Logo Design', 'UI Mockups', 'Photography'],
      example: 'Input: "Logo design" → Enhanced: "Design a modern, minimalist logo with geometric elements..."',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Content & Writing',
      icon: <PenTool className="h-12 w-12" />,
      tools: ['Blog Posts', 'Email Copy', 'Social Media', 'Press Releases'],
      example: 'Input: "Blog post" → Enhanced: "Write a comprehensive 2000-word blog post with SEO optimization..."',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Marketing & Sales',
      icon: <TrendingUp className="h-12 w-12" />,
      tools: ['Ad Copy', 'Landing Pages', 'Sales Pitches', 'Product Descriptions'],
      example: 'Input: "Ad copy" → Enhanced: "Create compelling Facebook ad copy that drives conversions..."',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      name: 'Data & Analytics',
      icon: <BarChart3 className="h-12 w-12" />,
      tools: ['SQL Queries', 'Data Analysis', 'Reports', 'Visualizations'],
      example: 'Input: "Data analysis" → Enhanced: "Perform comprehensive data analysis with statistical insights..."',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'Academic & Research',
      icon: <FileText className="h-12 w-12" />,
      tools: ['Essays', 'Research Papers', 'Study Notes', 'Citations'],
      example: 'Input: "Research paper" → Enhanced: "Write a peer-reviewed research paper with proper methodology..."',
      gradient: 'from-teal-500 to-blue-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'AI Product Manager',
      company: 'TechFlow',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'PromptEnhancer transformed how our team works with AI. Our prompt quality improved by 300% and we save 5 hours per week.',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Creative Director',
      company: 'PixelCraft',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'The image prompt enhancement is incredible. Our DALL·E and MidJourney outputs are now consistently professional-grade.',
      rating: 5
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Research Scientist',
      company: 'BioTech Labs',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'As a researcher, the academic writing tools are game-changing. My papers are more structured and compelling.',
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfect for getting started',
      features: [
        '10 enhanced prompts/month',
        'Basic templates',
        'Community support',
        'Standard AI models'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      price: isAnnual ? 19 : 29,
      description: 'For professionals and creators',
      features: [
        'Unlimited enhanced prompts',
        '40+ specialized tools',
        'All AI model integrations',
        'Prompt library & history',
        'Priority support',
        'Advanced customization'
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: isAnnual ? 99 : 149,
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom templates',
        'API access',
        'White-label options',
        'Dedicated support',
        'Usage analytics'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const comingSoonFeatures = [
    {
      title: 'Prompt Marketplace',
      description: 'Buy and sell high-performing prompts',
      icon: <Globe className="h-8 w-8" />
    },
    {
      title: 'AI Collaboration Hub',
      description: 'Real-time prompt editing with your team',
      icon: <Users className="h-8 w-8" />
    },
    {
      title: 'Analytics & Insights',
      description: 'Track prompt performance and ROI',
      icon: <BarChart3 className="h-8 w-8" />
    },
    {
      title: 'Developer API',
      description: 'Integrate prompt enhancement into your apps',
      icon: <Cpu className="h-8 w-8" />
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextToolCategory = () => {
    setCurrentToolCategory((prev) => (prev + 1) % toolCategories.length);
  };

  const prevToolCategory = () => {
    setCurrentToolCategory((prev) => (prev - 1 + toolCategories.length) % toolCategories.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-cyan-400" />
                <div className="absolute inset-0 h-8 w-8 text-cyan-400 animate-ping opacity-20">
                  <Sparkles className="h-8 w-8" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                PromptEnhancer
              </span>
            </div>
            <Link
              to="/register"
              className="relative px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative z-10">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                Turn Simple Ideas Into
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Powerful AI Prompts
              </span>
            </h1>
            
            <div className="text-xl lg:text-2xl text-gray-300 mb-8 h-8">
              <span className="font-mono">{animatedText}</span>
              <span className="animate-pulse">|</span>
            </div>

            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your simple ideas into sophisticated, AI-optimized prompts that deliver exceptional results across 
              ChatGPT, Claude, Gemini, DALL·E, and 20+ other AI models.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link
                to="/register"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-lg text-white hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Get Started Free</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="group flex items-center space-x-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                <Play className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Powered by OpenAI API</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Claude Integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>Google Gemini</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Dashboard Mockup */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl mx-auto opacity-10 pointer-events-none">
          <div className="relative">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 transform rotate-3 hover:rotate-0 transition-transform duration-700">
              <div className="h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Value Proposition */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Pain Points */}
            <div className="space-y-8">
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Tired of Poor AI Results?
              </h2>
              <div className="space-y-6">
                {[
                  'Your prompts aren\'t specific enough',
                  'Wasting hours tweaking AI outputs',
                  'Inconsistent results across different models',
                  'No systematic approach to prompt engineering'
                ].map((pain, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-300">{pain}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div className="space-y-8">
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                PromptEnhancer Solves This
              </h2>
              <div className="space-y-6">
                {[
                  'AI-powered prompt optimization',
                  'Instant enhancement in seconds',
                  'Multi-model compatibility guaranteed',
                  'Proven templates and frameworks'
                ].map((solution, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl transform hover:scale-105 transition-transform duration-300">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">{solution}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Powerful Features for Better Prompts
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to create professional-grade prompts that deliver exceptional AI results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-cyan-400 mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{feature.description}</p>
                  
                  {/* Example on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4 p-3 bg-black/20 rounded-lg border border-cyan-500/20">
                    <p className="text-xs text-cyan-300 font-mono">{feature.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Categories Carousel */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Specialized Tools for Every Need
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Task-specific enhancement templates designed for different use cases and AI models
            </p>
          </div>

          <div className="relative">
            <div className="flex items-center justify-center space-x-8 mb-8">
              <button
                onClick={prevToolCategory}
                className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <div className="text-center">
                <div className={`inline-flex p-4 bg-gradient-to-r ${toolCategories[currentToolCategory].gradient} rounded-2xl mb-4`}>
                  <div className="text-white">
                    {toolCategories[currentToolCategory].icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {toolCategories[currentToolCategory].name}
                </h3>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {toolCategories[currentToolCategory].tools.map((tool, index) => (
                    <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="max-w-md mx-auto p-4 bg-black/20 rounded-lg border border-white/10">
                  <p className="text-sm text-cyan-300 font-mono">
                    {toolCategories[currentToolCategory].example}
                  </p>
                </div>
              </div>
              
              <button
                onClick={nextToolCategory}
                className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center space-x-2">
              {toolCategories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentToolCategory(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentToolCategory ? 'bg-cyan-400 w-8' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transform your ideas into powerful prompts in just four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Enter Your Idea',
                description: 'Type your simple idea or basic prompt into our intuitive interface',
                icon: <PenTool className="h-8 w-8" />
              },
              {
                step: '02',
                title: 'Select Model & Tone',
                description: 'Choose your target AI model and desired tone for optimal results',
                icon: <Target className="h-8 w-8" />
              },
              {
                step: '03',
                title: 'Generate Enhancement',
                description: 'Our AI analyzes and enhances your prompt with advanced techniques',
                icon: <Zap className="h-8 w-8" />
              },
              {
                step: '04',
                title: 'Copy & Use',
                description: 'Get your enhanced prompt ready to use in any AI tool instantly',
                icon: <Rocket className="h-8 w-8" />
              }
            ].map((step, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="text-center p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="text-6xl font-bold text-white/10 mb-4">{step.step}</div>
                  <div className="text-cyan-400 mb-6 flex justify-center">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
                
                {/* Connecting line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Loved by Creators Worldwide
            </h2>
            <div className="flex justify-center items-center space-x-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
              <span className="text-xl text-gray-300 ml-4">4.9/5 from 1,200+ users</span>
            </div>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-6">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full border-2 border-cyan-400"
                />
              </div>
              
              <blockquote className="text-xl text-gray-300 mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="text-white font-semibold">
                {testimonials[currentTestimonial].name}
              </div>
              <div className="text-gray-400">
                {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-cyan-400 w-8' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Company Logos */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-8">Used by creators from</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
              {['TechFlow', 'PixelCraft', 'BioTech Labs', 'Creative Studio', 'AI Ventures', 'Digital Agency'].map((company, index) => (
                <div key={index} className="text-gray-500 font-semibold text-lg">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Choose the plan that fits your needs. Upgrade or downgrade at any time.
            </p>
            
            {/* Annual/Monthly Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`text-lg ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                  isAnnual ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-gray-600'
                }`}
              >
                <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                  isAnnual ? 'transform translate-x-7' : ''
                }`}></div>
              </button>
              <span className={`text-lg ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
                Annual
                <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                  Save 30%
                </span>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border transition-all duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-500/50 shadow-2xl shadow-cyan-500/25'
                    : 'bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-5xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400 ml-2">/{isAnnual ? 'year' : 'month'}</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to="/register"
                    className={`block w-full py-3 px-6 rounded-full font-semibold text-center transition-all duration-300 transform hover:scale-105 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Coming Soon...
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Exciting new features in development to make your AI workflow even more powerful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {comingSoonFeatures.map((feature, index) => (
              <div
                key={index}
                className="relative group p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
              >
                {/* Blur overlay */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl group-hover:backdrop-blur-none transition-all duration-300"></div>
                
                <div className="relative z-10 text-center filter blur-sm group-hover:blur-none transition-all duration-300">
                  <div className="text-purple-400 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
                
                {/* Coming Soon Badge */}
                <div className="absolute top-2 right-2 px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                  Soon
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The brilliant minds behind PromptEnhancer, dedicated to revolutionizing AI interaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {[
              {
                name: 'Alex Chen',
                role: 'CEO & Co-Founder',
                bio: 'Former OpenAI researcher with 8+ years in AI/ML. Led prompt engineering initiatives at scale.',
                avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                linkedin: '#',
                twitter: '#',
                gradient: 'from-cyan-500 to-blue-500'
              },
              {
                name: 'Sarah Rodriguez',
                role: 'CTO & Co-Founder',
                bio: 'Ex-Google AI engineer. Built large-scale ML systems serving millions of users worldwide.',
                avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                linkedin: '#',
                twitter: '#',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                name: 'Marcus Johnson',
                role: 'Head of Product',
                bio: 'Product leader from Anthropic. Expert in AI UX design and human-computer interaction.',
                avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                linkedin: '#',
                twitter: '#',
                gradient: 'from-emerald-500 to-teal-500'
              },
              {
                name: 'Dr. Emily Watson',
                role: 'Head of AI Research',
                bio: 'PhD in NLP from Stanford. Published 50+ papers on prompt optimization and model alignment.',
                avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                linkedin: '#',
                twitter: '#',
                gradient: 'from-orange-500 to-red-500'
              },
              {
                name: 'David Kim',
                role: 'Lead Engineer',
                bio: 'Full-stack architect from Meta. Specialized in scalable AI infrastructure and real-time systems.',
                avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
                linkedin: '#',
                twitter: '#',
                gradient: 'from-indigo-500 to-purple-500'
              }
            ].map((member, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10 text-center">
                    {/* Avatar */}
                    <div className="relative mb-6">
                      <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="relative w-24 h-24 rounded-full mx-auto border-2 border-white/20 group-hover:border-white/40 transition-all duration-300"
                      />
                      {/* Floating ring animation */}
                      <div className={`absolute inset-0 w-24 h-24 mx-auto rounded-full border-2 border-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300`}></div>
                    </div>
                    
                    {/* Name & Role */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {member.name}
                    </h3>
                    <p className={`text-sm font-medium mb-4 bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                      {member.role}
                    </p>
                    
                    {/* Bio */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                      {member.bio}
                    </p>
                    
                    {/* Social Links */}
                    <div className="flex justify-center space-x-4">
                      <a
                        href={member.linkedin}
                        className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300 group/social"
                      >
                        <Linkedin className="h-4 w-4 text-gray-400 group-hover/social:text-blue-400 transition-colors duration-300" />
                      </a>
                      <a
                        href={member.twitter}
                        className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300 group/social"
                      >
                        <Twitter className="h-4 w-4 text-gray-400 group-hover/social:text-cyan-400 transition-colors duration-300" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Team Stats */}
          <div className="mt-16 grid sm:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                Years Combined Experience
              </div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                100+
              </div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                Research Papers Published
              </div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                $2B+
              </div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                In AI Products Built
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-purple-600/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Start Enhancing Your Prompts Today
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of creators, developers, and professionals who are already getting better AI results with PromptEnhancer.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/register"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-lg text-white hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <button className="flex items-center space-x-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300">
              <span>Book a Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black/20 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <Sparkles className="h-6 w-6 text-cyan-400" />
              <span className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                PromptEnhancer
              </span>
            </div>
            
            <div className="flex items-center space-x-8 mb-6 md:mb-0">
              <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">About</Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">Docs</Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">Careers</Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy</Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400">
              © 2025 PromptEnhancer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-4xl w-full">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-300"
            >
              <span className="sr-only">Close</span>
              ✕
            </button>
            <div className="aspect-video bg-gray-800 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
                <p className="text-white text-lg">Demo video coming soon!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;