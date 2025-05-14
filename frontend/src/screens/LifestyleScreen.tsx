import React, { useState, useEffect } from 'react';
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
  Platform,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { globalStyles } from '../styles/globalStyles';
import { scale } from '../utils/scale';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LifestyleScreen: React.FC = () => {
  const [medicalHistory, setMedicalHistory] = useState('');
  const [healthGoals, setHealthGoals] = useState('');
  const [dietTracking, setDietTracking] = useState('');
  const [sleepHabits, setSleepHabits] = useState('');
  const [smokingAlcohol, setSmokingAlcohol] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // ✅ Lifestyle 등록 여부 체크 (통합한 useEffect)
  useEffect(() => {
    const checkExistingInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('🛰️ LifestyleScreen token (GET):', token);

        if (!token) return;

        const res = await axios.get('http://10.0.2.2:8000/lifestyle/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res?.status === 200 && res.data) {
          navigation.navigate('Intro');
        }
      } catch (err: any) {
        if (err.response?.status === 404) {
          console.log('Lifestyle not found, stay on page');
        } else {
          console.error('Error checking lifestyle info:', err.response?.data || err.message);
          Alert.alert('Error', 'Failed to check lifestyle info.');
        }
      } finally {
        setLoading(false);
      }
    };

    checkExistingInfo();
  }, []);

  const handleFinish = async () => {
    if (!medicalHistory || !healthGoals || !dietTracking || !sleepHabits || !smokingAlcohol) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      console.log("📤 Sending token (POST):", token);

      await axios.post(
        'http://10.0.2.2:8000/lifestyle',
        {
          medical_history: medicalHistory,
          health_goals: healthGoals,
          diet_tracking: dietTracking,
          sleep_habits: sleepHabits,
          smoking_alcohol: smokingAlcohol
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigation.navigate('Intro');
    } catch (err: any) {
      console.error('Failed to save lifestyle:', err.response?.data || err.message);
      Alert.alert('Error', 'Failed to save lifestyle info.');
    }
  };

  if (loading) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      {/* Back Button */}
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
        <Text style={[globalStyles.title, localStyles.smallTitle]}>
          Lifestyle & Health Habits
        </Text>
        <Text style={[globalStyles.subtitle, localStyles.smallSubtitle]}>
          I need some brief information from you
        </Text>

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
    padding: scale(16),
    paddingTop: scale(70),
  },
  backButton: {
    position: 'absolute',
    top: scale(40),
    left: scale(20),
    zIndex: 1000,
  },
  backIcon: {
    width: scale(30),
    height: scale(30),
  },
  smallTitle: {
    fontSize: scale(30),
    marginBottom: scale(8),
  },
  smallSubtitle: {
    fontSize: scale(14),
    marginBottom: scale(30),
  },
});

export default LifestyleScreen;