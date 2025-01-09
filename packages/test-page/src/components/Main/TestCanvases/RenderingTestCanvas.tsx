import { Card } from '@radix-ui/themes';
import { FC } from 'react';
import {
  Canvas,
  Circle,
  DiffRect,
  Group,
  Image,
  ImageSVG,
  Mask,
  Paint,
  Path,
  Points,
  RoundedRect,
  Shadow,
  SweepGradient,
} from 'react-native-skia-with-vite';
import { useSkiaApi } from '../../../../../skia';

const width = 800;
const height = 600;
const strokeWidth = 10;

export const RenderingTestCanvas: FC = () => {
  const { Utils, Hooks } = useSkiaApi();

  const { vec, rrect, rect } = Utils;
  const { useSVG, useImage } = Hooks;

  const image = useImage('./cat.jpg');
  const viteSvg = useSVG('./vite.svg');

  const points = [
    vec(128, 0),
    vec(168, 80),
    vec(256, 93),
    vec(192, 155),
    vec(207, 244),
    vec(128, 202),
    vec(49, 244),
    vec(64, 155),
    vec(0, 93),
    vec(88, 80),
    vec(128, 0),
  ].map((p) => vec(p.x + 100, p.y + 100));

  return (
    <Card>
      <Canvas style={{ width, height }}>
        <DiffRect
          outer={rrect(rect(0, 0, 150, 150), 25, 25)}
          inner={rrect(rect(50, 50, 150 - 100, 150 - 100), 50, 50)}
          color="indigo"
        />
        <Circle
          c={vec(128, 128)}
          r={50}
        >
          <Paint
            color="#adbce6"
            style="stroke"
            strokeWidth={strokeWidth}
          />
          <Paint
            color="#ade6d8"
            style="stroke"
            strokeWidth={strokeWidth / 2}
          />
          <SweepGradient
            origin={{
              x: 128,
              y: 128,
            }}
            transform={[
              {
                rotate: (Math.PI / 180) * -90,
              },
            ]}
            c={vec(128, 128)}
            colors={['cyan', 'magenta', 'yellow', 'cyan']}
          />
        </Circle>

        <Group
          transform={[
            {
              translate: [200, 100],
            },
          ]}
        >
          <Mask
            mask={
              <Group>
                <Path
                  transform={[{ scale: 0.8 }, { translate: [100, 0] }]}
                  path="M 128 0 L 168 80 L 256 93 L 192 155 L 207 244 L 128 202 L 49 244 L 64 155 L 0 93 L 88 80 L 128 0 Z"
                  color="lightblue"
                  strokeJoin="round"
                  strokeWidth={5}
                />
              </Group>
            }
          >
            <Image
              image={image}
              fit="fill"
              x={0}
              y={0}
              width={300}
              height={300}
            />
          </Mask>
        </Group>

        <RoundedRect
          color="lightgreen"
          rect={{
            rect: { x: 200, y: 10, width: 100, height: 100 },
            topLeft: { x: 10, y: 10 },
            topRight: { x: 10, y: 10 },
            bottomLeft: { x: 20, y: 20 },
            bottomRight: { x: 10, y: 10 },
          }}
        >
          <Shadow
            dx={12}
            dy={12}
            blur={12}
            color={'black'}
          />
          <Shadow
            dx={-12}
            dy={-12}
            blur={12}
            color={'black'}
            inner
          />
        </RoundedRect>

        <Points
          points={points}
          mode="polygon"
          color="lightblue"
          style="stroke"
          strokeWidth={10}
          strokeCap="round"
        >
          <SweepGradient
            c={vec(200, 200)}
            colors={['cyan', 'magenta', 'yellow', 'cyan']}
          />
        </Points>

        <ImageSVG
          transform={[{ translate: [400, 0] }]}
          svg={viteSvg}
        />

        <Image
          image={image}
          fit="contain"
          x={500}
          y={300}
          width={256}
          height={256}
        />
      </Canvas>
    </Card>
  );
};
