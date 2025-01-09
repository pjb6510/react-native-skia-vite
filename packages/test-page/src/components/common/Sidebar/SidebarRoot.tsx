import { Card, Flex } from '@radix-ui/themes';
import { FC } from 'react';

export type SidebarRootProps = {
  children?: React.ReactNode | React.ReactNode[];
};

export const SidebarRoot: FC<SidebarRootProps> = ({ children }) => {
  return (
    <Card>
      <Flex
        direction="column"
        className="w-64 h-full"
      >
        {children}
      </Flex>
    </Card>
  );
};
