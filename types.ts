export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ImageGenerationResult {
  url: string;
  prompt: string;
}

export type ViewState = 'home' | 'chat' | 'image';

export enum APIStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}