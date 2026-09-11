import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ColorValue, Pressable } from 'react-native';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useAccounts } from '@/providers/AccountsProvider';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: ColorValue;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = 'dark' === colorScheme ? 'dark' : 'light';

  const { isAuth } = useAccounts();

  const [userIsAuthenticated, setUserIsAuthenticated] = useState<Authenticated>(false);

  useEffect(() => {
    setUserIsAuthenticated(isAuth);
  }, [isAuth]);

  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[theme].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="(auth)"
        options={{
          title: 'Sign In',
          href: false === userIsAuthenticated ? '/(tabs)/(auth)/authButtons' : null,
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="sign-in" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(user)"
        options={{
          title: 'User',
          href: true === userIsAuthenticated ? '/(tabs)/(user)/index' : null,
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
