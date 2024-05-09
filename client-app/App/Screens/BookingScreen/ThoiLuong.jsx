import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from './../../Utils/Colors'
import { DonHangContext } from '../../Provider/DonHangProvider';


export default function ThoiLuong({data}) {

  const {chonThoiLuong, setChonThoiLuong} = useContext(DonHangContext);

  useEffect(() => { 
    handlePress(data[0]);
   }, [data]);

  const [itemSelected, setItemSelected] = useState();
  const handlePress = (item) => {
    setChonThoiLuong(item);
    setItemSelected(item);
  }


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[itemSelected === item ? styles.itemSelect : styles.item]}
      onPress={() => handlePress(item) }
    >
      <Text style={styles.text}>{item.thoiGian} giờ</Text>
      <Text>{item.moTaDichVu}m²</Text>
      <Text>{parseInt(parseInt(item.moTaDichVu) / 25)} Phòng</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      numColumns={4}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ marginTop: 10 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({ 
  text: {
    color: Colors.ORANGE,
    fontSize: 20,
  },
  item: {
    flex: 1,
    width: 95,
    height: 95,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemSelect: {
    flex: 1,
    width: 95,
    height: 95,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.ORANGE,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
