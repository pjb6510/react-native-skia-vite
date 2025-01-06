import { TabNav } from '@radix-ui/themes';
import { FC } from 'react';
import { ScreenType } from '../types/ScreenType';

type NavigatorProps = {
  currentScreen: ScreenType;
  onScreenSelect: (screen: ScreenType) => void;
};

export const Navigator: FC<NavigatorProps> = ({
  currentScreen,
  onScreenSelect,
}) => {
  return (
    <TabNav.Root
      color="indigo"
      size="2"
    >
      <TabNav.Link
        active={currentScreen === 'RenderingTest'}
        onClick={() => onScreenSelect('RenderingTest')}
      >
        RenderingTest
      </TabNav.Link>
      <TabNav.Link
        active={currentScreen === 'AnimationTest'}
        onClick={() => onScreenSelect('AnimationTest')}
      >
        AnimationTest
      </TabNav.Link>
    </TabNav.Root>
  );
};
