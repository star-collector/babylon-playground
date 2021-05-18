import React, { PureComponent, ReactNode } from 'react';
import { RegisteredStyle, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import { buttonStyles, textStyles } from './styles';

interface Props {
  disabled?: boolean;
  onPress?: () => void;
  style?: RegisteredStyle<ViewStyle> | RegisteredStyle<ViewStyle>[] | ViewStyle | ViewStyle[];
  textContainerStyles?: RegisteredStyle<TextStyle> | RegisteredStyle<TextStyle>[] | TextStyle | TextStyle[];
  type: 'primary' | 'secondary' | 'empty' | 'faded';
}

export class Button extends PureComponent<Props> {
  renderText = (children: ReactNode) => {
    const { disabled, textContainerStyles, type } = this.props;
    return <Text style={[textStyles[type], disabled && textStyles.disabled, textContainerStyles]}>{children}</Text>;
  }

  render() {
    const { children, disabled, onPress, style, type } = this.props;
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[buttonStyles.button, buttonStyles[type], disabled && buttonStyles.disabled, style]}
      >
        {typeof children === 'string' ? this.renderText(children) : (
          Array.isArray(children)
            ? children.map((child) => (typeof child === 'string' ? this.renderText(child) : child))
            : children
        )}
      </TouchableOpacity>
    );
  }
}
