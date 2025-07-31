/**
 * 问卷调查数据配置
 * 包含所有问题、选项、评分规则和国家购买力系数
 */

// 国家购买力系数配置
export const COUNTRY_COEFFICIENTS = {
  US: 1.0,   // 美国基准
  CH: 0.6,   // 瑞士
  JP: 0.8,   // 日本
  DE: 0.85,  // 德国
  CN: 1.3,   // 中国
  IN: 2.0,   // 印度
  TH: 1.8    // 泰国
} as const;

// 问题类型定义
export enum QuestionType {
  SINGLE_CHOICE = 'single',
  MULTIPLE_CHOICE = 'multiple'
}

// 选项接口
export interface Option {
  value: string;
  labelKey: string;
  score: number;
}

// 问题接口
export interface Question {
  id: string;
  titleKey: string;
  descriptionKey?: string;
  type: QuestionType;
  dimension: string;
  weight?: number;
  maxScore?: number; // 多选题最大得分
  options: Option[];
}

// 维度权重配置
export const DIMENSION_WEIGHTS = {
  economic: 0.35,    // 经济实力 35%
  social: 0.20,      // 社会地位 20%
  health: 0.15,      // 健康状况 15%
  assets: 0.15,      // 资产状况 15%
  family: 0.05,      // 家庭状况 5%
  lifestyle: 0.10    // 个人习惯与心理满足度 10%
} as const;

// 问卷配置
export const SURVEY_QUESTIONS: Question[] = [
  // 经济实力维度 (35%权重)
  {
    id: 'income',
    titleKey: 'survey.questions.income.title',
    descriptionKey: 'survey.questions.income.description',
    type: QuestionType.SINGLE_CHOICE,
    dimension: 'economic',
    weight: 0.35 / 3, // 经济实力维度有3个问题
    options: [
      { value: '0-30k', labelKey: 'survey.questions.income.options.0-30k', score: 1 },
      { value: '30k-60k', labelKey: 'survey.questions.income.options.30k-60k', score: 2 },
      { value: '60k-100k', labelKey: 'survey.questions.income.options.60k-100k', score: 3 },
      { value: '100k-200k', labelKey: 'survey.questions.income.options.100k-200k', score: 4 },
      { value: '200k+', labelKey: 'survey.questions.income.options.200k+', score: 5 }
    ]
  },
  {
    id: 'savings',
    titleKey: 'survey.questions.savings.title',
    type: QuestionType.SINGLE_CHOICE,
    dimension: 'economic',
    weight: 0.35 / 3,
    options: [
      { value: '0-10k', labelKey: 'survey.questions.savings.options.0-10k', score: 1 },
      { value: '10k-50k', labelKey: 'survey.questions.savings.options.10k-50k', score: 2 },
      { value: '50k-100k', labelKey: 'survey.questions.savings.options.50k-100k', score: 3 },
      { value: '100k-500k', labelKey: 'survey.questions.savings.options.100k-500k', score: 4 },
      { value: '500k+', labelKey: 'survey.questions.savings.options.500k+', score: 5 }
    ]
  },
  {
    id: 'investments',
    titleKey: 'survey.questions.investments.title',
    type: QuestionType.SINGLE_CHOICE,
    dimension: 'economic',
    weight: 0.35 / 3,
    options: [
      { value: '0', labelKey: 'survey.questions.investments.options.0', score: 1 },
      { value: '1-50k', labelKey: 'survey.questions.investments.options.1-50k', score: 2 },
      { value: '50k-200k', labelKey: 'survey.questions.investments.options.50k-200k', score: 3 },
      { value: '200k-1m', labelKey: 'survey.questions.investments.options.200k-1m', score: 4 },
      { value: '1m+', labelKey: 'survey.questions.investments.options.1m+', score: 5 }
    ]
  },
  
  // 社会地位维度 (20%权重)
  {
    id: 'position',
    titleKey: 'survey.questions.position.title',
    type: QuestionType.SINGLE_CHOICE,
    dimension: 'social',
    weight: 0.20 / 2, // 社会地位维度有2个问题
    options: [
      { value: 'unemployed', labelKey: 'survey.questions.position.options.unemployed', score: 1 },
      { value: 'employee', labelKey: 'survey.questions.position.options.employee', score: 2 },
      { value: 'supervisor', labelKey: 'survey.questions.position.options.supervisor', score: 3 },
      { value: 'executive', labelKey: 'survey.questions.position.options.executive', score: 4 },
      { value: 'owner', labelKey: 'survey.questions.position.options.owner', score: 5 }
    ]
  },
  {
    id: 'education',
    titleKey: 'survey.questions.education.title',
    type: QuestionType.SINGLE_CHOICE,
    dimension: 'social',
    weight: 0.20 / 2,
    options: [
      { value: 'highschool', labelKey: 'survey.questions.education.options.highschool', score: 1 },
      { value: 'college', labelKey: 'survey.questions.education.options.college', score: 2 },
      { value: 'bachelor', labelKey: 'survey.questions.education.options.bachelor', score: 3 },
      { value: 'master', labelKey: 'survey.questions.education.options.master', score: 4 },
      { value: 'phd', labelKey: 'survey.questions.education.options.phd', score: 5 }
    ]
  },
  
  // 健康状况维度 (15%权重)
  {
    id: 'diseases',
    titleKey: 'survey.questions.diseases.title',
    type: QuestionType.SINGLE_CHOICE,
    dimension: 'health',
    weight: 0.15 / 2, // 健康状况维度有2个问题
    options: [
      { value: '5+', labelKey: 'survey.questions.diseases.options.5+', score: 1 },
      { value: '3-4', labelKey: 'survey.questions.diseases.options.3-4', score: 2 },
      { value: '1-2', labelKey: 'survey.questions.diseases.options.1-2', score: 3 },
      { value: '0-risk', labelKey: 'survey.questions.diseases.options.0-risk', score: 4 },
      { value: '0-healthy', labelKey: 'survey.questions.diseases.options.0-healthy', score: 5 }
    ]
  },
  {
    id: 'bmi',
    titleKey: 'survey.questions.bmi.title',
    type: QuestionType.SINGLE_CHOICE,
    dimension: 'health',
    weight: 0.15 / 2,
    options: [
      { value: 'unhealthy', labelKey: 'survey.questions.bmi.options.unhealthy', score: 1 },
      { value: 'poor', labelKey: 'survey.questions.bmi.options.poor', score: 2 },
      { value: 'fair', labelKey: 'survey.questions.bmi.options.fair', score: 3 },
      { value: 'good', labelKey: 'survey.questions.bmi.options.good', score: 4 },
      { value: 'excellent', labelKey: 'survey.questions.bmi.options.excellent', score: 5 }
    ]
  },
  
  // 资产状况维度 (15%权重)
  {
    id: 'properties',
    titleKey: 'survey.questions.properties.title',
    type: QuestionType.SINGLE_CHOICE,
    dimension: 'assets',
    weight: 0.15 / 2, // 资产状况维度有2个问题
    options: [
      { value: '0', labelKey: 'survey.questions.properties.options.0', score: 1 },
      { value: '1', labelKey: 'survey.questions.properties.options.1', score: 2 },
      { value: '2', labelKey: 'survey.questions.properties.options.2', score: 3 },
      { value: '3-5', labelKey: 'survey.questions.properties.options.3-5', score: 4 },
      { value: '5+', labelKey: 'survey.questions.properties.options.5+', score: 5 }
    ]
  },
  {
    id: 'vehicles',
    titleKey: 'survey.questions.vehicles.title',
    type: QuestionType.SINGLE_CHOICE,
    dimension: 'assets',
    weight: 0.15 / 2,
    options: [
      { value: '0', labelKey: 'survey.questions.vehicles.options.0', score: 1 },
      { value: '1-20k', labelKey: 'survey.questions.vehicles.options.1-20k', score: 2 },
      { value: '20k-50k', labelKey: 'survey.questions.vehicles.options.20k-50k', score: 3 },
      { value: '50k-100k', labelKey: 'survey.questions.vehicles.options.50k-100k', score: 4 },
      { value: '100k+', labelKey: 'survey.questions.vehicles.options.100k+', score: 5 }
    ]
  },
  
  // 家庭状况维度 (5%权重)
  {
    id: 'marriage',
    titleKey: 'survey.questions.marriage.title',
    type: QuestionType.SINGLE_CHOICE,
    dimension: 'family',
    weight: 0.05, // 家庭状况维度有1个问题
    options: [
      { value: 'divorced', labelKey: 'survey.questions.marriage.options.divorced', score: 1 },
      { value: 'single', labelKey: 'survey.questions.marriage.options.single', score: 2 },
      { value: 'dating', labelKey: 'survey.questions.marriage.options.dating', score: 3 },
      { value: 'married-no-kids', labelKey: 'survey.questions.marriage.options.married-no-kids', score: 4 },
      { value: 'married-with-kids', labelKey: 'survey.questions.marriage.options.married-with-kids', score: 5 }
    ]
  },
  
  // 个人习惯与心理满足度维度 (10%权重)
  {
    id: 'travel',
    titleKey: 'survey.questions.travel.title',
    type: QuestionType.SINGLE_CHOICE,
    dimension: 'lifestyle',
    weight: 0.10 / 4, // 生活习惯维度有4个问题
    options: [
      { value: '0', labelKey: 'survey.questions.travel.options.0', score: 1 },
      { value: '1-2', labelKey: 'survey.questions.travel.options.1-2', score: 3 },
      { value: '3-4', labelKey: 'survey.questions.travel.options.3-4', score: 4 },
      { value: '5-6', labelKey: 'survey.questions.travel.options.5-6', score: 5 },
      { value: '7+', labelKey: 'survey.questions.travel.options.7+', score: 5 }
    ]
  },
  {
    id: 'entertainment',
    titleKey: 'survey.questions.entertainment.title',
    type: QuestionType.MULTIPLE_CHOICE,
    dimension: 'lifestyle',
    weight: 0.10 / 4,
    maxScore: 3, // 多选题最高3分
    options: [
      { value: 'movies', labelKey: 'survey.questions.entertainment.options.movies', score: 0.5 },
      { value: 'sports', labelKey: 'survey.questions.entertainment.options.sports', score: 0.5 },
      { value: 'reading', labelKey: 'survey.questions.entertainment.options.reading', score: 0.5 },
      { value: 'gaming', labelKey: 'survey.questions.entertainment.options.gaming', score: 0.5 },
      { value: 'music', labelKey: 'survey.questions.entertainment.options.music', score: 0.5 },
      { value: 'socializing', labelKey: 'survey.questions.entertainment.options.socializing', score: 0.5 },
      { value: 'shopping', labelKey: 'survey.questions.entertainment.options.shopping', score: 0.5 },
      { value: 'cooking', labelKey: 'survey.questions.entertainment.options.cooking', score: 0.5 },
      { value: 'photography', labelKey: 'survey.questions.entertainment.options.photography', score: 0.5 },
      { value: 'others', labelKey: 'survey.questions.entertainment.options.others', score: 0.5 }
    ]
  },
  {
    id: 'children',
    titleKey: 'survey.questions.children.title',
    type: QuestionType.SINGLE_CHOICE,
    dimension: 'lifestyle',
    weight: 0.10 / 4,
    options: [
      { value: 'very-proud', labelKey: 'survey.questions.children.options.very-proud', score: 5 },
      { value: 'satisfied', labelKey: 'survey.questions.children.options.satisfied', score: 4 },
      { value: 'average', labelKey: 'survey.questions.children.options.average', score: 3 },
      { value: 'worried', labelKey: 'survey.questions.children.options.worried', score: 2 },
      { value: 'unsatisfied', labelKey: 'survey.questions.children.options.unsatisfied', score: 1 },
      { value: 'no-children', labelKey: 'survey.questions.children.options.no-children', score: 3 }
    ]
  },
  {
    id: 'hobbies',
    titleKey: 'survey.questions.hobbies.title',
    type: QuestionType.SINGLE_CHOICE,
    dimension: 'lifestyle',
    weight: 0.10 / 4,
    options: [
      { value: '0-2', labelKey: 'survey.questions.hobbies.options.0-2', score: 1 },
      { value: '3-5', labelKey: 'survey.questions.hobbies.options.3-5', score: 2 },
      { value: '6-10', labelKey: 'survey.questions.hobbies.options.6-10', score: 3 },
      { value: '11-15', labelKey: 'survey.questions.hobbies.options.11-15', score: 4 },
      { value: '16+', labelKey: 'survey.questions.hobbies.options.16+', score: 5 }
    ]
  }
];

/**
 * 获取幸福感等级
 * @param score 总分 (0-100)
 * @returns 等级标识
 */
export function getHappinessLevel(score: number): string {
  if (score >= 90) return 'winner';
  if (score >= 80) return 'successful';
  if (score >= 70) return 'middle';
  if (score >= 60) return 'ordinary';
  return 'struggling';
}

/**
 * 计算幸福感得分
 * @param answers 用户答案
 * @param country 所选国家
 * @returns 总分和各维度得分
 */
export function calculateHappinessScore(
  answers: Record<string, string | string[]>,
  country: string
) {
  const dimensionScores: Record<string, number> = {};
  const coefficient = COUNTRY_COEFFICIENTS[country as keyof typeof COUNTRY_COEFFICIENTS] || 1.0;
  
  // 计算各维度得分
  for (const question of SURVEY_QUESTIONS) {
    const answer = answers[question.id];
    if (!answer) continue;
    
    let questionScore = 0;
    
    if (question.type === QuestionType.SINGLE_CHOICE && typeof answer === 'string') {
      // 单选题
      const option = question.options.find(opt => opt.value === answer);
      if (option) {
        questionScore = option.score;
      }
    } else if (question.type === QuestionType.MULTIPLE_CHOICE && Array.isArray(answer)) {
      // 多选题
      let totalScore = 0;
      for (const selectedOption of answer) {
        const option = question.options.find(opt => opt.value === selectedOption);
        if (option) {
          totalScore += option.score;
        }
      }
      questionScore = Math.min(totalScore, question.maxScore || 5);
    }
    
    // 应用国家系数（仅对经济实力维度）
    if (question.dimension === 'economic') {
      questionScore *= coefficient;
    }
    
    // 累加到维度得分
    if (!dimensionScores[question.dimension]) {
      dimensionScores[question.dimension] = 0;
    }
    dimensionScores[question.dimension] += questionScore * question.weight;
  }
  
  // 计算总分 (0-100分)
  const totalScore = Object.values(dimensionScores).reduce((sum, score) => sum + score, 0) * 20;
  
  return {
    totalScore: Math.round(totalScore),
    dimensionScores: Object.fromEntries(
      Object.entries(dimensionScores).map(([key, value]) => [key, Math.round(value * 20)])
    ),
    level: getHappinessLevel(totalScore)
  };
}