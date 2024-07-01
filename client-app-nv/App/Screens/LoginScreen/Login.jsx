import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../fireBase/config';
import GlobalAPI from '../../Utils/GlobalAPI';

export default function Login({ visible, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setPhone('');
    setIsSignUp(false);
    setPasswordVisible(false);
    setConfirmPasswordVisible(false);
    setIsForgotPassword(false);
  }, [visible]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    return phoneRegex.test(phone);
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
        onClose();
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert("Đăng nhập thất bại", "Tài khoản không tồn tại!");
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email') {
        Alert.alert("Đăng nhập thất bại", "Sai email hoặc mật khẩu!");
      } else {
        Alert.alert("Đăng nhập thất bại",'Lỗi không xác định!');
      }
    }
  };

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !name || !phone) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu không khớp!");
      return;
    }
    if (!isValidPhone(phone)) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ!");
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res.user) {
        await GlobalAPI.apiThemKhachHang(name, phone, email, res.user.uid);
        Alert.alert("Đăng ký thành công!", "Tạo tài khoản thành công!");
        onClose();
      }
    } catch (error) {
      Alert.alert("Đăng ký thất bại!", error.message);
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
          <Text style={styles.title}>{isForgotPassword ? 'Quên Mật khẩu' : isSignUp ? 'Đăng ký' : 'Đăng nhập'}</Text>
          
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
              {isSignUp && (
                <>
                  <TextInput
                    autoFocus={isSignUp}
                    placeholder="Tên"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Số Điện thoại"
                    value={phone}
                    onChangeText={setPhone}
                    style={styles.input}
                    keyboardType="numeric"
                  />
                </>
              )}
              
              <TextInput
                autoFocus={!isSignUp}
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
              
              {isSignUp && (
                <View style={styles.passwordContainer}>
                  <TextInput
                    placeholder="Nhập lại Mật khẩu"
                    secureTextEntry={!confirmPasswordVisible}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={styles.passwordInput}
                  />
                  <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                    <Icon name={confirmPasswordVisible ? "visibility" : "visibility-off"} size={24} color="gray" style={styles.icon} />
                  </TouchableOpacity>
                </View>
              )}
              
              <TouchableOpacity
                style={styles.button}
                onPress={isSignUp ? handleSignUp : handleLogin}
              >
                <Text style={styles.buttonText}>{isSignUp ? 'Đăng ký' : 'Đăng nhập'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.switchButton}
                onPress={() => setIsSignUp(!isSignUp)}
              >
                <Text style={styles.switchButtonText}>
                  {isSignUp ? 'Bạn đã có tài khoản. Đăng nhập?' : 'Bạn chưa có tài khoản. Đăng ký?'}
                </Text>
              </TouchableOpacity>

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
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingLeft: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  icon: {
    padding: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  switchButton: {
    marginTop: 15,
  },
  switchButtonText: {
    color: '#2196F3',
    fontSize: 14,
  },
});
