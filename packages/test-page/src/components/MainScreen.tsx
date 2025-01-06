import { Flex } from '@radix-ui/themes';
import { FC } from 'react';
import { match } from 'ts-pattern';
import { ScreenType } from '../types/ScreenType';
import { AnimationTestCanvas } from './Main/AnimationTestCanvas';
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
        .with('RenderingTest', () => <RenderingTestCanvas />)
        .with('AnimationTest', () => <AnimationTestCanvas />)
        .exhaustive()}
    </Flex>
  );
};
