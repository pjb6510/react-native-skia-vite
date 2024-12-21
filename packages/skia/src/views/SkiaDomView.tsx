import React from 'react';

import type { Skia, SkRect } from '../skia/types';

import { SkiaViewNativeId } from './SkiaViewNativeId';
import type { SkiaDomViewNativeProps } from './types';

const NativeSkiaDomView = null as any;

interface SkiaDomViewProps extends SkiaDomViewNativeProps {
  Skia: Skia;
  mode?: 'default' | 'continuous';
}

export class SkiaDomView extends React.Component<SkiaDomViewProps> {
  constructor(props: SkiaDomViewProps) {
    super(props);
    this._nativeId = SkiaViewNativeId.current++;
    this.tick();
  }

  private _nativeId: number;
  private requestId = 0;

  public get nativeId() {
    return this._nativeId;
  }

  componentDidUpdate(prevProps: SkiaDomViewProps) {
    const { root, onSize } = this.props;
    if (onSize !== prevProps.onSize || root !== prevProps.root) {
      this.tick();
    }
  }

  componentWillUnmount(): void {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
  }

  private tick() {
    this.redraw();
    if (this.props.mode === 'continuous') {
      this.requestId = requestAnimationFrame(this.tick.bind(this));
    }
  }

  /**
   * Creates a snapshot from the canvas in the surface
   * @param rect Rect to use as bounds. Optional.
   * @returns An Image object.
   */
  public makeImageSnapshot(_rect?: SkRect) {}

  /**
   * Creates a snapshot from the canvas in the surface
   * @param rect Rect to use as bounds. Optional.
   * @returns An Image object.
   */
  public makeImageSnapshotAsync(_rect?: SkRect) {}

  /**
   * Sends a redraw request to the native SkiaView.
   */
  public redraw() {}

  render() {
    const { debug = false, opaque = false, ...viewProps } = this.props;
    return (
      <NativeSkiaDomView
        collapsable={false}
        nativeID={`${this._nativeId}`}
        debug={debug}
        opaque={opaque}
        {...viewProps}
      />
    );
  }
}
