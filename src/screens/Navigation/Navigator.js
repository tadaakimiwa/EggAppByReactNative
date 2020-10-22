import React, { useState, useContext } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { MaterialCommunityIcons } from "react-native-vector-icons";

import { Button } from "react-native-elements";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerNavigationProp,
} from "@react-navigation/drawer";

import { StyleSheet } from "react-native";
import { Icon } from "native-base";

import { UserContext } from "@context/index";

import AthEditIntroVideoScreen from "@screens/AthEditIntroVideoScreen";
import AthListScreen from "@screens/AthListScreen";
import AthPageScreen from "@screens/AthPageScreen";
import AthEditScreen from "@screens/AthEditScreen";
import AthDetailScreen from "@screens/AthDetailScreen";
import AthCreateScreen from "@screens/drawers/AthCreateScreen";
import AthUploadingScreen from "@screens/AthUploadingScreen";
import AthPostingScreen from "@screens/AthPostingScreen";
import PostDetailScreen from "@screens/PostDetailScreen";
import PostEditScreen from "@screens/PostEditScreen";
import PostVideoModal from "@screens/PostVideoModal";
import SearchScreen from "@screens/SearchScreen";
import SearchStack from "@screens/SearchStack";
import TrendListScreen from "@screens/TrendListScreen";
import FollowingAlertListScreen from "@screens/FollowingAlertListScreen";
import FollowingAthleteVideoScreen from "@screens/FollowingAthleteVideoScreen";
import FollowingListScreen from "@screens/drawers/FollowingListScreen";
import UserPageScreen from "@screens/UserPageScreen";
import AlpineScreen from "@screens/AthLists/AlpineScreen";
import CrossCountryScreen from "@screens/AthLists/CrossCountryScreen";
import FreeStyleScreen from "@screens/AthLists/FreeStyleScreen";
import NordicCombinedScreen from "@screens/AthLists/NordicCombinedScreen";
import SkiJumpingScreen from "@screens/AthLists/SkiJumpingScreen";
import SnowBoardingScreen from "@screens/AthLists/SnowBoardingScreen";
import LoginScreen from "@screens/LoginScreen";
import SignupScreen from "@screens/SignupScreen";
import ShopScreen from "@screens/drawers/ShopScreen";
import UserEditScreen from "@screens/UserEditScreen";
import UserCreateScreen from "@screens/UserCreateScreen";
import UserItemScreen from "@screens/drawers/UserItemScreen";
import UserCommentListScreen from "@screens/UserCommentListScreen";
import UserFollowingListScreen from "@screens/UserFollowingListScreen";
import UserPurchaseListScreen from "@screens/UserPurchaseListScreen";
import PurchaseHistoryScreen from "@screens/drawers/PurchaseHistoryScreen";

const Stack = createStackNavigator();
const MaterialTab = createMaterialBottomTabNavigator();
const MaterialTopTab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const MaterialTabNavi = () => {
  const { AthleteContext } = useContext(UserContext);
  let initialRouteName;
  if (AthleteContext === true) {
    initialRouteName = AthletePageNavi;
  } else {
    initialRouteName = UserPageScreenNavi;
  }

  return (
    <MaterialTab.Navigator
      activeColor="#fff"
      style={{ backgroundColor: "tomato" }}
      initialRouteName="UserPage"
    >
      <MaterialTab.Screen
        name="Home"
        component={FollowingAthleteVideoScreenNavi}
        options={{
          tabBarColor: "#FF4500",
          tabBarLabel: "Athletes",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="run" color={color} size={26} />
          ),
        }}
      />
      <MaterialTab.Screen
        name="Search"
        component={AthListScreenNavi}
        options={{
          tabBarColor: "#FF8300",
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <MaterialTab.Screen
        name="Alert"
        component={AlertScreenNavi}
        options={{
          tabBarColor: "#DF362D",
          tabBarLabel: "Alert",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <MaterialTab.Screen
        name="UserPage"
        component={initialRouteName}
        options={{
          tabBarColor: "#B7AC44",
          tabBarLabel: "My Page",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </MaterialTab.Navigator>
  );
};

const FollowingAthleteVideoScreenNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
        headerBackTitle: null,
      }}
    >
      <Stack.Screen
        name="EggApp"
        component={FollowingAthleteVideoScreen}
        options={{
          headerLeft: () => (
            <Button
              icon={
                <MaterialCommunityIcons name="menu" size={24} color="#000" />
              }
              buttonStyle={{
                backgroundColor: "#fff",
              }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen name="AthDetail" component={AthDetailScreen} />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={PostDetailScreen.navigationOptions}
      />
      <Stack.Screen name="PostEdit" component={PostEditScreen} />
      <Stack.Screen name="MaterialTabNavi" component={MaterialTabNavi} />
    </Stack.Navigator>
  );
};

const AthListNavi = () => {
  return (
    <MaterialTopTab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
      }}
    >
      <MaterialTopTab.Screen name="Alpine" component={AlpineScreen} />
      <MaterialTopTab.Screen
        name="CrossCountry"
        component={CrossCountryScreen}
      />
      <MaterialTopTab.Screen name="FreeStyle" component={FreeStyleScreen} />
      <MaterialTopTab.Screen
        name="NordicCombined"
        component={NordicCombinedScreen}
      />
      <MaterialTopTab.Screen name="SkiJumping" component={SkiJumpingScreen} />
      <MaterialTopTab.Screen
        name="SnowBoarding"
        component={SnowBoardingScreen}
      />
    </MaterialTopTab.Navigator>
  );
};

const AthListScreenNavi = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
        headerBackTitle: null,
      }}
    >
      <Stack.Screen
        name="EggApp"
        component={AthListNavi}
        options={{
          headerLeft: () => (
            <Button
              icon={
                <MaterialCommunityIcons name="menu" size={24} color="#000" />
              }
              buttonStyle={{
                backgroundColor: "#fff",
              }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen name="AthDetail" component={AthDetailScreen} />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={PostDetailScreen.navigationOptions}
      />
      <Stack.Screen name="PostEdit" component={PostEditScreen} />
      <Stack.Screen name="MaterialTabNavi" component={MaterialTabNavi} />
    </Stack.Navigator>
  );
};

const SearchScreenNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
        headerBackTitle: null,
      }}
    >
      <Stack.Screen
        name="EggApp"
        component={SearchScreen}
        options={SearchScreen.navigationOptions}
      />
      <Stack.Screen name="SearchStack" component={SearchStack} />
      <Stack.Screen name="AthDetail" component={AthDetailScreen} />
      <Stack.Screen name="MaterialTabNavi" component={MaterialTabNavi} />
    </Stack.Navigator>
  );
};

const AlertNavi = () => {
  return (
    <MaterialTopTab.Navigator>
      <MaterialTopTab.Screen
        name="FollowingAlert"
        component={FollowingAlertListScreen}
      />
      <MaterialTopTab.Screen name="Trends" component={TrendListScreen} />
    </MaterialTopTab.Navigator>
  );
};

const AlertScreenNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
        headerBackTitle: null,
      }}
    >
      <Stack.Screen name="EggApp" component={AlertNavi} />
      <Stack.Screen name="AthDetail" component={AthDetailScreen} />
      <Stack.Screen name="MaterialTabNavi" component={MaterialTabNavi} />
    </Stack.Navigator>
  );
};

const UserPageScreenNavi = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
        headerBackTitle: null,
      }}
    >
      <Stack.Screen
        name="UserPage"
        component={UserPageScreen}
        option={UserPageScreen.navigationOptions}
      />
      <Stack.Screen name="UserEdit" component={UserEditScreen} />
      <Stack.Screen name="UserCreate" component={UserCreateScreen} />
      <Stack.Screen name="AthPage" component={AthPageScreen} />
      <Stack.Screen name="AthDetail" component={AthDetailScreen} />
      <Stack.Screen name="AthEdit" component={AthEditScreen} />
      <Stack.Screen name="AthUploading" component={AthUploadingScreen} />
      <Stack.Screen name="AthPosting" component={AthPostingScreen} />
      <Stack.Screen
        name="AthEditIntroVideo"
        component={AthEditIntroVideoScreen}
      />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen
        name="UserCommentList"
        component={UserCommentListScreen}
        title="Comment History"
      />
      <Stack.Screen
        name="UserFollowingList"
        component={UserFollowingListScreen}
        title="Following"
      />
      <Stack.Screen
        name="UserPurchaseList"
        component={UserPurchaseListScreen}
        title="Purchase History"
      />
      <Stack.Screen name="PostEdit" component={PostEditScreen} />
      <Stack.Screen name="FollowingList" component={FollowingListScreen} />
      <Stack.Screen name="MaterialTabNavi" component={MaterialTabNavi} />
    </Stack.Navigator>
  );
};

const AthletePageNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
        headerBackTitle: null,
        initialRouteName: "AthPage",
      }}
    >
      <Stack.Screen name="AthPage" component={AthPageScreen} />
      <Stack.Screen
        name="UserPage"
        component={UserPageScreen}
        option={UserPageScreen.navigationOptions}
      />
      <Stack.Screen name="UserEdit" component={UserEditScreen} />
      <Stack.Screen name="UserCreate" component={UserCreateScreen} />
      <Stack.Screen name="AthDetail" component={AthDetailScreen} />
      <Stack.Screen name="AthEdit" component={AthEditScreen} />
      <Stack.Screen name="AthUploading" component={AthUploadingScreen} />
      <Stack.Screen name="AthPosting" component={AthPostingScreen} />
      <Stack.Screen
        name="AthEditIntroVideo"
        component={AthEditIntroVideoScreen}
      />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen
        name="UserCommentList"
        component={UserCommentListScreen}
        title="Comment History"
      />
      <Stack.Screen
        name="UserFollowingList"
        component={UserFollowingListScreen}
        title="Following"
      />
      <Stack.Screen
        name="UserPurchaseList"
        component={UserPurchaseListScreen}
        title="Purchase History"
      />
      <Stack.Screen name="PostEdit" component={PostEditScreen} />
      <Stack.Screen name="FollowingList" component={FollowingListScreen} />
      <Stack.Screen name="MaterialTabNavi" component={MaterialTabNavi} />
    </Stack.Navigator>
  );
};

const MainNavi = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MaterialTabNavi}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DrawNavi"
        component={DrawNavi}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

function CustomDrawerContent(props, logout) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="For Athletes"
        onPress={() => props.navigation.navigate("AthCreate")}
      />
      <DrawerItem
        label="Following"
        onPress={() => props.navigation.navigate("FollowingList")}
      />
      <DrawerItem
        label="Shop"
        onPress={() => props.navigation.navigate("Shop")}
      />
      <DrawerItem
        label="Items"
        onPress={() => props.navigation.navigate("Items")}
      />
      <DrawerItem
        label="Purchase History"
        onPress={() => props.navigation.navigate("Purchase")}
      />
      <DrawerItem label="Logout" onPress={() => logout()} />
    </DrawerContentScrollView>
  );
}

const DrawNavi = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="AthCreate" component={AthCreateScreen} />
      <Drawer.Screen name="FollowingList" component={FollowingListScreen} />
      <Drawer.Screen name="MaterialTabNavi" component={MaterialTabNavi} />
      <Drawer.Screen name="Home" component={AthListNavi} />
      <Drawer.Screen name="main" component={MainNavi} />
    </Drawer.Navigator>
  );
};

const TestNavi = () => {
  const { logout } = useContext(UserContext);

  return (
    <Drawer.Navigator
      drawerContent={(props) => CustomDrawerContent(props, logout)}
    >
      <Drawer.Screen name="main" component={MainNavi} />
      <Drawer.Screen name="AthCreate" component={AthCreateScreen} />
      <Drawer.Screen name="FollowingList" component={FollowingListScreen} />
      <Drawer.Screen name="Shop" component={ShopScreen} />
      <Drawer.Screen name="Items" component={UserItemScreen} />
      <Drawer.Screen name="Purchase" component={PurchaseHistoryScreen} />
      <Drawer.Screen name="MaterialTabNavi" component={MaterialTabNavi} />
      <Drawer.Screen name="Home" component={AthListNavi} />
      <Drawer.Screen name="UserPageScreenNavi" component={UserPageScreenNavi} />
    </Drawer.Navigator>
  );
};

const LoginStackNavi = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitleAlign: "left",
          headerTitle: () => (
            <MaterialCommunityIcons
              name="egg-easter"
              size={25}
              color="#FF8300"
            />
          ),
          headerStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="UserCreate" component={UserCreateScreen} />
    </Stack.Navigator>
  );
};

export default function Navigator() {
  const { currentUser } = useContext(UserContext);
  // NavigationContainerの間に{currentUser ? <MainNavi /> : <LoginStackNavi />}
  return (
    <NavigationContainer style={styles.container}>
      {currentUser ? <TestNavi /> : <LoginStackNavi />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF6",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 78,
  },
});
