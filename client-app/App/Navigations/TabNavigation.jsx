import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './../Screens/ProfileScreen/ProfileScreen';
import { Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../Utils/Colors.js';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import NotifyScreen from './../Screens/NotifyScreen/NotifyScreen';
import PromotionScreen from './../Screens/PromotionScreen/PromotionScreen';
import ActivateScreen from './../Screens/ActivateScreen/ActivateScreen';
import HomeNavigation from './HomeNavigation';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.PRIMARY,
    }}>
      <Tab.Screen name="Main" component={HomeNavigation}
      options={{
        tabBarLabel: ({color})=>(
          <Text style={{color:color,fontSize: 12,marginTop:-7}}>Trang chủ</Text>
        ),
        tabBarIcon: ({color,size})=>(
          <AntDesign name="home" size={size} color={color} />
        )
      }}
      />

    <Tab.Screen name="Activate" component={ActivateScreen}
      options={{
        tabBarLabel: ({color})=>(
          <Text style={{color:color,fontSize: 12,marginTop:-7}}>Hoạt động</Text>
        ),
        tabBarIcon: ({color,size})=>(
          <FontAwesome6 name="newspaper" size={size} color={color} />
        )
      }} />


    <Tab.Screen name="Promotion" component={PromotionScreen}
      options={{
        tabBarLabel: ({color})=>(
          <Text style={{color:color,fontSize: 12,marginTop:-7}}>Khuyến mãi</Text>
        ),
        tabBarIcon: ({color,size})=>(
          <AntDesign name="gift" size={size} color={color} />
        )
      }} />
      <Tab.Screen name="Notify" component={NotifyScreen}
      options={{
        tabBarLabel: ({color})=>(
          <Text style={{color:color,fontSize: 12,marginTop:-7}}>Thông báo</Text>
        ),
        tabBarIcon: ({color,size})=>(
          <Ionicons name="notifications-outline" size={size} color={color} />
        )
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen}
      options={{
        tabBarLabel: ({color})=>(
          <Text style={{color:color,fontSize: 12,marginTop:-7}}>Tài khoản</Text>
        ),
        tabBarIcon: ({color,size})=>(
          <AntDesign name="user" size={size} color={color} />
        )
      }} />
     

   
   
    </Tab.Navigator>
  )
}