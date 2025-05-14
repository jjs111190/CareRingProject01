import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import PostCard from '../components/PostCard';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* ✅ 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>CareRing</Text>
        <Image
          source={require('../../assets/chatbubble.png')} // 아이콘
          style={styles.icon}
        />
      </View>

      {/* ✅ 피드 */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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
  },
   title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#678CC8',
     padding: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
    tintColor: '#678CC8', // 아이콘 색상 변경
  },
});

export default HomeScreen;