import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';

const NewPasswordScreen: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigation = useNavigation();

  const handlePasswordReset = () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Both fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    Alert.alert('Success', 'Your password has been reset!');
    navigation.goBack();
  };

  return (
    <View style={globalStyles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={{ position: 'absolute', top: 30, left: 20 }}
        onPress={() => navigation.goBack()}
      >
        <Image source={require('../../assets/back.png')} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={globalStyles.title}>New Password</Text>
      <Text style={globalStyles.subtitle}>
        Your new password must be different{'\n'}from previously used passwords.
      </Text>

      {/* Password Input */}
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

      {/* Confirm Password Input */}
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Confirm Password</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={handlePasswordReset}
      >
        <Text style={globalStyles.buttonText}>Create New Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewPasswordScreen;