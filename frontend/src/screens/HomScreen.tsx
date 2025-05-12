import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import TabNavigator from './TabNavigator';

const PostCard = ({ image }: { image?: string }) => (
  <View style={styles.card}>
    <View style={styles.userInfo}>
      <Image source={require('../../assets/user-icon.png')} style={styles.userIcon} />
      <Text style={styles.userName}>user name</Text>
      <Text style={styles.userInfoText}>Gangnam-gu, Seoul - student</Text>
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreText}>•••</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.postText}>I have diabetes. Can I take protein pills?</Text>
    {image && <Image source={{ uri: image }} style={styles.postImage} />}
    <View style={styles.reactionBar}>
      <Text style={styles.reactionText}>10</Text>
      <Ionicons name="heart-outline" size={20} color="#888" />
      <Text style={styles.reactionText}>10</Text>
      <Ionicons name="share-outline" size={20} color="#888" />
    </View>
  </View>
);

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CareRing</Text>
      <PostCard />
      <PostCard image="https://via.placeholder.com/300" />
      <PostCard />
      <TabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#678CC8',
    margin: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  userInfoText: {
    color: '#888',
    marginLeft: 5,
  },
  moreButton: {
    marginLeft: 'auto',
  },
  moreText: {
    fontSize: 20,
    color: '#888',
  },
  postText: {
    fontSize: 18,
    marginVertical: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  reactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reactionText: {
    marginHorizontal: 5,
  },
});

export default HomeScreen;