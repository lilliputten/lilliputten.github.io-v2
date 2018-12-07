import * as React from 'react';
import { cn } from '@bem-react/classname';
import { withBemMod } from '@bem-react/core';

import { IExampleProps } from '../Example';

const cnExample = cn('Example');

export interface IExampleMod2Props /* extends IExampleProps */ {
  mod2?: boolean;
}

const mod: any = (Example: React.ComponentType<IExampleProps>, props: IExampleProps) => {
  const { children, ...propsWithoutChildren } = props;
  return <Example {...props}>{children} mod2</Example>;
};
export const ExampleMod2 = withBemMod<IExampleProps>(cnExample(), { mod2: true }, mod);
