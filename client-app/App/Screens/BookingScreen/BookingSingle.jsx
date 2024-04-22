import { View, Text } from 'react-native'
import React from 'react'
import HeaderBooking from './HeaderBooking'
import Heading from './../../Compunents/Heading'
import BookingTime from './BookingTime'
import BookingService from './BookingService';
import BookingOption from './BookingOption'
export default function BookingSingle() {
  return (
    <View>
      <HeaderBooking />
    <View style={{marginHorizontal:20}}>
      <Heading text={"Thời lượng"} description={"Ước lượng thời gian cần dọn dẹp"}/>
      <BookingTime />
      <Heading text={"Dịch vụ thêm"} description={"Chọn dịch vụ thêm"}/>
      <BookingService />
      <Heading text={"Tùy chọn"}/>
      <BookingOption />
    </View>
    </View>
  )
}