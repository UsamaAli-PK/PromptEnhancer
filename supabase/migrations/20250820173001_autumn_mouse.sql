/*
  # Add API Key Management to User Settings

  1. New Columns for user_settings table
    - `api_key` (text, encrypted) - User's API key
    - `selected_model` (text) - Selected AI model (e.g., gpt-5)
    - `base_url` (text) - API base URL with default value
    - `api_key_name` (text) - Optional name for the API key

  2. Security
    - API keys will be encrypted at application level before storage
    - Add validation constraints for URLs
    - Maintain existing RLS policies
*/

-- Add new columns to user_settings table
DO $$
BEGIN
  -- Add api_key column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_settings' AND column_name = 'api_key'
  ) THEN
    ALTER TABLE user_settings ADD COLUMN api_key text;
  END IF;

  -- Add selected_model column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_settings' AND column_name = 'selected_model'
  ) THEN
    ALTER TABLE user_settings ADD COLUMN selected_model text DEFAULT 'gpt-4';
  END IF;

  -- Add base_url column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_settings' AND column_name = 'base_url'
  ) THEN
    ALTER TABLE user_settings ADD COLUMN base_url text DEFAULT 'https://api.aimlapi.com/v1';
  END IF;

  -- Add api_key_name column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_settings' AND column_name = 'api_key_name'
  ) THEN
    ALTER TABLE user_settings ADD COLUMN api_key_name text;
  END IF;
END $$;

-- Add constraint to ensure base_url is a valid URL format
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'user_settings_base_url_format'
  ) THEN
    ALTER TABLE user_settings 
    ADD CONSTRAINT user_settings_base_url_format 
    CHECK (base_url ~ '^https?://[^\s/$.?#].[^\s]*$');
  END IF;
END $$;

-- Create index for API key lookups (if needed for validation)
CREATE INDEX IF NOT EXISTS idx_user_settings_api_key ON user_settings(user_id) WHERE api_key IS NOT NULL;