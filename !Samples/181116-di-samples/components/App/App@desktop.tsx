import { Registry, withRegistry } from '@bem-react/di';
import { cn } from '@bem-react/classname';
import { App as AppCommon } from './App';
import { Button } from '../Button/Button@desktop';

const cnApp = cn('App');
const cnButton = cn('Button');

// registry with desktop versions of components
const registry = new Registry({ id: cnApp() });

registry.set(cnButton(), Button);

export const App = withRegistry(registry)(AppCommon);
