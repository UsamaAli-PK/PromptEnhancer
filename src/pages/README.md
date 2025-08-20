# Pages Directory 📄

> **Page-level components** - Main route components that represent different views in the application

## 📋 Overview

The `pages/` directory contains all the page-level components that represent different routes in the PromptEnhancer application. Each page is a top-level component that handles a specific route and provides the main user interface for that section of the application.

## 🏗️ Page Architecture

### Design Principles
- **Single Responsibility** - Each page handles one specific route
- **Route-Based** - Pages correspond directly to application routes
- **Composition** - Pages compose smaller components for functionality
- **Responsive** - All pages are mobile-first and responsive
- **Accessibility** - WCAG compliant with proper navigation

### Page Structure
```typescript
// Standard page template
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

/**
 * Page description
 * @returns JSX element representing the page
 */
const PageName: React.FC = () => {
  // Page logic and state
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page content */}
      </div>
    </div>
  );
};

export default PageName;
```

## 📁 Available Pages

### 🏠 Public Pages

#### LandingPage
**Public landing page** that showcases the application features and encourages user signup.

**Route:** `/`
**Access:** Public (no authentication required)

**Features:**
- Hero section with value proposition
- Feature showcase with examples
- Tool category overview
- Testimonials and social proof
- Call-to-action for signup
- Pricing information

**Key Sections:**
- **Hero**: Main headline and CTA
- **Features**: 6 core feature highlights
- **Tools**: Tool category showcase
- **Testimonials**: User feedback carousel
- **Pricing**: Subscription plans
- **Footer**: Links and information

**Components Used:**
- Hero section with animated text
- Feature grid with icons
- Tool category cards
- Testimonial carousel
- Pricing table
- Footer navigation

**State Management:**
- Current testimonial index
- Tool category selection
- Video modal state
- Annual/monthly pricing toggle

**Responsive Design:**
- Mobile-first layout
- Tablet and desktop optimizations
- Touch-friendly interactions
- Optimized for all screen sizes

#### AuthPage
**Authentication page** for user signup and login.

**Route:** `/auth`
**Access:** Public (no authentication required)

**Features:**
- Toggle between login and signup
- Form validation and error handling
- Password strength indicators
- Social authentication options
- Forgot password functionality

**Form Fields:**
- **Login Mode**: Email, Password
- **Signup Mode**: Name, Email, Password, Confirm Password

**Validation:**
- Email format validation
- Password strength requirements
- Name length validation
- Real-time validation feedback

**State Management:**
- Form data state
- Validation errors
- Loading states
- Authentication mode toggle

**Error Handling:**
- Form validation errors
- Authentication API errors
- Network error handling
- User-friendly error messages

### 🔐 Protected Pages

#### Dashboard
**Main user dashboard** that displays available tools and user statistics.

**Route:** `/dashboard`
**Access:** Protected (authentication required)

**Features:**
- Tool grid with categories
- Search and filtering
- Quick actions panel
- Usage statistics
- Recent activity

**Tool Categories:**
- **Development**: Code generation, debugging
- **Design**: Image prompts, UI design
- **Marketing**: Copywriting, social media
- **Writing**: Content creation, editing
- **Data**: SQL queries, analysis

**Search & Filter:**
- Text search across tools
- Category-based filtering
- View mode toggle (grid/list)
- Extended tools toggle

**Quick Actions:**
- View saved prompts
- Recent activity
- Team workspace
- Favorite tools

**Usage Stats:**
- Prompts enhanced count
- Tools used count
- Time saved metrics
- Success rate percentage

**State Management:**
- Search term state
- Category filter state
- View mode state
- Extended tools toggle

#### ToolPage
**Individual tool interface** for specific prompt enhancement tools.

**Route:** `/tool/:toolId`
**Access:** Protected (authentication required)

**Features:**
- Tool-specific configuration
- Input text area
- File upload support
- Output formatting options
- Save and export functionality

**Tool Configuration:**
- Provider selection (OpenAI, Anthropic, etc.)
- Model selection (GPT-4, Claude, etc.)
- Tone and style options
- Output format selection

**File Upload:**
- Drag and drop interface
- Multiple file support
- Content extraction
- File validation

**Output Options:**
- Text format
- JSON format
- Markdown format
- HTML format
- PDF export

**State Management:**
- Tool configuration state
- Input text state
- File upload state
- Output state
- Loading states

#### HybridToolPage
**Dynamic tool interface** that adapts to different tool types.

**Route:** `/tool/:toolId` and `/hybrid-tool/:toolId`
**Access:** Protected (authentication required)

**Features:**
- Dynamic tool configuration loading
- Universal interface for all tools
- Advanced file handling
- Real-time prompt enhancement
- Database integration

**Dynamic Configuration:**
- Tool metadata from JSON config
- Provider and model options
- File upload rules
- Output format options

**File Processing:**
- Text file content extraction
- Image preview generation
- Code file syntax highlighting
- Document parsing

**Prompt Enhancement:**
- AI-powered optimization
- Context-aware improvements
- Multi-format output
- Cost tracking

**Database Integration:**
- Save enhanced prompts
- User prompt history
- Tag and categorization
- Search and filtering

#### LibraryPage
**Saved prompts library** for managing user's enhanced prompts.

**Route:** `/library`
**Access:** Protected (authentication required)

**Features:**
- Saved prompts grid/list view
- Search and filtering
- Prompt management (edit/delete)
- Export functionality
- Tag organization

**Prompt Display:**
- Title and description
- Input and enhanced text
- Tool type and provider
- Creation date
- Tags and categories

**Search & Filter:**
- Text search across prompts
- Tool type filtering
- Date range filtering
- Tag-based filtering

**Management Actions:**
- Edit prompt details
- Delete prompts
- Export prompts
- Share prompts
- Organize with tags

**State Management:**
- Prompts data state
- Search and filter state
- View mode state
- Selected prompt state

#### ProfilePage
**User profile and settings** management page.

**Route:** `/profile`
**Access:** Protected (authentication required)

**Features:**
- Profile information editing
- API key management
- User preferences
- Security settings
- Account statistics

**Profile Sections:**
- **Profile**: Name, email, avatar
- **API Keys**: Provider credentials
- **Security**: Password change, 2FA
- **Preferences**: Theme, notifications
- **Notifications**: Email preferences

**API Key Management:**
- OpenAI API key
- Anthropic API key
- Custom provider keys
- Key validation
- Secure storage

**User Preferences:**
- Theme selection (light/dark)
- Default provider
- Default model
- Email notifications
- Push notifications

**Security Features:**
- Password change
- Two-factor authentication
- Session management
- Login history

**State Management:**
- Profile data state
- Settings state
- Form validation state
- Loading states

#### NotFoundPage
**404 error page** for invalid routes.

**Route:** `*` (catch-all)
**Access:** Public (no authentication required)

**Features:**
- User-friendly error message
- Navigation back to main pages
- Search functionality
- Helpful suggestions

**Content:**
- Clear error message
- Navigation options
- Search bar
- Popular tools links
- Contact support

## 🎯 Page Categories

### 1. Public Pages
Pages accessible to all users without authentication.

**Examples:**
- `LandingPage` - Application introduction
- `AuthPage` - User authentication
- `NotFoundPage` - Error handling

### 2. Protected Pages
Pages requiring user authentication and authorization.

**Examples:**
- `Dashboard` - Main user interface
- `ToolPage` - Tool-specific interfaces
- `LibraryPage` - User content management
- `ProfilePage` - User settings

### 3. Dynamic Pages
Pages that adapt their content based on route parameters.

**Examples:**
- `ToolPage` - Tool-specific configuration
- `HybridToolPage` - Universal tool interface

## 🔧 Page Development

### Creating New Pages

1. **Create Page File**
   ```bash
   touch src/pages/NewPage.tsx
   ```

2. **Add Route to App.tsx**
   ```typescript
   <Route path="/new-page" element={<NewPage />} />
   ```

3. **Implement Page Component**
   ```typescript
   const NewPage: React.FC = () => {
     return (
       <div className="min-h-screen bg-gray-50">
         <Navbar />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
           {/* Page content */}
         </div>
       </div>
     );
   };
   ```

4. **Add Navigation Links**
   ```typescript
   // In Navbar or other navigation components
   <Link to="/new-page">New Page</Link>
   ```

### Page Testing

**Unit Tests:**
```typescript
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NewPage from './NewPage';

describe('NewPage', () => {
  it('renders page content', () => {
    render(
      <BrowserRouter>
        <NewPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Page Title')).toBeInTheDocument();
  });
});
```

**Integration Tests:**
```typescript
describe('NewPage Integration', () => {
  it('handles user interactions', () => {
    // Test page-specific functionality
  });
  
  it('integrates with navigation', () => {
    // Test routing and navigation
  });
});
```

## 🎨 Styling Guidelines

### Layout Patterns
- **Consistent Spacing**: Use Tailwind spacing scale
- **Responsive Grids**: Mobile-first responsive design
- **Card Layouts**: Consistent card styling
- **Navigation**: Unified navigation patterns

### Color Scheme
```css
/* Page background colors */
.bg-gray-50    /* Light pages */
.bg-slate-900  /* Dark pages */
.bg-gradient   /* Gradient backgrounds */

/* Content containers */
.bg-white      /* Card backgrounds */
.bg-gray-100   /* Section backgrounds */
```

### Typography
```css
/* Page titles */
.text-3xl font-bold text-gray-900

/* Section headers */
.text-xl font-semibold text-gray-800

/* Body text */
.text-gray-600 leading-relaxed

/* Caption text */
.text-sm text-gray-500
```

## 📱 Responsive Design

### Breakpoint Strategy
- **Mobile First**: Design for mobile, enhance for larger screens
- **Consistent Breakpoints**: Use Tailwind's responsive utilities
- **Touch Friendly**: Appropriate touch targets and spacing
- **Content Adaptation**: Content reflows for different screen sizes

### Responsive Patterns
```typescript
// Responsive page layout
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4 
  md:gap-6 
  lg:gap-8
">
  {/* Responsive content */}
</div>

// Responsive spacing
<div className="
  px-4 
  sm:px-6 
  lg:px-8 
  py-6 
  md:py-8 
  lg:py-12
">
  {/* Content with responsive padding */}
</div>
```

## ♿ Accessibility Features

### Navigation
- **Skip Links**: Skip to main content
- **Breadcrumbs**: Clear navigation hierarchy
- **Active States**: Current page indication
- **Keyboard Navigation**: Full keyboard support

### Content Structure
- **Semantic HTML**: Proper heading hierarchy
- **Landmarks**: ARIA landmarks for screen readers
- **Focus Management**: Clear focus indicators
- **Color Contrast**: WCAG compliant contrast ratios

### Error Handling
- **Error Messages**: Clear, actionable error text
- **Validation Feedback**: Real-time form validation
- **Loading States**: Clear loading indicators
- **Success Feedback**: Confirmation of actions

## 🚀 Performance Optimization

### Page Loading
- **Lazy Loading**: Load pages on demand
- **Code Splitting**: Split by route
- **Preloading**: Preload critical pages
- **Caching**: Cache page data

### Content Optimization
- **Image Optimization**: Responsive images
- **Font Loading**: Optimize font loading
- **Bundle Splitting**: Split vendor and app code
- **Tree Shaking**: Remove unused code

## 🧪 Testing Strategy

### Testing Levels
1. **Unit Tests**: Individual page component testing
2. **Integration Tests**: Page interaction testing
3. **Route Tests**: Navigation and routing testing
4. **E2E Tests**: Complete user journey testing

### Testing Tools
- **Jest**: Test runner and framework
- **React Testing Library**: Component testing
- **MSW**: API mocking for data
- **Playwright**: E2E testing

## 📚 Documentation Standards

### Page Documentation
Each page should include:

1. **Purpose**: What the page does
2. **Route**: URL path and access level
3. **Features**: Key functionality
4. **Components**: Components used
5. **State**: State management approach
6. **Responsiveness**: Mobile considerations

### Code Comments
```typescript
/**
 * User dashboard page displaying available tools and statistics
 * @route /dashboard
 * @access Protected (authentication required)
 * @returns Dashboard JSX element
 */
const Dashboard: React.FC = () => {
  // Implementation
};
```

## 🔄 State Management

### Page-Level State
- **Local State**: Component-specific state
- **Route State**: URL parameters and query strings
- **Form State**: Form data and validation
- **UI State**: Loading, error, and success states

### Global State
- **Authentication**: User login status
- **User Data**: Profile and preferences
- **Navigation**: Current route and history
- **Theme**: Application appearance

## 📊 Page Metrics

### Current Stats
- **Total Pages**: 7
- **Public Pages**: 3
- **Protected Pages**: 4
- **Lines of Code**: 4,000+

### Performance Metrics
- **Load Time**: <2s target
- **Bundle Size**: Optimized per route
- **Accessibility Score**: 95%+
- **Mobile Performance**: Optimized

---

**This directory contains all page-level components. Each page represents a specific route and provides the main user interface for that section of the application.**
