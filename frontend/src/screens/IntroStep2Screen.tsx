import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';

const IntroStep2Screen: React.FC = () => {
  const navigation = useNavigation();

  const handleSkip = () => {
    navigation.navigate('Home');
  };

  const handleNext = () => {
    navigation.navigate('IntroStep3Screen');
  };

  const handlePrev = () => {
    navigation.navigate('Intro');
  };

  return (
    <View style={globalStyles.container}>
      {/* Skip 버튼 */}
      <TouchableOpacity 
        style={{ position: 'absolute', top: 30, right: 20 }}
        onPress={handleSkip}
      >
        <Text style={[globalStyles.linkText, { fontSize: 18 }]}>Skip</Text>
      </TouchableOpacity>

      {/* 이미지 */}
      <Image 
        source={require('../../assets/check-ingredient.png')}
        style={{ width: 200, height: 200, marginBottom: 20 }}
        resizeMode="contain"
      />

      {/* 설명 텍스트 */}
      <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 10, color: '#678CC8' }}>
        Check the ingredient
      </Text>
      <Text style={{ fontSize: 18, textAlign: 'center', marginVertical: 10 }}>
        Take a <Text style={{ color: '#678CC8', fontWeight: 'bold' }}>picture</Text> of{'\n'}
        the ingredients to check them
      </Text>

      {/* 페이지 인디케이터와 버튼 */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={handlePrev}>
          <Image 
            source={require('../../assets/left.png')} // 왼쪽 화살표 버튼 이미지
            style={styles.imageButton}
          />
        </TouchableOpacity>

        <View style={[styles.indicator, { backgroundColor: '#D1D5DB' }]} />
        <View style={[styles.indicator, { backgroundColor: '#678CC8' }]} />
        <View style={[styles.indicator, { backgroundColor: '#D1D5DB' }]} />

        <TouchableOpacity onPress={handleNext}>
          <Image 
            source={require('../../assets/right.png')} // 오른쪽 화살표 버튼 이미지
            style={styles.imageButton}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    width: '100%',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  imageButton: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
});

export default IntroStep2Screen;