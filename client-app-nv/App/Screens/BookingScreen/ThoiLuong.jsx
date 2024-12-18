import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from './../../Utils/Colors'
import { DonHangContext } from '../../Provider/DonHangProvider';
import GlobalAPI from '../../Utils/GlobalAPI';

export default function ThoiLuong() {

  const [thoiLuongChinh, setThoiLuongChinh] = useState();
  const [dataDichVuCaLe, setDataDichVuCaLe] = useState([]);
  const {setThoiLuong,dichVuThem, setDichVuChinh} = useContext(DonHangContext);
  const [itemSelected, setItemSelected] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await GlobalAPI.getDichVuCaLe();
      setDataDichVuCaLe([{thoiGian: 2, khoiLuongCongViec: 'Tối đa 55m2 hoặc 2 phòng',id: data.DichVuCaLe[0].id, gia: data.DichVuCaLe[0].gia*2}, {thoiGian: 3, khoiLuongCongViec: 'Tối đa 85m2 hoặc 3 phòng',id: data.DichVuCaLe[0].id, gia: data.DichVuCaLe[0].gia*3}, {thoiGian: 4, khoiLuongCongViec: 'Tối đa 105m2 hoặc 4 phòng',id: data.DichVuCaLe[0].id, gia: data.DichVuCaLe[0].gia*4}]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if(thoiLuongChinh === undefined)
      setThoiLuongChinh(itemSelected);
    const tongThoiGianDichVuThem = dichVuThem?.reduce((total, dichVu) => total + (dichVu.thoiGian || 0), 0);
    const selectedElement = dataDichVuCaLe.find(element => element?.thoiGian === tongThoiGianDichVuThem+thoiLuongChinh?.thoiGian);
    setItemSelected(selectedElement);
    setDichVuChinh(selectedElement);
  }, [dichVuThem]);
  
  

  useEffect(() => { 
    handlePress(dataDichVuCaLe[0]);
   }, [dataDichVuCaLe]);

  

  const handlePress = (item) => {
    setThoiLuong(item);
    setDichVuChinh(item);
    setThoiLuongChinh(item);
    setItemSelected(item);
  }





  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[itemSelected === item ? styles.itemSelect : styles.item]}
      onPress={() => handlePress(item) }
    >
      <Text style={styles.text}>{item.thoiGian} giờ</Text>
      <Text>{item.khoiLuongCongViec}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={dataDichVuCaLe}
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
    height: 70,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemSelect: {
    flex: 1,
    height: 70,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.ORANGE,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
