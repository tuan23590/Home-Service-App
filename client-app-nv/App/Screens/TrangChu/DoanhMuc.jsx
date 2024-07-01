import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalAPI'
import Colors from '../../Utils/Colors'
import { Shadow } from 'react-native-shadow-2'
import Heading from '../../Compunents/Heading'
import BookingSingle from './../BookingScreen/BookingSingle';
import DonHangProvider from '../../Provider/DonHangProvider'
import { ScrollView } from 'react-native-virtualized-view'
import { ModalContext } from '../../Provider/ModalProvider'
import { FIREBASE_AUTH } from '../../fireBase/config'

export default function DoanhMuc() {
    const auth = FIREBASE_AUTH;
    const {isModal1Visible, setModal1Visible} = useContext(ModalContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {getCategories()}, [])
    const getCategories = async () => {
        GlobalApi.getCategory().then(res => {
            setCategories(res?.categories)
        })
    }
    const handlePress = () => {
      if (!auth.currentUser) {
        Alert.alert("Lỗi", "Vui lòng đăng nhập để tiếp tục!")
        return
      }
      setModal1Visible(true)
    }
  return (
    
    <View>
      <Heading text='Doanh mục' isViewAll={true}/>
      <FlatList
      data={categories}
      numColumns={4}
      renderItem={({item, index}) => index<=3&&(
        <TouchableOpacity style={styles.container} 
        // onPress={() => navigation.push(item.type, {category: item,index: index})}
        onPress={() => handlePress()}
        >
          <View style={styles.iconContainer}>
          <Shadow distance={5} startColor={Colors.ORANGE} endColor={Colors.WHITE} offset={[2, 3]}>
          <Image source={{ uri: item?.icon?.url }} 
          style={styles.icon}/>
          </Shadow>
          <Text>{item?.name} {item?.name != "Giúp việc theo giờ" && ("(coming soon)") }</Text>
        </View>
        </TouchableOpacity>
      )}
      />
      <Modal
      animationType='slide'
      visible={isModal1Visible}
      style={{top: -20}}
      >
        <DonHangProvider>
        <ScrollView>
        <BookingSingle hideModal={()=>setModal1Visible(false)}/>
        </ScrollView>
        </DonHangProvider>
      </Modal>
    </View>
    
  )
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
  },
    iconContainer: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginBottom: 10
    }
})