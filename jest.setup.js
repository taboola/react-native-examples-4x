/* eslint-env jest */
require('react-native-gesture-handler/jestSetup');

// The Taboola plugin needs its native TurboModule, which Jest doesn't have.
// Replace every export with a stub: functions are no-ops and components render nothing.
jest.mock('@taboola/react-native-plugin-4x', () => {
  const stub = () =>
    new Proxy(function () {}, {
      get: (_target, prop) =>
        prop === '__esModule' ? true : prop === 'then' ? undefined : stub(),
      apply: () => null,
      construct: () => stub(),
    });
  return stub();
});

jest.mock('react-native-webview', () => {
  const { View } = require('react-native');
  return { __esModule: true, default: View, WebView: View };
});
