import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LoadSkiaWeb, SkiaApiProvider } from 'react-native-skia-with-vite';
import { App } from './App.tsx';
import './index.css';

const main = async () => {
  const CanvasKit = await LoadSkiaWeb();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Theme>
        <SkiaApiProvider CanvasKit={CanvasKit}>
          <App />
        </SkiaApiProvider>
      </Theme>
    </StrictMode>
  );
};

main();
