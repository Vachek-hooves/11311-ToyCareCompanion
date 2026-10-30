import React, {useEffect, useRef, useMemo} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';

const BALL_COUNT = 4;
const BALL_SIZE = 14;
const BALL_GAP = 12;
const BOUNCE_HEIGHT = 22;
const BOUNCE_DURATION = 420;
const BALL_STAGGER = 110;

const TEAL = '#78D8AE';
const BLUE = '#8BCDC8';

function createBounceAnimation(anim) {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 1,
        duration: BOUNCE_DURATION,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 0,
        duration: BOUNCE_DURATION,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]),
  );
}

const Ball = React.memo(({anim, color}) => {
  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -BOUNCE_HEIGHT],
  });
  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1.1],
  });

  return (
    <Animated.View
      style={[
        styles.ball,
        {backgroundColor: color, transform: [{translateY}, {scale}]},
      ]}
    />
  );
});

const BounceIndicator = ({containerStyle}) => {
  const anims = useRef(
    Array.from({length: BALL_COUNT}, () => new Animated.Value(0)),
  ).current;

  const colors = useMemo(
    () => Array.from({length: BALL_COUNT}, (_, i) => (i % 2 === 0 ? TEAL : BLUE)),
    [],
  );

  useEffect(() => {
    const running = [];

    anims.forEach((anim, i) => {
      const loop = createBounceAnimation(anim);
      const timeout = setTimeout(() => loop.start(), i * BALL_STAGGER);
      running.push({loop, timeout});
    });

    return () => {
      running.forEach(({loop, timeout}) => {
        clearTimeout(timeout);
        loop.stop();
      });
    };
  }, [anims]);

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      style={[styles.container, containerStyle]}>
      <View style={styles.row}>
        {anims.map((anim, i) => (
          <Ball key={i} anim={anim} color={colors[i]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: BALL_GAP,
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
  },
});

export default React.memo(BounceIndicator);
