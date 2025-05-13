import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'react-native-check-box';
import axios from 'axios';
import { globalStyles } from '../styles/globalStyles';

const SignUpScreen = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (!nickname || !email || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (!isChecked) {
      Alert.alert('Error', 'You must agree with the terms and conditions');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/signup', {
        nickname,
        email,
        password,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to sign up. Try again.');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Create Account</Text>
      <Text style={globalStyles.subtitle}>
        Fill your information below or register with your social account
      </Text>

      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Nickname</Text>
        <TextInput 
          style={globalStyles.input} 
          placeholder="Nickname" 
          value={nickname}
          onChangeText={setNickname}
        />
      </View>

      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Email</Text>
        <TextInput 
          style={globalStyles.input} 
          placeholder="Email" 
          keyboardType="email-address" 
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Password</Text>
        <TextInput 
          style={globalStyles.input} 
          placeholder="Password" 
          secureTextEntry 
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <CheckBox
          isChecked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
        />
        <Text style={{ marginLeft: 8, color: '#4B5563' }}>Agree with 
          <Text style={globalStyles.linkText}> Terms & Conditions</Text>
        </Text>
      </View>

      <TouchableOpacity 
        style={globalStyles.button}
        onPress={handleSignUp}
      >
        <Text style={globalStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={globalStyles.socialSignInContainer}>
        <View style={globalStyles.divider} />
        <Text style={globalStyles.socialSignInText}>Or sign Up with</Text>
        <View style={globalStyles.divider} />
      </View>

      <View style={globalStyles.socialButtonsContainer}>
        <TouchableOpacity>
          <Image source={require('../../assets/apple.png')} style={globalStyles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/google.png')} style={globalStyles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/facebook.png')} style={globalStyles.socialIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={globalStyles.footerText}>Already have an account? 
          <Text style={globalStyles.linkText}> Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;