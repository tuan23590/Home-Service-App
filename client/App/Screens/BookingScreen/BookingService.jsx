import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from './../../Utils/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function BookingService() {
  return (
    <View style={{ flexDirection: 'row', marginTop: 30}}>
      <View style={styles.container}></View>
      <View style={styles.item}>
        <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="iron-outline" size={35} color="black" />
        </View>
        <Text style={styles.itemText}>Ủi đồ</Text>
        <Text>+1 giờ</Text>
      </View>

      <View style={styles.container}></View>
      <View style={styles.item}>
        <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="food-takeout-box-outline" size={35} color="black" /> 
               </View>
        <Text style={styles.itemText}>Nấu ăn</Text>
        <Text>+1 giờ</Text>
      </View>

      <View style={styles.container}></View>
      <View style={styles.item}>
        <View style={styles.iconContainer}>
        <MaterialIcons name="cleaning-services" size={35} color="black" />   
      </View>
        <Text style={styles.itemText}>Mang theo dụng cụ</Text>
        <Text>+30,000 VND</Text>
      </View>

      <View style={styles.container}></View>
      <View style={styles.item}>
        <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="vacuum-outline" size={35} color="black" />
      </View>
        <Text style={styles.itemText}>Mang theo máy hút bụi</Text>
        <Text>+20,000 VND</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({ 
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: Colors.PURPLE,
    borderRadius: 10,
    padding: 10,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    marginTop: 5,
    fontWeight: 'bold',
  },
})