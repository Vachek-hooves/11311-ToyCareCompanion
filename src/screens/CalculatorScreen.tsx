import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { calculatorQuestions } from '../data/questions';
import { Answers, assess } from '../services/assessment';
import { Body, Button, Heading, Page, Panel, TaskList } from '../components/UI';
import { colors as c } from '../theme';
export function CalculatorScreen() {
  const [answers, setAnswers] = useState<Answers>({}),
    [result, setResult] = useState<ReturnType<typeof assess> | null>(null);
  const reset = () => {
    setAnswers({});
    setResult(null);
  };
  return (
    <Page key={result ? 'result' : 'form'}>
      <Body>
        {result
          ? 'Review the toy condition and choose the safest next step.'
          : 'Choose the toy’s current condition.'}
      </Body>
      {calculatorQuestions.map(q => (
        <Panel key={q.id}>
          {result ? (
            <View style={s.summary}>
              <Text style={s.label}>{q.label}</Text>
              <View style={s.badge}>
                <Text style={s.selectedText}>{q.options[answers[q.id]]}</Text>
              </View>
            </View>
          ) : (
            <>
              <Text style={s.label}>{q.label}</Text>
              <View style={s.grid}>
                {q.options.map((option, i) => (
                  <Pressable
                    key={option}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: answers[q.id] === i }}
                    onPress={() => setAnswers({ ...answers, [q.id]: i })}
                    style={[s.option, answers[q.id] === i && s.selected]}
                  >
                    <Text
                      style={[
                        s.optionText,
                        answers[q.id] === i && s.selectedText,
                      ]}
                    >
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}
        </Panel>
      ))}
      {result ? (
        <>
          <Panel style={s.result}>
            <Text style={s.tag}>RESULT</Text>
            <Heading>{result.title}</Heading>
            <Body>{result.explanation}</Body>
          </Panel>
          <Text style={s.title}>Recommended Next Steps</Text>
          <TaskList
            tasks={result.tasks}
            onToggle={id =>
              setResult({
                ...result,
                tasks: result.tasks.map(t =>
                  t.id === id ? { ...t, done: !t.done } : t,
                ),
              })
            }
          />
        </>
      ) : (
        <Button
          title="See Recommendation"
          disabled={
            !calculatorQuestions.every(q => answers[q.id] !== undefined)
          }
          onPress={() => setResult(assess(answers))}
        />
      )}
      <Button secondary title="Start Again" onPress={reset} />
    </Page>
  );
}
const s = StyleSheet.create({
  label: { fontSize: 13, color: c.text, lineHeight: 20, flexShrink: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  option: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: c.background,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: 6,
    padding: 10,
    minHeight: 44,
    justifyContent: 'center',
  },
  selected: { backgroundColor: '#3B3853', borderColor: c.purple },
  optionText: { fontSize: 12, lineHeight: 18, color: c.muted },
  selectedText: { fontSize: 13, color: c.text, lineHeight: 20 },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  badge: {
    maxWidth: '60%',
    padding: 9,
    borderRadius: 6,
    backgroundColor: '#3B3853',
    borderWidth: 1,
    borderColor: c.purple,
  },
  result: {
    backgroundColor: '#29283D',
    borderColor: c.purple,
    padding: 18,
    gap: 16,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: c.purple,
    borderRadius: 4,
    padding: 6,
    fontSize: 11,
    letterSpacing: 1,
    color: c.text,
  },
  title: { color: c.text, fontSize: 17, fontWeight: '600' },
});
