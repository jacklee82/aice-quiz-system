// HTML에서 AICE 카드 데이터를 추출하는 유틸리티

export interface ParsedCard {
  id: string;
  type: '개념' | '코드' | '해석';
  category: string;
  question: string;
  answer: string;
  code?: string;
  keywords: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
  section: string; // 유형 번호 (type-1, type-2 등)
}

export function parseAiceCards(htmlContent: string): ParsedCard[] {
  const cards: ParsedCard[] = [];
  
  // 유형별 섹션 추출
  const sectionRegex = /<a id="type-(\d+)"><\/a>\s*## (유형 \d+: [^<]+)/g;
  const sections: { [key: string]: string } = {};
  
  let sectionMatch;
  while ((sectionMatch = sectionRegex.exec(htmlContent)) !== null) {
    const typeNum = sectionMatch[1];
    const title = sectionMatch[2];
    sections[`type-${typeNum}`] = title;
  }
  
  // 카드 패턴 매칭
  const cardRegex = /### 카드 (\d+-\d+) \(([^)]+)\)\s*\*\*Q:\*\* ([^*]+)\*\*A:\*\*\s*([^*]+?)(?=\*\*|###|$)/g;
  
  let cardMatch;
  while ((cardMatch = cardRegex.exec(htmlContent)) !== null) {
    const cardId = cardMatch[1];
    const cardType = cardMatch[2] as '개념' | '코드' | '해석';
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
    const keywords: string[] = [];
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
    
    // 난이도 추정 (유형별로)
    let difficulty: 'easy' | 'medium' | 'hard' = 'medium';
    if (parseInt(typeNum) <= 4) difficulty = 'easy';
    else if (parseInt(typeNum) >= 11) difficulty = 'hard';
    
    const card: ParsedCard = {
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

// 퀴즈 옵션 생성
export function generateQuizOptions(card: ParsedCard, allCards: ParsedCard[]): string[] {
  const options: string[] = [];
  
  // 정답 추가
  if (card.type === '코드' && card.code) {
    options.push(card.code);
  } else {
    options.push(card.answer);
  }
  
  // 비슷한 카드에서 오답 생성
  const similarCards = allCards.filter(c => 
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
  } else {
    // 다른 유형에서 오답 생성
    const otherCards = allCards.filter(c => c.id !== card.id);
    if (otherCards.length > 0) {
      const randomCard = otherCards[Math.floor(Math.random() * otherCards.length)];
      if (randomCard.type === '코드' && randomCard.code) {
        options.push(randomCard.code);
      } else {
        options.push(randomCard.answer);
      }
    }
  }
  
  // 추가 오답 생성 (간단한 변형)
  if (card.type === '코드' && card.code) {
    // 코드 변형
    const wrongCode = card.code
      .replace(/import/g, 'from')
      .replace(/as np/g, 'as numpy')
      .replace(/as pd/g, 'as pandas')
      .replace(/plt\./g, 'matplotlib.pyplot.');
    options.push(wrongCode);
  } else {
    // 텍스트 변형
    const wrongAnswer = card.answer
      .replace(/핵심:/g, '주의:')
      .replace(/근거:/g, '이유:')
      .replace(/주의:/g, '핵심:');
    options.push(wrongAnswer);
  }
  
  // 2개 선택지만 반환 (정답 + 오답 1개)
  const uniqueOptions = [...new Set(options)];
  const shuffled = uniqueOptions.sort(() => Math.random() - 0.5);
  
  return shuffled.slice(0, 2);
}
