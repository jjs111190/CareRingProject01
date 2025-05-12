import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';

const IntroScreen: React.FC = () => {
  const navigation = useNavigation();

  // Skip 버튼 클릭 시 홈 화면으로 이동
  const handleSkip = () => {
    navigation.navigate('Home');
  };

  // Next 버튼 클릭 시 IntroStep2Screen으로 이동
  const handleNext = () => {
    navigation.navigate('IntroStep2Screen');
  };
  const handlePrev = () => {
    navigation.navigate('Login');
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
        source={require('../../assets/calendar-ative.png')}
        style={{ width: 200, height: 200, marginBottom: 20 }}
        resizeMode="contain"
      />

      {/* 설명 텍스트 */}
      <Text style={{ fontSize: 18, textAlign: 'center', marginVertical: 10 }}>
        Keep track of your <Text style={{ color: '#678CC8', fontWeight: 'bold' }}>medication</Text> times{'\n'}
        by writing them down{'\n'}on a calendar.
      </Text>

      {/* 페이지 인디케이터와 버튼 */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={handlePrev}>
                  <Image 
                    source={require('../../assets/left.png')} // 왼쪽 화살표 버튼 이미지
                    style={styles.imageButton}
                  />
        </TouchableOpacity>
                
        <View style={styles.indicatorContainer}>
          <View style={[styles.indicator, { backgroundColor: '#678CC8' }]} />
          <View style={[styles.indicator, { backgroundColor: '#D1D5DB' }]} />
          <View style={[styles.indicator, { backgroundColor: '#D1D5DB' }]} />
        </View>

        {/* 다음 버튼 */}
        <TouchableOpacity onPress={handleNext} style={styles.buttonWrapper}>
          <Image 
            source={require('../../assets/right.png')}
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
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,  // 버튼과 간격 조정
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButton: {
    width: 50,
    height: 50,
  },
});

export default IntroScreen;