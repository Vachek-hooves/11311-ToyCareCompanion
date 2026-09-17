import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ArticlesScreen, ArticleScreen } from '../screens/ArticlesScreen';
import {
  ScannerIntro,
  Questionnaire,
  CareResult,
} from '../screens/ScannerScreen';
import { ChecklistsScreen, ToyDetail } from '../screens/ChecklistsScreen';
import { CalculatorScreen } from '../screens/CalculatorScreen';
import { FactsScreen } from '../screens/FactsScreen';
import { Icon, IconName } from '../components/Icon';
import {
  RepairStackParams,
  StainStackParams,
  ScannerStackParams,
  ChecklistStackParams,
  TabsParams,
} from './types';
import { colors as c } from '../theme';
const Repair = createNativeStackNavigator<RepairStackParams>(),
  Stains = createNativeStackNavigator<StainStackParams>(),
  Scanner = createNativeStackNavigator<ScannerStackParams>(),
  Checklists = createNativeStackNavigator<ChecklistStackParams>(),
  Tabs = createBottomTabNavigator<TabsParams>();
const options = {
  headerStyle: { backgroundColor: c.background },
  headerTintColor: c.text,
  headerTitleStyle: { fontSize: 16, fontWeight: '600' as const },
  headerShadowVisible: true,
  contentStyle: { backgroundColor: c.background },
  headerBackButtonDisplayMode: 'minimal' as const,
};
function RepairList({
  navigation,
}: NativeStackScreenProps<RepairStackParams, 'RepairList'>) {
  return (
    <ArticlesScreen
      category="repair"
      onOpen={id => navigation.navigate('Article', { id })}
    />
  );
}
function StainList({
  navigation,
}: NativeStackScreenProps<StainStackParams, 'StainList'>) {
  return (
    <ArticlesScreen
      category="stain"
      onOpen={id => navigation.navigate('Article', { id })}
    />
  );
}
function RepairNavigator() {
  return (
    <Repair.Navigator screenOptions={options}>
      <Repair.Screen
        name="RepairList"
        component={RepairList}
        options={{ title: 'Repair & Care' }}
      />
      <Repair.Screen name="Article" component={ArticleScreen} />
    </Repair.Navigator>
  );
}
function StainNavigator() {
  return (
    <Stains.Navigator screenOptions={options}>
      <Stains.Screen
        name="StainList"
        component={StainList}
        options={{ title: 'Stain Guide' }}
      />
      <Stains.Screen name="Article" component={ArticleScreen} />
    </Stains.Navigator>
  );
}
function ScannerNavigator() {
  return (
    <Scanner.Navigator screenOptions={options}>
      <Scanner.Screen
        name="ScannerIntro"
        component={ScannerIntro}
        options={{ title: 'Toy Scanner' }}
      />
      <Scanner.Screen
        name="Questionnaire"
        component={Questionnaire}
        options={{ title: 'Toy Scanner' }}
      />
      <Scanner.Screen
        name="CareResult"
        component={CareResult}
        options={{ title: 'Care Checklist' }}
      />
    </Scanner.Navigator>
  );
}
function ChecklistNavigator() {
  return (
    <Checklists.Navigator screenOptions={options}>
      <Checklists.Screen
        name="SavedToys"
        component={ChecklistsScreen}
        options={{ title: 'Checklists' }}
      />
      <Checklists.Screen name="ToyDetail" component={ToyDetail} />
    </Checklists.Navigator>
  );
}
const tabInfo: Record<keyof TabsParams, { label: string; icon: IconName }> = {
  Repair: { label: 'Repair & Care', icon: 'repair' },
  Scanner: { label: 'Toy Scanner', icon: 'scanner' },
  Stains: { label: 'Stain Guide', icon: 'stain' },
  Checklists: { label: 'Checklists', icon: 'checklist' },
  Facts: { label: 'Safety Facts', icon: 'facts' },
  Calculator: { label: 'Wash or\nReplace', icon: 'calculator' },
};
const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: c.background,
    card: c.background,
    text: c.text,
    border: c.border,
    primary: c.purple,
  },
};
function TabIcon({
  name,
  focused,
  color,
}: {
  name: IconName;
  focused: boolean;
  color: string;
}) {
  return (
    <View style={[s.tabIcon, focused && s.focused]}>
      <Icon name={name} color={color} size={21} />
    </View>
  );
}
const tabOptions = ({ route }: { route: { name: keyof TabsParams } }) => ({
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarActiveTintColor: c.purple,
  tabBarInactiveTintColor: c.muted,
  tabBarStyle: s.tabBar,
  tabBarItemStyle: s.item,
  tabBarLabelPosition: 'below-icon' as const,
  tabBarLabel: ({ color }: { color: string }) => (
    <Text numberOfLines={2} style={[s.tabLabel, { color }]}>
      {tabInfo[route.name].label}
    </Text>
  ),
  tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
    <TabIcon color={color} focused={focused} name={tabInfo[route.name].icon} />
  ),
});
export function AppNavigator() {
  return (
    <NavigationContainer theme={theme}>
      <Tabs.Navigator screenOptions={tabOptions}>
        <Tabs.Screen name="Repair" component={RepairNavigator} />
        <Tabs.Screen name="Scanner" component={ScannerNavigator} />
        <Tabs.Screen name="Stains" component={StainNavigator} />
        <Tabs.Screen name="Checklists" component={ChecklistNavigator} />
        <Tabs.Screen
          name="Facts"
          component={FactsScreen}
          options={{
            headerShown: true,
            title: 'Safety Facts',
            headerStyle: options.headerStyle,
            headerTitleStyle: options.headerTitleStyle,
            headerTintColor: c.text,
          }}
        />
        <Tabs.Screen
          name="Calculator"
          component={CalculatorScreen}
          options={{
            headerShown: true,
            title: 'Wash or Replace?',
            headerStyle: options.headerStyle,
            headerTitleStyle: options.headerTitleStyle,
            headerTintColor: c.text,
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
const s = StyleSheet.create({
  tabBar: {
    backgroundColor: c.inset,
    borderTopColor: c.border,
    minHeight: 72,
    paddingTop: 2,
  },
  item: { paddingHorizontal: 0 },
  tabLabel: {
    fontSize: 8,
    lineHeight: 10,
    textAlign: 'center',
    marginBottom: 3,
  },
  tabIcon: {
    width: 44,
    alignItems: 'center',
    paddingTop: 7,
    borderTopWidth: 2,
    borderTopColor: 'transparent',
  },
  focused: { borderTopColor: c.purple },
});
