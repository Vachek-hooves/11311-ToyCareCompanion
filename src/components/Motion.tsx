import React, { useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  StyleProp,
  ViewStyle,
} from 'react-native';

// Default to still content until the system preference is known.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    let active = true;
    let changed = false;
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      value => {
        changed = true;
        setReduced(value);
      },
    );
    AccessibilityInfo.isReduceMotionEnabled()
      .then(value => {
        if (active && !changed) setReduced(value);
      })
      .catch(() => {});
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);
  return reduced;
}

export function useEntrance(
  delay = 0,
  playful = false,
  replayKey?: string | number,
) {
  const reduced = useReducedMotion();
  const progress = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    progress.stopAnimation();
    if (reduced) {
      progress.setValue(1);
      return;
    }
    progress.setValue(0);
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: playful ? 620 : 420,
      delay: Math.min(delay, 240),
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
      isInteraction: false,
    });
    animation.start();
    return () => animation.stop();
  }, [delay, playful, progress, reduced, replayKey]);
  return {
    opacity: progress.interpolate({
      inputRange: [0, 0.45, 1],
      outputRange: [0, 1, 1],
    }),
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [playful ? 24 : 14, 0],
        }),
      },
      {
        scale: progress.interpolate({
          inputRange: [0, 0.65, 1],
          outputRange: [playful ? 0.9 : 0.98, playful ? 1.025 : 1, 1],
        }),
      },
      {
        rotate: progress.interpolate({
          inputRange: [0, 0.65, 1],
          outputRange: [
            playful ? '-3deg' : '0deg',
            playful ? '1deg' : '0deg',
            '0deg',
          ],
        }),
      },
    ],
  };
}

export function Entrance({
  children,
  delay = 0,
  playful = false,
  replayKey,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  playful?: boolean;
  replayKey?: string | number;
  style?: StyleProp<ViewStyle>;
}) {
  const motion = useEntrance(delay, playful, replayKey);
  return <Animated.View style={[style, motion]}>{children}</Animated.View>;
}
