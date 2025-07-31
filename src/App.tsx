import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Survey } from './pages/Survey';
import { Result } from './pages/Result';
import { Poster } from './pages/Poster';
import './i18n';

/**
 * 主应用组件
 * 配置路由和全局设置
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 首页 */}
          <Route path="/" element={<Home />} />
          
          {/* 问卷页面 */}
          <Route path="/survey" element={<Survey />} />
          
          {/* 结果页面 */}
          <Route path="/result" element={<Result />} />
          
          {/* 海报页面 */}
          <Route path="/poster" element={<Poster />} />
          
          {/* 默认重定向到首页 */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
