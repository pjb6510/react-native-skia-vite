import { Card } from '@radix-ui/themes';
import { FullGestureState } from '@use-gesture/react';
import { FC, useState } from 'react';
import { Canvas, RoundedRect, Shadow } from 'react-native-skia-with-vite';
import { GestureDetector } from '../../common/GestureDetector';

const width = 800;
const height = 600;

export const InteractionTestCanvas: FC = () => {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);

  const center = {
    x: width / 2,
    y: height / 2,
  };

  const handleMove = (e: FullGestureState<'move'>) => {
    const { xy } = e;
    const x = xy[0];
    const y = xy[1];

    setRotationY(x - center.x);
    setRotationX(-(y - center.y));
  };

  return (
    <Card>
      <GestureDetector onMove={handleMove}>
        <Canvas style={{ width, height }}>
          <RoundedRect
            x={width / 2 - 50}
            y={height / 2 - 50}
            width={100}
            height={100}
            r={10}
            color={'#0073ff'}
            origin={{
              x: center.x,
              y: center.y,
            }}
            transform={[
              { perspective: 300 },
              { rotateX: rotationX / 400 },
              { rotateY: rotationY / 400 },
            ]}
          >
            <Shadow
              dx={0}
              dy={0}
              blur={12}
              color={'black'}
            />
          </RoundedRect>
        </Canvas>
      </GestureDetector>
    </Card>
  );
};
