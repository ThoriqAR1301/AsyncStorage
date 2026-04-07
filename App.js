import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';

import InspirasiScreen from './screens/InspirasiScreen';
import CatatankuScreen from './screens/CatatankuScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({ label, focused }) => (
  <View style={[styles.iconWrapper, focused && styles.iconActive]}>
    <Text style={[styles.iconEmoji]}>
      {label === 'Inspirasi' ? '✨' : '📝'}
    </Text>
    <Text style={[styles.iconLabel, focused && styles.iconLabelActive]}>
      {label}
    </Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Inspirasi"
          component={InspirasiScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon label="Inspirasi" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Catatanku"
          component={CatatankuScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon label="Catatanku" focused={focused} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1A1A2E',
    borderTopWidth: 0,
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 20,
    shadowColor: '#E94560',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 12,
  },
  iconActive: {
    backgroundColor: 'rgba(233, 69, 96, 0.15)',
  },
  iconEmoji: {
    fontSize: 22,
  },
  iconLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
    fontWeight: '500',
  },
  iconLabelActive: {
    color: '#E94560',
    fontWeight: '700',
  },
});