import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
// Constants
const { width, height } = Dimensions.get('window');
const SCALE_FACTOR = 375; // Base width for scaling
const SOCIAL_ICONS = {
  apple: require('../../assets/apple.png'),
  google: require('../../assets/google.png'),
  facebook: require('../../assets/facebook.png'),
};

// Utility function
const scale = (size: number) => (width / SCALE_FACTOR) * size;

// Reusable Components
const HeaderSection = () => (
  <>
    <Text style={globalStyles.title}>Sign In</Text>
    <Text style={globalStyles.subtitle}>
      Hi welcome back, you’ve been missed
    </Text>
  </>
);

const InputField = ({ label, placeholder, secure, navigation }) => (
  <View style={globalStyles.inputContainer}>
    <Text style={globalStyles.label}>{label}</Text>
    <TextInput
      style={globalStyles.input}
      placeholder={placeholder}
      secureTextEntry={secure}
      accessibilityLabel={`Enter ${label.toLowerCase()}`}
    />
    {label === 'Password' && (
      <TouchableOpacity
        style={globalStyles.forgotPassword}
        onPress={() => navigation.navigate('NewPassword')}
      >
        <Text style={globalStyles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    )}
  </View>
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

// Main Component
const LoginScreen = () => {
  const navigation = useNavigation();

  const handleSignIn = () => navigation.navigate('Loading');

  return (
    <View style={globalStyles.container}>
      <HeaderSection />

      <InputField 
        label="Email" 
        placeholder="Email" 
        navigation={navigation} 
      />
      <InputField 
        label="Password" 
        placeholder="Password" 
        secure 
        navigation={navigation} 
      />

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

// Styles

export default LoginScreen;