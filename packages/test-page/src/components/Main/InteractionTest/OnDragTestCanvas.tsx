import { Card } from '@radix-ui/themes';
import { FC } from 'react';
import { Canvas, RoundedRect, Shadow } from 'react-native-skia-with-vite';
import { GestureDetector } from '../../common/GestureDetector';
import { canvasSize } from '../canvasSize';

export const OnDragTestCanvas: FC = () => {
  return (
    <Card>
      <GestureDetector>
        <Canvas style={{ width: canvasSize.width, height: canvasSize.height }}>
          <RoundedRect
            x={canvasSize.width / 2 - 50}
            y={canvasSize.height / 2 - 50}
            width={100}
            height={100}
            r={10}
            color={'#0073ff'}
            origin={{
              x: canvasSize.width / 2,
              y: canvasSize.height / 2,
            }}
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
