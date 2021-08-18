import React, {useState, FunctionComponent, useEffect} from 'react';
import {SafeAreaView, View, ViewProps} from 'react-native';

import {EngineView, useEngine} from '@babylonjs/react-native';
import {
  Color3,
  Scene,
  Vector3,
  ArcRotateCamera,
  Camera,
  SceneLoader,
  TransformNode,
  HighlightLayer,
  Mesh,
  DeviceSourceManager,
  PointerInput,
  Nullable,
  DeviceType,
  DeviceSource,
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

import character from './assets/models/base/male.glb';
import room from './assets/models/room/room_parts.glb';
import {resolveInnerAsset} from './utils';

const characterModel = resolveInnerAsset(character);
const roomModel = resolveInnerAsset(room);

const EngineScreen: FunctionComponent<ViewProps> = (props: ViewProps) => {
  const engine = useEngine();
  const [camera, setCamera] = useState<Camera>();

  useEffect(() => {
    if (engine) {
      const scene = new Scene(engine);
      const highlight = new HighlightLayer('hl', scene);
      scene.createDefaultCamera(true);
      (scene.activeCamera as ArcRotateCamera).beta -= Math.PI / 8;
      setCamera(scene.activeCamera!);
      scene.createDefaultLight(true);
      const rootNode = new TransformNode('Root Container', scene);
      rootNode.position = new Vector3(0, 0, 0);

      const deviceSourceManager = new DeviceSourceManager(engine);
      const handlePointerInput = (
        inputIndex: PointerInput,
        previousState: Nullable<number>,
        currentState: Nullable<number>,
      ) => {
        if (
          inputIndex === PointerInput.Horizontal &&
          currentState &&
          previousState
        ) {
          rootNode.rotate(
            Vector3.Down(),
            (currentState - previousState) * 0.005,
          );
        }
      };

      deviceSourceManager.onDeviceConnectedObservable.add((device) => {
        if (device.deviceType === DeviceType.Touch) {
          const touch: DeviceSource<DeviceType.Touch> =
            deviceSourceManager.getDeviceSource(
              device.deviceType,
              device.deviceSlot,
            )!;
          touch.onInputChangedObservable.add((touchEvent) => {
            handlePointerInput(
              touchEvent.inputIndex,
              touchEvent.previousState,
              touchEvent.currentState,
            );
          });
        } else if (device.deviceType === DeviceType.Mouse) {
          const mouse: DeviceSource<DeviceType.Mouse> =
            deviceSourceManager.getDeviceSource(
              device.deviceType,
              device.deviceSlot,
            )!;
          mouse.onInputChangedObservable.add((mouseEvent) => {
            if (mouse.getInput(PointerInput.LeftClick)) {
              handlePointerInput(
                mouseEvent.inputIndex,
                mouseEvent.previousState,
                mouseEvent.currentState,
              );
            }
          });
        }
      });

      const transformContainer = new TransformNode(
        'Transform Container',
        scene,
      );
      transformContainer.parent = rootNode;
      transformContainer.scaling.scaleInPlace(0.02);
      transformContainer.position.y -= 0.2;

      roomModel.then((path) => {
        SceneLoader.ImportMeshAsync('', path).then((result) => {
          const mesh = result.meshes[0];
          mesh.parent = transformContainer;
          mesh.getChildMeshes().forEach((mesh) => {
            highlight.addMesh(mesh as Mesh, Color3.Teal());
          });
        });
      });
      characterModel.then((path) => {
        SceneLoader.ImportMeshAsync('', path).then((result) => {
          const mesh = result.meshes[0];
          mesh.parent = transformContainer;
        });
      });
    }
  }, [engine]);

  return (
    <>
      <View style={props.style}>
        <View style={{flex: 1}}>
          <EngineView camera={camera} />
        </View>
      </View>
    </>
  );
};

const App = () => {
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <EngineScreen style={{flex: 1}} />
      </SafeAreaView>
    </>
  );
};

export default App;
