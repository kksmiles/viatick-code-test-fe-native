import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TailwindProvider } from "tailwind-rn";
import { View } from "react-native";
import utilities from "./tailwind.json";
import Weather from "./src/pages/Weather";
import Welcome from "./src/pages/Welcome";
import DeviceIndex from "./src/pages/devices/Index";
import DeviceShow from "./src/pages/devices/Show";
import Search from "./src/pages/Search";
import Add from "./src/pages/Add";
import Stats from "./src/pages/Stats";
import Profile from "./src/pages/Profile";
import Icon from "@expo/vector-icons/FontAwesome5";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      inititalRouteName="Welcome"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === "Devices") {
            iconName = "home";
          } else if (rn === "Search") {
            iconName = "search";
          } else if (rn === "Add") {
            iconName = "plus";
          } else if (rn === "Stats") {
            iconName = "chart-bar";
          } else if (rn === "Profile") {
            iconName = "user";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarLabel: "",
        tabBarStyle: {
          paddingTop: 10,
        },
      })}
    >
      <Tab.Screen
        name="Devices"
        component={DeviceIndex}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Add" component={Add} />
      <Tab.Screen name="Stats" component={Stats} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Weather"
            component={Weather}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DeviceDetails"
            component={DeviceShow}
            options={{
              headerBackTitleVisible: false,
              headerTintColor: "black",
              headerRight: () => <Icon name="cog" size={20} color="black" />,
              headerTitle: "",
              headerStyle: {
                backgroundColor: "#F7F7F7",
              },
            }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}

export default App;
