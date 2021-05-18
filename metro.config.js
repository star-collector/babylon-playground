const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { assetExts },
  } = await getDefaultConfig();
  return {
    resolver: {
      assetExts: [...assetExts.filter((ext) => ext !== 'svg'), 'bin', 'glb', 'gltf', 'json', 'mtl', 'obj', 'png', 'jpg', 'svg'],
    },
  };
})();
