import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import Login from "../screens/login";
import Signup from "../screens/signup";

const Auth = createStackNavigator(
  {
    Login: Login,
    Signup: Signup,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#2286c3",
      },
      headerTintColor: "white",
    },
  }
);

export default createAppContainer(Auth);
