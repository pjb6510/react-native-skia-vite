import { Flex } from '@radix-ui/themes';
import { FC, useState } from 'react';
import { match } from 'ts-pattern';
import { Sidebar } from '../../common/Sidebar';
import { InteractionTestType } from './InteractionTestType';
import { OnMoveTestCanvas } from './OnMoveTestCanvas';

export const InteractionTestSection: FC = () => {
  const [testType, setTestType] = useState(InteractionTestType.OnMove);

  return (
    <Flex gap="3">
      <Sidebar.Root>
        {Object.values(InteractionTestType).map((testType) => (
          <Sidebar.Link
            key={testType}
            onClick={() => setTestType(testType)}
          >
            {testType}
          </Sidebar.Link>
        ))}
      </Sidebar.Root>

      {match(testType)
        .with(InteractionTestType.OnMove, () => <OnMoveTestCanvas />)
        .otherwise(() => {
          console.error('Invalid test type:', testType);
          return null;
        })}
    </Flex>
  );
};
