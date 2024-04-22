import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BookingSingle from '../Screens/BookingScreen/BookingSingle';
import BookingMonth from '../Screens/BookingScreen/BookingMonth';
import TrangChu from '../Screens/TrangChu/TrangChu';

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false,
    }}>
        <Stack.Screen name="TrangChu" component={TrangChu} />
        <Stack.Screen name="BookingSingle" component={BookingSingle} />
        <Stack.Screen name="BookingMonth" component={BookingMonth} />
    </Stack.Navigator>
  )
}