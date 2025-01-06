import { FC, useState } from 'react';
import { MainScreen } from './components/MainScreen';
import { Navigator } from './components/Navigator';
import { ScreenType } from './types/ScreenType';

export const App: FC = () => {
  const [currentScreen, setCurrentScreen] =
    useState<ScreenType>('RenderingTest');

  return (
    <div className="flex flex-col gap-4">
      <Navigator
        currentScreen={currentScreen}
        onScreenSelect={setCurrentScreen}
      />
      <MainScreen screenType={currentScreen} />
    </div>
  );
};
