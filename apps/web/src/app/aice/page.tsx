'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { aiceCards, getCardsByCategory, getCardsByDifficulty, getCardsByType, getCategories, getSections, generateQuizOptions } from '@/data/aice-cards-full';
import type { AiceCard } from '@/data/aice-cards-full';

export default function AiceQuizApp() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [shuffledCards, setShuffledCards] = useState<AiceCard[]>([]);
  
  // 필터링 상태
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('전체');
  const [selectedType, setSelectedType] = useState<string>('전체');
  const [showFilters, setShowFilters] = useState(false);
  
  // 랜덤 및 개수 설정
  const [isRandomMode, setIsRandomMode] = useState(false);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [availableCounts] = useState([5, 10, 15, 20, 30, 50, 100]);

  const currentCard = shuffledCards[currentCardIndex];
  const progressPercentage = shuffledCards.length > 0 ? ((currentCardIndex + 1) / shuffledCards.length) * 100 : 0;

  // 카드 필터링 및 섞기
  useEffect(() => {
    let filteredCards = [...aiceCards];

    if (selectedCategory !== '전체') {
      filteredCards = filteredCards.filter(card => card.category === selectedCategory);
    }

    if (selectedDifficulty !== '전체') {
      filteredCards = filteredCards.filter(card => card.difficulty === selectedDifficulty);
    }

    if (selectedType !== '전체') {
      filteredCards = filteredCards.filter(card => card.type === selectedType);
    }

    // 랜덤 모드인 경우 개수 제한
    if (isRandomMode) {
      const shuffled = filteredCards.sort(() => Math.random() - 0.5);
      const limitedCards = shuffled.slice(0, Math.min(questionCount, filteredCards.length));
      setShuffledCards(limitedCards);
    } else {
      const shuffled = filteredCards.sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);
    }
    
    setCurrentCardIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setTotalAnswered(0);
  }, [selectedCategory, selectedDifficulty, selectedType, isRandomMode, questionCount]);

  // 퀴즈 옵션 생성
  const getQuizOptions = (card: AiceCard) => {
    return generateQuizOptions(card);
  };

  // 퀴즈 선택 처리
  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(optionIndex);
    setShowResult(true);
    setTotalAnswered(prev => prev + 1);
    
    // 정답 확인 (첫 번째 옵션이 정답)
    if (optionIndex === 0) {
      setScore(prev => prev + 1);
    }
  };

  // 다음 문제로
  const nextQuestion = () => {
    if (currentCardIndex < shuffledCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  // 이전 문제로
  const prevQuestion = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  // 퀴즈 재시작
  const restartQuiz = () => {
    const shuffled = [...aiceCards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentCardIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setTotalAnswered(0);
  };

  // 퀴즈 완료 여부
  const isQuizComplete = currentCardIndex === shuffledCards.length - 1 && selectedOption !== null;

  if (shuffledCards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">퀴즈를 준비하는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
      <div className="max-w-2xl mx-auto w-full">
        {/* 헤더 */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">🎯 AICE 퀴즈</h1>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-sm">
                      {score} / {totalAnswered}
                    </Badge>
                    <Button
                      variant={isRandomMode ? "default" : "outline"}
                      size="sm"
                      className="text-xs px-2 py-1"
                      onClick={() => setIsRandomMode(!isRandomMode)}
                    >
                      🎲
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs px-2 py-1"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      🔍
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs px-2 py-1"
                      onClick={restartQuiz}
                    >
                      🔄
                    </Button>
                  </div>
          </div>
          
          {/* 필터링 옵션 */}
          {showFilters && (
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    카테고리
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="전체">전체</option>
                    {getCategories().map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    난이도
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="전체">전체</option>
                    <option value="easy">쉬움</option>
                    <option value="medium">보통</option>
                    <option value="hard">어려움</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    유형
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="전체">전체</option>
                    <option value="개념">개념</option>
                    <option value="코드">코드</option>
                    <option value="해석">해석</option>
                  </select>
                </div>

                {isRandomMode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      문제 개수
                    </label>
                    <select
                      value={questionCount}
                      onChange={(e) => setQuestionCount(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      {availableCounts.map(count => (
                        <option key={count} value={count}>
                          {count}개
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                <span>총 {shuffledCards.length}개 문제</span>
                {isRandomMode && (
                  <span className="text-blue-600 font-medium">
                    🎲 랜덤 모드: {questionCount}개 문제
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* 진행률 */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>진행률</span>
              <span>{currentCardIndex + 1} / {shuffledCards.length}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        {/* 퀴즈 카드 */}
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-xs">{currentCard.category}</Badge>
                <Badge variant="outline" className={`text-xs ${
                  currentCard.difficulty === 'easy' ? 'text-green-600 border-green-200' :
                  currentCard.difficulty === 'medium' ? 'text-yellow-600 border-yellow-200' :
                  'text-red-600 border-red-200'
                }`}>
                  {currentCard.difficulty === 'easy' ? '쉬움' : 
                   currentCard.difficulty === 'medium' ? '보통' : '어려움'}
                </Badge>
              </div>
              <span className="text-xs text-gray-500">
                문제 {currentCardIndex + 1}
              </span>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* 질문 */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 break-words">
                {currentCard.question}
              </h2>
            </div>

            {/* 선택지 */}
            <div className="space-y-3">
              {getQuizOptions(currentCard).map((option, index) => {
                const isSelected = selectedOption === index;
                const isCorrect = index === 0; // 첫 번째 옵션이 정답
                const showCorrect = showResult && isCorrect;
                const showWrong = showResult && isSelected && !isCorrect;

                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start p-3 sm:p-4 h-auto text-left ${
                      !showResult 
                        ? 'hover:bg-blue-50 hover:border-blue-300' 
                        : showCorrect
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : showWrong
                        ? 'border-red-500 bg-red-50 text-red-800'
                        : 'border-gray-200'
                    }`}
                    onClick={() => handleOptionSelect(index)}
                    disabled={selectedOption !== null}
                  >
                    <div className="flex items-start justify-between w-full min-w-0">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium mb-2 text-sm">
                          {String.fromCharCode(65 + index)}.
                        </div>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-2 sm:p-3 rounded text-xs sm:text-sm font-mono whitespace-pre-wrap break-words overflow-hidden">
                          {option}
                        </pre>
                      </div>
                      {showResult && (
                        <span className="text-lg ml-2 flex-shrink-0">
                          {showCorrect ? '✅' : showWrong ? '❌' : ''}
                        </span>
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>

            {/* 결과 및 설명 */}
            {showResult && (
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">
                    {selectedOption === 0 ? '🎉' : '😅'}
                  </span>
                  <h3 className="font-medium text-gray-700">
                    {selectedOption === 0 ? '정답입니다!' : '틀렸습니다.'}
                  </h3>
                </div>
                
                {/* 정답 표시 */}
                <div className="bg-green-50 p-3 rounded mb-3 border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">✅ 정답:</h4>
                  <p className="text-green-700 text-sm">{currentCard.answer}</p>
                </div>
                
                {/* 코드 블록 (코드 카드인 경우) */}
                {currentCard.type === '코드' && currentCard.code && (
                  <div className="bg-gray-900 text-green-400 p-2 sm:p-3 rounded text-xs sm:text-sm font-mono overflow-hidden mb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                      <span className="text-gray-400 text-xs">실행 코드:</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(currentCard.code || '');
                          const btn = document.activeElement as HTMLElement;
                          const originalText = btn.textContent;
                          btn.textContent = '복사됨!';
                          setTimeout(() => btn.textContent = originalText, 1000);
                        }}
                        className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors self-start sm:self-auto"
                      >
                        📋 복사
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap break-words">{currentCard.code}</pre>
                  </div>
                )}
                
                {/* 설명 */}
                {currentCard.explanation && (
                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-1">💡 설명:</h4>
                    <p className="text-blue-700 text-sm">{currentCard.explanation}</p>
                  </div>
                )}
              </div>
            )}

            {/* 네비게이션 */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-3">
              <Button
                variant="outline"
                className="w-full sm:w-auto text-sm"
                onClick={prevQuestion}
                disabled={currentCardIndex === 0}
              >
                ← 이전
              </Button>
              
              {isQuizComplete ? (
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    🎊 퀴즈 완료!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    점수: {score} / {totalAnswered} ({Math.round((score / totalAnswered) * 100)}%)
                  </p>
                  <Button onClick={restartQuiz} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm">
                    🔄 다시 시작
                  </Button>
                </div>
              ) : (
                <Button
                  variant="default"
                  className="w-full sm:w-auto text-sm"
                  onClick={nextQuestion}
                  disabled={currentCardIndex === shuffledCards.length - 1 || selectedOption === null}
                >
                  다음 →
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 스와이프 힌트 */}
        <div className="text-center text-sm text-gray-500 mt-4">
          💡 좌우로 스와이프하여 문제를 넘겨보세요
        </div>
      </div>
    </div>
  );
}