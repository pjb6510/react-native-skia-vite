import { Flex } from '@radix-ui/themes';
import { FC } from 'react';
import { match } from 'ts-pattern';
import { ScreenType } from '../types/ScreenType';
import { AnimationTestCanvas } from './Main/AnimationTestCanvas';
import { InteractionTestCanvas } from './Main/InteractionTestCanvas';
import { PerformanceTestCanvas } from './Main/PerformanceTestCanvas';
import { RenderingTestCanvas } from './Main/RenderingTestCanvas';

type MainScreenProps = {
  screenType: ScreenType;
};

export const MainScreen: FC<MainScreenProps> = ({ screenType }) => {
  return (
    <Flex
      direction="row"
      flexGrow="1"
    >
      {match(screenType)
        .with(ScreenType.RenderingTest, () => <RenderingTestCanvas />)
        .with(ScreenType.AnimationTest, () => <AnimationTestCanvas />)
        .with(ScreenType.PerformanceTest, () => <PerformanceTestCanvas />)
        .with(ScreenType.InteractionTest, () => <InteractionTestCanvas />)
        .exhaustive()}
    </Flex>
  );
};
