import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { globalStyles } from '../styles/globalStyles';

// Constants
const { width } = Dimensions.get('window');
const SCALE_FACTOR = 375;
const SOCIAL_ICONS = {
  apple: require('../../assets/apple.png'),
  google: require('../../assets/google.png'),
  facebook: require('../../assets/facebook.png'),
};

// Utility function
const scale = (size: number) => (width / SCALE_FACTOR) * size;

// Header
const HeaderSection = () => (
  <>
    <Text style={globalStyles.title}>Sign In</Text>
    <Text style={globalStyles.subtitle}>
      Hi welcome back, you’ve been missed
    </Text>
  </>
);

// 소셜 로그인 아이콘
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

// Main Component
const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const res = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });
      console.log('Login success:', res.data);
      navigation.navigate('Loading');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
    }
  };

  return (
    <View style={globalStyles.container}>
      <HeaderSection />

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

      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={globalStyles.input}
        />
        <TouchableOpacity
          style={globalStyles.forgotPassword}
          onPress={() => navigation.navigate('NewPassword')}
        >
          <Text style={globalStyles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={globalStyles.button}
        onPress={handleSignIn}
        accessibilityRole="button"
      >
        <Text style={globalStyles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <SocialSignInSection />

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