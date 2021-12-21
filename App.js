import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Authcontext } from "./context/auth-context";
import { UserAuth } from "./hooks/auth";
import Auth from "./navigations/auth-navigation";
import LandingNav from "./navigations/navigation-client";

export default function App() {
  const { userId, token, login, logout } = UserAuth();
  let routes;
  if (token) {
    routes = <LandingNav />;
  } else {
    routes = <Auth />;
  }
  return (
    <Authcontext.Provider
      value={{ userId: userId, token: token, login: login, logout: logout }}
    >
      {routes}
    </Authcontext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
