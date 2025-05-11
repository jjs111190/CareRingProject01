import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16 }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 8, color: '#000' }}>Sign In</Text>
      <Text style={{ color: '#6B7280', marginBottom: 24, fontSize: 16 }}>Hi welcome back, you’ve been missed</Text>

      <View style={{ width: '90%', marginBottom: 12 }}>
        <Text style={{ color: '#4B5563', marginBottom: 4 }}>Email</Text>
        <TextInput 
          style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12 }} 
          placeholder="Email" 
          keyboardType="email-address" 
        />
      </View>

      <View style={{ width: '90%', marginBottom: 12 }}>
        <Text style={{ color: '#4B5563', marginBottom: 4 }}>Password</Text>
        <TextInput 
          style={{ borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12 }} 
          placeholder="Password" 
          secureTextEntry 
        />
        <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 4 }}>
          <Text style={{ color: '#3B82F6', fontSize: 14 }}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={{ width: '90%', backgroundColor: '#678CC8', borderRadius: 8, padding: 14, marginBottom: 24 }}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={{ color: '#FFFFFF', textAlign: 'center', fontSize: 16 }}>Sign In</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: '#D1D5DB' }} />
        <Text style={{ marginHorizontal: 8, color: '#6B7280', fontSize: 14 }}>Or sign in with</Text>
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

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={{ color: '#6B7280' }}>Don’t have an account? 
          <Text style={{ color: '#3B82F6' }}> Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;