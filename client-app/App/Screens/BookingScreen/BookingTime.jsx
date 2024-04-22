import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from './../../Utils/Colors'

export default function BookingTime() {
  return (
    <View style={{ flexDirection: 'row', marginTop: 30}}>
      <View style={styles.item}>
        <Text style={styles.text}>2 giờ</Text>
        <Text>55m²</Text>
        <Text>2 Phòng</Text>
      </View>
      <View style={styles.item}>
      <Text style={styles.text}>3 giờ</Text>
        <Text>85m²</Text>
        <Text>3 Phòng</Text>
      </View>
      <View style={styles.item}>
      <Text style={styles.text}>4 giờ</Text>
        <Text>105m²</Text>
        <Text>4 Phòng</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({ 
  text: {
    color: Colors.PURPLE,
    fontSize: 20,
  },
  item: {
    flex: 1,
    width: 100,
    height: 100,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.PURPLE,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})