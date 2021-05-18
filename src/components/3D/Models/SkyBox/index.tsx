import React, { PureComponent } from 'react';
import { Color3, Texture } from '@babylonjs/core';

import skybox_nx from '../../../../assets/models/skybox/skybox_nx.jpeg';
import skybox_ny from '../../../../assets/models/skybox/skybox_ny.jpeg';
import skybox_nz from '../../../../assets/models/skybox/skybox_nz.jpeg';
import skybox_px from '../../../../assets/models/skybox/skybox_px.jpeg';
import skybox_py from '../../../../assets/models/skybox/skybox_py.jpeg';
import skybox_pz from '../../../../assets/models/skybox/skybox_pz.jpeg';
import { resolveInnerAssets } from '../../../../utils';

interface Props {
  setEnabled?: boolean;
  size: number;
}

interface State {
  skyBoxes: string[];
}

const skyBoxes = resolveInnerAssets([
  skybox_px,
  skybox_py,
  skybox_pz,
  skybox_nx,
  skybox_ny,
  skybox_nz,
]);

/**
 * @component
 * @class
 * @description Skybox model
 */
export class SkyBox extends PureComponent<Props, State> {
  readonly state: State = {
    skyBoxes: [],
  }

  async componentDidMount() {
    this.setState({ skyBoxes: await skyBoxes });
  }

  render() {
    const { setEnabled, size } = this.props;
    const { skyBoxes } = this.state;
    return skyBoxes.length ? (
      <box name="skyBox" setEnabled={setEnabled} size={size}>
        <standardMaterial
          backFaceCulling={false}
          diffuseColor={new Color3(0, 0, 0)}
          disableLighting
          name="skyBox"
          specularColor={new Color3(0, 0, 0)}
        >
          <cubeTexture
            assignTo="reflectionTexture"
            coordinatesMode={Texture.SKYBOX_MODE}
            files={skyBoxes}
            rootUrl=""
          />
        </standardMaterial>
      </box>
    ) : null;
  }
}
