import * as React from 'react';
import { Button as ButtonCommon } from './Button';

export class Button extends ButtonCommon {
    protected attrs() {
        return {
            onTouchMove: this.onPointerEnter,
            onTouchEnd: this.onPointerLeave,
        };
    }
}
