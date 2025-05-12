import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';

const LoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // 2초 후에 BasicInfoScreen으로 이동
    const timer = setTimeout(() => {
      navigation.navigate('BasicInfo');
    }, 2000);

    // 타이머 클린업
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={globalStyles.loadingContainer}>
      {/* CareRing 로고와 텍스트 */}
      <View style={globalStyles.logoRow}>
        <Image 
          source={require('../../assets/Logo.png')} 
          style={globalStyles.loadingLogo} 
        />
        <Text style={globalStyles.loadingText}>CareRing</Text>
      </View>
      <ActivityIndicator size="large" color="#FFFFFF" style={globalStyles.loadingSpinner} />
    </View>
  );
};

export default LoadingScreen;