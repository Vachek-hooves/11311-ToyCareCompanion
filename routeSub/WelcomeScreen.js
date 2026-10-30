import React, {useEffect, useRef} from 'react';
import {Image, View, Animated, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const logoImage = require('../src/assets/plush-care-logo.png');

const DOT_SIZE = 16;
const DOT_COLOR = '#78D8AE';
const DURATION = 500;

const Dot = () => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: DURATION,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const scale = anim.interpolate({inputRange: [0, 1], outputRange: [1, 1.7]});
  const opacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 1],
  });

  return (
    <Animated.View style={[styles.dot, {transform: [{scale}], opacity}]} />
  );
};

const WelcomeScreen = () => (
  <LinearGradient
    colors={['#082C23', '#165940', '#061F19']}
    locations={[0, 0.5, 1]}
    start={{x: 0, y: 0}}
    end={{x: 1, y: 1}}
    style={styles.bg}>
    <View style={styles.center}>
      <Image source={logoImage} resizeMode="contain" style={styles.logo} />
    </View>
    <View style={styles.overlay}>
      <View style={styles.row}>
        <Dot />
        <Dot />
        <Dot />
      </View>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  bg: {flex: 1},
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 160,
  },
  overlay: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 72,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: DOT_COLOR,
  },
});

export default WelcomeScreen;
