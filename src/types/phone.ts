import type { SuitorId } from './game';

export interface DatingAppProfile {
  id: string;
  suitorId?: SuitorId;
  isFakeOrChaser?: boolean;
  name: string;
  age: number;
  distance: string;
  occupation: string;
  bio: string;
  photos: string[];
  prompts: {
    question: string;
    answer: string;
  }[];
  transDisclosureOpinion: string;
  redFlagsCount: number;
  matchScore: number;
}

export interface ChatMessage {
  id: string;
  sender: 'eve' | 'suitor' | 'tara' | 'bea' | 'other' | 'system' | 'group_member';
  senderName?: string;
  senderAvatar?: string;
  text: string;
  timestamp: string;
  isReaction?: string;
}

export interface ChatResponseChoice {
  text: string;
  tone: 'flirty' | 'witty' | 'direct' | 'cautious' | 'boundary' | 'chill';
  statImpact?: {
    confidence?: number;
    suitorAffection?: number;
    suitorRespect?: number;
  };
  suitorReply: string;
  unlockSceneId?: string;
}

export interface ChatThread {
  id: string;
  participantId: SuitorId | 'the_nest' | 'tara' | 'bea' | string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  unread: boolean;
  messages: ChatMessage[];
  pendingChoices?: ChatResponseChoice[];
}

export interface NestMessage {
  id: string;
  author: string;
  avatar: string;
  role: string;
  text: string;
  time: string;
}
