import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalAPI'
import Colors from '../../Utils/Colors'
import { Shadow } from 'react-native-shadow-2'
import Heading from '../../Compunents/Heading'
import { useNavigation } from '@react-navigation/native'
export default function Categories() {
    const [categories, setCategories] = useState([])
    const navigation = useNavigation();

    useEffect(() => {getCategories()}, [])
    const getCategories = async () => {
        GlobalApi.getCategory().then(res => {
            setCategories(res?.categories)
        })
    }
  return (
    <View>
      <Heading text='Doanh mục' isViewAll={true}/>
      <FlatList
      data={categories}
      numColumns={4}
      renderItem={({item, index}) => index<=3&&(
        <TouchableOpacity style={styles.container} 
        onPress={() => navigation.push(item.type, {category: item,index: index})}
        >
          <View style={styles.iconContainer}>
          <Shadow distance={5} startColor={'#a475ba'} endColor={'#ff00ff10'} offset={[2, 3]}>
          <Image source={{ uri: item?.icon?.url }} 
          style={styles.icon}/>
          </Shadow>
          <Text>{item?.name}</Text>
        </View>
        </TouchableOpacity>
      )}
      />
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