# Components Directory 📦

> **Reusable UI components** - Modular, reusable components used throughout the application

## 📋 Overview

The `components/` directory contains all the reusable UI components that make up the PromptEnhancer application. These components are designed to be modular, maintainable, and follow consistent design patterns.

## 🏗️ Component Architecture

### Design Principles
- **Single Responsibility** - Each component has one clear purpose
- **Reusability** - Components can be used in multiple contexts
- **Composition** - Complex UIs built from simple components
- **Accessibility** - WCAG compliant with proper ARIA labels
- **Responsive** - Mobile-first design approach

### Component Structure
```typescript
// Standard component template
import React from 'react';
import { ComponentProps } from './types';

interface ComponentProps {
  // Props interface with JSDoc comments
}

/**
 * Component description
 * @param props - Component properties
 * @returns JSX element
 */
export const Component: React.FC<ComponentProps> = ({ 
  // Destructured props with defaults
}) => {
  // Component logic and state
  
  return (
    // JSX return with proper accessibility
  );
};
```

## 📁 Available Components

### 🔐 Authentication & Security

#### ProtectedRoute
**Authentication guard component** that protects routes from unauthorized access.

**Features:**
- Route protection based on authentication status
- Automatic redirect to login page
- Loading state handling
- Error boundary integration

**Usage:**
```tsx
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

**Props:**
- `children` - React nodes to render when authenticated

#### ErrorBoundary
**Error handling wrapper** that catches and displays component errors gracefully.

**Features:**
- Catches JavaScript errors in child components
- Displays fallback UI when errors occur
- Logs error information for debugging
- Prevents app crashes

**Usage:**
```tsx
<ErrorBoundary>
  <ComponentThatMightError />
</ErrorBoundary>
```

### 🧭 Navigation & Layout

#### Navbar
**Main navigation component** that provides site-wide navigation and user controls.

**Features:**
- Responsive navigation menu
- User authentication status
- Profile dropdown menu
- Mobile hamburger menu
- Active route highlighting

**Components:**
- Logo and branding
- Navigation links
- User profile section
- Mobile menu toggle

**State Management:**
- Authentication context integration
- Responsive breakpoint handling
- Navigation state management

### 🛠️ Tool Interface

#### HybridToolPage
**Dynamic tool interface** that renders different tool configurations based on tool ID.

**Features:**
- Dynamic tool configuration loading
- File upload integration
- AI provider selection
- Model and parameter configuration
- Real-time prompt enhancement
- Database integration for saving prompts
- Prompt templates from `src/config/prompts.json` (optimized Markdown)
- Option B calls using user API key/base URL
- Prompt size/file truncation guards and format-aware downloads

**Key Sections:**
- Tool configuration panel
- Input text area
- File upload zone
- Enhanced output display
- Settings and options

**State Management:**
- Tool configuration state
- User input state
- File upload state
- Enhancement process state
- Database save state

**File Upload:**
- Drag and drop support
- Multiple file types
- Content extraction
- File validation
- Preview generation

#### FileUpload
**File handling component** for uploading and processing various file types.

**Features:**
- Drag and drop interface
- Multiple file support
- File type validation
- Content extraction
- Progress indicators
- Error handling

**Supported File Types:**
- **Text Files**: `.txt`, `.md`, `.docx`, `.pdf`
- **Code Files**: `.py`, `.js`, `.ts`, `.cpp`, `.java`
- **Image Files**: `.png`, `.jpg`, `.jpeg`, `.webp`
- **Data Files**: `.json`, `.csv`, `.xml`, `.yaml`

**File Processing:**
- Text content extraction
- Image preview generation
- File size validation
- Type-specific handling

### ⚙️ Configuration & Settings

#### ApiKeyManager
**API key management component** for configuring AI provider credentials.

**Features:**
- Secure API key input
- Multiple provider support
- Key validation
- Base URL configuration
- Model selection
- Save/delete operations

**Supported Providers:**
- OpenAI
- Anthropic
- Google Gemini
- Custom providers

**Security Features:**
- Masked key display
- Secure storage
- Input validation
- Error handling

#### FormValidation
**Form validation utilities** for consistent input validation across the application.

**Features:**
- Email validation
- Password strength checking
- Name validation
- Real-time validation
- Error message display
- Validation state management

**Validation Rules:**
- **Email**: RFC compliant email format
- **Password**: Minimum 8 characters, complexity requirements
- **Name**: Non-empty, reasonable length
- **Custom**: Extensible validation rules

### 🎨 UI Elements

#### LoadingSpinner
**Loading state component** for asynchronous operations.

**Features:**
- Animated spinner
- Customizable size
- Loading text support
- Accessibility labels
- Consistent styling

**Variants:**
- Small (16x16)
- Medium (24x24)
- Large (32x32)
- Extra Large (48x48)

**Usage:**
```tsx
<LoadingSpinner size="large" text="Loading..." />
```

## 🎯 Component Categories

### 1. Layout Components
Components that define the overall structure and layout of the application.

**Examples:**
- `Navbar` - Site navigation
- `Layout` - Page structure wrapper
- `Container` - Content width management
- `Grid` - Layout grid system

### 2. Form Components
Components for data input and form handling.

**Examples:**
- `Input` - Text input fields
- `Select` - Dropdown selections
- `Button` - Action buttons
- `FormValidation` - Validation utilities

### 3. Display Components
Components for showing data and content.

**Examples:**
- `Card` - Content containers
- `Table` - Data tables
- `Modal` - Overlay dialogs
- `Tooltip` - Information hints

### 4. Interactive Components
Components that respond to user interactions.

**Examples:**
- `FileUpload` - File handling
- `ApiKeyManager` - Configuration
- `HybridToolPage` - Tool interface
- `ProtectedRoute` - Route protection

## 🔧 Component Development

### Creating New Components

1. **Create Component File**
   ```bash
   touch src/components/NewComponent.tsx
   ```

2. **Add TypeScript Interface**
   ```typescript
   interface NewComponentProps {
     title: string;
     onAction?: () => void;
     disabled?: boolean;
   }
   ```

3. **Implement Component**
   ```typescript
   export const NewComponent: React.FC<NewComponentProps> = ({
     title,
     onAction,
     disabled = false
   }) => {
     return (
       <div className="new-component">
         <h2>{title}</h2>
         <button 
           onClick={onAction} 
           disabled={disabled}
           className="btn btn-primary"
         >
           Action
         </button>
       </div>
     );
   };
   ```

4. **Add to Index File**
   ```typescript
   // src/components/index.ts
   export { NewComponent } from './NewComponent';
   ```

### Component Testing

**Unit Tests:**
```typescript
import { render, screen } from '@testing-library/react';
import { NewComponent } from './NewComponent';

describe('NewComponent', () => {
  it('renders with title', () => {
    render(<NewComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
```

**Integration Tests:**
```typescript
describe('NewComponent Integration', () => {
  it('handles user interactions', () => {
    const mockAction = jest.fn();
    render(<NewComponent title="Test" onAction={mockAction} />);
    
    fireEvent.click(screen.getByText('Action'));
    expect(mockAction).toHaveBeenCalled();
  });
});
```

## 🎨 Styling Guidelines

### CSS Classes
- **Utility-First**: Use Tailwind CSS utilities
- **Component-Specific**: Add custom classes when needed
- **Responsive**: Mobile-first responsive design
- **Accessibility**: High contrast and readable text

### Design Tokens
```css
:root {
  /* Colors */
  --primary: #3B82F6;
  --secondary: #8B5CF6;
  --accent: #10B981;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Component Variants
```typescript
// Component with variants
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const buttonVariants = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
  danger: 'bg-red-500 hover:bg-red-600 text-white'
};

const buttonSizes = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};
```

## 📱 Responsive Design

### Breakpoint Strategy
- **Mobile First**: Design for mobile, enhance for larger screens
- **Tailwind Breakpoints**: Use Tailwind's responsive utilities
- **Flexible Layouts**: Components adapt to available space
- **Touch Friendly**: Appropriate touch targets for mobile

### Responsive Patterns
```typescript
// Responsive component example
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4 
  p-4 
  md:p-6 
  lg:p-8
">
  {/* Content */}
</div>
```

## ♿ Accessibility Features

### ARIA Labels
- **Proper Labels**: All interactive elements have labels
- **Screen Reader Support**: Semantic HTML and ARIA attributes
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Clear focus indicators

### Accessibility Checklist
- [ ] Semantic HTML elements
- [ ] ARIA labels and descriptions
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] Color contrast compliance
- [ ] Focus management

## 🚀 Performance Optimization

### Component Optimization
- **React.memo**: Memoize expensive components
- **useCallback**: Stable function references
- **useMemo**: Expensive calculations
- **Lazy Loading**: Load components on demand

### Bundle Optimization
- **Tree Shaking**: Remove unused code
- **Code Splitting**: Split by routes and features
- **Dynamic Imports**: Load components when needed
- **Bundle Analysis**: Monitor bundle size

## 🧪 Testing Strategy

### Testing Levels
1. **Unit Tests**: Individual component testing
2. **Integration Tests**: Component interaction testing
3. **Visual Tests**: UI consistency testing
4. **Accessibility Tests**: A11y compliance testing

### Testing Tools
- **Jest**: Test runner and framework
- **React Testing Library**: Component testing utilities
- **MSW**: API mocking
- **Playwright**: E2E testing

## 📚 Documentation Standards

### Component Documentation
Each component should include:

1. **Purpose**: What the component does
2. **Props**: Interface and prop descriptions
3. **Usage**: Code examples
4. **Variants**: Different states and appearances
5. **Accessibility**: A11y considerations
6. **Performance**: Optimization notes

### JSDoc Comments
```typescript
/**
 * Button component for user interactions
 * @param props - Button properties
 * @param props.variant - Visual style variant
 * @param props.size - Button size
 * @param props.children - Button content
 * @param props.onClick - Click handler
 * @returns Button JSX element
 */
export const Button: React.FC<ButtonProps> = ({ ... }) => {
  // Implementation
};
```

## 🔄 State Management

### Local State
- **useState**: Component-level state
- **useReducer**: Complex state logic
- **useEffect**: Side effects and lifecycle

### Global State
- **React Context**: App-wide state
- **Custom Hooks**: Reusable state logic
- **State Machines**: Complex state flows

## 📊 Component Metrics

### Current Stats
- **Total Components**: 15+
- **Lines of Code**: 8,000+
- **Test Coverage**: 80%+
- **Bundle Size**: Optimized

### Performance Metrics
- **Render Time**: <16ms target
- **Bundle Size**: <100KB per component
- **Memory Usage**: Minimal footprint
- **Accessibility Score**: 95%+

---

**This directory contains all reusable UI components. Follow the established patterns and guidelines when creating new components or modifying existing ones.**
