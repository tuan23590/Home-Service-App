import { View, Text, Switch, Modal, Button, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import Heading from './../../Compunents/Heading';
import { CheckBox,Input } from '@rneui/themed';

export default function TuyChon({onselectedVatNuoi}) {
    const [isSwitchOn1, setIsSwitchOn1] = useState(false);
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [vatNuoi, setVatNuoi] = useState('');
    const [openThuCung, setOpenThuCung] = useState(false);
    const [text, onTextChange] = useState('');

    const handleModal = () => {
        setOpenThuCung(false)
        setVatNuoi('');
        
        if (isChecked1) 
            setVatNuoi(vatNuoi => vatNuoi ? `${vatNuoi}, Chó` : 'Chó');

        if (isChecked2) 
            setVatNuoi(vatNuoi => vatNuoi ? `${vatNuoi}, Mèo` : 'Mèo');
        
        if(text != '')
            {
                setVatNuoi(vatNuoi => vatNuoi ? `${vatNuoi}, ${text}` : text);  
            }
    }
    useEffect(() => {
        onselectedVatNuoi(vatNuoi);        
    }, [openThuCung]);
    return (
        <View>
            <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign name="hearto" size={22} color="black" />
                <Text style={{ marginLeft: 5 }}>Ưu tiên người làm yêu thích </Text>
                <AntDesign name="questioncircleo" size={15} color="black" />
                <Switch
                    style={{ position: 'absolute', right: 0}}
                    value={isSwitchOn1}
                    onValueChange={setIsSwitchOn1}
                    trackColor={{true: Colors.GREEN}}
                    thumbColor={isSwitchOn1 ? Colors.GREEN : 'gray'}
                />
            </View>
            <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="pets" size={22} color="black" />
                <Text style={{ marginLeft: 5 }}>Nhà có thú cưng </Text>
                <AntDesign name="questioncircleo" size={15} color="black" />
                <Switch
                    style={{ position: 'absolute', right: 0 }}
                    value={openThuCung}
                    onValueChange={setOpenThuCung}
                    trackColor={{true: Colors.GREEN}}
                    thumbColor={openThuCung ? Colors.GREEN : 'gray'}
                />
            </View>
            <View>
                <Text style={{ fontWeight: "bold" }}>*Lưu ý:</Text>
                <Text>dịch vụ chỉ hỗ trợ tối đa 4 giờ. Nếu bạn muốn đặt thêm, vui lồng đặt 2 công việc có khung giờ gần nhau.</Text>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={openThuCung}
            >
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    activeOpacity={1}
                    onPressOut={() => handleModal()}
                >
                    <View style={styles.modalView}>
                        <Heading text="Chọn loại thú cưng" />
                        <Text>Một số Tasker bị dị ứng với lông hoặc không thích động vật. Vậy nên bạn cần ghi rõ vật nuôi trong nhà nếu có, để tránh Tasker nhận việc mà không làm được.</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox
                            title="Chó"
                            checked={isChecked1}
                            onPress={()=>{setIsChecked1(!isChecked1)}}
                        />
                        <CheckBox
                            title="Mèo"
                            checked={isChecked2}
                            onPress={()=>{setIsChecked2(!isChecked2)}}
                        />
                    </View>
                    
                    <Text>Khác</Text>

                    <TextInput  
                    onChangeText={onTextChange}
                    value={text} 
                    style={styles.input} 
                    selectionColor={Colors.ORANGE} />

                    <TouchableOpacity onPress={()=>handleModal()}>
                        <Text style={styles.btnConform}>Xác Nhận</Text>
                    </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

        </View>
    );
}
const styles = StyleSheet.create({
    modalView: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        height: 300,
    },input:{
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    btnConform:{
        backgroundColor: Colors.GREEN,
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        color: 'white',
    }
    
  });