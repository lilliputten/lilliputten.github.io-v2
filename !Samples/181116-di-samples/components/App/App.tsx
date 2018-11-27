import * as React from 'react';
import { cn } from '@bem-react/classname';
import { RegistryConsumer } from '@bem-react/di';
import { IButtonProps } from '../Button/Button';

const cnApp = cn('App');
const cnButton = cn('Button');

export const App: React.SFC = () => (
    <RegistryConsumer>
        {registries => {
            // reading App registry
            const registry = registries[cnApp()];

            // taking desktop or mobile version
            const Button = registry.get<IButtonProps>(cnButton());

            return <Button text="Hello there!" />;
        }}
    </RegistryConsumer>
);
