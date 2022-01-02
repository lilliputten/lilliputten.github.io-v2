import * as React from 'react'
import { cn } from '@bem-react/classname'
import { withBemMod } from '@bem-react/core'

import { IKeywordsProps } from '../Keywords'

import './Keywords_delimited.css'

const cnKeywords = cn('Keywords')

export interface IKeywordsDelimitedProps /* extends IKeywordsProps */ {
  delimited?: boolean;
}

const mod: any = (Keywords: React.ComponentType<IKeywordsProps>, props: IKeywordsProps) => {
  // NOTE: children not used (See `Example`...)
  // const { children, ...propsWithoutChildren } = props;
  return <Keywords {...props} />
}

export const KeywordsDelimited = withBemMod<IKeywordsProps>(cnKeywords(), { delimited: true }, mod)
