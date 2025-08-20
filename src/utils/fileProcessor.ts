export interface ProcessedFile {
  id: string;
  name: string;
  type: 'text' | 'image' | 'other';
  content?: string;
  url?: string;
  size: number;
}

export const processFileForAPI = (file: ProcessedFile): string => {
  if (file.type === 'text' && file.content) {
    return `\n\n--- File: ${file.name} ---\n${file.content}\n--- End of ${file.name} ---\n`;
  }
  
  if (file.type === 'image' && file.url) {
    return `\n\n--- Image File: ${file.name} ---\n[Image uploaded: ${file.url}]\n--- End of ${file.name} ---\n`;
  }
  
  return `\n\n--- File: ${file.name} ---\n[File uploaded but content not extractable]\n--- End of ${file.name} ---\n`;
};

export const combinePromptWithFiles = (
  originalPrompt: string,
  files: ProcessedFile[]
): string => {
  if (files.length === 0) return originalPrompt;
  
  const fileContents = files.map(processFileForAPI).join('');
  
  return `${originalPrompt}

--- UPLOADED FILES ---
${fileContents}

Please consider the uploaded files when generating your response. If the files contain code, data, or other relevant content, incorporate that information into your enhanced prompt.`;
};

export const getFileTypeFromExtension = (filename: string): 'text' | 'image' | 'other' => {
  const extension = filename.toLowerCase().split('.').pop();
  
  const textExtensions = ['txt', 'md', 'py', 'js', 'ts', 'java', 'cpp', 'json', 'csv', 'sql', 'docx', 'pdf'];
  const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
  
  if (textExtensions.includes(extension || '')) return 'text';
  if (imageExtensions.includes(extension || '')) return 'image';
  return 'other';
};