import * as React from 'react';
import { cn } from '@bem-react/classname';

// CSS... (Import first!)
import './HomePage-FlakesCanvas.css';

const cnHomePageFlakesCanvas = cn('HomePage', 'FlakesCanvas');

export interface IHomePageFlakesCanvasProps {
  ready?: boolean;
  width?: number;
  height?: number;
}

export interface IHomePageFlakesCanvasProps {
  ready?: boolean;
  width?: number;
  height?: number;
}

export interface IHomePageFlakesCanvasState {
  ready?: boolean;
  width?: number;
  height?: number;
}

type TDot = {
  // n: number, // DEBUG!
  x: number,
  y: number,
  z: number,
  step: number,
  xStep: number;
  yStep: number;
  color: number,
  waveDegree: number;
};

export default class HomePageFlakesCanvas extends React.Component<IHomePageFlakesCanvasProps, IHomePageFlakesCanvasState> {

  private canvasRef = React.createRef<HTMLCanvasElement>();
  private canvas: HTMLCanvasElement | null;
  private canvasCtx: any;

  private xLimit: number = 0;
  private yLimit: number = 0;

  public state = {
    ready: false,
    width: undefined,
    height: undefined,
  };

  private dotsCount = 20;
  private dots: TDot[] = [];

  private zoomLimit = 3;
  private zoomFactor = 0.25;

  private timeout = 50;
  private timer: any;

  private waveDegree = 0;
  private waveDir = .1;
  private waveAmpl = .001; // 25;
  // private waveFreq = 10;

  public block = 'HomePage';
  public elem = 'FlakesCanvas';

  /** componentDidMount ** {{{
   */
  public componentDidMount() {
    this.initFlakesCanvas();
    if (this.timeout && typeof window === 'object' && window.setInterval) {
      this.timer = window.setInterval(() => this.oneStep(), this.timeout);
    }
  }/*}}}*/
  /** componentWillUnmount ** {{{
   */
  public componentWillUnmount() {

    if (this.timer && typeof window === 'object' && window.clearInterval) {
      window.clearInterval(this.timer);
      this.timer = null;
    }

  }/*}}}*/

  /** componentDidUpdate ** {{{
   */
  public componentDidUpdate() {
    const {width, height, ready} = this.props;
    const hasInited = ready && width && height;
    const hasChanges = (ready !== this.state.ready || width !== this.state.width || height !== this.state.height);
    if (this.canvasCtx && this.canvas && hasInited && hasChanges) {
      if (width && height) {
        this.xLimit = width / 2; // this.canvas.offsetWidth / 2;
        this.yLimit = height / 2; // this.canvas.offsetHeight / 2;
        this.canvas.width = width;
        this.canvas.height = height;
      }
      this.setState({ready, width, height});
    }
  }/*}}}*/

  /** getFillColor ** {{{
   */
  private getFillColor(c: number): string {

    c = c || 0;
    // if (c > 255) {
    //   c = 255;
    // }

    // "rgb(" + this.stars[i].color + "," + this.stars[i].color + "," + this.stars[i].color + ")";
    var color;
    // color = 'rgba(255,255,255,' + c + ')';
    // color = 'rgba(' + c + ',' + c + ',' + c + ',' + c + ')';
    color = '#ffffff';

    return color;

  }/*}}}*/

  /** newDot ** {{{
   */
  newDot(): TDot {
    const dot = {
      x: this.randomAbsRange(.1, .5),
      y: this.randomAbsRange(.1, .5),
      z: .1,
      xStep: this.randomAbsRange(.001, .01),
      yStep: this.randomAbsRange(.001, .01),
      step: this.randomRange(.01, .0001),
      waveDegree: this.randomRange(-90,90),
      color: 0,
    };
    return dot;
  }/*}}}*/

  /** initDots ** {{{
   */
  private initDots() {
    for(let i=0; i<this.dotsCount; i++) {
      const dot = this.newDot();
      this.dots.push(dot);
    }
  }/*}}}*/

  /** recycleDot ** {{{
   */
  private recycleDot(dot: TDot){
    Object.assign(dot, this.newDot());
  }/*}}}*/

  /** oneStep ** {{{
   */
  private oneStep() {
    const {width, height} = this.state;
    const {xLimit, yLimit} = this;
    if (this.canvasCtx && width && height) {
      this.canvasCtx.clearRect(0, 0, width, height);
      for(let i=0; i<this.dotsCount; i++){
        const dot = this.dots[i];
        const x = xLimit + Math.round(xLimit * dot.x);
        const y = yLimit + Math.round(yLimit * dot.y);
        const {z, color} = dot;

        if (x < 0 || x > width) {
          this.recycleDot(dot);
        } else {
          dot.x += dot.xStep;
          dot.x += this.waveAmpl * Math.sin(this.waveDegree + dot.waveDegree);
        }

        if (y < 0 || y > height) {
          this.recycleDot(dot);
        } else {
          dot.y += dot.yStep;
          dot.y += this.waveAmpl * Math.sin(this.waveDegree + dot.waveDegree);
        }

        dot.z = (dot.z < 1) ? dot.z + dot.step : dot.z;
        dot.color += (dot.color < 255) ? dot.step : 0;

        this.canvasCtx.fillStyle = this.getFillColor(color);
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(x, y, this.zoomLimit * z, 0, Math.PI*2, true);
        this.canvasCtx.fill();

      }

      if (this.waveDegree > 90 || this.waveDegree < 0) {
        // this.waveDir *= -.1;
        this.waveDir = -this.waveDir;
      }
      this.waveDegree += this.waveDir;
      this.waveDegree %= 360;

    }
  }/*}}}*/

  /** random ** {{{
   */
  private random(lower: number, upper: number): number {
    return Math.floor(Math.random() * (upper-lower) + lower);
  }/*}}}*/
  /** randomRange ** {{{
   */
  private randomRange(min: number, max: number): number {
    const range = max - min;
    const rand = Math.random();
    const v = range * rand + min;
    return v;
  }/*}}}*/
  /** randomAbsRange ** {{{
   */
  private randomAbsRange(min: number, max: number): number {
    const range = max - min;
    const v = Math.random() - 0.5;
    const sign = (v > 0) ? 1: -1;
    return v * range + min * sign;
  }/*}}}*/

  /** initFlakesCanvas ** {{{
   */
  private initFlakesCanvas() {
    this.canvas = this.canvasRef.current;
    if (this.canvas) {
      this.canvasCtx = this.canvas && this.canvas.getContext('2d');
      // this.xLimit = this.canvas.offsetWidth / 2;
      // this.yLimit = this.canvas.offsetHeight / 2;
      // this.canvasCtx.translate(this.xLimit, this.yLimit);
      this.initDots();
    }
  }/*}}}*/

  /** render ** {{{
   */
  public render() {
    const {ready} = this.state;
    return (
      <canvas ref={this.canvasRef} className={cnHomePageFlakesCanvas('FlakesCanvas', {ready})} >
        Ready: {ready}
      </canvas>
    );
  }/*}}}*/

}
