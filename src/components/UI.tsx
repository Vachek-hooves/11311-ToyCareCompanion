import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  Animated,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors as c } from '../theme';
import { CareTask } from '../services/assessment';
import { useCompactLayout } from '../theme/useCompactLayout';
import { Icon } from './Icon';
import { Entrance, useEntrance } from './Motion';
export function Button({
  title,
  onPress,
  disabled = false,
  green = false,
  secondary = false,
  busy = false,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  green?: boolean;
  secondary?: boolean;
  busy?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || busy }}
      disabled={disabled || busy}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { opacity: disabled ? 0.45 : pressed ? 0.75 : 1 },
        secondary && styles.outline,
      ]}
    >
      <LinearGradient
        colors={
          secondary
            ? [c.background, c.background]
            : green
            ? [c.greenButtonStart, c.greenButtonEnd]
            : [c.buttonStart, c.buttonEnd]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <View style={styles.buttonFill}>
        {busy ? (
          <ActivityIndicator color={c.text} />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </View>
    </Pressable>
  );
}
export function Page({
  children,
  style,
  replayKey,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  replayKey?: string | number;
}) {
  const motion = useEntrance(0, false, replayKey);
  const { compact } = useCompactLayout();
  return (
    <Animated.ScrollView
      style={[styles.scroll, motion]}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        styles.page,
        compact && styles.compactPage,
        style,
      ]}
    >
      {children}
    </Animated.ScrollView>
  );
}
export function Heading({ children }: { children: React.ReactNode }) {
  return <Text style={styles.heading}>{children}</Text>;
}
export function Body({ children }: { children: React.ReactNode }) {
  return <Text style={styles.body}>{children}</Text>;
}
export function Panel({
  children,
  style,
  delay = 0,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  delay?: number;
}) {
  return (
    <Entrance delay={delay} style={[styles.panel, style]}>
      {children}
    </Entrance>
  );
}
export function Progress({ value }: { value: number }) {
  return (
    <View
      style={styles.track}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(value * 100) }}
    >
      <View
        style={[
          styles.fill,
          { width: `${Math.min(100, Math.max(0, value * 100))}%` },
        ]}
      />
    </View>
  );
}
export function TaskList({
  tasks,
  onToggle,
  disabled = false,
}: {
  tasks: CareTask[];
  onToggle: (id: string) => void;
  disabled?: boolean;
}) {
  return (
    <Panel>
      {tasks.map((task, index) => (
        <Pressable
          key={task.id}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: task.done, disabled }}
          disabled={disabled}
          onPress={() => onToggle(task.id)}
          style={[styles.task, index > 0 && styles.separator]}
        >
          <View style={[styles.checkbox, task.done && styles.checked]}>
            {task.done && <Icon name="check" color={c.text} size={16} />}
          </View>
          <Text style={[styles.taskText, task.done && styles.completed]}>
            {task.text}
          </Text>
        </Pressable>
      ))}
    </Panel>
  );
}
export const styles = StyleSheet.create({
  scroll: { flex: 1 },
  compactPage: { padding: 12, paddingTop: 12, paddingBottom: 20, gap: 12 },
  page: {
    padding: 16,
    paddingTop: 20,
    paddingBottom: 32,
    gap: 16,
    flexGrow: 1,
  },
  heading: { fontSize: 23, fontWeight: '700', color: c.text, lineHeight: 30 },
  body: { fontSize: 15, color: c.muted, lineHeight: 25 },
  panel: {
    backgroundColor: c.card,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: 8,
    padding: 14,
    gap: 12,
  },
  button: { minHeight: 52, flexShrink: 0, borderRadius: 8, overflow: 'hidden' },
  buttonFill: {
    minHeight: 52,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: c.text,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  outline: { borderWidth: 1, borderColor: c.border },
  track: {
    height: 5,
    borderRadius: 5,
    backgroundColor: c.inset,
    overflow: 'hidden',
  },
  fill: { height: '100%', backgroundColor: c.accent, borderRadius: 5 },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 48,
    paddingVertical: 12,
  },
  separator: { borderTopWidth: 1, borderColor: c.border },
  checkbox: {
    height: 22,
    width: 22,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: { backgroundColor: c.green, borderColor: c.green },
  taskText: { flex: 1, fontSize: 14, color: c.text, lineHeight: 21 },
  completed: { textDecorationLine: 'line-through', color: c.muted },
});
