# Configuration Directory ⚙️

> **Application configuration files** - Tool definitions, settings, and configuration data

## 📋 Overview

The `config/` directory contains all the configuration files that define the behavior, tools, and settings of the PromptEnhancer application. These files are loaded at runtime and provide dynamic configuration for the application's features and functionality.

## 🏗️ Configuration Architecture

### Design Principles
- **JSON-Based** - Human-readable configuration format
- **Dynamic Loading** - Configuration loaded at runtime
- **Version Control** - Configuration tracked in source control
- **Environment Aware** - Different configs for different environments
- **Validation** - Configuration validation and error handling

### Configuration Structure
```json
{
  "metadata": {
    "version": "1.0.0",
    "lastUpdated": "2024-01-15",
    "description": "Configuration description"
  },
  "settings": {
    "defaults": {},
    "options": {},
    "constraints": {}
  },
  "data": [
    // Configuration data array
  ]
}
```

## 📁 Available Configuration Files

### 🛠️ Tools Configuration

#### tools.json
**Comprehensive tool definitions** containing metadata for all 40+ available tools.

**File Size:** ~28KB (803 lines)
**Last Updated:** Current implementation

**Structure:**
```json
{
  "tools": [
    {
      "id": "tool-identifier",
      "name": "Human Readable Name",
      "description": "Detailed tool description",
      "categories": ["Category1", "Category2"],
      "providers": ["Provider1", "Provider2"],
      "models": {
        "Provider1": ["Model1", "Model2"],
        "Provider2": ["Model3", "Model4"]
      },
      "agents": ["Agent1", "Agent2"],
      "allowCustomProvider": true,
      "allowCustomModel": true,
      "allowCustomAgent": true,
      "fileUploadRules": {
        "allowedTypes": [".ext1", ".ext2"],
        "maxSizeMB": 20
      },
      "outputFormats": {
        "options": ["Format1", "Format2"],
        "defaultFormat": "Format1"
      }
    }
  ]
}
```

**Tool Categories:**
- **Development**: Code generation, debugging, optimization
- **Design**: Image prompts, UI design, creative content
- **Marketing**: Copywriting, social media, advertising
- **Writing**: Content creation, editing, translation
- **Data**: SQL queries, analysis, visualization
- **Social Media**: Platform-specific content
- **Business**: Professional communication, reports

**Supported Providers:**
- **OpenAI**: GPT-4, GPT-5, DALL·E 3
- **Anthropic**: Claude 3.7, Claude 3 Sonnet, Claude 3 Haiku
- **Google**: Gemini Ultra, Gemini Pro, Gemini Flash
- **Mistral AI**: Mistral Large, Mixtral-8x7B, Mistral Medium
- **Meta**: LLaMA 3 70B, LLaMA 3 8B, Code Llama
- **Cohere**: Command R+, Command R, Command
- **Groq**: Mixtral-8x7B, LLaMA 3 70B, Gemma 7B
- **Perplexity**: Sonar Large, Sonar Medium, Codestral

**File Upload Rules:**
- **Text Files**: `.txt`, `.md`, `.docx`, `.pdf`, `.rtf`
- **Code Files**: `.py`, `.js`, `.ts`, `.cpp`, `.java`, `.go`, `.rust`
- **Data Files**: `.json`, `.csv`, `.xml`, `.yaml`, `.sql`
- **Image Files**: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`
- **Size Limits**: 15-20MB per file depending on type

**Output Formats:**
- **Text**: Plain text output
- **JSON**: Structured data output
- **Markdown**: Formatted text with syntax
- **HTML**: Web-ready markup
- **PDF**: Portable document format

#### toolConfig.json (Legacy)
**Legacy tool configuration** - Deprecated in favor of `tools.json`.

**File Size:** ~8KB (226 lines)
**Status:** Deprecated - Do not use for new development

**Note:** This file is kept for backward compatibility but should not be used for new features. All new tool configurations should use `tools.json`.

### 🔧 Application Configuration

#### Environment Configuration
**Environment-specific settings** loaded from environment variables.

**Required Variables:**
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Development vs Production:**
```bash
# Development (.env.local)
VITE_API_TIMEOUT=5000
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL=debug

# Production (.env.production)
VITE_API_TIMEOUT=10000
VITE_DEBUG_MODE=false
VITE_LOG_LEVEL=error
```

## 🎯 Configuration Usage

### Loading Configuration

**Dynamic Import:**
```typescript
// Load tools configuration
import toolsConfig from '../config/tools.json';

// Access tool data
const tool = toolsConfig.tools.find(t => t.id === toolId);
if (tool) {
  // Use tool configuration
  const allowedTypes = tool.fileUploadRules.allowedTypes;
  const maxSize = tool.fileUploadRules.maxSizeMB;
}
```

**Runtime Validation:**
```typescript
// Validate tool configuration
const validateToolConfig = (tool: any): boolean => {
  return tool && 
         tool.id && 
         tool.name && 
         tool.providers && 
         tool.models;
};

if (validateToolConfig(tool)) {
  // Configuration is valid
}
```

### Configuration Access Patterns

**Tool Lookup:**
```typescript
// Find tool by ID
const findToolById = (toolId: string) => {
  return toolsConfig.tools.find(t => t.id === toolId);
};

// Find tools by category
const findToolsByCategory = (category: string) => {
  return toolsConfig.tools.filter(t => 
    t.categories.includes(category)
  );
};

// Find tools by provider
const findToolsByProvider = (provider: string) => {
  return toolsConfig.tools.filter(t => 
    t.providers.includes(provider)
  );
};
```

**Provider and Model Access:**
```typescript
// Get available providers for a tool
const getToolProviders = (toolId: string) => {
  const tool = findToolById(toolId);
  return tool?.providers || [];
};

// Get available models for a provider
const getProviderModels = (toolId: string, provider: string) => {
  const tool = findToolById(toolId);
  return tool?.models[provider] || [];
};

// Check if custom provider is allowed
const isCustomProviderAllowed = (toolId: string) => {
  const tool = findToolById(toolId);
  return tool?.allowCustomProvider || false;
};
```

## 🔧 Configuration Management

### Adding New Tools

1. **Define Tool Structure**
   ```json
   {
     "id": "new-tool-id",
     "name": "New Tool Name",
     "description": "Description of what this tool does",
     "categories": ["Development", "Productivity"],
     "providers": ["OpenAI", "Anthropic"],
     "models": {
       "OpenAI": ["GPT-4", "GPT-5"],
       "Anthropic": ["Claude 3.7", "Claude 3 Sonnet"]
     },
     "agents": [],
     "allowCustomProvider": true,
     "allowCustomModel": true,
     "allowCustomAgent": false,
     "fileUploadRules": {
       "allowedTypes": [".txt", ".md", ".py"],
       "maxSizeMB": 15
     },
     "outputFormats": {
       "options": ["Text", "Markdown", "JSON"],
       "defaultFormat": "Text"
     }
   }
   ```

2. **Add to tools.json**
   ```bash
   # Add the new tool to the tools array in tools.json
   ```

3. **Update Application Logic**
   ```typescript
   // Ensure the application can handle the new tool
   // Update any tool-specific logic if needed
   ```

### Configuration Validation

**Schema Validation:**
```typescript
// Tool configuration schema
interface ToolConfig {
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

// Validation function
const validateToolConfig = (config: any): config is ToolConfig => {
  // Implementation of validation logic
  return true; // Simplified for example
};
```

**Runtime Checks:**
```typescript
// Validate configuration at runtime
const validateConfiguration = () => {
  const tools = toolsConfig.tools;
  
  for (const tool of tools) {
    if (!tool.id || !tool.name) {
      console.error('Invalid tool configuration:', tool);
      continue;
    }
    
    if (!tool.providers || tool.providers.length === 0) {
      console.warn('Tool has no providers:', tool.id);
    }
    
    if (!tool.models || Object.keys(tool.models).length === 0) {
      console.warn('Tool has no models:', tool.id);
    }
  }
};
```

## 🚀 Performance Considerations

### Configuration Loading
- **Lazy Loading**: Load configurations on demand
- **Caching**: Cache configuration data in memory
- **Compression**: Minimize configuration file sizes
- **Tree Shaking**: Remove unused configuration

### Memory Management
- **Efficient Data Structures**: Use optimized data structures
- **Reference Sharing**: Share common configuration objects
- **Garbage Collection**: Proper cleanup of configuration objects
- **Memory Monitoring**: Track configuration memory usage

## 🔒 Security Considerations

### Configuration Security
- **No Sensitive Data**: Never store API keys in configuration files
- **Environment Variables**: Use environment variables for secrets
- **Validation**: Validate all configuration data
- **Access Control**: Limit access to configuration files

### Data Validation
- **Input Sanitization**: Sanitize configuration data
- **Type Checking**: Ensure proper data types
- **Size Limits**: Enforce configuration size limits
- **Content Validation**: Validate configuration content

## 🧪 Testing Configuration

### Configuration Testing
```typescript
// Test configuration loading
describe('Configuration Loading', () => {
  it('should load tools configuration', () => {
    expect(toolsConfig).toBeDefined();
    expect(toolsConfig.tools).toBeInstanceOf(Array);
    expect(toolsConfig.tools.length).toBeGreaterThan(0);
  });
  
  it('should validate tool structure', () => {
    const firstTool = toolsConfig.tools[0];
    expect(firstTool.id).toBeDefined();
    expect(firstTool.name).toBeDefined();
    expect(firstTool.providers).toBeInstanceOf(Array);
  });
});
```

### Mock Configuration
```typescript
// Mock configuration for testing
export const mockToolConfig = {
  tools: [
    {
      id: 'test-tool',
      name: 'Test Tool',
      description: 'Test tool description',
      categories: ['Test'],
      providers: ['TestProvider'],
      models: {
        'TestProvider': ['TestModel']
      },
      allowCustomProvider: false,
      allowCustomModel: false,
      allowCustomAgent: false,
      fileUploadRules: {
        allowedTypes: ['.txt'],
        maxSizeMB: 1
      },
      outputFormats: {
        options: ['Text'],
        defaultFormat: 'Text'
      }
    }
  ]
};
```

## 📚 Documentation Standards

### Configuration Documentation
Each configuration file should include:

1. **Purpose**: What the configuration defines
2. **Structure**: Data structure and format
3. **Usage**: How to use the configuration
4. **Validation**: Validation rules and requirements
5. **Examples**: Usage examples
6. **Dependencies**: Required dependencies

### File Headers
```json
{
  "_metadata": {
    "version": "1.0.0",
    "description": "Tool configuration for PromptEnhancer",
    "lastUpdated": "2024-01-15",
    "maintainer": "Development Team",
    "schema": "https://example.com/tool-schema.json"
  },
  "tools": [
    // Tool definitions
  ]
}
```

## 🔄 Configuration Updates

### Update Process
1. **Development**: Make changes in development environment
2. **Testing**: Test configuration changes thoroughly
3. **Review**: Code review of configuration changes
4. **Deployment**: Deploy with application updates
5. **Monitoring**: Monitor for configuration issues

### Version Control
- **Commit Messages**: Clear commit messages for configuration changes
- **Change Log**: Document configuration changes
- **Rollback Plan**: Plan for rolling back configuration changes
- **Migration**: Handle configuration migrations

## 📊 Configuration Metrics

### Current Stats
- **Total Tools**: 40+
- **Configuration Files**: 2
- **Total Size**: ~36KB
- **Tool Categories**: 8+
- **Supported Providers**: 10+

### Performance Metrics
- **Load Time**: <100ms target
- **Memory Usage**: <1MB target
- **Validation Time**: <50ms target
- **Cache Hit Rate**: 95%+ target

## 📈 Future Enhancements

### Planned Features
- **Dynamic Configuration**: Runtime configuration updates
- **Configuration API**: REST API for configuration management
- **Configuration UI**: Web interface for configuration editing
- **Configuration Templates**: Reusable configuration templates
- **Configuration Validation**: Automated validation and testing

### Configuration Improvements
- **Compression**: Reduce configuration file sizes
- **Caching**: Advanced caching strategies
- **Validation**: Enhanced validation rules
- **Documentation**: Auto-generated configuration documentation
- **Testing**: Automated configuration testing

---

**This directory contains all application configuration files. These files define the behavior and capabilities of the PromptEnhancer application and should be maintained with care.**
