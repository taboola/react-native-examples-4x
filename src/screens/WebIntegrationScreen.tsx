import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import WebViewImpl, { type WebViewProps } from 'react-native-webview';
import {
  Taboola,
  TBLWebviewWrapper,
  TBLWebUnitController,
  type TBLWebListener,
} from '@taboola/react-native-plugin-4x';
import { COLORS, PublisherName, PLACEMENT_PARAMS } from '../utils/constants';
import {
  buildTaboolaPageHtml,
  TABOOLA_CONTENT_BASE_URL,
} from './webIntegration/taboolaPageHtml';

// Type-only workaround, not part of the Taboola integration. Under React 19
// the type exported by `react-native-webview` collapses to `never` in JSX
// position; this alias restores a usable ref-forwarding component type.
// Remove once react-native-webview ships React 19–compatible types.
const WebView = WebViewImpl as unknown as ForwardRefExoticComponent<
  WebViewProps & RefAttributes<WebViewImpl>
>;

const noop = () => {};

type WebViewSource = { uri: string } | { html: string; baseUrl?: string };

// iOS caveat: the Taboola bridge is a WKScriptMessageHandler that WebKit only
// exposes to a page whose load started AFTER registration. So the WebView
// must start on a throwaway page and navigate to the real content only
// inside `onWebviewRegistered`. `{ uri: 'about:blank' }` hits react-native-
// webview's file-URL path on iOS and throws — use an empty HTML doc instead.
const BLANK_PAGE_SOURCE: WebViewSource = { html: '<html></html>' };

const PUBLISHER_ID = PublisherName.SDK_TESTER_RND;
const CONTENT_HTML = buildTaboolaPageHtml({
  publisherId: PUBLISHER_ID,
  topPlacement: PLACEMENT_PARAMS.DARK_MODE_1X2_WIDGET.placement,
  topMode: PLACEMENT_PARAMS.DARK_MODE_1X2_WIDGET.mode,
  bottomPlacement: PLACEMENT_PARAMS.FEED_WITHOUT_VIDEO.placement,
  bottomMode: PLACEMENT_PARAMS.FEED_WITHOUT_VIDEO.mode,
});

/**
 * Web Integration demo — the publisher owns the WebView; the Taboola plugin
 * only attaches its native↔JS bridge onto it.
 *
 * The three numbered steps below mirror the official usage snippet in the
 * Confluence doc "Web Integration (React Native Plugin 4.x)".
 */
const WebIntegrationScreen: FC = () => {
  // 1. Create a web page handle and remove it on unmount.
  const [tblWebPage] = useState(() => Taboola.getWebPage());
  useEffect(
    () => () => {
      Taboola.removeWebPage(tblWebPage.pageId);
    },
    [tblWebPage]
  );

  // Start blank; swap to the content page only after registration (see the
  // iOS caveat on BLANK_PAGE_SOURCE above).
  const [source, setSource] = useState<WebViewSource>(BLANK_PAGE_SOURCE);

  const tblWebListener = useMemo<TBLWebListener>(
    () => ({
      onRenderSuccessful: (placement, height) => {
        console.log(
          `[WebIntegration] onRenderSuccessful placement="${placement}" height=${height}`
        );
      },
      onRenderFailed: (placement, error) => {
        console.log(
          `[WebIntegration] onRenderFailed placement="${placement}" error=${error}`
        );
      },
    }),
    []
  );

  // 3. Load the real content page once the bridge is registered.
  const handleWebviewRegistered = useCallback(
    (_controller: TBLWebUnitController) => {
      setSource({ html: CONTENT_HTML, baseUrl: TABOOLA_CONTENT_BASE_URL });
    },
    []
  );

  const handleRegistrationFailed = useCallback(
    ({ code, message }: { code: string; message: string }) => {
      Alert.alert(`Registration failed: ${code}`, message);
    },
    []
  );

  return (
    <View style={styles.container}>
      {/* 2. Wrap the publisher WebView. The wrapper attaches the Taboola
          bridge; the WebView itself is fully publisher-owned. */}
      <TBLWebviewWrapper
        tblWebPage={tblWebPage}
        tblWebListener={tblWebListener}
        onWebviewRegistered={handleWebviewRegistered}
        onWebviewRegistrationFailed={handleRegistrationFailed}
      >
        <WebView
          source={source}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          // iOS caveat: react-native-webview only enables message handling
          // (which the Taboola bridge needs on iOS) when `onMessage` is set.
          // The plugin turns it on during registration; this no-op is a
          // belt-and-suspenders fallback for older react-native-webview
          // versions. Android is unaffected.
          onMessage={noop}
          // iOS scroll-feel opt-in: react-native-webview leaves WKWebView's
          // deceleration unset, which iOS treats as `fast` — a hard flick on
          // a long Taboola feed brakes after only ~3-4 cards. `0.998` is the
          // numeric equivalent of `"normal"` (UIScrollViewDecelerationRateNormal).
          // On React Native < 0.81 use the Float form (`{0.998}`); on RN >= 0.81
          // the string form (`"normal"`) is also accepted. No-op on Android.
          decelerationRate={0.998}
          webviewDebuggingEnabled={true}
          style={styles.webView}
        />
      </TBLWebviewWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BACKGROUND },
  webView: { flex: 1 },
});

export default WebIntegrationScreen;
