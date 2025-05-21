import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

const UserProfileScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params as { userId: number };

  const [user, setUser] = useState<any>(null);
  const [basicInfo, setBasicInfo] = useState<any>(null);
  const [lifestyle, setLifestyle] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);

 useEffect(() => {
  const fetchUserProfile = async () => {
    if (!userId) {
      Alert.alert('Error', '사용자 정보가 없습니다.');
      navigation.goBack();
      return;
    }

    try {
      const [userRes, basicRes, lifestyleRes, postRes] = await Promise.all([
        axios.get(`https://mycarering.loca.lt/users/${userId}`),
        axios.get(`https://mycarering.loca.lt/basic-info/${userId}`),
        axios.get(`https://mycarering.loca.lt/lifestyle/${userId}`),
        axios.get(`https://mycarering.loca.lt/posts/user/${userId}`),
      ]);

      setUser(userRes.data);
      setBasicInfo(basicRes.data);
      setLifestyle(lifestyleRes.data);
      setPosts(postRes.data);
    } catch (err) {
      Alert.alert('Error', 'Failed to load user profile.');
      console.error(err);
    }
  };

  fetchUserProfile();
}, [userId]);
  if (!user) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={90}
    >
      <ScrollView style={styles.container}>
        {/* Back button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={basicInfo?.image_url ? { uri: `https://mycarering.loca.lt${basicInfo.image_url}` } : require('../../assets/user-icon.png')}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{user.nickname}</Text>
          <Text style={styles.joinDate}>Joined {new Date(user.created_at).toLocaleDateString()}</Text>
        </View>

        {/* About */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>{user.about || 'No description provided.'}</Text>
        </View>

        {/* Health Info */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Health Info</Text>
          {Object.entries(lifestyle || {})
            .filter(([key]) => key !== 'id' && key !== 'user_id')
            .map(([key, value]) => (
              <View key={key} style={styles.infoRow}>
                <Text style={styles.infoKey}>{key.replace(/_/g, ' ')}</Text>
                <Text style={styles.infoValue}>{String(value)}</Text>
              </View>
            ))}
        </View>

        {/* Posts */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Posts</Text>
          <View style={styles.postsGrid}>
            {posts.map(post => (
              <TouchableOpacity
                key={post.id}
                onPress={() => navigation.navigate('PostDetail', { post })}
              >
                <Image
                  source={{ uri: `https://mycarering.loca.lt${post.image_url}` }}
                  style={styles.postImage}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20 },
  backButton: { marginBottom: 10 },
  backIcon: { width: 24, height: 24 },

  profileCard: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },
  joinDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

  sectionBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#678CC8',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  infoRow: {
    marginBottom: 10,
  },
  infoKey: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '600',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: '#111827',
  },

  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  postImage: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
});

export default UserProfileScreen;