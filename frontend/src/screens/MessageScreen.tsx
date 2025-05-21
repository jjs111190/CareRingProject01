import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessageScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: { recipient: string } }, 'params'>>();
  const navigation = useNavigation();
  const { recipient } = route.params;
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    try {
      await axios.post(
        'https://mycarering.loca.lt/messages',
        { to: recipient, content: message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('Success', 'Message sent');
      setMessage('');
      navigation.navigate('Home');  // ✅ 전송 성공 시 홈으로 이동
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send message');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Message to {recipient}</Text>
      <TextInput
        style={styles.input}
        multiline
        value={message}
        onChangeText={setMessage}
        placeholder="Write your message..."
      />
      <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  input: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textAlignVertical: 'top',
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#678CC8',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});