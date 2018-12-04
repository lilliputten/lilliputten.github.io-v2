import * as React from 'react';
import { cn } from '@bem-react/classname';

import Spinner from 'blocks/content/Spinner/Spinner';

import { css as cssConfig } from 'config';

import './PageAnim.css';

type TAnimState = string | boolean | undefined;
export type TContent = any; // JSX.Element | React.Component | string | null;

const cnPageAnim = cn('PageAnim');

interface IPageAnimProps {
  className?: string; // Component class name
  timeout?: number; // Timeout for animation
  initialTimeout?: number; // Timeout before set `active` animation state
  // activeState?: string;
  loadingState?: string; // value for loading state ('loading')
  loadingContent?: TContent; // (<Spinner />);
  appear?: boolean; // Animate on appear
  id?: string | undefined; // Unique content id
  // content: TContent;
  children?: any; // Content
}
const defaultProps: IPageAnimProps = {
  className: '',
  timeout: cssConfig.pageTransitionTimeout, // Animation timeout (nust equal to real css transition)
  initialTimeout: 50, // Timeout before set `active` animation state
  // activeState: 'active',
  loadingState: 'loading',
  loadingContent: React.createElement(Spinner), // (<Spinner />);
  appear: true,
  id: '',
  // children: '',
};
interface IPageAnimState {
  animating?: TAnimState; // Animation status: true (initial), 'active' (finished)
  id?: string;
  children?: TContent;
  prevId?: string;
  prevChildren?: TContent;
}

export default class PageAnim extends React.Component<IPageAnimProps, IPageAnimState> {

  /** Default props */
  public static defaultProps = defaultProps;

  /** lifecycle:getDerivedStateFromProps ** {{{
   */
  public static getDerivedStateFromProps(props: IPageAnimProps, state: IPageAnimState) {
    const prevId = state.id;
    const id = props.id;
    const isIdChanged = (id && id !== prevId);
    if (isIdChanged) {
      const nextState = Object.assign({}, state, {
        animating: true,
        id,
        children: props.children,
      });
      // If not animating now...
      if (!state.animating) {
        // Set prev content...
        Object.assign(nextState, {
          prevId,
          prevChildren: state.children,
        });
      }
      return nextState;
    }
    return state;
  }/*}}}*/

  /*{{{ Properties... */

  /** block name */
  public block = 'PageAnim';

  /** Animation timer */
  private animTimer: any;

  /* ...Properties }}}*/

  // Lifecycle...

  /** constructor ** {{{
   */
  constructor(props: IPageAnimProps) {

    super(props);

    this.state = {
      id: this.props.loadingState || '',
      children: this.props.loadingContent,
      animating: this.props.appear,
    };

  }/*}}}*/

  /** render ** {{{
   */
  public render() {

    const { prevId, prevChildren } = this.state;
    const { id, children } = this.state;

    const showContent = [
      (prevId && prevChildren) && (
        <div key="prev" className={cnPageAnim('Show', this.getAnimationProps(true))}>
          {prevChildren}
        </div>
      ),
      (id && children) && (
        <div key={id} className={cnPageAnim('Show', this.getAnimationProps(false))}>
          {children}
        </div>
      ),
    ];

    // console.log('PageAnim render', this.state.animating, id, prevId?'<- '+prevId:'');
    // debugger;

    // Set next animation state...
    this.iterateAnimState();

    const {animating} = this.state;
    const className = cnPageAnim({animating: !!animating}, [this.props.className]);
    return (
      <div className={className}>
        {showContent}
      </div>
    );

  }/*}}}*/

  // Animations...

  /** getAnimationProps ** {{{
   */
  private getAnimationProps(isPrev: boolean) {
    const {animating} = this.state;
    const id = (isPrev ? this.state.prevId : this.state.id) || '';
    const classKey = this.getPageClassId(id);
    const className = isPrev ? 'exiting' : 'entering';
    const classNameActive = className + 'Active';
    const obj = {
      key: classKey,
      [className]: !!animating,
      [classNameActive]: (animating === 'active'),
    };
    return obj;
  }/*}}}*/

  /** getPageClassId ** {{{
   */
  private getPageClassId(id: string): string {
    id = String(id || '').replace(/\W+/g, ' ').trim().replace(/ /g, '_') || 'home';
    return id;
  }/*}}}*/

  /** iterateAnimState ** {{{
   */
  private iterateAnimState() {
    const {animating} = this.state;
    if (animating) {
      const isJustStarted = (animating === true);
      const nextAnimState = isJustStarted ? 'active' : false;
      const timeout = isJustStarted ? this.props.initialTimeout : this.props.timeout;
      if (this.animTimer) {
        clearTimeout(this.animTimer);
      }
      this.animTimer = setTimeout(() => this.animTimerDone(nextAnimState), timeout);
    }
  }/*}}}*/
  /** animTimerDone ** {{{
   */
  private animTimerDone(animating: TAnimState) {
    this.animTimer = null;
    if (animating !== this.state.animating) {
      const nextState = { animating };
      // Animation end...
      if (!animating) {
        Object.assign(nextState, { prevId: undefined, prevChildren: undefined });
      }
      this.setState(nextState);
    }
  }/*}}}*/

}
