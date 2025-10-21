import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { StudyProgress, StudyStats } from '@/lib/supabase';

export function useSupabaseProgress() {
  const [progress, setProgress] = useState<StudyProgress[]>([]);
  const [stats, setStats] = useState<StudyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 현재 사용자 ID 가져오기
  const getCurrentUserId = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id;
  };

  // 학습 진행률 로드
  const loadProgress = async () => {
    try {
      setLoading(true);
      const userId = await getCurrentUserId();
      if (!userId) return;

      const { data, error } = await supabase
        .from('study_progress')
        .select('*')
        .eq('user_id', userId)
        .order('last_studied', { ascending: false });

      if (error) throw error;
      setProgress(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '진행률을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 학습 통계 로드
  const loadStats = async () => {
    try {
      const userId = await getCurrentUserId();
      if (!userId) return;

      const { data, error } = await supabase
        .from('study_stats')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116은 데이터가 없을 때
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '통계를 불러오는데 실패했습니다.');
    }
  };

  // 카드 학습 완료
  const markCardCompleted = async (cardId: string, correct: boolean) => {
    try {
      const userId = await getCurrentUserId();
      if (!userId) return;

      const now = new Date().toISOString();
      const nextReview = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24시간 후

      // 기존 진행률 확인
      const { data: existing } = await supabase
        .from('study_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('card_id', cardId)
        .single();

      if (existing) {
        // 기존 진행률 업데이트
        const { error } = await supabase
          .from('study_progress')
          .update({
            completed: true,
            correct,
            attempts: existing.attempts + 1,
            last_studied: now,
            next_review: nextReview,
            updated_at: now
          })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // 새로운 진행률 추가
        const { error } = await supabase
          .from('study_progress')
          .insert({
            user_id: userId,
            card_id: cardId,
            completed: true,
            correct,
            attempts: 1,
            last_studied: now,
            next_review: nextReview
          });

        if (error) throw error;
      }

      // 통계 업데이트
      await updateStats();
      await loadProgress();
    } catch (err) {
      setError(err instanceof Error ? err.message : '진행률 저장에 실패했습니다.');
    }
  };

  // 통계 업데이트
  const updateStats = async () => {
    try {
      const userId = await getCurrentUserId();
      if (!userId) return;

      // 전체 카드 수
      const { count: totalCards } = await supabase
        .from('aice_cards')
        .select('*', { count: 'exact', head: true });

      // 완료된 카드 수
      const { count: completedCards } = await supabase
        .from('study_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('completed', true);

      // 정답 카드 수
      const { count: correctCards } = await supabase
        .from('study_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('completed', true)
        .eq('correct', true);

      const accuracy = completedCards && completedCards > 0 
        ? (correctCards || 0) / completedCards * 100 
        : 0;

      const now = new Date().toISOString();

      // 통계 업데이트 또는 생성
      const { error } = await supabase
        .from('study_stats')
        .upsert({
          user_id: userId,
          total_cards: totalCards || 0,
          completed_cards: completedCards || 0,
          correct_cards: correctCards || 0,
          accuracy,
          last_studied: now,
          updated_at: now
        });

      if (error) throw error;
      await loadStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : '통계 업데이트에 실패했습니다.');
    }
  };

  // 카드별 진행률 조회
  const getCardProgress = (cardId: string): StudyProgress | null => {
    return progress.find(p => p.card_id === cardId) || null;
  };

  // 복습이 필요한 카드들
  const getReviewCards = async (): Promise<string[]> => {
    try {
      const userId = await getCurrentUserId();
      if (!userId) return [];

      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('study_progress')
        .select('card_id')
        .eq('user_id', userId)
        .lte('next_review', now);

      if (error) throw error;
      return data?.map((item: StudyProgress) => item.card_id) || [];
    } catch (err) {
      setError(err instanceof Error ? err.message : '복습 카드를 불러오는데 실패했습니다.');
      return [];
    }
  };

  // 진행률 초기화
  const resetProgress = async () => {
    try {
      const userId = await getCurrentUserId();
      if (!userId) return;

      const { error } = await supabase
        .from('study_progress')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;

      const { error: statsError } = await supabase
        .from('study_stats')
        .delete()
        .eq('user_id', userId);

      if (statsError) throw statsError;

      setProgress([]);
      setStats(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '진행률 초기화에 실패했습니다.');
    }
  };

  useEffect(() => {
    loadProgress();
    loadStats();
  }, []);

  return {
    progress,
    stats,
    loading,
    error,
    markCardCompleted,
    getCardProgress,
    getReviewCards,
    resetProgress,
    updateStats
  };
}


