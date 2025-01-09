import { useEffect, useRef } from 'react';
import Stats from 'stats.js';

export const StatsPanel = ({ ...props }: React.ComponentProps<'div'>) => {
  const statsElemRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (statsElemRef.current === null) {
      return;
    }

    const stats = new Stats();
    stats.showPanel(0);
    statsElemRef.current.appendChild(stats.dom);

    const loop = () => {
      stats.begin();
      stats.end();
      rafRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current!);
      }
    };
  }, []);

  return (
    <div
      id="stats"
      ref={statsElemRef}
      {...props}
    />
  );
};
