import './polyfills';
import React, { PureComponent } from 'react';

import { HomeScreen } from './scenes';

export default class App extends PureComponent {
  render() {
    return (
      <HomeScreen />
    );
  }
}
