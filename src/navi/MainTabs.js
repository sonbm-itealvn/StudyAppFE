import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import SubjectsScreen from '../screens/SubjectsScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TAB_ICON_MAP = {
  Home: ['home-outline', 'home'],
  Subjects: ['book-outline', 'book'],
  Progress: ['stats-chart-outline', 'stats-chart'],
  Profile: ['person-circle-outline', 'person-circle'],
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarLabelStyle: {
        fontSize: 12,
        marginBottom: 4,
      },
      tabBarIcon: ({ color, size, focused }) => {
        const [outline, solid] = TAB_ICON_MAP[route.name];
        return <Ionicons name={focused ? solid : outline} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#2368ff',
      tabBarInactiveTintColor: '#7a889b',
      tabBarStyle: {
        height: 68,
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth: 0.3,
        borderTopColor: '#e0e4ec',
      },
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ tabBarLabel: 'Trang chủ' }}
    />
    <Tab.Screen
      name="Subjects"
      component={SubjectsScreen}
      options={{ tabBarLabel: 'Môn học' }}
    />
    <Tab.Screen
      name="Progress"
      component={ProgressScreen}
      options={{ tabBarLabel: 'Tiến độ' }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ tabBarLabel: 'Cá nhân' }}
    />
  </Tab.Navigator>
);

export default MainTabs;
