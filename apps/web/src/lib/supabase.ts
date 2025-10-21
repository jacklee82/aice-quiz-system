import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mlibqigprgrwrwfxcyfn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1saWJxaWdwcmdyd3J3ZnhjeWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1OTc5ODIsImV4cCI6MjA3NjE3Mzk4Mn0.EIfAmwNccOSX4SPXrOd0hLHbTO-nv3D_CWNy5_1l2Vg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// AICE 카드 타입 정의
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
