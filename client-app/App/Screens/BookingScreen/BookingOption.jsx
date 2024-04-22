import { View, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function BookingOption() {
    return (
        <View>
            <View style={{ marginBottom: 10,flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign name="hearto" size={22} color="black" />
                <Text style={{ marginLeft: 5 }}>Ưu tiên người làm yêu thích </Text>
                <AntDesign name="questioncircleo" size={15} color="black" />
                <Switch style={{ position: 'absolute', right: 0 }} />
            </View>
            <View style={{ marginBottom: 10,flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="pets" size={22} color="black" />
                <Text style={{ marginLeft: 5 }}>Nhà có thú cưng </Text>
                <AntDesign name="questioncircleo" size={15} color="black" />
                <Switch style={{ position: 'absolute', right: 0 }} />
            </View>
            <View>
                <Text style={{fontWeight: "bold"}}>*Lưu ý:</Text>
                <Text>dịch vụ chỉ hỗ trợ tối đa 4 giờ. Nếu bạn muốn đặt thêm, vui lồng đặt 2 công việc có khung giờ gần nhau.</Text>
            </View>
        </View>
    );
}
