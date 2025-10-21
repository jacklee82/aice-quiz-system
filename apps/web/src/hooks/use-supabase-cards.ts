import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { AiceCard } from '@/lib/supabase';

export function useSupabaseCards() {
  const [cards, setCards] = useState<AiceCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 카드 데이터 로드
  const loadCards = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('aice_cards')
        .select('*')
        .order('id');

      if (error) throw error;
      setCards(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '카드를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 카테고리별 필터링
  const getCardsByCategory = async (category: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('aice_cards')
        .select('*')
        .eq('category', category)
        .order('id');

      if (error) throw error;
      setCards(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '카드를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 난이도별 필터링
  const getCardsByDifficulty = async (difficulty: 'easy' | 'medium' | 'hard') => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('aice_cards')
        .select('*')
        .eq('difficulty', difficulty)
        .order('id');

      if (error) throw error;
      setCards(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '카드를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 랜덤 카드 선택
  const getRandomCards = async (count: number) => {
    try {
      setLoading(true);
      // 먼저 모든 카드를 가져온 후 클라이언트에서 랜덤 선택
      const { data, error } = await supabase
        .from('aice_cards')
        .select('*');

      if (error) throw error;
      
      // 클라이언트에서 랜덤하게 섞고 제한된 수만큼 선택
      const shuffled = (data || []).sort(() => Math.random() - 0.5);
      setCards(shuffled.slice(0, count));
    } catch (err) {
      setError(err instanceof Error ? err.message : '카드를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 카테고리 목록 가져오기
  const getCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('aice_cards')
        .select('category')
        .order('category');

      if (error) throw error;
      
      const categories = Array.from(new Set(data?.map((item: { category: string }) => item.category) || []));
      return categories;
    } catch (err) {
      setError(err instanceof Error ? err.message : '카테고리를 불러오는데 실패했습니다.');
      return [];
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  return {
    cards,
    loading,
    error,
    loadCards,
    getCardsByCategory,
    getCardsByDifficulty,
    getRandomCards,
    getCategories
  };
}


