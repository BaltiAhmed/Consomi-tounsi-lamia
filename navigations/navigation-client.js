import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import IconFontisto from "react-native-vector-icons/Fontisto";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Landing from '../screens/landing'
import DetailArticle from "../screens/detail-article";
import Profile from "../screens/profile";
import Panier from "../screens/panier";
import ListCommande from "../screens/listeCommande";
import ListArticleCommande from "../screens/listArticleCommande";

const HomeNav = createStackNavigator(
  {
    Landing: Landing,
    DetailArticle: DetailArticle
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

const ProfileNav = createStackNavigator(
  {
    Profile: Profile,

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

const PaniereNav = createStackNavigator(
  {
    Panier: Panier,

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

const CommandeNav = createStackNavigator(
  {
    ListCommande: ListCommande,
    ListArticleCommande: ListArticleCommande,

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

const AppNav = createMaterialBottomTabNavigator(
  {
    Acceuil: {
      screen: HomeNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <IconFontAwesome name="list-ol" size={25} color="#fafafa" />;
        },
        tabBarColor: "#0086c3",
      },
    },
    Profile: {
      screen: ProfileNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <IconFontisto name="person" size={25} color="#fafafa" />;
        },
        tabBarColor: "#0086c3",
      },
    },
    Panier: {
      screen: PaniereNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <IconFontAwesome name="cart-plus" size={25} color="#fafafa" />;
        },
        tabBarColor: "#0086c3",
      },
    },
    Commandes: {
      screen: CommandeNav,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Entypo name="list" size={25} color="#fafafa" />;
        },
        tabBarColor: "#0086c3",
      },
    },
  },
  {
    activeColor: "white",
    shifting: true,
  }
);

export default createAppContainer(AppNav);
