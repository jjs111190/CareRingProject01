import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';

const BasicInfoScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const navigation = useNavigation();

  const handleNext = () => {
    if (!name || !birthDate || !gender || !height || !weight) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    navigation.navigate('Lifestyle');
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