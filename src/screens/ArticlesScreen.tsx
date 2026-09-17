import React, { useLayoutEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { articles } from '../data/articles';
import { colors as c } from '../theme';
import { Body, Button, Page, Panel } from '../components/UI';
import { Entrance } from '../components/Motion';
import { Icon } from '../components/Icon';
import { shareContent } from '../services/share';
type ArticleRoutes = { Article: { id: string } };
export function ArticlesScreen({
  category,
  onOpen,
}: {
  category: 'repair' | 'stain';
  onOpen: (id: string) => void;
}) {
  return (
    <FlatList
      data={articles.filter(a => a.category === category)}
      keyExtractor={a => a.id}
      contentContainerStyle={s.list}
      renderItem={({ item, index }) => (
        <Entrance
          delay={index * 60}
          style={[
            s.card,
            { borderColor: category === 'repair' ? c.purple : c.blue },
          ]}
        >
          <Pressable
            accessibilityRole="button"
            style={s.imageContainer}
            accessibilityLabel={`Read ${item.title}`}
            onPress={() => onOpen(item.id)}
          >
            <Image source={item.image} style={s.image} />
          </Pressable>
          <View style={s.content}>
            <View style={s.row}>
              <Text
                style={[
                  s.category,
                  category === 'repair' ? s.repairCategory : s.stainCategory,
                ]}
              >
                {category === 'repair'
                  ? 'REPAIR & RESTORATION'
                  : 'WASHING & CLEANING'}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Share ${item.title}`}
                hitSlop={12}
                onPress={() =>
                  shareContent(item.title, item.paragraphs.join('\n\n'))
                }
              >
                <Icon name="share" size={18} />
              </Pressable>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => onOpen(item.id)}
            >
              <Text style={s.title}>{item.title}</Text>
              <Text style={s.description}>
                {item.paragraphs[0].split('. ')[0]}.
              </Text>
            </Pressable>
          </View>
        </Entrance>
      )}
    />
  );
}
export function ArticleScreen({
  route,
  navigation,
}: NativeStackScreenProps<ArticleRoutes, 'Article'>) {
  const article = articles.find(a => a.id === route.params.id);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const shareButton = React.useCallback(
    () => (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Share article"
        hitSlop={12}
        onPress={() =>
          article &&
          shareContent(article.title, article.paragraphs.join('\n\n'))
        }
      >
        <Icon name="share" />
      </Pressable>
    ),
    [article],
  );
  useLayoutEffect(() => {
    if (article)
      navigation.setOptions({
        title: article.title,
        headerRight: shareButton,
      });
  }, [article, navigation, shareButton]);
  if (!article)
    return (
      <Page>
        <Body>Article not found.</Body>
      </Page>
    );
  return (
    <Page>
      <Image source={article.image} style={s.image} />
      {article.paragraphs.map(p => (
        <Body key={p}>{p}</Body>
      ))}
      <Panel style={s.warning}>
        <Text style={s.title}>
          {article.category === 'repair' ? 'Safe repair' : 'Avoid'}
        </Text>
        <Body>{article.warning}</Body>
      </Panel>
      {article.quiz && (
        <Panel>
          <Text style={s.title}>True or False?</Text>
          <Body>{article.quiz.question}</Body>
          <View style={s.answers}>
            {[true, false].map(value => (
              <View key={String(value)} style={s.answer}>
                <Button
                  secondary={answer !== value}
                  title={`${
                    answer === value
                      ? value === article.quiz?.answer
                        ? '✓ '
                        : '× '
                      : ''
                  }${value ? 'True' : 'False'}`}
                  onPress={() => setAnswer(value)}
                />
              </View>
            ))}
          </View>
          {answer !== null && (
            <Text
              accessibilityLiveRegion="polite"
              style={[
                s.feedback,
                answer === article.quiz.answer ? s.correct : s.incorrect,
              ]}
            >
              {answer === article.quiz.answer ? 'Correct!' : 'Not quite.'} The
              correct answer is {article.quiz.answer ? 'True' : 'False'}.{' '}
              {article.quiz.answer
                ? 'Follow the gentle method described above.'
                : 'Avoid this method and follow the instructions above.'}
            </Text>
          )}
        </Panel>
      )}
    </Page>
  );
}
const s = StyleSheet.create({
  repairCategory: { color: '#9BCFB8' },
  stainCategory: { color: c.blue },
  correct: { color: '#97D3B5' },
  incorrect: { color: '#F0B6BA' },
  list: { padding: 16, paddingTop: 20, gap: 16, paddingBottom: 32 },
  card: {
    backgroundColor: c.card,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageContainer: { alignSelf: 'stretch', alignItems: 'center' },
  image: {
    width: '100%',
    aspectRatio: 1.2,
    borderRadius: 8,
    alignSelf: 'center',
  },
  content: { padding: 14, gap: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  category: { fontSize: 10, letterSpacing: 1, flex: 1 },
  title: { fontSize: 16, color: c.text, fontWeight: '600', lineHeight: 23 },
  description: { color: c.muted, fontSize: 14, lineHeight: 23, marginTop: 8 },
  warning: { borderColor: c.purple, backgroundColor: '#29283D' },
  answers: { flexDirection: 'row', gap: 10 },
  answer: { flex: 1 },
  feedback: { fontSize: 14, lineHeight: 22, textAlign: 'center' },
});
