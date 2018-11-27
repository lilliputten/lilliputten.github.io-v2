import * as React from 'react';
import { cn } from '@bem-react/classname';

const cnButton = cn('Button');

export interface IButtonProps {
    text: string;
}

export interface IButtonState {
    pointed: boolean;
}

export class Button extends React.Component<IButtonProps, IButtonState> {
    constructor() {
        this.state = { pointed: false };
    }

    private onPointerEnter() {
        this.setState({ pointed: true });
    }

    private onPointerLeave() {
        this.setState({ pointed: false });
    }

    protected abstract attrs: () => React.DOMAttributes;

    render() {
        return (
            <div className={cnButton(this.state)} {...this.attrs()}>
                {this.props.text}
            </div>
        );
    }
}
