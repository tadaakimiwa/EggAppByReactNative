import React from 'react';
import { StyleSheet, View, Icon } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Appbar from './src/components/Appbar';
import AthListScreen from './src/screens/AthListScreen';
import SearchScreen from './src/screens/SearchScreen';
import TrendListScreen from './src/screens/TrendListScreen';
import UserPageScreen from './src/screens/UserPageScreen';

const MaterialTab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Appbar />
      <MaterialTab.Navigator
        activeColor="#e91e63"
        style={{ backgroundColor: 'tomato' }}
      >
        <MaterialTab.Screen
          name="Home"
          component={AthListScreen}
          options={{
            tabBarColor: '#0e141d',
            tabBarLabel: 'Athletes',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="run" color={color} size={26} />
            ),
          }}
        />
        <MaterialTab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarColor: '#281b39',
            tabBarLabel: 'Search',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={26} />
            ),
          }}
        />
        <MaterialTab.Screen
          name="Alert"
          component={TrendListScreen}
          options={{
            tabBarColor: '#E64A19',
            tabBarLabel: 'Alert',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="bell" color={color} size={26} />
            ),
          }}
        />
        <MaterialTab.Screen
          name="UserPage"
          component={UserPageScreen}
          options={{
            tabBarColor: '#524365',
            tabBarLabel: 'My Page',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </MaterialTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 78,
  },

});
