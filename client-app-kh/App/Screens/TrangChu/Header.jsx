import { View, Text, Image, StyleSheet, ImageBackground,TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Colors from './../../Utils/Colors';
import Login from '../LoginScreen/Login';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../fireBase/config';
import { Button } from '@rneui/themed';




export default function Header() {
    const [user, setUser] = useState(User||null); 
    const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, [User,FIREBASE_AUTH]);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
    return (
        <>
        <ImageBackground source={{ uri: 'https://img.freepik.com/free-photo/blurred-abstract-background_58702-1515.jpg' }} style={styles.container}>
            <TouchableOpacity onPress={toggleModal}>
            <View>
                <Image source={{ uri: user?.photoURL || 'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'}} 
                style={styles.userImage} />
                <Text style={{color:Colors.WHITE,fontSize:15}}>
                    Xin chào, {user?.displayName || 'Khách'}
                </Text>
                {user ? (
            <Button onPress={()=>{FIREBASE_AUTH.signOut();}}>Đăng xuất</Button>
        ):(
            <Button onPress={toggleModal}>Đăng nhập</Button>
        )}
            </View>
            </TouchableOpacity >
            <Login visible={modalVisible} onClose={toggleModal} />
        </ImageBackground>
        
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0'
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 50
    }
})