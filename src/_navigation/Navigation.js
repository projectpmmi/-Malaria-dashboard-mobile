import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screems/Login";
import ChoiceParameters from "../screems/ChoiceParameters";
import GraphContent from "../screems/GraphContent";
import i18n from "i18n-js";
import Icon from "react-native-vector-icons/FontAwesome";
import Graph1 from "../_components/Graph1";
import Graph2 from "../_components/Graph2";
import LineGraph from "../_components/LineGraph";

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Graph1"
        component={Graph1}
        options={{
          headerShown: false,
          tabBarLabel: "Bar Chart1",
          //tabBarLabelStyle​: {color: '#ffffff', fontWeight: 'bold'},
          tabBarIcon: ({ color, size }) => (
            <Icon name="bar-chart-o" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Graph2"
        component={Graph2}
        options={{
          headerShown: false,
          tabBarLabel: "Bar Chart2",
          tabBarIcon: ({ color, size }) => (
            <Icon name="bar-chart-o" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LineGraph"
        component={LineGraph}
        options={{
          headerShown: false,
          tabBarLabel: "Line Chart",
          //tabBarLabelStyle​: {color: '#ffffff', fontWeight: 'bold'},
          tabBarIcon: ({ color, size }) => (
            <Icon name="line-chart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer initialRouteName={Login}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: i18n.t("page-login") }}
        />
        <Stack.Screen
          name="Parameters"
          component={ChoiceParameters}
          options={{ title: i18n.t("page-parameters") }}
        />
        <Stack.Screen
          name="Charts"
          component={BottomTabNavigator}
          options={{ title: i18n.t("page-dashboard") }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
