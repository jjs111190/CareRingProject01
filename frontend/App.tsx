import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import BasicInfoScreen from './src/screens/BasicInfoScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import LifestyleScreen from './src/screens/LifestyleScreen';
import IntroScreen from './src/screens/IntroScreen';
import IntroStep2Screen from './src/screens/IntroStep2Screen';
import IntroStep3Screen from './src/screens/IntroStep3Screen';
import TabNavigator from './src/screens/TabNavigator';
import HomScreen from './src/screens/HomeScreen';  // 홈 화면

const Stack = createStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState<string>('Login');

  useEffect(() => {
    const checkInitialRoute = async () => {
      try {
        const seenIntro = await AsyncStorage.getItem('hasSeenIntro');
        if (seenIntro) {
          setInitialRoute('Home');
        } else {
          setInitialRoute('Intro');
        }
      } catch (error) {
        console.log('Error retrieving intro status:', error);
      }
    };
    checkInitialRoute();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={initialRoute} 
        screenOptions={{ headerShown: false }}
      >
        {/* 인트로 화면들 */}
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="IntroStep2Screen" component={IntroStep2Screen} />
        <Stack.Screen name="IntroStep3Screen" component={IntroStep3Screen} />

        {/* 로그인 관련 화면 */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
        <Stack.Screen name="Lifestyle" component={LifestyleScreen} />

        {/* 홈 화면 */}
        <Stack.Screen name="HomeScreen" component={HomScreen} />

        {/* 메인 화면 (Tab Navigator) */}
        <Stack.Screen 
          name="Home" 
          component={TabNavigator} 
          options={{ 
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureDirection: 'horizontal',
        }}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;