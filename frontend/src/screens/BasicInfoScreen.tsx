import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles/globalStyles';

const BasicInfoScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const navigation = useNavigation();

  // ✅ 로그인된 유저의 BasicInfo가 있는지 확인
  useEffect(() => {
    const checkBasicInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token from storage (GET):', token);
        if (!token) return;

        const res = await axios.get('http://10.0.2.2:8000/basic-info/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200 && res.data?.name) {
          navigation.navigate('Lifestyle');
        }
      } catch (err) {
        console.log('No existing basic info, continue.');
      }
    };

    checkBasicInfo();
  }, []);

  const handleNext = async () => {
  if (!name || !birthDate || !gender || !height || !weight) {
    Alert.alert('Error', 'Please fill out all fields.');
    return;
  }

  try {
    const token = await AsyncStorage.getItem('token');
    console.log("🛰️ Sending token in request:", token); // ✅ [5] 전송 직전 토큰 로그

    await axios.post(
      'http://10.0.2.2:8000/basic-info',
      {
        name,
        birth_date: birthDate,
        gender,
        height: parseFloat(height),
        weight: parseFloat(weight),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,  // ✅ "Bearer " 포함 필수
        },
      }
    );

    navigation.navigate('Lifestyle');
  } catch (err) {
    console.error('Failed to save basic info:', err.response?.data || err.message);
    Alert.alert('Error', 'Failed to save basic info.');
  }
};

  return (
    <View style={globalStyles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={{ position: 'absolute', top: 30, left: 20 }}
        onPress={() => navigation.navigate('Login')}
      >
        <Image source={require('../../assets/back.png')} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>

      <Text style={globalStyles.title}>Basic Information</Text>
      <Text style={globalStyles.subtitle}>I need some brief information from you</Text>

      {/* Profile Picture */}
      <TouchableOpacity style={globalStyles.profileImageContainer}>
        <Image
          source={require('../../assets/user-placeholder.png')}
          style={globalStyles.profileImage}
        />
        <Text style={globalStyles.linkText}>Add photo</Text>
      </TouchableOpacity>

      {/* Name */}
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Name</Text>
        <TextInput
          style={globalStyles.input}
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Date of Birth & Gender */}
      <View style={globalStyles.rowContainer}>
        <View style={[globalStyles.inputContainer, { flex: 1, marginRight: 8 }]}>
          <Text style={globalStyles.label}>Date of birth</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="YYYY-MM-DD"
            value={birthDate}
            onChangeText={setBirthDate}
          />
        </View>
        <View style={[globalStyles.inputContainer, { flex: 1, marginLeft: 8 }]}>
          <Text style={globalStyles.label}>Gender</Text>
          <View style={globalStyles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(value) => setGender(value)}
              style={globalStyles.picker}
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>
      </View>

      {/* Height */}
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Height</Text>
        <TextInput
          style={globalStyles.input}
          value={height}
          onChangeText={setHeight}
        />
        <Text style={globalStyles.unitText}>cm</Text>
      </View>

      {/* Weight */}
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Weight</Text>
        <TextInput
          style={globalStyles.input}
          value={weight}
          onChangeText={setWeight}
        />
        <Text style={globalStyles.unitText}>kg</Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={globalStyles.button} onPress={handleNext}>
        <Text style={globalStyles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasicInfoScreen;