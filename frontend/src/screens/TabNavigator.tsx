import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const HomeScreen = () => <View style={styles.screen}><Text>Home</Text></View>;
const AIPhotoScreen = () => <View style={styles.screen}><Text>AI Photo</Text></View>;
const CalendarScreen = () => <View style={styles.screen}><Text>Calendar</Text></View>;
const ProfileScreen = () => <View style={styles.screen}><Text>Profile</Text></View>;

const CustomTabButton = ({ children, onPress }) => (
  <TouchableOpacity style={styles.customButtonContainer} onPress={onPress}>
    <View style={styles.customButton}>
      {children}
    </View>
  </TouchableOpacity>
);

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <Image
                source={require('../../assets/home.png')}
                style={styles.icon}
              />
              <Text style={styles.iconText}>Home</Text>
            </View>
          ),
        }} 
      />
      <Tab.Screen 
        name="AI Photo" 
        component={AIPhotoScreen} 
        options={{
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <Image
                source={require('../../assets/camera.png')}
                style={styles.icon}
              />
              <Text style={styles.iconText}>AI Photo</Text>
            </View>
          ),
        }} 
      />
      <Tab.Screen 
        name="Add" 
        component={HomeScreen} 
        options={{
          tabBarButton: (props) => <CustomTabButton {...props} />,
          tabBarIcon: () => (
            <Image
              source={require('../../assets/add.png')}
              style={styles.customIcon}
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="Calendar" 
        component={CalendarScreen} 
        options={{
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <Image
                source={require('../../assets/Calendar1.png')}
                style={styles.icon}
              />
              <Text style={styles.iconText}>Calendar</Text>
            </View>
          ),
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: () => (
            <View style={styles.iconContainer}>
              <Image
                source={require('../../assets/profile.png')}
                style={styles.icon}
              />
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonContainer: {
    top: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#678CC8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
     top: 10,
    width: 50,   // 아이콘 크기 조정
    height: 50,  // 아이콘 크기 조정
  },
  iconText: {
    fontSize: 7, // 텍스트 크기
    color: '#888', // 텍스트 색상
    marginTop: 6,  // 아이콘과 텍스트 간격
  },
  customIcon: {
    width: 50,
    height: 50,
  },
});

export default TabNavigator;