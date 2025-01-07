import { Button, Card, Flex } from '@radix-ui/themes';
import { animate } from 'motion';
import { FC, useState } from 'react';
import { Canvas, RoundedRect } from 'react-native-skia-with-vite';

const degreeToRadian = (degree: number) => degree * (Math.PI / 180);

const initialArgs = {
  x: -100,
  width: 0,
  rotation: 0,
  color: '#ff0000',
};

const targetArgs = {
  x: 800,
  width: 800,
  rotation: 360,
  color: '#0000ff',
};

export const AnimationTestCanvas: FC = () => {
  const [x, setX] = useState(initialArgs.x);
  const [width, setWidth] = useState(initialArgs.width);
  const [rotation, setRotation] = useState(initialArgs.rotation);
  const [color, setColor] = useState(initialArgs.color);

  const handlePlay = () => {
    animate(initialArgs.x, targetArgs.x, {
      onUpdate: setX,
      repeatDelay: 1,
      ease: 'easeInOut',
      duration: 1,
    });
    animate(initialArgs.width, targetArgs.width, {
      onUpdate: setWidth,
      repeatDelay: 1,
      ease: 'easeInOut',
      duration: 1,
    });
    animate(initialArgs.rotation, targetArgs.rotation, {
      onUpdate: setRotation,
      repeatDelay: 1,
      ease: 'easeInOut',
      duration: 1,
    });
    animate(initialArgs.color, targetArgs.color, {
      onUpdate: setColor,
      repeatDelay: 1,
      ease: 'easeInOut',
      duration: 1,
    });

    setTimeout(() => {
      animate(targetArgs.x, initialArgs.x, {
        onUpdate: setX,
        repeatDelay: 1,
        ease: 'easeInOut',
        duration: 1,
      });
      animate(targetArgs.width, initialArgs.width, {
        onUpdate: setWidth,
        repeatDelay: 1,
        ease: 'easeInOut',
        duration: 1,
      });
      animate(targetArgs.rotation, initialArgs.rotation, {
        onUpdate: setRotation,
        repeatDelay: 1,
        ease: 'easeInOut',
        duration: 1,
      });
      animate(targetArgs.color, initialArgs.color, {
        onUpdate: setColor,
        repeatDelay: 1,
        ease: 'easeInOut',
        duration: 1,
      });
    }, 1000);
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
