import { Flex } from '@radix-ui/themes';
import { FC, useState } from 'react';
import { match } from 'ts-pattern';
import { Sidebar } from '../../common/Sidebar';
import { InteractionTestType } from './InteractionTestType';
import { OnDragTestCanvas } from './OnDragTestCanvas';
import { OnMoveTestCanvas } from './OnMoveTestCanvas';

export const InteractionTestSection: FC = () => {
  const [testType, setTestType] = useState(InteractionTestType.OnMove);

  return (
    <Flex gap="3">
      <Sidebar.Root>
        {Object.values(InteractionTestType).map((currentTestType) => (
          <Sidebar.Link
            key={currentTestType}
            onClick={() => setTestType(currentTestType)}
            active={testType === currentTestType}
          >
            {currentTestType}
          </Sidebar.Link>
        ))}
      </Sidebar.Root>

      {match(testType)
        .with(InteractionTestType.OnMove, () => <OnMoveTestCanvas />)
        .with(InteractionTestType.OnDrag, () => <OnDragTestCanvas />)
        .otherwise(() => {
          console.error('Invalid test type:', testType);
          return null;
        })}
    </Flex>
  );
};
