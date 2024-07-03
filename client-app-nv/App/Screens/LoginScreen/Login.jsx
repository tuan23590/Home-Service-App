import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../fireBase/config';

export default function Login({ visible, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const auth = FIREBASE_AUTH;

  useEffect(() => {
    setEmail('');
    setPassword('');
    setPasswordVisible(false);
    setIsForgotPassword(false);
    loadRememberedCredentials();
  }, [visible]);

  const loadRememberedCredentials = async () => {
    try {
      const rememberedEmail = await AsyncStorage.getItem('email');
      const rememberedPassword = await AsyncStorage.getItem('password');
      if (rememberedEmail && rememberedPassword) {
        setEmail(rememberedEmail);
        setPassword(rememberedPassword);
        setRememberMe(true);
      }
    } catch (error) {
      console.error("Failed to load remembered credentials:", error);
    }
  };

  const saveCredentials = async () => {
    try {
      if (rememberMe) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
      } else {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
      }
    } catch (error) {
      console.error("Failed to save credentials:", error);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập email và mật khẩu!");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ!");
      return;
    }
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res.user) {
        saveCredentials();
        onClose();
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.code === 'auth/user-not-found') {
        Alert.alert("Đăng nhập thất bại", "Tài khoản không tồn tại!");
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email') {
        Alert.alert("Đăng nhập thất bại", "Sai email hoặc mật khẩu!");
      } else {
        Alert.alert("Đăng nhập thất bại", 'Lỗi không xác định!');
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Lỗi", "Vui lòng nhập email!");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ!");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Thành công", "Vui lòng kiểm tra email để đặt lại mật khẩu!");
      setIsForgotPassword(false);
    } catch (error) {
      Alert.alert("Lỗi", error.message);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>{isForgotPassword ? 'Quên Mật khẩu' : 'Đăng nhập'}</Text>
          
          {isForgotPassword ? (
            <>
              <TextInput
                autoFocus
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleForgotPassword}
              >
                <Text style={styles.buttonText}>Gửi yêu cầu đặt lại mật khẩu</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.switchButton}
                onPress={() => setIsForgotPassword(false)}
              >
                <Text style={styles.switchButtonText}>Quay lại đăng nhập</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                autoFocus
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Mật khẩu"
                  secureTextEntry={!passwordVisible}
                  value={password}
                  onChangeText={setPassword}
                  style={styles.passwordInput}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                  <Icon name={passwordVisible ? "visibility" : "visibility-off"} size={24} color="gray" style={styles.icon} />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
              >
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>

              <View style={styles.rememberMeContainer}>
                <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                  <Icon name={rememberMe ? "check-box" : "check-box-outline-blank"} size={24} color="gray" />
                </TouchableOpacity>
                <Text style={styles.rememberMeText}>Ghi nhớ tài khoản</Text>
              </View>

              <TouchableOpacity
                style={styles.switchButton}
                onPress={() => setIsForgotPassword(true)}
              >
                <Text style={styles.switchButtonText}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
    padding: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 8,
  },
  icon: {
    padding: 8,
  },
  button: {
    backgroundColor: '#1e90ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  switchButton: {
    marginTop: 10,
  },
  switchButtonText: {
    color: '#1e90ff',
    fontSize: 16,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  rememberMeText: {
    marginLeft: 5,
    fontSize: 16,
  },
});
