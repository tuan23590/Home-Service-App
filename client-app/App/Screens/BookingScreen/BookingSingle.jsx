import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import HeaderBooking from './HeaderBooking'
import Heading from './../../Compunents/Heading'
import BookingTime from './BookingTime'
import BookingService from './BookingService';
import BookingOption from './BookingOption'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors'

export default function BookingSingle({hideModal}) {
  const [selected, setSelected] = useState();
  return (
    <View>
       <View style={{padding: 20}}> 
     <TouchableOpacity style={{display:'flex',flexDirection:'row',gap: 10,
    alignItems: 'center'}}
    onPress={()=>hideModal()}
    >
     <Ionicons name="chevron-back-sharp" size={24} color="black" />
      <Text style={{fontSize:17}}>Tạo đơn</Text>
     </TouchableOpacity>
    </View>
    <View style={{marginHorizontal:20}}>
      <Heading text={"Thời lượng"} description={"Ước lượng thời gian cần dọn dẹp"}/>
      <BookingTime onTimeSelect={setSelected} />
      <Heading text={"Dịch vụ thêm"} description={"Chọn dịch vụ thêm"}/>
      <BookingService />
      <Heading text={"Tùy chọn"}/>
      <BookingOption />
      <TouchableOpacity 
        onPress={()=>alert(selected)}
      >
        <Text style={styles.confirmBtn}>Tiếp theo</Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({ 
  confirmBtn:{
    backgroundColor: Colors.ORANGE,
    color: 'white',
    padding: 15,
    textAlign: 'center',
    borderRadius: 10,
    marginTop: 20,
    fontSize: 17
  }
})