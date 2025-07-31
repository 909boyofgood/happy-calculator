import { create } from 'zustand';
import { calculateHappinessScore } from '../data/survey';

/**
 * 应用状态接口定义
 */
interface AppState {
  // 问卷相关状态
  currentQuestion: number;
  answers: Record<string, string | string[]>;
  selectedCountry: string;
  
  // 结果相关状态
  results: {
    totalScore: number;
    dimensionScores: Record<string, number>;
    level: string;
  } | null;
  
  // UI状态
  isLoading: boolean;
  
  // Actions
  setCurrentQuestion: (question: number) => void;
  setAnswer: (questionId: string, answer: string | string[]) => void;
  setSelectedCountry: (country: string) => void;
  calculateResults: () => void;
  resetSurvey: () => void;
  setLoading: (loading: boolean) => void;
}

/**
 * 全局状态管理Store
 * 使用Zustand管理应用状态
 */
export const useStore = create<AppState>((set, get) => ({
  // 初始状态
  currentQuestion: 0,
  answers: {},
  selectedCountry: 'US', // 默认选择美国
  results: null,
  isLoading: false,
  
  // 设置当前问题索引
  setCurrentQuestion: (question: number) => {
    set({ currentQuestion: question });
  },
  
  // 设置问题答案
  setAnswer: (questionId: string, answer: string | string[]) => {
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: answer
      }
    }));
  },
  
  // 设置选择的国家
  setSelectedCountry: (country: string) => {
    set({ selectedCountry: country });
  },
  
  // 计算幸福感得分
  calculateResults: () => {
    const { answers, selectedCountry } = get();
    const results = calculateHappinessScore(answers, selectedCountry);
    set({ results });
  },
  
  // 重置问卷
  resetSurvey: () => {
    set({
      currentQuestion: 0,
      answers: {},
      selectedCountry: 'US',
      results: null,
      isLoading: false
    });
  },
  
  // 设置加载状态
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  }
}));

/**
 * 获取问卷进度百分比
 * @returns 进度百分比 (0-100)
 */
export const useProgress = () => {
  const currentQuestion = useStore(state => state.currentQuestion);
  const totalQuestions = 14; // 总问题数
  return Math.round((currentQuestion / totalQuestions) * 100);
};

/**
 * 检查是否所有问题都已回答
 * @returns 是否完成所有问题
 */
export const useIsComplete = () => {
  const answers = useStore(state => state.answers);
  const totalQuestions = 14;
  return Object.keys(answers).length === totalQuestions;
};