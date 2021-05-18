import React, { PureComponent } from 'react';
import { ILoadedModel, Model } from 'react-babylonjs';
import { AbstractMesh, SceneLoader, Vector3 } from '@babylonjs/core';

import girlModel from '../../../../assets/models/base/blond.glb';
import baseGirlModel from '../../../../assets/models/base/girl.glb';
import walkingGirlModel from '../../../../assets/models/base/female_walk_cycle.glb';


import { resolveInnerAsset } from '../../../../utils';

interface Props {
  onCreated?: (rootMesh: AbstractMesh) => void;
  onModelLoaded?: (model: ILoadedModel) => void;
  scaling?: Vector3;
  position: Vector3;
}

interface State {
  girlPath: string;
}

const girl = resolveInnerAsset(girlModel);
const baseGirl = resolveInnerAsset(baseGirlModel);
const walkingGirl = resolveInnerAsset(walkingGirlModel);

/**
 * @component
 * @class
 * @description Girl model and corresponding events
 */
export class Girl extends PureComponent<Props, State> {
  readonly state: State = {
    girlPath: '',
  }

  async componentDidMount() {
    this.setState({ girlPath: await girl });
  }

  onCreated = async (rootMesh: AbstractMesh) => {
    console.log('MODEL CREATED');

    const { onCreated } = this.props;
    const basePath = await baseGirl;
    const walkingPath = await walkingGirl;

    const baseContainer = await SceneLoader.LoadAssetContainerAsync(basePath);
    const walkContainer = await SceneLoader.LoadAssetContainerAsync(walkingPath);


    // doing something
    // ...
    // disposing objects

    baseContainer.dispose();
    walkContainer.dispose();

    if (onCreated) {
      onCreated(rootMesh);
    }
  }

  render() {
    const { position, scaling } = this.props;
    const { girlPath } = this.state;
    return girlPath ? (
      <Model
        disposeInstanceOnUnmount
        onCreated={this.onCreated}
        name="character"
        position={position}
        rootUrl={girlPath}
        scaling={scaling}
        sceneFilename=""
      />
    ) : null;
  }
}
