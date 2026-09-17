import React, { useEffect, useRef } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { artwork } from '../data/assets';
const html = `<!doctype html>
<html><head><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
html,body{margin:0;width:100%;height:100%;background:transparent;overflow:hidden}
/* From Uiverse.io by S4tyendra */
.container{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}
.container .preloader{animation:rotate 2.3s cubic-bezier(0.75,0,0.5,1) infinite}
@keyframes rotate{50%{transform:rotate(360deg)}100%{transform:rotate(720deg)}}
.preloader span{--c:#f23f3f;position:absolute;display:block;height:64px;width:64px;background:var(--c);border:1px solid var(--c);border-radius:100%}
.preloader span:nth-child(1){transform:translate(-28px,-28px);animation:shape_1 2.3s cubic-bezier(0.75,0,0.5,1) infinite}
@keyframes shape_1{60%{transform:scale(0.4)}}
.preloader span:nth-child(2){transform:translate(28px,-28px);animation:shape_2 2.3s cubic-bezier(0.75,0,0.5,1) infinite}
@keyframes shape_2{40%{transform:scale(0.4)}}
.preloader span:nth-child(3){position:relative;border-radius:0;transform:scale(0.98) rotate(-45deg);animation:shape_3 2.3s cubic-bezier(0.75,0,0.5,1) infinite}
@keyframes shape_3{50%{border-radius:100%;transform:scale(0.5) rotate(-45deg)}100%{transform:scale(0.98) rotate(-45deg)}}
.shadow{position:relative;top:30px;left:50%;transform:translateX(-50%);display:block;height:16px;width:64px;border-radius:50%;background-color:#d9d9d9;border:1px solid #d9d9d9;animation:shadow 2.3s cubic-bezier(0.75,0,0.5,1) infinite}
@keyframes shadow{50%{transform:translateX(-50%) scale(0.5);border-color:#f2f2f2}}
@media(prefers-reduced-motion:reduce){*{animation:none!important}}
</style></head><body><div class="container" role="status" aria-label="Loading"><div class="preloader" aria-hidden="true"><span></span><span></span><span></span></div><span class="shadow" aria-hidden="true"></span></div><script>window.ReactNativeWebView.postMessage('ready')</script></body></html>`;
const splashSource = { html };

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const done = useRef(false);
  const displayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finish = React.useCallback(() => {
    if (!done.current) {
      done.current = true;
      onComplete();
    }
  }, [onComplete]);
  useEffect(() => {
    // A slow WebView must get time to paint before the splash is dismissed.
    const timer = setTimeout(finish, 10000);
    return () => {
      clearTimeout(timer);
      if (displayTimer.current) clearTimeout(displayTimer.current);
    };
  }, [finish]);
  return (
    <ImageBackground source={artwork.splash} style={s.root}>
      <Image
        source={artwork.logo}
        resizeMode="contain"
        style={[s.logo, { top: height * 0.112 }]}
      />
      <View
        collapsable={false}
        style={[s.animation, { bottom: insets.bottom + 16 }]}
        pointerEvents="none"
      >
        <WebView
          source={splashSource}
          originWhitelist={['*']}
          style={s.web}
          containerStyle={s.webContainer}
          onMessage={event => {
            if (event.nativeEvent.data === 'ready' && !displayTimer.current) {
              displayTimer.current = setTimeout(finish, 3400);
            }
          }}
          startInLoadingState={false}
          javaScriptEnabled
          automaticallyAdjustContentInsets={false}
          contentInsetAdjustmentBehavior="never"
          scrollEnabled={false}
          onError={finish}
          onContentProcessDidTerminate={finish}
          bounces={false}
          opaque={false}
        />
      </View>
    </ImageBackground>
  );
}
const s = StyleSheet.create({
  root: { flex: 1 },
  logo: {
    position: 'absolute',
    width: '88%',
    height: '25%',
    alignSelf: 'center',
  },
  animation: {
    position: 'absolute',
    zIndex: 2,
    width: 260,
    height: 240,
    alignSelf: 'center',
  },
  webContainer: {
    flex: 0,
    width: 260,
    height: 240,
    backgroundColor: 'transparent',
  },
  web: { flex: 0, width: 260, height: 240, backgroundColor: 'transparent' },
});
