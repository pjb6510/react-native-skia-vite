import { Canvas, Rect } from 'react-native-skia-with-vite';

function App() {
  return (
    <Canvas style={{ width: 400, height: 400 }}>
      <Rect
        x={10}
        y={10}
        width={100}
        height={100}
        color={0xff0000ff}
      />
    </Canvas>
  );
}

export { App };
