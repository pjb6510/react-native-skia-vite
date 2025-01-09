import { useSkiaApi } from '../../../../../skia';
import { GestureDetector } from '../../common/GestureDetector';
import { canvasSize } from '../canvasSize';
import NanumGothic from '/font/NanumGothic.otf?url';
import { Card } from '@radix-ui/themes';
import { FC, PointerEventHandler, useRef, useState } from 'react';
import { Canvas, RoundedRect, Shadow, Text } from 'react-native-skia-with-vite';

export const OnDragTestCanvas: FC = () => {
  const { Hooks } = useSkiaApi();
  const { useFont } = Hooks;
  const font = useFont(NanumGothic);

  const gestureHandlerRef = useRef<HTMLDivElement>(null);
  const isMouseDownRef = useRef(false);

  const [position, setPosition] = useState({
    x: canvasSize.width / 2 - 50,
    y: canvasSize.height / 2 - 50,
  });

  const [boundingBox, setBoundingBox] = useState({
    x: canvasSize.width / 2 - 50,
    y: canvasSize.height / 2 - 50,
    width: 100,
    height: 100,
  });

  const handlePointerDown: PointerEventHandler = (e) => {
    if (gestureHandlerRef.current == null) {
      return;
    }
    const rect = gestureHandlerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (
      boundingBox.x <= x &&
      x <= boundingBox.x + boundingBox.width &&
      boundingBox.y <= y &&
      y <= boundingBox.y + boundingBox.height
    ) {
      isMouseDownRef.current = true;
    }
  };

  const handlePointerMove: PointerEventHandler = (e) => {
    if (isMouseDownRef.current) {
      setPosition({
        x: position.x + e.movementX,
        y: position.y + e.movementY,
      });

      setBoundingBox({
        x: position.x + e.movementX,
        y: position.y + e.movementY,
        width: 100,
        height: 100,
      });
    }
  };

  const handlePointerUp: PointerEventHandler = () => {
    isMouseDownRef.current = false;
  };

  const handlePointerLeave: PointerEventHandler = () => {
    isMouseDownRef.current = false;
  };

  return (
    <Card>
      <GestureDetector
        ref={gestureHandlerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      >
        <Canvas style={{ width: canvasSize.width, height: canvasSize.height }}>
          <RoundedRect
            x={position.x}
            y={position.y}
            width={100}
            height={100}
            r={10}
            color={'#0073ff'}
            origin={{
              x: canvasSize.width / 2,
              y: canvasSize.height / 2,
            }}
          >
            <Shadow dx={0} dy={0} blur={12} color={'black'} />
          </RoundedRect>
          <Text
            font={font}
            x={position.x + 20}
            y={position.y + 50}
            text={'Drag me!'}
            color={'white'}
          />
        </Canvas>
      </GestureDetector>
    </Card>
  );
};
