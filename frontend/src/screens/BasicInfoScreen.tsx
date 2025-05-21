import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { globalStyles } from '../styles/globalStyles';

const BasicInfoScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const navigation = useNavigation();

  // 기존 정보가 있으면 Lifestyle로 이동
  useEffect(() => {
    const checkBasicInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const res = await axios.get('http://10.0.2.2:8000/basic-info/me', {
          headers: { Authorization: `Bearer ${token}` },
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

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  const handleNext = async () => {
  if (!name || !birthDate || !gender || !height || !weight) {
    Alert.alert('Error', 'Please fill out all fields (photo is optional).');
    return;
  }

  try {
    const token = await AsyncStorage.getItem('token');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('birth_date', birthDate);
    formData.append('gender', gender);
    formData.append('height', height);
    formData.append('weight', weight);

    // ✅ 선택적으로 이미지가 있을 때만 추가
    if (selectedImage) {
      formData.append('profile_image', {
        uri: selectedImage.uri,
        type: selectedImage.type || 'image/jpeg',
        name: selectedImage.fileName || 'profile.jpg',
      });
    }

    await axios.post('https://mycarering.loca.lt/basic-info', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    navigation.navigate('Lifestyle');
  } catch (err) {
    console.error('Failed to save basic info:', err.response?.data || err.message);
    Alert.alert('Error', 'Failed to save basic info.');
  }
};
  return (
    <View style={globalStyles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity
        style={{ position: 'absolute', top: 30, left: 20 }}
        onPress={() => navigation.navigate('Login')}
      >
        <Image source={require('../../assets/back.png')} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>

      <Text style={globalStyles.title}>Basic Information</Text>
      <Text style={globalStyles.subtitle}>I need some brief information from you</Text>

      {/* 이미지 선택 */}
      <TouchableOpacity style={globalStyles.profileImageContainer} onPress={pickImage}>
        <Image
          source={
            selectedImage
              ? { uri: selectedImage.uri }
              : require('../../assets/user-placeholder.png')
          }
          style={globalStyles.profileImage}
        />
        <Text style={globalStyles.linkText}>Add photo</Text>
      </TouchableOpacity>

      {/* 이름 */}
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Name</Text>
        <TextInput style={globalStyles.input} value={name} onChangeText={setName} />
      </View>

      {/* 생년월일 & 성별 */}
      <View style={globalStyles.rowContainer}>
        <View style={[globalStyles.inputContainer, { flex: 1.2 }]}>
          <Text style={globalStyles.label}>Date of birth</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="YYYY-MM-DD"
            value={birthDate}
            onChangeText={setBirthDate}
          />
        </View>

        <View style={[globalStyles.inputContainer, { flex: 0.8, marginLeft: 8 }]}>
          <Text style={globalStyles.label}>Gender</Text>
          <View style={globalStyles.genderButtonGroup}>
            {['male', 'female'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  globalStyles.genderButton,
                  gender === option && globalStyles.genderButtonSelected,
                ]}
                onPress={() => setGender(option)}
              >
                <Text
                  style={
                    gender === option
                      ? globalStyles.genderTextSelected
                      : globalStyles.genderText
                  }
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* 키 */}
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Height</Text>
        <TextInput
          style={globalStyles.input}
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />
        <Text style={globalStyles.unitText}>cm</Text>
      </View>

      {/* 몸무게 */}
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Weight</Text>
        <TextInput
          style={globalStyles.input}
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
        <Text style={globalStyles.unitText}>kg</Text>
      </View>

      {/* 제출 */}
      <TouchableOpacity style={globalStyles.button} onPress={handleNext}>
        <Text style={globalStyles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasicInfoScreen;