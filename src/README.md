# Source Code Documentation 📁

> **Core application source code** - React components, services, hooks, and utilities

## 📋 Overview

The `src/` directory contains all the source code for the PromptEnhancer application. This is the heart of the project where all React components, business logic, and application services are implemented.

## 🏗️ Directory Structure

```
src/
├── 📁 components/         # Reusable UI components
├── 📁 pages/             # Page-level components
├── 📁 contexts/          # React context providers
├── 📁 hooks/             # Custom React hooks
├── 📁 lib/               # Core libraries and services
├── 📁 config/            # Configuration files
├── 📁 utils/             # Utility functions
├── 📁 types/             # TypeScript type definitions
├── 📄 App.tsx            # Main application component
├── 📄 main.tsx           # Application entry point
├── 📄 index.css          # Global styles
└── 📄 vite-env.d.ts      # Vite environment types
```

## 🔧 Core Files

### App.tsx
**Main application component** that sets up routing, authentication, and the overall application structure.

**Key Features:**
- React Router setup with protected routes
- Authentication context provider
- Error boundary implementation
- Route definitions for all pages

**Routes:**
- `/` - Landing page (public)
- `/auth` - Authentication page
- `/dashboard` - Main dashboard (protected)
- `/tool/:toolId` - Individual tool pages (protected)
- `/library` - Saved prompts library (protected)
- `/profile` - User profile and settings (protected)

### main.tsx
**Application entry point** that renders the root React component.

**Responsibilities:**
- React 18 strict mode setup
- Root component rendering
- Global CSS imports

### index.css
**Global stylesheet** with Tailwind CSS imports and custom CSS variables.

**Contents:**
- Tailwind CSS directives
- Custom CSS variables for theming
- Global utility classes
- Glassmorphism effects

## 📁 Components Directory

The `components/` folder contains reusable UI components used throughout the application.

**Key Components:**
- **Navbar** - Main navigation component
- **HybridToolPage** - Universal tool interface (replaces legacy ToolPage)
- **FileUpload** - File handling component
- **ApiKeyManager** - API key management
- **ErrorBoundary** - Error handling wrapper
- **LoadingSpinner** - Loading state component
- **ProtectedRoute** - Authentication guard

## 📁 Pages Directory

The `pages/` folder contains page-level components that represent different routes.

**Available Pages:**
- **LandingPage** - Public landing page with features
- **Dashboard** - Main user dashboard with tools
- **AuthPage** - Sign in/sign up forms
- **LibraryPage** - Saved prompts management
- **ProfilePage** - User settings and preferences
- **NotFoundPage** - 404 error page

## 📁 Contexts Directory

The `contexts/` folder contains React context providers for global state management.

**Available Contexts:**
- **AuthContext** - User authentication and profile state
- **UserSettingsContext** - User preferences and settings

## 📁 Hooks Directory

The `hooks/` folder contains custom React hooks for reusable logic.

**Available Hooks:**
- **useAuth** - Authentication state and methods
- **useUserSettings** - User settings management
- **usePrompts** - Saved prompts operations

## 📁 Lib Directory

The `lib/` folder contains core libraries and services.

**Available Services:**
- **supabase.ts** - Supabase client configuration
- **database.ts** - Database operations service
- **api.ts** - AI provider API integration

## 📁 Config Directory

The `config/` folder contains configuration files for tools and settings.

**Configuration Files:**
- **tools.json** - 40+ tool definitions with metadata
- **prompts.json** - Per-tool prompt templates (system/user + optimized Markdown)
- **toolConfig.json** - Legacy (deprecated) — kept only for reference; not used

## 📁 Utils Directory

The `utils/` folder contains utility functions and helpers.

**Utility Categories:**
- **Validation** - Form and input validation
- **Formatting** - Data formatting helpers
- **Encryption** - Security utilities
- **File handling** - File processing helpers

## 🎯 Key Features

### 1. Component Architecture
- **Functional Components** with React hooks
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Responsive Design** for all screen sizes

### 2. State Management
- **React Context** for global state
- **Local State** with useState/useEffect
- **Custom Hooks** for reusable logic
- **Optimistic Updates** for better UX

### 3. Routing & Navigation
- **React Router DOM** for client-side routing
- **Protected Routes** with authentication
- **Dynamic Routes** for tool pages
- **404 Handling** for invalid routes

### 4. Error Handling
- **Error Boundaries** for component errors
- **Try-Catch Blocks** for async operations
- **User-Friendly Error Messages**
- **Fallback UI** for error states

### 5. Prompt Safety & Exports
- **Token/Size Guards** for input and files with truncation markers
- **Format-Aware Downloads** (json/csv/html/sql/md/txt)

## 🔒 Security Features

### Authentication
- **Supabase Auth** integration
- **Protected Routes** for authenticated users
- **Session Management** with automatic refresh
- **Secure API Calls** with proper headers

### Data Protection
- **Row Level Security** in database
- **Input Validation** and sanitization
- **Secure Storage** of sensitive data
- **HTTPS** enforcement
- **User-Provided API Keys (Option B)** stored in DB (client-side encrypted)
- **Supabase Env Vars** moved to `.env`

## 📱 Responsive Design

### Breakpoints
- **Mobile First** approach
- **Tailwind CSS** responsive utilities
- **Flexible Layouts** for all screen sizes
- **Touch-Friendly** interactions

### Design System
- **Glassmorphism** effects
- **Consistent Spacing** with Tailwind
- **Color Palette** with CSS variables
- **Typography Scale** for readability

## 🚀 Performance Optimizations

### Code Splitting
- **Route-based** code splitting
- **Lazy Loading** of components
- **Dynamic Imports** for heavy features
- **Bundle Optimization** with Vite

### Rendering Optimization
- **React.memo** for component memoization
- **useCallback** for function stability
- **useMemo** for expensive calculations
- **Virtual Scrolling** for large lists

## 🧪 Testing Strategy

### Component Testing
- **Unit Tests** for individual components
- **Integration Tests** for component interactions
- **Snapshot Tests** for UI consistency
- **Accessibility Tests** for inclusive design

### E2E Testing
- **User Journey Tests** for critical paths
- **Cross-browser Testing** for compatibility
- **Performance Testing** for load times
- **Security Testing** for vulnerabilities

## 📚 Development Guidelines

### Code Style
- **ESLint** configuration for consistency
- **Prettier** for code formatting
- **TypeScript** strict mode enabled
- **React Hooks** rules enforced

### Component Structure
```typescript
// Component template
import React from 'react';
import { ComponentProps } from './types';

interface ComponentProps {
  // Props interface
}

export const Component: React.FC<ComponentProps> = ({ 
  // Destructured props
}) => {
  // Component logic
  
  return (
    // JSX return
  );
};
```

### File Naming
- **PascalCase** for components: `ComponentName.tsx`
- **camelCase** for utilities: `utilityFunction.ts`
- **kebab-case** for CSS: `component-name.css`
- **UPPER_CASE** for constants: `API_ENDPOINTS.ts`

## 🔄 State Management Patterns

### Context Pattern
```typescript
// Context creation
const MyContext = createContext<MyContextType | undefined>(undefined);

// Provider component
export const MyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State and methods
  
  return (
    <MyContext.Provider value={{ /* context value */ }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
};
```

### Hook Pattern
```typescript
// Custom hook template
export const useCustomHook = (dependencies: any[]) => {
  // State declarations
  
  // Effects
  
  // Event handlers
  
  // Return values
  return {
    // Hook return values
  };
};
```

## 📊 Code Metrics

### File Counts
- **Total Files**: 50+
- **Components**: 15+
- **Pages**: 7
- **Hooks**: 3
- **Services**: 3
- **Utilities**: 10+

### Lines of Code
- **Total LOC**: 15,000+
- **Components**: 8,000+
- **Pages**: 4,000+
- **Services**: 2,000+
- **Utilities**: 1,000+

## 🎨 Design System

### Color Palette
```css
:root {
  --primary: #3B82F6;
  --secondary: #8B5CF6;
  --accent: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --success: #10B981;
}
```

### Typography
```css
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-serif: 'Georgia', serif;
}
```

### Spacing Scale
```css
:root {
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
}
```

## 🔧 Build Configuration

### Vite Configuration
- **React Plugin** for JSX support
- **TypeScript** compilation
- **CSS Processing** with PostCSS
- **Asset Optimization** and compression

### TypeScript Configuration
- **Strict Mode** enabled
- **ES2020** target
- **Module Resolution** with path mapping
- **Type Checking** for all files

## 📈 Performance Monitoring

### Metrics Tracked
- **Bundle Size** analysis
- **Load Time** measurements
- **Runtime Performance** monitoring
- **Memory Usage** tracking

### Optimization Tools
- **Webpack Bundle Analyzer** for bundle analysis
- **Lighthouse** for performance scoring
- **React DevTools** for component profiling
- **Performance API** for runtime metrics

---

**This directory contains the core application logic and UI components. All development work should follow the established patterns and guidelines documented here.**
