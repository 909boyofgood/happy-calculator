import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Heart, TrendingUp, Users, Star } from 'lucide-react';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

/**
 * 首页组件
 * 展示应用介绍和开始按钮
 */
export const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  /**
   * 开始问卷调查
   */
  const startSurvey = () => {
    navigate('/survey');
  };

  /**
   * 获取特性列表
   */
  const getFeatures = () => [
    {
      icon: TrendingUp,
      titleKey: 'home.features.objective',
      descKey: 'home.features.objectiveDesc'
    },
    {
      icon: Users,
      titleKey: 'home.features.comprehensive', 
      descKey: 'home.features.comprehensiveDesc'
    },
    {
      icon: Star,
      titleKey: 'home.features.personalized',
      descKey: 'home.features.personalizedDesc'
    }
  ];

  const features = getFeatures();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
      {/* 头部 */}
      <header className="relative z-10 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">
            {t('header.title')}
          </h1>
        </div>
        <LanguageSwitcher />
      </header>

      {/* 主要内容 */}
      <main className="relative z-10 px-4 pb-8">
        {/* 英雄区域 */}
        <div className="text-center mb-12 mt-8">
          <div className="mb-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {t('home.title')}
          </h2>
          
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('home.subtitle')}
          </p>
          
          <button
            onClick={startSurvey}
            className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-2"
          >
            <Heart className="w-5 h-5" />
            {t('home.startTest')}
          </button>
        </div>

        {/* 特性网格 */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-8">{t('home.whyChoose')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-200 hover:transform hover:scale-105"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {t(feature.titleKey)}
                  </h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {t(feature.descKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 底部信息 */}
        <div className="text-center mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-white/90 text-sm leading-relaxed">
              {t('home.description')}
            </p>
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