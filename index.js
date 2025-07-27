/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import {Taboola} from "@taboola/react-native-plugin-4x";
import App from "./src/App";

AppRegistry.registerComponent(appName, () => App);
Taboola.init("sdk-tester-rnd");
