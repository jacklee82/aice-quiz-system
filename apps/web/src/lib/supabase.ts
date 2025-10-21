import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 카드 타입 정의
export interface AiceCard {
  id: number;
  card_id: string;
  type: '개념' | '코드' | '해석';
  category: string;
  question: string;
  answer: string;
  code?: string;
  keywords: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
  created_at: string;
  updated_at: string;
}

// 학습 진행률 타입 정의
export interface StudyProgress {
  id: number;
  user_id: string;
  card_id: string;
  completed: boolean;
  correct: boolean;
  attempts: number;
  last_studied: string;
  next_review: string;
  created_at: string;
  updated_at: string;
}

// 학습 통계 타입 정의
export interface StudyStats {
  id: number;
  user_id: string;
  total_cards: number;
  completed_cards: number;
  correct_cards: number;
  accuracy: number;
  streak: number;
  last_studied?: string;
  created_at: string;
  updated_at: string;
}
