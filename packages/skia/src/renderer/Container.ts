import { JsiSkDOM } from "../dom/nodes/JsiSkDOM";
import { GroupProps } from "../dom/types/Common";
import { DrawingContext } from "../dom/types/DrawingContext";
import { RenderNode } from "../dom/types/Node";
import { SkDOM } from "../dom/types/SkDOM";
import { Skia } from "../skia/types/Skia";

export class Container {
  private _root: RenderNode<GroupProps>;
  public Sk: SkDOM;
  public unmounted = false;

  constructor(
    Skia: Skia,
    public redraw: () => void = () => {},
    public getNativeId: () => number = () => 0
  ) {
    this.Sk = new JsiSkDOM({ Skia });
    this._root = this.Sk.Group();
  }

  draw(ctx: DrawingContext) {
    this._root.render(ctx);
  }

  get root() {
    return this._root;
  }
}
