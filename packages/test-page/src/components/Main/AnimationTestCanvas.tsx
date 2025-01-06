import { Button, Card, Flex } from '@radix-ui/themes';
import { animate } from 'motion';
import { FC, useState } from 'react';
import { Canvas, RoundedRect } from 'react-native-skia-with-vite';

const degreeToRadian = (degree: number) => degree * (Math.PI / 180);

export const AnimationTestCanvas: FC = () => {
  const [x, setX] = useState(-100);
  const [width, setWidth] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [color, setColor] = useState('#ff0000');

  const handlePlay = () => {
    animate(-100, 800, {
      onUpdate: setX,
      repeat: Infinity,
      ease: 'easeInOut',
      duration: 1,
    });

    animate(0, 800, {
      onUpdate: setWidth,
      repeat: Infinity,
      ease: 'easeInOut',
      duration: 1,
    });

    animate(0, 360, {
      onUpdate: setRotation,
      repeat: Infinity,
      ease: 'easeInOut',
      duration: 1,
    });

    animate('#ff0000', '#0000ff', {
      onUpdate: setColor,
      repeat: Infinity,
      ease: 'easeInOut',
      duration: 1,
    });
  };

  return (
    <Flex
      direction="column"
      align="center"
      gap="1"
    >
      <Card>
        <Canvas style={{ width: 800, height: 600 }}>
          <RoundedRect
            x={x}
            y={0}
            r={10}
            width={100}
            height={100}
            color={0xff0000ff}
          />

          <RoundedRect
            x={700 - x}
            y={100}
            r={10}
            width={100}
            height={100}
            color={0xffff0000}
          />

          <RoundedRect
            x={400 - width / 2}
            y={200}
            r={10}
            width={width}
            height={100}
            color={0xff00ff00}
          />

          <RoundedRect
            x={width / 2}
            y={300}
            r={10}
            width={800 - width}
            height={100}
            color={0xff00ffff}
          />

          <RoundedRect
            x={400}
            y={400}
            r={10}
            width={100}
            height={100}
            color={0xffff00ff}
            origin={{ x: 300, y: 400 }}
            transform={[
              { perspective: 3000 },
              { rotateY: degreeToRadian(rotation) },
            ]}
          />

          <RoundedRect
            x={400}
            y={500}
            r={10}
            width={100}
            height={100}
            color={0xffffff00}
            origin={{ x: 400, y: 500 }}
            transform={[
              { perspective: 3000 },
              { rotateX: degreeToRadian(rotation) },
            ]}
          />

          <RoundedRect
            x={0}
            y={500}
            r={10}
            width={100}
            height={100}
            color={color}
          />
        </Canvas>
      </Card>

      <Button onClick={handlePlay}>Play</Button>
    </Flex>
  );
};
