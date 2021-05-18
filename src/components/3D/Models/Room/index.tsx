import React, { PureComponent } from 'react';
import { Model } from 'react-babylonjs';
import { AbstractMesh, Color3, GlowLayer, HighlightLayer, Vector3 } from '@babylonjs/core';

import roomModel from '../../../../assets/models/room/room_parts.glb';
import { resolveInnerAsset } from '../../../../utils';

interface Props {
  position: Vector3;
  scaling?: Vector3;
  setEnabled?: boolean;
}

interface State {
  roomPath: string;
}

const room = resolveInnerAsset(roomModel);

/**
 * @component
 * @class
 * @description Room model and corresponding events
 */
export class Room extends PureComponent<Props, State> {
  readonly state: State = {
    roomPath: '',
  }

  async componentDidMount() {
    this.setState({ roomPath: await room });
  }

  /**
   * @description Disables some unneeded meshes
   * @param rootMesh Room mesh
   */
  onCreated = (rootMesh: AbstractMesh) => {
    const scene = rootMesh.getScene();
    scene.getMeshByName('paper_bag:49_broccoli1')?.setEnabled(false);
    scene.getMeshByName('polySurface1')?.setEnabled(false);
  }

  render() {
    const { position, scaling, setEnabled } = this.props;
    const { roomPath } = this.state;
    return roomPath ? (
      <Model
        setEnabled={setEnabled}
        name="room"
        onCreated={this.onCreated}
        position={position}
        rootUrl={roomPath}
        scaling={scaling}
        sceneFilename=""
      />
    ) : null;
  }
}
