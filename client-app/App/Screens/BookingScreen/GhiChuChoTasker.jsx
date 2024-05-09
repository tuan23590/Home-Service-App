import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../Utils/Colors';

export default function GhiChuChoTasker() {
    const [text, onChangeText] = useState('');
  return (
    <View>
       <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
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