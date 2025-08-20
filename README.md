# PromptEnhancer 🚀

> **AI-Powered Prompt Enhancement Platform** - Transform simple ideas into sophisticated prompts using advanced AI algorithms across multiple providers.

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green.svg)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-blue.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-purple.svg)](https://vitejs.dev/)

## 🌟 Overview

PromptEnhancer is a sophisticated web application designed to enhance and optimize AI prompts across multiple AI providers and models. Built as a modern React SPA with a focus on providing specialized tools for different content creation tasks, it transforms simple ideas into sophisticated, AI-optimized prompts.

### ✨ Key Features

- **🤖 Multi-Provider AI Support**: OpenAI, Anthropic, Google, Mistral, Meta, and more
- **🛠️ 40+ Specialized Tools**: Coding, design, marketing, writing, and content creation
- **🎨 Beautiful UI/UX**: Glassmorphism design with responsive layout
- **💾 Real Database**: Supabase-powered backend with user authentication
- **📁 File Upload**: Support for various file types with content extraction
- **🔒 Secure**: Row-level security and proper authentication
- **📊 Analytics**: User usage statistics and prompt history
- **🎯 Smart Prompts**: Tool-specific prompt templates and optimization

## 🏗️ Architecture

### Frontend Stack
- **React 18.3.1** - Component-based UI library with hooks
- **TypeScript 5.5.3** - Static type checking and development experience
- **Vite 5.4.2** - Fast build tool and development server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **React Router DOM 7.8.1** - Client-side routing and navigation

### Backend Infrastructure
- **Supabase** - Backend-as-a-Service with PostgreSQL database
- **Authentication** - Built-in user management and security
- **Real-time Database** - PostgreSQL with Row Level Security (RLS)
- **Storage** - File upload and management capabilities

### AI Integration
- **OpenAI** - GPT-4, GPT-5, DALL·E 3
- **Anthropic** - Claude 3.7, Claude 3 Sonnet, Claude 3 Haiku
- **Google** - Gemini Ultra, Gemini Pro, Gemini Flash
- **Mistral AI** - Mistral Large, Mixtral-8x7B, Mistral Medium
- **Meta** - LLaMA 3 70B, LLaMA 3 8B, Code Llama
- **Additional** - Cohere, Groq, Perplexity APIs

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PromptEnhancer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   # Create .env.local file with your Supabase credentials
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
PromptEnhancer/
├── 📁 src/                    # Source code
│   ├── 📁 components/         # Reusable UI components
│   ├── 📁 pages/             # Page components
│   ├── 📁 contexts/          # React context providers
│   ├── 📁 hooks/             # Custom React hooks
│   ├── 📁 lib/               # Utility libraries and services
│   ├── 📁 config/            # Configuration files
│   ├── 📁 utils/             # Helper functions
│   └── 📁 types/             # TypeScript type definitions
├── 📁 supabase/              # Database migrations and schema
├── 📁 docs/                  # Project documentation
├── 📁 .bolt/                 # Bolt hosting configuration
└── 📄 Configuration files    # Package.json, Vite config, etc.
```

## 🎯 Core Features

### 1. Tool Management
- **Dynamic Tool Loading**: 40+ tools loaded from JSON configuration
- **Tool Categories**: Development, Design, Marketing, Writing, Data
- **Custom Configuration**: Provider, model, tone, and output format selection

### 2. Prompt Enhancement
- **AI-Powered Optimization**: Intelligent prompt improvement using AI models
- **Context-Aware**: File upload integration for enhanced context
- **Multi-Format Output**: Text, JSON, Markdown, HTML, PDF support

### 3. User Management
- **Authentication**: Secure signup/login with Supabase Auth
- **User Profiles**: Personal information and preferences
- **Settings Management**: API keys, default providers, themes

### 4. Content Library
- **Prompt History**: Save and organize enhanced prompts
- **Search & Filter**: Find prompts by tool type, content, or tags
- **Export Options**: Download prompts in various formats

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Quality

- **ESLint**: Code linting and quality enforcement
- **TypeScript**: Strict type checking
- **Prettier**: Code formatting (via ESLint)
- **React Hooks**: Proper hooks usage validation

### Database Schema

The project uses a well-designed PostgreSQL schema with:

- **users**: User profiles and authentication
- **saved_prompts**: Enhanced prompts and metadata
- **user_settings**: User preferences and API configurations

## 🌐 Deployment

### Bolt Hosting
This project is configured for deployment on Bolt hosting platform:

1. **Build the project**: `npm run build`
2. **Deploy**: Push to main branch for automatic deployment
3. **Environment**: Production environment variables configured

### Environment Variables

```bash
# Required
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional (for API integration)
VITE_OPENAI_API_KEY=your_openai_key
VITE_ANTHROPIC_API_KEY=your_anthropic_key
```

## 📊 Performance

- **Lazy Loading**: Components loaded on demand
- **Code Splitting**: Automatic bundle optimization
- **Image Optimization**: Responsive images with proper sizing
- **Database Indexing**: Optimized queries with proper indexes
- **Caching**: User settings and preferences cached locally

## 🔒 Security

- **Row Level Security**: Database-level access control
- **Authentication**: Secure user authentication via Supabase
- **Input Validation**: Client and server-side validation
- **API Security**: Secure API key management
- **HTTPS**: All communications encrypted

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Add comprehensive tests
- Update documentation

## 📚 Documentation

- **[Architecture Overview](docs/ARCHITECTURE.md)** - System design and data flow
- **[Technology Stack](docs/TECHNOLOGY_STACK.md)** - Detailed tech stack information
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Deployment and hosting instructions
- **[Supabase Integration](SUPABASE_IMPLEMENTATION.md)** - Database and auth implementation

## 🐛 Troubleshooting

### Common Issues

1. **Supabase Connection Failed**
   - Verify environment variables
   - Check Supabase project status
   - Ensure RLS policies are configured

2. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript configuration
   - Verify all dependencies are installed

3. **Authentication Issues**
   - Check Supabase Auth settings
   - Verify email confirmation
   - Clear browser storage

### Debug Tools

- **SupabaseTest Component**: Connection status testing
- **Browser Console**: Detailed error messages
- **Supabase Dashboard**: Database monitoring

## 📈 Roadmap

### Phase 1: Core Infrastructure ✅
- [x] Supabase integration
- [x] User authentication
- [x] Database operations
- [x] Basic UI components

### Phase 2: AI Integration 🚧
- [ ] Real API provider connections
- [ ] Prompt template system
- [ ] Response optimization
- [ ] Cost tracking

### Phase 3: Advanced Features 📋
- [ ] Real-time collaboration
- [ ] Advanced analytics
- [ ] Team workspaces
- [ ] API rate limiting

### Phase 4: Enterprise Features 📋
- [ ] Multi-tenant support
- [ ] Advanced security
- [ ] Performance monitoring
- [ ] Custom integrations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for the excellent backend-as-a-service platform
- **React Team** for the amazing frontend framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the fast build tool
- **OpenAI, Anthropic, Google** for AI capabilities

## 📞 Support

- **Documentation**: [docs/](docs/) folder
- **Issues**: [GitHub Issues](link-to-issues)
- **Discussions**: [GitHub Discussions](link-to-discussions)
- **Email**: [your-email@domain.com]

---

**Made with ❤️ by the PromptEnhancer Team**

*Transform your ideas into powerful AI prompts*
