type Point2D = {
  x: number,
  y: number,
};

// There are more: https://aframe.io/docs/1.2.0/components/material.html#properties-1
type Material = Partial<{
  color: string,
  alphaTest: number,
  depthTest: boolean,
  flatShading: boolean,
  npot: boolean,
  offset: Point2D,
  opacity: number,
  repeat: Point2D,
  shader: "standard" | "flat",
  side: "front" | "back" | "double",
  transparent: boolean,
  vertexColors:  "none" | "vertex" | "face"
  visible: boolean,
  blending: "none" | "normal" | "additive" | "subtractive" | "multiply",
  dithering: boolean,
}>;

type XGeometry<Name extends string, Props> = {
  primitive: Name
} & Partial<Props>;

type Box = XGeometry<"box", {
  width: number,
  height: number,
  depth: number,
  segmentsDepth: number,
  segmentsHeight: number,
  segmentsWidth: number,
}>;

type Circle = XGeometry<"circle", {
  radius: number,
  segments: number,
  thetaStart: number,
  thetaLength: number,
}>;

type Cylinder = XGeometry<"cylinder", {
  radius: number,
  height: number,
  segmentsRadial: number,
  segmentsHeight: number,
  openEnded: boolean,
  thetaStart: number,
  thetaLength: number,
}>;

type Geometry = {
  skipCache?: boolean,
} & (Box | Circle | Cylinder);

type Text = Partial<{
  align: "left" | "center" | "right",
  alphaTest: number,
  anchor: "left" | "center" | "right" | "align",
  baseline: "top" | "center" | "bottom",
  color: string,
  font: string,
  fontImage: string,
  height: number,
  letterSpacing: number,
  lineHeight: number,
  opacity: number,
  shader: string,
  side: "front" | "back" | "double",
  tabSize: number,
  transparent: boolean
  value: string,
  whiteSpace: "normal" | "pre" | "nowrap",
  width: number,
  wrapCount: number,
  wrapPixels: number,
  xOffset: number,
  zOffset: number,
}>;

type Position = [x: number, y: number, z: number];

export type EntityAttributes = {
  id: string,
  // color: string,
  material: Material,
  geometry: Geometry,
  text: Text,
  position: Position,
  className: string,
  clickable: boolean,
};
