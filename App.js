import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import firebase from 'firebase';

import AthListScreen from './src/screens/AthListScreen';
import AthDetailScreen from './src/screens/AthDetailScreen';
import SearchScreen from './src/screens/SearchScreen';
import TrendListScreen from './src/screens/TrendListScreen';
import FollowingListScreen from './src/screens/FollowingListScreen';
import UserPageScreen from './src/screens/UserPageScreen';
import AlpineScreen from './src/screens/AthLists/AlpineScreen';
import CrossCountryScreen from './src/screens/AthLists/CrossCountryScreen';
import FreeStyleScreen from './src/screens/AthLists/FreeStyleScreen';
import NordicCombinedScreen from './src/screens/AthLists/NordicCombinedScreen';
import SkiJumpingScreen from './src/screens/AthLists/SkiJumpingScreen';
import SnowBoardingScreen from './src/screens/AthLists/SnowBoardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';

import ENV from './env.json';


const Stack = createStackNavigator();
const MaterialTab = createMaterialBottomTabNavigator();
const MaterialTopTab = createMaterialTopTabNavigator();

const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_DB_URL,
  projectId: ENV.FIREBASE_PROJECT_ID,
  storageBucket: ENV.FIREBASE_STORAGE,
  messagingSenderId: ENV.FIREBASE_MEASUREMENT_ID,
  appId: ENV.FIREBASE_APP_ID,
  measurementId: ENV.FIREBASE_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);

const MaterialTabNavi = () => {
  return (
    <MaterialTab.Navigator
      activeColor="#e91e63"
      style={{ backgroundColor: 'tomato' }}
    >
      <MaterialTab.Screen
        name="Home"
        component={AthListScreenNavi}
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
        component={SearchScreenNavi}
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
        component={AlertScreenNavi}
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
        component={UserPageScreenNavi}
        options={{
          tabBarColor: '#524365',
          tabBarLabel: 'My Page',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </MaterialTab.Navigator>
  );
};

const AthListNavi = () => {
  return (
    <MaterialTopTab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
      }}
    >
      <MaterialTopTab.Screen
        name="Alpine"
        component={AlpineScreen}
      />
      <MaterialTopTab.Screen
        name="CrossCountry"
        component={CrossCountryScreen}
      />
      <MaterialTopTab.Screen
        name="FreeStyle"
        component={FreeStyleScreen}
      />
      <MaterialTopTab.Screen
        name="NordicCombined"
        component={NordicCombinedScreen}
      />
      <MaterialTopTab.Screen
        name="SkiJumping"
        component={SkiJumpingScreen}
      />
      <MaterialTopTab.Screen
        name="SnowBoarding"
        component={SnowBoardingScreen}
      />
    </MaterialTopTab.Navigator>
  );
};

const AthListScreenNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleStyle: {
          backgroundColorcolor: '#ddd',
        },
        headerTintColor: '#000',
        headerBackTitle: null,
      }}
    >
      <Stack.Screen
        name="EggApp"
        component={AthListNavi}
        options={{
          headerLeft: () => (
            <Button
              icon={(
                <MaterialCommunityIcons
                  name="menu"
                  size={15}
                  color="white"
                />
              )}
              color="black"
            />
          ),
        }}
      />
      <Stack.Screen name="AthDetail" component={AthDetailScreen} />
      <Stack.Screen name="MaterialTabNavi" component={MaterialTabNavi} />
    </Stack.Navigator>
  );
};

const SearchScreenNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleStyle: {
          backgroundColorcolor: '#ddd',
        },
        headerTintColor: '#000',
        headerBackTitle: null,
      }}
    >
      <Stack.Screen name="EggApp" component={SearchScreen} />
      <Stack.Screen name="AthDetail" component={AthDetailScreen} />
      <Stack.Screen name="MaterialTabNavi" component={MaterialTabNavi} />
    </Stack.Navigator>
  );
};

const AlertNavi = () => {
  return (
    <MaterialTopTab.Navigator>
      <MaterialTopTab.Screen
        name="Trends"
        component={TrendListScreen}
      />
      <MaterialTopTab.Screen
        name="Following"
        component={FollowingListScreen}
      />
    </MaterialTopTab.Navigator>
  );
};

const AlertScreenNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleStyle: {
          backgroundColorcolor: '#ddd',
        },
        headerTintColor: '#000',
        headerBackTitle: null,
      }}
    >
      <Stack.Screen name="EggApp" component={AlertNavi} />
      <Stack.Screen name="AthDetail" component={AthDetailScreen} />
      <Stack.Screen name="MaterialTabNavi" component={MaterialTabNavi} />
    </Stack.Navigator>
  );
};

const UserPageScreenNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleStyle: {
          backgroundColorcolor: '#ddd',
        },
        headerTintColor: '#000',
        headerBackTitle: null,
      }}
    >
      <Stack.Screen name="User1" component={UserPageScreen} />
      <Stack.Screen name="AthDetail" component={AthDetailScreen} />
      <Stack.Screen name="MaterialTabNavi" component={MaterialTabNavi} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer
      style={styles.container}
      headerMode="none"
    >
      <Stack.Navigator
        options={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          component={MaterialTabNavi}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
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
