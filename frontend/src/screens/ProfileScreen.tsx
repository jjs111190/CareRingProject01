import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProfileScreen: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [about, setAbout] = useState('');
  const [editingAbout, setEditingAbout] = useState(false);
  const [newAbout, setNewAbout] = useState('');
  const [healthInfo, setHealthInfo] = useState<any>({});
  const [posts] = useState(new Array(6).fill(null));
  const [joinText, setJoinText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      try {
        const userRes = await axios.get('http://10.0.2.2:8000/users/me', config);
        setNickname(userRes.data.nickname);
        setAbout(userRes.data.about || '');

        const joinDate = new Date(userRes.data.created_at);
        const formattedDate = joinDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        setJoinText(`#${userRes.data.id} • ${formattedDate}`);

        const lifestyleRes = await axios.get('http://10.0.2.2:8000/lifestyle/me', config);
        setHealthInfo(lifestyleRes.data);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSaveAbout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.put(
        'http://10.0.2.2:8000/users/me',
        { about: newAbout },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200 || res.status === 204) {
        setAbout(newAbout);
        setEditingAbout(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update about info');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.header}>
          <Text style={styles.title}>MY Profile</Text>
          <View style={styles.iconGroup}>
            <Image source={require('../../assets/chatbubble.png')} style={styles.iconImage} />
            <Image source={require('../../assets/settings.png')} style={styles.iconImage} />
          </View>
        </View>

        <View style={styles.profileCard}>
          <Image source={require('../../assets/user-icon.png')} style={styles.profileImage} />
          <Text style={styles.userName}>{nickname}</Text>
          <Text style={styles.joinDate}>Joined {joinText} • Student</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>100</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={[styles.button, styles.followButton]}>
              <Text style={styles.buttonText}>Following</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.messageButton]}>
              <Text style={[styles.buttonText, { color: 'white' }]}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

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

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>My Health Information</Text>
          {Object.entries(healthInfo)
            .filter(([key]) => key !== 'id' && key !== 'user_id')
            .map(([key, value]) => (
            value && (
           <View style={styles.infoItem} key={key}>
              <Text style={styles.infoTitle}>{key.replace(/_/g, ' ')}</Text>
                <Text style={styles.infoContent}>{value}</Text>
            </View>
          )
      ))}
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Post</Text>
          <View style={styles.postsGrid}>
            {posts.map((_, index) => (
              <TouchableOpacity key={index} style={styles.postItem} activeOpacity={0.8}>
                <Image source={require('../../assets/pill.png')} style={styles.postImage} />
                <View style={styles.postOverlay}>
                  <Image source={require('../../assets/heart.png')} style={styles.postIcon} />
                  <Text style={styles.postLikes}>152</Text>
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
  profileCard: { backgroundColor: 'white', borderRadius: 12, padding: 20, alignItems: 'center', marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 15 },
  userName: { fontSize: 20, fontWeight: 'bold', marginBottom: 4, color: '#333' },
  joinDate: { color: '#888', fontSize: 14, marginBottom: 20 },
  statsContainer: { flexDirection: 'row', justifyContent: 'center', width: '100%', marginBottom: 20, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#EEE', paddingVertical: 15 },
  statItem: { alignItems: 'center', marginHorizontal: 25 },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#678CC8' },
  statLabel: { color: '#888', fontSize: 14 },
  buttonGroup: { flexDirection: 'row', justifyContent: 'center', width: '100%', gap: 10 },
  button: { paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25, minWidth: 120, alignItems: 'center' },
  followButton: { backgroundColor: '#F0F0F0' },
  messageButton: { backgroundColor: '#678CC8' },
  buttonText: { fontSize: 14, fontWeight: '600', color: '#333' },
  sectionBox: { backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#678CC8', marginBottom: 15 },
  aboutHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  editIcon: { width: 20, height: 20, tintColor: '#678CC8' },
  aboutText: { color: '#555', lineHeight: 22, fontSize: 14 },
  infoItem: { marginBottom: 15 },
  infoTitle: { fontWeight: '600', color: '#333', marginBottom: 5, fontSize: 15 },
  infoContent: { color: '#666', fontSize: 14, lineHeight: 20 },
  postsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, justifyContent: 'flex-start' },
  postItem: { width: '32%', marginBottom: 6, position: 'relative', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  postImage: { width: '100%', aspectRatio: 1, borderRadius: 12, backgroundColor: '#EEE' },
  postOverlay: { position: 'absolute', bottom: 6, right: 6, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 12 },
  postIcon: { width: 14, height: 14, tintColor: 'white', marginRight: 4 },
  postLikes: { color: 'white', fontSize: 12, fontWeight: '500' },
});

export default ProfileScreen;
