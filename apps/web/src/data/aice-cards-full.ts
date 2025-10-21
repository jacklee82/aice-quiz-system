// AICE 전체 카드 데이터 (HTML에서 파싱된 데이터)
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
  // 퀴즈용 필드
  quizOptions?: string[];
  correctAnswer?: number;
}

// 유형별 카테고리 매핑
const categoryMapping: { [key: string]: string } = {
  'type-1': '라이브러리 임포트',
  'type-2': '데이터 불러오기', 
  'type-3': '데이터 시각화',
  'type-4': '그룹화 및 집계',
  'type-5': '데이터 전처리',
  'type-6': '결측치 처리',
  'type-7': '범주형 인코딩',
  'type-8': '데이터셋 분리',
  'type-9': '스케일링',
  'type-10': '기본 모델링',
  'type-11': '앙상블 모델링',
  'type-12': '모델 성능 평가',
  'type-13': '딥러닝 모델 구성',
  'type-14': '딥러닝 평가'
};

// 샘플 카드 데이터 (실제로는 HTML 파싱 결과를 사용)
export const aiceCards: AiceCard[] = [
  // 유형 1: 라이브러리 임포트
  {
    id: '1-1',
    type: '개념',
    category: '라이브러리 임포트',
    question: 'AICE에서 자주 쓰는 7대 라이브러리와 관례적 별칭은?',
    answer: 'NumPy(np), Pandas(pd), Matplotlib.pyplot(plt), Seaborn(sns), scikit-learn(sklearn), TensorFlow(tf), XGBoost(xgb)',
    keywords: ['import', '별칭', '라이브러리'],
    difficulty: 'easy',
    explanation: '데이터 분석부터 딥러닝까지 전 범위를 커버하는 핵심 라이브러리들입니다.',
    section: 'type-1'
  },
  {
    id: '1-2',
    type: '코드',
    category: '라이브러리 임포트',
    question: 'sklearn에서 train_test_split, StandardScaler, accuracy_score를 임포트하라.',
    answer: 'sklearn의 하위 모듈에서 필요한 함수들을 임포트한다.',
    code: `from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score`,
    keywords: ['sklearn', 'model_selection', 'preprocessing', 'metrics'],
    difficulty: 'easy',
    explanation: 'sklearn은 하위 모듈로 구성되어 있어서 필요한 함수를 해당 모듈에서 임포트해야 합니다.',
    section: 'type-1'
  },
  {
    id: '1-3',
    type: '해석',
    category: '라이브러리 임포트',
    question: 'TensorFlow와 Keras 임포트 시 주의점은?',
    answer: 'TensorFlow(tf), Keras(keras), Keras layers를 함께 임포트하고 from tensorflow import keras 형태를 권장한다.',
    keywords: ['TensorFlow', 'Keras', 'layers'],
    difficulty: 'medium',
    explanation: 'Sequential 모델 구성에 필요한 모든 컴포넌트를 함께 임포트해야 합니다.',
    section: 'type-1'
  },

  // 유형 2: 데이터 불러오기
  {
    id: '2-1',
    type: '개념',
    category: '데이터 불러오기',
    question: 'CSV 파일 읽기 시 인코딩 선택 기준은?',
    answer: 'utf-8 시도 → 실패 시 cp949 → 그래도 실패 시 euc-kr 순으로 적용한다.',
    keywords: ['인코딩', 'utf-8', 'cp949', 'euc-kr'],
    difficulty: 'medium',
    explanation: '한글 데이터의 경우 인코딩 문제가 자주 발생하므로 단계적으로 시도해보는 것이 중요합니다.',
    section: 'type-2'
  },
  {
    id: '2-2',
    type: '코드',
    category: '데이터 불러오기',
    question: 'Excel 파일을 읽는 1줄 코드는?',
    answer: '시트 인덱스와 엔진을 명시하여 Excel 파일을 읽는다.',
    code: `df = pd.read_excel('data.xlsx', sheet_name=0, engine='openpyxl')`,
    keywords: ['Excel', 'openpyxl', 'sheet_name', 'engine'],
    difficulty: 'easy',
    explanation: 'xlsx 파일은 openpyxl 엔진이 필요하며, 시트를 명시해야 합니다.',
    section: 'type-2'
  },
  {
    id: '2-3',
    type: '코드',
    category: '데이터 불러오기',
    question: '데이터 구조 확인 3줄 코드는?',
    answer: '크기 → 샘플 → 타입/결측 순으로 확인한다.',
    code: `print(df.shape)
print(df.head(3))
print(df.info())`,
    keywords: ['shape', 'head', 'info', '구조'],
    difficulty: 'easy',
    explanation: '데이터의 기본 정보를 빠르게 파악하는 표준 루틴입니다.',
    section: 'type-2'
  },

  // 유형 3: 데이터 시각화
  {
    id: '3-1',
    type: '코드',
    category: '데이터 시각화',
    question: '범주형 데이터 분포를 countplot으로 그려라.',
    answer: 'seaborn countplot을 사용하여 범주형 데이터의 분포를 막대그래프로 시각화한다.',
    code: `import matplotlib.pyplot as plt
import seaborn as sns

ax = sns.countplot(data=df, x='Address1')
ax.bar_label(ax.containers[0])  # 개수 라벨
plt.xticks(rotation=45)
plt.title('Address1 Distribution')
plt.show()`,
    keywords: ['countplot', '범주형', '분포', '시각화'],
    difficulty: 'medium',
    explanation: '범주형 데이터의 빈도를 직관적으로 확인할 수 있는 방법입니다.',
    section: 'type-3'
  },
  {
    id: '3-2',
    type: '코드',
    category: '데이터 시각화',
    question: '수치형 데이터 분포를 histogram과 boxplot으로 비교하라.',
    answer: 'histogram과 boxplot을 나란히 그려서 분포 형태와 이상치를 동시에 확인한다.',
    code: `fig, axes = plt.subplots(1, 2, figsize=(10,4))
sns.histplot(data=df, x='Speed_Per_Hour', bins=30, ax=axes[0])
sns.boxplot(data=df, y='Speed_Per_Hour', ax=axes[1])
axes[0].set_title('Histogram of Speed')
axes[1].set_title('Boxplot of Speed')
plt.tight_layout()
plt.show()`,
    keywords: ['histogram', 'boxplot', '분포', '이상치'],
    difficulty: 'medium',
    explanation: '수치형 데이터의 분포와 이상치를 동시에 확인하는 효과적인 방법입니다.',
    section: 'type-3'
  },

  // 유형 4: 그룹화 및 집계
  {
    id: '4-1',
    type: '코드',
    category: '그룹화 및 집계',
    question: '그룹별 평균을 계산하라.',
    answer: 'groupby를 사용하여 그룹별 평균을 계산한다.',
    code: `# 그룹별 평균
grouped_mean = df.groupby('Address1')['Speed_Per_Hour'].mean()
print(grouped_mean)

# 여러 컬럼의 그룹별 통계
grouped_stats = df.groupby('Address1').agg({
    'Speed_Per_Hour': ['mean', 'std', 'count'],
    'Distance': 'sum'
})
print(grouped_stats)`,
    keywords: ['groupby', 'mean', 'agg', '집계'],
    difficulty: 'medium',
    explanation: '그룹별 통계를 계산하는 pandas의 핵심 기능입니다.',
    section: 'type-4'
  },

  // 유형 5: 데이터 전처리
  {
    id: '5-1',
    type: '코드',
    category: '데이터 전처리',
    question: '결측치를 처리하라.',
    answer: '결측치를 삭제하거나 대체값으로 채운다.',
    code: `# 결측치 확인
print(df.isnull().sum())

# 결측치 삭제
df_dropped = df.dropna()

# 결측치 대체 (평균값으로)
df_filled = df.fillna(df.mean())

# 특정 컬럼만 대체
df['Speed_Per_Hour'].fillna(df['Speed_Per_Hour'].mean(), inplace=True)`,
    keywords: ['결측치', 'dropna', 'fillna', '대체'],
    difficulty: 'medium',
    explanation: '결측치 처리는 데이터 전처리의 핵심 단계입니다.',
    section: 'type-5'
  },

  // 유형 6: 결측치 처리
  {
    id: '6-1',
    type: '개념',
    category: '결측치 처리',
    question: '결측치 확인 방법은?',
    answer: 'isnull().sum() 또는 isna().sum()으로 컬럼별 개수를 보고, 전체 개수는 .sum().sum()으로 계산한다.',
    keywords: ['결측치', 'isnull', 'isna'],
    difficulty: 'easy',
    explanation: '결측치의 위치와 양을 파악하는 첫 번째 단계입니다.',
    section: 'type-6'
  },

  // 유형 7: 범주형 인코딩
  {
    id: '7-1',
    type: '개념',
    category: '범주형 인코딩',
    question: '원-핫 인코딩이 필요한 이유는?',
    answer: '머신러닝 모델은 숫자만 처리하므로 범주형 데이터를 숫자로 변환해야 한다.',
    keywords: ['원-핫', '인코딩', '범주형'],
    difficulty: 'medium',
    explanation: '범주형 데이터를 머신러닝 모델이 이해할 수 있는 형태로 변환하는 과정입니다.',
    section: 'type-7'
  },

  // 유형 8: 데이터셋 분리
  {
    id: '8-1',
    type: '코드',
    category: '데이터셋 분리',
    question: 'train_test_split 기본 사용법은?',
    answer: 'test_size=0.2, random_state=42로 설정하여 재현 가능한 분할을 수행한다.',
    code: `from sklearn.model_selection import train_test_split
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)`,
    keywords: ['train_test_split', '분할', 'random_state'],
    difficulty: 'easy',
    explanation: '머신러닝 모델 학습을 위한 데이터 분할의 기본 방법입니다.',
    section: 'type-8'
  },

  // 유형 9: 스케일링
  {
    id: '9-1',
    type: '개념',
    category: '스케일링',
    question: 'StandardScaler 사용 시점은?',
    answer: '정규분포 가정, 이상치 적음',
    keywords: ['StandardScaler', '정규화', '스케일링'],
    difficulty: 'medium',
    explanation: '평균 0, 표준편차 1로 변환하여 이상치에 민감한 특성이 있습니다.',
    section: 'type-9'
  },

  // 유형 10: 기본 모델링
  {
    id: '10-1',
    type: '코드',
    category: '기본 모델링',
    question: 'DecisionTreeClassifier 기본 사용법은?',
    answer: 'max_depth, min_samples_split 조절하여 과적합을 방지한다.',
    code: `from sklearn.tree import DecisionTreeClassifier
dt = DecisionTreeClassifier(max_depth=5, random_state=42).fit(X_train, y_train)`,
    keywords: ['DecisionTree', '과적합', 'max_depth'],
    difficulty: 'medium',
    explanation: '의사결정나무의 과적합을 방지하기 위한 기본 설정입니다.',
    section: 'type-10'
  },

  // 유형 11: 앙상블 모델링
  {
    id: '11-1',
    type: '코드',
    category: '앙상블 모델링',
    question: 'RandomForest 기본 파라미터는?',
    answer: 'n_estimators=100, max_depth=None로 설정하여 기본 성능을 확인한다.',
    code: `from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=300, max_depth=None, random_state=42, n_jobs=-1)
rf.fit(X_train, y_train)`,
    keywords: ['RandomForest', '앙상블', 'n_estimators'],
    difficulty: 'medium',
    explanation: '여러 의사결정나무를 조합하여 안정적인 성능을 얻는 앙상블 방법입니다.',
    section: 'type-11'
  },

  // 유형 12: 모델 성능 평가
  {
    id: '12-1',
    type: '개념',
    category: '모델 성능 평가',
    question: '분류 문제 기본 지표는?',
    answer: 'accuracy, precision, recall, f1-score',
    keywords: ['accuracy', 'precision', 'recall', 'f1-score'],
    difficulty: 'medium',
    explanation: '분류 모델의 성능을 다각도로 평가하는 핵심 지표들입니다.',
    section: 'type-12'
  },

  // 유형 13: 딥러닝 모델 구성
  {
    id: '13-1',
    type: '코드',
    category: '딥러닝 모델 구성',
    question: 'Sequential 모델 기본 구조는?',
    answer: 'Input → Dense → Dense → Output',
    code: `from tensorflow import keras
model = keras.Sequential([
    keras.layers.Input(shape=(X_train.shape[1],)),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(32, activation='relu'),
    keras.layers.Dense(1, activation='sigmoid')
])`,
    keywords: ['Sequential', 'Dense', 'activation'],
    difficulty: 'hard',
    explanation: '완전연결 신경망의 기본 구조로 입력 차원을 맞춰야 합니다.',
    section: 'type-13'
  },

  // 유형 14: 딥러닝 평가
  {
    id: '14-1',
    type: '코드',
    category: '딥러닝 평가',
    question: '학습 과정 시각화법은?',
    answer: 'history.history를 사용하여 loss, accuracy 추이를 확인한다.',
    code: `import matplotlib.pyplot as plt
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.show()`,
    keywords: ['history', '시각화', 'loss'],
    difficulty: 'hard',
    explanation: '딥러닝 모델의 학습 과정을 모니터링하는 중요한 방법입니다.',
    section: 'type-14'
  },

  // 추가 라이브러리 임포트 카드들
  {
    id: '1-4',
    type: '개념',
    category: '라이브러리 임포트',
    question: 'XGBoost 임포트 시 eval_metric 설정 이유는?',
    answer: '분류는 eval_metric=logloss, 회귀는 eval_metric=rmse로 명시해 학습/평가의 일관성을 보장한다.',
    keywords: ['XGBoost', 'eval_metric', 'logloss', 'rmse'],
    difficulty: 'medium',
    explanation: '학습과 평가에서 동일한 메트릭을 사용하여 일관성을 보장합니다.',
    section: 'type-1'
  },
  {
    id: '1-5',
    type: '코드',
    category: '라이브러리 임포트',
    question: '시각화 라이브러리 선택 기준은?',
    answer: '기본 그리기는 matplotlib, 통계적 시각화·테마는 seaborn을 사용하며, 한글 폰트 설정을 반드시 한다.',
    code: `import matplotlib.pyplot as plt
import seaborn as sns
plt.rc('font', family='NanumGothicCoding')

sns.set_theme(style='whitegrid')
sns.histplot(df['Speed_Per_Hour'], bins=30)
plt.title('평균 시속 분포')
plt.show()`,
    keywords: ['matplotlib', 'seaborn', '한글폰트'],
    difficulty: 'medium',
    explanation: 'seaborn이 통계적 시각화에 특화되어 있고, 한글 폰트 설정이 필요합니다.',
    section: 'type-1'
  },

  // 추가 데이터 불러오기 카드들
  {
    id: '2-4',
    type: '개념',
    category: '데이터 불러오기',
    question: '데이터 타입 확인법은?',
    answer: 'df.dtypes 또는 df.info()로 수치형/범주형을 구분하고, object 타입은 범주형 가능성이 높다.',
    keywords: ['dtypes', 'info', '수치형', '범주형'],
    difficulty: 'easy',
    explanation: '데이터 타입을 파악하는 것은 전처리의 첫 번째 단계입니다.',
    section: 'type-2'
  },
  {
    id: '2-5',
    type: '코드',
    category: '데이터 불러오기',
    question: '기술통계 확인 1줄?',
    answer: '수치형 요약 통계를 출력한다.',
    code: `print(df.describe())`,
    keywords: ['describe', '기술통계'],
    difficulty: 'easy',
    explanation: '데이터의 기본 통계 정보를 한눈에 확인할 수 있습니다.',
    section: 'type-2'
  },

  // 추가 데이터 시각화 카드들
  {
    id: '3-3',
    type: '코드',
    category: '데이터 시각화',
    question: '두 변수의 관계를 scatterplot과 jointplot으로 확인하라.',
    answer: 'scatterplot과 jointplot을 사용하여 두 변수 간의 상관관계와 분포를 확인한다.',
    code: `# Scatterplot
plt.figure(figsize=(8,6))
sns.scatterplot(data=df, x='Time_Driving', y='Speed_Per_Hour')
plt.title('Time vs Speed Relationship')
plt.show()

# Jointplot
sns.jointplot(data=df, x='Time_Driving', y='Speed_Per_Hour', kind='scatter')
plt.show()`,
    keywords: ['scatterplot', 'jointplot', '상관관계'],
    difficulty: 'medium',
    explanation: '두 변수 간의 관계를 다각도로 분석하는 방법입니다.',
    section: 'type-3'
  },
  {
    id: '3-4',
    type: '코드',
    category: '데이터 시각화',
    question: '상관 히트맵을 만들어라.',
    answer: '여러 변수 간의 상관계수를 히트맵으로 시각화한다.',
    code: `# 상관계수 계산
correlation_matrix = df[['Distance', 'Time_Driving', 'Speed_Per_Hour']].corr()

# 히트맵 그리기
plt.figure(figsize=(8,6))
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
plt.title('Correlation Heatmap')
plt.show()`,
    keywords: ['heatmap', '상관계수', 'correlation'],
    difficulty: 'medium',
    explanation: '다변수 간의 관계를 한눈에 파악할 수 있는 효과적인 방법입니다.',
    section: 'type-3'
  },

  // 추가 그룹화 및 집계 카드들
  {
    id: '4-2',
    type: '코드',
    category: '그룹화 및 집계',
    question: '피벗 테이블을 만들어라.',
    answer: 'pivot_table을 사용하여 크로스탭 형태의 집계 테이블을 만든다.',
    code: `# 피벗 테이블 생성
pivot_table = df.pivot_table(
    values='Speed_Per_Hour',
    index='Address1',
    columns='Time_Driving',
    aggfunc='mean',
    fill_value=0
)
print(pivot_table)`,
    keywords: ['pivot_table', '피벗', '크로스탭'],
    difficulty: 'medium',
    explanation: '2차원 집계 테이블을 만드는 pandas의 강력한 기능입니다.',
    section: 'type-4'
  },

  // 추가 데이터 전처리 카드들
  {
    id: '5-2',
    type: '코드',
    category: '데이터 전처리',
    question: '범주형 데이터를 인코딩하라.',
    answer: '범주형 데이터를 수치형으로 변환한다.',
    code: `# Label Encoding
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
df['Address1_encoded'] = le.fit_transform(df['Address1'])

# One-Hot Encoding
df_encoded = pd.get_dummies(df, columns=['Address1'])

# 또는 sklearn 사용
from sklearn.preprocessing import OneHotEncoder
ohe = OneHotEncoder()
encoded = ohe.fit_transform(df[['Address1']])`,
    keywords: ['인코딩', 'LabelEncoder', 'OneHotEncoder', 'get_dummies'],
    difficulty: 'medium',
    explanation: '머신러닝 모델이 이해할 수 있도록 범주형 데이터를 숫자로 변환합니다.',
    section: 'type-5'
  },

  // 추가 결측치 처리 카드들
  {
    id: '6-2',
    type: '개념',
    category: '결측치 처리',
    question: '수치형 결측치 대치법은?',
    answer: 'median() 사용 (이상치에 강함)',
    keywords: ['median', '이상치', '대치'],
    difficulty: 'medium',
    explanation: '평균보다 중앙값이 이상치에 더 강건합니다.',
    section: 'type-6'
  },
  {
    id: '6-3',
    type: '코드',
    category: '결측치 처리',
    question: '수치형 중앙값 대치 2줄?',
    answer: '수치형 컬럼을 선택하여 중앙값으로 대치한다.',
    code: `numeric_cols = df.select_dtypes(include='number').columns
df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].median())`,
    keywords: ['select_dtypes', 'median', 'fillna'],
    difficulty: 'medium',
    explanation: '수치형 데이터에 안전한 대치 방법입니다.',
    section: 'type-6'
  },

  // 추가 범주형 인코딩 카드들
  {
    id: '7-2',
    type: '개념',
    category: '범주형 인코딩',
    question: 'pandas get_dummies vs sklearn OneHotEncoder?',
    answer: 'get_dummies는 빠름, OneHotEncoder는 파이프라인',
    keywords: ['get_dummies', 'OneHotEncoder', '파이프라인'],
    difficulty: 'medium',
    explanation: '실전은 get_dummies, 프로덕션은 OneHotEncoder를 사용합니다.',
    section: 'type-7'
  },
  {
    id: '7-3',
    type: '코드',
    category: '범주형 인코딩',
    question: 'sklearn 원-핫 3줄?',
    answer: 'OneHotEncoder를 사용하여 범주형 데이터를 원-핫 인코딩한다.',
    code: `from sklearn.preprocessing import OneHotEncoder
ohe = OneHotEncoder(handle_unknown='ignore', sparse=False)
encoded = ohe.fit_transform(df[['category']])`,
    keywords: ['OneHotEncoder', 'handle_unknown', 'sparse'],
    difficulty: 'medium',
    explanation: 'sklearn의 파이프라인과 호환되는 인코딩 방법입니다.',
    section: 'type-7'
  },

  // 추가 데이터셋 분리 카드들
  {
    id: '8-2',
    type: '개념',
    category: '데이터셋 분리',
    question: 'stratify 옵션 사용 시점은?',
    answer: '분류 문제에서 클래스 불균형',
    keywords: ['stratify', '클래스', '불균형'],
    difficulty: 'medium',
    explanation: '훈련/테스트 클래스 비율을 유지하는 중요한 옵션입니다.',
    section: 'type-8'
  },
  {
    id: '8-3',
    type: '코드',
    category: '데이터셋 분리',
    question: 'stratify 분할 1줄?',
    answer: '클래스 비율을 유지하면서 데이터를 분할한다.',
    code: `X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)`,
    keywords: ['train_test_split', 'stratify', 'random_state'],
    difficulty: 'medium',
    explanation: '불균형 데이터에서 중요한 분할 방법입니다.',
    section: 'type-8'
  },

  // 추가 스케일링 카드들
  {
    id: '9-2',
    type: '개념',
    category: '스케일링',
    question: 'RobustScaler 사용 시점은?',
    answer: '이상치 많음, 회귀 문제',
    keywords: ['RobustScaler', '이상치', '회귀'],
    difficulty: 'medium',
    explanation: '중앙값과 IQR을 사용하여 이상치에 강한 스케일러입니다.',
    section: 'type-9'
  },
  {
    id: '9-3',
    type: '코드',
    category: '스케일링',
    question: 'RobustScaler 3줄?',
    answer: '이상치에 강한 스케일러를 적용한다.',
    code: `from sklearn.preprocessing import RobustScaler
scaler = RobustScaler()
X_train_scaled = scaler.fit_transform(X_train); X_test_scaled = scaler.transform(X_test)`,
    keywords: ['RobustScaler', 'fit_transform', 'transform'],
    difficulty: 'medium',
    explanation: '이상치가 많은 데이터에 적합한 스케일러입니다.',
    section: 'type-9'
  },

  // 추가 기본 모델링 카드들
  {
    id: '10-2',
    type: '개념',
    category: '기본 모델링',
    question: 'LogisticRegression 주의사항은?',
    answer: 'max_iter=1000 설정',
    keywords: ['LogisticRegression', 'max_iter', '수렴'],
    difficulty: 'medium',
    explanation: '수렴 실패를 방지하기 위한 중요한 설정입니다.',
    section: 'type-10'
  },
  {
    id: '10-3',
    type: '코드',
    category: '기본 모델링',
    question: 'LogisticRegression 3줄?',
    answer: '로지스틱 회귀 모델을 학습한다.',
    code: `from sklearn.linear_model import LogisticRegression
lr = LogisticRegression(max_iter=1000)
lr.fit(X_train, y_train)`,
    keywords: ['LogisticRegression', 'max_iter', 'fit'],
    difficulty: 'medium',
    explanation: '분류 문제의 기본 모델 중 하나입니다.',
    section: 'type-10'
  },

  // 추가 앙상블 모델링 카드들
  {
    id: '11-2',
    type: '개념',
    category: '앙상블 모델링',
    question: 'XGBoost 기본 파라미터는?',
    answer: 'n_estimators=100, learning_rate=0.1',
    keywords: ['XGBoost', 'n_estimators', 'learning_rate'],
    difficulty: 'medium',
    explanation: '안정적인 시작점을 제공하는 기본 파라미터입니다.',
    section: 'type-11'
  },
  {
    id: '11-3',
    type: '코드',
    category: '앙상블 모델링',
    question: 'XGBoost 3줄?',
    answer: 'XGBoost 모델을 학습한다.',
    code: `from xgboost import XGBClassifier
xgb = XGBClassifier(n_estimators=100, random_state=42)
xgb.fit(X_train, y_train)`,
    keywords: ['XGBClassifier', 'n_estimators', 'random_state'],
    difficulty: 'medium',
    explanation: '강력한 앙상블 모델 중 하나입니다.',
    section: 'type-11'
  },

  // 추가 모델 성능 평가 카드들
  {
    id: '12-2',
    type: '개념',
    category: '모델 성능 평가',
    question: '회귀 문제 기본 지표는?',
    answer: 'MAE, MSE, RMSE',
    keywords: ['MAE', 'MSE', 'RMSE', '회귀'],
    difficulty: 'medium',
    explanation: '회귀 모델의 오차를 측정하는 핵심 지표들입니다.',
    section: 'type-12'
  },
  {
    id: '12-3',
    type: '코드',
    category: '모델 성능 평가',
    question: 'MAE 계산 1줄?',
    answer: '평균절대오차를 계산한다.',
    code: `from sklearn.metrics import mean_absolute_error
mae = mean_absolute_error(y_test, y_pred)`,
    keywords: ['mean_absolute_error', 'MAE'],
    difficulty: 'easy',
    explanation: '회귀 모델의 기본 평가 지표입니다.',
    section: 'type-12'
  },

  // 추가 딥러닝 모델 구성 카드들
  {
    id: '13-2',
    type: '개념',
    category: '딥러닝 모델 구성',
    question: '활성화 함수 선택법은?',
    answer: '은닉층=relu, 출력층=분류는 sigmoid/softmax',
    keywords: ['활성화함수', 'relu', 'sigmoid', 'softmax'],
    difficulty: 'hard',
    explanation: '각 함수의 특성에 맞는 선택이 중요합니다.',
    section: 'type-13'
  },
  {
    id: '13-3',
    type: '코드',
    category: '딥러닝 모델 구성',
    question: '모델 컴파일 1줄?',
    answer: '모델을 컴파일하여 학습 준비를 완료한다.',
    code: `model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])`,
    keywords: ['compile', 'optimizer', 'loss', 'metrics'],
    difficulty: 'hard',
    explanation: '딥러닝 모델 학습의 필수 단계입니다.',
    section: 'type-13'
  },

  // 추가 딥러닝 평가 카드들
  {
    id: '14-2',
    type: '개념',
    category: '딥러닝 평가',
    question: '모델 저장/로드법은?',
    answer: 'model.save(), load_model()',
    keywords: ['save', 'load_model', '저장'],
    difficulty: 'hard',
    explanation: '학습된 모델을 보존하고 재사용하는 방법입니다.',
    section: 'type-14'
  },
  {
    id: '14-3',
    type: '코드',
    category: '딥러닝 평가',
    question: '모델 저장 1줄?',
    answer: '학습된 모델을 파일로 저장한다.',
    code: `model.save('model.keras')`,
    keywords: ['save', 'keras'],
    difficulty: 'hard',
    explanation: '모델을 영구적으로 보존하는 방법입니다.',
    section: 'type-14'
  },

  // 추가 라이브러리 임포트 카드들 (더 많은 문제)
  {
    id: '1-6',
    type: '개념',
    category: '라이브러리 임포트',
    question: 'NumPy 기본 배열 생성법은?',
    answer: 'np.array(), np.zeros(), np.ones(), np.arange()를 사용한다.',
    keywords: ['array', 'zeros', 'ones', 'arange'],
    difficulty: 'easy',
    explanation: 'NumPy의 기본 배열 생성 함수들입니다.',
    section: 'type-1'
  },
  {
    id: '1-7',
    type: '코드',
    category: '라이브러리 임포트',
    question: 'NumPy 배열 생성 3줄?',
    answer: '다양한 방법으로 NumPy 배열을 생성한다.',
    code: `import numpy as np
arr1 = np.array([1, 2, 3, 4, 5])
arr2 = np.zeros((3, 4))
arr3 = np.ones((2, 3))`,
    keywords: ['array', 'zeros', 'ones'],
    difficulty: 'easy',
    explanation: 'NumPy의 기본 배열 생성 방법들입니다.',
    section: 'type-1'
  },
  {
    id: '1-8',
    type: '개념',
    category: '라이브러리 임포트',
    question: 'Pandas DataFrame 생성법은?',
    answer: 'pd.DataFrame()으로 딕셔너리나 리스트에서 생성한다.',
    keywords: ['DataFrame', '딕셔너리', '리스트'],
    difficulty: 'easy',
    explanation: 'Pandas의 핵심 데이터 구조인 DataFrame 생성 방법입니다.',
    section: 'type-1'
  },
  {
    id: '1-9',
    type: '코드',
    category: '라이브러리 임포트',
    question: 'DataFrame 생성 2줄?',
    answer: '딕셔너리로 DataFrame을 생성한다.',
    code: `import pandas as pd
df = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})`,
    keywords: ['DataFrame', '딕셔너리'],
    difficulty: 'easy',
    explanation: '가장 기본적인 DataFrame 생성 방법입니다.',
    section: 'type-1'
  },
  {
    id: '1-10',
    type: '개념',
    category: '라이브러리 임포트',
    question: 'Matplotlib 기본 사용법은?',
    answer: 'plt.plot(), plt.show()로 그래프를 그리고 표시한다.',
    keywords: ['plot', 'show', '그래프'],
    difficulty: 'easy',
    explanation: 'Matplotlib의 가장 기본적인 사용법입니다.',
    section: 'type-1'
  },

  // 추가 데이터 불러오기 카드들
  {
    id: '2-6',
    type: '개념',
    category: '데이터 불러오기',
    question: 'JSON 파일 읽기법은?',
    answer: 'pd.read_json()으로 JSON 파일을 읽는다.',
    keywords: ['read_json', 'JSON'],
    difficulty: 'easy',
    explanation: 'JSON 형태의 데이터를 읽는 방법입니다.',
    section: 'type-2'
  },
  {
    id: '2-7',
    type: '코드',
    category: '데이터 불러오기',
    question: 'JSON 파일 읽기 1줄?',
    answer: 'JSON 파일을 DataFrame으로 읽는다.',
    code: `df = pd.read_json('data.json')`,
    keywords: ['read_json'],
    difficulty: 'easy',
    explanation: 'JSON 파일을 읽는 기본 방법입니다.',
    section: 'type-2'
  },
  {
    id: '2-8',
    type: '개념',
    category: '데이터 불러오기',
    question: 'URL에서 데이터 읽기법은?',
    answer: 'pd.read_csv(url)로 웹에서 직접 데이터를 읽는다.',
    keywords: ['URL', '웹', 'read_csv'],
    difficulty: 'medium',
    explanation: '웹에서 직접 데이터를 가져오는 방법입니다.',
    section: 'type-2'
  },
  {
    id: '2-9',
    type: '코드',
    category: '데이터 불러오기',
    question: 'URL 데이터 읽기 1줄?',
    answer: '웹 URL에서 CSV 파일을 읽는다.',
    code: `df = pd.read_csv('https://example.com/data.csv')`,
    keywords: ['URL', 'read_csv'],
    difficulty: 'medium',
    explanation: '웹에서 직접 데이터를 가져오는 실용적인 방법입니다.',
    section: 'type-2'
  },
  {
    id: '2-10',
    type: '개념',
    category: '데이터 불러오기',
    question: '대용량 파일 처리법은?',
    answer: 'chunksize 파라미터로 청크 단위로 읽는다.',
    keywords: ['chunksize', '청크', '대용량'],
    difficulty: 'medium',
    explanation: '메모리 효율적으로 대용량 파일을 처리하는 방법입니다.',
    section: 'type-2'
  },

  // 추가 데이터 시각화 카드들
  {
    id: '3-5',
    type: '개념',
    category: '데이터 시각화',
    question: '막대그래프 그리기법은?',
    answer: 'plt.bar() 또는 sns.barplot()을 사용한다.',
    keywords: ['bar', '막대그래프'],
    difficulty: 'easy',
    explanation: '범주형 데이터를 시각화하는 기본 방법입니다.',
    section: 'type-3'
  },
  {
    id: '3-6',
    type: '코드',
    category: '데이터 시각화',
    question: '막대그래프 2줄?',
    answer: '막대그래프를 그리고 표시한다.',
    code: `plt.bar(['A', 'B', 'C'], [1, 2, 3])
plt.show()`,
    keywords: ['bar', 'show'],
    difficulty: 'easy',
    explanation: '가장 기본적인 막대그래프 그리기입니다.',
    section: 'type-3'
  },
  {
    id: '3-7',
    type: '개념',
    category: '데이터 시각화',
    question: '선그래프 그리기법은?',
    answer: 'plt.plot()으로 시계열 데이터를 시각화한다.',
    keywords: ['plot', '선그래프', '시계열'],
    difficulty: 'easy',
    explanation: '시간에 따른 변화를 보여주는 기본 그래프입니다.',
    section: 'type-3'
  },
  {
    id: '3-8',
    type: '코드',
    category: '데이터 시각화',
    question: '선그래프 2줄?',
    answer: '선그래프를 그리고 표시한다.',
    code: `plt.plot([1, 2, 3, 4], [1, 4, 2, 3])
plt.show()`,
    keywords: ['plot', 'show'],
    difficulty: 'easy',
    explanation: '가장 기본적인 선그래프 그리기입니다.',
    section: 'type-3'
  },
  {
    id: '3-9',
    type: '개념',
    category: '데이터 시각화',
    question: '서브플롯 생성법은?',
    answer: 'plt.subplots()로 여러 그래프를 한 번에 그린다.',
    keywords: ['subplots', '서브플롯'],
    difficulty: 'medium',
    explanation: '여러 그래프를 비교할 때 유용한 방법입니다.',
    section: 'type-3'
  },

  // 추가 그룹화 및 집계 카드들
  {
    id: '4-3',
    type: '개념',
    category: '그룹화 및 집계',
    question: 'value_counts() 사용법은?',
    answer: '범주형 데이터의 빈도를 계산한다.',
    keywords: ['value_counts', '빈도', '범주형'],
    difficulty: 'easy',
    explanation: '범주형 데이터의 분포를 파악하는 기본 방법입니다.',
    section: 'type-4'
  },
  {
    id: '4-4',
    type: '코드',
    category: '그룹화 및 집계',
    question: 'value_counts() 1줄?',
    answer: '범주형 데이터의 빈도를 계산한다.',
    code: `df['category'].value_counts()`,
    keywords: ['value_counts'],
    difficulty: 'easy',
    explanation: '가장 간단한 빈도 계산 방법입니다.',
    section: 'type-4'
  },
  {
    id: '4-5',
    type: '개념',
    category: '그룹화 및 집계',
    question: 'crosstab 사용법은?',
    answer: 'pd.crosstab()으로 교차표를 만든다.',
    keywords: ['crosstab', '교차표'],
    difficulty: 'medium',
    explanation: '두 범주형 변수 간의 관계를 파악하는 방법입니다.',
    section: 'type-4'
  },
  {
    id: '4-6',
    type: '코드',
    category: '그룹화 및 집계',
    question: 'crosstab 1줄?',
    answer: '두 범주형 변수의 교차표를 만든다.',
    code: `pd.crosstab(df['A'], df['B'])`,
    keywords: ['crosstab'],
    difficulty: 'medium',
    explanation: '범주형 변수 간의 관계를 시각화하는 방법입니다.',
    section: 'type-4'
  },

  // 추가 데이터 전처리 카드들
  {
    id: '5-3',
    type: '개념',
    category: '데이터 전처리',
    question: '날짜 파싱 에러 처리법은?',
    answer: 'errors=coerce로 잘못된 날짜를 NaN으로 변환한다.',
    keywords: ['errors', 'coerce', '날짜'],
    difficulty: 'medium',
    explanation: '날짜 파싱 시 발생할 수 있는 에러를 안전하게 처리하는 방법입니다.',
    section: 'type-5'
  },
  {
    id: '5-4',
    type: '코드',
    category: '데이터 전처리',
    question: '안전한 날짜 파싱 1줄?',
    answer: '에러가 발생해도 안전하게 날짜를 파싱한다.',
    code: `df['date'] = pd.to_datetime(df['date'], errors='coerce')`,
    keywords: ['to_datetime', 'errors', 'coerce'],
    difficulty: 'medium',
    explanation: '날짜 파싱 시 에러를 방지하는 안전한 방법입니다.',
    section: 'type-5'
  },
  {
    id: '5-5',
    type: '개념',
    category: '데이터 전처리',
    question: '문자열 정규화법은?',
    answer: 'str.lower(), str.strip()으로 문자열을 정규화한다.',
    keywords: ['lower', 'strip', '정규화'],
    difficulty: 'easy',
    explanation: '문자열 데이터의 일관성을 위한 기본 전처리입니다.',
    section: 'type-5'
  },
  {
    id: '5-6',
    type: '코드',
    category: '데이터 전처리',
    question: '문자열 정규화 2줄?',
    answer: '문자열을 소문자로 변환하고 공백을 제거한다.',
    code: `df['text'] = df['text'].str.lower()
df['text'] = df['text'].str.strip()`,
    keywords: ['lower', 'strip'],
    difficulty: 'easy',
    explanation: '문자열 데이터의 일관성을 위한 기본 전처리입니다.',
    section: 'type-5'
  },

  // 추가 결측치 처리 카드들
  {
    id: '6-4',
    type: '개념',
    category: '결측치 처리',
    question: '결측치 패턴 분석법은?',
    answer: 'msno.matrix()로 결측치 패턴을 시각화한다.',
    keywords: ['msno', 'matrix', '패턴'],
    difficulty: 'medium',
    explanation: '결측치의 분포와 패턴을 파악하는 시각화 방법입니다.',
    section: 'type-6'
  },
  {
    id: '6-5',
    type: '코드',
    category: '결측치 처리',
    question: '결측치 시각화 2줄?',
    answer: '결측치 패턴을 시각화한다.',
    code: `import missingno as msno
msno.matrix(df)`,
    keywords: ['missingno', 'matrix'],
    difficulty: 'medium',
    explanation: '결측치의 분포를 한눈에 파악할 수 있는 시각화입니다.',
    section: 'type-6'
  },
  {
    id: '6-6',
    type: '개념',
    category: '결측치 처리',
    question: 'KNN 대치법은?',
    answer: 'KNNImputer로 유사한 관측치 기반 대치한다.',
    keywords: ['KNNImputer', 'KNN', '대치'],
    difficulty: 'hard',
    explanation: '고급 결측치 대치 방법으로 데이터의 패턴을 활용합니다.',
    section: 'type-6'
  },
  {
    id: '6-7',
    type: '코드',
    category: '결측치 처리',
    question: 'KNN 대치 3줄?',
    answer: 'KNN 알고리즘으로 결측치를 대치한다.',
    code: `from sklearn.impute import KNNImputer
imputer = KNNImputer(n_neighbors=3)
df_imputed = imputer.fit_transform(df)`,
    keywords: ['KNNImputer', 'n_neighbors'],
    difficulty: 'hard',
    explanation: '고급 결측치 대치 방법으로 데이터의 패턴을 활용합니다.',
    section: 'type-6'
  },

  // 추가 범주형 인코딩 카드들
  {
    id: '7-4',
    type: '개념',
    category: '범주형 인코딩',
    question: 'Target Encoding 사용법은?',
    answer: '타겟 변수의 평균으로 범주를 인코딩한다.',
    keywords: ['Target Encoding', '타겟', '평균'],
    difficulty: 'hard',
    explanation: '고급 인코딩 방법으로 타겟 변수의 정보를 활용합니다.',
    section: 'type-7'
  },
  {
    id: '7-5',
    type: '코드',
    category: '범주형 인코딩',
    question: 'Target Encoding 3줄?',
    answer: '타겟 변수를 활용한 고급 인코딩을 수행한다.',
    code: `from category_encoders import TargetEncoder
encoder = TargetEncoder()
df_encoded = encoder.fit_transform(df, target)`,
    keywords: ['TargetEncoder', 'category_encoders'],
    difficulty: 'hard',
    explanation: '타겟 변수의 정보를 활용한 고급 인코딩 방법입니다.',
    section: 'type-7'
  },
  {
    id: '7-6',
    type: '개념',
    category: '범주형 인코딩',
    question: 'Ordinal Encoding 사용법은?',
    answer: '순서가 있는 범주형 데이터에 사용한다.',
    keywords: ['Ordinal', '순서', '범주형'],
    difficulty: 'medium',
    explanation: '순서가 있는 범주형 데이터에 적합한 인코딩 방법입니다.',
    section: 'type-7'
  },
  {
    id: '7-7',
    type: '코드',
    category: '범주형 인코딩',
    question: 'Ordinal Encoding 3줄?',
    answer: '순서가 있는 범주형 데이터를 인코딩한다.',
    code: `from sklearn.preprocessing import OrdinalEncoder
encoder = OrdinalEncoder()
df_encoded = encoder.fit_transform(df[['category']])`,
    keywords: ['OrdinalEncoder', 'fit_transform'],
    difficulty: 'medium',
    explanation: '순서가 있는 범주형 데이터에 적합한 인코딩 방법입니다.',
    section: 'type-7'
  },

  // 추가 데이터셋 분리 카드들
  {
    id: '8-4',
    type: '개념',
    category: '데이터셋 분리',
    question: '시계열 데이터 분할법은?',
    answer: '시간 순서를 고려하여 분할한다.',
    keywords: ['시계열', '시간순서', '분할'],
    difficulty: 'medium',
    explanation: '시계열 데이터는 시간 순서를 유지하며 분할해야 합니다.',
    section: 'type-8'
  },
  {
    id: '8-5',
    type: '코드',
    category: '데이터셋 분리',
    question: '시계열 분할 2줄?',
    answer: '시간 순서를 고려하여 데이터를 분할한다.',
    code: `train_size = int(len(df) * 0.8)
train, test = df[:train_size], df[train_size:]`,
    keywords: ['train_size', '분할'],
    difficulty: 'medium',
    explanation: '시계열 데이터의 특성을 고려한 분할 방법입니다.',
    section: 'type-8'
  },
  {
    id: '8-6',
    type: '개념',
    category: '데이터셋 분리',
    question: 'K-Fold 교차검증법은?',
    answer: '데이터를 K개로 나누어 K번 검증한다.',
    keywords: ['K-Fold', '교차검증', 'K번'],
    difficulty: 'medium',
    explanation: '모델의 일반화 성능을 평가하는 강력한 방법입니다.',
    section: 'type-8'
  },
  {
    id: '8-7',
    type: '코드',
    category: '데이터셋 분리',
    question: 'K-Fold 교차검증 3줄?',
    answer: 'K-Fold 교차검증을 수행한다.',
    code: `from sklearn.model_selection import KFold
kf = KFold(n_splits=5, shuffle=True, random_state=42)
for train_idx, val_idx in kf.split(X):`,
    keywords: ['KFold', 'n_splits', 'shuffle'],
    difficulty: 'medium',
    explanation: '모델의 일반화 성능을 평가하는 표준 방법입니다.',
    section: 'type-8'
  },

  // 추가 스케일링 카드들
  {
    id: '9-4',
    type: '개념',
    category: '스케일링',
    question: 'MinMaxScaler 사용법은?',
    answer: '0-1 범위로 정규화한다.',
    keywords: ['MinMaxScaler', '0-1', '정규화'],
    difficulty: 'easy',
    explanation: '데이터를 0과 1 사이로 정규화하는 방법입니다.',
    section: 'type-9'
  },
  {
    id: '9-5',
    type: '코드',
    category: '스케일링',
    question: 'MinMaxScaler 3줄?',
    answer: '데이터를 0-1 범위로 정규화한다.',
    code: `from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)`,
    keywords: ['MinMaxScaler', 'fit_transform'],
    difficulty: 'easy',
    explanation: '가장 기본적인 정규화 방법입니다.',
    section: 'type-9'
  },
  {
    id: '9-6',
    type: '개념',
    category: '스케일링',
    question: 'PowerTransformer 사용법은?',
    answer: '데이터를 정규분포에 가깝게 변환한다.',
    keywords: ['PowerTransformer', '정규분포', '변환'],
    difficulty: 'hard',
    explanation: '고급 스케일링 방법으로 데이터 분포를 개선합니다.',
    section: 'type-9'
  },
  {
    id: '9-7',
    type: '코드',
    category: '스케일링',
    question: 'PowerTransformer 3줄?',
    answer: '데이터 분포를 정규분포에 가깝게 변환한다.',
    code: `from sklearn.preprocessing import PowerTransformer
pt = PowerTransformer(method='yeo-johnson')
X_transformed = pt.fit_transform(X)`,
    keywords: ['PowerTransformer', 'yeo-johnson'],
    difficulty: 'hard',
    explanation: '고급 스케일링으로 데이터 분포를 개선합니다.',
    section: 'type-9'
  },

  // 추가 기본 모델링 카드들
  {
    id: '10-4',
    type: '개념',
    category: '기본 모델링',
    question: 'RandomForest 특징은?',
    answer: '앙상블, 과적합 방지, 특성 중요도 제공',
    keywords: ['RandomForest', '앙상블', '과적합'],
    difficulty: 'medium',
    explanation: '강력한 앙상블 모델로 과적합에 강합니다.',
    section: 'type-10'
  },
  {
    id: '10-5',
    type: '코드',
    category: '기본 모델링',
    question: 'RandomForest 3줄?',
    answer: 'RandomForest 모델을 학습한다.',
    code: `from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)`,
    keywords: ['RandomForestClassifier', 'n_estimators'],
    difficulty: 'medium',
    explanation: '강력한 앙상블 모델의 기본 사용법입니다.',
    section: 'type-10'
  },
  {
    id: '10-6',
    type: '개념',
    category: '기본 모델링',
    question: 'SVM 특징은?',
    answer: '고차원 데이터에 강함, 커널 트릭 사용',
    keywords: ['SVM', '고차원', '커널'],
    difficulty: 'hard',
    explanation: '고차원 데이터에서 강력한 성능을 보이는 모델입니다.',
    section: 'type-10'
  },
  {
    id: '10-7',
    type: '코드',
    category: '기본 모델링',
    question: 'SVM 3줄?',
    answer: 'SVM 모델을 학습한다.',
    code: `from sklearn.svm import SVC
svm = SVC(kernel='rbf', random_state=42)
svm.fit(X_train, y_train)`,
    keywords: ['SVC', 'kernel', 'rbf'],
    difficulty: 'hard',
    explanation: '고차원 데이터에 강한 SVM 모델입니다.',
    section: 'type-10'
  },

  // 추가 앙상블 모델링 카드들
  {
    id: '11-4',
    type: '개념',
    category: '앙상블 모델링',
    question: 'LightGBM 특징은?',
    answer: '빠른 속도, 메모리 효율적, 높은 성능',
    keywords: ['LightGBM', '빠른속도', '메모리효율'],
    difficulty: 'medium',
    explanation: 'XGBoost보다 빠르고 메모리 효율적인 그래디언트 부스팅 모델입니다.',
    section: 'type-11'
  },
  {
    id: '11-5',
    type: '코드',
    category: '앙상블 모델링',
    question: 'LightGBM 3줄?',
    answer: 'LightGBM 모델을 학습한다.',
    code: `from lightgbm import LGBMClassifier
lgb = LGBMClassifier(n_estimators=100, random_state=42)
lgb.fit(X_train, y_train)`,
    keywords: ['LGBMClassifier', 'n_estimators'],
    difficulty: 'medium',
    explanation: '빠르고 효율적인 LightGBM 모델입니다.',
    section: 'type-11'
  },
  {
    id: '11-6',
    type: '개념',
    category: '앙상블 모델링',
    question: 'Voting Classifier 사용법은?',
    answer: '여러 모델의 예측을 투표로 결합한다.',
    keywords: ['Voting', '투표', '결합'],
    difficulty: 'hard',
    explanation: '여러 모델의 예측을 결합하여 성능을 향상시키는 방법입니다.',
    section: 'type-11'
  },
  {
    id: '11-7',
    type: '코드',
    category: '앙상블 모델링',
    question: 'Voting Classifier 4줄?',
    answer: '여러 모델을 결합한 투표 분류기를 만든다.',
    code: `from sklearn.ensemble import VotingClassifier
voting = VotingClassifier([
    ('rf', RandomForestClassifier()),
    ('xgb', XGBClassifier())
])
voting.fit(X_train, y_train)`,
    keywords: ['VotingClassifier', 'RandomForest', 'XGBClassifier'],
    difficulty: 'hard',
    explanation: '여러 모델을 결합한 강력한 앙상블 방법입니다.',
    section: 'type-11'
  },

  // 추가 모델 성능 평가 카드들
  {
    id: '12-4',
    type: '개념',
    category: '모델 성능 평가',
    question: 'ROC-AUC 사용법은?',
    answer: '이진분류의 성능을 곡선 아래 면적으로 평가한다.',
    keywords: ['ROC', 'AUC', '이진분류'],
    difficulty: 'medium',
    explanation: '이진분류 모델의 성능을 평가하는 중요한 지표입니다.',
    section: 'type-12'
  },
  {
    id: '12-5',
    type: '코드',
    category: '모델 성능 평가',
    question: 'ROC-AUC 계산 2줄?',
    answer: 'ROC 곡선과 AUC 값을 계산한다.',
    code: `from sklearn.metrics import roc_auc_score
auc = roc_auc_score(y_test, y_pred_proba)`,
    keywords: ['roc_auc_score', 'AUC'],
    difficulty: 'medium',
    explanation: '이진분류 모델의 성능을 평가하는 핵심 지표입니다.',
    section: 'type-12'
  },
  {
    id: '12-6',
    type: '개념',
    category: '모델 성능 평가',
    question: 'Precision-Recall 사용법은?',
    answer: '불균형 데이터에서 정밀도와 재현율을 평가한다.',
    keywords: ['Precision', 'Recall', '불균형'],
    difficulty: 'medium',
    explanation: '불균형 데이터에서 모델 성능을 평가하는 중요한 지표입니다.',
    section: 'type-12'
  },
  {
    id: '12-7',
    type: '코드',
    category: '모델 성능 평가',
    question: 'Precision-Recall 계산 2줄?',
    answer: '정밀도와 재현율을 계산한다.',
    code: `from sklearn.metrics import precision_score, recall_score
precision = precision_score(y_test, y_pred); recall = recall_score(y_test, y_pred)`,
    keywords: ['precision_score', 'recall_score'],
    difficulty: 'medium',
    explanation: '불균형 데이터에서 중요한 성능 지표들입니다.',
    section: 'type-12'
  },

  // 추가 딥러닝 모델 구성 카드들
  {
    id: '13-4',
    type: '개념',
    category: '딥러닝 모델 구성',
    question: 'Dropout 사용법은?',
    answer: '과적합 방지를 위해 랜덤하게 뉴런을 비활성화한다.',
    keywords: ['Dropout', '과적합', '비활성화'],
    difficulty: 'hard',
    explanation: '딥러닝에서 과적합을 방지하는 중요한 정규화 기법입니다.',
    section: 'type-13'
  },
  {
    id: '13-5',
    type: '코드',
    category: '딥러닝 모델 구성',
    question: 'Dropout 추가 2줄?',
    answer: '모델에 Dropout 레이어를 추가한다.',
    code: `from tensorflow.keras.layers import Dropout
model.add(Dropout(0.5))`,
    keywords: ['Dropout', '0.5'],
    difficulty: 'hard',
    explanation: '과적합 방지를 위한 Dropout 레이어 추가입니다.',
    section: 'type-13'
  },
  {
    id: '13-6',
    type: '개념',
    category: '딥러닝 모델 구성',
    question: 'BatchNormalization 사용법은?',
    answer: '학습 안정성을 위해 배치별로 정규화한다.',
    keywords: ['BatchNormalization', '정규화', '학습안정성'],
    difficulty: 'hard',
    explanation: '딥러닝에서 학습 안정성을 높이는 중요한 기법입니다.',
    section: 'type-13'
  },
  {
    id: '13-7',
    type: '코드',
    category: '딥러닝 모델 구성',
    question: 'BatchNormalization 추가 2줄?',
    answer: '모델에 BatchNormalization 레이어를 추가한다.',
    code: `from tensorflow.keras.layers import BatchNormalization
model.add(BatchNormalization())`,
    keywords: ['BatchNormalization'],
    difficulty: 'hard',
    explanation: '학습 안정성을 높이는 BatchNormalization 레이어입니다.',
    section: 'type-13'
  },

  // 추가 딥러닝 평가 카드들
  {
    id: '14-4',
    type: '개념',
    category: '딥러닝 평가',
    question: 'Early Stopping 사용법은?',
    answer: '검증 손실이 개선되지 않으면 학습을 조기 종료한다.',
    keywords: ['Early Stopping', '조기종료', '검증손실'],
    difficulty: 'hard',
    explanation: '과적합을 방지하고 학습 시간을 단축하는 중요한 기법입니다.',
    section: 'type-14'
  },
  {
    id: '14-5',
    type: '코드',
    category: '딥러닝 평가',
    question: 'Early Stopping 설정 3줄?',
    answer: 'Early Stopping 콜백을 설정한다.',
    code: `from tensorflow.keras.callbacks import EarlyStopping
early_stop = EarlyStopping(monitor='val_loss', patience=5)
model.fit(X_train, y_train, callbacks=[early_stop])`,
    keywords: ['EarlyStopping', 'patience', 'callbacks'],
    difficulty: 'hard',
    explanation: '과적합 방지를 위한 Early Stopping 설정입니다.',
    section: 'type-14'
  },
  {
    id: '14-6',
    type: '개념',
    category: '딥러닝 평가',
    question: 'ModelCheckpoint 사용법은?',
    answer: '최고 성능 모델을 자동으로 저장한다.',
    keywords: ['ModelCheckpoint', '자동저장', '최고성능'],
    difficulty: 'hard',
    explanation: '학습 중 최고 성능 모델을 자동으로 보존하는 방법입니다.',
    section: 'type-14'
  },
  {
    id: '14-7',
    type: '코드',
    category: '딥러닝 평가',
    question: 'ModelCheckpoint 설정 3줄?',
    answer: '최고 성능 모델을 자동 저장하도록 설정한다.',
    code: `from tensorflow.keras.callbacks import ModelCheckpoint
checkpoint = ModelCheckpoint('best_model.h5', save_best_only=True)
model.fit(X_train, y_train, callbacks=[checkpoint])`,
    keywords: ['ModelCheckpoint', 'save_best_only'],
    difficulty: 'hard',
    explanation: '최고 성능 모델을 자동으로 저장하는 설정입니다.',
    section: 'type-14'
  },

  // 추가 라이브러리 임포트 카드들 (더 많은 문제)
  {
    id: '1-11',
    type: '개념',
    category: '라이브러리 임포트',
    question: 'Seaborn 스타일 설정법은?',
    answer: 'sns.set_style(), sns.set_palette()로 테마를 설정한다.',
    keywords: ['set_style', 'set_palette', '테마'],
    difficulty: 'easy',
    explanation: 'Seaborn의 시각화 스타일을 커스터마이징하는 방법입니다.',
    section: 'type-1'
  },
  {
    id: '1-12',
    type: '코드',
    category: '라이브러리 임포트',
    question: 'Seaborn 스타일 설정 2줄?',
    answer: 'Seaborn의 스타일과 팔레트를 설정한다.',
    code: `sns.set_style('whitegrid')
sns.set_palette('husl')`,
    keywords: ['set_style', 'set_palette'],
    difficulty: 'easy',
    explanation: 'Seaborn의 기본 스타일 설정입니다.',
    section: 'type-1'
  },
  {
    id: '1-13',
    type: '개념',
    category: '라이브러리 임포트',
    question: 'Scikit-learn 버전 확인법은?',
    answer: 'sklearn.__version__으로 버전을 확인한다.',
    keywords: ['__version__', 'sklearn', '버전'],
    difficulty: 'easy',
    explanation: 'Scikit-learn 버전을 확인하는 기본 방법입니다.',
    section: 'type-1'
  },
  {
    id: '1-14',
    type: '코드',
    category: '라이브러리 임포트',
    question: '라이브러리 버전 확인 3줄?',
    answer: '주요 라이브러리들의 버전을 확인한다.',
    code: `import sklearn
print('sklearn:', sklearn.__version__)
print('numpy:', np.__version__)`,
    keywords: ['__version__', 'sklearn', 'numpy'],
    difficulty: 'easy',
    explanation: '라이브러리 버전 호환성을 확인하는 방법입니다.',
    section: 'type-1'
  },
  {
    id: '1-15',
    type: '개념',
    category: '라이브러리 임포트',
    question: '경고 메시지 억제법은?',
    answer: 'warnings.filterwarnings()로 경고를 억제한다.',
    keywords: ['warnings', 'filterwarnings', '억제'],
    difficulty: 'easy',
    explanation: '불필요한 경고 메시지를 억제하는 방법입니다.',
    section: 'type-1'
  },

  // 추가 데이터 불러오기 카드들
  {
    id: '2-11',
    type: '개념',
    category: '데이터 불러오기',
    question: 'SQL 데이터베이스 연결법은?',
    answer: 'sqlalchemy나 pandas로 데이터베이스에 연결한다.',
    keywords: ['sqlalchemy', '데이터베이스', '연결'],
    difficulty: 'medium',
    explanation: '데이터베이스에서 직접 데이터를 가져오는 방법입니다.',
    section: 'type-2'
  },
  {
    id: '2-12',
    type: '코드',
    category: '데이터 불러오기',
    question: 'SQL 데이터 읽기 3줄?',
    answer: 'SQL 쿼리로 데이터베이스에서 데이터를 읽는다.',
    code: `from sqlalchemy import create_engine
engine = create_engine('sqlite:///database.db')
df = pd.read_sql('SELECT * FROM table', engine)`,
    keywords: ['create_engine', 'read_sql'],
    difficulty: 'medium',
    explanation: 'SQL 데이터베이스에서 데이터를 읽는 방법입니다.',
    section: 'type-2'
  },
  {
    id: '2-13',
    type: '개념',
    category: '데이터 불러오기',
    question: 'API 데이터 가져오기법은?',
    answer: 'requests 라이브러리로 API에서 데이터를 가져온다.',
    keywords: ['requests', 'API', '가져오기'],
    difficulty: 'medium',
    explanation: '웹 API에서 실시간 데이터를 가져오는 방법입니다.',
    section: 'type-2'
  },
  {
    id: '2-14',
    type: '코드',
    category: '데이터 불러오기',
    question: 'API 데이터 가져오기 4줄?',
    answer: 'API에서 JSON 데이터를 가져와 DataFrame으로 변환한다.',
    code: `import requests
response = requests.get('https://api.example.com/data')
data = response.json()
df = pd.DataFrame(data)`,
    keywords: ['requests', 'get', 'json', 'DataFrame'],
    difficulty: 'medium',
    explanation: 'API에서 데이터를 가져와 분석 가능한 형태로 변환하는 방법입니다.',
    section: 'type-2'
  },
  {
    id: '2-15',
    type: '개념',
    category: '데이터 불러오기',
    question: 'Parquet 파일 읽기법은?',
    answer: 'pd.read_parquet()으로 효율적인 컬럼형 데이터를 읽는다.',
    keywords: ['read_parquet', '컬럼형', '효율적'],
    difficulty: 'medium',
    explanation: '대용량 데이터에 효율적인 Parquet 형식 파일을 읽는 방법입니다.',
    section: 'type-2'
  },

  // 추가 데이터 시각화 카드들
  {
    id: '3-10',
    type: '개념',
    category: '데이터 시각화',
    question: '히트맵 그리기법은?',
    answer: 'sns.heatmap()으로 2차원 데이터를 색상으로 시각화한다.',
    keywords: ['heatmap', '2차원', '색상'],
    difficulty: 'medium',
    explanation: '2차원 데이터의 패턴을 색상으로 표현하는 시각화 방법입니다.',
    section: 'type-3'
  },
  {
    id: '3-11',
    type: '코드',
    category: '데이터 시각화',
    question: '히트맵 그리기 3줄?',
    answer: '상관계수 히트맵을 그린다.',
    code: `correlation_matrix = df.corr()
sns.heatmap(correlation_matrix, annot=True)
plt.show()`,
    keywords: ['corr', 'heatmap', 'annot'],
    difficulty: 'medium',
    explanation: '상관계수를 히트맵으로 시각화하는 방법입니다.',
    section: 'type-3'
  },
  {
    id: '3-12',
    type: '개념',
    category: '데이터 시각화',
    question: '박스플롯 그리기법은?',
    answer: 'sns.boxplot()으로 분포와 이상치를 시각화한다.',
    keywords: ['boxplot', '분포', '이상치'],
    difficulty: 'easy',
    explanation: '데이터의 분포와 이상치를 한눈에 파악할 수 있는 시각화입니다.',
    section: 'type-3'
  },
  {
    id: '3-13',
    type: '코드',
    category: '데이터 시각화',
    question: '박스플롯 그리기 2줄?',
    answer: '박스플롯을 그리고 표시한다.',
    code: `sns.boxplot(data=df, x='category', y='value')
plt.show()`,
    keywords: ['boxplot', 'show'],
    difficulty: 'easy',
    explanation: '범주별 분포를 비교하는 박스플롯입니다.',
    section: 'type-3'
  },
  {
    id: '3-14',
    type: '개념',
    category: '데이터 시각화',
    question: '바이올린 플롯 사용법은?',
    answer: 'sns.violinplot()으로 분포의 밀도를 시각화한다.',
    keywords: ['violinplot', '밀도', '분포'],
    difficulty: 'medium',
    explanation: '박스플롯보다 더 자세한 분포 정보를 제공하는 시각화입니다.',
    section: 'type-3'
  },

  // 추가 그룹화 및 집계 카드들
  {
    id: '4-7',
    type: '개념',
    category: '그룹화 및 집계',
    question: '윈도우 함수 사용법은?',
    answer: 'rolling(), expanding()으로 시계열 집계를 수행한다.',
    keywords: ['rolling', 'expanding', '시계열'],
    difficulty: 'hard',
    explanation: '시계열 데이터의 이동 평균이나 누적 집계를 계산하는 방법입니다.',
    section: 'type-4'
  },
  {
    id: '4-8',
    type: '코드',
    category: '그룹화 및 집계',
    question: '윈도우 함수 2줄?',
    answer: '이동 평균을 계산한다.',
    code: `df['rolling_mean'] = df['value'].rolling(window=7).mean()
df['expanding_sum'] = df['value'].expanding().sum()`,
    keywords: ['rolling', 'expanding', 'mean', 'sum'],
    difficulty: 'hard',
    explanation: '시계열 데이터의 이동 평균과 누적 합계를 계산합니다.',
    section: 'type-4'
  },
  {
    id: '4-9',
    type: '개념',
    category: '그룹화 및 집계',
    question: 'Transform 사용법은?',
    answer: 'groupby().transform()으로 그룹별 변환을 수행한다.',
    keywords: ['transform', '그룹별', '변환'],
    difficulty: 'hard',
    explanation: '그룹별 통계를 원본 데이터에 매핑하는 고급 기법입니다.',
    section: 'type-4'
  },
  {
    id: '4-10',
    type: '코드',
    category: '그룹화 및 집계',
    question: 'Transform 2줄?',
    answer: '그룹별 평균을 원본 데이터에 매핑한다.',
    code: `df['group_mean'] = df.groupby('category')['value'].transform('mean')
df['group_std'] = df.groupby('category')['value'].transform('std')`,
    keywords: ['groupby', 'transform', 'mean', 'std'],
    difficulty: 'hard',
    explanation: '그룹별 통계를 원본 데이터에 매핑하는 고급 기법입니다.',
    section: 'type-4'
  },

  // 추가 데이터 전처리 카드들
  {
    id: '5-7',
    type: '개념',
    category: '데이터 전처리',
    question: '정규표현식 사용법은?',
    answer: 'str.extract(), str.replace()로 패턴 매칭을 수행한다.',
    keywords: ['정규표현식', 'extract', 'replace'],
    difficulty: 'hard',
    explanation: '복잡한 문자열 패턴을 처리하는 고급 기법입니다.',
    section: 'type-5'
  },
  {
    id: '5-8',
    type: '코드',
    category: '데이터 전처리',
    question: '정규표현식 2줄?',
    answer: '정규표현식으로 문자열을 추출하고 변환한다.',
    code: `df['phone'] = df['text'].str.extract(r'(\d{3}-\d{4}-\d{4})')
df['clean_text'] = df['text'].str.replace(r'[^a-zA-Z\s]', '')`,
    keywords: ['extract', 'replace', '정규표현식'],
    difficulty: 'hard',
    explanation: '정규표현식을 활용한 고급 문자열 처리입니다.',
    section: 'type-5'
  },
  {
    id: '5-9',
    type: '개념',
    category: '데이터 전처리',
    question: '피처 엔지니어링법은?',
    answer: '도메인 지식을 활용해 새로운 피처를 생성한다.',
    keywords: ['피처엔지니어링', '도메인지식', '새로운피처'],
    difficulty: 'hard',
    explanation: '머신러닝 성능 향상을 위한 핵심 기법입니다.',
    section: 'type-5'
  },
  {
    id: '5-10',
    type: '코드',
    category: '데이터 전처리',
    question: '피처 엔지니어링 3줄?',
    answer: '도메인 지식을 활용해 새로운 피처를 생성한다.',
    code: `df['price_per_sqft'] = df['price'] / df['sqft']
df['age_group'] = pd.cut(df['age'], bins=[0, 30, 50, 100], labels=['young', 'middle', 'old'])
df['interaction'] = df['feature1'] * df['feature2']`,
    keywords: ['price_per_sqft', 'age_group', 'interaction'],
    difficulty: 'hard',
    explanation: '도메인 지식을 활용한 고급 피처 엔지니어링입니다.',
    section: 'type-5'
  },

  // 추가 결측치 처리 카드들
  {
    id: '6-8',
    type: '개념',
    category: '결측치 처리',
    question: 'IterativeImputer 사용법은?',
    answer: '다른 변수들을 이용해 결측치를 반복적으로 예측한다.',
    keywords: ['IterativeImputer', '반복적', '예측'],
    difficulty: 'hard',
    explanation: '고급 결측치 대치 방법으로 다른 변수들의 정보를 활용합니다.',
    section: 'type-6'
  },
  {
    id: '6-9',
    type: '코드',
    category: '결측치 처리',
    question: 'IterativeImputer 3줄?',
    answer: '반복적 대치를 수행한다.',
    code: `from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer
imputer = IterativeImputer(); df_imputed = imputer.fit_transform(df)`,
    keywords: ['IterativeImputer', 'enable_iterative_imputer'],
    difficulty: 'hard',
    explanation: '고급 결측치 대치 방법으로 다른 변수들의 정보를 활용합니다.',
    section: 'type-6'
  },
  {
    id: '6-10',
    type: '개념',
    category: '결측치 처리',
    question: '결측치 패턴 분석법은?',
    answer: 'MCAR, MAR, MNAR 패턴을 구분하여 처리한다.',
    keywords: ['MCAR', 'MAR', 'MNAR', '패턴'],
    difficulty: 'hard',
    explanation: '결측치의 발생 패턴을 이해하여 적절한 대치 방법을 선택하는 기법입니다.',
    section: 'type-6'
  },

  // 추가 범주형 인코딩 카드들
  {
    id: '7-8',
    type: '개념',
    category: '범주형 인코딩',
    question: 'CatBoost 인코딩법은?',
    answer: 'CatBoost는 범주형 변수를 자동으로 처리한다.',
    keywords: ['CatBoost', '자동처리', '범주형'],
    difficulty: 'hard',
    explanation: 'CatBoost는 범주형 변수를 자동으로 인코딩하는 고급 모델입니다.',
    section: 'type-7'
  },
  {
    id: '7-9',
    type: '코드',
    category: '범주형 인코딩',
    question: 'CatBoost 3줄?',
    answer: 'CatBoost 모델을 학습한다.',
    code: `from catboost import CatBoostClassifier
cat = CatBoostClassifier(cat_features=['category'], verbose=False)
cat.fit(X_train, y_train)`,
    keywords: ['CatBoostClassifier', 'cat_features', 'verbose'],
    difficulty: 'hard',
    explanation: '범주형 변수를 자동으로 처리하는 CatBoost 모델입니다.',
    section: 'type-7'
  },
  {
    id: '7-10',
    type: '개념',
    category: '범주형 인코딩',
    question: 'Frequency Encoding 사용법은?',
    answer: '범주의 빈도로 인코딩하여 희귀 범주를 처리한다.',
    keywords: ['Frequency', '빈도', '희귀범주'],
    difficulty: 'medium',
    explanation: '희귀 범주를 효과적으로 처리하는 인코딩 방법입니다.',
    section: 'type-7'
  },

  // 추가 데이터셋 분리 카드들
  {
    id: '8-8',
    type: '개념',
    category: '데이터셋 분리',
    question: 'StratifiedShuffleSplit 사용법은?',
    answer: '클래스 비율을 유지하면서 무작위 분할을 수행한다.',
    keywords: ['StratifiedShuffleSplit', '클래스비율', '무작위'],
    difficulty: 'hard',
    explanation: '클래스 불균형 데이터에서 중요한 분할 방법입니다.',
    section: 'type-8'
  },
  {
    id: '8-9',
    type: '코드',
    category: '데이터셋 분리',
    question: 'StratifiedShuffleSplit 3줄?',
    answer: '클래스 비율을 유지하며 데이터를 분할한다.',
    code: `from sklearn.model_selection import StratifiedShuffleSplit
sss = StratifiedShuffleSplit(n_splits=1, test_size=0.2, random_state=42)
train_idx, test_idx = next(sss.split(X, y))`,
    keywords: ['StratifiedShuffleSplit', 'n_splits', 'test_size'],
    difficulty: 'hard',
    explanation: '클래스 불균형 데이터에 적합한 분할 방법입니다.',
    section: 'type-8'
  },
  {
    id: '8-10',
    type: '개념',
    category: '데이터셋 분리',
    question: 'TimeSeriesSplit 사용법은?',
    answer: '시계열 데이터의 시간 순서를 유지하며 분할한다.',
    keywords: ['TimeSeriesSplit', '시계열', '시간순서'],
    difficulty: 'hard',
    explanation: '시계열 데이터에 특화된 분할 방법입니다.',
    section: 'type-8'
  },

  // 추가 스케일링 카드들
  {
    id: '9-8',
    type: '개념',
    category: '스케일링',
    question: 'QuantileTransformer 사용법은?',
    answer: '데이터를 균등 분포로 변환한다.',
    keywords: ['QuantileTransformer', '균등분포', '변환'],
    difficulty: 'hard',
    explanation: '데이터를 균등 분포로 변환하는 고급 스케일링 방법입니다.',
    section: 'type-9'
  },
  {
    id: '9-9',
    type: '코드',
    category: '스케일링',
    question: 'QuantileTransformer 3줄?',
    answer: '데이터를 균등 분포로 변환한다.',
    code: `from sklearn.preprocessing import QuantileTransformer
qt = QuantileTransformer(output_distribution='uniform')
X_transformed = qt.fit_transform(X)`,
    keywords: ['QuantileTransformer', 'output_distribution', 'uniform'],
    difficulty: 'hard',
    explanation: '데이터를 균등 분포로 변환하는 고급 스케일링입니다.',
    section: 'type-9'
  },
  {
    id: '9-10',
    type: '개념',
    category: '스케일링',
    question: '스케일링 선택 기준은?',
    answer: '데이터 분포와 이상치 유무에 따라 선택한다.',
    keywords: ['분포', '이상치', '선택기준'],
    difficulty: 'medium',
    explanation: '데이터의 특성에 맞는 스케일링 방법을 선택하는 기준입니다.',
    section: 'type-9'
  },

  // 추가 기본 모델링 카드들
  {
    id: '10-8',
    type: '개념',
    category: '기본 모델링',
    question: 'Naive Bayes 특징은?',
    answer: '빠른 속도, 작은 데이터셋에 적합, 확률적 해석',
    keywords: ['Naive Bayes', '빠른속도', '확률적'],
    difficulty: 'easy',
    explanation: '빠르고 해석 가능한 확률적 분류 모델입니다.',
    section: 'type-10'
  },
  {
    id: '10-9',
    type: '코드',
    category: '기본 모델링',
    question: 'Naive Bayes 3줄?',
    answer: 'Naive Bayes 모델을 학습한다.',
    code: `from sklearn.naive_bayes import GaussianNB
nb = GaussianNB()
nb.fit(X_train, y_train)`,
    keywords: ['GaussianNB', 'fit'],
    difficulty: 'easy',
    explanation: '빠르고 해석 가능한 Naive Bayes 모델입니다.',
    section: 'type-10'
  },
  {
    id: '10-10',
    type: '개념',
    category: '기본 모델링',
    question: 'KNN 특징은?',
    answer: '비모수적, 지역적 학습, 해석 어려움',
    keywords: ['KNN', '비모수적', '지역적'],
    difficulty: 'medium',
    explanation: '비모수적 방법으로 지역적 패턴을 학습하는 모델입니다.',
    section: 'type-10'
  },

  // 추가 앙상블 모델링 카드들
  {
    id: '11-8',
    type: '개념',
    category: '앙상블 모델링',
    question: 'Stacking 사용법은?',
    answer: '여러 모델의 예측을 메타 모델로 학습한다.',
    keywords: ['Stacking', '메타모델', '학습'],
    difficulty: 'hard',
    explanation: '여러 모델의 예측을 결합하는 고급 앙상블 방법입니다.',
    section: 'type-11'
  },
  {
    id: '11-9',
    type: '코드',
    category: '앙상블 모델링',
    question: 'Stacking 5줄?',
    answer: '여러 모델을 스태킹으로 결합한다.',
    code: `from sklearn.ensemble import StackingClassifier
stacking = StackingClassifier([
    ('rf', RandomForestClassifier()),
    ('xgb', XGBClassifier())
], final_estimator=LogisticRegression())
stacking.fit(X_train, y_train)`,
    keywords: ['StackingClassifier', 'final_estimator', 'LogisticRegression'],
    difficulty: 'hard',
    explanation: '여러 모델을 메타 모델로 결합하는 고급 앙상블입니다.',
    section: 'type-11'
  },
  {
    id: '11-10',
    type: '개념',
    category: '앙상블 모델링',
    question: 'Bagging vs Boosting 차이점은?',
    answer: 'Bagging은 병렬, Boosting은 순차적으로 학습한다.',
    keywords: ['Bagging', 'Boosting', '병렬', '순차'],
    difficulty: 'hard',
    explanation: '두 가지 주요 앙상블 방법의 핵심 차이점입니다.',
    section: 'type-11'
  },

  // 추가 모델 성능 평가 카드들
  {
    id: '12-8',
    type: '개념',
    category: '모델 성능 평가',
    question: 'F1-Score 사용법은?',
    answer: '정밀도와 재현율의 조화평균으로 불균형 데이터를 평가한다.',
    keywords: ['F1-Score', '조화평균', '불균형'],
    difficulty: 'medium',
    explanation: '불균형 데이터에서 중요한 성능 지표입니다.',
    section: 'type-12'
  },
  {
    id: '12-9',
    type: '코드',
    category: '모델 성능 평가',
    question: 'F1-Score 계산 2줄?',
    answer: 'F1-Score를 계산한다.',
    code: `from sklearn.metrics import f1_score
f1 = f1_score(y_test, y_pred, average='weighted')`,
    keywords: ['f1_score', 'average', 'weighted'],
    difficulty: 'medium',
    explanation: '불균형 데이터에서 중요한 성능 지표입니다.',
    section: 'type-12'
  },
  {
    id: '12-10',
    type: '개념',
    category: '모델 성능 평가',
    question: 'Confusion Matrix 해석법은?',
    answer: 'TP, TN, FP, FN으로 모델의 성능을 상세히 분석한다.',
    keywords: ['Confusion Matrix', 'TP', 'TN', 'FP', 'FN'],
    difficulty: 'medium',
    explanation: '분류 모델의 성능을 상세히 분석하는 중요한 도구입니다.',
    section: 'type-12'
  },

  // 추가 딥러닝 모델 구성 카드들
  {
    id: '13-8',
    type: '개념',
    category: '딥러닝 모델 구성',
    question: 'L1/L2 정규화 사용법은?',
    answer: 'kernel_regularizer로 가중치 정규화를 적용한다.',
    keywords: ['L1', 'L2', 'kernel_regularizer', '정규화'],
    difficulty: 'hard',
    explanation: '딥러닝에서 과적합을 방지하는 중요한 정규화 기법입니다.',
    section: 'type-13'
  },
  {
    id: '13-9',
    type: '코드',
    category: '딥러닝 모델 구성',
    question: 'L2 정규화 2줄?',
    answer: 'Dense 레이어에 L2 정규화를 적용한다.',
    code: `from tensorflow.keras.regularizers import l2
model.add(Dense(64, activation='relu', kernel_regularizer=l2(0.01)))`,
    keywords: ['l2', 'kernel_regularizer', 'Dense'],
    difficulty: 'hard',
    explanation: '과적합 방지를 위한 L2 정규화 적용입니다.',
    section: 'type-13'
  },
  {
    id: '13-10',
    type: '개념',
    category: '딥러닝 모델 구성',
    question: 'Learning Rate Scheduling 사용법은?',
    answer: '학습률을 동적으로 조정하여 학습을 개선한다.',
    keywords: ['Learning Rate', 'Scheduling', '동적조정'],
    difficulty: 'hard',
    explanation: '학습률을 동적으로 조정하여 학습 성능을 향상시키는 기법입니다.',
    section: 'type-13'
  },

  // 추가 딥러닝 평가 카드들
  {
    id: '14-8',
    type: '개념',
    category: '딥러닝 평가',
    question: 'Learning Rate Finder 사용법은?',
    answer: '최적의 학습률을 찾기 위해 학습률을 점진적으로 증가시킨다.',
    keywords: ['Learning Rate Finder', '최적학습률', '점진적증가'],
    difficulty: 'hard',
    explanation: '최적의 학습률을 찾는 고급 기법입니다.',
    section: 'type-14'
  },
  {
    id: '14-9',
    type: '코드',
    category: '딥러닝 평가',
    question: 'Learning Rate Finder 4줄?',
    answer: '학습률을 점진적으로 증가시키며 손실을 모니터링한다.',
    code: `from tensorflow.keras.callbacks import LearningRateScheduler
def lr_schedule(epoch):
    return 0.01 * (0.1 ** (epoch // 10))
lrs = LearningRateScheduler(lr_schedule)`,
    keywords: ['LearningRateScheduler', 'lr_schedule', 'epoch'],
    difficulty: 'hard',
    explanation: '학습률을 동적으로 조정하는 고급 기법입니다.',
    section: 'type-14'
  },
  {
    id: '14-10',
    type: '개념',
    category: '딥러닝 평가',
    question: 'Gradient Clipping 사용법은?',
    answer: '기울기 폭발을 방지하기 위해 기울기를 제한한다.',
    keywords: ['Gradient Clipping', '기울기폭발', '제한'],
    difficulty: 'hard',
    explanation: 'RNN 등에서 기울기 폭발을 방지하는 중요한 기법입니다.',
    section: 'type-14'
  }
];

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
