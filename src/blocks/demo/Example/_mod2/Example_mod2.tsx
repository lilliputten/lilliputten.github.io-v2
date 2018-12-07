import * as React from 'react';
import { cn } from '@bem-react/classname';
import { withBemMod } from '@bem-react/core';

import Example from '../Example';
import { IExampleProps } from '../Example';

const cnExample = cn('Example');

export interface IExampleMod1Props extends IExampleProps {
  mod2?: boolean;
  // mod2?: true;
}

const ExampleMod1 = withBemMod<IExampleMod1Props>(cnExample(), { mod2: true }, (Base: any, props: any) => {

  const text = props.text || (Example.defaultProps && Example.defaultProps.text) || '';

  const newProps = Object.assign({}, props, {

    text: text + ' mod2',

    // onClick: () => {
    //   console.log('onClick', props);
    //   // props.onClick && props.onClick();
    // },

  });

  return <Base {...newProps} />;

});

export default ExampleMod1;
