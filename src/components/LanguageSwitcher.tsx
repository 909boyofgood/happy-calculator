import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

/**
 * 语言切换组件
 * 支持中英文切换，默认英文
 */
export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  /**
   * 切换语言函数
   * @param language 目标语言代码
   */
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2">
      <Globe className="w-4 h-4 text-white" />
      <div className="flex gap-1">
        <button
          onClick={() => changeLanguage('en')}
          className={`px-2 py-1 rounded-full text-sm font-medium transition-all ${
            i18n.language === 'en'
              ? 'bg-white text-orange-500'
              : 'text-white hover:bg-white/20'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => changeLanguage('zh')}
          className={`px-2 py-1 rounded-full text-sm font-medium transition-all ${
            i18n.language === 'zh'
              ? 'bg-white text-orange-500'
              : 'text-white hover:bg-white/20'
          }`}
        >
          中文
        </button>
      </div>
    </div>
  );
};