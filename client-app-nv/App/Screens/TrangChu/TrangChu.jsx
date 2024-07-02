import React from 'react'
import Header from './Header'
import { ScrollView } from 'react-native-virtualized-view'
import DanhSachDonHang from './DanhSachDonHang'
export default function TrangChu() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header/>
      <DanhSachDonHang/>
    </ScrollView> 
  )
}