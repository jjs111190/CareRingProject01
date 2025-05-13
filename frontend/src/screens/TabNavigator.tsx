import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const AIPhotoScreen = () => (
  <View style={styles.screen}>
    <Text>AI Photo</Text>
  </View>
);
const CalendarScreen = () => (
  <View style={styles.screen}>
    <Text>Calendar</Text>
  </View>
);

const CustomTabButton = ({ onPress }) => (
  <TouchableOpacity style={styles.customButtonContainer} onPress={onPress}>
    <Image source={require('../../assets/add.png')} style={styles.addIconImage} />
  </TouchableOpacity>
);

const Tab = createBottomTabNavigator();

// 커스텀 아이콘 컴포넌트 (이미지 사용)
const CustomIcon = ({ source }) => (
  <View style={styles.iconContainer}>
    <Image source={source} style={styles.iconImage} />
  </View>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false, tabBarStyle: styles.tabBar }}>
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
        component={HomeScreen}
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
        component={ProfileScreen}  // ProfileScreen으로 설정
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
    bottom: 10,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    height: 70,
    paddingBottom: 10,
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