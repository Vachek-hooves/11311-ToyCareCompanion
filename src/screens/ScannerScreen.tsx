import React, { useRef, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScannerStackParams, TabsParams } from '../navigation/types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Entrance } from '../components/Motion';
import { artwork } from '../data/assets';
import { questions } from '../data/questions';
import { assess, Answers } from '../services/assessment';
import { pickPhoto, persistPhoto, removePhoto } from '../services/photos';
import { useCare } from '../state/CareProvider';
import { Body, Button, Heading, Page, Panel, TaskList } from '../components/UI';
import { Icon } from '../components/Icon';
import { colors as c } from '../theme';
export function ScannerIntro({
  navigation,
}: NativeStackScreenProps<ScannerStackParams, 'ScannerIntro'>) {
  return (
    <Page>
      <Entrance playful style={s.heroFrame}>
        <Image
          source={artwork.onboarding[3]}
          resizeMode="contain"
          style={s.hero}
        />
      </Entrance>
      <Heading>Check Your Toy's Condition</Heading>
      <Body>
        Answer eight short questions about your toy's age, smell, fabric
        condition, damage, material, and storage. Based on your answers, you'll
        receive a personalised care checklist.
      </Body>
      <Button
        title="Start Check"
        onPress={() => navigation.navigate('Questionnaire')}
      />
    </Page>
  );
}
export function Questionnaire({
  navigation,
}: NativeStackScreenProps<ScannerStackParams, 'Questionnaire'>) {
  const [step, setStep] = useState(0),
    [answers, setAnswers] = useState<Answers>({});
  const q = questions[step];
  return (
    <Page replayKey={step}>
      <View style={s.progress}>
        {questions.map((_, i) => (
          <View
            key={i}
            style={[
              s.segment,
              { backgroundColor: i <= step ? c.purple : c.border },
            ]}
          />
        ))}
        <Text style={s.counter}>
          {step + 1} / {questions.length}
        </Text>
      </View>
      <Heading>{q.title}</Heading>
      {q.options.map((option, i) => (
        <Pressable
          accessibilityRole="radio"
          accessibilityState={{ selected: answers[q.id] === i }}
          key={option}
          onPress={() => setAnswers({ ...answers, [q.id]: i })}
          style={[s.option, answers[q.id] === i && s.selected]}
        >
          <Text style={[s.optionText, answers[q.id] === i && s.activeText]}>
            {option}
          </Text>
        </Pressable>
      ))}
      <Button
        title={step === questions.length - 1 ? 'See Care Checklist' : 'Next'}
        disabled={answers[q.id] === undefined}
        onPress={() =>
          step < questions.length - 1
            ? setStep(step + 1)
            : navigation.replace('CareResult', { answers })
        }
      />
      {step > 0 && (
        <Button secondary title="Previous" onPress={() => setStep(step - 1)} />
      )}
    </Page>
  );
}
export function CareResult({
  route,
  navigation,
}: NativeStackScreenProps<ScannerStackParams, 'CareResult'>) {
  const [result, setResult] = useState(() => assess(route.params.answers));
  const [name, setName] = useState(''),
    [photo, setPhoto] = useState<string>(),
    [busy, setBusy] = useState(false);
  const saving = useRef(false);
  const { saveToy } = useCare();
  const selectPhoto = async () => {
    try {
      const uri = await pickPhoto();
      if (uri) setPhoto(uri);
    } catch (e) {
      Alert.alert(
        'Photo unavailable',
        e instanceof Error ? e.message : 'Please try again.',
      );
    }
  };
  const save = async () => {
    if (!name.trim() || saving.current) return;
    saving.current = true;
    setBusy(true);
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    let savedPhoto: string | undefined;
    try {
      savedPhoto = photo ? await persistPhoto(photo, id) : undefined;
      await saveToy({
        ...result,
        id,
        name: name.trim(),
        photo: savedPhoto,
        createdAt: new Date().toISOString(),
      });
      navigation.popToTop();
      navigation
        .getParent<BottomTabNavigationProp<TabsParams>>()
        ?.navigate('Checklists', { screen: 'ToyDetail', params: { id } });
    } catch (error) {
      if (savedPhoto) await removePhoto(savedPhoto).catch(() => {});
      Alert.alert(
        'Unable to save',
        error instanceof Error
          ? error.message
          : 'Your checklist has not been saved. Please try again.',
      );
    } finally {
      saving.current = false;
      setBusy(false);
    }
  };
  return (
    <KeyboardAvoidingView
      style={s.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Page>
        <Panel>
          <View style={s.inputRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Add toy photo"
              disabled={busy}
              onPress={selectPhoto}
              style={s.photoButton}
            >
              <Text style={s.counter}>
                + {photo ? 'Change Photo' : 'Add Photo'}
              </Text>
            </Pressable>
            <TextInput
              accessibilityLabel="Toy name"
              placeholder="Toy Name"
              placeholderTextColor={c.muted}
              value={name}
              onChangeText={setName}
              editable={!busy}
              maxLength={60}
              style={s.input}
            />
          </View>
          {photo ? (
            <Image
              source={{ uri: photo }}
              style={s.preview}
              resizeMode="cover"
              onError={() => {
                setPhoto(undefined);
                Alert.alert(
                  'Photo unavailable',
                  'Unable to display this photo. Please choose another photo.',
                );
              }}
            />
          ) : (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Choose a photo of your toy"
              onPress={selectPhoto}
              style={s.placeholder}
            >
              <Icon name="photo" size={36} />
              <Text style={s.counter}>Add your toy's photo (optional)</Text>
            </Pressable>
          )}
        </Panel>
        <Panel style={s.result}>
          <Text style={s.resultTitle}>{result.title}</Text>
          <Body>{result.explanation}</Body>
        </Panel>
        <Text style={s.resultTitle}>Recommended Care Checklist</Text>
        <TaskList
          tasks={result.tasks}
          disabled={busy}
          onToggle={id =>
            setResult({
              ...result,
              tasks: result.tasks.map(t =>
                t.id === id ? { ...t, done: !t.done } : t,
              ),
            })
          }
        />
        <Button
          green
          title="Save Checklist"
          disabled={!name.trim()}
          busy={busy}
          onPress={save}
        />
        <Button
          secondary
          title="Start Again"
          disabled={busy}
          onPress={() => navigation.replace('Questionnaire')}
        />
      </Page>
    </KeyboardAvoidingView>
  );
}
const s = StyleSheet.create({
  flex: { flex: 1 },
  heroFrame: { width: '100%', aspectRatio: 1 },
  hero: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  progress: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginVertical: 6,
  },
  segment: { flex: 1, height: 4, borderRadius: 3 },
  counter: { fontSize: 12, color: c.muted },
  option: {
    minHeight: 55,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.card,
    padding: 18,
  },
  selected: { borderColor: c.purple, backgroundColor: '#302E48' },
  optionText: { fontSize: 15, color: c.muted, lineHeight: 22 },
  activeText: { color: c.text, fontWeight: '600' },
  inputRow: { flexDirection: 'row', gap: 10 },
  photoButton: {
    minHeight: 44,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: c.border,
    borderRadius: 8,
    backgroundColor: c.inset,
  },
  input: {
    flex: 1,
    minWidth: 0,
    color: c.text,
    fontSize: 14,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: c.inset,
  },
  preview: { width: '100%', height: 170, borderRadius: 8 },
  placeholder: {
    height: 150,
    backgroundColor: c.inset,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  result: { borderColor: c.purple, backgroundColor: '#29283D' },
  resultTitle: {
    color: c.text,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 23,
  },
});
