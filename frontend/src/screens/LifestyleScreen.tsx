import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import { scale } from '../utils/scale';  // 수정된 부분

const LifestyleScreen: React.FC = () => {
  const [medicalHistory, setMedicalHistory] = useState<string>('');
  const [healthGoals, setHealthGoals] = useState<string>('');
  const [dietTracking, setDietTracking] = useState<string>('');
  const [sleepHabits, setSleepHabits] = useState<string>('');
  const [smokingAlcohol, setSmokingAlcohol] = useState<string>('');
  const navigation = useNavigation();

  const handleFinish = () => {
    if (!medicalHistory || !healthGoals || !dietTracking || !sleepHabits || !smokingAlcohol) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    navigation.navigate('Intro');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      {/* 고정 백 버튼 */}
      <TouchableOpacity 
        style={localStyles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image 
          source={require('../../assets/back.png')} 
          style={localStyles.backIcon} 
        />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={localStyles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[globalStyles.title, localStyles.smallTitle]}>Lifestyle & Health Habits</Text>
        <Text style={[globalStyles.subtitle, localStyles.smallSubtitle]}>I need some brief information from you</Text>

        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.label}>Medical history / chronic conditions</Text>
          <TextInput 
            style={globalStyles.input} 
            value={medicalHistory} 
            onChangeText={setMedicalHistory} 
          />
        </View>

        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.label}>Health goals</Text>
          <TextInput 
            style={globalStyles.input} 
            value={healthGoals} 
            onChangeText={setHealthGoals} 
          />
        </View>

        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.label}>Diet and nutrition tracking</Text>
          <TextInput 
            style={globalStyles.input} 
            value={dietTracking} 
            onChangeText={setDietTracking} 
          />
        </View>

        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.label}>Sleep and physical activity habits</Text>
          <TextInput 
            style={globalStyles.input} 
            value={sleepHabits} 
            onChangeText={setSleepHabits} 
          />
        </View>

        <View style={globalStyles.inputContainer}>
          <Text style={globalStyles.label}>Smoking/alcohol consumption status</Text>
          <TextInput 
            style={globalStyles.input} 
            value={smokingAlcohol} 
            onChangeText={setSmokingAlcohol} 
          />
        </View>

        <TouchableOpacity style={globalStyles.button} onPress={handleFinish}>
          <Text style={globalStyles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const localStyles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: scale(16),      // scale 함수 사용
    paddingTop: scale(70),   // scale 함수 사용
  },
  backButton: {
    position: 'absolute',
    top: scale(40),          // scale 함수 사용
    left: scale(20),         // scale 함수 사용
    zIndex: 1000,
  },
  backIcon: {
    width: scale(30),        // scale 함수 사용
    height: scale(30),       // scale 함수 사용
  },
  smallTitle: {
    fontSize: scale(30),     // scale 함수 사용
    marginBottom: scale(8),  // scale 함수 사용
  },
  smallSubtitle: {
    fontSize: scale(14),     // scale 함수 사용
    marginBottom: scale(30), // scale 함수 사용
  },
});

export default LifestyleScreen;