import React, { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CareProvider, useCare } from '../state/CareProvider';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { AppNavigator } from './AppNavigator';
import { Body, Button } from '../components/UI';
import { colors as c } from '../theme';

function RootNavigatorInner() {
  const [loaded, setLoaded] = useState(false);
  const { ready, onboarded, error, retry } = useCare();
  const finish = useCallback(() => setLoaded(true), []);
  if (!loaded) return <SplashScreen onComplete={finish} />;
  if (error)
    return (
      <SafeAreaView style={s.center}>
        <Body>{error}</Body>
        <Button title="Try Again" onPress={retry} />
      </SafeAreaView>
    );
  if (!ready)
    return (
      <View style={s.center}>
        <ActivityIndicator color={c.accent} />
      </View>
    );
  return onboarded ? <AppNavigator /> : <OnboardingScreen />;
}

export default function RootNavigator() {
  return (
    <CareProvider>
      <RootNavigatorInner />
    </CareProvider>
  );
}

const s = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: c.background,
    justifyContent: 'center',
    padding: 24,
    gap: 20,
  },
});
