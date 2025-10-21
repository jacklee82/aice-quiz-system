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

  // 코드 한 줄씩 분석하는 함수
  const analyzeCodeLine = (line: string, index: number) => {
    const trimmedLine = line.trim();
    
    // 빈 줄 처리
    if (!trimmedLine) {
      return { line, explanation: '빈 줄' };
    }

    // import 문 분석
    if (trimmedLine.startsWith('import ')) {
      if (trimmedLine.includes('numpy')) {
        return { line, explanation: 'NumPy 라이브러리를 np라는 별칭으로 가져옵니다. 수치 계산과 배열 연산을 위한 핵심 라이브러리입니다.' };
      } else if (trimmedLine.includes('pandas')) {
        return { line, explanation: 'Pandas 라이브러리를 pd라는 별칭으로 가져옵니다. 데이터 분석과 조작을 위한 라이브러리입니다.' };
      } else if (trimmedLine.includes('matplotlib')) {
        return { line, explanation: 'Matplotlib 라이브러리를 가져옵니다. 그래프와 차트를 그리기 위한 시각화 라이브러리입니다.' };
      } else if (trimmedLine.includes('seaborn')) {
        return { line, explanation: 'Seaborn 라이브러리를 가져옵니다. 통계적 데이터 시각화를 위한 고급 라이브러리입니다.' };
      } else if (trimmedLine.includes('sklearn')) {
        return { line, explanation: 'Scikit-learn 라이브러리를 가져옵니다. 머신러닝 알고리즘과 도구들을 제공하는 라이브러리입니다.' };
      } else {
        return { line, explanation: '외부 라이브러리를 가져오는 import 문입니다.' };
      }
    }

    // 변수 할당 분석
    if (trimmedLine.includes('=') && !trimmedLine.includes('==') && !trimmedLine.includes('!=')) {
      if (trimmedLine.includes('np.')) {
        return { line, explanation: 'NumPy 함수를 사용하여 변수에 값을 할당합니다. NumPy는 고성능 수치 계산을 제공합니다.' };
      } else if (trimmedLine.includes('pd.')) {
        return { line, explanation: 'Pandas 함수를 사용하여 데이터프레임이나 시리즈를 생성합니다. 데이터 분석의 핵심 객체입니다.' };
      } else if (trimmedLine.includes('plt.')) {
        return { line, explanation: 'Matplotlib의 pyplot을 사용하여 그래프를 그립니다. 시각화의 기본 도구입니다.' };
      } else {
        return { line, explanation: '변수에 값을 할당하는 문장입니다.' };
      }
    }

    // 함수 정의 분석
    if (trimmedLine.startsWith('def ')) {
      return { line, explanation: '함수를 정의합니다. 재사용 가능한 코드 블록을 만듭니다.' };
    }

    // 반복문 분석
    if (trimmedLine.startsWith('for ') || trimmedLine.startsWith('while ')) {
      return { line, explanation: '반복문을 시작합니다. 조건에 따라 코드를 반복 실행합니다.' };
    }

    // 조건문 분석
    if (trimmedLine.startsWith('if ') || trimmedLine.startsWith('elif ') || trimmedLine.startsWith('else:')) {
      return { line, explanation: '조건문입니다. 특정 조건에 따라 다른 코드를 실행합니다.' };
    }

    // return 문 분석
    if (trimmedLine.startsWith('return ')) {
      return { line, explanation: '함수에서 값을 반환합니다. 함수의 결과를 호출한 곳으로 전달합니다.' };
    }

    // print 문 분석
    if (trimmedLine.startsWith('print(')) {
      return { line, explanation: '화면에 결과를 출력합니다. 디버깅이나 결과 확인에 사용됩니다.' };
    }

    // 기본 설명
    return { line, explanation: `코드의 ${index + 1}번째 줄입니다.` };
  };

  if (shuffledCards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">퀴즈를 준비하는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 overflow-x-hidden">
      <div className="max-w-2xl mx-auto w-full p-1 sm:p-4">
      {/* 헤더 */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">🎯 AICE 퀴즈</h1>
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
            <div className="bg-muted p-2 sm:p-4 rounded-lg mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    카테고리
                  </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-input bg-background text-foreground rounded-lg text-sm"
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
                  <label className="block text-sm font-medium text-foreground mb-2">
                    난이도
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full p-2 border border-input bg-background text-foreground rounded-lg text-sm"
                  >
                    <option value="전체">전체</option>
                    <option value="easy">쉬움</option>
                    <option value="medium">보통</option>
                    <option value="hard">어려움</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    유형
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-2 border border-input bg-background text-foreground rounded-lg text-sm"
                  >
                    <option value="전체">전체</option>
                    <option value="개념">개념</option>
                    <option value="코드">코드</option>
                    <option value="해석">해석</option>
                  </select>
          </div>

                {isRandomMode && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      문제 개수
                    </label>
                    <select
                      value={questionCount}
                      onChange={(e) => setQuestionCount(Number(e.target.value))}
                      className="w-full p-2 border border-input bg-background text-foreground rounded-lg text-sm"
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

              <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                <span>총 {shuffledCards.length}개 문제</span>
                {isRandomMode && (
                  <span className="text-primary font-medium">
                    🎲 랜덤 모드: {questionCount}개 문제
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* 진행률 */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>진행률</span>
              <span>{currentCardIndex + 1} / {shuffledCards.length}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        {/* 퀴즈 카드 */}
        <Card className="shadow-lg overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-xs">{currentCard.category}</Badge>
                <Badge variant="outline" className={`text-xs ${
                  currentCard.difficulty === 'easy' ? 'text-green-600 dark:text-green-400 border-green-200 dark:border-green-800' :
                  currentCard.difficulty === 'medium' ? 'text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800' :
                  'text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'
              }`}>
                {currentCard.difficulty === 'easy' ? '쉬움' : 
                 currentCard.difficulty === 'medium' ? '보통' : '어려움'}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground">
                문제 {currentCardIndex + 1}
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 질문 */}
            <div>
              <h2 className="text-base sm:text-xl font-semibold text-foreground mb-4 break-words leading-tight">
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
                    className={`w-full justify-start p-2 sm:p-4 h-auto text-left ${
                      !showResult 
                        ? 'hover:bg-primary/10 hover:border-primary/30' 
                        : showCorrect
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                        : showWrong
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                        : 'border-border'
                    }`}
                    onClick={() => handleOptionSelect(index)}
                    disabled={selectedOption !== null}
                  >
                    <div className="flex items-start justify-between w-full min-w-0">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium mb-2 text-sm">
                          {String.fromCharCode(65 + index)}.
                        </div>
                        <pre className="bg-muted p-2 sm:p-3 rounded text-xs sm:text-sm font-mono whitespace-pre-wrap break-words overflow-hidden text-foreground leading-relaxed">
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
              <div className="bg-muted p-4 rounded-lg border-l-4 border-primary">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">
                    {selectedOption === 0 ? '🎉' : '😅'}
                    </span>
                  <h3 className="font-medium text-foreground">
                    {selectedOption === 0 ? '정답입니다!' : '틀렸습니다.'}
                    </h3>
                  </div>
                  
                  {/* 정답 표시 */}
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded mb-3 border border-green-200 dark:border-green-800">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">✅ 정답:</h4>
                  <p className="text-green-700 dark:text-green-300 text-sm">{currentCard.answer}</p>
                  </div>
                  
                  {/* 코드 블록 (코드 카드인 경우) */}
                  {currentCard.type === '코드' && currentCard.code && (
                  <div className="space-y-3 mb-3">
                    <div className="bg-gray-900 dark:bg-gray-800 text-green-400 dark:text-green-300 p-2 sm:p-3 rounded text-xs sm:text-sm font-mono overflow-hidden">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                        <span className="text-gray-400 dark:text-gray-500 text-xs">실행 코드:</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(currentCard.code || '');
                            const btn = document.activeElement as HTMLElement;
                            const originalText = btn.textContent;
                            btn.textContent = '복사됨!';
                            setTimeout(() => btn.textContent = originalText, 1000);
                          }}
                          className="text-xs px-2 py-1 bg-gray-700 dark:bg-gray-600 text-gray-300 dark:text-gray-200 rounded hover:bg-gray-600 dark:hover:bg-gray-500 transition-colors self-start sm:self-auto"
                        >
                          📋 복사
                        </button>
                      </div>
                      <pre className="whitespace-pre-wrap break-words">{currentCard.code}</pre>
                    </div>
                    
                    {/* 코드 한 줄씩 해설 */}
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800">
                      <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
                        📚 코드 해설
                      </h4>
                      <div className="space-y-2">
                        {currentCard.code.split('\n').map((line, index) => {
                          const analysis = analyzeCodeLine(line, index);
                          return (
                            <div key={index} className="text-sm">
                              <div className="flex items-start gap-2">
                                <span className="text-amber-600 dark:text-amber-400 font-mono text-xs bg-amber-100 dark:bg-amber-800 px-1 rounded">
                                  {index + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <code className="text-amber-900 dark:text-amber-100 font-mono text-xs bg-amber-100 dark:bg-amber-800 px-2 py-1 rounded">
                                    {analysis.line || ' '}
                                  </code>
                                  <p className="text-amber-700 dark:text-amber-300 mt-1 text-xs">
                                    {analysis.explanation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    </div>
                  )}
                  
                  {/* 설명 */}
                  {currentCard.explanation && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                      <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">💡 설명:</h4>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">{currentCard.explanation}</p>
                    </div>
                  )}
                </div>
              )}
              
            {/* 네비게이션 */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-4 gap-2 sm:gap-3">
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
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    🎊 퀴즈 완료!
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    점수: {score} / {totalAnswered} ({Math.round((score / totalAnswered) * 100)}%)
                  </p>
                  <Button onClick={restartQuiz} className="bg-primary hover:bg-primary/90 w-full sm:w-auto text-sm">
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
        <div className="text-center text-sm text-muted-foreground mt-4">
          💡 좌우로 스와이프하여 문제를 넘겨보세요
        </div>
      </div>
    </div>
  );
}