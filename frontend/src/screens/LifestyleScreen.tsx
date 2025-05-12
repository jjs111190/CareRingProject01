import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';

const LifestyleScreen: React.FC = () => {
  const [medicalHistory, setMedicalHistory] = useState<string>('');
  const [healthGoals, setHealthGoals] = useState<string>('');
  const [dietTracking, setDietTracking] = useState<string>('');
  const [sleepHabits, setSleepHabits] = useState<string>('');
  const [smokingAlcohol, setSmokingAlcohol] = useState<string>('');
  const navigation = useNavigation();

  // Finish 버튼 클릭 시 처리
  const handleFinish = () => {
    if (!medicalHistory || !healthGoals || !dietTracking || !sleepHabits || !smokingAlcohol) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    //Alert.alert('Success', 'Lifestyle information saved!');
    navigation.navigate('Intro');  // 메인 화면으로 이동
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

      {/* 타이틀과 설명 */}
      <Text style={[globalStyles.title, localStyles.smallTitle]}>Lifestyle & Health Habits</Text>
      <Text style={[globalStyles.subtitle, localStyles.smallSubtitle]}>I need some brief information from you</Text>

      {/* Medical History */}
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Medical history / chronic conditions</Text>
        <TextInput 
          style={globalStyles.input} 
          value={medicalHistory} 
          onChangeText={setMedicalHistory} 
        />
      </View>

      {/* Health Goals */}
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Health goals</Text>
        <TextInput 
          style={globalStyles.input} 
          value={healthGoals} 
          onChangeText={setHealthGoals} 
        />
      </View>

      {/* Diet and Nutrition Tracking */}
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Diet and nutrition tracking</Text>
        <TextInput 
          style={globalStyles.input} 
          value={dietTracking} 
          onChangeText={setDietTracking} 
        />
      </View>

      {/* Sleep and Physical Activity Habits */}
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Sleep and physical activity habits</Text>
        <TextInput 
          style={globalStyles.input} 
          value={sleepHabits} 
          onChangeText={setSleepHabits} 
        />
      </View>

      {/* Smoking/Alcohol Consumption Status */}
      <View style={globalStyles.inputContainer}>
        <Text style={globalStyles.label}>Smoking/alcohol consumption status</Text>
        <TextInput 
          style={globalStyles.input} 
          value={smokingAlcohol} 
          onChangeText={setSmokingAlcohol} 
        />
      </View>

      {/* Finish Button */}
      <TouchableOpacity style={globalStyles.button} onPress={handleFinish}>
        <Text style={globalStyles.buttonText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

// 🌟 개별 스타일 정의
const localStyles = StyleSheet.create({
  smallTitle: {
    fontSize: 30,
  },
  smallSubtitle: {
    fontSize: 14,
    marginBottom: 30,
  },
});

export default LifestyleScreen;