import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';

const cnExample = cn('Example');

export interface IExampleProps extends IClassNameProps {
  text?: string;
}

export default class Example<P extends IExampleProps> extends React.Component<P> {

  public static defaultProps = {
    text: 'Example: default',
    className: cnExample(),
  };

  public block = 'Example';

  // protected abstract attrs: () => React.DOMAttributes;

  public render() {
      // <div className={cnExample(this.state)} {...this.attrs()}>
      // <div className={cnExample(this.state)}>
      // <div className={this.props.className}>
    return (
      <div className={this.props.className}>
      {this.props.text}
      </div>
    );
  }
}
