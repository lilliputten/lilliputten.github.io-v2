import * as React from 'react';
import { cn } from '@bem-react/classname';
import { withBemMod } from '@bem-react/core';

import { IExampleProps } from '../Example';

const cnExample = cn('Example');

export interface IExampleMod1Props /* extends IExampleProps */ {
  mod1?: boolean;
}

const mod: any = (Example: React.ComponentType<IExampleProps>, props: IExampleProps) => {
  const { children, ...propsWithoutChildren } = props;
  return <Example {...props}>{children} mod1</Example>;
};
export const ExampleMod1 = withBemMod<IExampleProps>(cnExample(), { mod1: true }, mod);
