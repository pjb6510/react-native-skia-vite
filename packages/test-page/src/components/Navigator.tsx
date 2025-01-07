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
      {Object.values(ScreenType).map((screen) => (
        <TabNav.Link
          key={screen}
          active={screen === currentScreen}
          onClick={() => onScreenSelect(screen)}
        >
          {screen}
        </TabNav.Link>
      ))}
    </TabNav.Root>
  );
};
