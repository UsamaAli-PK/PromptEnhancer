# Library Directory 📚

> **Core libraries and services** - Essential utilities, database operations, and API integrations

## 📋 Overview

The `lib/` directory contains the core libraries and services that provide essential functionality to the PromptEnhancer application. This includes database operations, API integrations, utility functions, and core business logic.

## 🏗️ Library Architecture

### Design Principles
- **Single Responsibility** - Each service has one clear purpose
- **Dependency Injection** - Services are injectable and testable
- **Error Handling** - Comprehensive error handling and logging
- **Type Safety** - Full TypeScript support with proper interfaces
- **Performance** - Optimized for speed and efficiency

### Service Structure
```typescript
// Standard service template
export class ServiceName {
  private dependencies: ServiceDependencies;
  
  constructor(dependencies: ServiceDependencies) {
    this.dependencies = dependencies;
  }
  
  /**
   * Method description
   * @param params - Method parameters
   * @returns Promise with result
   */
  async methodName(params: MethodParams): Promise<MethodResult> {
    try {
      // Implementation logic
      return result;
    } catch (error) {
      console.error('Service error:', error);
      throw new Error('User-friendly error message');
    }
  }
}

export const serviceInstance = new ServiceName(dependencies);
```

## 📁 Available Services

### 🗄️ Database Services

#### supabase.ts
**Supabase client configuration** and type definitions for the database layer.

**Features:**
- Supabase client initialization
- Database type definitions
- Connection configuration
- Environment variable handling

**Configuration:**
```typescript
const supabaseUrl = 'https://wxzmhucqnyrffvlxqgmw.supabase.co';
const supabaseAnonKey = 'your_anon_key_here';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Type Definitions:**
- `User` - User profile information
- `SavedPrompt` - Enhanced prompt data
- `UserSettings` - User preferences and configuration

**Usage:**
```typescript
import { supabase } from '../lib/supabase';

// Direct database operations
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)
  .single();
```

#### database.ts
**Comprehensive database service** that provides CRUD operations for all database tables.

**Features:**
- User profile management
- Prompt CRUD operations
- User settings management
- Search and filtering
- Analytics and statistics

**Available Operations:**

**User Operations:**
```typescript
// Get user profile
const profile = await databaseService.getUserProfile(userId);

// Create user profile
const newProfile = await databaseService.createUserProfile(userId, email, name);

// Update user profile
const updatedProfile = await databaseService.updateUserProfile(userId, updates);
```

**Prompt Operations:**
```typescript
// Save new prompt
const savedPrompt = await databaseService.savePrompt(promptData);

// Get user's prompts
const prompts = await databaseService.getSavedPrompts(userId);

// Search prompts
const searchResults = await databaseService.searchPrompts(userId, searchTerm);

// Get prompts by tool type
const toolPrompts = await databaseService.getPromptsByToolType(userId, toolType);

// Update prompt
const updatedPrompt = await databaseService.updatePrompt(promptId, updates);

// Delete prompt
const deleted = await databaseService.deletePrompt(promptId);
```

**Settings Operations:**
```typescript
// Get user settings
const settings = await databaseService.getUserSettings(userId);

// Create default settings
const defaultSettings = await databaseService.createDefaultUserSettings(userId);

// Update settings
const updatedSettings = await databaseService.updateUserSettings(userId, updates);
```

**Analytics Operations:**
```typescript
// Get prompt statistics
const stats = await databaseService.getPromptStats(userId);
// Returns: { totalPrompts, toolTypeBreakdown, recentActivity }
```

**Error Handling:**
- Comprehensive try-catch blocks
- Detailed error logging
- User-friendly error messages
- Graceful fallbacks

**Performance Features:**
- Optimized database queries
- Proper indexing support
- Connection pooling
- Query result caching

### 🌐 API Services

#### api.ts
**AI provider API integration** service for connecting to various AI models and services.

**Features:**
- Multi-provider support (OpenAI, Anthropic, Google, etc.)
- Dynamic model selection
- Cost tracking and usage monitoring
- Error handling and retry logic
- Response optimization

**Supported Providers:**
- **OpenAI**: GPT-4, GPT-5, DALL·E 3
- **Anthropic**: Claude 3.7, Claude 3 Sonnet, Claude 3 Haiku
- **Google**: Gemini Ultra, Gemini Pro, Gemini Flash
- **Mistral AI**: Mistral Large, Mixtral-8x7B, Mistral Medium
- **Meta**: LLaMA 3 70B, LLaMA 3 8B, Code Llama
- **Additional**: Cohere, Groq, Perplexity APIs

**API Operations:**
```typescript
// Enhance prompt with AI
const response = await apiService.enhancePrompt({
  prompt: userInput,
  provider: selectedProvider,
  model: selectedModel,
  tone: selectedTone,
  outputFormat: selectedFormat,
  fileContent: uploadedFiles,
  toolType: tool.name
});

// Get available providers
const providers = apiService.getAvailableProviders();

// Get provider models
const models = apiService.getProviderModels(providerName);
```

**Prompt Enhancement:**
- System prompt generation
- User prompt optimization
- Context integration
- Output formatting
- Cost calculation

**Error Handling:**
- API rate limiting
- Network failures
- Invalid responses
- Authentication errors
- Retry mechanisms

## 🔧 Utility Functions

### Type Definitions
```typescript
// AI Provider Interface
export interface AIProvider {
  name: string;
  models: string[];
  apiKey: string;
  baseUrl?: string;
}

// Enhancement Request
export interface EnhancementRequest {
  prompt: string;
  provider: string;
  model: string;
  tone: string;
  outputFormat: string;
  fileContent?: string[];
  toolType: string;
}

// Enhancement Response
export interface EnhancementResponse {
  enhancedPrompt: string;
  provider: string;
  model: string;
  usage?: {
    tokens: number;
    cost: number;
  };
}
```

### Helper Functions
```typescript
// Model name mapping
private mapModelName(displayName: string, provider: string): string

// Tone temperature calculation
private getToneTemperature(tone: string): number

// Cost calculation
private calculateCost(tokens: number, provider: string, model: string): number

// System prompt building
private buildSystemPrompt(request: EnhancementRequest): string

// User prompt building
private buildUserPrompt(request: EnhancementRequest): string
```

## 🚀 Performance Features

### Database Optimization
- **Connection Pooling**: Efficient database connections
- **Query Optimization**: Optimized SQL queries
- **Indexing**: Proper database indexes
- **Caching**: Result caching strategies

### API Optimization
- **Request Batching**: Batch multiple requests
- **Response Caching**: Cache API responses
- **Rate Limiting**: Respect API rate limits
- **Connection Reuse**: Reuse HTTP connections

### Memory Management
- **Garbage Collection**: Proper cleanup
- **Memory Leaks**: Prevention strategies
- **Resource Pooling**: Efficient resource usage
- **Lazy Loading**: Load resources on demand

## 🔒 Security Features

### Authentication
- **JWT Tokens**: Secure authentication
- **API Key Management**: Secure key storage
- **Request Signing**: Signed API requests
- **Access Control**: Role-based permissions

### Data Protection
- **Input Validation**: Sanitize all inputs
- **SQL Injection**: Prevention measures
- **XSS Protection**: Cross-site scripting prevention
- **CSRF Protection**: Cross-site request forgery prevention

### Privacy
- **Data Encryption**: Encrypt sensitive data
- **User Isolation**: Proper data separation
- **Audit Logging**: Track data access
- **GDPR Compliance**: Privacy regulation compliance

## 🧪 Testing Strategy

### Unit Testing
```typescript
// Service testing example
describe('DatabaseService', () => {
  it('should create user profile', async () => {
    const mockSupabase = createMockSupabase();
    const service = new DatabaseService(mockSupabase);
    
    const result = await service.createUserProfile('user-id', 'test@example.com', 'Test User');
    expect(result).toBeDefined();
  });
});
```

### Integration Testing
```typescript
// API integration testing
describe('APIService Integration', () => {
  it('should enhance prompt with OpenAI', async () => {
    const service = new APIService();
    const response = await service.enhancePrompt(mockRequest);
    
    expect(response.enhancedPrompt).toBeDefined();
    expect(response.provider).toBe('OpenAI');
  });
});
```

### Mock Services
```typescript
// Mock service for testing
export const createMockDatabaseService = (): DatabaseService => {
  return {
    getUserProfile: jest.fn(),
    createUserProfile: jest.fn(),
    savePrompt: jest.fn(),
    // ... other methods
  };
};
```

## 📚 Documentation Standards

### Service Documentation
Each service should include:

1. **Purpose**: What the service does
2. **Dependencies**: Required dependencies
3. **Methods**: Available methods with parameters
4. **Error Handling**: Error scenarios and handling
5. **Performance**: Performance considerations
6. **Security**: Security implications

### Code Comments
```typescript
/**
 * Database service for managing user data and prompts
 * 
 * This service provides CRUD operations for:
 * - User profiles and settings
 * - Saved prompts and history
 * - Search and filtering operations
 * - Analytics and statistics
 * 
 * @example
 * ```typescript
 * const userProfile = await databaseService.getUserProfile(userId);
 * const savedPrompts = await databaseService.getSavedPrompts(userId);
 * ```
 */
export class DatabaseService {
  // Implementation
}
```

## 🔄 State Management

### Service State
- **Connection State**: Database connection status
- **Cache State**: Cached data management
- **Error State**: Error tracking and recovery
- **Performance State**: Performance metrics

### Global State Integration
- **Context Integration**: React context integration
- **State Synchronization**: Keep services in sync
- **Event Handling**: Handle state changes
- **Optimistic Updates**: Immediate UI updates

## 📊 Service Metrics

### Performance Metrics
- **Response Time**: <100ms target for database operations
- **Throughput**: 1000+ operations per second
- **Error Rate**: <1% error rate target
- **Availability**: 99.9% uptime target

### Monitoring
- **Health Checks**: Service health monitoring
- **Performance Tracking**: Response time tracking
- **Error Tracking**: Error rate monitoring
- **Usage Analytics**: Service usage statistics

## 🚀 Deployment Considerations

### Environment Configuration
```typescript
// Environment-specific configuration
const config = {
  development: {
    databaseUrl: process.env.DEV_DATABASE_URL,
    apiTimeout: 5000,
    retryAttempts: 3
  },
  production: {
    databaseUrl: process.env.PROD_DATABASE_URL,
    apiTimeout: 10000,
    retryAttempts: 5
  }
};
```

### Scaling Strategies
- **Horizontal Scaling**: Multiple service instances
- **Load Balancing**: Distribute requests
- **Caching Layers**: Multiple cache levels
- **Database Sharding**: Data distribution

## 🔧 Development Guidelines

### Adding New Services

1. **Create Service File**
   ```bash
   touch src/lib/NewService.ts
   ```

2. **Define Interface**
   ```typescript
   export interface NewServiceInterface {
     methodName(param: ParamType): Promise<ResultType>;
   }
   ```

3. **Implement Service**
   ```typescript
   export class NewService implements NewServiceInterface {
     async methodName(param: ParamType): Promise<ResultType> {
       // Implementation
     }
   }
   ```

4. **Add to Index**
   ```typescript
   // src/lib/index.ts
   export { NewService } from './NewService';
   ```

### Error Handling Patterns
```typescript
// Standard error handling pattern
try {
  const result = await operation();
  return result;
} catch (error) {
  console.error('Service error:', error);
  
  if (error.code === 'SPECIFIC_ERROR') {
    throw new Error('User-friendly specific error message');
  }
  
  throw new Error('Generic error message');
}
```

## 📈 Future Enhancements

### Planned Features
- **Real-time Updates**: WebSocket integration
- **Advanced Caching**: Redis integration
- **Background Jobs**: Queue processing
- **Microservices**: Service decomposition
- **GraphQL**: Alternative to REST APIs

### Performance Improvements
- **Database Optimization**: Query optimization
- **Connection Pooling**: Better connection management
- **Response Compression**: Reduce bandwidth usage
- **CDN Integration**: Content delivery optimization

---

**This directory contains all core libraries and services. These services provide essential functionality and should be designed with performance, security, and maintainability in mind.**
