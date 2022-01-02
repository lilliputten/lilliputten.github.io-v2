import * as React from 'react'
import { cn } from '@bem-react/classname'

import './Keywords-Item.css'

const cnKeywordsItem = cn('Keywords', 'Item')

export interface IKeywordsItemProps {
  name: string;
}

export default class KeywordsItem extends React.Component<IKeywordsItemProps> {

  public block = 'Keywords'
  public elem = 'Item'

  /** render ** {{{
   */
  public render() {
    const {name} = this.props
    return (
      <li className={cnKeywordsItem()}>
        {name}
      </li>
    )
  }/*}}}*/

}
