import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Platform, TextInput, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Post {
  id: number;
  image_url: string;
  likes: number;
}

const ProfileScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [userId, setUserId] = useState<number | null>(null);
  const [nickname, setNickname] = useState('');
  const [about, setAbout] = useState('');
  const [editingAbout, setEditingAbout] = useState(false);
  const [newAbout, setNewAbout] = useState('');
  const [healthInfo, setHealthInfo] = useState<any>({});
  const [posts, setPosts] = useState<Post[]>([]);
  const [joinText, setJoinText] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const initAndFetch = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const config = { headers: { Authorization: `Bearer ${token}` } };

        let finalUserId: number;

        // ✅ userId가 넘어온 경우 (다른 유저 프로필)
        if ((route.params as any)?.userId) {
          finalUserId = (route.params as any).userId;
        } else {
          // ✅ 내 프로필 보기 (탭에서 접근한 경우)
          const meRes = await axios.get(`https://mycarering.loca.lt/users/me`, config);
          finalUserId = meRes.data.id;
        }

        setUserId(finalUserId);

        const [userRes, lifestyleRes, basicInfoRes, postRes] = await Promise.all([
          axios.get(`https://mycarering.loca.lt/users/${finalUserId}`, config),
          axios.get(`https://mycarering.loca.lt/lifestyle/${finalUserId}`, config),
          axios.get(`https://mycarering.loca.lt/basic-info/${finalUserId}`, config),
          axios.get(`https://mycarering.loca.lt/posts/user/${finalUserId}`, config),
        ]);

        const user = userRes.data;
        setNickname(user.nickname);
        setAbout(user.about || '');

        const joinDate = new Date(user.created_at);
        setJoinText(joinDate.toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric',
        }));

        setHealthInfo(lifestyleRes.data);

        const relativePath = basicInfoRes.data.image_url;
        if (relativePath) {
          setImageUrl(`https://mycarering.loca.lt${relativePath}`);
        }

        setPosts(postRes.data || []);
      } catch (e: any) {
        console.error('🔴 Profile fetch error:', e.response?.data || e.message);
        Alert.alert('Error', 'Failed to load profile. Please try again.');
      }
    };

    initAndFetch();
  }, []);

  const handleSaveAbout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const res = await axios.put(
        'https://mycarering.loca.lt/users/me',
        { about: newAbout },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200 || res.status === 204) {
        setAbout(newAbout);
        setEditingAbout(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update About section');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>MY Profile</Text>
          <View style={styles.iconGroup}>
            <Image source={require('../../assets/chatbubble.png')} style={styles.iconImage} />
            <Image source={require('../../assets/settings.png')} style={styles.iconImage} />
          </View>
        </View>

        {/* Profile */}
        <View style={styles.profileCard}>
          <Image
            source={imageUrl ? { uri: imageUrl } : require('../../assets/user-icon.png')}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{nickname}</Text>
          <Text style={styles.joinDate}>Joined {joinText} • Student</Text>
        </View>

        {/* About */}
        <View style={styles.sectionBox}>
          <View style={styles.aboutHeader}>
            <Text style={styles.sectionTitle}>About</Text>
            {about && !editingAbout && (
              <TouchableOpacity onPress={() => {
                setNewAbout(about);
                setEditingAbout(true);
              }}>
                <Image source={require('../../assets/edit.png')} style={styles.editIcon} />
              </TouchableOpacity>
            )}
          </View>
          {editingAbout ? (
            <>
              <TextInput
                style={[styles.aboutText, { borderBottomWidth: 1, borderColor: '#678CC8', paddingVertical: 6 }]}
                value={newAbout}
                onChangeText={setNewAbout}
                multiline
                placeholder="Write something about yourself"
                placeholderTextColor="#AAA"
              />
              <TouchableOpacity onPress={handleSaveAbout}>
                <Text style={{ color: '#678CC8', marginTop: 8, textAlign: 'right' }}>Save</Text>
              </TouchableOpacity>
            </>
          ) : about ? (
            <Text style={styles.aboutText}>{about}</Text>
          ) : (
            <TouchableOpacity onPress={() => {
              setEditingAbout(true);
              setNewAbout('');
            }}>
              <Text style={{ fontSize: 30, color: '#678CC8', textAlign: 'center' }}>+</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Health Info */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>My Health Information</Text>
          {Object.entries(healthInfo)
            .filter(([key]) => key !== 'id' && key !== 'user_id')
            .map(([key, value]) => (
              value && (
                <View style={styles.infoItem} key={key}>
                  <Text style={styles.infoTitle}>{key.replace(/_/g, ' ')}</Text>
                  <Text style={styles.infoContent}>{String(value)}</Text>
                </View>
              )
            ))}
        </View>

        {/* Posts */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Post</Text>
          <View style={styles.postsGrid}>
            {posts.map((post) => (
              <TouchableOpacity
                key={post.id}
                style={styles.postItem}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('PostDetail', { postId: post.id })}
              >
                <Image
                  source={{ uri: `https://mycarering.loca.lt${post.image_url}` }}
                  style={styles.postImage}
                />
                <View style={styles.postOverlay}>
                  <Image source={require('../../assets/heart.png')} style={styles.postIcon} />
                  <Text style={styles.postLikes}>{post.likes}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 20, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#678CC8' },
  iconGroup: { flexDirection: 'row' },
  iconImage: { width: 24, height: 24, marginLeft: 15, tintColor: '#678CC8' },
  profileCard: { backgroundColor: 'white', borderRadius: 12, padding: 20, alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 15 },
  userName: { fontSize: 20, fontWeight: 'bold', marginBottom: 4, color: '#333' },
  joinDate: { color: '#888', fontSize: 14, marginBottom: 20 },
  statsContainer: { flexDirection: 'row', justifyContent: 'center', width: '100%', marginBottom: 20 },
  statItem: { alignItems: 'center', marginHorizontal: 25 },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#678CC8' },
  statLabel: { color: '#888', fontSize: 14 },
  buttonGroup: { flexDirection: 'row', justifyContent: 'center', width: '100%', gap: 10 },
  button: { paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25, minWidth: 120, alignItems: 'center' },
  followButton: { backgroundColor: '#F0F0F0' },
  messageButton: { backgroundColor: '#678CC8' },
  buttonText: { fontSize: 14, fontWeight: '600', color: '#333' },
  sectionBox: { backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#678CC8', marginBottom: 15 },
  aboutHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  editIcon: { width: 20, height: 20, tintColor: '#678CC8' },
  aboutText: { color: '#555', lineHeight: 22, fontSize: 14 },
  infoItem: { marginBottom: 15 },
  infoTitle: { fontWeight: '600', color: '#333', marginBottom: 5, fontSize: 15 },
  infoContent: { color: '#666', fontSize: 14, lineHeight: 20 },
  postsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'flex-start' },
  postItem: { width: '32%', marginBottom: 6, position: 'relative' },
  postImage: { width: '100%', aspectRatio: 1, borderRadius: 12, backgroundColor: '#EEE' },
  postOverlay: { position: 'absolute', bottom: 6, right: 6, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 12 },
  postIcon: { width: 14, height: 14, tintColor: 'white', marginRight: 4 },
  postLikes: { color: 'white', fontSize: 12, fontWeight: '500' },
});

export default ProfileScreen;