import React, { PureComponent, Suspense } from 'react';
import { Scene } from 'react-babylonjs';
import {  View, ViewProps } from 'react-native';
import {
  ArcRotateCamera,
  Vector3,
} from '@babylonjs/core';

import { NativeEngine } from '../../NativeEngine';

import { Girl } from '../Girl';
import { Room } from '../Room';
import { SkyBox } from '../SkyBox';
import { styles } from './styles';
import { Button } from "../../../Common";

interface State {
  camera?: ArcRotateCamera;
  mountEngine: boolean;
  loading: boolean;
}

/**
 * @component
 * @class
 * @description Character 3D Scene
 */
export class Character extends PureComponent<ViewProps, State> {
  readonly state: State = {
    camera: undefined,
    mountEngine: true,
    loading: true,
  }

  onActiveCameraChanged = (camera: ArcRotateCamera) => {
    this.setState({ camera });
  }

  /**
   * @description Starts animation sequence and removes loading state
   * @param character Character mesh
   */
  onCharacterCreated = () => {
    this.setState({ loading: false });
  }

  /**
   * @description Changes mounted state
   */
  onMountPress = () => {
    this.setState({
      loading: true,
      mountEngine: !this.state.mountEngine
    });
  }

  render() {
    const { style } = this.props;
    const { camera, loading, mountEngine } = this.state;

    return (
      <View style={style}>
        <View style={styles.engine}>
          {mountEngine && (
            <NativeEngine
              camera={camera}
              loading={loading}
              style={{ flex: 1 }}
            >
              <Scene disposeInstanceOnUnmount onNewCameraAddedObservable={this.onActiveCameraChanged}>
                <arcRotateCamera
                  alpha={Math.PI / 1.99}
                  beta={Math.PI / 2.2}
                  disposeInstanceOnUnmount
                  fov={1.05}
                  name="camera"
                  radius={5}
                  target={new Vector3(-19, 5, 19)}
                />
                <hemisphericLight disposeInstanceOnUnmount name="light" intensity={1.5} direction={Vector3.Up()} />
                <Suspense fallback={null}>
                  <Girl
                    onCreated={this.onCharacterCreated}
                    scaling={new Vector3(0.6, 0.6, 0.6)}
                    position={new Vector3(-19, 0, 10)}
                  />
                  <Room
                    position={new Vector3(0, 0, 0)}
                    scaling={new Vector3(20, 20, 20)}
                  />
                  <SkyBox size={100} />
                </Suspense>
              </Scene>
            </NativeEngine>
          )}
        </View>
        <Button
          style={styles.start}
          onPress={this.onMountPress}
          type="primary"
        >
          {mountEngine ? 'UnMount Engine' : 'Mount Engine'}
        </Button>
      </View>
    );
  }
}
