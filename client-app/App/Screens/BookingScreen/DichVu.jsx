import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../../Utils/Colors'
import { DonHangContext } from '../../Provider/DonHangProvider';



export default function DichVu({data}) {
  const {setChonDichVuThem,thoiGianLamViec} = useContext(DonHangContext);
  const [selectedItem, setSelectedItem] = useState([]);



  const calculateTotalTime = () => {
    let totalTime = thoiGianLamViec;
    selectedItem.forEach(item => {
      totalTime += item.thoiGian || 0;
    });
    return totalTime;
  };


  const handlePress = (item) => {
    setSelectedItem(prevSelectedItems => {
      const isExist = prevSelectedItems.includes(item);
      if (isExist) {
        return prevSelectedItems.filter(selectedItem => selectedItem !== item);
      } 
      else {
        const total = calculateTotalTime() + (item.thoiGian || 0);
        if (total <= 4) {
          return [...prevSelectedItems, item];
        } else {
          alert("Tổng thời gian vượt quá 4 giờ");
          return prevSelectedItems;
        }
      }
    });
  };
  
useEffect(() => {
    setChonDichVuThem(selectedItem);
}, [selectedItem]);


const renderItem = ({ item }) => (
  <TouchableOpacity
    style={[selected === item.label ? styles.itemSelect : styles.item]}
    onPress={() => { setSelected(item.label); onTimeSelect(item.label) }}
  >
    <Text style={styles.text}>{item.label} giờ</Text>
    <Text>{item.size}</Text>
    <Text>{item.rooms}</Text>
  </TouchableOpacity>
);

return (
  <>
    <FlatList
      data={data}
      numColumns={3}
      renderItem={({ item, index }) => (
        <View style={{ flexDirection: 'row', marginTop: 20, flex: 1 }}>
          <TouchableOpacity
            style={{ alignItems: "center", width: "100%" }}
            onPress={() => handlePress(item)}
          >
            <View style={[styles.item, selectedItem.includes(item) && { borderColor: Colors.ORANGE }]}>
              <Image 
                source={{ uri: selectedItem.includes(item) ? item?.iconSelected : item?.icon }}
                style={{ width: 50, height: 50 }} 
              />
            </View>
            <View>
              <Text style={[styles.itemText, selectedItem.includes(item) && { color: Colors.ORANGE }]}>
                {item?.tenDichVu}
              </Text>
              {item?.gia && (
                <Text style={[styles.itemText, selectedItem.includes(item) && { color: Colors.ORANGE }]}>
                  +{item?.gia} VND
                </Text>
              )}
              {item?.thoiGian && (
                <Text style={[styles.itemText, selectedItem.includes(item) && { color: Colors.ORANGE }]}>
                  +{item?.thoiGian}h
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  </>
);

}

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,

    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    textAlign: "center"
  }
});