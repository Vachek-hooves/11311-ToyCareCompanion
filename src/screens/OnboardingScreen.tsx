import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { useCompactLayout } from '../theme/useCompactLayout';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Entrance } from '../components/Motion';
import { artwork } from '../data/assets';
import { Body, Button, Heading, Page } from '../components/UI';
import { appName, colors as c } from '../theme';
import { useCare } from '../state/CareProvider';
const slides = [
  [
    'Give Every Toy\nBetter Care',
    'Learn simple ways to clean, wash, repair, and protect your favourite plush toys.',
  ],
  [
    'Remove Stains\nwith Confidence',
    'Discover gentle cleaning methods for food, paint, drinks, dust, and more.',
  ],
  [
    'Check Before\nYou Keep',
    'Find hidden signs of moisture, damage, loose parts, and wear in older toys.',
  ],
  [
    'Save Your\nCare Checklists',
    'Track cleaning and repair tasks for every plush toy in one simple place.',
  ],
];
export function OnboardingScreen() {
  const [index, setIndex] = useState(0),
    [busy, setBusy] = useState(false);
  const { finishOnboarding } = useCare();
  const { height, width, compact } = useCompactLayout();
  const insets = useSafeAreaInsets();
  const imageSize = Math.min(
    width - (compact ? 32 : 48),
    (height - insets.top - insets.bottom) * (compact ? 0.35 : 0.43),
  );
  const next = async () => {
    if (index < 3) {
      setIndex(index + 1);
      return;
    }
    setBusy(true);
    try {
      await finishOnboarding();
    } catch {
      Alert.alert('Unable to save', 'Please try again.');
    } finally {
      setBusy(false);
    }
  };
  return (
    <SafeAreaView style={s.safe}>
      <Page style={compact ? s.compactPage : s.page}>
        <Text accessibilityRole="header" style={s.brand}>{appName}</Text>
        <Entrance playful replayKey={index} style={s.imageFrame}>
          <Image
            source={artwork.onboarding[index]}
            resizeMode="contain"
            style={[s.image, { width: imageSize, height: imageSize }]}
          />
        </Entrance>
        <View style={s.progress}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                s.step,
                { backgroundColor: i <= index ? c.accent : c.border },
              ]}
            />
          ))}
          <Text style={s.count}>{index + 1} / 4</Text>
        </View>
        <Entrance replayKey={index} delay={80}>
          <Heading>{slides[index][0]}</Heading>
        </Entrance>
        <Entrance replayKey={index} delay={140}>
          <Body>{slides[index][1]}</Body>
        </Entrance>
      </Page>
      <View style={[s.footer, compact && s.compactFooter]}>
        <Button
          title={index === 3 ? 'Get Started' : 'Next'}
          busy={busy}
          onPress={next}
        />
      </View>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  brand: { color: c.text, fontSize: 20, fontWeight: '700', textAlign: 'center' },
  safe: { flex: 1, backgroundColor: c.background },
  page: { padding: 24, paddingTop: 24, paddingBottom: 24, gap: 20 },
  imageFrame: { alignItems: 'center' },
  image: { borderRadius: 8 },
  compactPage: { padding: 16, paddingTop: 12, paddingBottom: 12, gap: 12 },
  compactFooter: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 8,
  },
  step: { height: 3, borderRadius: 3, flex: 1 },
  count: { fontSize: 12, color: c.muted, marginLeft: 4 },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
    flexShrink: 0,
  },
});
