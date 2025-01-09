import {
  AnyHandlerEventTypes,
  EventTypes,
  GestureKey,
  Handler,
  useGesture,
} from '@use-gesture/react';
import { FC, forwardRef, useEffect } from 'react';

type check<
  T extends AnyHandlerEventTypes,
  Key extends GestureKey
> = undefined extends T[Key] ? EventTypes[Key] : T[Key];

type GestureDetectorProps<T extends AnyHandlerEventTypes = EventTypes> = {
  onDrag?: Handler<'drag', check<T, 'drag'>>;
  onDragStart?: Handler<'drag', check<T, 'drag'>>;
  onDragEnd?: Handler<'drag', check<T, 'drag'>>;
  onPinch?: Handler<'pinch', check<T, 'pinch'>>;
  onPinchStart?: Handler<'pinch', check<T, 'pinch'>>;
  onPinchEnd?: Handler<'pinch', check<T, 'pinch'>>;
  onWheel?: Handler<'wheel', check<T, 'wheel'>>;
  onWheelStart?: Handler<'wheel', check<T, 'wheel'>>;
  onWheelEnd?: Handler<'wheel', check<T, 'wheel'>>;
  onMove?: Handler<'move', check<T, 'move'>>;
  onMoveStart?: Handler<'move', check<T, 'move'>>;
  onMoveEnd?: Handler<'move', check<T, 'move'>>;
  onScroll?: Handler<'scroll', check<T, 'scroll'>>;
  onScrollStart?: Handler<'scroll', check<T, 'scroll'>>;
  onScrollEnd?: Handler<'scroll', check<T, 'scroll'>>;
  onHover?: Handler<'hover', check<T, 'hover'>>;

  children: React.ReactNode;
} & React.ComponentProps<'div'>;

const noop = () => {};

export const GestureDetector: FC<GestureDetectorProps> = forwardRef(
  (
    {
      onDrag = noop,
      onDragStart = noop,
      onDragEnd = noop,
      onPinch = noop,
      onPinchStart = noop,
      onPinchEnd = noop,
      onScroll = noop,
      onScrollStart = noop,
      onScrollEnd = noop,
      onWheel = noop,
      onWheelStart = noop,
      onWheelEnd = noop,
      onHover = noop,
      onMove = noop,
      onMoveStart = noop,
      onMoveEnd = noop,

      children,

      ...props
    },
    ref
  ) => {
    const bind = useGesture({
      onDrag,
      onDragStart,
      onDragEnd,
      onPinch,
      onPinchStart,
      onPinchEnd,
      onScroll,
      onScrollStart,
      onScrollEnd,
      onWheel,
      onWheelStart,
      onWheelEnd,
      onHover,
      onMove,
      onMoveStart,
      onMoveEnd,
    });

    useEffect(() => {
      document.addEventListener('gesturestart', (e) => e.preventDefault());
      document.addEventListener('gesturechange', (e) => e.preventDefault());
      document.addEventListener('gestureend', (e) => e.preventDefault());

      return () => {
        document.removeEventListener('gesturestart', (e) => e.preventDefault());
        document.removeEventListener('gesturechange', (e) =>
          e.preventDefault()
        );
        document.removeEventListener('gestureend', (e) => e.preventDefault());
      };
    }, []);

    return (
      <div
        className="gesture-detector"
        style={{ touchAction: 'none' }}
        {...bind()}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
