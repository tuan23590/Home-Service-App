import React, { useContext } from 'react'
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
import TrangChu from '../Screens/TrangChu/TrangChu.jsx';
const Tab = createBottomTabNavigator();
import Entypo from '@expo/vector-icons/Entypo';

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.ORANGE,
    }}>
    <Tab.Screen name="NV-TrangChu" component={TrangChu}
      options={{
        tabBarLabel: ({color})=>(
          <Text style={{color:color,fontSize: 12,marginTop:-7}}>Trang chủ</Text>
        ),
        tabBarIcon: ({color,size})=>(
          <AntDesign name="home" size={size} color={color} />
        )
      }}
      />

    <Tab.Screen name="HoatDong" component={ActivateScreen}
      options={{
        tabBarLabel: ({color})=>(
          <Text style={{color:color,fontSize: 12,marginTop:-7}}>Lịch làm việc</Text>
        ),
        tabBarIcon: ({color,size})=>(
          <AntDesign name="calendar" size={size} color={color} />
        )
      }} />


    {/* <Tab.Screen name="KhuyenMai" component={PromotionScreen}
      options={{
        tabBarLabel: ({color})=>(
          <Text style={{color:color,fontSize: 12,marginTop:-7}}>Khuyến mãi</Text>
        ),
        tabBarIcon: ({color,size})=>(
          <AntDesign name="gift" size={size} color={color} />
        )
      }} /> */}
      <Tab.Screen name="ThongBao" component={NotifyScreen}
      options={{
        tabBarLabel: ({color})=>(
          <Text style={{color:color,fontSize: 12,marginTop:-7}}>Danh sách ĐH</Text>
        ),
        tabBarIcon: ({color,size})=>(
          <Entypo name="text-document" size={size} color={color} />
        )
      }} />
      <Tab.Screen name="TaiKhoan" component={ProfileScreen}
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