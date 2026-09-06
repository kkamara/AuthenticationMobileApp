import React from 'react';
import { Tabs, } from "expo-router";

export default function ExampleLayout() {
  return <Tabs backBehavior="history" screenOptions={{ tabBarStyle: { display: 'none', }, }}>
    <Tabs.Screen
      name="authButtons"
      options={{
        headerShown: false,
      }}
    />
  </Tabs>;
}