import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { facts } from '../data/facts';
import { Panel, Body } from '../components/UI';
import { Icon } from '../components/Icon';
import { shareContent } from '../services/share';
import { colors as c } from '../theme';
export function FactsScreen() {
  return (
    <FlatList
      data={facts}
      keyExtractor={f => f.title}
      contentContainerStyle={s.list}
      renderItem={({ item, index }) => (
        <Panel
          delay={index * 55}
          style={{
            borderColor: index % 2 ? c.blue : c.purple,
            borderLeftWidth: s.card.borderLeftWidth,
          }}
        >
          <View style={s.row}>
            <Image source={item.image} style={s.image} />
            <Text style={s.title}>{item.title}</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Share ${item.title}`}
              hitSlop={12}
              onPress={() => shareContent(item.title, item.text)}
            >
              <Icon name="share" size={19} />
            </Pressable>
          </View>
          <Body>{item.text}</Body>
        </Panel>
      )}
    />
  );
}
const s = StyleSheet.create({
  card: { borderLeftWidth: 3 },
  list: { padding: 16, paddingTop: 20, gap: 16, paddingBottom: 32 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  image: { height: 46, width: 46, borderRadius: 6 },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: c.text,
    lineHeight: 23,
  },
});
