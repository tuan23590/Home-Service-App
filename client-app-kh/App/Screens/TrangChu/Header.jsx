import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from './../../Utils/Colors';

export default function Header() {
    const [user, setUser] = useState({
        name: 'Tuấn',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
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