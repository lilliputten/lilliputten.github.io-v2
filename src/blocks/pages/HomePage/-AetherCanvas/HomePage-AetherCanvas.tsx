import * as React from 'react';
import { cn } from '@bem-react/classname';

// CSS... (Import first!)
import './HomePage-AetherCanvas.css';

const cnHomePageAetherCanvas = cn('HomePage', 'AetherCanvas');

export interface IHomePageAetherCanvasProps {
  ready?: boolean;
  width?: number;
  height?: number;
}

export interface IHomePageAetherCanvasProps {
  ready?: boolean;
  width?: number;
  height?: number;
}

export interface IHomePageAetherCanvasState {
  ready?: boolean;
  // width?: number;
  // height?: number;
}

// type TDot = {
//   // n: number, // DEBUG!
//   x: number,
//   y: number,
//   z: number,
//   step: number,
//   xStep: number;
//   yStep: number;
//   color: number,
//   waveDegree: number;
// };

export default class HomePageAetherCanvas extends React.Component<IHomePageAetherCanvasProps, IHomePageAetherCanvasState> {

  private canvasRef = React.createRef<SVGSVGElement>();
  // private canvas: SVGSVGElement | null;
  // private canvasCtx: any;
  // private xLimit: number = 0;
  // private yLimit: number = 0;

  public state = {
    ready: false,
    // width: undefined,
    // height: undefined,
  };

  public render() {
    const {ready} = this.props;
    return (
      <svg
        ref={this.canvasRef}
        className={cnHomePageAetherCanvas('AetherCanvas', {ready})}
        viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="Gradient1" cx="50%" cy="50%" fx="10%" fy="50%" r=".5">
            <animate attributeName="fx" dur="44s" values="0%;3%;0%" repeatCount="indefinite" />
            <stop offset="0%" stopColor="#ff0" />
            <stop offset="100%" stopColor="#ff00" />
          </radialGradient>
           <radialGradient id="Gradient2" cx="50%" cy="50%" fx="10%" fy="50%" r=".5">
            <animate attributeName="fx" dur="33.5s" values="0%;3%;0%" repeatCount="indefinite" />
            <stop offset="0%" stopColor="#0ff" />
            <stop offset="100%" stopColor="#0ff0" />
          </radialGradient>
          <radialGradient id="Gradient3" cx="50%" cy="50%" fx="50%" fy="50%" r=".5">
            <animate attributeName="fx" dur="31.5s" values="0%;3%;0%" repeatCount="indefinite" />
            <stop offset="0%" stopColor="#f0f" />
            <stop offset="100%" stopColor="#f0f0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient1)">
          <animate attributeName="x" dur="30s" values="25%;0%;25%" repeatCount="indefinite" />
          <animate attributeName="y" dur="31s" values="0%;25%;0%" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="17s" repeatCount="indefinite"/>
        </rect>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient2)">
          <animate attributeName="x" dur="33s" values="-25%;0%;-25%" repeatCount="indefinite" />
          <animate attributeName="y" dur="34s" values="0%;50%;0%" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="18s" repeatCount="indefinite"/>
        </rect>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient3)">
          <animate attributeName="x" dur="35s" values="0%;25%;0%" repeatCount="indefinite" />
          <animate attributeName="y" dur="36s" values="0%;25%;0%" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="19s" repeatCount="indefinite"/>
        </rect>
      </svg>
    );
  }
}
