import type { SkJSIInstance } from "../JsiInstance";

export type SkData = SkJSIInstance<"Data">;

type ESModule = {
  __esModule: true;
  default: string;
};
export type DataModule = ESModule;
export type DataSource = DataModule | string | Uint8Array;
export type DataSourceParam = DataSource | null | undefined;

export const isRNModule = () => false;
