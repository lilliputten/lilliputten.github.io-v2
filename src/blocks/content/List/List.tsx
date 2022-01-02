import * as React from 'react'
import { cn } from '@bem-react/classname'

import './List.css'

const cnList = cn('List')

export default class List extends React.Component {

  public block = 'List'

  /** render ** {{{
   */
  public render() {
    return (
      <ul className={cnList()}>
        {this.props.children}
      </ul>
    )
  }/*}}}*/

}
