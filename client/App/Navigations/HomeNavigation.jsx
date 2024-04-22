import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './../Screens/HomeScreen/HomeScreen';
import BookingSingle from './../Screens/BookingScreen/BookingSingle';
import BookingMonth from './../Screens/BookingScreen/BookingMonth';

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false,
    }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BookingSingle" component={BookingSingle} />
        <Stack.Screen name="BookingMonth" component={BookingMonth} />
    </Stack.Navigator>
  )
}