// API Integration Layer
import { supabase } from './supabase'
import { useUserSettings } from '../hooks/useUserSettings'

export interface AIProvider {
  name: string
  models: string[]
  apiKey: string
  baseUrl?: string
}

export interface EnhancementRequest {
  prompt: string
  provider: string
  model: string
  tone: string
  outputFormat: string
  fileContent?: string[]
  toolType: string
}

export interface EnhancementResponse {
  enhancedPrompt: string
  provider: string
  model: string
  usage?: {
    tokens: number
    cost: number
  }
}

class APIService {
  private providers: Map<string, AIProvider> = new Map()

  constructor() {
    this.initializeProviders()
  }

  private initializeProviders() {
    // Removed dev env keys: providers are configured via user settings only
  }

  // Method to use user's custom API configuration
  async enhancePromptWithUserConfig(
    request: EnhancementRequest, 
    userApiKey?: string, 
    userBaseUrl?: string
  ): Promise<EnhancementResponse> {
    if (userApiKey && userBaseUrl) {
      // Use user's custom API configuration
      return await this.callCustomAPI(request, userApiKey, userBaseUrl);
    }
    throw new Error('Missing user API configuration. Please add your API key and base URL in Profile.');
  }

  private async callCustomAPI(
    request: EnhancementRequest, 
    apiKey: string, 
    baseUrl: string
  ): Promise<EnhancementResponse> {
    const systemPrompt = this.buildSystemPrompt(request);
    const userPrompt = this.buildUserPrompt(request);

    try {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.mapModelName(request.model, request.provider),
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: this.getToneTemperature(request.tone),
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        enhancedPrompt: data.choices?.[0]?.message?.content ?? data.content?.[0]?.text ?? '',
        provider: request.provider,
        model: request.model,
        usage: {
          tokens: data.usage?.total_tokens || (data.usage?.input_tokens + data.usage?.output_tokens) || 0,
          cost: this.calculateCost((data.usage?.total_tokens || (data.usage?.input_tokens + data.usage?.output_tokens) || 0), request.provider, request.model)
        }
      };
    } catch (error) {
      console.error('Custom API Enhancement Error:', error);
      throw new Error('Failed to enhance prompt with custom API. Please check your API key and base URL.');
    }
  }

  async enhancePrompt(_request: EnhancementRequest): Promise<EnhancementResponse> {
    throw new Error('Use enhancePromptWithUserConfig with user API key and base URL.');
  }

  private buildSystemPrompt(request: EnhancementRequest): string {
    return `You are an expert AI prompt engineer. Your task is to enhance and optimize prompts for ${request.provider} ${request.model}.

Guidelines:
- Tool Type: ${request.toolType}
- Tone: ${request.tone}
- Output Format: ${request.outputFormat}
- Make prompts specific, detailed, and actionable
- Include relevant context and constraints
- Optimize for the target AI model's strengths
- Ensure clarity and precision in instructions

Enhance the user's prompt to achieve maximum effectiveness with ${request.provider} ${request.model}.`
  }

  private buildUserPrompt(request: EnhancementRequest): string {
    let prompt = `Original prompt: "${request.prompt}"\n\n`
    
    if (request.fileContent && request.fileContent.length > 0) {
      prompt += `Additional context from uploaded files:\n${request.fileContent.join('\n\n')}\n\n`
    }
    
    prompt += `Please enhance this prompt for optimal results with ${request.provider} ${request.model}. Format the output as ${request.outputFormat} with a ${request.tone} tone.`
    
    return prompt
  }

  private mapModelName(displayName: string, provider: string): string {
    const modelMappings: { [key: string]: { [key: string]: string } } = {
      'OpenAI': {
        'GPT-4': 'gpt-4',
        'GPT-5': 'gpt-4', // placeholder fallback
        'GPT-4 Turbo': 'gpt-4-turbo-preview'
      },
      'Anthropic': {
        'Claude 3.7': 'claude-3-opus-20240229',
        'Claude 3 Sonnet': 'claude-3-sonnet-20240229',
        'Claude 3 Haiku': 'claude-3-haiku-20240307'
      }
    }
    
    return modelMappings[provider]?.[displayName] || displayName.toLowerCase()
  }

  private getToneTemperature(tone: string): number {
    const temperatureMap: { [key: string]: number } = {
      'professional': 0.3,
      'casual': 0.7,
      'creative': 0.9,
      'technical': 0.2,
      'friendly': 0.6,
      'educational': 0.4,
      'marketing': 0.8,
      'storytelling': 0.9,
      'persuasive': 0.7,
      'funny': 0.9
    }
    
    return temperatureMap[tone] || 0.5
  }

  private calculateCost(tokens: number, provider: string, model: string): number {
    const costPerToken: { [key: string]: number } = {
      'OpenAI': 0.00003,
      'Anthropic': 0.00008
    }
    
    return tokens * (costPerToken[provider] || 0.00005)
  }

  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys())
  }

  getProviderModels(providerName: string): string[] {
    return this.providers.get(providerName)?.models || []
  }
}

export const apiService = new APIService()