import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  TrendingUp, 
  Users, 
  Home as HomeIcon, 
  Smile, 
  Activity,
  Share2,
  RotateCcw,
  Download
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { DIMENSION_WEIGHTS } from '../data/survey';

/**
 * 结果页面组件
 * 展示幸福感评估结果和各维度分析
 */
export const Result: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const { results, resetSurvey } = useStore();

  /**
   * 如果没有结果数据，重定向到首页
   */
  useEffect(() => {
    if (!results) {
      navigate('/');
    }
  }, [results, navigate]);

  /**
   * 重新开始测试
   */
  const handleRestart = () => {
    resetSurvey();
    navigate('/');
  };

  /**
   * 生成海报
   */
  const handleGeneratePoster = () => {
    navigate('/poster');
  };

  /**
   * 分享结果
   */
  const handleShare = async () => {
    if (navigator.share && results) {
      try {
        await navigator.share({
          title: t('header.title'),
          text: `My happiness score is ${Math.round(results.totalScore)}/100!`,
          url: window.location.origin
        });
      } catch (error) {
        console.log('Share failed:', error);
        // 降级到复制链接
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  /**
   * 复制链接到剪贴板
   */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.origin)
      .then(() => {
        // 可以添加提示
        alert('Link copied to clipboard!');
      })
      .catch(() => {
        // 降级处理
        console.log('Copy failed');
      });
  };

  /**
   * 获取幸福感等级颜色
   */
  const getLevelColor = (level: string): string => {
    switch (level) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'average': return 'text-yellow-600 bg-yellow-100';
      case 'below_average': return 'text-orange-600 bg-orange-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  /**
   * 获取维度图标
   */
  const getDimensionIcon = (dimension: string) => {
    switch (dimension) {
      case 'economic': return TrendingUp;
      case 'social': return Users;
      case 'health': return Activity;
      case 'assets': return HomeIcon;
      case 'family': return Heart;
      case 'lifestyle': return Smile;
      default: return Heart;
    }
  };

  /**
   * 获取维度名称键
   */
  const getDimensionNameKey = (dimension: string): string => {
    return `result.dimensions.${dimension}.name`;
  };

  /**
   * 获取维度描述键
   */
  const getDimensionDescKey = (dimension: string): string => {
    return `result.dimensions.${dimension}.description`;
  };

  if (!results) {
    return null;
  }

  const { totalScore, dimensionScores, level } = results;
  const levelColor = getLevelColor(level);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      {/* 头部 */}
      <header className="relative z-10 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">
            {t('results.title')}
          </h1>
        </div>
        <LanguageSwitcher />
      </header>

      {/* 主要内容 */}
      <main className="px-4 pb-8">
        {/* 总分展示 */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {t('results.title')}
              </h2>
            </div>
            
            {/* 分数圆环 */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                {/* 背景圆环 */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                  fill="none"
                />
                {/* 进度圆环 */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="white"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(totalScore / 100) * 314} 314`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {Math.round(totalScore)}
                </span>
              </div>
            </div>
            
            {/* 等级标签 */}
            <div className={`inline-flex items-center px-4 py-2 rounded-full font-semibold ${levelColor}`}>
              {t(`results.levels.${level}`)}
            </div>
            
            <p className="text-white/90 mt-4 text-lg">
              {t(`results.levelDescriptions.${level}`)}
            </p>
          </div>
        </div>

        {/* 维度分析 */}
        <div className="max-w-4xl mx-auto mb-8">
          <h3 className="text-2xl font-bold text-white text-center mb-6">
            {t('results.analysis')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(dimensionScores).map(([dimension, score]) => {
              const IconComponent = getDimensionIcon(dimension);
              const weight = DIMENSION_WEIGHTS[dimension as keyof typeof DIMENSION_WEIGHTS] || 0;
              const percentage = (score / 5) * 100;
              
              return (
                <div
                  key={dimension}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">
                        {t(`results.dimensions.${dimension}`)}
                      </h4>
                      <p className="text-white/70 text-sm">
                        Weight: {(weight * 100).toFixed(0)}%
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">
                        {score.toFixed(1)}
                      </div>
                      <div className="text-white/70 text-sm">
                        / 5.0
                      </div>
                    </div>
                  </div>
                  
                  {/* 进度条 */}
                  <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                    <div 
                      className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  
                  <p className="text-white/80 text-sm">
                    Dimension analysis for {dimension}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleGeneratePoster}
              className="flex items-center justify-center gap-2 bg-white text-purple-600 px-6 py-4 rounded-2xl font-semibold hover:bg-white/90 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Download className="w-5 h-5" />
              {t('results.generatePoster')}
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-200"
            >
              <Share2 className="w-5 h-5" />
              Share Results
            </button>
            
            <button
              onClick={handleRestart}
              className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-200"
            >
              <RotateCcw className="w-5 h-5" />
              {t('results.retakeTest')}
            </button>
          </div>
        </div>

        {/* 建议和提示 */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-white mb-3">
              {t('result.suggestions.title')}
            </h4>
            <div className="space-y-2 text-white/90 text-sm">
              <p>{t(`result.suggestions.${level}.tip1`)}</p>
              <p>{t(`result.suggestions.${level}.tip2`)}</p>
              <p>{t(`result.suggestions.${level}.tip3`)}</p>
            </div>
          </div>
        </div>
      </main>

      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full" />
      </div>
    </div>
  );
};