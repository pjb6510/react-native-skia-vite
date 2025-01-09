import { Flex } from '@radix-ui/themes';
import { FC } from 'react';
import { match } from 'ts-pattern';
import { ScreenType } from '../types/ScreenType';
import { InteractionTestSection } from './Main/InteractionTest/InteractionTestSection';
import { AnimationTestCanvas } from './Main/TestCanvases/AnimationTestCanvas';
import { PerformanceTestCanvas } from './Main/TestCanvases/PerformanceTestCanvas';
import { RenderingTestCanvas } from './Main/TestCanvases/RenderingTestCanvas';

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
        .with(ScreenType.InteractionTest, () => <InteractionTestSection />)
        .exhaustive()}
    </Flex>
  );
};
