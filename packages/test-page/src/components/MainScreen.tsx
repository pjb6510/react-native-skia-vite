import { FC } from 'react';
import { ScreenType } from '../types/ScreenType';
import { match } from 'ts-pattern';
import { RenderingTestCanvas } from './Main/RenderingTestCanvas';

type MainScreenProps = {
  screenType: ScreenType;
};

export const MainScreen: FC<MainScreenProps> = ({ screenType }) => {
  return match(screenType)
    .with('RenderingTest', () => <RenderingTestCanvas />)
    .exhaustive();
};
