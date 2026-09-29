import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, useWindowDimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { artwork } from '../data/assets';
import { appName, colors as c } from '../theme';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const { width, height } = useWindowDimensions();
  const logoSize = Math.min(width - 64, height * 0.36, 280);
  useEffect(() => {
    const timer = setTimeout(onComplete, 3400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <LinearGradient
      colors={[c.background, '#165940', '#061F19']}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.root}
    >
      <Image
        source={artwork.logo}
        resizeMode="contain"
        style={{ width: logoSize, height: logoSize }}
        accessible={false}
      />
      <Text accessibilityRole="header" style={s.title}>
        {appName}
      </Text>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: c.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 20,
  },
  title: {
    color: c.text,
    fontSize: 36,
    lineHeight: 46,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
