import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PostCard = ({ image }: { image?: string }) => (
  <View style={styles.card}>
    <View style={styles.userInfo}>
      <Image source={require('../../assets/user-icon.png')} style={styles.userIcon} />
      <View style={styles.userDetails}>
        <Text style={styles.userName}>user name</Text>
        <Text style={styles.userInfoText}>Gangnam-gu, Seoul - student</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreText}>•••</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.postText}>I have diabetes. Can I take protein pills?</Text>
    {image && <Image source={{ uri: image }} style={styles.postImage} />}
    <View style={styles.reactionBar}>
      <TouchableOpacity style={styles.reactionItem}>
        <Image source={require('../../assets/heart.png')} style={styles.iconImage} />
        <Text style={styles.reactionText}>10</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.reactionItem}>
        <Image source={require('../../assets/comment.png')} style={styles.iconImage} />
        <Text style={styles.reactionText}>10</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.reactionItem}>
        <Image source={require('../../assets/link.png')} style={styles.linkIcon} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
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
    justifyContent: 'space-around',
  },
  reactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionText: {
    marginLeft: 5,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  linkIcon: {
    width: 20,
    height: 20,
  },
});

export default PostCard;