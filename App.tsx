import React, { useCallback, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CareProvider, useCare } from './src/state/CareProvider';
import { SplashScreen } from './src/screens/SplashScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { AppNavigator } from './src/navigation/AppNavigator';
import { Body, Button } from './src/components/UI';
import { colors as c } from './src/theme';
function Root() {
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
        <ActivityIndicator color={c.purple} />
      </View>
    );
  return onboarded ? <AppNavigator /> : <OnboardingScreen />;
}
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={c.background} />
      <CareProvider>
        <Root />
      </CareProvider>
    </SafeAreaProvider>
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
