import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../../Utils/Colors'
import { DonHangContext } from '../../Provider/DonHangProvider';
import GlobalAPI from '../../Utils/GlobalAPI';



export default function DichVuThem() {
  const {setDichVuThem,thoiLuong} = useContext(DonHangContext);
  const [selectedItem, setSelectedItem] = useState([]);
  const [dataDichVuThem, setDataDichVuThem] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GlobalAPI.getDichVuThem();
        if (data?.DichVuThem) {
          setDataDichVuThem(data.DichVuThem);
        }
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    fetchData();
  }, []);

  const handlePress = (item) => {
    if (item.thoiGian === null) {
      setSelectedItem(selectedItem.includes(item) ? selectedItem.filter((i) => i !== item) : [...selectedItem, item]);
      return;
    }
    const totalThoiGian = selectedItem.reduce((total, selectedItem) => {
      return total + (selectedItem.thoiGian || 0);
    }, 0);
    if (!selectedItem.includes(item)) {
      if (totalThoiGian + thoiLuong.thoiGian === 4) {
        alert("Không thể thêm dịch vụ vì đã đạt tối đa thời gian.");
        return;
      }
    }
    setSelectedItem(selectedItem.includes(item) ? selectedItem.filter((i) => i !== item) : [...selectedItem, item]);
  };
  


useEffect(() => {
  setDichVuThem(selectedItem);
}, [selectedItem]);

useEffect(() => {
  setSelectedItem([]);
}, [thoiLuong]);

return (
  <>
    <FlatList
      data={dataDichVuThem}
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