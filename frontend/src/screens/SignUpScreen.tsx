import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'react-native-check-box';

const SignUpScreen = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = () => {
    if (!nickname || !email || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (!isChecked) {
      Alert.alert('Error', 'You must agree with the terms and conditions');
      return;
    }
    Alert.alert('Success', 'Account created successfully!');
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 8 }}>Create Account</Text>
      <Text style={{ color: '#6B7280', marginBottom: 24, textAlign: 'center' }}>
        Fill your information below or register with your social account
      </Text>

      <View style={{ width: '90%', marginBottom: 12 }}>
        <Text style={{ color: '#4B5563', marginBottom: 4 }}>Nickname</Text>
        <TextInput 
          style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12 }} 
          placeholder="Nickname" 
          value={nickname}
          onChangeText={setNickname}
        />
      </View>

      <View style={{ width: '90%', marginBottom: 12 }}>
        <Text style={{ color: '#4B5563', marginBottom: 4 }}>Email</Text>
        <TextInput 
          style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12 }} 
          placeholder="Email" 
          keyboardType="email-address" 
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={{ width: '90%', marginBottom: 12 }}>
        <Text style={{ color: '#4B5563', marginBottom: 4 }}>Password</Text>
        <TextInput 
          style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12 }} 
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
          <Text style={{ color: '#3B82F6' }}> Terms & Conditions</Text>
        </Text>
      </View>

      <TouchableOpacity 
        style={{ width: '90%', backgroundColor: '#678CC8', borderRadius: 8, padding: 14, marginBottom: 24 }}
        onPress={handleSignUp}
      >
        <Text style={{ color: '#FFFFFF', textAlign: 'center', fontSize: 16 }}>Sign Up</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: '#D1D5DB' }} />
        <Text style={{ marginHorizontal: 8, color: '#6B7280', fontSize: 14 }}>Or sign Up with</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: '#D1D5DB' }} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
        <TouchableOpacity>
          <Image source={require('../../assets/apple.png')} style={{ width: 48, height: 48 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/google.png')} style={{ width: 48, height: 48 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/facebook.png')} style={{ width: 48, height: 48 }} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: '#6B7280' }}>Already have an account? 
          <Text style={{ color: '#3B82F6' }}> Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;