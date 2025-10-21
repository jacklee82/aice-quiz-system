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
  
  // 각 카드의 옵션을 저장하는 상태
  const [cardOptions, setCardOptions] = useState<{[key: string]: string[]}>({});
  
  // 힌트 시스템 상태
  const [showHints, setShowHints] = useState(false);
  const [usedHints, setUsedHints] = useState<number[]>([]);

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
    
    // 새로운 카드 세트에 대해 옵션 생성
    const newCardOptions: {[key: string]: string[]} = {};
    const cardsToProcess = isRandomMode ? 
      filteredCards.sort(() => Math.random() - 0.5).slice(0, Math.min(questionCount, filteredCards.length)) :
      filteredCards.sort(() => Math.random() - 0.5);
    
    cardsToProcess.forEach(card => {
      if (!cardOptions[card.id]) {
        newCardOptions[card.id] = generateQuizOptions(card);
      }
    });
    
    setCardOptions(prev => ({...prev, ...newCardOptions}));
    
      setCurrentCardIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setTotalAnswered(0);
    setShowHints(false);
    setUsedHints([]);
  }, [selectedCategory, selectedDifficulty, selectedType, isRandomMode, questionCount]);

  // 퀴즈 옵션 생성 (저장된 옵션 사용)
  const getQuizOptions = (card: AiceCard) => {
    return cardOptions[card.id] || generateQuizOptions(card);
  };

  // 퀴즈 선택 처리
  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(optionIndex);
    setShowResult(true);
    setTotalAnswered(prev => prev + 1);
    
    // 정답 확인 - 선택한 옵션이 실제 정답과 일치하는지 확인
    const options = getQuizOptions(currentCard);
    const selectedOptionText = options[optionIndex];
    const correctAnswer = currentCard.type === '코드' && currentCard.code ? currentCard.code : currentCard.answer;
    
    // 디버깅을 위한 콘솔 로그
    console.log('=== 정답 판정 디버깅 ===');
    console.log('선택한 옵션 인덱스:', optionIndex);
    console.log('선택한 옵션 텍스트:', selectedOptionText);
    console.log('정답:', correctAnswer);
    console.log('일치 여부:', selectedOptionText === correctAnswer);
    console.log('선택한 옵션 길이:', selectedOptionText?.length);
    console.log('정답 길이:', correctAnswer?.length);
    console.log('========================');
    
    if (selectedOptionText === correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  // 다음 문제로
  const nextQuestion = () => {
    if (currentCardIndex < shuffledCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
      setShowHints(false);
      setUsedHints([]);
    }
  };

  // 이전 문제로
  const prevQuestion = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setSelectedOption(null);
      setShowResult(false);
      setShowHints(false);
      setUsedHints([]);
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
    setShowHints(false);
    setUsedHints([]);
  };

  // 힌트 토글
  const toggleHints = () => {
    setShowHints(!showHints);
  };

  // 힌트 사용
  const useHint = (hintIndex: number) => {
    if (!usedHints.includes(hintIndex)) {
      setUsedHints(prev => [...prev, hintIndex]);
    }
  };

  // 터치/스와이프 이벤트 처리
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentCardIndex < shuffledCards.length - 1) {
      // 왼쪽 스와이프 = 다음 문제
      nextQuestion();
    }
    if (isRightSwipe && currentCardIndex > 0) {
      // 오른쪽 스와이프 = 이전 문제
      prevQuestion();
    }
  };

  // 퀴즈 완료 여부
  const isQuizComplete = currentCardIndex === shuffledCards.length - 1 && selectedOption !== null;

  // 코드 한 줄씩 분석하는 함수
  const analyzeCodeLine = (line: string, index: number) => {
    const trimmedLine = line.trim();
    
    // 빈 줄 처리
    if (!trimmedLine) {
      return { line, explanation: '빈 줄 - 코드의 가독성을 위한 공백' };
    }

    // import 문 분석
    if (trimmedLine.startsWith('import ')) {
      if (trimmedLine.includes('numpy')) {
        return { line, explanation: 'NumPy 라이브러리를 np라는 별칭으로 가져옵니다. 수치 계산과 배열 연산을 위한 핵심 라이브러리로, 데이터 사이언스의 기초가 됩니다.' };
      } else if (trimmedLine.includes('pandas')) {
        return { line, explanation: 'Pandas 라이브러리를 pd라는 별칭으로 가져옵니다. 데이터 분석과 조작을 위한 라이브러리로, 데이터프레임을 통해 구조화된 데이터를 처리합니다.' };
      } else if (trimmedLine.includes('matplotlib')) {
        return { line, explanation: 'Matplotlib 라이브러리를 가져옵니다. 그래프와 차트를 그리기 위한 시각화 라이브러리로, 데이터의 패턴을 시각적으로 표현합니다.' };
      } else if (trimmedLine.includes('seaborn')) {
        return { line, explanation: 'Seaborn 라이브러리를 가져옵니다. 통계적 데이터 시각화를 위한 고급 라이브러리로, matplotlib보다 더 아름다운 그래프를 쉽게 만들 수 있습니다.' };
      } else if (trimmedLine.includes('sklearn')) {
        return { line, explanation: 'Scikit-learn 라이브러리를 가져옵니다. 머신러닝 알고리즘과 도구들을 제공하는 라이브러리로, 예측 모델링의 핵심 도구입니다.' };
      } else if (trimmedLine.includes('xgboost')) {
        return { line, explanation: 'XGBoost 라이브러리를 가져옵니다. 그래디언트 부스팅 알고리즘을 구현한 고성능 머신러닝 라이브러리입니다.' };
      } else {
        return { line, explanation: '외부 라이브러리를 가져오는 import 문입니다. 필요한 기능을 코드에서 사용할 수 있게 합니다.' };
      }
    }

    // 변수 할당 분석
    if (trimmedLine.includes('=') && !trimmedLine.includes('==') && !trimmedLine.includes('!=')) {
      if (trimmedLine.includes('np.')) {
        if (trimmedLine.includes('array')) {
          return { line, explanation: 'NumPy 배열을 생성합니다. 배열은 동일한 타입의 데이터를 효율적으로 저장하고 연산할 수 있는 자료구조입니다.' };
        } else if (trimmedLine.includes('zeros')) {
          return { line, explanation: '모든 원소가 0인 NumPy 배열을 생성합니다. 초기화된 배열을 만들 때 자주 사용됩니다.' };
        } else if (trimmedLine.includes('ones')) {
          return { line, explanation: '모든 원소가 1인 NumPy 배열을 생성합니다. 특정 값으로 초기화된 배열을 만들 때 사용됩니다.' };
        } else if (trimmedLine.includes('arange')) {
          return { line, explanation: '일정한 간격의 숫자들을 가진 배열을 생성합니다. 수열을 만들 때 유용합니다.' };
        } else if (trimmedLine.includes('linspace')) {
          return { line, explanation: '시작값과 끝값 사이를 균등하게 나눈 배열을 생성합니다. 연속적인 값들을 만들 때 사용됩니다.' };
        } else {
          return { line, explanation: 'NumPy 함수를 사용하여 배열이나 수치 계산 결과를 변수에 저장합니다. NumPy는 고성능 수치 계산을 제공합니다.' };
        }
      } else if (trimmedLine.includes('pd.')) {
        if (trimmedLine.includes('DataFrame')) {
          return { line, explanation: 'Pandas DataFrame을 생성합니다. DataFrame은 행과 열로 구성된 2차원 데이터 구조로, 엑셀과 유사한 형태입니다.' };
        } else if (trimmedLine.includes('read_csv')) {
          return { line, explanation: 'CSV 파일을 읽어서 DataFrame으로 변환합니다. 데이터 분석의 첫 번째 단계로, 외부 데이터를 불러올 때 사용됩니다.' };
        } else if (trimmedLine.includes('read_excel')) {
          return { line, explanation: 'Excel 파일을 읽어서 DataFrame으로 변환합니다. 스프레드시트 형태의 데이터를 처리할 때 사용됩니다.' };
        } else {
          return { line, explanation: 'Pandas 함수를 사용하여 데이터프레임이나 시리즈를 생성합니다. 데이터 분석의 핵심 객체입니다.' };
        }
      } else if (trimmedLine.includes('plt.')) {
        if (trimmedLine.includes('plot')) {
          return { line, explanation: 'Matplotlib을 사용하여 선 그래프를 그립니다. 데이터의 변화 추이를 시각화할 때 사용됩니다.' };
        } else if (trimmedLine.includes('scatter')) {
          return { line, explanation: '산점도를 그립니다. 두 변수 간의 관계를 시각적으로 확인할 때 사용됩니다.' };
        } else if (trimmedLine.includes('hist')) {
          return { line, explanation: '히스토그램을 그립니다. 데이터의 분포를 시각화할 때 사용됩니다.' };
        } else if (trimmedLine.includes('show')) {
          return { line, explanation: '그래프를 화면에 표시합니다. 시각화 작업의 마지막 단계입니다.' };
        } else {
          return { line, explanation: 'Matplotlib의 pyplot을 사용하여 그래프를 그립니다. 데이터 시각화의 기본 도구입니다.' };
        }
      } else if (trimmedLine.includes('sns.')) {
        return { line, explanation: 'Seaborn을 사용하여 고급 시각화를 수행합니다. 통계적 그래프를 쉽게 만들 수 있습니다.' };
      } else if (trimmedLine.includes('sklearn')) {
        return { line, explanation: 'Scikit-learn의 머신러닝 모델을 사용합니다. 예측 모델을 구축하고 훈련시킬 때 사용됩니다.' };
      } else {
        return { line, explanation: '변수에 값을 할당합니다. 계산 결과나 데이터를 저장하여 나중에 사용할 수 있게 합니다.' };
      }
    }

    // 함수 정의 분석
    if (trimmedLine.startsWith('def ')) {
      return { line, explanation: '함수를 정의합니다. 재사용 가능한 코드 블록을 만들어 코드의 가독성과 유지보수성을 높입니다.' };
    }

    // 반복문 분석
    if (trimmedLine.startsWith('for ')) {
      return { line, explanation: 'for 반복문을 시작합니다. 리스트나 배열의 각 요소에 대해 반복적으로 작업을 수행합니다.' };
    } else if (trimmedLine.startsWith('while ')) {
      return { line, explanation: 'while 반복문을 시작합니다. 조건이 참인 동안 계속 반복 실행합니다.' };
    }

    // 조건문 분석
    if (trimmedLine.startsWith('if ')) {
      return { line, explanation: 'if 조건문을 시작합니다. 특정 조건이 참일 때만 코드를 실행합니다.' };
    } else if (trimmedLine.startsWith('elif ')) {
      return { line, explanation: 'elif 조건문입니다. 이전 조건이 거짓이고 현재 조건이 참일 때 실행됩니다.' };
    } else if (trimmedLine.startsWith('else:')) {
      return { line, explanation: 'else 절입니다. 모든 조건이 거짓일 때 실행되는 기본 동작을 정의합니다.' };
    }

    // return 문 분석
    if (trimmedLine.startsWith('return ')) {
      return { line, explanation: '함수에서 값을 반환합니다. 함수의 계산 결과를 호출한 곳으로 전달하여 재사용할 수 있게 합니다.' };
    }

    // print 문 분석
    if (trimmedLine.startsWith('print(')) {
      return { line, explanation: '결과를 화면에 출력합니다. 디버깅이나 최종 결과 확인에 사용되며, 사용자에게 정보를 전달합니다.' };
    }

    // try-except 분석
    if (trimmedLine.startsWith('try:')) {
      return { line, explanation: 'try 블록을 시작합니다. 오류가 발생할 수 있는 코드를 안전하게 실행하기 위해 사용됩니다.' };
    } else if (trimmedLine.startsWith('except')) {
      return { line, explanation: 'except 블록입니다. try 블록에서 오류가 발생했을 때 실행되는 예외 처리 코드입니다.' };
    }

    // 주석 분석
    if (trimmedLine.startsWith('#')) {
      return { line, explanation: '주석입니다. 코드의 동작을 설명하거나 개발자에게 정보를 전달합니다.' };
    }

    // 기본 설명 - 더 구체적으로
    if (trimmedLine.includes('(') && trimmedLine.includes(')')) {
      return { line, explanation: '함수나 메서드를 호출합니다. 특정 기능을 수행하기 위해 미리 정의된 코드를 실행합니다.' };
    }

    return { line, explanation: '코드 실행을 위한 문장입니다. 프로그램의 로직을 구성하는 기본 단위입니다.' };
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
      <div className="max-w-2xl mx-auto w-full p-1 sm:p-4 min-w-0">
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
        <Card 
          className="shadow-lg overflow-hidden w-full"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <CardHeader className="pb-4 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full">
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
              <div className="text-right">
                <span className="text-xs text-muted-foreground">
                  문제 {currentCardIndex + 1}
              </span>
                <div className="text-xs text-muted-foreground mt-1">
                  ← 스와이프 →
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 w-full min-w-0">
            {/* 질문 */}
            <div className="w-full min-w-0">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-base sm:text-xl font-semibold text-foreground break-words leading-tight flex-1">
                {currentCard.question}
              </h2>
                {currentCard.hints && currentCard.hints.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleHints}
                    className="flex-shrink-0"
                  >
                    💡 힌트 ({currentCard.hints.length}개)
                  </Button>
                )}
              </div>
              
              {/* 힌트 섹션 */}
              {showHints && currentCard.hints && (
                <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <h3 className="font-medium text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
                    💡 힌트
                  </h3>
                  <div className="space-y-2">
                    {currentCard.hints.map((hint, index) => (
                      <div key={index} className="flex items-start gap-2">
                    <button
                          onClick={() => useHint(index)}
                          className={`text-xs px-2 py-1 rounded transition-colors ${
                            usedHints.includes(index)
                              ? 'bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100'
                              : 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800'
                          }`}
                        >
                          {usedHints.includes(index) ? '✓' : '👁️'}
                    </button>
                        <div className="flex-1">
                          <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                            {hint.type === 'library' && '📚 라이브러리: '}
                            {hint.type === 'concept' && '🧠 개념: '}
                            {hint.type === 'tip' && '💡 팁: '}
                            {hint.type === 'code' && '💻 코드: '}
                          </span>
                          <span className={`text-sm ${
                            usedHints.includes(index) 
                              ? 'text-amber-900 dark:text-amber-100' 
                              : 'text-amber-600 dark:text-amber-400'
                          }`}>
                            {usedHints.includes(index) ? hint.content : '클릭하여 힌트 보기'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
                </div>

            {/* 선택지 */}
            <div className="space-y-3 w-full min-w-0">
              {getQuizOptions(currentCard).map((option, index) => {
                const isSelected = selectedOption === index;
                const correctAnswer = currentCard.type === '코드' && currentCard.code ? currentCard.code : currentCard.answer;
                const isCorrect = option === correctAnswer; // 실제 정답과 비교
                const showCorrect = showResult && isCorrect;
                const showWrong = showResult && isSelected && !isCorrect;

                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full justify-start p-2 sm:p-4 h-auto text-left min-w-0 ${
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
                    <div className="flex items-start justify-between w-full min-w-0 overflow-hidden">
                      <div className="flex-1 min-w-0 overflow-hidden">
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