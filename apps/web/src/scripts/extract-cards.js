// HTML에서 AICE 카드 데이터를 추출하는 스크립트
const fs = require('fs');
const path = require('path');

// HTML 파일 읽기
const htmlContent = fs.readFileSync('aice-print.html', 'utf8');

// 카드 추출 함수
function extractCards(htmlContent) {
  const cards = [];
  
  // 유형별 섹션 추출
  const sectionRegex = /<a id="type-(\d+)"><\/a>\s*## (유형 \d+: [^<]+)/g;
  const sections = {};
  
  let sectionMatch;
  while ((sectionMatch = sectionRegex.exec(htmlContent)) !== null) {
    const typeNum = sectionMatch[1];
    const title = sectionMatch[2];
    sections[`type-${typeNum}`] = title;
  }
  
  // 카드 패턴 매칭 (더 정확한 정규식)
  const cardRegex = /### 카드 (\d+-\d+) \(([^)]+)\)\s*\*\*Q:\*\* ([^*]+?)\*\*A:\*\*\s*([^*]+?)(?=\*\*Q:\*\*|### 카드|$)/gs;
  
  let cardMatch;
  while ((cardMatch = cardRegex.exec(htmlContent)) !== null) {
    const cardId = cardMatch[1];
    const cardType = cardMatch[2].trim();
    const question = cardMatch[3].trim();
    const answerContent = cardMatch[4].trim();
    
    // 답변에서 코드와 설명 분리
    const codeMatch = answerContent.match(/```python\n([\s\S]*?)\n```/);
    const code = codeMatch ? codeMatch[1].trim() : undefined;
    
    // 설명 추출 (코드 제외)
    let explanation = answerContent;
    if (code) {
      explanation = answerContent.replace(/```python\n[\s\S]*?\n```/, '').trim();
    }
    
    // 핵심 키워드 추출
    const keywords = [];
    const keywordMatches = explanation.match(/- 핵심: ([^-]+)/g);
    if (keywordMatches) {
      keywordMatches.forEach(match => {
        const keyword = match.replace('- 핵심: ', '').trim();
        if (keyword) keywords.push(keyword);
      });
    }
    
    // 유형 번호 추출
    const typeNum = cardId.split('-')[0];
    const section = `type-${typeNum}`;
    const category = sections[section] || `유형 ${typeNum}`;
    
    // 난이도 추정
    let difficulty = 'medium';
    if (parseInt(typeNum) <= 4) difficulty = 'easy';
    else if (parseInt(typeNum) >= 11) difficulty = 'hard';
    
    const card = {
      id: cardId,
      type: cardType,
      category,
      question,
      answer: explanation,
      code,
      keywords,
      difficulty,
      explanation: explanation.length > 200 ? explanation.substring(0, 200) + '...' : explanation,
      section
    };
    
    cards.push(card);
  }
  
  return cards;
}

// 카드 추출 실행
const extractedCards = extractCards(htmlContent);

console.log(`추출된 카드 수: ${extractedCards.length}`);

// TypeScript 파일로 출력
const tsContent = `// AICE 전체 카드 데이터 (HTML에서 자동 추출)
export interface AiceCard {
  id: string;
  type: '개념' | '코드' | '해석';
  category: string;
  question: string;
  answer: string;
  code?: string;
  keywords: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
  section: string;
}

export const aiceCards: AiceCard[] = ${JSON.stringify(extractedCards, null, 2)};

// 카테고리별 필터링
export const getCardsByCategory = (category: string) => {
  return aiceCards.filter(card => card.category === category);
};

// 유형별 필터링
export const getCardsBySection = (section: string) => {
  return aiceCards.filter(card => card.section === section);
};

// 난이도별 필터링
export const getCardsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
  return aiceCards.filter(card => card.difficulty === difficulty);
};

// 타입별 필터링
export const getCardsByType = (type: '개념' | '코드' | '해석') => {
  return aiceCards.filter(card => card.type === type);
};

// 랜덤 카드 선택
export const getRandomCards = (count: number) => {
  const shuffled = [...aiceCards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// 카테고리 목록
export const getCategories = () => {
  return [...new Set(aiceCards.map(card => card.category))];
};

// 유형 목록
export const getSections = () => {
  return [...new Set(aiceCards.map(card => card.section))];
};

// 퀴즈 옵션 생성
export const generateQuizOptions = (card: AiceCard): string[] => {
  const options: string[] = [];
  
  // 정답 추가
  if (card.type === '코드' && card.code) {
    options.push(card.code);
  } else {
    options.push(card.answer);
  }
  
  // 비슷한 카드에서 오답 생성
  const similarCards = aiceCards.filter(c => 
    c.type === card.type && 
    c.category === card.category && 
    c.id !== card.id
  );
  
  if (similarCards.length > 0) {
    const randomCard = similarCards[Math.floor(Math.random() * similarCards.length)];
    if (randomCard.type === '코드' && randomCard.code) {
      options.push(randomCard.code);
    } else {
      options.push(randomCard.answer);
    }
  }
  
  // 다른 유형에서 오답 생성
  const otherCards = aiceCards.filter(c => c.id !== card.id);
  if (otherCards.length > 0) {
    const randomCard = otherCards[Math.floor(Math.random() * otherCards.length)];
    if (randomCard.type === '코드' && randomCard.code) {
      options.push(randomCard.code);
    } else {
      options.push(randomCard.answer);
    }
  }
  
  // 간단한 변형으로 오답 생성
  if (card.type === '코드' && card.code) {
    const wrongCode = card.code
      .replace(/import/g, 'from')
      .replace(/as np/g, 'as numpy')
      .replace(/as pd/g, 'as pandas');
    options.push(wrongCode);
  } else {
    const wrongAnswer = card.answer
      .replace(/핵심:/g, '주의:')
      .replace(/근거:/g, '이유:');
    options.push(wrongAnswer);
  }
  
  // 4개 옵션으로 맞추기
  while (options.length < 4) {
    options.push('다른 답안');
  }
  
  // 중복 제거 및 순서 섞기
  const uniqueOptions = [...new Set(options)];
  const shuffled = uniqueOptions.sort(() => Math.random() - 0.5);
  
  return shuffled.slice(0, 4);
};
`;

// 파일 저장
fs.writeFileSync('my-better-t-app/apps/web/src/data/aice-cards-full.ts', tsContent);

console.log('✅ 전체 카드 데이터 추출 완료!');
console.log(`📊 총 ${extractedCards.length}개 카드 추출`);
console.log('📁 파일 저장: my-better-t-app/apps/web/src/data/aice-cards-full.ts');
