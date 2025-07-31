import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { Question, QuestionType } from '../data/survey';

interface QuestionCardProps {
  question: Question;
  answer: string | string[] | undefined;
  onAnswerChange: (answer: string | string[]) => void;
  className?: string;
}

/**
 * 问卷问题卡片组件
 * 支持单选和多选题型
 */
export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  onAnswerChange,
  className = ''
}) => {
  const { t } = useTranslation();

  /**
   * 处理单选题答案变化
   * @param value 选择的值
   */
  const handleSingleChoice = (value: string) => {
    onAnswerChange(value);
  };

  /**
   * 处理多选题答案变化
   * @param value 选择的值
   */
  const handleMultipleChoice = (value: string) => {
    const currentAnswers = Array.isArray(answer) ? answer : [];
    const newAnswers = currentAnswers.includes(value)
      ? currentAnswers.filter(item => item !== value)
      : [...currentAnswers, value];
    onAnswerChange(newAnswers);
  };

  /**
   * 检查选项是否被选中
   * @param value 选项值
   * @returns 是否选中
   */
  const isSelected = (value: string): boolean => {
    if (question.type === QuestionType.MULTIPLE_CHOICE) {
      return Array.isArray(answer) && answer.includes(value);
    }
    return answer === value;
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      {/* 问题标题 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {t(question.titleKey)}
        </h3>
        {question.descriptionKey && (
          <p className="text-sm text-gray-600">
            {t(question.descriptionKey)}
          </p>
        )}
        
        {/* 题型标识 */}
        <div className="mt-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            question.type === QuestionType.MULTIPLE_CHOICE
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {question.type === QuestionType.MULTIPLE_CHOICE 
              ? t('survey.multipleChoice') 
              : t('survey.singleChoice')
            }
          </span>
        </div>
      </div>

      {/* 选项列表 */}
      <div className="space-y-3">
        {question.options.map((option) => {
          const selected = isSelected(option.value);
          
          return (
            <button
              key={option.value}
              onClick={() => {
                if (question.type === QuestionType.MULTIPLE_CHOICE) {
                  handleMultipleChoice(option.value);
                } else {
                  handleSingleChoice(option.value);
                }
              }}
              className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left group hover:shadow-md active:scale-98 ${
                selected
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className={`font-medium text-sm sm:text-base leading-tight ${
                    selected ? 'text-orange-700' : 'text-gray-800'
                  }`}>
                    {t(option.labelKey)}
                  </div>
                  {option.score !== undefined && (
                    <div className={`text-xs sm:text-sm mt-1 ${
                      selected ? 'text-orange-600' : 'text-gray-500'
                    }`}>
                      {t('survey.score')}: {option.score}
                    </div>
                  )}
                </div>
                
                {/* 选择指示器 */}
                <div className={`flex-shrink-0 mt-0.5 ${
                  question.type === QuestionType.MULTIPLE_CHOICE ? 'w-5 h-5' : 'w-4 h-4'
                }`}>
                  {question.type === QuestionType.MULTIPLE_CHOICE ? (
                    // 多选框
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all shadow-sm ${
                      selected
                        ? 'bg-orange-500 border-orange-500 shadow-orange-200'
                        : 'border-gray-300 group-hover:border-gray-400 bg-white'
                    }`}>
                      {selected && <Check className="w-3 h-3 text-white" />}
                    </div>
                  ) : (
                    // 单选框
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all shadow-sm ${
                      selected
                        ? 'border-orange-500 shadow-orange-200'
                        : 'border-gray-300 group-hover:border-gray-400'
                    }`}>
                      {selected && (
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 多选题提示 */}
      {question.type === QuestionType.MULTIPLE_CHOICE && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-600">
            {t('survey.multipleChoiceHint')}
          </p>
        </div>
      )}
    </div>
  );
};