import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { COUNTRY_COEFFICIENTS } from '../data/survey';

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  className?: string;
}

/**
 * 国家选择组件
 * 支持选择不同国家，影响收入购买力系数
 */
export const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onCountryChange,
  className = ''
}) => {
  const { t } = useTranslation();

  /**
   * 获取国家列表
   * @returns 国家选项数组
   */
  const getCountryOptions = () => {
    return Object.keys(COUNTRY_COEFFICIENTS).map(countryCode => ({
      code: countryCode,
      name: t(`countries.${countryCode}`),
      coefficient: COUNTRY_COEFFICIENTS[countryCode as keyof typeof COUNTRY_COEFFICIENTS]
    }));
  };

  const countries = getCountryOptions();

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t('survey.country')}
      </label>
      
      <div className="relative">
        <select
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none cursor-pointer transition-all duration-200 hover:border-gray-400"
        >
          <option value="" disabled>
            {t('survey.countryPlaceholder')}
          </option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name} (×{country.coefficient})
            </option>
          ))}
        </select>
        
        {/* 自定义下拉箭头 */}
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      
      {/* 购买力系数说明 */}
      {selectedCountry && (
        <div className="mt-2 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-600">
            <span className="font-medium">
              {t(`countries.${selectedCountry}`)}
            </span>
            {' '}{t('countrySelector.purchasingPowerCoefficient')}: ×
            {COUNTRY_COEFFICIENTS[selectedCountry as keyof typeof COUNTRY_COEFFICIENTS]}
          </p>
          <p className="text-xs text-blue-500 mt-1">
            {t('countrySelector.coefficientDescription')}
          </p>
        </div>
      )}
    </div>
  );
};