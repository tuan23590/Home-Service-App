import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Colors from './../../Utils/Colors'

export default function BookingTime({ onTimeSelect }) {
  const [selected, setSelected] = React.useState();
  useEffect(() => {
    setSelected("2 giờ");
    onTimeSelect("2 giờ");
  }, [])
  return (
    <View style={{ flexDirection: 'row', marginTop: 30}}>
      <TouchableOpacity style={[selected=="2 giờ"?styles.itemSelect:styles.item]}
      onPress={()=>{setSelected("2 giờ"); onTimeSelect("2 giờ")}}
      >
        <Text style={styles.text}>2 giờ</Text>
        <Text>55m²</Text>
        <Text>2 Phòng</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[selected=="3 giờ"?styles.itemSelect:styles.item]}
      onPress={()=>{setSelected("3 giờ"); onTimeSelect("3 giờ")}}
      >
      <Text style={styles.text}>3 giờ</Text>
        <Text>85m²</Text>
        <Text>3 Phòng</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[selected=="4 giờ"?styles.itemSelect:styles.item]}
      onPress={()=>{setSelected("4 giờ"); onTimeSelect("4 giờ")}}
      >
      <Text style={styles.text}>4 giờ</Text>
        <Text>105m²</Text>
        <Text>4 Phòng</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({ 
  text: {
    color: Colors.ORANGE,
    fontSize: 20,
  },
  item: {
    flex: 1,
    width: 100,
    height: 100,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemSelect: {
    flex: 1,
    width: 100,
    height: 100,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.ORANGE,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})