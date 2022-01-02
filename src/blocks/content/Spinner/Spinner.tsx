import { cn } from '@bem-react/classname'
import * as React from 'react'

import './Spinner.css'

const cnSpinner = cn('Spinner')

export default class Spinner extends React.Component {

  public block = 'Spinner'

  public render() {
    return (
      <div className={cnSpinner()}>
        <div className={cnSpinner('Rotor')}>
          <div className={cnSpinner('Circle')} />
        </div>
      </div>
    )
  }
}
