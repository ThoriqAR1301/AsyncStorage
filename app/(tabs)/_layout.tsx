import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TabIcon = ({
  iconName,
  label,
  focused,
}: {
  iconName: any;
  label: string;
  focused: boolean;
}) => (
  <View style={[styles.iconWrapper, focused && styles.iconActive]}>
    <Ionicons
      name={iconName}
      size={24}
      color={focused ? '#E94560' : '#666'}
    />
    <Text style={[styles.iconLabel, focused && styles.iconLabelActive]}>
      {label}
    </Text>
  </View>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconName={focused ? 'sparkles' : 'sparkles-outline'}
              label="Inspirasi"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="catatan"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconName={focused ? 'book' : 'book-outline'}
              label="Catatanku"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
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
    paddingHorizontal: 24,
    paddingVertical: 4,
    borderRadius: 12,
  },
  iconActive: {
    backgroundColor: 'rgba(233, 69, 96, 0.15)',
  },
  iconLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 3,
    fontWeight: '500',
  },
  iconLabelActive: {
    color: '#E94560',
    fontWeight: '700',
  },
});