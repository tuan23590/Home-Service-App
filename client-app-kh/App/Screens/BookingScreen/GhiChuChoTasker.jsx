import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from '../../Utils/Colors';
import { DonHangContext } from '../../Provider/DonHangProvider';

export default function GhiChuChoTasker() {
    const {ghiChu,setGhiChu} = useContext(DonHangContext);
  return (
    <View>
       <TextInput
        style={styles.input}
        onChangeText={setGhiChu}
        value={ghiChu}
        multiline={true}
        placeholder="Bạn có yêu cầu gì thêm, hãy nhập ở đây nhé"
      />
    </View>
  )
}
const styles = StyleSheet.create({
    input: {
      height: 200,
      borderWidth: 1,
      padding: 10,
      borderColor: Colors.GRAY,
      borderRadius: 10,
      fontSize: 16,
      textAlignVertical: 'top',
      marginTop: 15
    },
  });