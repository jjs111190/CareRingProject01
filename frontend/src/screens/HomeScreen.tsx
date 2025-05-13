import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import PostCard from '../components/PostCard';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CareRing</Text>
        {/* Ionicons 대신 이미지 아이콘 사용 */}
        <Image
          source={require('../../assets/chatbubble.png')} // 아이콘 경로 수정 필요
          style={styles.icon}
        />
      </View>
      <ScrollView>
        <PostCard />
        <PostCard image="https://via.placeholder.com/300" />
        <PostCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#678CC8',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#678CC8', // 아이콘 색상 변경
  },
});

export default HomeScreen;