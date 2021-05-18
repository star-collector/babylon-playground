import React, { FunctionComponent } from 'react';
import { EngineCanvasContext } from 'react-babylonjs';
import {
  ActivityIndicator,
  GestureResponderEvent,
  RegisteredStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Camera, Engine, Nullable, PickingInfo, Scene } from '@babylonjs/core';
import { useEngine, EngineView } from '@babylonjs/react-native';

import { styles } from './styles';

interface BaseProps {
  camera?: Camera | null;
  loading?: boolean;
  onTouchStart?: (e: GestureResponderEvent) => void;
  onMeshTouchStart?: (pickingInfos: Nullable<PickingInfo>[]) => void;
  style?: RegisteredStyle<ViewStyle> | RegisteredStyle<ViewStyle>[] | ViewStyle | ViewStyle[];
}

/**
 * @description Engine can be attained through hooks only, so we need a wrapper
 * @param props Combined props
 * @constructor
 */
export const NativeEngine: FunctionComponent<BaseProps> = ({ camera, children, loading, style }: BaseProps) => {
  const engine = useEngine();
  return (
    <View style={[{ flex: 1 }, style]}>
      {(loading) && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#4A84EE" />
        </View>
      )}
      <EngineView camera={loading ? camera : undefined} style={styles.engine}/>
      {(engine) && (
        <EngineCanvasContext.Provider value={{ engine, canvas: null }}>
          {children}
        </EngineCanvasContext.Provider>
      )}
    </View>
  );
};
