import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from './../../Utils/Colors'
import GlobalAPI from '../../Utils/GlobalAPI';

export default function BookingTime({ thoiGianChonDichVuThem,onTimeSelect}) {
  const [selected, setSelected] = React.useState();
  const [dichVuCaLe, setDichVuCaLe] = useState([]);

  useEffect(() => {
    const fetchDichVuCaLe = async () => {
      try {
        const res = await GlobalAPI.getDichVuCaLe();
        if (res?.DichVuCaLe) {
          setDichVuCaLe(res.DichVuCaLe);
          if (res.DichVuCaLe.length > 0) {
            setSelected(res.DichVuCaLe[0]);
            onTimeSelect(res.DichVuCaLe[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching dich vus:", error);
      }
    };
    fetchDichVuCaLe();
  }, []);


  useEffect(() => {
    console.log('thoiGianChonDichVuThem = ', thoiGianChonDichVuThem);
  }, [thoiGianChonDichVuThem]);


  const handlePress = (item) => {
    setSelected(item);
    onTimeSelect(item);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[selected === item ? styles.itemSelect : styles.item]}
      onPress={() => { handlePress(item) }}
    >
      <Text style={styles.text}>{item.thoiGian} giờ</Text>
      <Text>{item.moTaDichVu}m²</Text>
      <Text>{parseInt(parseInt(item.moTaDichVu) / 25)} Phòng</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={dichVuCaLe}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      contentContainerStyle={{ marginTop: 10 }}
      showsHorizontalScrollIndicator={false}
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
