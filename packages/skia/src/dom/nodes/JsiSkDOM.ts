import type {
  AtlasProps,
  BlendColorFilterProps,
  BlurImageFilterProps,
  BlurMaskFilterProps,
  BoxProps,
  BoxShadowProps,
  ChildrenProps,
  CircleProps,
  ColorProps,
  DiffRectProps,
  DrawingNodeProps,
  FractalNoiseProps,
  GlyphsProps,
  GroupProps,
  ImageProps,
  ImageShaderProps,
  ImageSVGProps,
  LerpColorFilterProps,
  LinearGradientProps,
  LineProps,
  MatrixColorFilterProps,
  OffsetImageFilterProps,
  OvalProps,
  PaintProps,
  PatchProps,
  PathProps,
  PictureProps,
  PointsProps,
  RadialGradientProps,
  RectProps,
  RoundedRectProps,
  ShaderProps,
  SkDOM,
  SweepGradientProps,
  TextBlobProps,
  TextPathProps,
  TextProps,
  TurbulenceProps,
  TwoPointConicalGradientProps,
  VerticesProps,
} from "../types";
import type {
  BlendImageFilterProps,
  BlendProps,
  DisplacementMapImageFilterProps,
  DropShadowImageFilterProps,
  MorphologyImageFilterProps,
  RuntimeShaderImageFilterProps,
} from "../types/ImageFilters";
import type { ParagraphProps } from "../types/Paragraph";
import type {
  CornerPathEffectProps,
  DashPathEffectProps,
  DiscretePathEffectProps,
  Line2DPathEffectProps,
  Path1DPathEffectProps,
  Path2DPathEffectProps,
} from "../types/PathEffects";

import { GroupNode } from "./GroupNode";
import { LayerNode } from "./LayerNode";
import type { NodeContext } from "./Node";
import { PaintNode } from "./PaintNode";
import {
  AtlasNode,
  BackdropFilterNode,
  BoxNode,
  BoxShadowNode,
  CircleNode,
  DiffRectNode,
  FillNode,
  GlyphsNode,
  ImageNode,
  ImageSVGNode,
  LineNode,
  OvalNode,
  PatchNode,
  PathNode,
  PictureNode,
  PointsNode,
  RectNode,
  RRectNode,
  TextBlobNode,
  TextNode,
  TextPathNode,
  VerticesNode,
} from "./drawings";
import { ParagraphNode } from "./drawings/ParagraphNode";
import {
  BlendImageFilterNode,
  BlendNode,
  BlurImageFilterNode,
  BlurMaskFilterNode,
  CornerPathEffectNode,
  DashPathEffectNode,
  DiscretePathEffectNode,
  DisplacementMapImageFilterNode,
  DropShadowImageFilterNode,
  Line2DPathEffectNode,
  OffsetImageFilterNode,
  Path1DPathEffectNode,
  Path2DPathEffectNode,
  RuntimeShaderImageFilterNode,
  SumPathEffectNode,
} from "./paint";
import {
  BlendColorFilterNode,
  LerpColorFilterNode,
  LinearToSRGBGammaColorFilterNode,
  LumaColorFilterNode,
  MatrixColorFilterNode,
  SRGBToLinearGammaColorFilterNode,
} from "./paint/ColorFilters";
import { MorphologyImageFilterNode } from "./paint/ImageFilters";
import {
  ColorNode,
  FractalNoiseNode,
  ImageShaderNode,
  LinearGradientNode,
  RadialGradientNode,
  ShaderNode,
  SweepGradientNode,
  TurbulenceNode,
  TwoPointConicalGradientNode,
} from "./paint/Shaders";

export class JsiSkDOM implements SkDOM {
  constructor(private ctx: NodeContext) {}

  Layer(props?: ChildrenProps) {
    return new LayerNode(this.ctx, props ?? {});
  }

  Group(props?: GroupProps) {
    return new GroupNode(this.ctx, props ?? {});
  }

  Paint(props: PaintProps) {
    return new PaintNode(this.ctx, props);
  }

  // Drawings
  Fill(props?: DrawingNodeProps) {
    return new FillNode(this.ctx, props);
  }

  Image(props: ImageProps) {
    return new ImageNode(this.ctx, props);
  }

  Circle(props: CircleProps) {
    return new CircleNode(this.ctx, props);
  }

  Path(props: PathProps) {
    return new PathNode(this.ctx, props);
  }

  Line(props: LineProps) {
    return new LineNode(this.ctx, props);
  }

  Oval(props: OvalProps) {
    return new OvalNode(this.ctx, props);
  }

  Patch(props: PatchProps) {
    return new PatchNode(this.ctx, props);
  }

  Points(props: PointsProps) {
    return new PointsNode(this.ctx, props);
  }

  Rect(props: RectProps) {
    return new RectNode(this.ctx, props);
  }

  RRect(props: RoundedRectProps) {
    return new RRectNode(this.ctx, props);
  }

  Vertices(props: VerticesProps) {
    return new VerticesNode(this.ctx, props);
  }

  Text(props: TextProps) {
    return new TextNode(this.ctx, props);
  }

  TextPath(props: TextPathProps) {
    return new TextPathNode(this.ctx, props);
  }

  TextBlob(props: TextBlobProps) {
    return new TextBlobNode(this.ctx, props);
  }

  Glyphs(props: GlyphsProps) {
    return new GlyphsNode(this.ctx, props);
  }

  DiffRect(props: DiffRectProps) {
    return new DiffRectNode(this.ctx, props);
  }

  Picture(props: PictureProps) {
    return new PictureNode(this.ctx, props);
  }

  Atlas(props: AtlasProps) {
    return new AtlasNode(this.ctx, props);
  }

  ImageSVG(props: ImageSVGProps) {
    return new ImageSVGNode(this.ctx, props);
  }

  // BlurMaskFilters
  BlurMaskFilter(props: BlurMaskFilterProps) {
    return new BlurMaskFilterNode(this.ctx, props);
  }

  // ImageFilters
  BlendImageFilter(props: BlendImageFilterProps) {
    return new BlendImageFilterNode(this.ctx, props);
  }

  DropShadowImageFilter(props: DropShadowImageFilterProps) {
    return new DropShadowImageFilterNode(this.ctx, props);
  }

  DisplacementMapImageFilter(props: DisplacementMapImageFilterProps) {
    return new DisplacementMapImageFilterNode(this.ctx, props);
  }

  BlurImageFilter(props: BlurImageFilterProps) {
    return new BlurImageFilterNode(this.ctx, props);
  }

  OffsetImageFilter(props: OffsetImageFilterProps) {
    return new OffsetImageFilterNode(this.ctx, props);
  }

  MorphologyImageFilter(props: MorphologyImageFilterProps) {
    return new MorphologyImageFilterNode(this.ctx, props);
  }

  RuntimeShaderImageFilter(props: RuntimeShaderImageFilterProps) {
    return new RuntimeShaderImageFilterNode(this.ctx, props);
  }

  // Color Filters
  MatrixColorFilter(props: MatrixColorFilterProps) {
    return new MatrixColorFilterNode(this.ctx, props);
  }

  BlendColorFilter(props: BlendColorFilterProps) {
    return new BlendColorFilterNode(this.ctx, props);
  }

  LumaColorFilter() {
    return new LumaColorFilterNode(this.ctx);
  }

  LinearToSRGBGammaColorFilter() {
    return new LinearToSRGBGammaColorFilterNode(this.ctx);
  }

  SRGBToLinearGammaColorFilter() {
    return new SRGBToLinearGammaColorFilterNode(this.ctx);
  }

  LerpColorFilter(props: LerpColorFilterProps) {
    return new LerpColorFilterNode(this.ctx, props);
  }

  // Shaders
  Shader(props: ShaderProps) {
    return new ShaderNode(this.ctx, props);
  }

  ImageShader(props: ImageShaderProps) {
    return new ImageShaderNode(this.ctx, props);
  }

  ColorShader(props: ColorProps) {
    return new ColorNode(this.ctx, props);
  }

  SweepGradient(props: SweepGradientProps) {
    return new SweepGradientNode(this.ctx, props);
  }

  Turbulence(props: TurbulenceProps) {
    return new TurbulenceNode(this.ctx, props);
  }

  FractalNoise(props: FractalNoiseProps) {
    return new FractalNoiseNode(this.ctx, props);
  }

  LinearGradient(props: LinearGradientProps) {
    return new LinearGradientNode(this.ctx, props);
  }

  RadialGradient(props: RadialGradientProps) {
    return new RadialGradientNode(this.ctx, props);
  }

  TwoPointConicalGradient(props: TwoPointConicalGradientProps) {
    return new TwoPointConicalGradientNode(this.ctx, props);
  }

  // Path Effects
  CornerPathEffect(props: CornerPathEffectProps) {
    return new CornerPathEffectNode(this.ctx, props);
  }

  DiscretePathEffect(props: DiscretePathEffectProps) {
    return new DiscretePathEffectNode(this.ctx, props);
  }

  DashPathEffect(props: DashPathEffectProps) {
    return new DashPathEffectNode(this.ctx, props);
  }

  Path1DPathEffect(props: Path1DPathEffectProps) {
    return new Path1DPathEffectNode(this.ctx, props);
  }

  Path2DPathEffect(props: Path2DPathEffectProps) {
    return new Path2DPathEffectNode(this.ctx, props);
  }

  SumPathEffect() {
    return new SumPathEffectNode(this.ctx);
  }

  Line2DPathEffect(props: Line2DPathEffectProps) {
    return new Line2DPathEffectNode(this.ctx, props);
  }

  Blend(props: BlendProps) {
    return new BlendNode(this.ctx, props);
  }

  BackdropFilter(props: ChildrenProps) {
    return new BackdropFilterNode(this.ctx, props);
  }

  Box(props: BoxProps) {
    return new BoxNode(this.ctx, props);
  }

  BoxShadow(props: BoxShadowProps) {
    return new BoxShadowNode(this.ctx, props);
  }

  // Paragraph
  Paragraph(props: ParagraphProps) {
    return new ParagraphNode(this.ctx, props);
  }
}
