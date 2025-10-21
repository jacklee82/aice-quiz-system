// 퀴즈 카드 데이터 타입
export interface AiceCard {
  id: string;
  type: 'quiz';
  category: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0, 1, 2, 3 중 정답 인덱스
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  library: string;
}

// 개별 라이브러리별 퀴즈 문제들
export const aiceCards: AiceCard[] = [
  // NumPy 퀴즈
  {
    id: 'numpy-1',
    type: 'quiz',
    category: '라이브러리 임포트',
    question: 'NumPy를 올바르게 임포트하는 방법은?',
    options: [
      'import numpy as np',
      'import numpy',
      'from numpy import *',
      'import numpy as n'
    ],
    correctAnswer: 0,
    explanation: 'NumPy는 관례적으로 "import numpy as np"로 임포트합니다. "as np" 별칭을 사용하는 것이 표준입니다.',
    difficulty: 'easy',
    library: 'NumPy'
  },

  // Pandas 퀴즈
  {
    id: 'pandas-1',
    type: 'quiz',
    category: '라이브러리 임포트',
    question: 'Pandas를 올바르게 임포트하는 방법은?',
    options: [
      'import pandas as pd',
      'import pandas',
      'from pandas import *',
      'import pandas as p'
    ],
    correctAnswer: 0,
    explanation: 'Pandas는 관례적으로 "import pandas as pd"로 임포트합니다. "as pd" 별칭을 사용하는 것이 표준입니다.',
    difficulty: 'easy',
    library: 'Pandas'
  },

  // Matplotlib 퀴즈
  {
    id: 'matplotlib-1',
    type: 'quiz',
    category: '라이브러리 임포트',
    question: 'Matplotlib을 올바르게 임포트하는 방법은?',
    options: [
      'import matplotlib.pyplot as plt',
      'import matplotlib',
      'from matplotlib import *',
      'import matplotlib.pyplot'
    ],
    correctAnswer: 0,
    explanation: 'Matplotlib은 관례적으로 "import matplotlib.pyplot as plt"로 임포트합니다. pyplot 서브모듈과 "as plt" 별칭을 사용합니다.',
    difficulty: 'easy',
    library: 'Matplotlib'
  },

  // Seaborn 퀴즈
  {
    id: 'seaborn-1',
    type: 'quiz',
    category: '라이브러리 임포트',
    question: 'Seaborn을 올바르게 임포트하는 방법은?',
    options: [
      'import seaborn as sns',
      'import seaborn',
      'from seaborn import *',
      'import seaborn as s'
    ],
    correctAnswer: 0,
    explanation: 'Seaborn은 관례적으로 "import seaborn as sns"로 임포트합니다. "as sns" 별칭을 사용하는 것이 표준입니다.',
    difficulty: 'easy',
    library: 'Seaborn'
  },

  // Scikit-learn 퀴즈
  {
    id: 'sklearn-1',
    type: 'quiz',
    category: '라이브러리 임포트',
    question: 'train_test_split을 올바르게 임포트하는 방법은?',
    options: [
      'from sklearn.model_selection import train_test_split',
      'from sklearn import train_test_split',
      'import sklearn.train_test_split',
      'from sklearn.model_selection import train_test_split as tts'
    ],
    correctAnswer: 0,
    explanation: 'train_test_split은 sklearn.model_selection 모듈에서 임포트해야 합니다. 하위 모듈을 명시해야 합니다.',
    difficulty: 'medium',
    library: 'Scikit-learn'
  },

  // XGBoost 퀴즈
  {
    id: 'xgboost-1',
    type: 'quiz',
    category: '라이브러리 임포트',
    question: 'XGBoost를 올바르게 임포트하는 방법은?',
    options: [
      'import xgboost as xgb',
      'import xgboost',
      'from xgboost import *',
      'import xgboost as x'
    ],
    correctAnswer: 0,
    explanation: 'XGBoost는 관례적으로 "import xgboost as xgb"로 임포트합니다. "as xgb" 별칭을 사용하는 것이 표준입니다.',
    difficulty: 'easy',
    library: 'XGBoost'
  }
];

// 라이브러리별 필터링
export const getCardsByLibrary = (library: string) => {
  return aiceCards.filter(card => card.library === library);
};

// 난이도별 필터링
export const getCardsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
  return aiceCards.filter(card => card.difficulty === difficulty);
};

// 랜덤 카드 선택
export const getRandomCards = (count: number) => {
  const shuffled = [...aiceCards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// 라이브러리 목록 가져오기
export const getLibraries = () => {
  return [...new Set(aiceCards.map(card => card.library))];
};



