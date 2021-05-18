import { Image } from 'react-native';
import { getAssetByID } from 'react-native/Libraries/Image/AssetRegistry';
import { copyFileRes, DocumentDirectoryPath, exists } from 'react-native-fs';

/**
 * @description Returns bundled asset's file:// path
 * @param fileID File id from require or import
 */
export const resolveInnerAsset = async (fileID: number): Promise<string> => {
  const { uri: assetUri } = Image.resolveAssetSource(fileID);
  try {
    if (__DEV__ || assetUri.includes('file://')) {
      return assetUri;
    }

    const { hash, name, type } = getAssetByID(fileID);
    const cachedFilePath = `${DocumentDirectoryPath}/${name}_${hash}.${type}`;
    const fileExists = await exists(cachedFilePath);

    if (fileExists) {
      return `file://${cachedFilePath}`;
    }

    await copyFileRes(`${assetUri}.${type}`, cachedFilePath);

    return `file://${cachedFilePath}`;
  } catch {
    return assetUri;
  }
};

/**
 * @description Returns file:// paths from multiple bundled assets
 * @param fileIDs Array of resource ids
 */
export const resolveInnerAssets = (fileIDs: number[]): Promise<string[]> => {
  return Promise.all(fileIDs.map((id) => resolveInnerAsset(id)));
};
