import * as React from 'react'
import { cn } from '@bem-react/classname'
import { compose, IClassNameProps } from '@bem-react/core'

// NOTE: Import own styles before mods (if any)!
// import './Example.css';

import { ExampleMod1, IExampleMod1Props } from './_mod1/Example_mod1'
import { ExampleMod2, IExampleMod2Props } from './_mod2/Example_mod2'

const cnExample = cn('Example')

export interface IExampleProps extends
  IExampleMod1Props,
  IExampleMod2Props,
  IClassNameProps {
    text?: string;
    children?: React.ReactNode;
}

class Example<P extends IExampleProps> extends React.Component<P> {

  public block = 'Example'

  public render() {
    const { children } = this.props
    return (
      <div className={cnExample()}>
        {children}
      </div>
    )
  }
}

export default compose.apply(null, [
  ExampleMod1,
  ExampleMod2,
])(Example)
