import { Card } from '@radix-ui/themes';
import { FullGestureState } from '@use-gesture/react';
import { FC, useRef, useState } from 'react';
import { Canvas, RoundedRect, Shadow } from 'react-native-skia-with-vite';
import { GestureDetector } from '../../common/GestureDetector';
import { canvasSize } from '../canvasSize';

export const OnMoveTestCanvas: FC = () => {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);

  const gestureDetectorElemRef = useRef<HTMLDivElement>(null);

  const center = {
    x: canvasSize.width / 2,
    y: canvasSize.height / 2,
  };

  const handleMove = (e: FullGestureState<'move'>) => {
    if (gestureDetectorElemRef.current == null) {
      return;
    }

    const { xy } = e;
    const [x, y] = xy;
    const { left, top } =
      gestureDetectorElemRef.current.getBoundingClientRect();
    const relativeX = x - left;
    const relativeY = y - top;

    setRotationY(relativeX - center.x);
    setRotationX(-(relativeY - center.y));
  };

  return (
    <Card>
      <GestureDetector
        ref={gestureDetectorElemRef}
        onMove={handleMove}
      >
        <Canvas style={{ width: canvasSize.width, height: canvasSize.height }}>
          <RoundedRect
            x={canvasSize.width / 2 - 50}
            y={canvasSize.height / 2 - 50}
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
