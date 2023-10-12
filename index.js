import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import 'core-js/proposals/reflect-metadata';

import { name } from './app.json';
import { App } from './src/app/app';

AppRegistry.registerComponent(name, () => App);
