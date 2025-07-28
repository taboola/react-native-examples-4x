/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import {Taboola} from "@taboola/react-native-plugin-4x";
import App from "./src/App";
import {PublisherName} from "./src/utils/constants";

AppRegistry.registerComponent(appName, () => App);
Taboola.init(PublisherName.SDK_TESTER_RND);
