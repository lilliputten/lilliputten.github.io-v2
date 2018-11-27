import * as React from 'react';
import { Button as ButtonCommon } from './Button';

export class Button extends ButtonCommon {
    protected attrs() {
        return {
            onMouseEnter: this.onPointerEnter,
            onMouseLeave: this.onPointerLeave,
        };
    }
}
