import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from './../../Utils/Colors';

export default function Header() {
    const [user, setUser] = useState({
        name: 'Tuấn',
        imageUrl: 'https://down-vn.img.susercontent.com/file/bf1a1fb91e7c1b303b614276070f6b4e'
    });

    return user && (
        <>
        <ImageBackground source={{ uri: 'https://img.freepik.com/free-photo/blurred-abstract-background_58702-1515.jpg' }} style={styles.container}>
            <View>
                <Image source={{ uri: user?.imageUrl }} 
                style={styles.userImage} />
                <Text style={{color:Colors.WHITE,fontSize:15}}>
                    Xin chào, {user?.name}
                </Text>
            </View>
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