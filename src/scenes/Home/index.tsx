import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-native';

import { Character } from '../../components/3D/Models';

import { styles } from './styles';

export class HomeScreen extends PureComponent {
  render() {
    return (
      <SafeAreaView style={styles.scene}>
        <Character style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }
}