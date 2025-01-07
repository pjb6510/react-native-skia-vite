import { Button, Card, Flex } from '@radix-ui/themes';
import { animate } from 'motion';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, RoundedRect } from 'react-native-skia-with-vite';
import { v4 as uuid } from 'uuid';
import { degreeToRadian } from '../../utils/degreeToRadian';
import { generateRandomColor } from '../../utils/generateRandomColor';

const width = 800;
const height = 600;

type Rect = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  r: number;
  rotation: number;
  color: string;
};

export const PerformanceTestCanvas: FC = () => {
  const [rotation, setRotation] = useState(0);
  const [rects, setRects] = useState<Rect[]>([]);

  const rafIdRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null
  );

  const handleMouseDown = () => {
    const generateRect = () => ({
      id: uuid(),
      x: Math.random() * width,
      y: Math.random() * height,
      width: Math.random() * 200,
      height: Math.random() * 200,
      r: 10,
      rotation: Math.random() * 360,
      color: generateRandomColor(),
    });

    const step = () => {
      setRects((prev) => [...prev, generateRect()]);
      rafIdRef.current = requestAnimationFrame(step);
    };

    rafIdRef.current = requestAnimationFrame(step);
  };

  const handleMouseUp = useCallback(() => {
    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current);
    }
  }, []);

  useEffect(() => {
    animate(0, 360, {
      onUpdate: setRotation,
      repeat: Infinity,
      duration: 1,
      ease: 'linear',
    });

    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      handleMouseUp();
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  return (
    <Flex
      direction="column"
      justify="center"
      gap="2"
    >
      <Card>
        <Canvas style={{ width, height }}>
          <RoundedRect
            width={100}
            height={100}
            r={10}
            color="#adbce6"
          />

          {rects.map((rect) => (
            <RoundedRect
              key={rect.id}
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              r={rect.r}
              origin={{
                x: rect.x + rect.width / 2,
                y: rect.y + rect.height / 2,
              }}
              transform={[{ rotate: degreeToRadian(rect.rotation + rotation) }]}
              color={rect.color}
            />
          ))}
        </Canvas>
      </Card>

      <Flex
        justify="center"
        gap="2"
      >
        {rects.length} rects
        <Button
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          Click!
        </Button>
      </Flex>
    </Flex>
  );
};
