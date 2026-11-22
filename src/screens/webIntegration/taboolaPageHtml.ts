// Sample HTML page with a standard Taboola tag. In a real integration this
// content comes from the publisher's CMS — nothing here is React-Native or
// SDK specific. It is included in the sample only so the screen has a real
// page to load.
//
// If you want to see what a minimal Taboola page looks like, this is it:
// two containers (`taboola-rn-top`, `taboola-rn-bottom`), the mobile-loader
// script, and one `_taboola.push({...})` per placement.
export const buildTaboolaPageHtml = (params: {
  publisherId: string;
  topPlacement: string;
  topMode: string;
  bottomPlacement: string;
  bottomMode: string;
}): string => `<html>
<head>
  <meta name="viewport" content="width=device-width, user-scalable=no" />
  <script type="text/javascript">
    window._taboola = window._taboola || [];
    _taboola.push({ article: 'auto', url: '' });
    !function (e, f, u, i) {
      if (!document.getElementById(i)) {
        e.async = 1; e.src = u; e.id = i;
        f.parentNode.insertBefore(e, f);
      }
    }(document.createElement('script'),
      document.getElementsByTagName('script')[0],
      'https://cdn.taboola.com/libtrc/${params.publisherId}/mobile-loader.js',
      'tb-mobile-loader-script');
  </script>
</head>
<body>
  <div id="taboola-rn-top"></div>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla bibendum
     mauris eget odio fermentum, non elementum lectus dapibus.</p>
  <p>In aliquam arcu eget nisl imperdiet finibus. Nunc pharetra sapien felis,
     vitae aliquam lorem bibendum in. Donec lacinia blandit tellus quis rutrum.</p>
  <div id="taboola-rn-bottom"></div>
  <script type="text/javascript">
    window._taboola = window._taboola || [];
    _taboola.push({ mode: '${params.topMode}', container: 'taboola-rn-top', placement: '${params.topPlacement}', target_type: 'mix' });
    _taboola.push({ mode: '${params.bottomMode}', container: 'taboola-rn-bottom', placement: '${params.bottomPlacement}', target_type: 'mix' });
    _taboola['mobile'] = window._taboola['mobile'] || [];
    _taboola['mobile'].push({
      lazyFetch: false,
      shouldWaitForSdkConfig: false,
      allow_sdkless_load: false,
      taboola_view_id: new Date().getTime(),
      publisher: '${params.publisherId}'
    });
    _taboola.push({ flush: true });
  </script>
</body>
</html>`;

export const TABOOLA_CONTENT_BASE_URL = 'https://cdn.taboola.com/mobile-sdk/init/';
