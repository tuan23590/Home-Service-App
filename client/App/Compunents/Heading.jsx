import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Heading({text,description = "",isViewAll=false}) {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.heading}>{text}</Text>
        {isViewAll && <Text>Xem thêm</Text>}
      </View>
      {description !== "" && <Text style={{marginTop: -15}}>{description}</Text>}
    </View>
  )
}
const styles = StyleSheet.create({
    heading:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    container:{
      marginVertical:20,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
 })