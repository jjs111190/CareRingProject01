import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';

const IntroStep3Screen: React.FC = () => {
  const navigation = useNavigation();

  const handleSkip = () => {
    navigation.navigate('Home');
  };

  const handleNext = () => {
    navigation.navigate('Home');
  };

  const handlePrev = () => {
    navigation.navigate('IntroStep2Screen');
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
        source={require('../../assets/write-eating-habits.png')}
        style={{ width: 200, height: 200, marginBottom: 20 }}
        resizeMode="contain"
      />

      {/* 설명 텍스트 */}
      <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 10, color: '#678CC8' }}>
        Write down your eating habits
      </Text>
      <Text style={{ fontSize: 18, textAlign: 'center', marginVertical: 10 }}>
        Write down your <Text style={{ color: '#678CC8', fontWeight: 'bold' }}>eating habits</Text> based on your{'\n'}
        exercise style and ingredients.
      </Text>

      {/* 페이지 인디케이터와 버튼 */}
      <View style={styles.navigationContainer}>
        {/* 왼쪽 버튼 */}
        <TouchableOpacity onPress={handlePrev}>
          <Image 
            source={require('../../assets/left.png')} // 왼쪽 화살표 버튼 이미지
            style={styles.imageButtonOutline}
          />
        </TouchableOpacity>
        
        {/* 페이지 인디케이터 */}
        <View style={[styles.indicator, { backgroundColor: '#D1D5DB' }]} />
        <View style={[styles.indicator, { backgroundColor: '#D1D5DB' }]} />
        <View style={[styles.indicator, { backgroundColor: '#678CC8' }]} />
        
        {/* 오른쪽 버튼 */}
        <TouchableOpacity onPress={handleNext}>
          <Image 
            source={require('../../assets/right.png')} // 오른쪽 화살표 버튼 이미지
            style={styles.imageButtonFilled}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  imageButtonOutline: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  imageButtonFilled: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
});

export default IntroStep3Screen;