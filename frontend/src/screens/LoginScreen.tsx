import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Switch
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles/globalStyles';

const { width } = Dimensions.get('window');
const SCALE_FACTOR = 375;

const SOCIAL_ICONS = {
  apple: require('../../assets/apple.png'),
  google: require('../../assets/google.png'),
  facebook: require('../../assets/facebook.png'),
};

const scale = (size: number) => (width / SCALE_FACTOR) * size;

const HeaderSection = () => (
  <>
    <Text style={globalStyles.title}>Sign In</Text>
    <Text style={globalStyles.subtitle}>
      Hi welcome back, you’ve been missed
    </Text>
  </>
);

const SocialSignInSection = () => (
  <>
    <View style={globalStyles.socialSignInContainer}>
      <View style={globalStyles.divider} />
      <Text style={globalStyles.socialSignInText}>Or sign in with</Text>
      <View style={globalStyles.divider} />
    </View>
    <View style={globalStyles.socialButtonsContainer}>
      {Object.entries(SOCIAL_ICONS).map(([platform, source]) => (
        <TouchableOpacity key={platform}>
          <Image
            source={source}
            style={globalStyles.socialIcon}
            accessibilityLabel={`${platform} sign in`}
          />
        </TouchableOpacity>
      ))}
    </View>
  </>
);

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false); // ✅ 자동 로그인 상태

  const handleSignIn = async () => {
    if (!email || !email.includes('@')) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    if (!password || password.length < 4) {
      alert('비밀번호는 4자 이상이어야 합니다.');
      return;
    }

    try {
      const res = await axios.post('http://10.0.2.2:8000/login', {
        email,
        password
      });

      const { access_token } = res.data;

      // ✅ 토큰, 이메일, 자동 로그인 여부 저장
      await AsyncStorage.setItem('token', access_token);
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('autoLogin', autoLogin ? 'true' : 'false');

      // ✅ 인트로 화면을 이미 본 유저인지 확인
      const introSeen = await AsyncStorage.getItem(`introSeen-${email}`);
      if (introSeen) {
        navigation.navigate('Loading');
      } else {
        await AsyncStorage.setItem(`introSeen-${email}`, 'true');
        navigation.navigate('Intro');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert(`Login failed: ${JSON.stringify(error.response?.data || error.message)}`);
    }
  };

  return (
    <View style={globalStyles.container}>
      <HeaderSection />

      {/* 이메일 입력 */}
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={globalStyles.input}
          keyboardType="email-address"
        />
      </View>

      {/* 비밀번호 입력 */}
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={globalStyles.input}
        />
      </View>

      {/* ✅ 자동 로그인 + 비밀번호 찾기 한 줄 배치 */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 4,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Switch value={autoLogin} onValueChange={setAutoLogin} />
          <Text style={{ marginLeft: 1 }}>automatic login</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('NewPassword')}>
          <Text style={[globalStyles.forgotPasswordText, { marginLeft: 60 }]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* 로그인 버튼 */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={handleSignIn}
        accessibilityRole="button"
      >
        <Text style={globalStyles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* 소셜 로그인 */}
      <SocialSignInSection />

      {/* 회원가입 이동 */}
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        accessibilityRole="link"
      >
        <Text style={globalStyles.footerText}>
          Don’t have an account?{' '}
          <Text style={globalStyles.linkText}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;