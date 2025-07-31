import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ProgressBar } from '../components/ProgressBar';
import { CountrySelector } from '../components/CountrySelector';
import { QuestionCard } from '../components/QuestionCard';
import { SURVEY_QUESTIONS, QuestionType } from '../data/survey';

/**
 * 问卷调查页面组件
 * 管理问卷流程和答案收集
 */
export const Survey: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const {
    currentQuestion,
    answers,
    selectedCountry,
    setCurrentQuestion,
    setAnswer,
    setSelectedCountry,
    calculateResults
  } = useStore();

  const [showCountrySelector, setShowCountrySelector] = useState(true);
  const totalQuestions = SURVEY_QUESTIONS.length;

  /**
   * 检查当前问题是否已回答
   */
  const isCurrentQuestionAnswered = (): boolean => {
    if (showCountrySelector) {
      return selectedCountry !== '';
    }
    
    const question = SURVEY_QUESTIONS[currentQuestion];
    if (!question) return false;
    
    const answer = answers[question.id];
    if (question.type === 'multiple') {
      return Array.isArray(answer) && answer.length > 0;
    }
    return answer !== undefined && answer !== '';
  };

  /**
   * 获取当前显示的问题索引（包含国家选择）
   */
  const getCurrentDisplayIndex = (): number => {
    return showCountrySelector ? 0 : currentQuestion + 1;
  };

  /**
   * 获取总步骤数（包含国家选择）
   */
  const getTotalSteps = (): number => {
    return totalQuestions + 1; // +1 for country selection
  };

  /**
   * 处理下一步
   */
  const handleNext = () => {
    if (showCountrySelector) {
      if (selectedCountry) {
        setShowCountrySelector(false);
        setCurrentQuestion(0);
      }
    } else {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // 完成问卷，计算结果
        calculateResults();
        navigate('/result');
      }
    }
  };

  /**
   * 处理上一步
   */
  const handlePrevious = () => {
    if (showCountrySelector) {
      navigate('/');
    } else if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setShowCountrySelector(true);
    }
  };

  /**
   * 处理答案变化
   */
  const handleAnswerChange = (answer: string | string[]) => {
    const question = SURVEY_QUESTIONS[currentQuestion];
    if (question) {
      setAnswer(question.id, answer);
      
      // 单选题自动跳转到下一题
      if (question.type === QuestionType.SINGLE_CHOICE && typeof answer === 'string') {
        setTimeout(() => {
          handleNext();
        }, 300); // 延迟300ms让用户看到选择效果
      }
    }
  };

  /**
   * 获取当前问题
   */
  const getCurrentQuestion = () => {
    return SURVEY_QUESTIONS[currentQuestion];
  };

  /**
   * 获取当前答案
   */
  const getCurrentAnswer = () => {
    const question = getCurrentQuestion();
    return question ? answers[question.id] : undefined;
  };

  // 键盘导航支持
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isCurrentQuestionAnswered()) {
        handleNext();
      } else if (e.key === 'Escape') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showCountrySelector, currentQuestion, selectedCountry, answers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* 头部 */}
      <header className="relative z-10 p-4 flex justify-between items-center">
        <button
          onClick={handlePrevious}
          className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
        <LanguageSwitcher />
      </header>

      {/* 主要内容 */}
      <main className="px-4 pb-8">
        {/* 进度条 */}
        <div className="max-w-2xl mx-auto mb-8">
          <ProgressBar 
            current={getCurrentDisplayIndex()} 
            total={getTotalSteps()}
            className="mb-4"
          />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              {showCountrySelector 
                ? t('survey.country')
                : t('survey.progress', { 
                    current: currentQuestion + 1, 
                    total: totalQuestions 
                  })
              }
            </h2>
            <p className="text-white/80">
              {showCountrySelector 
                ? t('survey.countryPlaceholder')
                : t('survey.title')
              }
            </p>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="max-w-2xl mx-auto">
          {showCountrySelector ? (
            /* 国家选择 */
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <CountrySelector
                selectedCountry={selectedCountry}
                onCountryChange={setSelectedCountry}
              />
            </div>
          ) : (
            /* 问题卡片 */
            getCurrentQuestion() && (
              <QuestionCard
                question={getCurrentQuestion()}
                answer={getCurrentAnswer()}
                onAnswerChange={handleAnswerChange}
              />
            )
          )}
        </div>

        {/* 导航按钮 */}
        <div className="max-w-2xl mx-auto mt-8 flex justify-between items-center">
          <button
            onClick={handlePrevious}
            className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('common.previous')}
          </button>

          <div className="flex items-center gap-2 text-white/80 text-sm">
            <span>
              {getCurrentDisplayIndex()} / {getTotalSteps()}
            </span>
          </div>

          <button
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered()}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              isCurrentQuestionAnswered()
                ? 'bg-white text-purple-600 hover:bg-white/90 hover:shadow-lg transform hover:scale-105'
                : 'bg-white/20 text-white/50 cursor-not-allowed'
            }`}
          >
            {showCountrySelector || currentQuestion < totalQuestions - 1 ? (
              <>
                {t('common.next')}
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                {t('survey.complete')}
                <Check className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* 键盘提示 */}
        <div className="max-w-2xl mx-auto mt-6 text-center">
          <p className="text-white/60 text-xs">
            {t('survey.keyboardHint')}
          </p>
        </div>
      </main>

      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full" />
      </div>
    </div>
  );
};