import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  user_id: number;
}

const PostWriteScreen = () => {
  const [phrase, setPhrase] = useState('');
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const decoded = jwtDecode<DecodedToken>(token);
        setUserId(decoded.user_id);

        const res = await axios.get(`https://mycarering.loca.lt/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNickname(res.data.nickname);
      } catch (err) {
        console.error('Failed to load user info', err);
      }
    };
    fetchUserInfo();
  }, []);

  const submitPost = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token || userId === null) {
        Alert.alert('Error', '로그인이 필요합니다.');
        return;
      }

      await axios.post(
        'https://mycarering.loca.lt/posts',
        {
          user_id: userId,
          user_name: nickname,
          phrase: phrase,
          image_url: null,
          location: null,
          person_tag: null,
          disclosure: null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPhrase('');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Please write a post');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Create Post</Text>
          <Text style={styles.subtitle}>Share your moments with the world</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.username}>@{nickname || 'username'}</Text>
        <TouchableOpacity style={styles.imageUploadContainer}>
          <View style={styles.imagePlaceholder}>
            <Image source={require('../../assets/image-plus.png')} style={styles.imagePlusIcon} />
            <Text style={styles.uploadText}>Add Photo</Text>
          </View>
        </TouchableOpacity>

        <TextInput
          style={styles.textInput}
          placeholder="Write your caption..."
          placeholderTextColor="#9CA3AF"
          multiline
          value={phrase}
          onChangeText={setPhrase}
        />

        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton}>
            <Image source={require('../../assets/location.png')} style={styles.optionIcon} />
            <Text style={styles.optionText}>Add Location</Text>
            <Text style={styles.optionArrow}>{'›'}</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.optionButton}>
            <Image source={require('../../assets/person.png')} style={styles.optionIcon} />
            <Text style={styles.optionText}>Tag People</Text>
            <Text style={styles.optionArrow}>{'›'}</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.optionButton}>
            <Image source={require('../../assets/globe.png')} style={styles.optionIcon} />
            <Text style={styles.optionText}>Privacy Settings</Text>
            <Text style={styles.optionArrow}>{'›'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.shareButton} onPress={submitPost}>
        <Text style={styles.shareButtonText}>Publish Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  username: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 16,
  },
  imageUploadContainer: {
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlusIcon: {
    width: 40,
    height: 40,
    tintColor: '#9CA3AF',
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    fontSize: 16,
    lineHeight: 24,
    color: '#1F2937',
    textAlignVertical: 'top',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionsContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  optionIcon: {
    width: 20,
    height: 20,
    marginRight: 16,
    tintColor: '#3B82F6',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  optionArrow: {
    fontSize: 20,
    color: '#9CA3AF',
    fontWeight: '500',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 20,
  },
  shareButton: {
    backgroundColor: '#678CC8',
    paddingVertical: 18,
    borderRadius: 12,
    marginTop: 30,
    shadowColor: '#678CC8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PostWriteScreen;