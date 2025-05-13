import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import PropTypes from 'prop-types';

// Constants for better maintainability
const LOADING_TIMEOUT = 2000;
const LOGO_IMAGE = require('../../assets/Logo.png');

const LogoRow = () => (
  <View style={globalStyles.logoRow}>
    <Image 
      source={LOGO_IMAGE} 
      style={globalStyles.loadingLogo}
      accessibilityRole="image"
      accessibilityLabel="CareRing Logo"
    />
    <Text style={globalStyles.loadingText}>CareRing</Text>
  </View>
);

const LoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const transitionTimer = setTimeout(() => {
      navigation.navigate('BasicInfo');
    }, LOADING_TIMEOUT);

    return () => clearTimeout(transitionTimer);
  }, [navigation]);

  return (
    <View style={globalStyles.loadingContainer}>
      <LogoRow />
      
      <ActivityIndicator 
        size="large" 
        color="#FFFFFF" 
        style={globalStyles.loadingSpinner}
        accessibilityRole="progressbar"
        accessibilityLabel="Loading indicator"
      />
    </View>
  );
};

LoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

export default LoadingScreen;