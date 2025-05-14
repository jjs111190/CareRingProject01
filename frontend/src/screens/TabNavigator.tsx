import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard
} from 'react-native';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import CalendarScreen from './CalendarScreen'; // ❌ 경로 꼭 확인

// 예시 AI Photo
const AIPhotoScreen = () => (
  <View style={styles.screen}>
    <Text>AI Photo</Text>
  </View>
);

const CustomTabButton = ({ onPress }) => (
  <TouchableOpacity style={styles.customButtonContainer} onPress={onPress}>
    <Image source={require('../../assets/add.png')} style={styles.addIconImage} />
  </TouchableOpacity>
);

const CustomIcon = ({ source }) => (
  <View style={styles.iconContainer}>
    <Image source={source} style={styles.iconImage} />
  </View>
);

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBar,
          isKeyboardVisible ? { display: 'none' } : null
        ],
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <CustomIcon source={require('../../assets/home.png')} />
              <Text style={styles.iconText}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AI Photo"
        component={AIPhotoScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <CustomIcon source={require('../../assets/camera.png')} />
              <Text style={styles.iconText}>AI Photo</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={HomeScreen} // 📌 나중에 Add 전용 화면으로 교체 가능
        options={{
          headerShown: false,
          tabBarButton: (props) => <CustomTabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <CustomIcon source={require('../../assets/Calendar1.png')} />
              <Text style={styles.iconText}>Calendar</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <CustomIcon source={require('../../assets/profile.png')} />
              <Text style={styles.iconText}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
  position: 'absolute',
  bottom: 0,           // 👈 완전히 하단에 붙임
  left: 0,             // 👈 양 옆도 화면 끝까지
  right: 0,
  elevation: 0,
  backgroundColor: '#FFFFFF',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  height: 60,          // 👈 높이는 조금 낮춰도 되고 유지해도 됨
  paddingBottom: 5,    // 👈 필요시 조정
},
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 7,
    color: '#888',
    top: 3,
  },
  customButtonContainer: {
    position: 'absolute',
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#678CC8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addIconImage: {
    width: 50,
    height: 50,
  },
  iconImage: {
    top: 10,
    width: 50,
    height: 50,
  },
});

export default TabNavigator;