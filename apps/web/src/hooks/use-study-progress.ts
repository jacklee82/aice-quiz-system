import { useState, useEffect } from 'react';

interface StudyProgress {
  cardId: string;
  completed: boolean;
  correct: boolean;
  attempts: number;
  lastStudied: Date;
  nextReview: Date;
}

interface StudyStats {
  totalCards: number;
  completedCards: number;
  correctCards: number;
  accuracy: number;
  streak: number;
}

export function useStudyProgress() {
  const [progress, setProgress] = useState<StudyProgress[]>([]);
  const [stats, setStats] = useState<StudyStats>({
    totalCards: 0,
    completedCards: 0,
    correctCards: 0,
    accuracy: 0,
    streak: 0
  });

  // 로컬 스토리지에서 진행률 로드
  useEffect(() => {
    const savedProgress = localStorage.getItem('aice-study-progress');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      setProgress(parsed.map((item: any) => ({
        ...item,
        lastStudied: new Date(item.lastStudied),
        nextReview: new Date(item.nextReview)
      })));
    }
  }, []);

  // 진행률 저장
  useEffect(() => {
    if (progress.length > 0) {
      localStorage.setItem('aice-study-progress', JSON.stringify(progress));
    }
  }, [progress]);

  // 통계 업데이트
  useEffect(() => {
    const totalCards = progress.length;
    const completedCards = progress.filter(p => p.completed).length;
    const correctCards = progress.filter(p => p.correct).length;
    const accuracy = completedCards > 0 ? (correctCards / completedCards) * 100 : 0;
    
    setStats({
      totalCards,
      completedCards,
      correctCards,
      accuracy,
      streak: 0 // TODO: 연속 학습 일수 계산
    });
  }, [progress]);

  // 카드 학습 완료
  const markCardCompleted = (cardId: string, correct: boolean) => {
    const existingIndex = progress.findIndex(p => p.cardId === cardId);
    const now = new Date();
    const nextReview = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24시간 후

    if (existingIndex >= 0) {
      // 기존 진행률 업데이트
      const updated = [...progress];
      updated[existingIndex] = {
        ...updated[existingIndex],
        completed: true,
        correct,
        attempts: updated[existingIndex].attempts + 1,
        lastStudied: now,
        nextReview
      };
      setProgress(updated);
    } else {
      // 새로운 진행률 추가
      setProgress(prev => [...prev, {
        cardId,
        completed: true,
        correct,
        attempts: 1,
        lastStudied: now,
        nextReview
      }]);
    }
  };

  // 카드별 진행률 조회
  const getCardProgress = (cardId: string): StudyProgress | null => {
    return progress.find(p => p.cardId === cardId) || null;
  };

  // 복습이 필요한 카드들
  const getReviewCards = (): string[] => {
    const now = new Date();
    return progress
      .filter(p => p.nextReview <= now)
      .map(p => p.cardId);
  };

  // 진행률 초기화
  const resetProgress = () => {
    setProgress([]);
    localStorage.removeItem('aice-study-progress');
  };

  return {
    progress,
    stats,
    markCardCompleted,
    getCardProgress,
    getReviewCards,
    resetProgress
  };
}



