import { cn } from '@bem-react/classname';
import { IClassNameProps } from '@bem-react/core';
import * as React from 'react';
import Link from 'lib/pages/PageLink'; // 'react-router-dom';

import './HomePage.css';

// Elems...
import HomePageCanvas from './-Canvas/HomePage-Canvas';

const cnHomePage = cn('HomePage');

interface IHomePageState {
  ready?: boolean;
  width?: number;
  height?: number;
  gap?: number;
  backgrounds?: string[];
}

export default class HomePage extends React.Component<{}, IHomePageState> {

  public block = 'HomePage';

  /** constructor ** {{{
   */
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }/*}}}*/

  /** componentDidMount ** {{{
   */
  public componentDidMount() {

    const sizes = this.getWindowSizes();
    const state = Object.assign({
      ready: true,
      backgrounds: [ '', this.createRandomBackground(1), this.createRandomBackground(2) ],
    }, sizes);
    setTimeout(() => this.setState(state), 1100);

    window.addEventListener('resize', this.onResize);

  }/*}}}*/
  /** componentWillUnmount ** {{{
   */
  public componentWillUnmount() {

    window.removeEventListener('resize', this.onResize);

  }/*}}}*/

  /** shouldComponentUpdate ** {{{
   */
  public shouldComponentUpdate(nextProps: any, nextState: any) {

    const sNextProps = nextProps && JSON.stringify(nextProps);
    const sProps = this.props && JSON.stringify(this.props);

    const sNextState = nextState && JSON.stringify(nextState);
    const sState = this.state && JSON.stringify(this.state);

    const propsChanged = sProps !== sNextProps;
    const stateChanged = sState !== sNextState;

    const isChanged = propsChanged || stateChanged;

    return isChanged;

  }/*}}}*/

  /** render ** {{{
   */
  public render() {
    const {ready, width, height} = this.state;
          // <div className={cnHomePage('Effect', {2: true, ready})} style={this.getEffectStyle(2)} />
          // <div className={cnHomePage('Effect', {1: true, ready})} style={this.getEffectStyle(1)} />
    return (
      <div className={cnHomePage({ready})}>
        <div className={cnHomePage('Effects', {ready})}>
          <HomePageCanvas ready={ready} width={width} height={height} />
          <div className={cnHomePage('Effect', {2: true, ready})} style={this.getEffectStyle(2)} />
          <div className={cnHomePage('Effect', {1: true, ready})} style={this.getEffectStyle(1)} />
        </div>
      </div>
    );
  }/*}}}*/

  // Private methods...

  /** onResize ** {{{
   */
  private onResize = (e: any) => {
    this.setState((state) => {
      const sizes = this.getWindowSizes();
      if (sizes.gap !== state.gap || sizes.width !== state.width || sizes.height !== state.height) {
        return { ...state, ...sizes };
      }
      return state;
    });
  }/*}}}*/

  /** getWindowSizes ** {{{
   */
  private getWindowSizes(): {width: number, height: number, gap: number} {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const gap = 0; // Math.round(Math.max(width, height));
    return {width, height, gap};
  }/*}}}*/

  /** randomIntRange ** {{{
   */
  private randomIntRange(min: number, max: number): number {
    const range = max - min;
    return Math.round(min + Math.random() * range);
  }/*}}}*/

  /** createRandomBackground ** {{{
   */
  private createRandomBackground(id: number): string {
    const angle1 = this.randomIntRange(180, 260); // 217;
    const angle2 = this.randomIntRange(80, 160); // 127;
    const angle3 = this.randomIntRange(280, 360); // 336;
    const color1a = 'rgba(255,0,0,.8)';
    const color1b = 'rgba(255,0,0,0)';
    const color2a = 'rgba(0,255,0,.8)';
    const color2b = 'rgba(0,255,0,0)';
    const color3a = 'rgba(0,0,255,.8)';
    const color3b = 'rgba(0,0,255,0)';
    const percent1a = this.randomIntRange(0, 40);
    const percent2a = this.randomIntRange(0, 40);
    const percent3a = this.randomIntRange(0, 40);
    const percent1b = this.randomIntRange(60, 80);
    const percent2b = this.randomIntRange(60, 80);
    const percent3b = this.randomIntRange(60, 80);
    return `
        linear-gradient(${angle1}deg, ${color1a} ${percent1a}%, ${color2b} ${percent1b}%),
        linear-gradient(${angle2}deg, ${color2a} ${percent2a}%, ${color2b} ${percent2b}%),
        linear-gradient(${angle3}deg, ${color3a} ${percent3a}%, ${color2b} ${percent3b}%)`;
  }/*}}}*/

  /** getEffectStyle ** {{{
   */
  private getEffectStyle(id: number): React.CSSProperties {

    const {ready, gap, backgrounds} = this.state;

    if (gap == null || !ready || !backgrounds) {
      return {};
    }

    const style = {
      left: -gap,
      right: -gap,
      top: -gap,
      bottom: -gap,
      background: backgrounds[id],
      animationDuration: this.randomIntRange(10, 30) + 's',
      // // https://css-tricks.com/basics-css-blend-modes/
      // backgroundBlendMode: 'screen',
    };

    return style;

  }/*}}}*/

}
