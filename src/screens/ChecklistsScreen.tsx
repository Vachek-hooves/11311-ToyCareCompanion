import React, { useLayoutEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ChecklistStackParams, TabsParams } from '../navigation/types';
import { useCare } from '../state/CareProvider';
import { photoUri, removePhoto } from '../services/photos';
import {
  Body,
  Button,
  Heading,
  Page,
  Panel,
  Progress,
  TaskList,
} from '../components/UI';
import { Icon } from '../components/Icon';
import { colors as c } from '../theme';
export function ChecklistsScreen({
  navigation,
}: NativeStackScreenProps<ChecklistStackParams, 'SavedToys'>) {
  const { toys } = useCare();
  if (!toys.length)
    return (
      <Page style={s.empty}>
        <View style={s.emptyIcon}>
          <Icon name="checklist" size={34} />
        </View>
        <Heading>No Saved Toys Yet</Heading>
        <Body>
          Complete the toy scanner to create your first care checklist.
        </Body>
        <View style={s.full}>
          <Button
            title="Start Toy Check"
            onPress={() =>
              navigation
                .getParent<BottomTabNavigationProp<TabsParams>>()
                ?.navigate('Scanner', { screen: 'ScannerIntro' })
            }
          />
        </View>
      </Page>
    );
  return (
    <FlatList
      contentContainerStyle={s.list}
      data={toys}
      keyExtractor={t => t.id}
      renderItem={({ item, index }) => {
        const done = item.tasks.filter(t => t.done).length;
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${item.name}, ${done} of ${item.tasks.length} tasks completed`}
            onPress={() => navigation.navigate('ToyDetail', { id: item.id })}
          >
            <Panel delay={index * 55} style={s.row}>
              {item.photo ? (
                <Image source={{ uri: photoUri(item.photo) }} style={s.thumb} />
              ) : (
                <View style={[s.thumb, s.icon]}>
                  <Icon name="checklist" />
                </View>
              )}
              <View style={s.details}>
                <Text style={s.title}>{item.name}</Text>
                <Text style={s.caption}>{item.title}</Text>
                <Progress value={done / item.tasks.length} />
                <Text style={s.caption}>
                  {done} of {item.tasks.length}
                </Text>
              </View>
              <Text style={s.chevron}>›</Text>
            </Panel>
          </Pressable>
        );
      }}
    />
  );
}
export function ToyDetail({
  route,
  navigation,
}: NativeStackScreenProps<ChecklistStackParams, 'ToyDetail'>) {
  const { toys, toggleTask, deleteToy } = useCare();
  const toy = toys.find(t => t.id === route.params.id);
  const [busy, setBusy] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({ title: toy?.name || 'Care Checklist' });
  }, [toy?.name, navigation]);
  if (!toy)
    return (
      <Page>
        <Body>This checklist is no longer available.</Body>
        <Button
          title="Back to Checklists"
          onPress={() => navigation.popToTop()}
        />
      </Page>
    );
  const done = toy.tasks.filter(t => t.done).length;
  const remove = () =>
    Alert.alert(
      'Delete checklist?',
      `Remove ${toy.name} and its saved progress?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setBusy(true);
            try {
              await deleteToy(toy.id);
              await removePhoto(toy.photo).catch(() => {});
              navigation.popToTop();
            } catch {
              Alert.alert('Unable to delete', 'Please try again.');
            } finally {
              setBusy(false);
            }
          },
        },
      ],
    );
  return (
    <Page>
      {toy.photo ? (
        <Image source={{ uri: photoUri(toy.photo) }} style={s.hero} />
      ) : (
        <View style={[s.hero, s.icon]}>
          <Icon name="checklist" size={52} />
        </View>
      )}
      <Panel>
        <View style={s.between}>
          <Text style={s.title}>{toy.name}</Text>
          <Text style={s.percent}>
            {Math.round((done / toy.tasks.length) * 100)}%
          </Text>
        </View>
        <Progress value={done / toy.tasks.length} />
        <Text style={s.caption}>
          {done} of {toy.tasks.length} tasks completed
        </Text>
      </Panel>
      <Body>{toy.explanation}</Body>
      <TaskList
        tasks={toy.tasks}
        disabled={busy}
        onToggle={async id => {
          setBusy(true);
          try {
            await toggleTask(toy.id, id);
          } catch {
            Alert.alert('Unable to save progress', 'Please try again.');
          } finally {
            setBusy(false);
          }
        }}
      />
      <Button
        secondary
        title="Delete Checklist"
        disabled={busy}
        onPress={remove}
      />
    </Page>
  );
}
const s = StyleSheet.create({
  list: { padding: 16, paddingTop: 20, gap: 16, paddingBottom: 32 },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
    gap: 22,
  },
  emptyIcon: {
    padding: 20,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: 12,
    backgroundColor: c.inset,
  },
  full: { width: '100%', marginTop: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  thumb: { width: 64, height: 64, borderRadius: 8 },
  icon: {
    backgroundColor: c.inset,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: { flex: 1, gap: 8 },
  title: { color: c.text, fontSize: 16, fontWeight: '600', flexShrink: 1 },
  caption: { color: c.muted, fontSize: 12, lineHeight: 18 },
  chevron: { color: c.muted, fontSize: 26 },
  hero: { width: '100%', aspectRatio: 1.4, borderRadius: 8 },
  between: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  percent: { color: c.accent, fontSize: 16, fontWeight: '700' },
});
