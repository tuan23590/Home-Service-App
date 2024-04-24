import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalAPI from '../../Utils/GlobalAPI'
import Colors from '../../Utils/Colors'


export default function BookingService({onselectedDichVu}) {
  const [dichVus, setDichVus] = useState([]);
  
  useEffect(() => {getDichVus()}, [])
  const getDichVus = async () => {
    GlobalAPI.getDichVus().then(res => {
      setDichVus(res?.DichVus)
    })
  }

  const [selectedItem, setSelectedItem] = useState(null);

  const handlePress = (item) => {
    setSelectedItem(item);
    onselectedDichVu(item);
  }

  return (
    <>
      <FlatList
        data={dichVus}
        numColumns={3}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', marginTop: 20, flex: 1 }}>
            <TouchableOpacity
              style={{ alignItems: "center", width: "100%" }}
              onPress={() => handlePress(item)}
            >
              <View style={[styles.item, selectedItem === item && { borderColor: Colors.ORANGE }]}>
                <Image 
                  source={{ uri: selectedItem === item ? item?.icon : item?.iconSelected }}
                  style={{ width: 50, height: 50 }} 
                />
              </View>
              <View>
                <Text style={[styles.itemText, selectedItem === item && { color: Colors.ORANGE }]}>
                  {item?.tenDichVu}
                </Text>
                {item?.giaTien && (
                  <Text style={[styles.itemText, selectedItem === item && { color: Colors.ORANGE }]}>
                    + {item?.giaTien} đ
                  </Text>
                )}
                {item?.thoiGian && (
                  <Text style={[styles.itemText, selectedItem === item && { color: Colors.ORANGE }]}>
                    + {item?.thoiGian} giờ
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