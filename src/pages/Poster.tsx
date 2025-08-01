import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { 
  Heart, 
  Download, 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  Activity,
  Home as HomeIcon,
  Smile,
  Star,
  Calendar
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { DIMENSION_WEIGHTS } from '../data/survey';

/**
 * 海报页面组件
 * 生成精美的结果海报并支持下载
 */
export const Poster: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const posterRef = useRef<HTMLDivElement>(null);
  
  const { results } = useStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentDate] = useState(new Date());

  /**
   * 如果没有结果数据，重定向到首页
   */
  useEffect(() => {
    if (!results) {
      navigate('/');
    }
  }, [results, navigate]);

  /**
   * 下载海报
   */
  const downloadPoster = async () => {
    if (!posterRef.current || !results) return;
    
    setIsGenerating(true);
    
    try {
      // 配置html2canvas选项
      const canvas = await html2canvas(posterRef.current, {
        scale: 2, // 提高清晰度
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        width: 800,
        height: 1200,
        scrollX: 0,
        scrollY: 0
      });
      
      // 创建下载链接
      const link = document.createElement('a');
      link.download = `happiness-report-${Math.round(results.totalScore)}-${currentDate.getFullYear()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      
      // 触发下载
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Failed to generate poster:', error);
      alert('Failed to download poster. Please try again.');
    } finally {
      setIsGenerating(false);
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
      default: return Star;
    }
  };

  /**
   * 获取等级颜色
   */
  const getLevelColor = (level: string): string => {
    switch (level) {
      case 'excellent': return 'from-green-400 to-green-600';
      case 'good': return 'from-blue-400 to-blue-600';
      case 'average': return 'from-yellow-400 to-yellow-600';
      case 'below_average': return 'from-orange-400 to-orange-600';
      case 'poor': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  /**
   * 格式化日期
   */
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!results) {
    return null;
  }

  const { totalScore, dimensionScores, level } = results;
  const levelGradient = getLevelColor(level);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 头部控制栏 */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <button
          onClick={() => navigate('/result')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
        
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={downloadPoster}
            disabled={isGenerating}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
              isGenerating
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transform hover:scale-105'
            }`}
          >
            <Download className="w-5 h-5" />
            {isGenerating ? 'Generating...' : t('poster.downloadPoster')}
          </button>
        </div>
      </header>

      {/* 海报预览 */}
      <main className="p-8 flex justify-center">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* 海报内容 */}
          <div 
            ref={posterRef}
            className="w-[800px] h-[1200px] bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 relative overflow-hidden"
          >
            {/* 背景装饰 */}
            <div className="absolute inset-0">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full" />
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full" />
            </div>

            {/* 内容区域 */}
            <div className="relative z-10 p-12 h-full flex flex-col">
              {/* 头部 */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {t('poster.title')}
                </h1>
                <p className="text-white/90 text-lg">
                  {t('poster.subtitle')}
                </p>
              </div>

              {/* 主要得分 */}
              <div className="text-center mb-8">
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="white"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${(totalScore / 100) * 440} 440`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {Math.round(totalScore)}
                    </span>
                    <span className="text-white/80 text-sm">
                      / 100
                    </span>
                  </div>
                </div>
                
                <div className={`inline-flex items-center px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r ${levelGradient} shadow-lg`}>
                  {t(`results.levels.${level}`)}
                </div>
              </div>

              {/* 维度分析 */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white text-center mb-6">
                  {t('poster.dimensions')}
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(dimensionScores).map(([dimension, score]) => {
                    const IconComponent = getDimensionIcon(dimension);
                    const weight = DIMENSION_WEIGHTS[dimension as keyof typeof DIMENSION_WEIGHTS] || 0;
                    const percentage = (score / (100 * weight)) * 100;
                    
                    return (
                      <div
                        key={dimension}
                        className="bg-white/15 backdrop-blur-sm rounded-xl p-4"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white text-sm">
                              {t(`results.dimensions.${dimension}`)}
                            </h4>
                            <p className="text-white/70 text-xs">
                              {(weight * 100).toFixed(0)}% weight
                            </p>
                          </div>
                          <div className="text-white font-bold">
                            {score.toFixed(1)}
                          </div>
                        </div>
                        
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div 
                            className="h-full bg-white rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 底部信息 */}
              <div className="mt-8 text-center">
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 mb-4">
                  <p className="text-white/90 text-sm leading-relaxed">
                    {t(`results.levelDescriptions.${level}`)}
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(currentDate)}</span>
                </div>
                
                <div className="mt-2 text-white/60 text-xs">
                  {t('poster.footer')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 下载提示 */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-white animate-bounce" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Generating Poster...
            </h3>
            <p className="text-gray-600 text-sm">
              Please wait while we create your happiness report poster.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};