import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import * as firebase from "firebase"

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import DashBoardScreen from "./screens/DashBoardScreen";
import Icon from "react-native-vector-icons/Ionicons";
import Firebase from './libs/firebase'
import PostScreen from "./screens/PostScreen";


class App extends React.Component {
  constructor(props){
    super(props)
    Firebase.init()
  }
  render() {
    return <AppTabNavigator />;
  }
}

export default createBottomTabNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      tabBarLabel: "Sign Up",
      tabBarIcon: (tintColor) => <Icon name="ios-person"  size={24} />
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: tintColor => <Icon name="ios-home"  size={24} />
    }
  },
  DashBoard: {
    screen: DashBoardScreen,
    navigationOptions: {
      tabBarLabel: "Notifications",
      tabBarIcon: tintColor => <Icon name="md-paper" size={24} />
    }
  },
  Post: {
    screen: PostScreen,
    navigationOptions: {
      tabBarLabel: "Post",
      tabBarIcon: tintColor => <Icon name="ios-send"  size={24} />
    }
  }
} , {
  //router config
  initialRouteName:'Login',
  //navigation for complete  tab navigator
  navigationOptions:{
    tabBarVisible: true,
  },
 

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
