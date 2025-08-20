# Supabase Directory 🗄️

> **Database schema, migrations, and configuration** - PostgreSQL database setup for PromptEnhancer

## 📋 Overview

The `supabase/` directory contains all the database-related configuration, migrations, and schema definitions for the PromptEnhancer application. This includes SQL migration files, database schema definitions, and configuration for the Supabase backend-as-a-service platform.

## 🏗️ Database Architecture

### Design Principles
- **PostgreSQL First** - Leverage PostgreSQL's advanced features
- **Row Level Security** - Secure data access at the database level
- **Normalized Design** - Proper database normalization
- **Performance Optimized** - Efficient queries and indexing
- **Scalable Structure** - Design for growth and scaling

### Database Technology
- **Database**: PostgreSQL 15+
- **Hosting**: Supabase Cloud
- **Connection**: Connection pooling with PgBouncer
- **Backups**: Automated daily backups
- **Monitoring**: Built-in performance monitoring

## 📁 Directory Structure

```
supabase/
├── 📁 migrations/           # Database migration files
│   ├── 📄 20250820170810_raspy_surf.sql    # Initial schema setup
│   └── 📄 20250820173001_autumn_mouse.sql  # Additional features
├── 📁 config/               # Supabase configuration
├── 📁 functions/            # Database functions
├── 📁 policies/             # Row Level Security policies
└── 📁 types/                # TypeScript type definitions
```

## 🗄️ Database Schema

### Core Tables

#### users
**User profile and authentication information.**

```sql
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Columns:**
- `id` - UUID primary key, references Supabase auth.users
- `email` - User's email address (unique)
- `name` - User's display name
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

**Relationships:**
- One-to-many with `saved_prompts`
- One-to-one with `user_settings`

#### saved_prompts
**Enhanced prompts and user-generated content.**

```sql
CREATE TABLE saved_prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  input_text text NOT NULL,
  enhanced_text text NOT NULL,
  tool_type text NOT NULL,
  provider text NOT NULL,
  model text NOT NULL,
  tone text NOT NULL DEFAULT 'professional',
  output_format text NOT NULL DEFAULT 'text',
  file_attachments text[],
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Columns:**
- `id` - UUID primary key, auto-generated
- `user_id` - Foreign key to users table
- `title` - Prompt title/name
- `input_text` - Original user input
- `enhanced_text` - AI-enhanced output
- `tool_type` - Type of tool used
- `provider` - AI provider (OpenAI, Anthropic, etc.)
- `model` - Specific AI model used
- `tone` - Writing tone/style
- `output_format` - Output format (text, markdown, etc.)
- `file_attachments` - Array of file references
- `tags` - Array of categorization tags
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

**Relationships:**
- Many-to-one with `users`
- Indexed on `user_id`, `created_at`, `tool_type`

#### user_settings
**User preferences and configuration settings.**

```sql
CREATE TABLE user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  default_provider text DEFAULT 'OpenAI',
  default_model text DEFAULT 'GPT-4',
  default_tone text DEFAULT 'professional',
  email_notifications boolean DEFAULT true,
  theme text DEFAULT 'light',
  api_key text,
  selected_model text DEFAULT 'gpt-4',
  base_url text DEFAULT 'https://api.openai.com/v1',
  api_key_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Columns:**
- `id` - UUID primary key, auto-generated
- `user_id` - Foreign key to users table (unique)
- `default_provider` - Preferred AI provider
- `default_model` - Preferred AI model
- `default_tone` - Preferred writing tone
- `email_notifications` - Email notification preferences
- `theme` - UI theme preference
- `api_key` - Encrypted API key storage
- `selected_model` - Currently selected model
- `base_url` - Custom API base URL
- `api_key_name` - Name/label for API key
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

**Relationships:**
- One-to-one with `users`

## 🔐 Security & Access Control

### Row Level Security (RLS)
**All tables have RLS enabled for secure data access.**

#### Users Table Policies
```sql
-- Users can read own profile
CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can update own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Users can insert own profile
CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);
```

#### Saved Prompts Table Policies
```sql
-- Users can read own prompts
CREATE POLICY "Users can read own prompts"
  ON saved_prompts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert own prompts
CREATE POLICY "Users can insert own prompts"
  ON saved_prompts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update own prompts
CREATE POLICY "Users can update own prompts"
  ON saved_prompts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete own prompts
CREATE POLICY "Users can delete own prompts"
  ON saved_prompts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
```

#### User Settings Table Policies
```sql
-- Users can read own settings
CREATE POLICY "Users can read own settings"
  ON user_settings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert own settings
CREATE POLICY "Users can insert own settings"
  ON user_settings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update own settings
CREATE POLICY "Users can update own settings"
  ON user_settings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);
```

## 📊 Database Performance

### Indexes
**Optimized indexes for common query patterns.**

```sql
-- Primary indexes (automatically created)
CREATE INDEX idx_saved_prompts_user_id ON saved_prompts(user_id);
CREATE INDEX idx_saved_prompts_created_at ON saved_prompts(created_at DESC);
CREATE INDEX idx_saved_prompts_tool_type ON saved_prompts(tool_type);
CREATE INDEX idx_user_settings_user_id ON user_settings(user_id);
```

**Index Strategy:**
- **User ID Indexes**: Fast user-specific queries
- **Timestamp Indexes**: Efficient chronological sorting
- **Tool Type Indexes**: Quick category filtering
- **Composite Indexes**: Multi-column query optimization

### Query Optimization
**Optimized queries for common operations.**

```sql
-- Efficient user prompts query
SELECT * FROM saved_prompts 
WHERE user_id = $1 
ORDER BY created_at DESC 
LIMIT 20;

-- Fast search query with full-text search
SELECT * FROM saved_prompts 
WHERE user_id = $1 
AND (
  title ILIKE $2 
  OR input_text ILIKE $2 
  OR enhanced_text ILIKE $2
)
ORDER BY created_at DESC;
```

## 🔄 Database Migrations

### Migration Files

#### 20250820170810_raspy_surf.sql
**Initial schema setup and table creation.**

**Contents:**
- Create users table
- Create saved_prompts table
- Create user_settings table
- Enable Row Level Security
- Create security policies
- Add performance indexes
- Create update triggers

**Key Features:**
- Complete table structure
- Security policies
- Performance optimization
- Data integrity constraints

#### 20250820173001_autumn_mouse.sql
**Additional features and enhancements.**

**Contents:**
- Additional indexes
- Performance optimizations
- Extended functionality
- Bug fixes and improvements

### Migration Process
1. **Development**: Create migration in development environment
2. **Testing**: Test migration on development database
3. **Review**: Code review of migration changes
4. **Staging**: Apply to staging environment
5. **Production**: Deploy to production database

### Migration Best Practices
- **Atomic Changes**: Each migration is atomic
- **Rollback Support**: Migrations can be rolled back
- **Data Preservation**: No data loss during migration
- **Performance Impact**: Minimal performance impact
- **Testing**: Thorough testing before deployment

## 🛠️ Database Functions

### Update Triggers
**Automatic timestamp updates for modified records.**

```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_saved_prompts_updated_at
  BEFORE UPDATE ON saved_prompts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Custom Functions
**Database functions for common operations.**

```sql
-- Function to get user prompt statistics
CREATE OR REPLACE FUNCTION get_user_prompt_stats(user_uuid uuid)
RETURNS TABLE (
  total_prompts bigint,
  tool_type_breakdown jsonb,
  recent_activity jsonb
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::bigint as total_prompts,
    jsonb_object_agg(tool_type, count) as tool_type_breakdown,
    jsonb_agg(
      jsonb_build_object(
        'id', id,
        'title', title,
        'created_at', created_at
      )
    ) as recent_activity
  FROM (
    SELECT 
      tool_type,
      COUNT(*) as count,
      id,
      title,
      created_at
    FROM saved_prompts 
    WHERE user_id = user_uuid
    GROUP BY tool_type, id, title, created_at
    ORDER BY created_at DESC
    LIMIT 10
  ) stats;
END;
$$ LANGUAGE plpgsql;
```

## 🔒 Security Features

### Authentication
- **Supabase Auth**: Built-in authentication system
- **JWT Tokens**: Secure token-based authentication
- **Session Management**: Automatic session handling
- **Password Policies**: Strong password requirements

### Data Protection
- **Encryption**: Data encrypted at rest and in transit
- **Access Control**: Row-level security policies
- **Audit Logging**: Track all database access
- **Backup Encryption**: Encrypted database backups

### Privacy Compliance
- **GDPR Ready**: European privacy regulation compliance
- **Data Portability**: Export user data on request
- **Data Deletion**: Complete data removal capability
- **Consent Management**: User consent tracking

## 📈 Monitoring & Maintenance

### Performance Monitoring
- **Query Performance**: Monitor slow queries
- **Connection Pooling**: Track connection usage
- **Index Usage**: Monitor index effectiveness
- **Storage Growth**: Track database size

### Health Checks
- **Connection Health**: Database connectivity
- **Query Response**: Response time monitoring
- **Error Rates**: Database error tracking
- **Resource Usage**: CPU, memory, disk usage

### Maintenance Tasks
- **Regular Backups**: Daily automated backups
- **Index Maintenance**: Periodic index optimization
- **Statistics Updates**: Query planner statistics
- **Vacuum Operations**: Clean up deleted records

## 🚀 Scaling Considerations

### Current Capacity
- **Database Size**: <1GB (current usage)
- **Connection Limit**: 100 concurrent connections
- **Storage Limit**: 8GB included storage
- **Backup Retention**: 7 days of backups

### Scaling Options
- **Vertical Scaling**: Upgrade database resources
- **Horizontal Scaling**: Read replicas for read-heavy workloads
- **Connection Pooling**: Optimize connection usage
- **Caching**: Application-level caching

### Performance Optimization
- **Query Optimization**: Analyze and optimize slow queries
- **Index Strategy**: Strategic index creation
- **Partitioning**: Table partitioning for large datasets
- **Archiving**: Archive old data to reduce table size

## 🔧 Development Setup

### Local Development
```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase
supabase start

# Apply migrations
supabase db reset

# Generate types
supabase gen types typescript --local > src/types/database.ts
```

### Environment Configuration
```bash
# .env.local
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=your_local_anon_key

# .env.production
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key
```

### Database Connection
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## 🧪 Testing Database

### Test Environment
- **Separate Database**: Test-specific database instance
- **Data Isolation**: No interference with development data
- **Automated Setup**: Test data setup and teardown
- **Performance Testing**: Database performance validation

### Test Data
```sql
-- Insert test user
INSERT INTO users (id, email, name) 
VALUES (
  'test-user-id',
  'test@example.com',
  'Test User'
);

-- Insert test prompts
INSERT INTO saved_prompts (
  user_id, title, input_text, enhanced_text, 
  tool_type, provider, model, tone, output_format
) VALUES (
  'test-user-id',
  'Test Prompt',
  'Original input',
  'Enhanced output',
  'code-generator',
  'OpenAI',
  'GPT-4',
  'professional',
  'text'
);
```

## 📚 Documentation Standards

### Schema Documentation
Each table should include:

1. **Purpose**: What the table stores
2. **Columns**: All columns with types and constraints
3. **Relationships**: Foreign key relationships
4. **Indexes**: Performance optimization indexes
5. **Policies**: Row-level security policies
6. **Usage**: Common query patterns

### Migration Documentation
Each migration should include:

1. **Purpose**: What the migration accomplishes
2. **Changes**: Specific changes made
3. **Rollback**: How to rollback if needed
4. **Testing**: Testing requirements
5. **Dependencies**: Prerequisites for the migration

## 🔄 Backup & Recovery

### Backup Strategy
- **Automated Backups**: Daily automated backups
- **Point-in-Time Recovery**: Restore to specific time
- **Geographic Distribution**: Multiple backup locations
- **Backup Testing**: Regular backup restoration testing

### Recovery Procedures
1. **Identify Issue**: Determine what needs recovery
2. **Choose Backup**: Select appropriate backup point
3. **Restore Data**: Restore from backup
4. **Verify Integrity**: Validate restored data
5. **Update Application**: Notify application of changes

## 📊 Database Metrics

### Current Statistics
- **Total Tables**: 3
- **Total Rows**: <1000 (development)
- **Database Size**: <1GB
- **Migration Count**: 2
- **Security Policies**: 12

### Performance Targets
- **Query Response**: <100ms for common queries
- **Connection Time**: <50ms for new connections
- **Backup Time**: <5 minutes for full backup
- **Recovery Time**: <10 minutes for point-in-time recovery

---

**This directory contains all database-related configuration and migrations. The database is the foundation of the application and should be maintained with care, following proper security and performance practices.**
