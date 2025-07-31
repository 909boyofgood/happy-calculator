import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

/**
 * 进度条组件
 * 显示当前答题进度
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  current, 
  total, 
  className = '' 
}) => {
  /**
   * 计算进度百分比
   * @returns 进度百分比 (0-100)
   */
  const getProgress = (): number => {
    return Math.round((current / total) * 100);
  };

  const progress = getProgress();

  return (
    <div className={`w-full ${className}`}>
      {/* 进度信息 */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">
          {current} / {total}
        </span>
        <span className="text-sm font-medium text-orange-500">
          {progress}%
        </span>
      </div>
      
      {/* 进度条 */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          {/* 进度条光效 */}
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};