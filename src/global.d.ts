declare module '*.3dl' {
  const resourceID: number;
  export = resourceID;
}

declare module '*.bin' {
  const resourceID: number;
  export = resourceID;
}

declare module '*.glb' {
  const resourceID: number;
  export = resourceID;
}

declare module '*.gltf' {
  const resourceID: number;
  export = resourceID;
}

declare module '*.mtl' {
  const resourceID: number;
  export = resourceID;
}

declare module '*.obj' {
  const resourceID: number;
  export = resourceID;
}

declare module '*.jpeg' {
  const resourceID: number;
  export = resourceID;
}

declare module '*.png' {
  const resourceID: number;
  export = resourceID;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'react-native/Libraries/Image/AssetRegistry' {
  export type PackagerAsset = any;
  export function getAssetByID(assetID: number): PackagerAsset | undefined;
}
