import React, {PureComponent} from 'react';
import {Model} from 'react-babylonjs';
import {
  AbstractMesh,
  Color3,
  GlowLayer,
  HighlightLayer,
  Mesh, PBRMaterial,
  Vector3,
} from "@babylonjs/core";

import roomModel from '../../../../assets/models/room/room_parts.glb';
import { resolveInnerAsset } from '../../../../utils';

export enum RoomMeshes {
  BROCCOLI = 'PIV.003',
  GEO = 'polySurface1',
  ROOT = '__root__',
  SHELF = 'PIV.004',
  TABLET = 'PIV.001',
  TABLE = 'PIV.002',
  TV = 'TV',
  WALLS = 'PIV',
}

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
  };

  async componentDidMount() {
    this.setState({roomPath: await room});
  }

  /**
   * @description Disables some unneeded meshes
   * @param rootMesh Room mesh
   */
  onCreated = (rootMesh: AbstractMesh) => {
    const scene = rootMesh.getScene();
    const hl = new HighlightLayer('hl', scene);

    rootMesh.getChildMeshes().forEach((mesh) => {
      const material = mesh.material as PBRMaterial;
      if (mesh.name === RoomMeshes.WALLS || mesh.name === RoomMeshes.ROOT) {
        mesh.isPickable = false;
        return;
      }
      hl?.addMesh(mesh as Mesh, Color3.Teal());
      if (mesh.name === RoomMeshes.TABLE) {
        mesh.setEnabled(false);
      }
      material.lightmapTexture = material.albedoTexture;
    });
    if (hl) {
      let alpha = 0;
      scene.registerBeforeRender(() => {
        alpha += 0.06;

        hl.blurHorizontalSize = 1.2 + Math.cos(alpha);
        hl.blurVerticalSize = 1.2 + Math.cos(alpha);
      });
    }
  }

  render() {
    const {position, scaling, setEnabled} = this.props;
    const {roomPath} = this.state;
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
