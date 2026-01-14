import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import App from './app/App.tsx';

async function enableMocking() {
  // 개발 환경 또는 데모 모드에서 MSW 활성화
  const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';
  
  if (process.env.NODE_ENV !== 'development' && !isDemoMode) {
    return;
  }

  const { worker, workerOptions } = await import('./mocks/browser');
  
  // 데모 모드일 때 콘솔에 안내 메시지 출력
  if (isDemoMode) {
    console.log(
      '%c🎭 데모 모드로 실행 중입니다',
      'color: #4CAF50; font-size: 16px; font-weight: bold;'
    );
    console.log(
      '%c로그인 정보: ID = test, PW = test123',
      'color: #2196F3; font-size: 14px;'
    );
  }
  
  return worker.start(workerOptions);
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </StrictMode>
  );
});

import * as msw from 'msw';
console.log(msw);
