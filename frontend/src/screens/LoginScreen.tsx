import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleSignIn = () => {
    // 로딩 화면으로 이동
    navigation.navigate('Loading');
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Sign In</Text>
      <Text style={globalStyles.subtitle}>Hi welcome back, you’ve been missed</Text>

      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Email</Text>
        <TextInput 
          style={globalStyles.input} 
          placeholder="Email" 
          keyboardType="email-address" 
        />
      </View>

      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Password</Text>
        <TextInput 
          style={globalStyles.input} 
          placeholder="Password" 
          secureTextEntry 
        />
        <TouchableOpacity 
          style={globalStyles.forgotPassword}
          onPress={() => navigation.navigate('NewPassword')}
        >
          <Text style={globalStyles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity 
        style={globalStyles.button}
        onPress={handleSignIn}  // 로딩 화면 이동
      >
        <Text style={globalStyles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={globalStyles.socialSignInContainer}>
        <View style={globalStyles.divider} />
        <Text style={globalStyles.socialSignInText}>Or sign in with</Text>
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

      {/* Sign Up Navigation */}
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={globalStyles.footerText}>Don’t have an account? 
          <Text style={globalStyles.linkText}> Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;